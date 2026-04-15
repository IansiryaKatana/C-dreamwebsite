import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminModal } from './components/AdminModal'
import { AdminPageHeading } from './components/AdminPageHeading'
import { AdminTablePagination } from './components/AdminTablePagination'
import {
  adminBtnGhost,
  adminBtnPrimary,
  adminBtnPrimarySm,
  adminStepActive,
  adminStepInactive,
} from './adminClassNames'
import { useCms } from '@/contexts/CmsContext'
import { getSupabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/database.types'
import { useAdminTablePagination } from './useAdminTablePagination'

type TopicRow = Database['public']['Tables']['faq_topics']['Row']
type EntryRow = Database['public']['Tables']['faq_entries']['Row']

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function fieldClass() {
  return 'mt-1 w-full rounded-2xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm'
}

const entrySteps = ['Basics', 'Question & answer'] as const

export function AdminFaqs() {
  const { refetch: refetchCms } = useCms()
  const sb = getSupabase()
  const [topics, setTopics] = useState<TopicRow[]>([])
  const [entries, setEntries] = useState<EntryRow[]>([])
  const [err, setErr] = useState<string | null>(null)

  const [topicModal, setTopicModal] = useState(false)
  const [topicDraft, setTopicDraft] = useState<Partial<TopicRow> | null>(null)
  const [topicSlugLocked, setTopicSlugLocked] = useState(false)
  const [topicSaveErr, setTopicSaveErr] = useState<string | null>(null)
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null)

  const [entryModal, setEntryModal] = useState(false)
  const [entryDraft, setEntryDraft] = useState<Partial<EntryRow> | null>(null)
  const [entryStep, setEntryStep] = useState(0)
  const [entrySaveErr, setEntrySaveErr] = useState<string | null>(null)
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null)

  const [selectedEntryIds, setSelectedEntryIds] = useState<Set<string>>(() => new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [bulkBusy, setBulkBusy] = useState(false)
  const [topicFilter, setTopicFilter] = useState<string>('all')
  const [bulkMoveTopicId, setBulkMoveTopicId] = useState<string>('')

  const refresh = useCallback(async () => {
    if (!sb) return
    const [tr, er] = await Promise.all([
      sb.from('faq_topics').select('*').order('sort_order'),
      sb
        .from('faq_entries')
        .select('*')
        .order('topic_id', { ascending: true })
        .order('sort_order', { ascending: true }),
    ])
    if (tr.error) {
      setErr(tr.error.message)
      return
    }
    if (er.error) {
      setErr(er.error.message)
      return
    }
    setErr(null)
    setTopics(tr.data ?? [])
    setEntries(er.data ?? [])
    setSelectedEntryIds(new Set())
  }, [sb])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const topicTitleById = useMemo(() => {
    const m = new Map<string, string>()
    for (const t of topics) m.set(t.id, t.title)
    return m
  }, [topics])

  const filteredEntries = useMemo(() => {
    if (topicFilter === 'all') return entries
    return entries.filter((e) => e.topic_id === topicFilter)
  }, [entries, topicFilter])

  const {
    page: entryPage,
    setPage: setEntryPage,
    total: entryTotal,
    totalPages: entryTotalPages,
    pagedItems: pagedEntries,
    rangeStart: entryRangeStart,
    rangeEnd: entryRangeEnd,
    showPagination: showEntryPagination,
  } = useAdminTablePagination(filteredEntries)

  function openNewTopic() {
    setTopicDraft({
      id: crypto.randomUUID(),
      slug: '',
      title: '',
      sort_order: topics.length,
      published: true,
    })
    setTopicSlugLocked(false)
    setTopicSaveErr(null)
    setTopicModal(true)
  }

  function openEditTopic(t: TopicRow) {
    setTopicDraft({ ...t })
    setTopicSlugLocked(true)
    setTopicSaveErr(null)
    setTopicModal(true)
  }

  function closeTopicModal() {
    setTopicModal(false)
    setTopicDraft(null)
  }

  async function saveTopic() {
    if (!sb || !topicDraft?.id) return
    setTopicSaveErr(null)
    const slug = (topicDraft.slug ?? '').trim().toLowerCase()
    const title = (topicDraft.title ?? '').trim()
    if (!slug || !title) {
      setTopicSaveErr('Slug and title are required.')
      return
    }
    if (!SLUG_RE.test(slug)) {
      setTopicSaveErr('Slug: lowercase letters, numbers, and hyphens only.')
      return
    }
    const row = {
      id: topicDraft.id,
      slug,
      title,
      sort_order: topicDraft.sort_order ?? 0,
      published: topicDraft.published ?? true,
    }
    const { error } = await sb.from('faq_topics').upsert(row, { onConflict: 'id' })
    if (error) {
      setTopicSaveErr(error.message)
      return
    }
    closeTopicModal()
    void refresh()
    void refetchCms()
  }

  async function confirmDeleteTopic() {
    if (!sb || !deleteTopicId) return
    const { error } = await sb.from('faq_topics').delete().eq('id', deleteTopicId)
    if (error) setErr(error.message)
    setDeleteTopicId(null)
    void refresh()
    void refetchCms()
  }

  function openNewEntry() {
    const firstTopic = topics[0]
    setEntryDraft({
      id: crypto.randomUUID(),
      topic_id: firstTopic?.id ?? '',
      question: '',
      answer: '',
      sort_order: entries.filter((e) => e.topic_id === firstTopic?.id).length,
      published: true,
    })
    setEntryStep(0)
    setEntrySaveErr(null)
    setEntryModal(true)
  }

  function openEditEntry(e: EntryRow) {
    setEntryDraft({ ...e })
    setEntryStep(0)
    setEntrySaveErr(null)
    setEntryModal(true)
  }

  function closeEntryModal() {
    setEntryModal(false)
    setEntryDraft(null)
  }

  async function saveEntry() {
    if (!sb || !entryDraft?.id) return
    setEntrySaveErr(null)
    const question = (entryDraft.question ?? '').trim()
    const answer = (entryDraft.answer ?? '').trim()
    const topic_id = entryDraft.topic_id ?? ''
    if (!topic_id) {
      setEntrySaveErr('Select a topic.')
      setEntryStep(0)
      return
    }
    if (!question) {
      setEntrySaveErr('Question is required.')
      setEntryStep(1)
      return
    }
    if (!answer) {
      setEntrySaveErr('Answer is required.')
      setEntryStep(1)
      return
    }
    const row = {
      id: entryDraft.id,
      topic_id,
      question,
      answer,
      sort_order: entryDraft.sort_order ?? 0,
      published: entryDraft.published ?? true,
    }
    const { error } = await sb.from('faq_entries').upsert(row, { onConflict: 'id' })
    if (error) {
      setEntrySaveErr(error.message)
      return
    }
    closeEntryModal()
    void refresh()
    void refetchCms()
  }

  async function confirmDeleteEntry() {
    if (!sb || !deleteEntryId) return
    const { error } = await sb.from('faq_entries').delete().eq('id', deleteEntryId)
    if (error) setErr(error.message)
    setDeleteEntryId(null)
    void refresh()
    void refetchCms()
  }

  function toggleEntrySelect(id: string) {
    setSelectedEntryIds((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  function toggleSelectAllEntriesOnPage() {
    const ids = pagedEntries.map((r) => r.id)
    const allOn = ids.length > 0 && ids.every((id) => selectedEntryIds.has(id))
    setSelectedEntryIds((prev) => {
      const n = new Set(prev)
      if (allOn) ids.forEach((id) => n.delete(id))
      else ids.forEach((id) => n.add(id))
      return n
    })
  }

  function clearEntrySelection() {
    setSelectedEntryIds(new Set())
  }

  const selectedEntryList = [...selectedEntryIds]
  const allEntriesSelectedOnPage =
    pagedEntries.length > 0 && pagedEntries.every((r) => selectedEntryIds.has(r.id))

  async function runBulkEntryPublish(published: boolean) {
    if (!sb || selectedEntryList.length === 0) return
    setBulkBusy(true)
    const { error } = await sb.from('faq_entries').update({ published }).in('id', selectedEntryList)
    setBulkBusy(false)
    if (error) setErr(error.message)
    else {
      clearEntrySelection()
      void refresh()
      void refetchCms()
    }
  }

  async function runBulkEntryDelete() {
    if (!sb || selectedEntryList.length === 0) return
    setBulkBusy(true)
    const { error } = await sb.from('faq_entries').delete().in('id', selectedEntryList)
    setBulkBusy(false)
    setBulkDeleteOpen(false)
    if (error) setErr(error.message)
    else {
      clearEntrySelection()
      void refresh()
      void refetchCms()
    }
  }

  async function runBulkMoveTopic() {
    if (!sb || selectedEntryList.length === 0 || !bulkMoveTopicId) return
    setBulkBusy(true)
    const { error } = await sb
      .from('faq_entries')
      .update({ topic_id: bulkMoveTopicId })
      .in('id', selectedEntryList)
    setBulkBusy(false)
    if (error) setErr(error.message)
    else {
      clearEntrySelection()
      setBulkMoveTopicId('')
      void refresh()
      void refetchCms()
    }
  }

  function updTopic<K extends keyof TopicRow>(key: K, v: TopicRow[K]) {
    setTopicDraft((d) => (d ? { ...d, [key]: v } : d))
  }

  function updEntry<K extends keyof EntryRow>(key: K, v: EntryRow[K]) {
    setEntryDraft((d) => (d ? { ...d, [key]: v } : d))
  }

  return (
    <div className="space-y-10">
      <AdminPageHeading title="FAQ" helpAriaLabel="About FAQ management">
        <p>
          Topics appear in the public page sidebar; entries are grouped under each topic. Bulk actions apply to selected
          rows on the current page.
        </p>
      </AdminPageHeading>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-ink">Topics</h2>
          <button
            type="button"
            onClick={openNewTopic}
            className={`inline-flex items-center justify-center gap-2 self-end sm:self-start ${adminBtnPrimary}`}
          >
            <Plus className="size-4" aria-hidden />
            New topic
          </button>
        </div>
        <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
          <table className="w-full min-w-[520px] text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
                <th className="px-3 py-3 md:px-4">Title</th>
                <th className="px-3 py-3 md:px-4">Slug</th>
                <th className="px-3 py-3 md:px-4">Sort</th>
                <th className="px-3 py-3 md:px-4">Status</th>
                <th className="px-3 py-3 text-right md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-3 py-2.5 font-medium md:px-4">{t.title}</td>
                  <td className="px-3 py-2.5 text-ink/65 md:px-4">{t.slug}</td>
                  <td className="px-3 py-2.5 text-ink/65 md:px-4">{t.sort_order}</td>
                  <td className="px-3 py-2.5 md:px-4">
                    {t.published ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-medium text-emerald-800">
                        Live
                      </span>
                    ) : (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[0.6875rem] font-medium text-ink/60">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right md:px-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditTopic(t)}
                        className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                        aria-label="Edit topic"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTopicId(t.id)}
                        className="rounded-full p-2 text-red-600/80 hover:bg-red-50"
                        aria-label="Delete topic"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {topics.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-ink/50">No topics yet. Create one before adding entries.</p>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-base font-semibold text-ink">Entries</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <label className="flex items-center gap-2 text-xs text-ink/70">
              <span className="shrink-0">Topic filter</span>
              <select
                value={topicFilter}
                onChange={(e) => {
                  setTopicFilter(e.target.value)
                  setEntryPage(1)
                }}
                className="rounded-xl border border-ink/15 bg-white px-3 py-2 text-xs text-ink md:text-sm"
              >
                <option value="all">All topics</option>
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={openNewEntry}
              disabled={topics.length === 0}
              className={`inline-flex items-center justify-center gap-2 self-end sm:self-start ${adminBtnPrimary} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <Plus className="size-4" aria-hidden />
              New entry
            </button>
          </div>
        </div>

        {selectedEntryList.length > 0 ? (
          <div className="flex flex-col gap-3 rounded-[var(--admin-radius-lg,24px)] border border-[var(--admin-primary)]/25 bg-[var(--admin-accent-soft)] p-4 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="text-xs font-medium text-ink md:text-sm">{selectedEntryList.length} selected</p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={bulkBusy}
                onClick={() => void runBulkEntryPublish(true)}
                className={adminBtnPrimarySm}
              >
                Publish
              </button>
              <button
                type="button"
                disabled={bulkBusy}
                onClick={() => void runBulkEntryPublish(false)}
                className={adminBtnGhost}
              >
                Unpublish
              </button>
              <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 pt-2 sm:border-t-0 sm:pt-0">
                <select
                  value={bulkMoveTopicId}
                  onChange={(e) => setBulkMoveTopicId(e.target.value)}
                  className="max-w-[200px] rounded-xl border border-ink/15 bg-white px-2 py-2 text-xs text-ink"
                  aria-label="Bulk move target topic"
                >
                  <option value="">Move to topic…</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={bulkBusy || !bulkMoveTopicId}
                  onClick={() => void runBulkMoveTopic()}
                  className={adminBtnGhost}
                >
                  Apply move
                </button>
              </div>
              <button
                type="button"
                disabled={bulkBusy}
                onClick={() => setBulkDeleteOpen(true)}
                className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800 md:text-sm"
              >
                Delete
              </button>
              <button type="button" onClick={clearEntrySelection} className={adminBtnGhost}>
                Clear
              </button>
            </div>
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-[var(--admin-radius-lg,24px)] border border-ink/10 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-ink/[0.02] text-[0.6875rem] font-semibold uppercase tracking-wider text-ink/50">
                <th className="w-10 px-2 py-3 md:px-3">
                  <input
                    type="checkbox"
                    checked={allEntriesSelectedOnPage}
                    onChange={() => toggleSelectAllEntriesOnPage()}
                    className="size-4 rounded border-ink/20"
                    aria-label="Select all entries on this page"
                  />
                </th>
                <th className="px-3 py-3 md:px-4">Question</th>
                <th className="px-3 py-3 md:px-4">Topic</th>
                <th className="px-3 py-3 md:px-4">Sort</th>
                <th className="px-3 py-3 md:px-4">Status</th>
                <th className="px-3 py-3 text-right md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedEntries.map((r) => (
                <tr key={r.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-2 py-2.5 md:px-3">
                    <input
                      type="checkbox"
                      checked={selectedEntryIds.has(r.id)}
                      onChange={() => toggleEntrySelect(r.id)}
                      className="size-4 rounded border-ink/20"
                      aria-label={`Select ${r.question.slice(0, 48)}`}
                    />
                  </td>
                  <td className="max-w-[280px] px-3 py-2.5 font-medium md:max-w-[360px] md:px-4">
                    <span className="line-clamp-2">{r.question}</span>
                  </td>
                  <td className="px-3 py-2.5 text-ink/70 md:px-4">{topicTitleById.get(r.topic_id) ?? '—'}</td>
                  <td className="px-3 py-2.5 text-ink/65 md:px-4">{r.sort_order}</td>
                  <td className="px-3 py-2.5 md:px-4">
                    {r.published ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.6875rem] font-medium text-emerald-800">
                        Live
                      </span>
                    ) : (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[0.6875rem] font-medium text-ink/60">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right md:px-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditEntry(r)}
                        className="rounded-full p-2 text-ink/60 hover:bg-ink/5"
                        aria-label="Edit entry"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteEntryId(r.id)}
                        className="rounded-full p-2 text-red-600/80 hover:bg-red-50"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminTablePagination
            visible={showEntryPagination}
            page={entryPage}
            totalPages={entryTotalPages}
            total={entryTotal}
            rangeStart={entryRangeStart}
            rangeEnd={entryRangeEnd}
            onPageChange={setEntryPage}
          />
          {filteredEntries.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-ink/50">No entries match this filter.</p>
          ) : null}
        </div>
      </section>

      <AdminModal
        open={topicModal && !!topicDraft}
        title={topicDraft?.title ? `Topic · ${topicDraft.title}` : 'New topic'}
        onClose={closeTopicModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeTopicModal}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button type="button" onClick={() => void saveTopic()} className={`w-full md:w-auto ${adminBtnPrimary}`}>
              Save
            </button>
          </>
        }
      >
        {topicDraft ? (
          <div className="space-y-3">
            {topicSaveErr ? <p className="text-xs text-red-600">{topicSaveErr}</p> : null}
            <div>
              <label className="text-xs font-medium text-ink/70">Slug (anchor URL)</label>
              <input
                value={topicDraft.slug ?? ''}
                onChange={(e) => updTopic('slug', e.target.value)}
                disabled={topicSlugLocked}
                className={fieldClass()}
                placeholder="buying-dubai-uae"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink/70">Title</label>
              <input
                value={topicDraft.title ?? ''}
                onChange={(e) => updTopic('title', e.target.value)}
                className={fieldClass()}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink/70">Sort order</label>
              <input
                type="number"
                min={0}
                value={topicDraft.sort_order ?? 0}
                onChange={(e) => updTopic('sort_order', Math.max(0, Number(e.target.value) || 0))}
                className={fieldClass()}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="topic-published"
                type="checkbox"
                checked={topicDraft.published ?? true}
                onChange={(e) => updTopic('published', e.target.checked)}
                className="size-4 rounded border-ink/20"
              />
              <label htmlFor="topic-published" className="text-xs font-medium text-ink/70">
                Published
              </label>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={entryModal && !!entryDraft}
        wide
        title={
          entryDraft?.question?.trim()
            ? `FAQ · ${entryDraft.question.trim().slice(0, 42)}${entryDraft.question.trim().length > 42 ? '…' : ''}`
            : 'New FAQ entry'
        }
        onClose={closeEntryModal}
        footer={
          <>
            <button
              type="button"
              onClick={closeEntryModal}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button type="button" onClick={() => void saveEntry()} className={`w-full md:w-auto ${adminBtnPrimary}`}>
              Save
            </button>
          </>
        }
      >
        {entryDraft ? (
          <div className="space-y-4">
            <div className="flex gap-1 overflow-x-auto pb-1">
              {entrySteps.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setEntryStep(i)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider md:text-xs ${
                    entryStep === i ? adminStepActive : adminStepInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {entrySaveErr ? <p className="text-xs text-red-600">{entrySaveErr}</p> : null}

            {entryStep === 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-ink/70">Topic</label>
                  <select
                    value={entryDraft.topic_id ?? ''}
                    onChange={(e) => updEntry('topic_id', e.target.value)}
                    className={fieldClass()}
                  >
                    <option value="">Select…</option>
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-ink/70">Sort order (within topic)</label>
                  <input
                    type="number"
                    min={0}
                    value={entryDraft.sort_order ?? 0}
                    onChange={(e) => updEntry('sort_order', Math.max(0, Number(e.target.value) || 0))}
                    className={fieldClass()}
                  />
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <input
                    id="entry-published"
                    type="checkbox"
                    checked={entryDraft.published ?? true}
                    onChange={(e) => updEntry('published', e.target.checked)}
                    className="size-4 rounded border-ink/20"
                  />
                  <label htmlFor="entry-published" className="text-xs font-medium text-ink/70">
                    Published
                  </label>
                </div>
              </div>
            ) : null}

            {entryStep === 1 ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-ink/70">Question</label>
                  <textarea
                    value={entryDraft.question ?? ''}
                    onChange={(e) => updEntry('question', e.target.value)}
                    rows={3}
                    className={fieldClass()}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink/70">Answer (use blank lines for paragraphs)</label>
                  <textarea
                    value={entryDraft.answer ?? ''}
                    onChange={(e) => updEntry('answer', e.target.value)}
                    rows={12}
                    className={fieldClass()}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={bulkDeleteOpen}
        title={`Delete ${selectedEntryList.length} FAQ entries?`}
        onClose={() => setBulkDeleteOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setBulkDeleteOpen(false)}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={bulkBusy}
              onClick={() => void runBulkEntryDelete()}
              className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto"
            >
              Delete selected
            </button>
          </>
        }
      >
        <p className="text-sm text-ink/75">This cannot be undone.</p>
      </AdminModal>

      <AdminModal
        open={!!deleteTopicId}
        title="Delete topic?"
        onClose={() => setDeleteTopicId(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteTopicId(null)}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteTopic()}
              className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto"
            >
              Delete topic & entries
            </button>
          </>
        }
      >
        <p className="text-sm text-ink/75">All FAQ entries in this topic will be removed (cascade).</p>
      </AdminModal>

      <AdminModal
        open={!!deleteEntryId}
        title="Delete FAQ entry?"
        onClose={() => setDeleteEntryId(null)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteEntryId(null)}
              className="w-full rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-medium md:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteEntry()}
              className="w-full rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white md:w-auto"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-ink/75">This permanently removes the entry.</p>
      </AdminModal>
    </div>
  )
}

/**
 * Generates supabase/migrations/20260412120100_faq_uae_seed_data.sql
 * Run: node scripts/generate-faq-seed-sql.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'supabase', 'migrations', '20260412120100_faq_uae_seed_data.sql')

const topics = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    slug: 'buying-dubai-uae',
    title: 'Buying property in Dubai & the UAE',
    sort: 0,
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    slug: 'renting-uae',
    title: 'Renting in the UAE',
    sort: 1,
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    slug: 'golden-visa-residency',
    title: 'Golden Visa & UAE residency',
    sort: 2,
  },
  {
    id: '10000000-0000-4000-8000-000000000004',
    slug: 'mortgages-finance-uae',
    title: 'Mortgages & UAE property finance',
    sort: 3,
  },
  {
    id: '10000000-0000-4000-8000-000000000005',
    slug: 'off-plan-new-developments',
    title: 'Off-plan & new developments',
    sort: 4,
  },
  {
    id: '10000000-0000-4000-8000-000000000006',
    slug: 'dld-title-legal',
    title: 'DLD, title & legal essentials',
    sort: 5,
  },
  {
    id: '10000000-0000-4000-8000-000000000007',
    slug: 'fees-service-charges-noc',
    title: 'Fees, service charges & NOC',
    sort: 6,
  },
  {
    id: '10000000-0000-4000-8000-000000000008',
    slug: 'dubai-neighbourhoods',
    title: 'Dubai neighbourhoods & lifestyle',
    sort: 7,
  },
  {
    id: '10000000-0000-4000-8000-000000000009',
    slug: 'abu-dhabi-other-emirates',
    title: 'Abu Dhabi & other emirates',
    sort: 8,
  },
  {
    id: '10000000-0000-4000-8000-00000000000a',
    slug: 'investment-roi-strategy',
    title: 'Investment strategy & ROI in the UAE',
    sort: 9,
  },
  {
    id: '10000000-0000-4000-8000-00000000000b',
    slug: 'selling-listing-home',
    title: 'Selling & listing your UAE home',
    sort: 10,
  },
  {
    id: '10000000-0000-4000-8000-00000000000c',
    slug: 'capital-dream-services',
    title: 'Working with Capital Dream',
    sort: 11,
  },
]

/** @type {Record<string, { q: string; a: string }[]>} */
const bySlug = {
  'buying-dubai-uae': [
    {
      q: 'Can foreigners buy freehold property in Dubai?',
      a: 'Yes. Many communities in Dubai are designated freehold, allowing non-UAE nationals to own outright subject to Dubai Land Department (DLD) rules and developer or master community requirements. Capital Dream helps you shortlist assets that match your residency status, budget, and holding structure before you commit.\n\nFreehold ownership is not universal across every plot in the UAE, so verification on the title and permitted use is essential.',
    },
    {
      q: 'What is the difference between freehold and leasehold in the UAE?',
      a: 'Freehold typically grants ownership of the unit (and often a share of common land) for an indefinite period, while leasehold means you hold rights for a fixed term (commonly decades) from a master lessor. The practical impact shows up in financing, resale appetite, and renewal terms.\n\nCapital Dream explains how each structure affects your exit plan and running costs for Dubai and wider UAE assets.',
    },
    {
      q: 'What are the main steps to buy a resale villa or apartment in Dubai?',
      a: 'A typical resale path includes agreeing commercial terms, signing a Form F (MOU) with clear conditions, buyer due diligence on title and seller authority, securing mortgage approval if needed, and completing transfer at a DLD trustee office with settlement of fees.\n\nCapital Dream coordinates timelines, documentation, and handover so surprises are minimized.',
    },
    {
      q: 'How long does a Dubai property transfer usually take?',
      a: 'Cash purchases with clean title and no mortgage can sometimes complete in a matter of days once parties are aligned. Mortgaged transactions or complex corporate buyers may take longer while banks and compliance checks run in parallel.\n\nYour Capital Dream advisor will map a realistic schedule based on your specific case.',
    },
    {
      q: 'What is Oqood registration and when does it apply?',
      a: 'Oqood is the DLD system used to register off-plan sales contracts, helping protect buyer interests while the project is under construction. It is a key milestone before eventual title issuance upon completion.\n\nIf you are buying off-plan, Capital Dream ensures you understand payment plans, registration milestones, and handover requirements.',
    },
    {
      q: 'Can I buy UAE property through a company?',
      a: 'Corporate holding is common for certain investors, but eligibility, licensing, and bank lending rules differ from personal purchases. The right structure depends on tax residency, estate planning, and whether you need a mortgage.\n\nCapital Dream works with your legal and tax advisers to align the purchase vehicle with your goals.',
    },
    {
      q: 'Which documents do buyers typically need in Dubai?',
      a: 'Expect passport copies, Emirates ID where applicable, proof of funds or a mortgage pre-approval, and any corporate resolutions if a company is buying. Sellers must provide clear title and NOCs where required by the developer or master community.\n\nCapital Dream provides a checklist tailored to your transaction type.',
    },
    {
      q: 'Should I get mortgage pre-approval before making an offer?',
      a: 'Pre-approval strengthens your negotiating position and prevents wasted time on homes outside bank parameters. UAE lenders assess income, liabilities, and the specific asset.\n\nCapital Dream can introduce mortgage specialists and align your offer strategy with realistic lending limits.',
    },
    {
      q: 'What is a Form F in Dubai resale transactions?',
      a: 'Form F is the standard memorandum of understanding used for resale deals, recording price, deposit, timelines, and conditions. It should be reviewed carefully alongside agency agreements.\n\nCapital Dream ensures your paperwork reflects what was agreed commercially and protects your deposit conditions.',
    },
    {
      q: 'Are escrow accounts required for off-plan purchases in Dubai?',
      a: 'Dubai’s regulatory framework uses project escrow mechanisms so buyer funds for registered off-plan sales are ring-fenced for construction in line with applicable rules. Always confirm registration status and escrow compliance for the specific project.\n\nCapital Dream prioritizes developer track record and regulatory posture in every shortlist.',
    },
  ],
  'renting-uae': [
    {
      q: 'How are rental contracts registered in Dubai?',
      a: 'Long-term Dubai leases are typically registered through Ejari, which formalizes the tenancy for utilities, visas, and dispute processes. Registration should align with RERA guidelines and agreed rent.\n\nCapital Dream helps landlords and tenants understand documentation before move-in.',
    },
    {
      q: 'What is the typical rent payment structure in Dubai?',
      a: 'Many landlords request one to four cheques per year, though terms vary by community and asset class. Corporate lets may differ.\n\nCapital Dream negotiates payment schedules that balance landlord security with tenant cash flow.',
    },
    {
      q: 'Can landlords increase rent every year in Dubai?',
      a: 'Increases must follow the applicable rent index and notice rules for renewals in Dubai. Disputes can be taken to the Rental Dispute Center when parties disagree.\n\nSpeak with Capital Dream for a market read before you renew or repricing a listing.',
    },
    {
      q: 'What fees do tenants pay when moving in?',
      a: 'Tenants may pay a security deposit, agency fee where applicable, Ejari and utility deposits, and chiller or cooling charges depending on the building. Always read the addendum for service charges passed through.\n\nCapital Dream clarifies the full move-in cost stack before you sign.',
    },
    {
      q: 'Is short-term letting allowed in every Dubai community?',
      a: 'Short-term holiday letting is regulated; many master communities restrict or prohibit platforms unless licensed and permitted. Violations can affect owners and tenants.\n\nCapital Dream advises on compliant strategies if you are an investor targeting hospitality yields.',
    },
    {
      q: 'What happens if a tenant breaks a lease early?',
      a: 'Early termination depends on your contract clauses, notice period, and whether a landlord can mitigate loss by re-letting. Some contracts include a fixed penalty.\n\nCapital Dream recommends clear exit terms upfront for both parties.',
    },
    {
      q: 'Do I need a housing allowance letter to rent?',
      a: 'Employers sometimes provide letters for corporate relocations, but private landlords mainly care about affordability, references, and security deposits. Banks may ask for more if you are structuring payments.\n\nCapital Dream streamlines tenant packs for competitive listings.',
    },
    {
      q: 'Are pets allowed in Dubai rentals?',
      a: 'Pet policies are set by landlords and building rules; some towers prohibit pets entirely. Always get written approval.\n\nCapital Dream matches pet owners to realistic buildings to avoid move-in conflicts.',
    },
    {
      q: 'How do utilities and DEWA work for new tenants?',
      a: 'Tenants usually activate DEWA in their name with Ejari and pay deposits. District cooling providers may be separate.\n\nCapital Dream provides a utility checklist for a smooth handover.',
    },
    {
      q: 'What is the difference between furnished and unfurnished rent in the UAE?',
      a: 'Furnished homes command higher rents and shorter average tenancies; unfurnished suits longer stays and personalisation. Inventory condition should be photo-documented.\n\nCapital Dream prices listings competitively for the chosen furnishing strategy.',
    },
  ],
  'golden-visa-residency': [
    {
      q: 'Can buying UAE property help with long-term residency?',
      a: 'The UAE offers long-term visa categories tied to qualifying investments, including property thresholds that authorities may update. Eligibility depends on value, title status, and program rules at the time of application.\n\nCapital Dream points you to qualified immigration counsel and aligns property choices with your visa goals.',
    },
    {
      q: 'What property value is referenced for investor visas?',
      a: 'Published thresholds and eligible asset types can change; approvals also consider whether the property is mortgaged and the equity you hold. Always verify current federal and emirate guidance.\n\nCapital Dream focuses on assets with clean title and documentation that support a smooth application file.',
    },
    {
      q: 'Does a mortgage affect Golden Visa eligibility?',
      a: 'Mortgages can affect how authorities assess net investment; some programs look at paid-up value rather than headline price. Lender and DLD records must be consistent.\n\nYour Capital Dream advisor coordinates with your mortgage bank and legal team on the narrative.',
    },
    {
      q: 'Can off-plan purchases count toward residency investment rules?',
      a: 'Rules evolve and may distinguish between registered off-plan contracts and completed title. The status of construction and registration matters.\n\nCapital Dream highlights completion risk and documentation when residency timing is critical.',
    },
    {
      q: 'How long do UAE long-term visas last?',
      a: 'Many investor-linked visas are issued for extended periods and are renewable subject to continued compliance with program conditions. Medical insurance and security checks are part of the cycle.\n\nCapital Dream supports clients who relocate alongside a property purchase.',
    },
    {
      q: 'Do family members qualify under investor visas?',
      a: 'Dependent sponsorship rules exist for spouses and children within defined frameworks, with documentation requirements. Domestic worker sponsorship follows separate rules.\n\nCapital Dream connects you with specialists for household relocation planning.',
    },
    {
      q: 'Is a Golden Visa the same as tax residency?',
      a: 'No. UAE visa status is separate from how other countries tax you on worldwide income. You should obtain personal tax advice in every relevant jurisdiction.\n\nCapital Dream stays focused on real estate while your accountants define tax posture.',
    },
    {
      q: 'What documents from a property purchase support a visa file?',
      a: 'Expect title or Oqood extracts, purchase contracts, payment evidence, and NOCs as required by the authority reviewing the file. Translations may be needed.\n\nCapital Dream helps assemble a coherent property evidence pack.',
    },
    {
      q: 'Can I lose my visa if I sell the qualifying property?',
      a: 'Program rules tie renewal to continued satisfaction of investment conditions. Selling may affect renewal unless you reinvest in another qualifying asset in time.\n\nPlan exits with Capital Dream before you list.',
    },
    {
      q: 'Where should I verify the latest UAE visa rules?',
      a: 'Official portals and licensed immigration consultants are the sources of truth; blogs quickly go out of date.\n\nCapital Dream provides property-side diligence while your GDRFA-approved PRO handles submissions.',
    },
  ],
  'mortgages-finance-uae': [
    {
      q: 'Can expats get mortgages for Dubai property?',
      a: 'Yes, many UAE banks lend to employed expats and some self-employed profiles, subject to income proof, stress tests, and loan-to-value limits that differ for residents vs non-residents.\n\nCapital Dream pairs you with mortgage advisors who understand your employer type and currency of income.',
    },
    {
      q: 'What loan-to-value (LTV) limits apply in the UAE?',
      a: 'Central Bank rules set maximum LTV bands for first and subsequent properties and for completed vs under-construction homes. Banks may be stricter than the ceiling.\n\nCapital Dream models your deposit requirement before you offer.',
    },
    {
      q: 'Are interest rates fixed or variable for UAE home loans?',
      a: 'Products include fixed-rate windows, variable spreads over benchmarks, and hybrid structures. Early settlement fees and conversion charges vary.\n\nCapital Dream encourages a side-by-side comparison of total cost over your holding period.',
    },
    {
      q: 'How does the bank value the property I want to buy?',
      a: 'Lenders instruct panel valuers who assess market evidence, asset condition, and sometimes developer discounts. A low valuation can reduce the loan amount.\n\nCapital Dream anticipates valuation gaps on secondary listings.',
    },
    {
      q: 'Can I finance service charges and DLD fees?',
      a: 'Mortgages generally finance the property purchase price or bank-approved valuation, not ongoing fees. Budget transfer and agency costs in cash.\n\nCapital Dream provides a full funds-needed table for closing.',
    },
    {
      q: 'What is life insurance requirement for UAE mortgages?',
      a: 'Many banks require property insurance and borrower life coverage assigned to the lender. Premiums affect your monthly outflow.\n\nCapital Dream factors insurance into affordability.',
    },
    {
      q: 'Can non-residents borrow against Dubai real estate?',
      a: 'Some banks lend to non-residents with higher down payments and narrower lists of approved projects. Compliance checks can be more intensive.\n\nCapital Dream targets bankable assets for international buyers.',
    },
    {
      q: 'How does remortgaging or equity release work?',
      a: 'Refinancing can release equity or improve pricing if your profile and valuations support it. Exit penalties on the old loan matter.\n\nCapital Dream reviews whether a refinance suits your investment horizon.',
    },
    {
      q: 'Do Islamic finance options exist for UAE property?',
      a: 'Islamic banks offer Sharia-compliant structures such as diminishing musharakah with documented mechanics. Pricing should be compared transparently to conventional alternatives.\n\nCapital Dream introduces both conventional and Islamic desks where needed.',
    },
    {
      q: 'What slows mortgage approval most often?',
      a: 'Incomplete salary certificates, variable bonus treatment, employer in unusual jurisdictions, or title quirks on older villas. Valuation shortfalls also pause deals.\n\nCapital Dream pre-vets files to reduce last-minute surprises.',
    },
  ],
  'off-plan-new-developments': [
    {
      q: 'Why do investors choose Dubai off-plan property?',
      a: 'Payment plans, developer incentives, and potential capital growth before completion attract buyers who accept construction and market timing risk.\n\nCapital Dream differentiates between trophy launches and fundamentals-driven buys.',
    },
    {
      q: 'What should I check in a sales purchase agreement (SPA)?',
      a: 'Review payment schedule, late payment clauses, completion date mechanics, variation rights, defect liability, and cancellation remedies. Escrow and registration steps should be explicit.\n\nCapital Dream recommends independent legal review of every SPA.',
    },
    {
      q: 'What is a snagging inspection?',
      a: 'Before handover, a snagging report lists finishing defects for the developer to rectify. Quality varies by contractor and project tier.\n\nCapital Dream advises professional snagging for premium finishes.',
    },
    {
      q: 'Can I sell my off-plan contract before completion?',
      a: 'Some developers allow assignment to a new buyer subject to fees and eligibility. The developer’s consent process matters.\n\nCapital Dream explains assignment economics before you sign.',
    },
    {
      q: 'How do payment plans typically work?',
      a: 'Plans may combine down payment, construction-linked instalments, and post-handover cheques. Cost of capital differs from mortgages.\n\nCapital Dream models IRR and cash flow alongside alternative investments.',
    },
    {
      q: 'What is the risk if a project delays?',
      a: 'Delays affect rent start dates, mortgage drawdowns, and personal plans. Contract clauses define relief and notices.\n\nCapital Dream weighs developer delivery track record in every recommendation.',
    },
    {
      q: 'Are post-handover payment plans always a good deal?',
      a: 'They improve short-term cash flow but may embed a price premium or restrict resale until certain thresholds are paid.\n\nCapital Dream reads the fine print with you.',
    },
    {
      q: 'How do service charges get estimated off-plan?',
      a: 'Developers publish indicative service charges that can change once owners’ associations finalize budgets. High charges erode net yields.\n\nCapital Dream stress-tests yields with conservative service charge assumptions.',
    },
    {
      q: 'Should I buy directly from developer or resale in a new community?',
      a: 'Developer sales may offer better plans; resale may show a completed product with known defects and real rents.\n\nCapital Dream compares net outcomes for your timeline.',
    },
    {
      q: 'What warranties apply after handover?',
      a: 'Defect liability periods and structural warranties depend on the SPA and local consumer protection frameworks. Keep correspondence in writing.\n\nCapital Dream documents handover condition for investor clients.',
    },
  ],
  'dld-title-legal': [
    {
      q: 'What does Dubai Land Department (DLD) do in a sale?',
      a: 'DLD registers ownership transfers, collects transfer fees, and maintains the official record of title for registered properties. Trustee centers execute many steps.\n\nCapital Dream schedules transfers so funds and documents align.',
    },
    {
      q: 'How do I verify a seller truly owns the property?',
      a: 'Request a recent title deed or official ownership extract and match passport names, unit numbers, and any mortgage notes. For corporate sellers, verify signatories.\n\nCapital Dream treats title verification as non-negotiable.',
    },
    {
      q: 'What is a no-objection certificate (NOC) from a developer?',
      a: 'Developers issue NOCs confirming no outstanding amounts before DLD transfer in many communities. Fees and processing times vary.\n\nCapital Dream tracks NOC status to avoid blocked transfer dates.',
    },
    {
      q: 'Can there be restrictions on resale?',
      a: 'Some SPAs or master community rules impose lock-in periods or resale fees for off-plan and occasionally resale units.\n\nCapital Dream surfaces restrictions early in underwriting.',
    },
    {
      q: 'What is a usufruct or long lease right?',
      a: 'Some structures grant long-term use rights rather than classic freehold; financing and resale differ.\n\nCapital Dream explains how the right appears on title searches.',
    },
    {
      q: 'Do I need a POA to buy remotely?',
      a: 'Many buyers use notarized powers of attorney for signing and transfer steps. Banks and DLD have formatting requirements.\n\nCapital Dream coordinates templates with your lawyer.',
    },
    {
      q: 'How are jointly owned properties handled?',
      a: 'Co-owners should agree share splits, mortgage liability, and exit mechanics up front. DLD registration should mirror the agreement.\n\nCapital Dream flags governance questions for joint buyers.',
    },
    {
      q: 'What happens if there is an active mortgage on the seller’s unit?',
      a: 'The seller’s bank must clear the liability and release the mortgage note as part of settlement, often via a blocking arrangement.\n\nCapital Dream works with conveyancing teams on simultaneous closure.',
    },
    {
      q: 'Are verbal promises from agents binding?',
      a: 'Only written contract terms and registered instruments typically count. Marketing brochures may disclaim liability.\n\nCapital Dream documents material representations through the right channels.',
    },
    {
      q: 'When should I hire a UAE real estate lawyer?',
      a: 'Complex corporate purchases, bulk deals, distressed assignments, and unusual title histories merit counsel. Even standard buys benefit from Form F review.\n\nCapital Dream integrates legal review into premium transactions.',
    },
  ],
  'fees-service-charges-noc': [
    {
      q: 'What is the Dubai land transfer fee for buyers?',
      a: 'Transfer fees are a percentage of the sale price (subject to floors/ceilings that DLD may adjust); small administrative charges also apply. Budget agency fees separately if you use a broker.\n\nCapital Dream gives a closing cost estimate before you commit.',
    },
    {
      q: 'Who pays the real estate agent commission?',
      a: 'Market practice varies between landlord-paid, tenant-paid, or seller-paid models depending on emirate norms and mandates. Your agreement should state it clearly.\n\nCapital Dream explains the mandate you are signing.',
    },
    {
      q: 'What are typical service charges in Dubai towers?',
      a: 'Charges depend on amenities, chiller inclusion, staff levels, and insurance. Luxury towers can run materially higher per sq ft than mid-market stock.\n\nCapital Dream compares buildings on a total-cost basis.',
    },
    {
      q: 'Are cooling charges separate from DEWA?',
      a: 'Many master communities use district cooling providers billed separately from electricity. Arrears can block seller NOCs.\n\nCapital Dream checks utility clearance before transfer.',
    },
    {
      q: 'What is a seller NOC fee?',
      a: 'Developers may charge an NOC processing fee and require settlement of service charge arrears. Amounts differ by community.\n\nCapital Dream models seller net proceeds after NOC and mortgage settlement.',
    },
    {
      q: 'Do I pay VAT on residential resale?',
      a: 'VAT treatment depends on whether supply is residential, first supply, commercial, or mixed-use, and on registration status. Get accounting advice for edge cases.\n\nCapital Dream focuses on documented transaction costs you will see at closing.',
    },
    {
      q: 'What is the trustee office administration fee?',
      a: 'Trustee centers charge for processing DLD appointments and paperwork bundles. It is separate from DLD transfer fee.\n\nCapital Dream includes trustee costs in buyer cash calls.',
    },
    {
      q: 'Are there penalties for late registration of tenancy?',
      a: 'Ejari and municipal rules may impose fines or block certain services if registration lags. Compliance protects both parties.\n\nCapital Dream prompts timely registration for managed lets.',
    },
    {
      q: 'How often do owners’ associations increase budgets?',
      a: 'OA boards review insurance, utilities, and maintenance annually; special assessments can follow major repairs.\n\nCapital Dream reviews OA minutes when available for investment stock.',
    },
    {
      q: 'What hidden costs surprise first-time UAE buyers?',
      a: 'Mortgage arrangement fees, valuation fees, life insurance premiums, moving and fit-out, and short-term rent overlap add up.\n\nCapital Dream uses a total landing cost worksheet with every purchase plan.',
    },
  ],
  'dubai-neighbourhoods': [
    {
      q: 'Is Dubai Marina still a strong rental market?',
      a: 'Marina remains liquid with international tenant demand, though yields compress when prices rise. View, tower quality, and parking drive spreads.\n\nCapital Dream underwrites Marina units with micro-location detail.',
    },
    {
      q: 'What defines Palm Jumeirah premium pricing?',
      a: 'Frond versus trunk positioning, private pool, beach access, and hotel branding all matter. Maintenance and service levels are high.\n\nCapital Dream matches Palm inventory to lifestyle and capital preservation goals.',
    },
    {
      q: 'Are Downtown Dubai yields lower than outer communities?',
      a: 'Prime central locations often trade yield for liquidity and brand. Compare net income after service charges.\n\nCapital Dream benchmarks Downtown against Business Bay and DIFC micro-markets.',
    },
    {
      q: 'Is Arabian Ranches suited for family buyers?',
      a: 'Low-rise villas with schools and community facilities appeal to long-tenure families. Commute patterns matter.\n\nCapital Dream maps school and office routes for relocating households.',
    },
    {
      q: 'What is driving demand in Dubai Hills Estate?',
      a: 'Golf course amenity, mall access, and newer stock attract end-users and investors. Supply waves can affect near-term pricing.\n\nCapital Dream tracks launch pipelines alongside resale stock.',
    },
    {
      q: 'How should I compare JVC versus JVT?',
      a: 'Both offer dense mid-rise stock at accessible price points; build quality, parking, and traffic patterns differ by cluster.\n\nCapital Dream visits clusters physically before you bid.',
    },
    {
      q: 'Is DIFC only for apartments?',
      a: 'DIFC is predominantly luxury apartments with strong professional tenancy. Rules around use and short lets are strict.\n\nCapital Dream aligns DIFC buys with compliance and tenant type.',
    },
    {
      q: 'What about waterfront communities beyond Palm?',
      a: 'Mina Rashid, Creek Harbour, and Emaar Beachfront offer alternative waterfront narratives with different completion profiles.\n\nCapital Dream contrasts delivery risk and view permanence.',
    },
    {
      q: 'Do branded residences outperform non-branded?',
      a: 'Branding can support nightly rates and global recognition but may carry higher fees. Performance is project-specific.\n\nCapital Dream evaluates branded inventory case by case.',
    },
    {
      q: 'How does Expo City and south Dubai fit an investment map?',
      a: 'Infrastructure and event legacy support certain demand drivers; distance from traditional office cores influences tenancy.\n\nCapital Dream tests south Dubai theses against your holding period.',
    },
  ],
  'abu-dhabi-other-emirates': [
    {
      q: 'Can foreigners buy in Abu Dhabi freehold areas?',
      a: 'Abu Dhabi expanded investment zones where non-GCC nationals can acquire defined property rights; rules differ from Dubai. Verify zone eligibility and title type.\n\nCapital Dream coordinates with local partners for Abu Dhabi diligence.',
    },
    {
      q: 'What is different about buying in Ras Al Khaimah?',
      a: 'RAK offers competitive entry points and hospitality narratives; infrastructure and tenant depth differ from Dubai.\n\nCapital Dream frames RAK as a specialist allocation within a broader UAE portfolio.',
    },
    {
      q: 'Is Sharjah ownership structure different?',
      a: 'Sharjah historically emphasized usufruct and leasehold models for non-GCC buyers in many projects. Read title carefully.\n\nCapital Dream ensures you understand duration and renewal mechanics.',
    },
    {
      q: 'How do Ajman and Umm Al Quwain markets compare?',
      a: 'Lower ticket prices can mean thinner resale liquidity and different tenant profiles.\n\nCapital Dream stress-tests exit scenarios for budget emirate stock.',
    },
    {
      q: 'Can I use a Dubai mortgage to buy in another emirate?',
      a: 'Bank product coverage varies; some lenders emirate-limit approvals or apply different LTVs.\n\nCapital Dream confirms bankability before you pay booking deposits.',
    },
    {
      q: 'Are service charges lower outside Dubai?',
      a: 'Not always—new towers with full amenities can charge aggressively anywhere. Compare on a per sq ft basis.\n\nCapital Dream normalizes operating costs across emirates.',
    },
    {
      q: 'Do tenants follow jobs across emirates?',
      a: 'Commuting patterns and school locations anchor many households; sudden employer moves can increase vacancies in single-industry towns.\n\nCapital Dream reads demographic drivers for each emirate.',
    },
    {
      q: 'What about Fujairah east coast holiday homes?',
      a: 'Lifestyle and weekend demand differ from metropolitan tenancy; management and maintenance logistics matter.\n\nCapital Dream sets realistic occupancy assumptions.',
    },
    {
      q: 'Are there UAE-wide property registries?',
      a: 'Each emirate maintains its systems; cross-emirate search is not as unified as a single portal.\n\nCapital Dream conducts emirate-specific title checks.',
    },
    {
      q: 'Should my first UAE purchase be Dubai-only?',
      a: 'Many international clients start in Dubai for liquidity, then diversify. Your first buy should match risk tolerance and financing.\n\nCapital Dream builds a phased roadmap when you want multi-emirate exposure.',
    },
  ],
  'investment-roi-strategy': [
    {
      q: 'What gross yield should I expect on a Dubai rental?',
      a: 'Yields vary by community, furnishing, and whether you target long-term or short-term tenants. Advertised yields may ignore vacancy and fees.\n\nCapital Dream models net yield after service charges, management, and insurance.',
    },
    {
      q: 'Is short-term rental always more profitable?',
      a: 'Higher nightly rates come with furnishing cost, platform fees, cleaning, and regulatory compliance. Occupancy volatility rises.\n\nCapital Dream compares stabilized long-term vs managed short-term scenarios.',
    },
    {
      q: 'How do currency moves affect UAE property for UK or EU buyers?',
      a: 'AED is pegged to USD, so GBP and EUR cross rates swing purchase and repatriation value. Hedging is a treasury decision.\n\nCapital Dream illustrates FX sensitivity on your equity.',
    },
    {
      q: 'Should I optimize for capital growth or income?',
      a: 'Prime locations may prioritize growth; mid-market may prioritize yield. Your tax and leverage position influences the answer.\n\nCapital Dream aligns asset class with your mandate.',
    },
    {
      q: 'What is a realistic vacancy assumption?',
      a: 'New towers may need longer lease-up; established communities may re-let faster. Seasonality affects furnished stock.\n\nCapital Dream uses stress vacancies in downside cases.',
    },
    {
      q: 'How important is developer brand for resale liquidity?',
      a: 'Recognized developers often attract more bank finance and international buyers, supporting liquidity in downturns.\n\nCapital Dream tracks resale velocity by developer tier.',
    },
    {
      q: 'Should I diversify across several small units or one trophy asset?',
      a: 'Diversification reduces single-tenant risk but increases management overhead. Trophy assets can be less liquid in stress.\n\nCapital Dream structures portfolios to match your operating appetite.',
    },
    {
      q: 'What tax topics do international investors ask about?',
      a: 'Home-country capital gains, inheritance, and corporate attribution may interact with a UAE purchase. This is not tax advice.\n\nCapital Dream stays in its real estate lane while you consult tax counsel.',
    },
    {
      q: 'How do I think about exit timing?',
      a: 'Selling into a strong market with low inventory can help; mortgaged exits need bank coordination. Seasonal listing patterns exist.\n\nCapital Dream times listings with data, not headlines.',
    },
    {
      q: 'What role does inflation play in UAE real estate?',
      a: 'Construction costs, wages, and land bids influence replacement value; global liquidity cycles affect demand.\n\nCapital Dream connects macro themes to local micro supply in each submarket.',
    },
  ],
  'selling-listing-home': [
    {
      q: 'How should I price my Dubai apartment for sale?',
      a: 'Blend recent comparable transactions, current competing listings, and your unit’s differentiators. Overpricing lengthens days-on-market.\n\nCapital Dream prepares evidence-based pricing bands.',
    },
    {
      q: 'Should I stage my villa before listing?',
      a: 'Staging can lift photography performance and speed showings for vacant homes. Occupied staging needs decluttering.\n\nCapital Dream recommends staging tiers by price point.',
    },
    {
      q: 'What documents should sellers prepare early?',
      a: 'Title, mortgage statements, service charge receipts, DEWA clearances, and tenant Ejari if tenanted. Corporate sellers need board approvals.\n\nCapital Dream runs a seller diligence pack checklist.',
    },
    {
      q: 'Can I sell while tenants are in place?',
      a: 'Yes with proper notices and viewing coordination per your tenancy contract and law. Buyers may discount for occupied stock.\n\nCapital Dream manages buyer expectations on handover timing.',
    },
    {
      q: 'How do listing portals like Property Finder affect exposure?',
      a: 'Quality media, accurate pricing, and agent responsiveness drive leads on major UAE portals.\n\nCapital Dream optimizes listings for search visibility and conversion.',
    },
    {
      q: 'What is an exclusive vs open listing?',
      a: 'Exclusive mandates align incentives with one brokerage team; open listings can fragment messaging. Fees should match service.\n\nCapital Dream explains mandate economics clearly.',
    },
    {
      q: 'How long do Dubai listings take to sell?',
      a: 'Liquidity varies by tower and price band. Well-priced stock in liquid communities can move quickly; niche homes take longer.\n\nCapital Dream sets realistic timelines from day one.',
    },
    {
      q: 'Should I renovate before selling?',
      a: 'Minor cosmetic refreshes can help; major capex rarely returns 100% unless fixing defects.\n\nCapital Dream advises on highest ROI touch-ups.',
    },
    {
      q: 'What negotiation tactics work in the UAE market?',
      a: 'Clean buyers with bank approvals and flexible transfer dates often win. Deposits and conditionality should be professional.\n\nCapital Dream keeps negotiations transactional and respectful.',
    },
    {
      q: 'How do I handle lowball offers?',
      a: 'Counter with data and motivation context; sometimes silence is strategy. Market heat dictates response.\n\nCapital Dream shields sellers from noise while capturing real buyers.',
    },
  ],
  'capital-dream-services': [
    {
      q: 'What does Capital Dream do for UAE property buyers?',
      a: 'We curate shortlists, run pricing diligence, coordinate viewings, introduce mortgage and legal partners, and manage the path to DLD transfer with clear communication.\n\nOur team blends international service standards with on-the-ground UAE execution.',
    },
    {
      q: 'Does Capital Dream work with investors outside the UAE?',
      a: 'Yes. We support remote decision-making with video tours, data packs, and POA-friendly processes where appropriate.\n\nTime zones are accommodated for client calls and offer rounds.',
    },
    {
      q: 'Can Capital Dream help landlords lease properties?',
      a: 'We advise on pricing, tenant targeting, listing production, and handover documentation for long-term lets.\n\nWe align with your property management partner or recommend trusted operators.',
    },
    {
      q: 'How does Capital Dream choose which developments to recommend?',
      a: 'We weigh developer track record, location fundamentals, payment plan risk, service charge realism, and your personal mandate—not hype cycles alone.\n\nConflicts are managed transparently under our mandates.',
    },
    {
      q: 'Will Capital Dream negotiate on my behalf?',
      a: 'We represent your interests in offer strategy and counter rounds within the scope of our agency agreement.\n\nFinal contract terms are always reviewed with qualified legal counsel.',
    },
    {
      q: 'How do I start a consultation with Capital Dream?',
      a: 'Reach out via the site contact channels with your budget range, preferred communities, and timeline. We will confirm a discovery call and next steps.\n\nNo obligation until you engage a formal mandate.',
    },
    {
      q: 'Does Capital Dream charge buyer fees?',
      a: 'Compensation depends on the transaction type and local brokerage regulations; we disclose fees up front in writing.\n\nYou will know what is payable and to whom before you sign.',
    },
    {
      q: 'Can Capital Dream coordinate interior design after purchase?',
      a: 'We connect clients with vetted designers and contractors suited to your asset class and budget.\n\nScope, timelines, and payments remain between you and the supplier.',
    },
    {
      q: 'How does Capital Dream handle confidential searches?',
      a: 'We use discreet viewings, NDAs where needed, and controlled information sharing for high-profile clients.\n\nPrivacy is a default operating standard.',
    },
    {
      q: 'Why choose Capital Dream over a general portal search?',
      a: 'Portals list inventory; we interpret it—pricing traps, building issues, developer history, and negotiation leverage.\n\nYou save time and reduce costly mistakes with a guided process.',
    },
    {
      q: 'Does Capital Dream support portfolio reviews?',
      a: 'Yes. We can benchmark your existing UAE holdings against current market rents, values, and refinance options.\n\nInvestors use us to rebalance across communities and asset types.',
    },
  ],
}

function dollarTag(body) {
  let tag = 'f'
  while (body.includes(`$${tag}$`)) tag += 'x'
  return tag
}

function dq(body) {
  const tag = dollarTag(body)
  return `$${tag}$${body}$${tag}$`
}

let lines = []
lines.push('-- UAE-focused FAQ seed (generated by scripts/generate-faq-seed-sql.mjs)')
lines.push('begin;')
lines.push('')
lines.push('insert into public.faq_topics (id, slug, title, sort_order, published) values')
lines.push(
  topics
    .map(
      (t) =>
        `  ('${t.id}', '${t.slug.replace(/'/g, "''")}', '${t.title.replace(/'/g, "''")}', ${t.sort}, true)`,
    )
    .join(',\n') + '\n  on conflict (slug) do nothing;',
)
lines.push('')

const entryRows = []
let n = 0
for (const t of topics) {
  const list = bySlug[t.slug]
  if (!list || list.length === 0) throw new Error(`Missing QAs for ${t.slug}`)
  for (let i = 0; i < list.length; i++) {
    n += 1
    const id = `00000000-0000-4000-8000-${n.toString(16).padStart(12, '0')}`
    const { q, a } = list[i]
    entryRows.push(
      `  ('${id}', '${t.id}', ${dq(q)}, ${dq(a)}, ${i}, true)`,
    )
  }
}

lines.push('insert into public.faq_entries (id, topic_id, question, answer, sort_order, published) values')
lines.push(entryRows.join(',\n'))
lines.push('  on conflict (id) do nothing;')
lines.push('')
lines.push('commit;')

writeFileSync(out, lines.join('\n'), 'utf8')
console.log('Wrote', out, 'entries:', n)

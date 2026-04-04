import type { Property } from '../components/PropertyCard'

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`

export const featuredProperties: Property[] = [
  {
    id: '1',
    image: u('photo-1613490493576-7fde63acd811', 1200, 800),
    tag: 'New',
    title: 'Casa Blanca',
    meta: '€4.850.000 · San José, Ibiza',
    detail: 'Sea view · 5 bed · pool',
    alt: 'White modern villa at dusk',
  },
  {
    id: '2',
    image: u('photo-1600596542815-ffad4c1539a9', 1200, 800),
    tag: 'For sale',
    title: 'Villa Calma',
    meta: '€2.975.000 · Santa Eulària',
    detail: 'Countryside · 4 bed',
    alt: 'Hillside home with garden',
  },
  {
    id: '3',
    image: u('photo-1600585154340-be6161a56a0c', 1200, 800),
    tag: 'Exclusive',
    title: 'Casa del Mar',
    meta: '€6.200.000 · Cala Conta',
    detail: 'Waterfront · 6 bed',
    alt: 'Waterfront architecture',
  },
]

export const moreHomes: Property[] = [
  {
    id: 's1',
    image: u('photo-1512917774080-9991f1c4c750', 1200, 800),
    tag: 'New',
    title: 'Finca Serena',
    meta: '€3.400.000 · North Ibiza',
    detail: 'Olive grove · 5 bed',
    alt: 'White villa in landscape',
  },
  {
    id: 's2',
    image: u('photo-1600047509807-ba8f99d2cdde', 1200, 800),
    tag: 'For sale',
    title: 'Dalt Vila Loft',
    meta: '€1.890.000 · Ibiza Town',
    detail: 'Historic core · 3 bed',
    alt: 'Townhouse terrace',
  },
  {
    id: 's3',
    image: u('photo-1600566753190-17f0baa2a6c3', 1200, 800),
    tag: 'Exclusive',
    title: 'Casa Roc',
    meta: '€5.100.000 · Es Cubells',
    detail: 'Cliff pool · 5 bed',
    alt: 'Cliffside pool',
  },
]

export const bannerVillaDusk = u('photo-1613490493576-7fde63acd811', 2400, 1029)
export const bannerAerialVilla = u(
  'photo-1512917774080-9991f1c4c750',
  2400,
  1029,
)

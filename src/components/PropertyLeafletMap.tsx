import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type Props = {
  latitude: number
  longitude: number
  /** Popup title / one-line address */
  label: string
}

/** Wheel zoom only after the user focuses the map (click/tap); page scroll works over the map until then. */
function MapScrollWheelUnlock() {
  const map = useMap()
  useEffect(() => {
    map.scrollWheelZoom.disable()
    const el = map.getContainer()
    const unlock = () => {
      map.scrollWheelZoom.enable()
    }
    const lock = () => {
      map.scrollWheelZoom.disable()
    }
    el.addEventListener('click', unlock)
    el.addEventListener('mouseleave', lock)
    return () => {
      el.removeEventListener('click', unlock)
      el.removeEventListener('mouseleave', lock)
    }
  }, [map])
  return null
}

export function PropertyLeafletMap({ latitude, longitude, label }: Props) {
  return (
    <div className="h-[min(28rem,55vh)] w-full min-h-[280px] overflow-hidden rounded-[1.5rem] ring-1 ring-ink/10 [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:bg-cream/50 [&_.leaflet-control-zoom]:border-ink/10">
      <MapContainer
        key={`${latitude.toFixed(5)}-${longitude.toFixed(5)}`}
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <MapScrollWheelUnlock />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={defaultIcon}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

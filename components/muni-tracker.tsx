"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { fetchVehicleLocations } from "@/lib/muni-client"
import type { Vehicle } from "@/lib/types"
import { Icon } from "leaflet"
import { useRouter } from "next/navigation"

// Fix for Leaflet marker icons in Next.js
import L from "leaflet"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Fix Leaflet default icon issue
const defaultIcon = new Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

export default function MuniTracker({ selectedLines }: { selectedLines: string[] }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const router = useRouter()

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchVehicleLocations(selectedLines)
      setVehicles(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError("Failed to fetch vehicle data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up polling every 15 seconds
    const interval = setInterval(fetchData, 15000)

    return () => clearInterval(interval)
  }, [selectedLines])

  // San Francisco center coordinates
  const sfCenter = [37.7749, -122.4194]

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded-md shadow-md flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="flex items-center gap-1">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        )}
      </div>

      {error && <div className="absolute top-4 left-4 z-[1000] bg-destructive text-white p-2 rounded-md">{error}</div>}

      <MapContainer center={sfCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map((vehicle) => (
          <Marker key={vehicle.id} position={[vehicle.lat, vehicle.lon]} icon={defaultIcon}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold">
                  {vehicle.routeId} - {vehicle.directionId}
                </h3>
                <p>Vehicle ID: {vehicle.id}</p>
                <p>Speed: {vehicle.speedKmHr} km/h</p>
                <p>Heading: {vehicle.heading}°</p>
                <p>Last updated: {new Date(vehicle.timestamp * 1000).toLocaleTimeString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

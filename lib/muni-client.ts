"use client"

import type { Vehicle, ApiResponse } from "./types"

export async function fetchVehicleLocations(selectedLines: string[] = []): Promise<Vehicle[]> {
  try {
    const response = await fetch("/api/vehicles")

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    // Transform the API response into our Vehicle type
    const vehicles = data.entity
      .filter((entity) => entity.vehicle)
      .map((entity) => {
        const vehicle = entity.vehicle!
        return {
          id: vehicle.vehicle.id,
          routeId: vehicle.trip.route_id,
          directionId: vehicle.trip.direction_id.toString(),
          lat: vehicle.position.latitude,
          lon: vehicle.position.longitude,
          heading: vehicle.position.bearing,
          speedKmHr: vehicle.position.speed,
          timestamp: vehicle.timestamp,
        }
      })

    // Filter by selected lines if any are specified
    if (selectedLines.length > 0) {
      return vehicles.filter((vehicle) => selectedLines.includes(vehicle.routeId))
    }

    return vehicles
  } catch (error) {
    console.error("Error fetching vehicle locations:", error)
    throw error
  }
}

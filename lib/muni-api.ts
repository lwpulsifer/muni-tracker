import type { MuniLine } from "./types"

// This would typically come from an environment variable
const API_KEY = process.env.API_KEY_511_ORG || "YOUR_API_KEY"

export async function getAllLines(): Promise<MuniLine[]> {
  try {
    // In a real application, you would fetch this from the 511.org API
    // For now, we'll return a static list of common Muni lines
    return [
      { id: "N", name: "N-Judah", type: "metro" },
      { id: "J", name: "J-Church", type: "metro" },
      { id: "KT", name: "KT-Ingleside/Third Street", type: "metro" },
      { id: "L", name: "L-Taraval", type: "metro" },
      { id: "M", name: "M-Ocean View", type: "metro" },
      { id: "F", name: "F-Market & Wharves", type: "historic" },
      { id: "1", name: "1-California", type: "bus" },
      { id: "5", name: "5-Fulton", type: "bus" },
      { id: "7", name: "7-Haight/Noriega", type: "bus" },
      { id: "14", name: "14-Mission", type: "bus" },
      { id: "22", name: "22-Fillmore", type: "bus" },
      { id: "30", name: "30-Stockton", type: "bus" },
      { id: "38", name: "38-Geary", type: "bus" },
      { id: "49", name: "49-Van Ness/Mission", type: "bus" },
    ]
  } catch (error) {
    console.error("Error fetching Muni lines:", error)
    return []
  }
}

export async function fetchVehiclePositions(selectedLines: string[] = []) {
  const url = `https://api.511.org/transit/VehicleMonitoring?api_key=${API_KEY}&agency=SF&format=json`

  try {
    const response = await fetch(url, { next: { revalidate: 30 } })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status} and body ${await response.text()}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching vehicle positions:", error)
    throw error
  }
}

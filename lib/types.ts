export interface Vehicle {
  id: string
  routeId: string
  directionId: string
  lat: number
  lon: number
  heading: number
  speedKmHr: number
  timestamp: number
}

export interface MuniLine {
  id: string
  name: string
  type: string
}

export interface ApiResponse {
  header: {
    gtfs_realtime_version: string
    incrementality: number
    timestamp: number
  }
  entity: Array<{
    id: string
    vehicle?: {
      trip: {
        trip_id: string
        route_id: string
        direction_id: number
      }
      position: {
        latitude: number
        longitude: number
        bearing: number
        speed: number
      }
      current_stop_sequence: number
      current_status: number
      timestamp: number
      vehicle: {
        id: string
        label: string
      }
    }
  }>
}

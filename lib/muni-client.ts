"use client"

import type { SiriResponse, Vehicle } from "./types"

function getVehiclesByRoutesTyped(data: SiriResponse, routeIds: string[]): Vehicle[] {
  console.log("ROUTES");
  console.log(routeIds);
  const vehicleActivities = data.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;
  
  return vehicleActivities
    .filter(activity => activity.MonitoredVehicleJourney.LineRef && routeIds.includes(activity.MonitoredVehicleJourney.LineRef))
    .map(activity => {
      const journey = activity.MonitoredVehicleJourney;
      
      return {
        vehicleId: journey.VehicleRef,
        routeId: journey.LineRef,
        routeName: journey.PublishedLineName,
        position: {
          latitude: parseFloat(journey.VehicleLocation.Latitude),
          longitude: parseFloat(journey.VehicleLocation.Longitude)
        },
        bearing: parseFloat(journey.Bearing),
        occupancy: journey.Occupancy,
        timestamp: activity.RecordedAtTime,
        destination: journey.DestinationName,
        nextStop: journey.MonitoredCall ? journey.MonitoredCall.StopPointName : null,
        upcomingStops: journey.OnwardCalls ? 
          journey.OnwardCalls.OnwardCall.map(call => ({
            name: call.StopPointName,
            expectedArrival: call.ExpectedArrivalTime
          })) : []
      };
    });
}

export async function fetchVehicleLocations(selectedLines: string[] = []): Promise<Vehicle[]> {
  try {
    const response = await fetch("/api/vehicles")

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: SiriResponse = await response.json();

    // Transform the API response into our Vehicle type
    const vehicles = getVehiclesByRoutesTyped(data, selectedLines);

    return vehicles
  } catch (error) {
    console.error("Error fetching vehicle locations:", error)
    throw error
  }
}

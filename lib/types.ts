/**
 * TypeScript definitions for Siri Transit Vehicle Monitoring API response
 */

export interface SiriResponse {
  Siri: {
    ServiceDelivery: ServiceDelivery;
  };
}

export interface ServiceDelivery {
  ResponseTimestamp: string;
  ProducerRef: string;
  Status: boolean;
  VehicleMonitoringDelivery: VehicleMonitoringDelivery;
}

export interface VehicleMonitoringDelivery {
  version: string;
  ResponseTimestamp: string;
  VehicleActivity: VehicleActivity[];
}

export interface VehicleActivity {
  RecordedAtTime: string;
  ValidUntilTime: string;
  MonitoredVehicleJourney: MonitoredVehicleJourney;
}

export interface MonitoredVehicleJourney {
  LineRef: string | null;
  DirectionRef: string | null;
  FramedVehicleJourneyRef: FramedVehicleJourneyRef;
  PublishedLineName: string | null;
  OperatorRef: string;
  OriginRef: string | null;
  OriginName: string | null;
  DestinationRef: string | null;
  DestinationName: string | null;
  Monitored: boolean;
  InCongestion: boolean | null;
  VehicleLocation: VehicleLocation;
  Bearing: string;
  Occupancy: string;
  VehicleRef: string;
  MonitoredCall?: MonitoredCall;
  OnwardCalls?: OnwardCalls;
}

export interface FramedVehicleJourneyRef {
  DataFrameRef: string;
  DatedVehicleJourneyRef: string | null;
}

export interface VehicleLocation {
  Longitude: string;
  Latitude: string;
}

export interface MonitoredCall {
  StopPointRef: string;
  StopPointName: string;
  DestinationDisplay: string;
  VehicleLocationAtStop: string;
  VehicleAtStop: string;
  AimedArrivalTime: string;
  ExpectedArrivalTime: string;
  AimedDepartureTime: string;
  ExpectedDepartureTime: string | null;
}

export interface OnwardCalls {
  OnwardCall: OnwardCall[];
}

export interface OnwardCall {
  StopPointRef: string;
  StopPointName: string;
  DestinationDisplay: string;
  AimedArrivalTime: string;
  ExpectedArrivalTime: string;
  AimedDepartureTime: string;
  ExpectedDepartureTime: string | null;
}

/**
 * Alternative implementation with TypeScript types
 */
export interface Vehicle {
  vehicleId: string;
  routeId: string | null;
  routeName: string | null;
  position: {
    latitude: number;
    longitude: number;
  };
  bearing: number;
  occupancy: string;
  timestamp: string;
  destination: string | null;
  nextStop: string | null;
  upcomingStops: {
    name: string;
    expectedArrival: string;
  }[];
}
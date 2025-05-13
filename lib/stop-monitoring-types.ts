// Type definitions for stop monitoring data

/**
 * Represents vehicle location coordinates
 */
export interface VehicleLocation {
	Longitude: string;
	Latitude: string;
}

/**
 * Represents a reference to a framed vehicle journey
 */
export interface FramedVehicleJourneyRef {
	DataFrameRef: string;
	DatedVehicleJourneyRef: string;
}

/**
 * Represents information about a monitored call at a stop
 */
export interface MonitoredCall {
	StopPointRef: string;
	StopPointName: string;
	VehicleLocationAtStop: string;
	VehicleAtStop: string;
	DestinationDisplay: string;
	AimedArrivalTime: string;
	ExpectedArrivalTime: string;
	AimedDepartureTime: string;
	ExpectedDepartureTime: string | null;
	Distances: string;
}

/**
 * Represents information about a monitored vehicle journey
 */
export interface MonitoredVehicleJourney {
	LineRef: string;
	DirectionRef: string;
	FramedVehicleJourneyRef: FramedVehicleJourneyRef;
	PublishedLineName: string;
	OperatorRef: string;
	OriginRef: string;
	OriginName: string;
	DestinationRef: string;
	DestinationName: string;
	Monitored: boolean;
	InCongestion: null;
	VehicleLocation: VehicleLocation;
	Bearing: string | null;
	Occupancy: string | null;
	VehicleRef: string | null;
	MonitoredCall: MonitoredCall;
}

/**
 * Represents a monitored stop visit
 */
export interface MonitoredStopVisit {
	RecordedAtTime: string;
	MonitoringRef: string;
	MonitoredVehicleJourney: MonitoredVehicleJourney;
}

/**
 * Represents stop monitoring delivery data
 */
export interface StopMonitoringDelivery {
	version: string;
	ResponseTimestamp: string;
	Status: boolean;
	MonitoredStopVisit: MonitoredStopVisit[];
}

/**
 * Represents service delivery data
 */
export interface ServiceDelivery {
	ResponseTimestamp: string;
	ProducerRef: string;
	Status: boolean;
	StopMonitoringDelivery: StopMonitoringDelivery;
}

/**
 * Root type for the stop monitoring data
 */
export interface StopMonitoringData {
	ServiceDelivery: ServiceDelivery;
}

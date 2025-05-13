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

// Type definitions for transit system data

/**
 * Represents a direction of travel
 */
export interface Direction {
	DirectionId: string;
	Name: string;
}

/**
 * Destination display information
 */
export interface DestinationDisplayView {
	FontText?: string; // Optional because some instances are empty strings
}

/**
 * Represents a stop point in a journey pattern
 */
export interface StopPointInJourneyPattern {
	StopPointInJourneyPatternId: string;
	Order: string;
	ScheduledStopPointRef: string;
	Name: string;
	DestinationDisplayView: string | DestinationDisplayView;
}

/**
 * Represents a timing point in a journey pattern
 */
export interface TimingPointInJourneyPattern {
	TimingPointInJourneyPatternId: string;
	Order: string;
	ScheduledStopPointRef: string;
	Name: string;
	DestinationDisplayView: string | DestinationDisplayView;
}

/**
 * Collection of points in a journey pattern sequence
 */
export interface PointsInSequence {
	StopPointInJourneyPattern: StopPointInJourneyPattern[];
	TimingPointInJourneyPattern: TimingPointInJourneyPattern[];
}

/**
 * Service links in journey pattern sequence
 */
export interface LinksInSequence {
	ServiceLinkInJourneyPattern: string | any[]; // Could be an empty string or potentially an array
}

/**
 * Represents a journey pattern
 */
export interface JourneyPattern {
	serviceJourneyPatternRef: string;
	LineRef: string;
	TripCount: number;
	FromDate: string;
	ToDate: string;
	Name: string;
	DirectionRef: string;
	DestinationDisplayView: DestinationDisplayView;
	PointsInSequence: PointsInSequence;
	LinksInSequence: LinksInSequence;
}

/**
 * The main transit data structure
 */
export interface TransitData {
	directions: Direction[];
	journeyPatterns: JourneyPattern[];
}

export interface MuniLine {
	Id: string;
	Name: string;
	FromDate: string;
	ToDate: string;
	TransportMode: string;
	PublicCode: string;
	SiriLineRef: string;
	Monitored: boolean;
	OperatorRef: string;
}

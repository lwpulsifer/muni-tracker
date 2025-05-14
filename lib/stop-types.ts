/**
 * TypeScript types for SFMTA transit data
 */

/**
 * Valid date range for a scheduled stop point
 */
export interface ValidBetween {
    FromDate: string;  // ISO format date-time string
    ToDate: string;    // ISO format date-time string
  }
  
  /**
   * Additional properties for a scheduled stop point
   */
  export interface Extensions {
    LocationType: string | null;
    PlatformCode: string | null;
    ParentStation: string | null;
    ValidBetween: ValidBetween;
  }
  
  /**
   * Geographic coordinates of a stop
   */
  export interface Location {
    Longitude: string;  // String representation of a decimal number
    Latitude: string;   // String representation of a decimal number
  }
  
  /**
   * Represents a transit stop location
   */
  export interface ScheduledStopPoint {
    id: string;
    Extensions: Extensions;
    Name: string;
    Location: Location;
    Url: string;
    StopType: string;  // e.g., "onstreetBus"
  }
  
  /**
   * Collection of stop point data
   */
  export interface DataObjects {
    id: string;  // e.g., "SF"
    ScheduledStopPoint: ScheduledStopPoint[];
  }
  
  /**
   * Main contents of the response
   */
  export interface Contents {
    ResponseTimestamp: string;  // ISO format date-time string
    dataObjects: DataObjects;
  }
  
  /**
   * Root object structure
   */
  export interface SFMTAResponse {
    Contents: Contents;
  }
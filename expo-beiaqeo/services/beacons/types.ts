export interface BeaconData {
  id: string;
  uuid: string;
  major: number;
  minor: number;
  proximity: 'immediate' | 'near' | 'far' | 'unknown';
  accuracy: number;
  rssi: number;
  timestamp: string;
  userId?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface BeaconRegion {
  uuid: string;
  identifier: string;
  major?: number;
  minor?: number;
}

export interface BeaconEvent {
  id: string;
  beaconId: string;
  userId: string;
  eventType: 'enter' | 'exit' | 'range_update';
  timestamp: string;
  metadata?: Record<string, any>;
}

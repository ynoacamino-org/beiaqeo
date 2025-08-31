import AsyncStorage from '@react-native-async-storage/async-storage';
import { BeaconData, BeaconEvent } from './types';

export class BeaconService {
  private static instance: BeaconService;
  private detections: BeaconData[] = [];
  private events: BeaconEvent[] = [];
  
  static getInstance(): BeaconService {
    if (!BeaconService.instance) {
      BeaconService.instance = new BeaconService();
    }
    return BeaconService.instance;
  }

  constructor() {
    this.loadFromStorage();
  }

  // Cargar datos desde AsyncStorage
  private async loadFromStorage(): Promise<void> {
    try {
      const detectionsStr = await AsyncStorage.getItem('beacon_detections');
      const eventsStr = await AsyncStorage.getItem('beacon_events');
      
      this.detections = detectionsStr ? JSON.parse(detectionsStr) : [];
      this.events = eventsStr ? JSON.parse(eventsStr) : [];
    } catch (error) {
      console.error('Error loading beacon data from storage:', error);
    }
  }

  // Guardar datos en AsyncStorage
  private async saveToStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem('beacon_detections', JSON.stringify(this.detections));
      await AsyncStorage.setItem('beacon_events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Error saving beacon data to storage:', error);
    }
  }

  // Guardar detección de beacon
  async saveBeaconDetection(beaconData: BeaconData): Promise<void> {
    try {
      // Evitar duplicados muy cercanos en tiempo
      const existing = this.detections.find(
        d => d.uuid === beaconData.uuid && 
             d.major === beaconData.major && 
             d.minor === beaconData.minor &&
             Math.abs(new Date(d.timestamp).getTime() - new Date(beaconData.timestamp).getTime()) < 5000
      );

      if (!existing) {
        this.detections.unshift(beaconData);
        
        // Mantener solo las últimas 100 detecciones
        if (this.detections.length > 100) {
          this.detections = this.detections.slice(0, 100);
        }
        
        await this.saveToStorage();
      }
    } catch (error) {
      console.error('Error saving beacon detection:', error);
    }
  }

  // Registrar evento de beacon (entrada/salida)
  async logBeaconEvent(event: BeaconEvent): Promise<void> {
    try {
      this.events.unshift(event);
      
      // Mantener solo los últimos 50 eventos
      if (this.events.length > 50) {
        this.events = this.events.slice(0, 50);
      }
      
      await this.saveToStorage();
    } catch (error) {
      console.error('Error logging beacon event:', error);
    }
  }

  // Obtener historial de detecciones
  getBeaconHistory(limit: number = 50): BeaconData[] {
    return this.detections.slice(0, limit);
  }

  // Obtener eventos
  getBeaconEvents(limit: number = 20): BeaconEvent[] {
    return this.events.slice(0, limit);
  }

  // Limpiar datos antiguos
  async clearOldData(daysOld: number = 7): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    this.detections = this.detections.filter(
      d => new Date(d.timestamp) > cutoffDate
    );
    
    this.events = this.events.filter(
      e => new Date(e.timestamp) > cutoffDate
    );
    
    await this.saveToStorage();
  }

  // Obtener estadísticas simples
  getStats(): { totalDetections: number; todayDetections: number; uniqueBeacons: number } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayDetections = this.detections.filter(
      d => new Date(d.timestamp) >= today
    );
    
    const uniqueBeacons = new Set(
      this.detections.map(d => `${d.uuid}-${d.major}-${d.minor}`)
    );
    
    return {
      totalDetections: this.detections.length,
      todayDetections: todayDetections.length,
      uniqueBeacons: uniqueBeacons.size,
    };
  }
}

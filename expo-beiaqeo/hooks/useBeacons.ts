import { useState, useEffect, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';
import DeviceInfo from 'react-native-device-info';
import { BeaconRegion, BeaconData } from '../services/beacons/types';
import { BeaconService } from '../services/beacons/beaconService';

// Para react-native-ibeacon (solo funciona en dispositivos físicos)
let Beacons: any;
if (!__DEV__) {
  try {
    Beacons = require('react-native-ibeacon');
  } catch (error) {
    console.warn('react-native-ibeacon not available in development');
  }
}

export interface UseBeaconsOptions {
  enableLocationTracking?: boolean;
  scanInterval?: number;
}

export const useBeacons = (options: UseBeaconsOptions = {}) => {
  const {
    enableLocationTracking = true,
    scanInterval = 5000,
  } = options;

  const [isScanning, setIsScanning] = useState(false);
  const [detectedBeacons, setDetectedBeacons] = useState<BeaconData[]>([]);
  const [regions, setRegions] = useState<BeaconRegion[]>([]);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const beaconService = BeaconService.getInstance();

  // Solicitar permisos
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (locationStatus !== 'granted') {
        setError('Permisos de ubicación requeridos para detectar beacons');
        return false;
      }

      if (Platform.OS === 'android') {
        const bluetoothPermissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];

        const apiLevel = await DeviceInfo.getApiLevel();
        if (apiLevel >= 31) {
          bluetoothPermissions.push(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
          );
        }

        const granted = await PermissionsAndroid.requestMultiple(bluetoothPermissions);
        
        const allGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          setError('Permisos de Bluetooth requeridos para detectar beacons');
          return false;
        }
      }

      setHasPermissions(true);
      setError(null);
      return true;
    } catch (err) {
      setError(`Error al solicitar permisos: ${err}`);
      return false;
    }
  }, []);

  // Agregar región para monitorear
  const addRegion = useCallback((region: BeaconRegion) => {
    setRegions(prev => {
      const exists = prev.find(r => r.identifier === region.identifier);
      if (exists) return prev;
      return [...prev, region];
    });
  }, []);

  // Obtener ubicación actual
  const getCurrentLocation = useCallback(async () => {
    if (!enableLocationTracking) return null;
    
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (err) {
      console.warn('No se pudo obtener la ubicación:', err);
      return null;
    }
  }, [enableLocationTracking]);

  // Procesar beacon detectado
  const processBeaconDetection = useCallback(async (beacon: any) => {
    const location = await getCurrentLocation();
    
    const beaconData: BeaconData = {
      id: `${beacon.uuid}-${beacon.major}-${beacon.minor}`,
      uuid: beacon.uuid,
      major: beacon.major,
      minor: beacon.minor,
      proximity: beacon.proximity,
      accuracy: beacon.accuracy,
      rssi: beacon.rssi,
      timestamp: new Date().toISOString(),
      location: location || undefined,
    };

    // Actualizar estado local
    setDetectedBeacons(prev => {
      const existing = prev.findIndex(b => b.id === beaconData.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = beaconData;
        return updated;
      }
      return [...prev, beaconData];
    });

    // Guardar en servicio
    await beaconService.saveBeaconDetection(beaconData);
  }, [beaconService, getCurrentLocation]);

  // Iniciar escaneo
  const startScanning = useCallback(async () => {
    if (!hasPermissions) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    if (!Beacons || __DEV__) {
      // Simulación para desarrollo
      console.log('Modo simulación: Generando beacon ficticio');
      const mockBeacon = {
        uuid: 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0',
        major: 1,
        minor: 1,
        proximity: 'near' as const,
        accuracy: 2.5,
        rssi: -45,
      };
      await processBeaconDetection(mockBeacon);
      setIsScanning(true);
      return;
    }

    try {
      // Configurar regiones para monitorear
      regions.forEach(region => {
        Beacons.startMonitoringForRegion(region);
        Beacons.startRangingBeaconsInRegion(region);
      });

      // Eventos de beacons
      Beacons.BeaconsEventEmitter.addListener(
        'beaconsDidRange',
        (data: any) => {
          if (data.beacons && data.beacons.length > 0) {
            data.beacons.forEach(processBeaconDetection);
          }
        }
      );

      setIsScanning(true);
      setError(null);
    } catch (err) {
      setError(`Error al iniciar escaneo: ${err}`);
    }
  }, [hasPermissions, regions, requestPermissions, processBeaconDetection]);

  // Detener escaneo
  const stopScanning = useCallback(() => {
    if (!Beacons || __DEV__) {
      setIsScanning(false);
      return;
    }

    try {
      regions.forEach(region => {
        Beacons.stopMonitoringForRegion(region);
        Beacons.stopRangingBeaconsInRegion(region);
      });

      Beacons.BeaconsEventEmitter.removeAllListeners('beaconsDidRange');
      setIsScanning(false);
    } catch (err) {
      setError(`Error al detener escaneo: ${err}`);
    }
  }, [regions]);

  // Limpiar beacons antiguos
  const clearOldBeacons = useCallback(() => {
    const now = Date.now();
    setDetectedBeacons(prev => 
      prev.filter(beacon => {
        const beaconTime = new Date(beacon.timestamp).getTime();
        return (now - beaconTime) < scanInterval * 2;
      })
    );
  }, [scanInterval]);

  useEffect(() => {
    const interval = setInterval(clearOldBeacons, scanInterval);
    return () => clearInterval(interval);
  }, [clearOldBeacons, scanInterval]);

  useEffect(() => {
    return () => {
      if (isScanning) {
        stopScanning();
      }
    };
  }, [isScanning, stopScanning]);

  return {
    isScanning,
    detectedBeacons,
    regions,
    hasPermissions,
    error,
    startScanning,
    stopScanning,
    addRegion,
    requestPermissions,
  };
};

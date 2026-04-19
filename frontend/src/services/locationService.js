// src/services/locationService.js
class LocationService {
  constructor() {
    this.watchId = null;
    this.lastLocation = null;
    this.locationCallbacks = [];
    this.maxRetries = 3;
  }

  // Get location with multiple fallback methods
  async getCurrentLocation(options = {}) {
    const {
      enableHighAccuracy = true,
      timeout = 30000,
      maximumAge = 0,
      retries = this.maxRetries
    } = options;

    console.log('[LocationService] Getting location with options:', { enableHighAccuracy, timeout, maximumAge, retries });

    // Method 1: Try browser geolocation
    if (navigator.geolocation) {
      try {
        const position = await this.getGeolocation({ enableHighAccuracy, timeout, maximumAge });
        const location = this.formatPosition(position);
        console.log('[LocationService] GPS location obtained:', location);
        this.lastLocation = location;
        return location;
      } catch (gpsError) {
        console.warn('[LocationService] GPS failed:', gpsError.message);
        
        // Method 2: Try IP-based location as fallback
        if (retries > 0) {
          console.log('[LocationService] Trying IP-based location...');
          try {
            const ipLocation = await this.getIPLocation();
            console.log('[LocationService] IP location obtained:', ipLocation);
            this.lastLocation = ipLocation;
            return ipLocation;
          } catch (ipError) {
            console.warn('[LocationService] IP location failed:', ipError.message);
            
            // Method 3: Try with lower accuracy
            if (retries > 1) {
              console.log('[LocationService] Trying with lower accuracy...');
              return this.getCurrentLocation({
                enableHighAccuracy: false,
                timeout: timeout + 10000,
                maximumAge: 60000,
                retries: retries - 1
              });
            }
          }
        }
        
        // All methods failed
        throw new Error(`Could not get location: ${gpsError.message}`);
      }
    } else {
      throw new Error('Geolocation not supported by browser');
    }
  }

  // Browser geolocation with promise wrapper
  getGeolocation(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  // IP-based location fallback
  async getIPLocation() {
    try {
      // Try multiple IP location services
      const services = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json?token=test', // Remove token if not needed
        'https://geolocation-db.com/json/'
      ];

      for (const service of services) {
        try {
          const response = await fetch(service, { timeout: 10000 });
          if (response.ok) {
            const data = await response.json();
            
            // Extract coordinates from different service formats
            let lat, lng;
            if (data.latitude && data.longitude) {
              lat = parseFloat(data.latitude);
              lng = parseFloat(data.longitude);
            } else if (data.loc) {
              const [latStr, lngStr] = data.loc.split(',');
              lat = parseFloat(latStr);
              lng = parseFloat(lngStr);
            }

            if (lat && lng) {
              return {
                lat,
                lng,
                accuracy: 50000, // IP-based accuracy is ~50km
                timestamp: new Date().toISOString(),
                source: 'ip',
                city: data.city,
                country: data.country_name || data.country,
                region: data.region || data.region_name
              };
            }
          }
        } catch (serviceError) {
          console.warn(`[LocationService] Service ${service} failed:`, serviceError.message);
          continue;
        }
      }
      
      throw new Error('All IP location services failed');
    } catch (error) {
      throw new Error(`IP location failed: ${error.message}`);
    }
  }

  // Format position object
  formatPosition(position) {
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: new Date(position.timestamp).toISOString(),
      source: 'gps'
    };
  }

  // Start watching location
  startWatching(callback, options = {}) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported');
    }

    if (this.watchId !== null) {
      this.stopWatching();
    }

    const watchOptions = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
      distanceFilter: 10,
      ...options
    };

    console.log('[LocationService] Starting location watch:', watchOptions);
    
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = this.formatPosition(position);
        this.lastLocation = location;
        
        // Notify all callbacks
        this.locationCallbacks.forEach(cb => cb(location));
        
        if (callback) {
          callback(location);
        }
      },
      (error) => {
        console.error('[LocationService] Watch error:', error);
        this.stopWatching();
      },
      watchOptions
    );

    return this.watchId;
  }

  // Stop watching location
  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      console.log('[LocationService] Location watching stopped');
    }
  }

  // Add callback for location updates
  addCallback(callback) {
    if (typeof callback === 'function') {
      this.locationCallbacks.push(callback);
    }
  }

  // Remove callback
  removeCallback(callback) {
    this.locationCallbacks = this.locationCallbacks.filter(cb => cb !== callback);
  }

  // Get last known location
  getLastLocation() {
    return this.lastLocation;
  }

  // Check if location is accurate (less than 100m)
  isAccurate(location) {
    if (!location) return false;
    return location.accuracy < 100;
  }

  // Check if location is likely cached/IP-based
  isLikelyCached(location) {
    if (!location) return true;
    
    // Check accuracy (IP-based locations have high accuracy values)
    if (location.accuracy > 100000) {
      return true;
    }
    
    // Check timestamp (older than 5 minutes)
    const now = new Date().getTime();
    const locationTime = new Date(location.timestamp).getTime();
    const ageInMinutes = (now - locationTime) / (1000 * 60);
    
    return ageInMinutes > 5;
  }
}

export const locationService = new LocationService();
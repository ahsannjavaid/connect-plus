"use client";

import { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load the Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve(); // If the script is already loaded, resolve the promise
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsbc3GUd03n4JiAgTYCaKCR-7h-oFEQvY`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = (error) => reject(error);
          document.head.appendChild(script);
        }
      });
    };

    // Load the Google Maps script and initialize the map
    loadGoogleMapsScript()
      .then(() => {
        if (window.google && mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 40.7128, lng: -74.006 },
            zoom: 8,
          });
        }
      })
      .catch((error) => {
        console.error('Failed to load Google Maps script:', error);
      });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;

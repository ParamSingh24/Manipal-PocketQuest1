import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function getRiskColor(casesPerMillion: number) {
  if (casesPerMillion > 10000) return 'red';
  if (casesPerMillion > 1000) return 'orange';
  return 'green';
}

const OutbreakSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Fetch country and global data
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then(setCountries);
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(setGlobalStats);
  }, []);

  // Load Google Maps
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setMapError('Google Maps API key is missing.');
      return;
    }
    if (window.google && mapRef.current) {
      try {
        const gmap = new window.google.maps.Map(mapRef.current, {
          zoom: 2,
          center: { lat: 20, lng: 0 },
        });
        setMap(gmap);
        setInfoWindow(new window.google.maps.InfoWindow());
      } catch (e) {
        setMapError('Failed to initialize Google Maps.');
      }
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onerror = () => setMapError('Failed to load Google Maps script. Check your API key and network.');
    script.onload = () => {
      if (window.google && mapRef.current) {
        try {
          const gmap = new window.google.maps.Map(mapRef.current, {
            zoom: 2,
            center: { lat: 20, lng: 0 },
          });
          setMap(gmap);
          setInfoWindow(new window.google.maps.InfoWindow());
        } catch (e) {
          setMapError('Failed to initialize Google Maps after script load.');
        }
      } else {
        setMapError('Google Maps did not initialize.');
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [GOOGLE_MAPS_API_KEY]);

  // Add markers
  useEffect(() => {
    if (!map || countries.length === 0 || !window.google) return;
    countries.forEach((country) => {
      const { countryInfo, cases, deaths, recovered, casesPerOneMillion } = country;
      if (!countryInfo || !countryInfo.lat || !countryInfo.long) return;
      const color = getRiskColor(casesPerOneMillion);
      const marker = new window.google.maps.Marker({
        position: { lat: countryInfo.lat, lng: countryInfo.long },
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: color,
          fillOpacity: 0.8,
          strokeWeight: 1,
          strokeColor: '#fff',
        },
        title: country.country,
      });
      marker.addListener('click', () => {
        infoWindow.setContent(`
          <div style='min-width:180px'>
            <strong>${country.country}</strong><br/>
            <span>Cases: ${cases.toLocaleString()}</span><br/>
            <span>Deaths: ${deaths.toLocaleString()}</span><br/>
            <span>Recovered: ${recovered.toLocaleString()}</span><br/>
            <span>Risk: <span style='color:${color};font-weight:bold'>${color.toUpperCase()}</span></span>
          </div>
        `);
        infoWindow.open(map, marker);
      });
    });
  }, [map, countries, infoWindow]);

  return (
    <section className="features-section" style={{ marginBottom: '2rem' }}>
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Global Outbreak Map</h2>
          <p className="features-description">
            Real-time health monitoring and outbreak detection powered by AI and global data sources.
          </p>
        </div>
        <div style={{ width: '100%', height: 400, borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 24, position: 'relative' }}>
          {mapError ? (
            <div style={{ color: 'red', padding: 24, textAlign: 'center', fontWeight: 600 }}>
              {mapError}
            </div>
          ) : (
            <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          )}
        </div>
        {globalStats && (
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            <div><strong>Total Cases:</strong> {globalStats.cases.toLocaleString()}</div>
            <div><strong>Total Deaths:</strong> {globalStats.deaths.toLocaleString()}</div>
            <div><strong>Total Recovered:</strong> {globalStats.recovered.toLocaleString()}</div>
            <div><strong>Active:</strong> {globalStats.active.toLocaleString()}</div>
          </div>
        )}
        <div style={{ fontSize: '1rem', marginBottom: 8 }}>
          <span style={{ color: 'red', fontWeight: 700 }}>●</span> High Risk &nbsp;
          <span style={{ color: 'orange', fontWeight: 700 }}>●</span> Medium Risk &nbsp;
          <span style={{ color: 'green', fontWeight: 700 }}>●</span> Low Risk
        </div>
        <div style={{ color: '#888', fontSize: '0.95rem' }}>
          Data source: <a href="https://disease.sh/" target="_blank" rel="noopener noreferrer">disease.sh</a>
        </div>
      </div>
    </section>
  );
};

export default OutbreakSection; 
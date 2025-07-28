
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddChargerForm from './AddChargerForm';

export default function AdminChargingStations() {
  const [stations, setStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddChargerForm, setShowAddChargerForm] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await axios.get('/api/locations');
        setStations(res.data);
      } catch (err) {
        console.error('Error fetching stations:', err);
      }
    };

    fetchStations();
  }, []);

  // Filter stations based on search input
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddChargerSuccess = () => {
    setShowAddChargerForm(null);
    // Refresh stations list to show updated data
    const fetchStations = async () => {
      try {
        const res = await axios.get('/api/locations');
        setStations(res.data);
      } catch (err) {
        console.error('Error fetching stations:', err);
      }
    };
    fetchStations();
  };

  return (
    <div>
      <h2>Charging Stations</h2>
      
      <input
        type="text"
        placeholder="Search by station name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '16px' }}
      />

      <ul>
        {filteredStations.map(station => (
          <li key={station._id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{station.name}</strong>
              <button 
                onClick={() => setShowAddChargerForm(station._id)}
                style={{ 
                  padding: '6px 12px', 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Charger
              </button>
            </div>
            
            {showAddChargerForm === station._id && (
              <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <AddChargerForm 
                  locationId={station._id} 
                  onSuccess={handleAddChargerSuccess}
                  onCancel={() => setShowAddChargerForm(null)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {filteredStations.length === 0 && <p>No stations found.</p>}
    </div>
  );
}

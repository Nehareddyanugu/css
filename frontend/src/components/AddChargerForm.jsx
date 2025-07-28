
// components/AddChargerForm.jsx
import api from '../api';

export default function AddChargerForm({ locationId, onSuccess, onCancel }) {
  const handleAddCharger = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newCharger = {
      name: form.name.value,
      power: form.power.value,
      type: form.type.value,
      status: form.status.value,
    };
    
    try {
      await api.post(`/api/chargers/${locationId}`, newCharger);
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error adding charger:', err);
      alert('Failed to add charger. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddCharger}>
        <h3>Add New Charger</h3>
        
        <div style={{ marginBottom: '8px' }}>
          <input 
            name="name" 
            placeholder="Charger Name (e.g. Charger 1)" 
            required 
            style={{ width: '100%', padding: '6px', marginBottom: '4px' }}
          />
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <input 
            name="power" 
            type="number" 
            placeholder="Power (kW)" 
            required 
            style={{ width: '100%', padding: '6px', marginBottom: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <select 
            name="type" 
            required
            style={{ width: '100%', padding: '6px', marginBottom: '4px' }}
          >
            <option value="">Select Type</option>
            <option value="AC">AC</option>
            <option value="DC">DC</option>
            <option value="Type2">Type2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <select 
            name="status"
            style={{ width: '100%', padding: '6px', marginBottom: '4px' }}
          >
            <option value="available">Available</option>
            <option value="plugged in">Plugged In</option>
            <option value="faulty">Faulty</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            type="submit"
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Charger
          </button>
          
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

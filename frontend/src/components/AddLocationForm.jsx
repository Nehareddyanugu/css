
import React, { useState } from 'react';
import axios from '../api';

const AddLocationForm = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [batteryPercent, setBatteryPercent] = useState(80);
  const [efficiency, setEfficiency] = useState(5.2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/locations', {
        name: `Route: ${startLocation} to ${endLocation}`,
        latitude: 0, // You would geocode these locations
        longitude: 0,
        address: `${startLocation} to ${endLocation}`,
        batteryPercent,
        efficiency
      });
      console.log('Location added:', response.data);
      // Reset form
      setStartLocation('');
      setEndLocation('');
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const handlePlanRoute = () => {
    console.log('Planning route from', startLocation, 'to', endLocation);
    // Add your route planning logic here
  };

  const handleFindStations = () => {
    console.log('Finding nearest stations');
    // Add your station finding logic here
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Start Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Location
          </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter starting point"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* End Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Location
          </label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Enter destination"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Battery and Efficiency */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery %
            </label>
            <input
              type="number"
              value={batteryPercent}
              onChange={(e) => setBatteryPercent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="100"
            />
            <div className="text-lg font-semibold text-gray-800 mt-1">{batteryPercent}</div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Efficiency (km/kWh)
            </label>
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              step="0.1"
            />
            <div className="text-lg font-semibold text-gray-800 mt-1">{efficiency}</div>
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handlePlanRoute}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
          Plan Route
        </button>
        
        <button
          onClick={handleFindStations}
          className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Find Nearest Stations
        </button>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 py-1">
            Save current location
          </button>
          <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 py-1">
            Recent searches
          </button>
          <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 py-1">
            Favorite stations
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationForm;

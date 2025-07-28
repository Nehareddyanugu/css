
import React, { useState } from 'react';
import axios from '../api';

const AddLocationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '',
    batteryPercentage: 80,
    efficiency: 5.2
  });
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanRoute = async () => {
    setLoading(true);
    try {
      // Route planning logic here
      console.log('Planning route with data:', formData);
    } catch (error) {
      console.error('Route planning failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindStations = async () => {
    setLoading(true);
    try {
      // Find nearest stations logic here
      console.log('Finding nearest stations');
    } catch (error) {
      console.error('Finding stations failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Location Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Location
          </label>
          <input
            type="text"
            name="startLocation"
            placeholder="Enter starting point"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-800 placeholder-gray-500"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Location
          </label>
          <input
            type="text"
            name="endLocation"
            placeholder="Enter destination"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-800 placeholder-gray-500"
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Battery and Efficiency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Battery %
          </label>
          <div className="relative">
            <input
              type="number"
              name="batteryPercentage"
              value={formData.batteryPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 text-gray-800"
            />
            <div className="text-2xl font-bold text-green-600 mt-1">
              {formData.batteryPercentage}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Efficiency (km/kWh)
          </label>
          <div className="relative">
            <input
              type="number"
              name="efficiency"
              value={formData.efficiency}
              onChange={handleInputChange}
              step="0.1"
              min="1"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-800"
            />
            <div className="text-lg font-semibold text-blue-700 mt-1">
              {formData.efficiency}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handlePlanRoute}
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"/>
          </svg>
          {loading ? 'Planning Route...' : 'Plan Route'}
        </button>

        <button
          onClick={handleFindStations}
          disabled={loading}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-50 transition-colors border border-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            📍 Use Current Location
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            ⚡ Fast Charging Only
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            🚗 Optimize for Tesla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationForm;

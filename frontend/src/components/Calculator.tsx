import React, { useState } from 'react';
import { useCarbonStore } from '../store/carbonStore';
import { apiClient } from '../api/apiClient';

export const Calculator: React.FC = () => {
  const { transport, energy, diet, consumption, updateTransport, updateEnergy, updateDiet, updateConsumption, setCalculationResult, setInsights } = useCarbonStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = { transport, energy, diet, consumption };
      const result = await apiClient.calculateFootprint(payload);
      setCalculationResult(result);
      
      // Also fetch insights
      const insightsResult = await apiClient.getInsights(result.breakdown);
      setInsights(insightsResult.insights);
    } catch (err) {
      setError('Failed to calculate footprint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto">
      <h2 className="text-2xl mb-6">Carbon Footprint Calculator</h2>
      
      {error && (
        <div role="alert" aria-live="assertive" className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="border border-secondary-light p-4 rounded-xl">
          <legend className="px-2 font-semibold text-primary">Transport</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="car_km" className="label-text">Car (km/week)</label>
              <input id="car_km" type="number" min="0" className="input-field" value={transport.car_km_per_week} onChange={(e) => updateTransport({ car_km_per_week: Number(e.target.value) })} aria-describedby="car_km_help" />
            </div>
            <div>
              <label htmlFor="bus_km" className="label-text">Bus (km/week)</label>
              <input id="bus_km" type="number" min="0" className="input-field" value={transport.bus_km_per_week} onChange={(e) => updateTransport({ bus_km_per_week: Number(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="train_km" className="label-text">Train (km/week)</label>
              <input id="train_km" type="number" min="0" className="input-field" value={transport.train_km_per_week} onChange={(e) => updateTransport({ train_km_per_week: Number(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="short_flights" className="label-text">Short flights/year</label>
              <input id="short_flights" type="number" min="0" className="input-field" value={transport.short_haul_flights_per_year} onChange={(e) => updateTransport({ short_haul_flights_per_year: Number(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="long_flights" className="label-text">Long flights/year</label>
              <input id="long_flights" type="number" min="0" className="input-field" value={transport.long_haul_flights_per_year} onChange={(e) => updateTransport({ long_haul_flights_per_year: Number(e.target.value) })} />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-secondary-light p-4 rounded-xl">
          <legend className="px-2 font-semibold text-primary">Home Energy</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="electricity_kwh" className="label-text">Electricity (kWh/month)</label>
              <input id="electricity_kwh" type="number" min="0" className="input-field" value={energy.electricity_kwh_per_month} onChange={(e) => updateEnergy({ electricity_kwh_per_month: Number(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="gas_kwh" className="label-text">Natural Gas (kWh/month)</label>
              <input id="gas_kwh" type="number" min="0" className="input-field" value={energy.natural_gas_kwh_per_month} onChange={(e) => updateEnergy({ natural_gas_kwh_per_month: Number(e.target.value) })} />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-secondary-light p-4 rounded-xl">
          <legend className="px-2 font-semibold text-primary">Diet & Consumption</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="diet_type" className="label-text">Diet</label>
              <select id="diet_type" className="input-field" value={diet.diet_type} onChange={(e) => updateDiet({ diet_type: e.target.value as any })}>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="omnivore_low_meat">Omnivore (Low Meat)</option>
                <option value="omnivore_high_meat">Omnivore (High Meat)</option>
              </select>
            </div>
            <div>
              <label htmlFor="consumption_type" className="label-text">Shopping Habits</label>
              <select id="consumption_type" className="input-field" value={consumption.consumption_type} onChange={(e) => updateConsumption({ consumption_type: e.target.value as any })}>
                <option value="minimalist">Minimalist</option>
                <option value="average">Average</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Footprint'}
        </button>
      </form>
    </div>
  );
};

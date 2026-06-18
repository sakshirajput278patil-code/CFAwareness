import React from 'react';
import { useCarbonStore } from '../store/carbonStore';

export const InsightsPanel: React.FC = () => {
  const { calculationResult, insights } = useCarbonStore();

  if (!calculationResult) return null;

  const { total_kg_co2e, breakdown, global_average_comparison_percent, paris_target_comparison_percent } = calculationResult;

  return (
    <div className="card w-full max-w-2xl mx-auto mt-8" aria-live="polite">
      <h2 className="text-2xl mb-4 text-primary">Your Carbon Footprint</h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-background p-6 rounded-xl border border-secondary-light text-center">
          <p className="text-sm text-text-muted mb-2">Total Emissions</p>
          <p className="text-4xl font-bold text-primary-dark">{total_kg_co2e.toLocaleString()}</p>
          <p className="text-sm text-text-muted mt-1">kg CO2e / year</p>
        </div>
        
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Vs Global Average (4,000 kg)</span>
              <span className="font-semibold">{global_average_comparison_percent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-secondary-light/30 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min(global_average_comparison_percent, 100)}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Vs Paris Target (2,000 kg)</span>
              <span className="font-semibold">{paris_target_comparison_percent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-secondary-light/30 rounded-full h-2.5">
              <div className="bg-accent-dark h-2.5 rounded-full" style={{ width: `${Math.min(paris_target_comparison_percent, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl mb-3 text-primary-dark">Breakdown</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-3 bg-secondary-light/20 rounded-lg text-center">
          <p className="text-xs text-text-muted">Transport</p>
          <p className="font-semibold text-primary">{breakdown.transport_kg_co2e.toLocaleString()} kg</p>
        </div>
        <div className="p-3 bg-secondary-light/20 rounded-lg text-center">
          <p className="text-xs text-text-muted">Energy</p>
          <p className="font-semibold text-primary">{breakdown.energy_kg_co2e.toLocaleString()} kg</p>
        </div>
        <div className="p-3 bg-secondary-light/20 rounded-lg text-center">
          <p className="text-xs text-text-muted">Diet</p>
          <p className="font-semibold text-primary">{breakdown.diet_kg_co2e.toLocaleString()} kg</p>
        </div>
        <div className="p-3 bg-secondary-light/20 rounded-lg text-center">
          <p className="text-xs text-text-muted">Consumption</p>
          <p className="font-semibold text-primary">{breakdown.consumption_kg_co2e.toLocaleString()} kg</p>
        </div>
      </div>

      {insights.length > 0 && (
        <>
          <h3 className="text-xl mb-3 text-primary-dark">Personalized Reduction Actions</h3>
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start bg-accent/30 p-4 rounded-lg">
                <span className="text-primary mr-3 mt-1">
                  {/* Custom leaf-like bullet */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                </span>
                <span className="text-text">{insight}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

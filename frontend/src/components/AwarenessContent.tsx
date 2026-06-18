import React from 'react';
import { Leaf, Globe, Zap, Car } from 'lucide-react';

export const AwarenessContent: React.FC = () => {
  return (
    <div className="card w-full max-w-2xl mx-auto my-8">
      <h2 className="text-2xl mb-6 text-primary flex items-center">
        <Globe className="mr-2 h-6 w-6 text-secondary-dark" aria-hidden="true" />
        Learn the Basics
      </h2>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary-light scrollbar-track-transparent">
        
        <article className="bg-background p-5 rounded-xl border border-secondary-light/50">
          <h3 className="text-lg font-bold text-primary-dark mb-2 flex items-center">
            <Globe className="mr-2 h-5 w-5 text-secondary-dark" />
            The 1.5°C Target
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">
            The Paris Agreement set a goal to limit global warming to 1.5°C above pre-industrial levels to avoid the worst impacts of climate change. According to the IPCC SR1.5 (2018), to achieve this, the average personal carbon footprint must drop to around <strong>2,000 kg CO2e per year</strong> by 2030. Currently, the global average is roughly double that at 4,000 kg CO2e.
          </p>
          <a href="#" className="text-primary hover:underline text-sm font-medium">Source: IPCC SR1.5</a>
        </article>

        <article className="bg-background p-5 rounded-xl border border-secondary-light/50">
          <h3 className="text-lg font-bold text-primary-dark mb-2 flex items-center">
            <Car className="mr-2 h-5 w-5 text-secondary-dark" />
            Transport Matters
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">
            Transport is one of the largest sources of emissions. An average petrol car emits roughly 0.17 kg CO2e per passenger km, whereas national rail trains emit around 0.04 kg CO2e per passenger km (DEFRA 2023). Flying, especially short-haul, emits significantly more. Choosing active travel or public transit is one of the most effective personal actions you can take.
          </p>
          <a href="#" className="text-primary hover:underline text-sm font-medium">Source: UK DEFRA 2023</a>
        </article>

        <article className="bg-background p-5 rounded-xl border border-secondary-light/50">
          <h3 className="text-lg font-bold text-primary-dark mb-2 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-secondary-dark" />
            Energy in the Home
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">
            In many regions, electricity and space heating rely heavily on fossil fuels. The average US electricity mix emits 0.38 kg CO2e per kWh (US EPA eGRID 2023). Reducing energy use through better insulation, energy-efficient appliances (like LEDs), or switching to a renewable energy provider significantly cuts your footprint.
          </p>
          <a href="#" className="text-primary hover:underline text-sm font-medium">Source: US EPA eGRID 2023</a>
        </article>

        <article className="bg-background p-5 rounded-xl border border-secondary-light/50">
          <h3 className="text-lg font-bold text-primary-dark mb-2 flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-secondary-dark" />
            Diet and Consumption
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-3">
            What you eat and buy creates "embodied carbon". A plant-based diet can cut food-related emissions by up to 60% compared to a high-meat diet. For instance, producing 1kg of beef creates 60-100 kg CO2e, while lentils produce less than 1 kg CO2e (Our World in Data 2023). Furthermore, mindful consumption and buying less "stuff" reduces the embodied energy of manufacturing.
          </p>
          <a href="#" className="text-primary hover:underline text-sm font-medium">Source: Our World in Data (Poore & Nemecek 2018)</a>
        </article>
      </div>
    </div>
  );
};

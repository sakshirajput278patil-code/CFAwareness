import { create } from 'zustand';

export interface TransportInput {
  car_km_per_week: number;
  bus_km_per_week: number;
  train_km_per_week: number;
  short_haul_flights_per_year: number;
  long_haul_flights_per_year: number;
}

export interface EnergyInput {
  electricity_kwh_per_month: number;
  natural_gas_kwh_per_month: number;
}

export type DietType = 'vegan' | 'vegetarian' | 'omnivore_low_meat' | 'omnivore_high_meat';
export interface DietInput {
  diet_type: DietType;
}

export type ConsumptionType = 'minimalist' | 'average' | 'high';
export interface ConsumptionInput {
  consumption_type: ConsumptionType;
}

export interface CarbonCalculationBreakdown {
  transport_kg_co2e: number;
  energy_kg_co2e: number;
  diet_kg_co2e: number;
  consumption_kg_co2e: number;
}

export interface CarbonCalculationResult {
  total_kg_co2e: number;
  breakdown: CarbonCalculationBreakdown;
  global_average_comparison_percent: number;
  paris_target_comparison_percent: number;
}

export interface QuizResultDetail {
  question_id: string;
  is_correct: boolean;
  correct_option_index: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total_questions: number;
  literacy_band: string;
  details: QuizResultDetail[];
}

interface CarbonState {
  // Input State
  transport: TransportInput;
  energy: EnergyInput;
  diet: DietInput;
  consumption: ConsumptionInput;
  
  // Results
  calculationResult: CarbonCalculationResult | null;
  insights: string[];
  quizResult: QuizResult | null;
  history: CarbonCalculationResult[];
  
  // Actions
  updateTransport: (data: Partial<TransportInput>) => void;
  updateEnergy: (data: Partial<EnergyInput>) => void;
  updateDiet: (data: DietInput) => void;
  updateConsumption: (data: ConsumptionInput) => void;
  setCalculationResult: (result: CarbonCalculationResult) => void;
  setInsights: (insights: string[]) => void;
  setQuizResult: (result: QuizResult) => void;
}

export const useCarbonStore = create<CarbonState>((set) => ({
  transport: {
    car_km_per_week: 0,
    bus_km_per_week: 0,
    train_km_per_week: 0,
    short_haul_flights_per_year: 0,
    long_haul_flights_per_year: 0,
  },
  energy: {
    electricity_kwh_per_month: 0,
    natural_gas_kwh_per_month: 0,
  },
  diet: { diet_type: 'omnivore_low_meat' },
  consumption: { consumption_type: 'average' },
  
  calculationResult: null,
  insights: [],
  quizResult: null,
  history: [], // For simplicity, we just store local session history here too

  updateTransport: (data) => set((state) => ({ transport: { ...state.transport, ...data } })),
  updateEnergy: (data) => set((state) => ({ energy: { ...state.energy, ...data } })),
  updateDiet: (data) => set(() => ({ diet: data })),
  updateConsumption: (data) => set(() => ({ consumption: data })),
  
  setCalculationResult: (result) => set((state) => ({
    calculationResult: result,
    history: [...state.history, result]
  })),
  setInsights: (insights) => set(() => ({ insights })),
  setQuizResult: (result) => set(() => ({ quizResult: result })),
}));

import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { InsightsPanel } from './components/InsightsPanel';
import { QuizCard } from './components/QuizCard';
import { AwarenessContent } from './components/AwarenessContent';
import { HistoryChart } from './components/HistoryChart';
import { Leaf } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'learn'>('calculator');

  return (
    <div className="min-h-screen pb-12">
      <header className="bg-white border-b border-secondary-light/30 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-primary-light" />
            EcoTrack
          </h1>
          <nav>
            <button 
              className={`mr-4 font-medium transition-colors ${activeTab === 'calculator' ? 'text-primary' : 'text-text-muted hover:text-primary-light'}`}
              onClick={() => setActiveTab('calculator')}
            >
              Understand & Track
            </button>
            <button 
              className={`font-medium transition-colors ${activeTab === 'learn' ? 'text-primary' : 'text-text-muted hover:text-primary-light'}`}
              onClick={() => setActiveTab('learn')}
            >
              Learn
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {activeTab === 'calculator' ? (
          <div className="animate-in fade-in duration-500">
            <p className="text-center text-text-muted mb-8 max-w-xl mx-auto">
              Calculate your personal carbon footprint, see how it compares to the 1.5°C target, and get personalized reduction actions.
            </p>
            <Calculator />
            <InsightsPanel />
            <HistoryChart />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
             <p className="text-center text-text-muted mb-8 max-w-xl mx-auto">
              Test your carbon literacy and explore the facts behind global emissions.
            </p>
            <QuizCard />
            <AwarenessContent />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

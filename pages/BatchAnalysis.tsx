import React, { useState } from 'react';
import { HistoricalBatch } from '../types';
import { Check, X, FlaskConical, BarChart2, CheckCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_HISTORY: HistoricalBatch[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `BATCH-2024-05-${String(300 + i).padStart(3, '0')}`,
  startTime: `2024-05-${String(10 + Math.floor(i/2)).padStart(2, '0')} ${10 + (i%5)}:00`,
  duration: '118 min',
  isGood: i % 4 !== 0, // Every 4th is bad
  cqaResults: {
    ph: Number((7.2 + (Math.random() * 0.4 - 0.2)).toFixed(2)),
    diameter: Number((120 + (Math.random() * 10 - 5)).toFixed(1)),
    zeta: Number((-35 + (Math.random() * 5)).toFixed(1)),
  }
}));

const BatchAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedForTrain, setSelectedForTrain] = useState<string[]>([]);
  const [selectedForValid, setSelectedForValid] = useState<string[]>([]);
  
  const toggleSelection = (id: string, type: 'train' | 'valid') => {
    if (type === 'train') {
        if (selectedForValid.includes(id)) setSelectedForValid(prev => prev.filter(x => x !== id));
        setSelectedForTrain(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
        if (selectedForTrain.includes(id)) setSelectedForTrain(prev => prev.filter(x => x !== id));
        setSelectedForValid(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
  };

  const handleTrain = () => {
      // Logic to actually train would go here
      // For demo, we navigate to Library
      navigate('/models');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Batch Analysis</h2>
          <p className="text-slate-500 mt-1">Review historical data and select datasets for model training.</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-500 uppercase font-bold">Training Set</span>
            <span className="text-lg font-bold text-teal-600">{selectedForTrain.length} <span className="text-xs font-normal text-slate-400">batches</span></span>
          </div>
           <div className="bg-white px-4 py-2 rounded shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-500 uppercase font-bold">Validation Set</span>
            <span className="text-lg font-bold text-blue-600">{selectedForValid.length} <span className="text-xs font-normal text-slate-400">batches</span></span>
          </div>
          <button 
            disabled={selectedForTrain.length === 0}
            onClick={handleTrain}
            className={`flex items-center px-4 py-2 rounded shadow-md transition-all ${selectedForTrain.length > 0 ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
          >
            <FlaskConical className="w-4 h-4 mr-2" />
            Train New Model Pair
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg flex-1 overflow-hidden flex flex-col shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input type="text" placeholder="Search Batch ID..." className="pl-9 pr-4 py-1.5 border border-slate-300 rounded text-sm w-64 focus:outline-none focus:ring-1 focus:ring-teal-500" />
             </div>
             <div className="flex items-center space-x-2">
                 <span className="text-sm text-slate-600">Filter:</span>
                 <button className="px-2 py-1 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700">All</button>
                 <button className="px-2 py-1 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-green-700">Good</button>
                 <button className="px-2 py-1 text-xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-red-700">Bad</button>
             </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-500 font-semibold sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-center w-16">Train</th>
                <th className="px-4 py-3 text-center w-16">Valid</th>
                <th className="px-4 py-3">Batch ID</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 text-center">Quality</th>
                <th className="px-4 py-3">PH (End)</th>
                <th className="px-4 py-3">Diameter</th>
                <th className="px-4 py-3">Zeta</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_HISTORY.map((batch) => (
                <tr key={batch.id} className={`hover:bg-slate-50 transition-colors ${!batch.isGood ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedForTrain.includes(batch.id)}
                      onChange={() => toggleSelection(batch.id, 'train')}
                      className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedForValid.includes(batch.id)}
                      onChange={() => toggleSelection(batch.id, 'valid')}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">{batch.id}</td>
                  <td className="px-4 py-3 text-slate-500">{batch.startTime}</td>
                  <td className="px-4 py-3 text-slate-600">{batch.duration}</td>
                  <td className="px-4 py-3 text-center">
                    {batch.isGood ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        Good
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        Bad
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">{batch.cqaResults.ph}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{batch.cqaResults.diameter}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{batch.cqaResults.zeta}</td>
                  <td className="px-4 py-3 text-center">
                      <button className="text-teal-600 hover:text-teal-800 p-1">
                          <BarChart2 className="w-4 h-4" />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BatchAnalysis;
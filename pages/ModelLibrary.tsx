import React, { useState } from 'react';
import { ModelPair, ModelStatus } from '../types';
import { PlayCircle, CheckCircle, Clock, Trash2, Activity, ArrowRight } from 'lucide-react';

const INITIAL_MODELS: ModelPair[] = [
  { id: 'MOD-001', name: 'Polishing-V1.0', trainedDate: '2024-04-15', accuracy: 88.5, status: ModelStatus.ACTIVE, description: 'Baseline model for standard slurry.' },
  { id: 'MOD-002', name: 'Polishing-V1.2-Exp', trainedDate: '2024-05-10', accuracy: 92.1, status: ModelStatus.VALIDATED, description: 'Improved temp bounds based on April data.' },
  { id: 'MOD-003', name: 'New-Formula-Beta', trainedDate: '2024-05-20', accuracy: 76.4, status: ModelStatus.PENDING, description: 'Initial training for new customer formula.' },
];

const ModelLibrary: React.FC = () => {
  const [models, setModels] = useState<ModelPair[]>(INITIAL_MODELS);

  const moveStatus = (id: string, newStatus: ModelStatus) => {
    setModels(prev => prev.map(m => {
        if (m.id === id) return { ...m, status: newStatus };
        // If activating, deactivate others
        if (newStatus === ModelStatus.ACTIVE && m.status === ModelStatus.ACTIVE) return { ...m, status: ModelStatus.VALIDATED };
        return m;
    }));
  };

  const renderCard = (model: ModelPair) => (
    <div key={model.id} className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 flex flex-col hover:shadow-md transition-shadow relative">
       {model.status === ModelStatus.ACTIVE && (
           <div className="absolute top-0 right-0 p-2">
               <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
           </div>
       )}
      
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg mr-3 ${model.status === ModelStatus.ACTIVE ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-500'}`}>
            <Activity className="w-5 h-5" />
        </div>
        <div>
            <h4 className="font-bold text-slate-800 text-sm">{model.name}</h4>
            <span className="text-xs text-slate-400 font-mono">{model.id}</span>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 mb-4 flex-1">{model.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
              <span className="block text-slate-400">Accuracy</span>
              <span className="font-bold text-slate-700">{model.accuracy}%</span>
          </div>
          <div className="bg-slate-50 p-2 rounded border border-slate-100">
              <span className="block text-slate-400">Date</span>
              <span className="font-bold text-slate-700">{model.trainedDate}</span>
          </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
          {model.status === ModelStatus.PENDING && (
               <button onClick={() => moveStatus(model.id, ModelStatus.VALIDATED)} className="text-xs font-medium text-blue-600 hover:underline flex items-center">
                   Validate <ArrowRight className="w-3 h-3 ml-1" />
               </button>
          )}
          {model.status === ModelStatus.VALIDATED && (
               <button onClick={() => moveStatus(model.id, ModelStatus.ACTIVE)} className="text-xs font-medium text-teal-600 hover:underline flex items-center">
                   Activate <PlayCircle className="w-3 h-3 ml-1" />
               </button>
          )}
          {model.status === ModelStatus.ACTIVE && (
              <span className="text-xs font-medium text-green-600 flex items-center cursor-default">
                  Running <CheckCircle className="w-3 h-3 ml-1" />
              </span>
          )}

          <button className="text-slate-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
          </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Model Library</h2>
        <p className="text-slate-500 mt-1">Manage process optimization models (Golden Tunnel & CQA Prediction).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending */}
        <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200">
                <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> Pending Validation
                </h3>
                <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">{models.filter(m => m.status === ModelStatus.PENDING).length}</span>
            </div>
            <div className="space-y-4">
                {models.filter(m => m.status === ModelStatus.PENDING).map(renderCard)}
            </div>
        </div>

        {/* Validated */}
         <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-blue-200">
                <h3 className="font-bold text-blue-600 uppercase text-xs tracking-wider flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" /> Ready (Validated)
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{models.filter(m => m.status === ModelStatus.VALIDATED).length}</span>
            </div>
            <div className="space-y-4">
                {models.filter(m => m.status === ModelStatus.VALIDATED).map(renderCard)}
            </div>
        </div>

        {/* Active */}
         <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-teal-400">
                <h3 className="font-bold text-teal-700 uppercase text-xs tracking-wider flex items-center">
                    <Activity className="w-4 h-4 mr-2" /> Active Deployment
                </h3>
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full">{models.filter(m => m.status === ModelStatus.ACTIVE).length}</span>
            </div>
             <div className="space-y-4">
                {models.filter(m => m.status === ModelStatus.ACTIVE).map(renderCard)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModelLibrary;
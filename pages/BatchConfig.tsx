import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

const BatchConfig: React.FC = () => {
  const [idFormat, setIdFormat] = useState('BATCH-{YYYY}-{MM}-{SEQ:000}');
  const [duration, setDuration] = useState(120);

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Batch Configuration</h2>
          <p className="text-slate-500 mt-1">Define global batch identification and signaling logic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">General Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batch ID Format Pattern</label>
              <input 
                type="text" 
                value={idFormat}
                onChange={(e) => setIdFormat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
              />
              <p className="text-xs text-slate-400 mt-1">Available placeholders: {"{YYYY}, {MM}, {DD}, {SEQ}"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Standard Batch Duration (min)</label>
              <input 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Signal Triggering */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Signal Triggers (OPC-UA)</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batch Start Signal Node</label>
              <div className="flex">
                <input 
                  type="text" 
                  defaultValue="ns=2;s=System.BatchStart"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-l text-slate-600 bg-slate-50 font-mono text-sm"
                />
                 <button className="bg-slate-100 border border-l-0 border-slate-300 px-3 text-slate-600 rounded-r hover:bg-slate-200 text-sm font-medium">Browse</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batch End Signal Node</label>
               <div className="flex">
                <input 
                  type="text" 
                  defaultValue="ns=2;s=System.BatchEnd"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-l text-slate-600 bg-slate-50 font-mono text-sm"
                />
                 <button className="bg-slate-100 border border-l-0 border-slate-300 px-3 text-slate-600 rounded-r hover:bg-slate-200 text-sm font-medium">Browse</button>
              </div>
            </div>

             <div className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>Ensure signal triggers are binary (Boolean). A rising edge (0 to 1) will be interpreted as the event trigger.</p>
             </div>
          </div>
        </div>
      </div>

       <div className="mt-6 flex justify-end">
        <button className="flex items-center bg-slate-800 text-white px-6 py-2.5 rounded shadow hover:bg-slate-900 transition-all">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default BatchConfig;
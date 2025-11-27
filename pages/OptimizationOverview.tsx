import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingUp, Settings2, Play, Pause, RotateCcw, Thermometer, Gauge } from 'lucide-react';
import { DataPoint } from '../types';

// Utils for generating data
const generatePoints = (count: number): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    const time = i;
    // Base Golden Curve (Parabolic heating profile)
    const idealTemp = 20 + 60 * Math.sin((i / 100) * Math.PI); 
    const tempUpper = idealTemp + 5;
    const tempLower = idealTemp - 5;
    
    // Simulate current batch data (slightly noisy)
    const actualTemp = idealTemp + (Math.random() * 4 - 2);

    data.push({
      time,
      temp: Number(actualTemp.toFixed(1)),
      tempUpper: Number(tempUpper.toFixed(1)),
      tempLower: Number(tempLower.toFixed(1)),
      pressure: 0, shear: 0, pressUpper: 0, pressLower: 0 // Simplification for demo
    });
  }
  return data;
};

const INITIAL_DATA = generatePoints(60); // 60 seconds of history

const OptimizationOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'previous' | 'current'>('current');
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeIndex, setTimeIndex] = useState(30);
  
  // Simulation State (The "Dynamic Interaction" part)
  const [tempOffset, setTempOffset] = useState(0); // User drags slider to simulate process change
  const [upperBoundOffset, setUpperBoundOffset] = useState(0); // User adjusts golden tunnel

  // Derived Real-time Data
  const currentBatchData = useMemo(() => {
    return INITIAL_DATA.slice(0, timeIndex).map(pt => ({
      ...pt,
      temp: pt.temp + tempOffset, // Apply simulation
      tempUpper: pt.tempUpper + upperBoundOffset
    }));
  }, [timeIndex, tempOffset, upperBoundOffset]);

  // Health Score Calculation logic
  const healthStats = useMemo(() => {
    const points = currentBatchData;
    let outOfSpecCount = 0;
    
    points.forEach(pt => {
      if (pt.temp > pt.tempUpper || pt.temp < pt.tempLower) {
        outOfSpecCount++;
      }
    });

    const total = points.length || 1;
    const rawScore = 100 - (outOfSpecCount / total) * 100 * 2; // Penalize heavily
    return {
      score: Math.max(0, Math.min(100, Math.round(rawScore))),
      alarms: outOfSpecCount
    };
  }, [currentBatchData]);

  // CQA Prediction Logic (Simulated Model)
  const predictedCQA = useMemo(() => {
     // If health is low, CQA deviates from target (e.g., target PH 7.0)
     const deviation = (100 - healthStats.score) / 200; 
     return {
         ph: (7.2 - deviation).toFixed(2),
         diameter: (120 + deviation * 100).toFixed(1)
     };
  }, [healthStats.score]);

  // Timer for simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && activeTab === 'current') {
      interval = setInterval(() => {
        setTimeIndex(prev => (prev >= INITIAL_DATA.length ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Tabs & Header */}
      <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex space-x-1">
          <button 
            onClick={() => setActiveTab('previous')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'previous' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Previous Batch
          </button>
          <button 
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'current' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Current Batch (Live)
          </button>
        </div>
        
        {activeTab === 'current' && (
             <div className="flex items-center space-x-4 pr-4">
                 <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded border border-slate-200">
                     <span>ID: BATCH-2024-LIVE-001</span>
                     <span className="w-px h-3 bg-slate-300"></span>
                     <span>Phase: Reaction</span>
                     <span className="w-px h-3 bg-slate-300"></span>
                     <span>T: {timeIndex * 10}s</span>
                 </div>
                 <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600">
                     {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                 </button>
                 <button onClick={() => {setTimeIndex(0); setTempOffset(0); setUpperBoundOffset(0)}} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600">
                     <RotateCcw className="w-5 h-5" />
                 </button>
             </div>
        )}
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Main Chart Area */}
        <div className="flex-[3] bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2 text-amber-500" />
                    CPP Trend: Reactor Temperature
                </h3>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs">
                         <span className="w-3 h-3 bg-blue-100 border border-blue-400 mr-1 opacity-50"></span> Golden Tunnel
                    </div>
                    <div className="flex items-center text-xs">
                         <span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span> Actual Temp
                    </div>
                </div>
            </div>
            
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={activeTab === 'current' ? currentBatchData : INITIAL_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `${v}s`} />
                        <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                        {/* Golden Tunnel Area (Constructed by stacking or just Area range) */}
                        <Area type="monotone" dataKey="tempUpper" stroke="none" fill="#bfdbfe" fillOpacity={0.3} baseValue="dataMin" />
                        {/* We fake the lower cut by rendering white below or using complicated stack, for demo we just show Upper as 'Bound' visual */}
                        <Line type="monotone" dataKey="tempLower" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={1} dot={false} activeDot={false} />
                        <Line type="monotone" dataKey="tempUpper" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={1} dot={false} activeDot={false} />
                        
                        {/* Actual Data */}
                        <Line 
                            type="monotone" 
                            dataKey="temp" 
                            stroke={activeTab === 'current' ? "#f59e0b" : "#64748b"} 
                            strokeWidth={3} 
                            dot={false}
                            animationDuration={300}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Dynamic Controls (Simulation) */}
            {activeTab === 'current' && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-8 bg-slate-50/50 p-3 rounded-lg">
                    <div>
                        <label className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                            <span>Simulate Process Drift (Temp Offset)</span>
                            <span className="text-amber-600">{tempOffset > 0 ? '+' : ''}{tempOffset}°C</span>
                        </label>
                        <input 
                            type="range" min="-10" max="10" step="1" 
                            value={tempOffset} onChange={(e) => setTempOffset(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                    </div>
                    <div>
                         <label className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                            <span>Adjust Golden Upper Bound (Tunnel Width)</span>
                            <span className="text-blue-600">{upperBoundOffset > 0 ? '+' : ''}{upperBoundOffset}°C</span>
                        </label>
                        <input 
                            type="range" min="-5" max="5" step="0.5" 
                            value={upperBoundOffset} onChange={(e) => setUpperBoundOffset(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>

        {/* Right Sidebar: Health & Prediction */}
        <div className="flex-[1] flex flex-col space-y-4">
            {/* Health Score Card */}
            <div className={`rounded-lg shadow-sm border p-4 transition-colors ${
                healthStats.score > 80 ? 'bg-white border-slate-200' : 
                healthStats.score > 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
            }`}>
                 <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3">Batch Health Score</h4>
                 <div className="flex items-center justify-between">
                     <Gauge className={`w-10 h-10 ${
                         healthStats.score > 80 ? 'text-teal-500' : healthStats.score > 50 ? 'text-amber-500' : 'text-red-500'
                     }`} />
                     <span className={`text-5xl font-bold ${
                         healthStats.score > 80 ? 'text-slate-800' : healthStats.score > 50 ? 'text-amber-700' : 'text-red-700'
                     }`}>{healthStats.score}</span>
                 </div>
                 {healthStats.alarms > 0 && (
                     <div className="mt-3 flex items-start text-xs text-red-600 bg-red-100 p-2 rounded">
                         <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
                         <span>{healthStats.alarms} seconds out of golden spec!</span>
                     </div>
                 )}
            </div>

            {/* CQA Prediction Card */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex-1">
                 <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-4 flex items-center">
                     <TrendingUp className="w-4 h-4 mr-2" />
                     Predicted CQA (End)
                 </h4>
                 
                 <div className="space-y-4">
                     <div>
                         <div className="flex justify-between text-sm mb-1">
                             <span className="text-slate-600">Predicted PH</span>
                             <span className="font-mono font-bold text-slate-800">{predictedCQA.ph}</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-1.5">
                             <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(Number(predictedCQA.ph)/14)*100}%` }}></div>
                         </div>
                     </div>
                     <div>
                         <div className="flex justify-between text-sm mb-1">
                             <span className="text-slate-600">Pred. Diameter (nm)</span>
                             <span className="font-mono font-bold text-slate-800">{predictedCQA.diameter}</span>
                         </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                             <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                         </div>
                     </div>
                 </div>

                 <div className="mt-6 p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-500">
                     <div className="font-bold mb-1 text-slate-700">Model Pair: MOD-001 (Active)</div>
                     Using linear regression on CPP deviation to predict final quality attributes.
                 </div>
            </div>

            {/* Alarm Settings / Thresholds (Mini) */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider">Alarm Config</h4>
                    <Settings2 className="w-3 h-3 text-slate-400" />
                 </div>
                 <div className="space-y-2 text-xs">
                     <div className="flex justify-between">
                         <span className="text-slate-600">Yellow Alert</span>
                         <span className="font-mono bg-amber-100 text-amber-800 px-1 rounded">> 5s deviation</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-slate-600">Red Alert</span>
                         <span className="font-mono bg-red-100 text-red-800 px-1 rounded">> 15s deviation</span>
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationOverview;
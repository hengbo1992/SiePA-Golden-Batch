import React, { useState } from 'react';
import { INITIAL_TAGS } from '../constants';
import { TagConfig, TagType } from '../types';
import { Save, Plus, Trash2, Edit2, Server } from 'lucide-react';

const IoTConnection: React.FC = () => {
  const [tags, setTags] = useState<TagConfig[]>(INITIAL_TAGS);

  const renderSection = (title: string, type: TagType, description: string) => {
    const filteredTags = tags.filter(t => t.type === type);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${type === TagType.CMA ? 'bg-blue-500' : type === TagType.CPP ? 'bg-amber-500' : 'bg-teal-500'}`}></span>
              {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{description}</p>
          </div>
          <button className="text-xs flex items-center bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded transition-colors text-slate-600">
            <Plus className="w-3 h-3 mr-1.5" /> Add Tag
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Tag Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 w-64">OPC-UA Node ID</th>
                <th className="px-6 py-3 w-24">Unit</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-700">{tag.name}</td>
                  <td className="px-6 py-3 text-slate-500">{tag.description}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-600 border border-slate-200">
                      <Server className="w-3 h-3 mr-2 text-slate-400" />
                      {tag.opcNodeId}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{tag.unit}</td>
                  <td className="px-6 py-3 text-right space-x-2">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTags.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">
                    No tags configured for this section.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">IoT Data Connection</h2>
          <p className="text-slate-500 mt-1">Configure OPC-UA mapping for Critical Attributes and Parameters.</p>
        </div>
        <button className="flex items-center bg-teal-600 text-white px-4 py-2 rounded shadow-md hover:bg-teal-700 transition-all">
          <Save className="w-4 h-4 mr-2" />
          Deploy Configuration
        </button>
      </div>

      {renderSection('Key Material Parameters (CMA)', TagType.CMA, 'Ingredients ratio, dosing time, dosing speed (Pre-batch)')}
      {renderSection('Key Process Parameters (CPP)', TagType.CPP, 'Real-time monitoring: Temperature, Pressure, Shear Speed')}
      {renderSection('Key Quality Attributes (CQA)', TagType.CQA, 'Post-batch measurements: Diameter, PH, Zeta Potential')}
    </div>
  );
};

export default IoTConnection;
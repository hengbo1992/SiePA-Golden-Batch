import { LayoutDashboard, Database, Settings, Activity, FlaskConical, TrendingUp } from 'lucide-react';
import { TagConfig, TagType } from './types';

export const APP_NAME = "SiePA OPT";
export const APP_VERSION = "v2.4.1";

export const NAV_ITEMS = [
  { label: 'Overview & Opt', path: '/', icon: LayoutDashboard },
  { label: 'IoT Connection', path: '/iot', icon: Database },
  { label: 'Batch Config', path: '/config', icon: Settings },
  { label: 'Batch Analysis', path: '/analysis', icon: Activity },
  { label: 'Model Library', path: '/models', icon: FlaskConical },
];

export const INITIAL_TAGS: TagConfig[] = [
  // CMA
  { id: '1', name: 'Material Ratio A/B', description: 'Mixing ratio of main component', opcNodeId: 'ns=2;s=MixRatio', unit: '%', type: TagType.CMA, subType: 'Ratio' },
  { id: '2', name: 'Injection Time', description: 'Moment of catalyst injection', opcNodeId: 'ns=2;s=InjTime', unit: 'sec', type: TagType.CMA, subType: 'Time' },
  // CPP
  { id: '3', name: 'Reactor Temp', description: 'Main reactor internal temperature', opcNodeId: 'ns=2;s=ReactTemp', unit: '°C', type: TagType.CPP, subType: 'Temp' },
  { id: '4', name: 'Vessel Pressure', description: 'Internal pressure during reaction', opcNodeId: 'ns=2;s=VessPress', unit: 'bar', type: TagType.CPP, subType: 'Pressure' },
  { id: '5', name: 'Shear Speed', description: 'Agitator rotation speed', opcNodeId: 'ns=2;s=ShearSpd', unit: 'rpm', type: TagType.CPP, subType: 'Shear' },
  // CQA
  { id: '6', name: 'Particle Diameter', description: 'D50 mean diameter', opcNodeId: 'ns=2;s=PartDiam', unit: 'nm', type: TagType.CQA, subType: 'Diameter' },
  { id: '7', name: 'PH Level', description: 'Final PH value', opcNodeId: 'ns=2;s=FinPH', unit: 'pH', type: TagType.CQA, subType: 'PH' },
  { id: '8', name: 'Zeta Potential', description: 'Surface charge', opcNodeId: 'ns=2;s=Zeta', unit: 'mV', type: TagType.CQA, subType: 'Zeta' },
];
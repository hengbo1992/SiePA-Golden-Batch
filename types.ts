export enum TagType {
  CMA = 'CMA', // Critical Material Attribute
  CPP = 'CPP', // Critical Process Parameter
  CQA = 'CQA'  // Critical Quality Attribute
}

export interface TagConfig {
  id: string;
  name: string;
  description: string;
  opcNodeId: string;
  unit: string;
  type: TagType;
  // Specific properties based on type
  subType?: 'Ratio' | 'Time' | 'Speed' | 'Temp' | 'Pressure' | 'Shear' | 'Diameter' | 'PH' | 'Zeta';
}

export interface BatchConfig {
  idFormat: string; // e.g., "BATCH-{YYYY}-{SEQ}"
  defaultDurationMin: number;
  startSignalNodeId: string;
  endSignalNodeId: string;
}

export interface HistoricalBatch {
  id: string;
  startTime: string;
  duration: string;
  isGood: boolean; // Quality marker
  cqaResults: {
    ph: number;
    diameter: number;
    zeta: number;
  };
}

export enum ModelStatus {
  PENDING = 'Pending',       // In staging area
  VALIDATED = 'Validated',   // Passed validation set
  ACTIVE = 'Active'          // Currently live
}

export interface ModelPair {
  id: string;
  name: string;
  trainedDate: string;
  accuracy: number; // Percentage
  status: ModelStatus;
  description: string;
}

export interface DataPoint {
  time: number; // Seconds from start
  temp: number;
  pressure: number;
  shear: number;
  
  // Golden Tunnel Bounds (Temperature)
  tempUpper: number;
  tempLower: number;

  // Golden Tunnel Bounds (Pressure)
  pressUpper: number;
  pressLower: number;
}
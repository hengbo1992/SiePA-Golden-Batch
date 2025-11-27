import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IoTConnection from './pages/IoTConnection';
import BatchConfig from './pages/BatchConfig';
import BatchAnalysis from './pages/BatchAnalysis';
import ModelLibrary from './pages/ModelLibrary';
import OptimizationOverview from './pages/OptimizationOverview';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<OptimizationOverview />} />
          <Route path="/iot" element={<IoTConnection />} />
          <Route path="/config" element={<BatchConfig />} />
          <Route path="/analysis" element={<BatchAnalysis />} />
          <Route path="/models" element={<ModelLibrary />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
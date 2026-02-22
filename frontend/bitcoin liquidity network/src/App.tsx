import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import ProtocolRegistry from './pages/ProtocolRegistry';
import AssetRegistry from './pages/AssetRegistry';
import LiquiditySignal from './pages/LiquiditySignal';
import RoutingIntent from './pages/RoutingIntent';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import { AnalyticsProvider } from './analytics/AnalyticsContext';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 220 }}>
        <Navbar />
        <ErrorBoundary>
          <AnalyticsProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/protocol-registry" element={<ProtocolRegistry />} />
              <Route path="/asset-registry" element={<AssetRegistry />} />
              <Route path="/liquidity-signal" element={<LiquiditySignal />} />
              <Route path="/routing-intent" element={<RoutingIntent />} />
              <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
            </Routes>
          </AnalyticsProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;

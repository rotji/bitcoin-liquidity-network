import React, { createContext, useContext } from 'react';

interface AnalyticsEvent {
  type: string;
  payload?: Record<string, any>;
  timestamp?: string;
}

interface AnalyticsContextType {
  trackEvent: (event: AnalyticsEvent) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackEvent = (event: AnalyticsEvent) => {
    // Simple: log to console, extendable for backend or third-party
    console.log('[Analytics]', {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    });
    // Optionally: send to backend or analytics service here
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

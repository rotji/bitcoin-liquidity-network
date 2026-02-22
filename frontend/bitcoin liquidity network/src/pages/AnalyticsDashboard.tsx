import React, { useState } from 'react';
import styles from '../styles/AnalyticsDashboard.module.css';

// Temporary in-memory event store for demo
const mockEvents = [
  { type: 'page_view', payload: { page: 'ProtocolRegistry' }, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { type: 'add_protocol', payload: { protocol: { name: 'Bitcoin', status: 'Active', pools: 5 } }, timestamp: new Date(Date.now() - 3500000).toISOString() },
  { type: 'page_view', payload: { page: 'AssetRegistry' }, timestamp: new Date(Date.now() - 3400000).toISOString() },
  { type: 'add_asset', payload: { asset: { name: 'BTC', type: 'Crypto', liquidity: 1000000 } }, timestamp: new Date(Date.now() - 3300000).toISOString() },
  { type: 'liquidity_signal', payload: { user: 'alice', protocol: 'Bitcoin', asset: 'BTC', signal: 'add', amount: 5000 }, timestamp: new Date(Date.now() - 3200000).toISOString() },
  { type: 'routing_intent', payload: { user: 'bob', protocol: 'Ethereum', asset: 'ETH', pool: 'Main', intent: 'swap', timestamp: new Date(Date.now() - 3100000).toISOString() }, timestamp: new Date(Date.now() - 3100000).toISOString() },
];

const eventStore: any[] = [...mockEvents];

export default function AnalyticsDashboard() {
  // Use eventStore for demo (contains mockEvents)
  const [events, setEvents] = useState([...eventStore]);

  const refresh = () => setEvents([...eventStore]);

  return (
    <div className={styles.dashboardPage}>
      <h2 className={styles.title}>Analytics Dashboard</h2>
      <button className={styles.refreshBtn} onClick={refresh}>Refresh</button>
      <table className={styles.analyticsTable}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Payload</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr><td colSpan={3}>No analytics events yet.</td></tr>
          ) : (
            events.map((event, idx) => (
              <tr key={idx}>
                <td>{event.type}</td>
                <td>{JSON.stringify(event.payload)}</td>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

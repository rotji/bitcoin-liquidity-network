import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/ProtocolRegistry.module.css';
import { useAnalytics } from '../analytics/AnalyticsContext';

// Define protocol type
interface Protocol {
  name: string;
  status: string;
  pools: number;
}

export default function ProtocolRegistry() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [newProtocol, setNewProtocol] = useState<Protocol>({ name: '', status: '', pools: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackEvent({ type: 'page_view', payload: { page: 'ProtocolRegistry' } });
    axios.get('/api/protocols')
      .then(res => {
        setProtocols(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load protocols');
        setLoading(false);
      });
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProtocol.name || !newProtocol.status) return;
    axios.post('/api/protocols', { ...newProtocol, pools: Number(newProtocol.pools) })
      .then(res => {
        setProtocols([...protocols, res.data]);
        setNewProtocol({ name: '', status: '', pools: 0 });
        analytics.trackEvent({ type: 'add_protocol', payload: { protocol: newProtocol } });
      })
      .catch(() => setError('Failed to add protocol'));
  };

  return (
    <div className={styles.registryPage}>
      <h2 className={styles.title}>Protocol Registry</h2>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Protocol Name"
          value={newProtocol.name}
          onChange={e => setNewProtocol({ ...newProtocol, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={newProtocol.status}
          onChange={e => setNewProtocol({ ...newProtocol, status: e.target.value })}
        />
        <input
          type="number"
          placeholder="Pools"
          value={newProtocol.pools}
          onChange={e => setNewProtocol({ ...newProtocol, pools: Number(e.target.value) })}
        />
        <button type="submit" disabled={loading}>Add Protocol</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className={styles.protocolTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Pools</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(protocols) ? protocols : []).map((p, idx) => (
            <tr key={idx}>
              <td>{p.name}</td>
              <td>{p.status}</td>
              <td>{p.pools}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

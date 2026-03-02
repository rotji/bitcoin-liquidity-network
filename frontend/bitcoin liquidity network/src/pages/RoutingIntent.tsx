import React, { useState, useEffect } from 'react';
import styles from '../styles/RoutingIntent.module.css';
import {
  getRoutingIntents,
  createRoutingIntent,
  type RoutingIntent,
} from '../../../src/services/RoutingIntentService';
import { getProtocols } from '../../../src/services/ProtocolRegistryService';
import { getPools } from '../../../src/services/PoolService';

export default function RoutingIntent() {
  const [intents, setIntents] = useState<RoutingIntent[]>([]);
  const [protocols, setProtocols] = useState<any[]>([]);
  const [pools, setPools] = useState<any[]>([]);
  const [newIntent, setNewIntent] = useState<any>({ user: '', protocolId: '', poolId: '', asset: '', intent: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const effectiveIntents: RoutingIntent[] =
    Array.isArray(intents) && intents.length > 0
      ? intents
      : [];

  const btcToStxIntents = effectiveIntents.filter(
    (i) => i.asset === 'BTC' && i.intent.toLowerCase().includes('stx')
  );
  const totalRoutingIntents = effectiveIntents.length;
  const totalBtcToStxCount = btcToStxIntents.length;
  const estimatedBtcPerIntent = 0.1; // demo assumption
  const totalBtcToStxVolume = totalBtcToStxCount * estimatedBtcPerIntent;

  useEffect(() => {
    getRoutingIntents()
      .then((data) => {
        setIntents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load routing intents');
        setLoading(false);
      });
    getProtocols()
      .then((data: any) => setProtocols(data))
      .catch(() => setProtocols([]));
  }, []);

  useEffect(() => {
    if (newIntent.protocolId) {
      getPools(Number(newIntent.protocolId))
        .then((data: any) => setPools(data))
        .catch(() => setPools([]));
    } else {
      setPools([]);
    }
  }, [newIntent.protocolId]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntent.user || !newIntent.protocolId || !newIntent.poolId || !newIntent.asset || !newIntent.intent) return;
    // Find protocol and pool names from IDs
    const protocolObj = protocols.find((p: any) => String(p.id) === newIntent.protocolId);
    const poolObj = pools.find((p: any) => String(p.id) === newIntent.poolId);
    createRoutingIntent({
      user: newIntent.user,
      protocol: protocolObj ? protocolObj.name : '',
      pool: poolObj ? poolObj.name : '',
      asset: newIntent.asset,
      intent: newIntent.intent,
    })
      .then((created) => {
        setIntents([...intents, created]);
        setNewIntent({ user: '', protocolId: '', poolId: '', asset: '', intent: '' });
      })
      .catch(() => setError('Failed to add routing intent'));
  };

  return (
    <div className={styles.intentPage}>
      <h2 className={styles.title}>Routing Intents</h2>
      <div className={styles.summaryCards}>
        <div className={styles.card}>
          Total routing intents:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalRoutingIntents}</span>
        </div>
        <div className={styles.card}>
          Users routing BTC → STX:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalBtcToStxCount}</span>
        </div>
        <div className={styles.card}>
          Est. BTC volume BTC → STX:{' '}
          <span style={{ color: '#222', fontWeight: 'bold', fontSize: '2rem' }}>{totalBtcToStxVolume.toFixed(2)} BTC</span>
        </div>
      </div>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="User"
          value={newIntent.user}
          onChange={e => setNewIntent({ ...newIntent, user: e.target.value })}
        />
        <select
          value={newIntent.protocolId}
          onChange={e => setNewIntent({ ...newIntent, protocolId: e.target.value, poolId: '' })}
          required
        >
          <option value="">Select Protocol</option>
          {protocols.map((p: any) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={newIntent.poolId}
          onChange={e => setNewIntent({ ...newIntent, poolId: e.target.value })}
          required
          disabled={!newIntent.protocolId || pools.length === 0}
        >
          <option value="">Select Pool</option>
          {pools.map((pool: any) => (
            <option key={pool.id} value={pool.id}>{pool.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Asset"
          value={newIntent.asset}
          onChange={e => setNewIntent({ ...newIntent, asset: e.target.value })}
        />
        <input
          type="text"
          placeholder="Intent"
          value={newIntent.intent}
          onChange={e => setNewIntent({ ...newIntent, intent: e.target.value })}
        />
        <button type="submit">Publish Intent</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table className={styles.intentTable}>
        <thead>
          <tr>
            <th>User</th>
            <th>Protocol</th>
            <th>Asset</th>
            <th>Pool</th>
            <th>Intent</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {effectiveIntents.map((i, idx) => (
            <tr key={idx}>
              <td>{i.user}</td>
              <td>{i.protocol}</td>
              <td>{i.asset}</td>
              <td>{i.pool}</td>
              <td>{i.intent}</td>
              <td>{new Date(i.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

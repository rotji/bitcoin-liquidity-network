import React, { useState, useEffect } from 'react';
import { getAssets, createAsset } from '../../../src/services/AssetRegistryService';
import { getProtocols } from '../../../src/services/ProtocolRegistryService';
import { getPools } from '../../../src/services/PoolService';
import styles from '../styles/AssetRegistry.module.css';

// Define asset type
interface Asset {
  name: string;
  type: string;
  protocols: string[];
}


export default function AssetRegistry() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [protocols, setProtocols] = useState<any[]>([]);
  const [pools, setPools] = useState<any[]>([]);
  const [newAsset, setNewAsset] = useState<{ name: string; type: string; protocols: string; protocolId: string; poolId: string }>({ name: '', type: '', protocols: '', protocolId: '', poolId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch assets
    getAssets()
      .then((data: any) => {
        setAssets(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load assets');
        setLoading(false);
      });
    // Fetch protocols for dropdown
    getProtocols()
      .then((data: any) => {
        setProtocols(data);
      })
      .catch(() => {
        setError('Failed to load protocols');
      });
  }, []);

  // Fetch pools when protocol changes
  useEffect(() => {
    if (newAsset.protocolId) {
      getPools(Number(newAsset.protocolId))
        .then((data: any) => {
          setPools(data);
        })
        .catch(() => {
          setPools([]);
        });
    } else {
      setPools([]);
    }
  }, [newAsset.protocolId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.type || !newAsset.protocolId || !newAsset.poolId) return;
    setError('');
    try {
      await createAsset({
        name: newAsset.name,
        symbol: newAsset.name.substring(0, 3).toUpperCase(),
        protocolId: Number(newAsset.protocolId),
        poolId: Number(newAsset.poolId),
      });
      setNewAsset({ name: '', type: '', protocols: '', protocolId: '', poolId: '' });
      // Refresh asset list from backend
      const updatedAssets = await getAssets();
      setAssets(updatedAssets);
    } catch (err) {
      setError('Failed to add asset');
    }
  };

  return (
    <div className={styles.registryPage}>
      <h2 className={styles.title}>Asset Registry</h2>
      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Asset Name"
          value={newAsset.name}
          onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type (Native, Token, Wrapped)"
          value={newAsset.type}
          onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
        />
        <select
          value={newAsset.protocolId}
          onChange={e => setNewAsset({ ...newAsset, protocolId: e.target.value, poolId: '' })}
          required
        >
          <option value="">Select Protocol</option>
          {protocols.map((p: any) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={newAsset.poolId}
          onChange={e => setNewAsset({ ...newAsset, poolId: e.target.value })}
          required
          disabled={!newAsset.protocolId || pools.length === 0}
        >
          <option value="">Select Pool</option>
          {pools.map((pool: any) => (
            <option key={pool.id} value={pool.id}>{pool.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Protocols (comma separated)"
          value={newAsset.protocols}
          onChange={e => setNewAsset({ ...newAsset, protocols: e.target.value })}
        />
        <button type="submit">Add Asset</button>
      </form>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Protocols</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(assets) && assets.length > 0 ? assets : [
            { name: 'Bitcoin', type: 'Native', protocols: ['Bitcoin', 'Stacks'] },
            { name: 'Ethereum', type: 'Token', protocols: ['Ethereum', 'Stacks'] }
          ]).map((a, idx) => (
            <tr key={idx}>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{Array.isArray(a.protocols) ? a.protocols.join(', ') : a.protocols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

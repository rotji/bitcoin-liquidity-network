import React, { useState } from 'react';
import styles from '../styles/AssetRegistry.module.css';

// Placeholder for asset data
const initialAssets = [
  { name: 'BTC', type: 'Native', protocols: ['Lightning', 'Liquid'] },
  { name: 'USDT', type: 'Token', protocols: ['Liquid'] },
  { name: 'tBTC', type: 'Wrapped', protocols: ['Fedimint'] },
];

export default function AssetRegistry() {
  const [assets, setAssets] = useState(initialAssets);
  const [newAsset, setNewAsset] = useState({ name: '', type: '', protocols: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.type) return;
    setAssets([
      ...assets,
      {
        name: newAsset.name,
        type: newAsset.type,
        protocols: newAsset.protocols.split(',').map(p => p.trim()),
      },
    ]);
    setNewAsset({ name: '', type: '', protocols: '' });
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
        <input
          type="text"
          placeholder="Protocols (comma separated)"
          value={newAsset.protocols}
          onChange={e => setNewAsset({ ...newAsset, protocols: e.target.value })}
        />
        <button type="submit">Add Asset</button>
      </form>
      <table className={styles.assetTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Protocols</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a, idx) => (
            <tr key={idx}>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{a.protocols.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

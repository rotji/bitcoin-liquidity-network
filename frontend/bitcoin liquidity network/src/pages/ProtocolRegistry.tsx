import React, { useState } from 'react';
import styles from '../styles/ProtocolRegistry.module.css';

// Placeholder for protocol data
const initialProtocols = [
  { name: 'Lightning Network', status: 'Active', pools: 12 },
  { name: 'Liquid', status: 'Active', pools: 5 },
  { name: 'Fedimint', status: 'Beta', pools: 2 },
];

export default function ProtocolRegistry() {
  const [protocols, setProtocols] = useState(initialProtocols);
  const [newProtocol, setNewProtocol] = useState({ name: '', status: '', pools: 0 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProtocol.name || !newProtocol.status) return;
    setProtocols([...protocols, { ...newProtocol, pools: Number(newProtocol.pools) }]);
    setNewProtocol({ name: '', status: '', pools: 0 });
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
        <button type="submit">Add Protocol</button>
      </form>
      <table className={styles.protocolTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Pools</th>
          </tr>
        </thead>
        <tbody>
          {protocols.map((p, idx) => (
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

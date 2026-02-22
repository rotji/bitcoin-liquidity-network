import React from 'react';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div style={{ marginTop: '2.5rem' }}>
        <div className={styles.summaryCards}>
          <div className={styles.card}>Total protocols indexed: <span>0</span></div>
          <div className={styles.card}>Total liquidity observed: <span>0</span></div>
          <div className={styles.card}>Avg pool score: <span>0</span></div>
          <div className={styles.card}>Number of active pools: <span>0</span></div>
        </div>
        <div className={styles.poolTable}>
          <h2>Liquidity Pool Table</h2>
          <table>
            <thead>
              <tr>
                <th>Pool ID / Protocol</th>
                <th>Assets</th>
                <th>Latest reserves</th>
                <th>Price</th>
                <th>Liquidity Score</th>
                <th>Depth metrics</th>
                <th>Risk Flags</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7}>No data yet</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.visualizations}>
          <h2>Visualizations</h2>
          <div>Bar chart placeholder</div>
          <div>Line chart placeholder</div>
          <div>Heatmap placeholder</div>
        </div>
        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <input type="text" placeholder="Search pool by assets or protocol" />
          <button>Toggle View</button>
        </div>
      </div>
    </div>
  );
}

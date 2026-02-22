import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Bitcoin Liquidity Coordination Layer</h1>
        <div style={{ marginTop: '2.5rem' }}>
          <p className={styles.subtitle}>
            The open, data-first infrastructure for discovering, analyzing, and coordinating Bitcoin liquidity across protocols and pools.
          </p>
          <div className={styles.heroDetails}>
            <h2 className={styles.sectionTitle}>Why Use the Coordination Layer?</h2>
            <ul className={styles.featureList}>
              <li>Aggregate liquidity data from multiple Bitcoin protocols and pools</li>
              <li>Visualize liquidity, slippage, and risk metrics in real time</li>
              <li>Empower developers, traders, and protocols with actionable insights</li>
              <li>Composable, modular UI components for analytics and dashboards</li>
              <li>Promote transparency and open access to liquidity information</li>
            </ul>
          </div>
          <a className={styles.cta} href="#dashboard">Get Started</a>
        </div>
      </div>
    </section>
  );
}

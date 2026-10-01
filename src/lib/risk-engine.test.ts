import { describe, it, expect } from 'vitest';
import {
  calculateWeights,
  concentrationScore,
  computeRiskScore,
  type Position,
} from './risk-engine';

describe('Risk Engine', () => {
  const balanced: Position[] = [
    { mint: 'a', symbol: 'SOL', valueUsd: 1000 },
    { mint: 'b', symbol: 'USDC', valueUsd: 1000 },
    { mint: 'c', symbol: 'BONK', valueUsd: 1000 },
  ];

  const concentrated: Position[] = [
    { mint: 'a', symbol: 'SOL', valueUsd: 9000 },
    { mint: 'b', symbol: 'USDC', valueUsd: 1000 },
  ];

  it('calculates weights correctly', () => {
    const weighted = calculateWeights(balanced);
    expect(weighted[0].weight).toBeCloseTo(1 / 3);
    expect(weighted.reduce((s, p) => s + (p.weight || 0), 0)).toBeCloseTo(1);
  });

  it('gives lower concentration score to balanced portfolio', () => {
    const bal = concentrationScore(balanced);
    const conc = concentrationScore(concentrated);
    expect(bal).toBeLessThan(conc);
  });

  it('computes overall risk score', () => {
    const score = computeRiskScore(concentrated);
    expect(score.overall).toBeGreaterThan(0);
    expect(score.overall).toBeLessThanOrEqual(100);
    expect(score.flags).toContain('HIGH_CONCENTRATION');
  });

  it('handles empty portfolio', () => {
    const score = computeRiskScore([]);
    expect(score.overall).toBe(0);
    expect(score.flags).toHaveLength(0);
  });
});
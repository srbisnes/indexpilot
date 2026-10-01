/**
 * IndexPilot Risk Engine
 * Simple, testable risk scoring for portfolio concentration, volatility proxy and liquidity.
 */

export interface Position {
  mint: string;
  symbol: string;
  valueUsd: number;
  weight?: number; // 0-1
}

export interface RiskScore {
  overall: number; // 0-100 (higher = riskier)
  concentration: number;
  volatility: number;
  liquidity: number;
  flags: string[];
}

export function calculateWeights(positions: Position[]): Position[] {
  const total = positions.reduce((sum, p) => sum + p.valueUsd, 0);
  if (total === 0) return positions.map((p) => ({ ...p, weight: 0 }));
  return positions.map((p) => ({
    ...p,
    weight: p.valueUsd / total,
  }));
}

/** Herfindahl-Hirschman Index based concentration (0-100) */
export function concentrationScore(positions: Position[]): number {
  const weighted = calculateWeights(positions);
  const hhi = weighted.reduce((sum, p) => sum + (p.weight || 0) ** 2, 0);
  // HHI ranges ~0-1; map to 0-100
  return Math.round(hhi * 100);
}

/** Placeholder volatility score – later replaced by real realized vol */
export function volatilityScore(positions: Position[]): number {
  // For now: more positions → slightly lower assumed vol, large single bag → higher
  if (positions.length === 0) return 0;
  const maxWeight = Math.max(...calculateWeights(positions).map((p) => p.weight || 0));
  return Math.round(Math.min(100, maxWeight * 80 + 20));
}

/** Simple liquidity proxy */
export function liquidityScore(positions: Position[]): number {
  // Placeholder: assume higher number of positions = better liquidity diversity
  if (positions.length === 0) return 50;
  return Math.max(10, 100 - positions.length * 5);
}

export function computeRiskScore(positions: Position[]): RiskScore {
  const concentration = concentrationScore(positions);
  const volatility = volatilityScore(positions);
  const liquidity = liquidityScore(positions);

  const overall = Math.round(concentration * 0.4 + volatility * 0.4 + liquidity * 0.2);

  const flags: string[] = [];
  if (concentration > 60) flags.push('HIGH_CONCENTRATION');
  if (volatility > 70) flags.push('HIGH_VOLATILITY');
  if (liquidity > 70) flags.push('LOW_LIQUIDITY_DIVERSITY');

  return {
    overall,
    concentration,
    volatility,
    liquidity,
    flags,
  };
}
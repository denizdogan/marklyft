import { Confidence, zTable } from './rules/MaxMarginOfError'

export function sum(values: number[]): number {
  let out = 0
  let counter = values.length
  while (counter--) {
    out += values[counter]
  }
  return out
}

export function mean(values: number[]): number {
  return sum(values) / values.length
}

export function sd(values: number[]): number {
  const m = mean(values)
  const upper = values.reduce((sum, val) => Math.pow(val - m, 2), 0)
  const lower = values.length - 1
  return Math.sqrt(upper / lower)
}

export function moe(values: number[], confidence: Confidence): number {
  const z = zTable[confidence]
  return 100 * z * (sd(values) / Math.sqrt(mean(values)))
}

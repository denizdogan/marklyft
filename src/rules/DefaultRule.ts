import { Rule } from '../Rule'
import { Unit } from '../Unit'
import { MaxMarginOfError } from './MaxMarginOfError'
import { MaxTimeRule } from './MaxTimeRule'
import { MinSamplesRule } from './MinSamplesRule'

export class DefaultRule extends Rule {
  private rules: Rule[]

  constructor(maxMoe: number) {
    super()
    this.rules = [
      new MinSamplesRule(30),
      new MaxTimeRule(1000 * 1000 * 10),
      new MaxMarginOfError(maxMoe)
    ]
  }

  public passes(unit: Unit): boolean {
    return this.rules.every(rule => rule.passes(unit))
  }
}

import { computed, observable } from 'mobx'
import { Plugin } from './Plugin'
import { Rule } from './Rule'
import { DefaultRule } from './rules/DefaultRule'
import { Unit } from './Unit'

export interface Status {
  started: boolean
  units: UnitStatus[]
  done: boolean
}

export interface UnitStatus {
  unit: Unit
  done: boolean
}

export class Suite {
  public name: string
  public plugins: Plugin[] = []
  @observable public rules: Rule[]
  @observable public units: Unit[] = []

  constructor(name: string = '', rules: Rule[] = [new DefaultRule(0.5)]) {
    this.name = name
    this.rules = rules
  }

  public add(name: string, func: any, rules?: Rule[]): this {
    const unit = new Unit(name, func, rules || this.rules)
    this.units.push(unit)
    return this
  }

  public plugin(plugin: Plugin): this {
    this.plugins.push(plugin.setup(this))
    return this
  }

  public async run(): Promise<this> {
    for (const unit of this.units) {
      while (!unit.isDone) {
        await unit.run()
      }
    }
    return this
  }

  @computed public get status(): Status {
    return {
      started: this.units.some(u => u.isDone),
      units: this.units.map(u => ({
        unit: u,
        done: u.isDone
      })),
      done: this.units.every(u => u.isDone)
    }
  }
}

# NOTE: This library is not ready for use quite yet. The documentation is not up to date and there are a few design decisions to iron out.

# 💪 `marklyft` 😎

This is another benchmarking tool for Node.js.

I wrote this because I am too much of a simpleton to understand Benchmark.js. This one is arguably much simpler, but it's easier to use.

- **Easy to use** for simpletons like me
- Sweet **ASCII table output** out of the box
- **Extensible API** using plugins
- **Supports promises**, of course
- Entirely **written in TypeScript**

## Installation

```sh
$ npm i marklyft
```

## Example usage

```js
import ASCIITableOutput from 'marklyft/plugins/ASCIITableOutput'
import { Suite } from 'marklyft'

const numbers: number[] = []
let counter = 10000
while (counter--) {
  numbers.push(Math.random())
}

new Suite(`sum of ${numbers.length} numbers`)
  .plugin(new ASCIITableOutput('unit', 'runs', 'mean'))
  .add('for loop', () => {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i]
    }
    return sum
  })
  .add('while loop', () => {
    let sum = 0
    let counter = numbers.length
    while (counter--) {
      sum += numbers[counter]
    }
    return sum
  })
  .add('for-of loop', () => {
    let sum = 0
    for (const value of numbers) {
      sum += value
    }
    return sum
  })
  .add('forEach', () => {
    let sum = 0
    numbers.forEach(val => {
      sum += val
    })
    return sum
  })
  .add('reduce', () => {
    return numbers.reduce((sum, val) => sum + val, 0)
  })
  .run()
```

```
.-----------------------------------.
|       sum of 10000 numbers        |
|-----------------------------------|
| unit        | runs    | mean (μs) |
| ----------- | ------- | --------- |
| for loop    | 346,096 | 9.92      |
| while loop  | 338,430 | 10.08     |
| for-of loop | 340,147 | 10.07     |
| forEach     | 79,203  | 48.42     |
| reduce      | 263,048 | 13.54     |
'-----------------------------------'
```

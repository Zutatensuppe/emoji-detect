import { assert, describe, it } from 'vitest'
import { detect } from './index'

describe('detect', () => {
  [
    {
      _name: 'no emotes',
      str: 'lalahdlfadofho  sadf ',
      expected: []
    },
    {
      _name: 'unicode emotes 1',
      str: '👩‍⚕️',
      expected: [
        { codepoints: [ 0x1f469, 0x200d, 0x2695, 0xfe0f ] },
      ],
    },
    {
      _name: 'unicode emotes 2',
      str: ' 👨‍👩‍👧‍👦 ',
      expected: [
        { codepoints: [ 0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467, 0x200d, 0x1f466 ] },
      ],
    },
    {
      _name: 'unicode emotes 2 alternative',
      str: ' 👨👩👧👦 ',
      expected: [
        { codepoints: [ 0x1f468 ] },
        { codepoints: [ 0x1f469 ] },
        { codepoints: [ 0x1f467 ] },
        { codepoints: [ 0x1f466 ] },
      ],
    },
    {
      _name: 'unicode emotes 3',
      str: '👨‍🦲',
      expected: [
        { codepoints: [ 0x1f468, 0x200d, 0x1f9b2 ] },
      ],
    },
    {
      _name: 'unicode emotes 3 alternative',
      str: '👨🦲',
      expected: [
        { codepoints: [ 0x1f468 ] },
        { codepoints: [ 0x1f9b2 ] },
      ],
    },
    {
      _name: 'unicode emotes 4',
      str: ' 🙇‍♀️ ',
      expected: [
        { codepoints: [ 0x1f647, 0x200d, 0x2640, 0xfe0f ] },
      ],
    },
    {
      _name: 'unicode emotes 4 alternative',
      str: ' 🙇♀️ ',
      expected: [
        { codepoints: [ 0x1f647 ] },
        { codepoints: [ 0x2640 ] },
      ],
    },
    {
      _name: 'unicode emotes 5',
      str: '🍀🍀🐸',
      expected: [
        { codepoints: [ 0x1f340 ] },
        { codepoints: [ 0x1f340 ] },
        { codepoints: [ 0x1f438 ] },
      ],
    },
    {
      _name: 'pride flag',
      str: '🏳️‍🌈',
      expected: [
        { codepoints: [ 0x1f3f3, 0xfe0f, 0x200d, 0x1f308 ] },
      ],
    },
    {
      _name: 'not pride flag',
      str: '🏳🌈',
      expected: [
        { codepoints: [ 0x1f3f3 ] },
        { codepoints: [ 0x1f308 ] },
      ],
    },
    {
      _name: 'trans flag',
      str: '🏳️‍⚧️',
      expected: [
        { codepoints: [ 0x1f3f3, 0xfe0f, 0x200d, 0x26a7, 0xfe0f ] }
      ],
    },
    {
      _name: 'ukraine flag',
      str: '🇺🇦',
      expected: [
        { codepoints: [ 0x1f1fa, 0x1f1e6 ] },
      ],
    },
  ].forEach(({ _name, str, expected }) => it(_name, () => {
    const actual = detect(str)
    assert.deepStrictEqual(actual, expected)
  }))
})

import { assert, describe, it } from 'vitest'
import { detectCodePoints, detectStrings } from './index'

describe('detectCodePoints', () => {
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
        [ 0x1f469, 0x200d, 0x2695, 0xfe0f ],
      ],
    },
    {
      _name: 'unicode emotes 2',
      str: ' 👨‍👩‍👧‍👦 ',
      expected: [
        [ 0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467, 0x200d, 0x1f466 ],
      ],
    },
    {
      _name: 'unicode emotes 2 alternative',
      str: ' 👨👩👧👦 ',
      expected: [
        [ 0x1f468 ],
        [ 0x1f469 ],
        [ 0x1f467 ],
        [ 0x1f466 ],
      ],
    },
    {
      _name: 'unicode emotes 3',
      str: '👨‍🦲',
      expected: [
        [ 0x1f468, 0x200d, 0x1f9b2 ],
      ],
    },
    {
      _name: 'unicode emotes 3 alternative',
      str: '👨🦲',
      expected: [
        [ 0x1f468 ],
        [ 0x1f9b2 ],
      ],
    },
    {
      _name: 'unicode emotes 4',
      str: ' 🙇‍♀️ ',
      expected: [
        [ 0x1f647, 0x200d, 0x2640, 0xfe0f ],
      ],
    },
    {
      _name: 'unicode emotes 4 alternative',
      str: ' 🙇♀️ ',
      expected: [
        [ 0x1f647 ],
        [ 0x2640 ],
      ],
    },
    {
      _name: 'unicode emotes 5',
      str: '🍀🍀🐸',
      expected: [
        [ 0x1f340 ],
        [ 0x1f340 ],
        [ 0x1f438 ],
      ],
    },
    {
      _name: 'pride flag',
      str: '🏳️‍🌈',
      expected: [
        [ 0x1f3f3, 0xfe0f, 0x200d, 0x1f308 ],
      ],
    },
    {
      _name: 'not pride flag',
      str: '🏳🌈',
      expected: [
        [ 0x1f3f3 ],
        [ 0x1f308 ],
      ],
    },
    {
      _name: 'trans flag',
      str: '🏳️‍⚧️',
      expected: [
        [ 0x1f3f3, 0xfe0f, 0x200d, 0x26a7, 0xfe0f ],
      ],
    },
    {
      _name: 'ukraine flag',
      str: '🇺🇦',
      expected: [
        [ 0x1f1fa, 0x1f1e6 ],
      ],
    },
  ].forEach(({ _name, str, expected }) => it(_name, () => {
    const actual = detectCodePoints(str)
    assert.deepStrictEqual(actual, expected)
  }))
})

describe('detectStrings', () => {
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
        '1f469-200d-2695-fe0f',
      ],
    },
    {
      _name: 'unicode emotes 2',
      str: ' 👨‍👩‍👧‍👦 ',
      expected: [
        '1f468-200d-1f469-200d-1f467-200d-1f466',
      ],
    },
    {
      _name: 'unicode emotes 2 alternative',
      str: ' 👨👩👧👦 ',
      expected: [
        '1f468',
        '1f469',
        '1f467',
        '1f466',
      ],
    },
    {
      _name: 'unicode emotes 3',
      str: '👨‍🦲',
      expected: [
        '1f468-200d-1f9b2',
      ],
    },
    {
      _name: 'unicode emotes 3 alternative',
      str: '👨🦲',
      expected: [
        '1f468',
        '1f9b2',
      ],
    },
    {
      _name: 'unicode emotes 4',
      str: ' 🙇‍♀️ ',
      expected: [
        '1f647-200d-2640-fe0f',
      ],
    },
    {
      _name: 'unicode emotes 4 alternative',
      str: ' 🙇♀️ ',
      expected: [
        '1f647',
        '2640',
      ],
    },
    {
      _name: 'unicode emotes 5',
      str: '🍀🍀🐸',
      expected: [
        '1f340',
        '1f340',
        '1f438',
      ],
    },
    {
      _name: 'pride flag',
      str: '🏳️‍🌈',
      expected: [
        '1f3f3-fe0f-200d-1f308',
      ],
    },
    {
      _name: 'not pride flag',
      str: '🏳🌈',
      expected: [
        '1f3f3',
        '1f308',
      ],
    },
    {
      _name: 'trans flag',
      str: '🏳️‍⚧️',
      expected: [
        '1f3f3-fe0f-200d-26a7-fe0f',
      ],
    },
    {
      _name: 'ukraine flag',
      str: '🇺🇦',
      expected: [
        '1f1fa-1f1e6',
      ],
    },
  ].forEach(({ _name, str, expected }) => it(_name, () => {
    const actual = detectStrings(str)
    assert.deepStrictEqual(actual, expected)
  }))
})

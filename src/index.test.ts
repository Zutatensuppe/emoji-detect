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
      str: '๐ฉโโ๏ธ',
      expected: [
        [ 0x1f469, 0x200d, 0x2695, 0xfe0f ],
      ],
    },
    {
      _name: 'unicode emotes 2',
      str: ' ๐จโ๐ฉโ๐งโ๐ฆ ',
      expected: [
        [ 0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467, 0x200d, 0x1f466 ],
      ],
    },
    {
      _name: 'unicode emotes 2 alternative',
      str: ' ๐จ๐ฉ๐ง๐ฆ ',
      expected: [
        [ 0x1f468 ],
        [ 0x1f469 ],
        [ 0x1f467 ],
        [ 0x1f466 ],
      ],
    },
    {
      _name: 'unicode emotes 3',
      str: '๐จโ๐ฆฒ',
      expected: [
        [ 0x1f468, 0x200d, 0x1f9b2 ],
      ],
    },
    {
      _name: 'unicode emotes 3 alternative',
      str: '๐จ๐ฆฒ',
      expected: [
        [ 0x1f468 ],
        [ 0x1f9b2 ],
      ],
    },
    {
      _name: 'unicode emotes 4',
      str: ' ๐โโ๏ธ ',
      expected: [
        [ 0x1f647, 0x200d, 0x2640, 0xfe0f ],
      ],
    },
    {
      _name: 'unicode emotes 4 alternative',
      str: ' ๐โ๏ธ ',
      expected: [
        [ 0x1f647 ],
        [ 0x2640 ],
      ],
    },
    {
      _name: 'unicode emotes 5',
      str: '๐๐๐ธ',
      expected: [
        [ 0x1f340 ],
        [ 0x1f340 ],
        [ 0x1f438 ],
      ],
    },
    {
      _name: 'pride flag',
      str: '๐ณ๏ธโ๐',
      expected: [
        [ 0x1f3f3, 0xfe0f, 0x200d, 0x1f308 ],
      ],
    },
    {
      _name: 'another pride flag', // from [win] + .
      str: '๐ณโ๐', // code points: [ 0x1f3f3, 0x200d, 0x1f308 ]
      expected: [
        [ 0x1f3f3, 0xfe0f, 0x200d, 0x1f308 ],
      ],
    },
    {
      _name: 'not pride flag',
      str: '๐ณ๐',
      expected: [
        [ 0x1f3f3 ],
        [ 0x1f308 ],
      ],
    },
    {
      _name: 'trans flag',
      str: '๐ณ๏ธโโง๏ธ',
      expected: [
        [ 0x1f3f3, 0xfe0f, 0x200d, 0x26a7, 0xfe0f ],
      ],
    },
    {
      _name: 'ukraine flag',
      str: '๐บ๐ฆ',
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
      str: '๐ฉโโ๏ธ',
      expected: [
        '1f469-200d-2695-fe0f',
      ],
    },
    {
      _name: 'unicode emotes 2',
      str: ' ๐จโ๐ฉโ๐งโ๐ฆ ',
      expected: [
        '1f468-200d-1f469-200d-1f467-200d-1f466',
      ],
    },
    {
      _name: 'unicode emotes 2 alternative',
      str: ' ๐จ๐ฉ๐ง๐ฆ ',
      expected: [
        '1f468',
        '1f469',
        '1f467',
        '1f466',
      ],
    },
    {
      _name: 'unicode emotes 3',
      str: '๐จโ๐ฆฒ',
      expected: [
        '1f468-200d-1f9b2',
      ],
    },
    {
      _name: 'unicode emotes 3 alternative',
      str: '๐จ๐ฆฒ',
      expected: [
        '1f468',
        '1f9b2',
      ],
    },
    {
      _name: 'unicode emotes 4',
      str: ' ๐โโ๏ธ ',
      expected: [
        '1f647-200d-2640-fe0f',
      ],
    },
    {
      _name: 'unicode emotes 4 alternative',
      str: ' ๐โ๏ธ ',
      expected: [
        '1f647',
        '2640',
      ],
    },
    {
      _name: 'unicode emotes 5',
      str: '๐๐๐ธ',
      expected: [
        '1f340',
        '1f340',
        '1f438',
      ],
    },
    {
      _name: 'pride flag',
      str: '๐ณ๏ธโ๐',
      expected: [
        '1f3f3-fe0f-200d-1f308',
      ],
    },
    {
      _name: 'not pride flag',
      str: '๐ณ๐',
      expected: [
        '1f3f3',
        '1f308',
      ],
    },
    {
      _name: 'trans flag',
      str: '๐ณ๏ธโโง๏ธ',
      expected: [
        '1f3f3-fe0f-200d-26a7-fe0f',
      ],
    },
    {
      _name: 'ukraine flag',
      str: '๐บ๐ฆ',
      expected: [
        '1f1fa-1f1e6',
      ],
    },
  ].forEach(({ _name, str, expected }) => it(_name, () => {
    const actual = detectStrings(str)
    assert.deepStrictEqual(actual, expected)
  }))
})

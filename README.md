# emoji-detect

A library to detect emojis in strings.

## Installation

```console
npm i @zutatensuppe/emoji-detect
```

## Usage

```js
import emojiDetect from '@zutatensuppe/emoji-detect'


// Detect Emoji Codepoints
// -------------------------------------------------------------------
const emojiCodePoints = emojiDetect.detectCodePoints('🏳️‍🌈🍀🍀🐸')

// emojiCodePoints will now be:
[
  [ 0x1f3f3, 0xfe0f, 0x200d, 0x1f308 ], // rainbow flag
  [ 0x1f340 ], // clover 1
  [ 0x1f340 ], // clover 2
  [ 0x1f438 ], // frog
]


// Detect Emoji Strings
// -------------------------------------------------------------------
const emojiStrings = emojiDetect.detectStrings('🏳️‍🌈🍀🍀🐸')

// emojiStrings will now be:
[
  '1f3f3-fe0f-200d-1f308', // rainbow flag
  '1f340', // clover 1
  '1f340', // clover 2
  '1f438', // frog
]
```

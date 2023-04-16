# Web Assembley Showcase Project

This is a project made to showcase how to interface and use Web Assembley Text with JavaScript.

## Requirements
  - Node.js
  - [wabt](https://github.com/WebAssembly/wabt) to transform wat &rarr; wasm (CLI tools must be accessible)

## How to run
  - In CLI:
  ```
  cd api
  npm install
  node index.js 
  ```
  - After that open index.html

## To interface with the wat file
- There are some functions already implemented
- To understand the WAT syntax, use online resources like [this one](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)
- If you want to map JS functions to WASM, see lines 2 &rarr; 4 in [test.wat]() and lines 7 &rarr; 15 in [index.js]()
# Study WASM

## Run

### c2wasm

```sh
# install emscripten
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# execute in node
emcc hello.c -o hello.js
node hello.js

# execute in html
emcc hello.c -O3 -o hello.html
python3 -m http.server
open http://localhost:8000/hello.html
```

### rust2wasm

```sh
# rust build
wasm-pack build --target web

# upload to npm
npm adduser
npm publish

# run wasm in js
npm install
npm run dev
```

### ts2wasm

```sh

```

### Reference

- https://developer.mozilla.org/ko/docs/WebAssembly/Guides/Concepts
- https://wasmbyexample.dev/examples/hello-world/hello-world.c.en-us.html

- https://rustwasm.github.io/docs/book/what-is-webassembly.html
- https://wasm-bindgen.github.io/wasm-bindgen/

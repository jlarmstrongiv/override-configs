# override-configs

## Installation

Install [npm package](https://www.npmjs.com/package/override-configs):

```bash
npm install override-configs
```

## Usage

```ts
const overrideConfigs = require("override-configs");

const defaultConfig = { NODE_ENV: "production" };
const overrideFilePaths = [path.join(__dirname, "config.override.js")];

// optional
const args = [{ webpack: {} }];
const options = { silent: true };

module.exports = overrideConfigs(
  defaultConfig,
  overrideFilePaths,
  args,
  options
);
```

Expectations:

- Config file types include: `json`, `js`, `cjs`.
- Config must be the default export.
- Config may be an object or a function.

Configs are merged in the order of [lodash.merge](https://lodash.com/docs/4.17.15#merge).

## License

MIT

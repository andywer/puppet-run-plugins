# Mocha Plugin

Allows running [Mocha](https://mochajs.org) tests in a headless browser using [puppet-run](https://github.com/andywer/puppet-run). Supports JavaScript and TypeScript without any additional configuration.


## Usage

```
Usage
  $ puppet-run --plugin=mocha ./test/*.test.js [...options]

Options
  --help            Print this help.
  -u, --ui          Test interface, like "bdd" or "tdd". Defaults to "bdd".
  -R, --reporter    Test reporter. Defaults to "spec".

See also
  https://mochajs.org/
```

## License

MIT

declare const puppet: PuppetRunClient<PuppetRunMochaConfig>

mocha.run((failures) => {
  puppet.exit(failures > 0 ? 1 : 0)
})

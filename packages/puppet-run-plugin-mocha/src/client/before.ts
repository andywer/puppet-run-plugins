import "mocha/browser-entry"

declare const puppet: PuppetRunClient<PuppetRunMochaConfig>

mocha.reporter(puppet.plugins.mocha.reporter || "spec")
mocha.setup(puppet.plugins.mocha.interface as any || "bdd")

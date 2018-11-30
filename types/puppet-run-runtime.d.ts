declare interface PuppetRunMochaConfig {
  mocha: {
    interface: string,
    reporter: string
  }
}

declare interface PuppetRunClient<PuppetRunPluginsConfig = {}> {
  argv: string[],
  plugins: PuppetRunPluginsConfig,
  exit (exitCode?: number): void
}

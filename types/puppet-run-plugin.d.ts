declare interface PuppetRunPlugin {
  extendPuppetDotPlugins?<InputConfig extends {}, OutputConfig extends InputConfig> (
    puppetDotPlugins: InputConfig,
    scriptArgs: string[]
  ): Promise<OutputConfig>,
  help? (scriptArgs: string[]): string,
  resolveBundleEntrypoints? (scriptArgs: string[]): Promise<string[]>
}

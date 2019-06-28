declare interface PuppetRunEntrypoint {
  servePath?: string
  sourcePath: string
}

declare interface PuppetRunPlugin {
  extendPuppetDotPlugins?<InputConfig extends {}, OutputConfig extends InputConfig>(
    puppetDotPlugins: InputConfig,
    scriptArgs: string[]
  ): Promise<OutputConfig>,
  help?(scriptArgs: string[]): string,
  resolveBundleEntrypoints?(entrypoints: PuppetRunEntrypoint[], scriptArgs: string[]): Promise<PuppetRunEntrypoint[]>
}

import { extendPuppetDotPlugins, help, resolveBundleEntrypoints } from "./plugin"

const plugin: PuppetRunPlugin = {
  help,
  extendPuppetDotPlugins,
  resolveBundleEntrypoints
}

export = plugin

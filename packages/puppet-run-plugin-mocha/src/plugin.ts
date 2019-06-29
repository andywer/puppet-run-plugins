import globCb from "glob"
import minimist from "minimist"

async function glob (globExpression: string) {
  return new Promise<string[]>((resolve, reject) => {
    globCb(globExpression, (error, resolved) => error ? reject(error) : resolve(resolved))
  })
}

export const help = () => `
  puppet-run-plugin-mocha

  Usage
    $ puppet-run plugin:mocha path/to/*.test.js [...options]

  Options
    --help            Print this help.
    -u, --ui          Test interface, like "bdd" or "tdd". Defaults to "bdd".
    -R, --reporter    Test reporter. Defaults to "spec".

  See also
    https://mochajs.org/
`

export async function resolveBundleEntrypoints(entrypoints: PuppetRunEntrypoint[]): Promise<PuppetRunEntrypoint[]> {
  let resolvedEntrypoints: PuppetRunEntrypoint[] = []

  for (const entry of entrypoints) {
    if (!entry.servePath) {
      const resolvedPaths = await glob(entry.sourcePath)
      resolvedEntrypoints = resolvedEntrypoints.concat(
        resolvedPaths.map(resolvedPath => ({ sourcePath: resolvedPath }))
      )
    } else {
      resolvedEntrypoints.push(entry)
    }
  }

  if (resolvedEntrypoints.length === 0) {
    throw new Error(`The provided arguments do not match any file: ${entrypoints.map(entry => entry.sourcePath)}`)
  }

  return [
    { sourcePath: require.resolve("./client/before") },
    ...resolvedEntrypoints,
    { sourcePath: require.resolve("./client/after") }
  ]
}

export async function extendPuppetDotPlugins<InputConfig extends {}, OutputConfig extends InputConfig, PuppetRunMochaConfig> (
  puppetDotPlugins: InputConfig,
  scriptArgs: string[]
): Promise<OutputConfig> {
  const options = minimist(scriptArgs)

  return {
    ...(puppetDotPlugins as any),
    mocha: {
      interface: options.ui || options.u || "bdd",
      reporter: options.reporter || options.R || "spec"
    }
  }
}

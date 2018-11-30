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

export async function resolveBundleEntrypoints (scriptArgs: string[]): Promise<string[]> {
  const sourceGlobs = scriptArgs.filter(arg => !arg.startsWith("-"))

  const resolvedSourceGlobs = await Promise.all(
    sourceGlobs.map(sourceGlob => glob(sourceGlob + "?(.js|.jsx|.ts|.tsx)"))
  )
  const sourcePaths = resolvedSourceGlobs.reduce(
    (flattened, paths) => flattened.concat(paths),
    []
  )

  if (sourcePaths.length === 0) {
    throw new Error(`The provided arguments do not match any file: ${sourceGlobs}`)
  }

  return [
    require.resolve("./client/before"),
    ...sourcePaths,
    require.resolve("./client/after")
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

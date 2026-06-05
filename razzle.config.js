/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */
const fs = require('fs');

let voltoPath = './node_modules/@plone/volto';

let configFile;
if (fs.existsSync(`${this.projectRootPath}/tsconfig.json`))
  configFile = `${this.projectRootPath}/tsconfig.json`;
else if (fs.existsSync(`${this.projectRootPath}/jsconfig.json`))
  configFile = `${this.projectRootPath}/jsconfig.json`;

if (configFile) {
  const jsConfig = require(configFile).compilerOptions;
  const pathsConfig = jsConfig.paths;
  if (pathsConfig['@plone/volto'])
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
}

const defaultVoltoRazzleConfig = require(`${voltoPath}/razzle.config`);
const { modifyWebpackConfig } = defaultVoltoRazzleConfig;

const customModifyWebpackConfig = ({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options,
}) => {
  const config = modifyWebpackConfig({
    env: { target, dev },
    webpackConfig,
    webpackObject,
    options,
  });
  // Suppress handsontable's bundled moment locale warnings: handsontable's
  // package.json exports field blocks those locale paths, causing webpack to
  // warn about every locale it tries to dynamically require.
  config.plugins.push(
    new webpackObject.IgnorePlugin({
      resourceRegExp: /locale/,
      contextRegExp: /handsontable[/\\]node_modules[/\\]moment/,
    }),
  );
  return config;
};

module.exports = {
  ...defaultVoltoRazzleConfig,
  modifyWebpackConfig: customModifyWebpackConfig,
};

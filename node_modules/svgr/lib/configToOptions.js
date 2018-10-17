"use strict";

exports.__esModule = true;
exports.default = void 0;

var _h2xPluginJsx = _interopRequireDefault(require("h2x-plugin-jsx"));

var _wrapIntoComponent = _interopRequireDefault(require("./transforms/wrapIntoComponent"));

var _wrapIntoNativeComponent = _interopRequireDefault(require("./transforms/wrapIntoNativeComponent"));

var _stripAttribute = _interopRequireDefault(require("./h2x/stripAttribute"));

var _emSize = _interopRequireDefault(require("./h2x/emSize"));

var _removeDimensions = _interopRequireDefault(require("./h2x/removeDimensions"));

var _expandProps = _interopRequireDefault(require("./h2x/expandProps"));

var _svgRef = _interopRequireDefault(require("./h2x/svgRef"));

var _replaceAttrValue = _interopRequireDefault(require("./h2x/replaceAttrValue"));

var _removeComments = _interopRequireDefault(require("./h2x/removeComments"));

var _removeStyle = _interopRequireDefault(require("./h2x/removeStyle"));

var _toReactNative = _interopRequireDefault(require("./h2x/toReactNative"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultConfig = {
  bracketSpacing: undefined,
  // default to prettier
  dimensions: true,
  expandProps: true,
  ext: 'js',
  icon: false,
  ids: false,
  jsxBracketSameLine: undefined,
  // default to prettier
  keepUselessDefs: false,
  native: false,
  precision: 3,
  // default to svgo
  prettier: true,
  ref: false,
  replaceAttrValues: [],
  semi: undefined,
  // default to prettier
  singleQuote: undefined,
  // default to prettier
  svgo: true,
  tabWidth: undefined,
  // default to prettier
  template: _wrapIntoComponent.default,
  title: true,
  trailingComma: undefined,
  // default to prettier
  useTabs: undefined,
  // default to prettier
  viewBox: true
};

function configToOptions(config = {}) {
  if (!config.template && config.native) config.template = _wrapIntoNativeComponent.default;
  config = _objectSpread({}, defaultConfig, config);

  function getH2xPlugins() {
    const plugins = [_h2xPluginJsx.default, (0, _stripAttribute.default)('xmlns'), _removeComments.default, _removeStyle.default];
    config.replaceAttrValues.forEach(([oldValue, newValue]) => {
      plugins.push((0, _replaceAttrValue.default)(oldValue, newValue));
    });
    if (!config.dimensions) plugins.push(_removeDimensions.default);
    if (config.icon) plugins.push(_emSize.default);
    if (config.ref) plugins.push(_svgRef.default);
    if (config.expandProps) plugins.push(_expandProps.default);
    if (config.native) plugins.push(_toReactNative.default);
    return plugins;
  }

  function getSvgoConfig() {
    const plugins = [];
    const svgoConfig = {
      plugins
    };
    if (!config.title || config.icon) plugins.push({
      removeTitle: true
    });else if (config.title) plugins.push({
      removeTitle: false
    });
    if (config.viewBox) plugins.push({
      removeViewBox: false
    });
    if (config.keepUselessDefs) plugins.push({
      removeUselessDefs: false
    });
    if (config.ids) plugins.push({
      cleanupIDs: {
        remove: false,
        minify: false
      }
    });
    if (config.precision === 'number') svgoConfig.floatPrecision = Number(svgoConfig.precision);
    return svgoConfig;
  }

  function getPrettierConfig() {
    return {
      semi: config.semi,
      singleQuote: config.singleQuote,
      tabWidth: config.tabWidth,
      useTabs: config.useTabs,
      trailingComma: config.trailingComma,
      bracketSpacing: config.bracketSpacing,
      jsxBracketSameLine: config.jsxBracketSameLine
    };
  }

  return {
    svgo: config.svgo ? getSvgoConfig() : null,
    h2x: {
      plugins: getH2xPlugins()
    },
    prettier: config.prettier ? getPrettierConfig() : null,
    template: config.template(config),
    ext: config.ext
  };
}

var _default = configToOptions;
exports.default = _default;
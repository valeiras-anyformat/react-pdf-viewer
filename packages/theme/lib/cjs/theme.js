'use strict';

var core = require('@react-pdf-viewer/core');
var React = require('react');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const DarkIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M19.5,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.106l-2.4-2.4a1,1,0,0,0-1.414,0l-2.4,2.4H5.5a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.894l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4H18.5a1,1,0,0,0,1-1Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M10,6.349a6,6,0,0,1,0,11.3,6,6,0,1,0,0-11.3Z" }));

const LightIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M19.491,15.106l2.4-2.4a1,1,0,0,0,0-1.414l-2.4-2.4V5.5a1,1,0,0,0-1-1H15.1L12.7,2.1a1,1,0,0,0-1.414,0l-2.4,2.4H5.491a1,1,0,0,0-1,1V8.894l-2.4,2.4a1,1,0,0,0,0,1.414l2.4,2.4V18.5a1,1,0,0,0,1,1H8.885l2.4,2.4a1,1,0,0,0,1.414,0l2.4-2.4h3.394a1,1,0,0,0,1-1Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.491,6c4,0,6,2.686,6,6s-2,6-6,6Z" }));

const SwitchThemeButton = ({ onClick }) => {
  const theme = React__namespace.useContext(core.ThemeContext);
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const isDarkTheme = theme.currentTheme === "dark";
  const label = l10n && l10n.theme ? isDarkTheme ? l10n.theme.switchLightTheme : l10n.theme.switchDarkTheme : isDarkTheme ? "Switch to the light theme" : "Switch to the dark theme";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "theme-switch",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(core.MinimalButton, { ariaLabel: label, testId: "theme__switch-button", onClick }, isDarkTheme ? /* @__PURE__ */ React__namespace.createElement(LightIcon, null) : /* @__PURE__ */ React__namespace.createElement(DarkIcon, null)),
      content: () => label
    }
  );
};

const SwitchTheme = ({ children }) => {
  const theme = React__namespace.useContext(core.ThemeContext);
  const defaultChildern = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeButton, { onClick: props.onClick });
  const render = children || defaultChildern;
  return render({
    onClick: () => theme.setCurrentTheme(theme.currentTheme === "dark" ? "light" : "dark")
  });
};

const SwitchThemeMenuItem = ({ onClick }) => {
  const theme = React__namespace.useContext(core.ThemeContext);
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const isDarkTheme = theme.currentTheme === "dark";
  const label = l10n && l10n.theme ? isDarkTheme ? l10n.theme.switchLightTheme : l10n.theme.switchDarkTheme : isDarkTheme ? "Switch to the light theme" : "Switch to the dark theme";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: isDarkTheme ? /* @__PURE__ */ React__namespace.createElement(LightIcon, null) : /* @__PURE__ */ React__namespace.createElement(DarkIcon, null), testId: "theme__switch-menu", onClick }, label);
};

const themePlugin = () => {
  const SwitchThemeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchTheme, { ...props });
  const SwitchThemeButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(SwitchThemeDecorator, null, (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeButton, { ...props }));
  const SwitchThemeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchThemeDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchThemeMenuItem,
    {
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  return {
    SwitchTheme: SwitchThemeDecorator,
    SwitchThemeButton: SwitchThemeButtonDecorator,
    SwitchThemeMenuItem: SwitchThemeMenuItemDecorator
  };
};

exports.DarkIcon = DarkIcon;
exports.LightIcon = LightIcon;
exports.themePlugin = themePlugin;

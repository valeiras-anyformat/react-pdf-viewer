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

const RotateBackwardIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M3.434,10.537c0.141-0.438,0.316-0.864,0.523-1.274
            M3.069,14.425C3.023,14.053,3,13.679,3,13.305 c0-0.291,0.014-0.579,0.041-0.863
            M4.389,18.111c-0.341-0.539-0.623-1.112-0.843-1.711
            M7.163,20.9 c-0.543-0.345-1.048-0.747-1.506-1.2
            M10.98,22.248c-0.65-0.074-1.29-0.218-1.909-0.431
            M10,4.25h2 c4.987,0.015,9.017,4.069,9.003,9.055c-0.013,4.581-3.456,8.426-8.008,8.945
            M13.5,1.75L10,4.25l3.5,2.5`
  }
));

const RotateForwardIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M20.566,10.537c-0.141-0.438-0.316-0.864-0.523-1.274
            M20.931,14.425C20.977,14.053,21,13.679,21,13.305 c0-0.291-0.014-0.579-0.041-0.863
            M19.611,18.111c0.341-0.539,0.624-1.114,0.843-1.713
            M16.837,20.9 c0.543-0.345,1.048-0.747,1.506-1.2
            M13.02,22.248c0.65-0.074,1.29-0.218,1.909-0.431
            M14,4.25h-2 c-4.987,0.015-9.017,4.069-9.003,9.055c0.013,4.581,3.456,8.426,8.008,8.945
            M10.5,1.75l3.5,2.5l-3.5,2.5`
  }
));

const RotateButton = ({ direction, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const backwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateBackward : "Rotate counterclockwise";
  const forwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateForward : "Rotate clockwise";
  const label = direction === core.RotateDirection.Backward ? backwardLabel : forwardLabel;
  const icon = direction === core.RotateDirection.Backward ? /* @__PURE__ */ React__namespace.createElement(RotateBackwardIcon, null) : /* @__PURE__ */ React__namespace.createElement(RotateForwardIcon, null);
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "rotate",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: label,
          testId: direction === core.RotateDirection.Backward ? "rotate__backward-button" : "rotate__forward-button",
          onClick
        },
        icon
      ),
      content: () => label
    }
  );
};

const Rotate = ({ children, direction, store }) => {
  const onClick = () => {
    const rotate = store.get("rotate");
    if (rotate) {
      rotate(direction);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { direction: props.direction, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    direction,
    onClick
  });
};

const RotateMenuItem = ({ direction, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const backwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateBackward : "Rotate counterclockwise";
  const forwardLabel = l10n && l10n.rotate ? l10n.rotate.rotateForward : "Rotate clockwise";
  const label = direction === core.RotateDirection.Backward ? backwardLabel : forwardLabel;
  const icon = direction === core.RotateDirection.Backward ? /* @__PURE__ */ React__namespace.createElement(RotateBackwardIcon, null) : /* @__PURE__ */ React__namespace.createElement(RotateForwardIcon, null);
  return /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      icon,
      testId: direction === core.RotateDirection.Backward ? "rotate__backward-menu" : "rotate__forward-menu",
      onClick
    },
    label
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const RotatePage = ({ children, store }) => {
  const onRotatePage = (pageIndex, direction) => {
    const rotatePage = store.get("rotatePage");
    if (rotatePage) {
      rotatePage(pageIndex, direction);
    }
  };
  return children({
    onRotatePage
  });
};

const rotatePlugin = () => {
  const store = React__namespace.useMemo(() => core.createStore(), []);
  const RotateDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(Rotate, { ...props, store });
  const RotateBackwardButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: core.RotateDirection.Backward }, (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { ...props }));
  const RotateBackwardMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: core.RotateDirection.Backward }, (p) => /* @__PURE__ */ React__namespace.createElement(
    RotateMenuItem,
    {
      direction: p.direction,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const RotateForwardButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: core.RotateDirection.Forward }, (props) => /* @__PURE__ */ React__namespace.createElement(RotateButton, { ...props }));
  const RotateForwardMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotateDecorator, { direction: core.RotateDirection.Forward }, (p) => /* @__PURE__ */ React__namespace.createElement(
    RotateMenuItem,
    {
      direction: p.direction,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const RotatePageDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(RotatePage, { ...props, store });
  return {
    install: (pluginFunctions) => {
      store.update("rotate", pluginFunctions.rotate);
      store.update("rotatePage", pluginFunctions.rotatePage);
    },
    Rotate: RotateDecorator,
    RotateBackwardButton: RotateBackwardButtonDecorator,
    RotateBackwardMenuItem: RotateBackwardMenuItemDecorator,
    RotateForwardButton: RotateForwardButtonDecorator,
    RotateForwardMenuItem: RotateForwardMenuItemDecorator,
    RotatePage: RotatePageDecorator
  };
};

exports.RotateBackwardIcon = RotateBackwardIcon;
exports.RotateForwardIcon = RotateForwardIcon;
exports.rotatePlugin = rotatePlugin;

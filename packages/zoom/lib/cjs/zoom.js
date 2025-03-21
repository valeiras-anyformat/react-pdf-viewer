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

const ZoomInIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z
            M23.5,23.499
            l-5.929-5.929
            M5.5,10.499h10
            M10.5,5.499v10`
  }
));

const ZoomOutIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z
            M23.5,23.499
            l-5.929-5.929
            M5.5,10.499h10`
  }
));

const useZoom = (store) => {
  const [scale, setScale] = React__namespace.useState(store.get("scale") || 0);
  const handleScaleChanged = (currentScale) => {
    setScale(currentScale);
  };
  React__namespace.useEffect(() => {
    store.subscribe("scale", handleScaleChanged);
    return () => {
      store.unsubscribe("scale", handleScaleChanged);
    };
  }, []);
  return { scale };
};

const CurrentScale = ({ children, store }) => {
  const { scale } = useZoom(store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, `${Math.round(props.scale * 100)}%`);
  const render = children || defaultChildren;
  return render({ scale });
};

const WHEEL_EVENT_OPTIONS = {
  passive: false
};
let svgElement;
const createSvgElement = () => {
  return svgElement || (svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg"));
};
const PinchZoom = ({ pagesContainerRef, store }) => {
  const zoomTo = core.useDebounceCallback((scale) => {
    const zoom = store.get("zoom");
    if (zoom) {
      zoom(scale);
    }
  }, 40);
  const handleWheelEvent = (e) => {
    if (!e.ctrlKey) {
      return;
    }
    e.preventDefault();
    const target = e.target;
    const rect = target.getBoundingClientRect();
    const scaleDiff = 1 - e.deltaY / 100;
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;
    const currentScale = store.get("scale");
    const matrix = createSvgElement().createSVGMatrix().translate(originX, originY).scale(scaleDiff).translate(-originX, -originY).scale(currentScale);
    zoomTo(matrix.a);
  };
  core.useIsomorphicLayoutEffect(() => {
    const pagesContainer = pagesContainerRef.current;
    if (!pagesContainer) {
      return;
    }
    pagesContainer.addEventListener("wheel", handleWheelEvent, WHEEL_EVENT_OPTIONS);
    return () => {
      pagesContainer.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const LEVELS = [
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.1,
  1.3,
  1.5,
  1.7,
  1.9,
  2.1,
  2.4,
  2.7,
  3,
  3.3,
  3.7,
  4.1,
  4.6,
  5.1,
  5.7,
  6.3,
  7,
  7.7,
  8.5,
  9.4,
  10
];
const increase = (currentLevel) => {
  const found = LEVELS.find((item) => item > currentLevel);
  return found || currentLevel;
};
const decrease = (currentLevel) => {
  const found = LEVELS.findIndex((item) => item >= currentLevel);
  return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};

const ShortcutHandler = ({ containerRef, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element || e.shiftKey || e.altKey) {
        return;
      }
      const isCommandPressed = core.isMac() ? e.metaKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      const zoom = store.get("zoom");
      if (!zoom) {
        return;
      }
      const scale = store.get("scale") || 1;
      let newScale = 1;
      switch (e.key) {
        case "-":
          newScale = decrease(scale);
          break;
        case "=":
          newScale = increase(scale);
          break;
        case "0":
          newScale = 1;
          break;
        default:
          newScale = scale;
          break;
      }
      if (newScale !== scale) {
        e.preventDefault();
        zoom(newScale);
      }
    },
    [element]
  );
  React__namespace.useEffect(() => {
    if (!element) {
      return;
    }
    document.addEventListener("keydown", handleDocumentKeyDown);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [element]);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

var styles = {"target":"rpv_97efec6c","scaleLtr":"rpv_40d5565b","scaleRtl":"rpv_40d56cdb","arrow":"rpv_3e2b1ce"};

const DEFAULT_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
const ZoomPopover = ({ levels = DEFAULT_LEVELS, scale, onZoom }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const getSpcialLevelLabel = (level) => {
    switch (level) {
      case core.SpecialZoomLevel.ActualSize:
        return l10n && l10n.zoom ? l10n.zoom.actualSize : "Actual size";
      case core.SpecialZoomLevel.PageFit:
        return l10n && l10n.zoom ? l10n.zoom.pageFit : "Page fit";
      case core.SpecialZoomLevel.PageWidth:
        return l10n && l10n.zoom ? l10n.zoom.pageWidth : "Page width";
    }
  };
  const zoomDocumentLabel = l10n && l10n.zoom ? l10n.zoom.zoomDocument : "Zoom document";
  const renderTarget = (toggle) => {
    const click = () => {
      toggle();
    };
    return /* @__PURE__ */ React__namespace.createElement(core.MinimalButton, { ariaLabel: zoomDocumentLabel, testId: "zoom__popover-target", onClick: click }, /* @__PURE__ */ React__namespace.createElement("span", { className: styles.target }, /* @__PURE__ */ React__namespace.createElement(
      "span",
      {
        "data-testid": "zoom__popover-target-scale",
        className: core.classNames({
          [styles.scaleLtr]: !isRtl,
          [styles.scaleRtl]: isRtl
        })
      },
      Math.round(scale * 100),
      "%"
    ), /* @__PURE__ */ React__namespace.createElement("span", { className: styles.arrow })));
  };
  const renderContent = (toggle) => /* @__PURE__ */ React__namespace.createElement(core.Menu, null, Object.keys(core.SpecialZoomLevel).map((k) => {
    const level = k;
    const clickMenuItem = () => {
      toggle();
      onZoom(level);
    };
    return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { key: level, onClick: clickMenuItem }, getSpcialLevelLabel(level));
  }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null), levels.map((level) => {
    const clickMenuItem = () => {
      toggle();
      onZoom(level);
    };
    return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { key: level, onClick: clickMenuItem }, `${Math.round(level * 100)}%`);
  }));
  return /* @__PURE__ */ React__namespace.createElement(
    core.Popover,
    {
      ariaControlsSuffix: "zoom",
      ariaHasPopup: "menu",
      position: core.Position.BottomCenter,
      target: renderTarget,
      content: renderContent,
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  );
};

const Zoom = ({ children, levels, store }) => {
  const { scale } = useZoom(store);
  const zoomTo = (newLevel) => {
    const zoom = store.get("zoom");
    if (zoom) {
      zoom(newLevel);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ZoomPopover, { levels, scale: props.scale, onZoom: props.onZoom });
  const render = children || defaultChildren;
  return render({
    scale,
    onZoom: zoomTo
  });
};

const ZoomInButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : "Zoom in";
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+=" : "Ctrl+=" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "zoom-in",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "zoom__in-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ZoomInIcon, null)
      ),
      content: () => label
    }
  );
};

const ZoomIn = ({ children, enableShortcuts, store }) => {
  const { scale } = useZoom(store);
  const zoomIn = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      const newLevel = increase(scale);
      zoom(newLevel);
    }
  };
  const render = children || ZoomInButton;
  return render({
    enableShortcuts,
    onClick: zoomIn
  });
};

const ZoomInMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : "Zoom in";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(ZoomInIcon, null), testId: "zoom__in-menu", onClick }, label);
};

const ZoomOutButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomOut : "Zoom out";
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+-" : "Ctrl+-" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "zoom-out",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "zoom__out-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ZoomOutIcon, null)
      ),
      content: () => label
    }
  );
};

const ZoomOut = ({ children, enableShortcuts, store }) => {
  const { scale } = useZoom(store);
  const zoomIn = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      const newLevel = decrease(scale);
      zoom(newLevel);
    }
  };
  const render = children || ZoomOutButton;
  return render({
    enableShortcuts,
    onClick: zoomIn
  });
};

const ZoomOutMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomOut : "Zoom out";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(ZoomOutIcon, null), testId: "zoom__out-menu", onClick }, label);
};

const zoomPlugin = (props) => {
  const zoomPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => core.createStore({}), []);
  const CurrentScaleDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(CurrentScale, { ...props2, store });
  const ZoomInDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomIn, { enableShortcuts: zoomPluginProps.enableShortcuts, ...props2, store });
  const ZoomInButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ZoomInDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomInButton, { ...props2 }));
  const ZoomInMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomInDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    ZoomInMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ZoomOutDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOut, { enableShortcuts: zoomPluginProps.enableShortcuts, ...props2, store });
  const ZoomOutButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ZoomOutDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOutButton, { ...props2 }));
  const ZoomOutMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomOutDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    ZoomOutMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ZoomDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Zoom, { ...props2, store });
  const ZoomPopoverDecorator = (zoomPopverProps) => /* @__PURE__ */ React__namespace.createElement(ZoomDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ZoomPopover, { levels: zoomPopverProps?.levels, ...props2 }));
  const renderViewer = (props2) => {
    const { slot } = props2;
    if (!zoomPluginProps.enableShortcuts) {
      return slot;
    }
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: props2.containerRef, store }), /* @__PURE__ */ React__namespace.createElement(PinchZoom, { pagesContainerRef: props2.pagesContainerRef, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    renderViewer,
    install: (pluginFunctions) => {
      store.update("zoom", pluginFunctions.zoom);
    },
    onViewerStateChange: (viewerState) => {
      store.update("scale", viewerState.scale);
      return viewerState;
    },
    zoomTo: (scale) => {
      const zoom = store.get("zoom");
      if (zoom) {
        zoom(scale);
      }
    },
    CurrentScale: CurrentScaleDecorator,
    ZoomIn: ZoomInDecorator,
    ZoomInButton: ZoomInButtonDecorator,
    ZoomInMenuItem: ZoomInMenuItemDecorator,
    ZoomOut: ZoomOutDecorator,
    ZoomOutButton: ZoomOutButtonDecorator,
    ZoomOutMenuItem: ZoomOutMenuItemDecorator,
    Zoom: ZoomDecorator,
    ZoomPopover: ZoomPopoverDecorator
  };
};

exports.ZoomInIcon = ZoomInIcon;
exports.ZoomOutIcon = ZoomOutIcon;
exports.zoomPlugin = zoomPlugin;

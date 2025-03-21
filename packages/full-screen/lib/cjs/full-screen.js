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

const ExitFullScreenIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 23.499L11.5 14.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M7.5 18.499L11.5 14.499 15.5 18.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 1.499L11.5 10.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M7.5 6.499L11.5 10.499 15.5 6.499" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M20.5 12.499L1.5 12.499" }));

const FullScreenIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M0.5 12L23.5 12" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M11.5 1L11.5 23" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M8.5 4L11.5 1 14.5 4" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M20.5 9L23.5 12 20.5 15" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M3.5 15L0.5 12 3.5 9" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M14.5 20L11.5 23 8.5 20" }));

const EnterFullScreenButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.fullScreen ? l10n.fullScreen.enterFullScreen : "Full screen";
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+Ctrl+F" : "F11" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "full-screen-enter",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          isDisabled: !core.isFullScreenEnabled(),
          testId: "full-screen__enter-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(FullScreenIcon, null)
      ),
      content: () => label
    }
  );
};

const ExitFullScreenButtonWithTooltip = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : "Exit full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "full-screen-exit",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts: "Esc",
          ariaLabel: exitFullScreenLabel,
          testId: "full-screen__exit-button-with-tooltip",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(ExitFullScreenIcon, null)
      ),
      content: () => exitFullScreenLabel
    }
  );
};

const useEnterFullScreen = (getFullScreenTarget, store) => {
  const [fullScreenMode, setFullScreenMode] = React__namespace.useState(store.get("fullScreenMode"));
  const handleFullScreenMode = React__namespace.useCallback((fullScreenMode2) => {
    setFullScreenMode(fullScreenMode2);
  }, []);
  const enterFullScreen = () => {
    const pagesContainer = store.get("getPagesContainer");
    if (!pagesContainer) {
      return;
    }
    const target = getFullScreenTarget(pagesContainer());
    store.get("enterFullScreenMode")(target);
  };
  const exitFullScreen = () => {
    store.get("exitFullScreenMode")();
  };
  React__namespace.useEffect(() => {
    store.subscribe("fullScreenMode", handleFullScreenMode);
    return () => {
      store.unsubscribe("fullScreenMode", handleFullScreenMode);
    };
  }, []);
  return {
    enterFullScreen,
    exitFullScreen,
    isFullScreen: fullScreenMode === core.FullScreenMode.Entering || fullScreenMode === core.FullScreenMode.Entered
  };
};

const EnterFullScreen = ({ children, enableShortcuts, getFullScreenTarget, store }) => {
  const { enterFullScreen, exitFullScreen, isFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const defaultChildren = (props) => isFullScreen ? /* @__PURE__ */ React__namespace.createElement(ExitFullScreenButtonWithTooltip, { onClick: props.onClick }) : /* @__PURE__ */ React__namespace.createElement(EnterFullScreenButton, { enableShortcuts, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: isFullScreen ? exitFullScreen : enterFullScreen
  });
};

const EnterFullScreenMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.fullScreen ? l10n.fullScreen.enterFullScreen : "Full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(FullScreenIcon, null),
      isDisabled: !core.isFullScreenEnabled(),
      testId: "full-screen__enter-menu",
      onClick
    },
    label
  );
};

var styles$1 = {"button":"rpv_603aaf14","buttonLtr":"rpv_4d1d3436","buttonRtl":"rpv_4d1d4ab6"};

const ExitFullScreenButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const exitFullScreenLabel = l10n && l10n.fullScreen ? l10n.fullScreen.exitFullScreen : "Exit full screen";
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: core.classNames({
        [styles$1.button]: true,
        [styles$1.buttonLtr]: !isRtl,
        [styles$1.buttonRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(
      core.MinimalButton,
      {
        ariaLabel: exitFullScreenLabel,
        testId: "full-screen__exit-button",
        onClick
      },
      /* @__PURE__ */ React__namespace.createElement(ExitFullScreenIcon, null)
    )
  );
};

const ExitFullScreen = ({ children, getFullScreenTarget, store }) => {
  const { enterFullScreen, exitFullScreen, isFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ExitFullScreenButton, { onClick: props.onClick });
  const render = children || defaultChildren;
  return isFullScreen && render({
    onClick: isFullScreen ? exitFullScreen : enterFullScreen
  });
};

var styles = {"overlay":"rpv_8f5c1bd3"};

const FullScreenModeTracker = ({ store, onEnterFullScreen, onExitFullScreen }) => {
  const [fullScreenMode, setFullScreenMode] = React__namespace.useState(store.get("fullScreenMode"));
  const handleFullScreenMode = React__namespace.useCallback((fullScreenMode2) => {
    setFullScreenMode(fullScreenMode2);
  }, []);
  const handleEnteredFullScreen = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      onEnterFullScreen(zoom);
    }
  };
  const handleExitedFullScreen = () => {
    const zoom = store.get("zoom");
    if (zoom) {
      onExitFullScreen(zoom);
    }
  };
  React__namespace.useEffect(() => {
    switch (fullScreenMode) {
      case core.FullScreenMode.Entered:
        handleEnteredFullScreen();
        break;
      case core.FullScreenMode.Exited:
        handleExitedFullScreen();
        break;
    }
  }, [fullScreenMode]);
  React__namespace.useEffect(() => {
    store.subscribe("fullScreenMode", handleFullScreenMode);
    return () => {
      store.unsubscribe("fullScreenMode", handleFullScreenMode);
    };
  }, []);
  return fullScreenMode === core.FullScreenMode.Entering && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.overlay }, /* @__PURE__ */ React__namespace.createElement(core.Spinner, null));
};

const ShortcutHandler = ({ containerRef, getFullScreenTarget, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const { enterFullScreen } = useEnterFullScreen(getFullScreenTarget, store);
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element || e.shiftKey || e.altKey) {
        return;
      }
      const areShortcutsPressed = core.isMac() ? e.metaKey && e.ctrlKey && e.key === "f" : e.key === "F11";
      if (!areShortcutsPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      e.preventDefault();
      enterFullScreen();
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

const fullScreenPlugin = (props) => {
  const defaultFullScreenTarget = (ele) => ele;
  const getFullScreenTarget = props?.getFullScreenTarget || defaultFullScreenTarget;
  const fullScreenPluginProps = React__namespace.useMemo(
    () => Object.assign(
      {},
      { enableShortcuts: true, onEnterFullScreen: () => {
      }, onExitFullScreen: () => {
      } },
      props
    ),
    []
  );
  const store = React__namespace.useMemo(
    () => core.createStore({
      enterFullScreenMode: () => {
      },
      exitFullScreenMode: () => {
      },
      fullScreenMode: core.FullScreenMode.Normal,
      zoom: () => {
      }
    }),
    []
  );
  const EnterFullScreenDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(
    EnterFullScreen,
    {
      ...props2,
      enableShortcuts: fullScreenPluginProps.enableShortcuts,
      getFullScreenTarget,
      store
    }
  );
  const EnterFullScreenButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenDecorator, null, (renderProps) => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenButton, { enableShortcuts: fullScreenPluginProps.enableShortcuts, ...renderProps }));
  const EnterFullScreenMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(EnterFullScreenDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    EnterFullScreenMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const ExitFullScreenDecorator = () => /* @__PURE__ */ React__namespace.createElement(ExitFullScreen, { getFullScreenTarget, store }, props?.renderExitFullScreenButton);
  const renderViewer = (props2) => {
    const currentSlot = props2.slot;
    if (currentSlot.subSlot) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, fullScreenPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(
        ShortcutHandler,
        {
          containerRef: props2.containerRef,
          getFullScreenTarget,
          store
        }
      ), /* @__PURE__ */ React__namespace.createElement(
        FullScreenModeTracker,
        {
          store,
          onEnterFullScreen: fullScreenPluginProps.onEnterFullScreen,
          onExitFullScreen: fullScreenPluginProps.onExitFullScreen
        }
      ), /* @__PURE__ */ React__namespace.createElement(ExitFullScreenDecorator, null), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  return {
    install: (pluginFunctions) => {
      store.update("enterFullScreenMode", pluginFunctions.enterFullScreenMode);
      store.update("exitFullScreenMode", pluginFunctions.exitFullScreenMode);
      store.update("getPagesContainer", pluginFunctions.getPagesContainer);
      store.update("zoom", pluginFunctions.zoom);
    },
    onViewerStateChange: (viewerState) => {
      store.update("fullScreenMode", viewerState.fullScreenMode);
      return viewerState;
    },
    renderViewer,
    EnterFullScreen: EnterFullScreenDecorator,
    EnterFullScreenButton: EnterFullScreenButtonDecorator,
    EnterFullScreenMenuItem: EnterFullScreenMenuItemDecorator
  };
};

exports.ExitFullScreenIcon = ExitFullScreenIcon;
exports.FullScreenIcon = FullScreenIcon;
exports.fullScreenPlugin = fullScreenPlugin;

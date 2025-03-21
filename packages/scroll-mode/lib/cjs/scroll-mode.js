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

const DualPageCoverViewModeIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "0.5", y1: "6.497", x2: "22.5", y2: "6.497" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "11.5", y1: "6.497", x2: "11.5", y2: "22.497" }));

const DualPageViewModeIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }), /* @__PURE__ */ React__namespace.createElement("line", { x1: "11.5", y1: "0.497", x2: "11.5", y2: "22.497" }));

const HorizontalScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M6.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z
            M14.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z
            M22.5,21.5 c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z`
  }
));

const PageScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("rect", { x: "0.5", y: "0.497", width: "22", height: "22", rx: "1", ry: "1" }));

const VerticalScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M23.5,5.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V5.5z
            M23.5,13.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V13.5z
            M23.5,21.5 c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V21.5z`
  }
));

const WrappedScrollingIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z
            M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z`
  }
));

const SwitchScrollModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(VerticalScrollingIcon, null);
  switch (mode) {
    case core.ScrollMode.Horizontal:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.horizontalScrolling : "Horizontal scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(HorizontalScrollingIcon, null);
      break;
    case core.ScrollMode.Page:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.pageScrolling : "Page scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
      break;
    case core.ScrollMode.Wrapped:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.wrappedScrolling : "Wrapped scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(WrappedScrollingIcon, null);
      break;
    case core.ScrollMode.Vertical:
    default:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.verticalScrolling : "Vertical scrolling";
      icon = /* @__PURE__ */ React__namespace.createElement(VerticalScrollingIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchScrollModeButton = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case core.ScrollMode.Horizontal:
      testId = "scroll-mode__horizontal-button";
      break;
    case core.ScrollMode.Page:
      testId = "scroll-mode__page-button";
      break;
    case core.ScrollMode.Wrapped:
      testId = "scroll-mode__wrapped-button";
      break;
    case core.ScrollMode.Vertical:
    default:
      testId = "scroll-mode__vertical-button";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "scroll-mode-switch",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: props.label,
          isDisabled,
          isSelected,
          testId,
          onClick: props.onClick
        },
        props.icon
      ),
      content: () => props.label
    }
  ));
};

const switchScrollMode = (store, scrollMode) => {
  store.get("switchScrollMode")(scrollMode);
  const currentViewMode = store.get("viewMode");
  if ((scrollMode === core.ScrollMode.Horizontal || scrollMode === core.ScrollMode.Wrapped) && currentViewMode !== core.ViewMode.SinglePage) {
    store.get("switchViewMode")(core.ViewMode.SinglePage);
  }
};

const useScrollMode = (store) => {
  const [scrollMode, setScrollMode] = React__namespace.useState(store.get("scrollMode") || core.ScrollMode.Vertical);
  const handleScrollModeChanged = (currentScrollMode) => {
    setScrollMode(currentScrollMode);
  };
  React__namespace.useEffect(() => {
    store.subscribe("scrollMode", handleScrollModeChanged);
    return () => {
      store.unsubscribe("scrollMode", handleScrollModeChanged);
    };
  }, []);
  return { scrollMode };
};

const useViewMode = (store) => {
  const [viewMode, setViewMode] = React__namespace.useState(store.get("viewMode") || core.ViewMode.SinglePage);
  const handleViewModeChanged = (currentViewMode) => {
    setViewMode(currentViewMode);
  };
  React__namespace.useEffect(() => {
    store.subscribe("viewMode", handleViewModeChanged);
    return () => {
      store.unsubscribe("viewMode", handleViewModeChanged);
    };
  }, []);
  return { viewMode };
};

const SwitchScrollMode = ({ children, mode, store }) => {
  if (!store) {
    throw new Error("store is required");
  }
  const { viewMode } = useViewMode(store);
  const { scrollMode } = useScrollMode(store);
  const onClick = () => {
    switchScrollMode(store, mode);
  };
  const isSelected = scrollMode === mode;
  const isDisabled = (mode === core.ScrollMode.Horizontal || mode === core.ScrollMode.Wrapped) && viewMode !== core.ViewMode.SinglePage;
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeButton,
    {
      isDisabled,
      isSelected,
      mode: props.mode,
      onClick: props.onClick
    }
  );
  const render = children || defaultChildren;
  return render({
    isDisabled,
    isSelected,
    mode,
    onClick
  });
};

const SwitchScrollModeMenuItem = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case core.ScrollMode.Horizontal:
      testId = "scroll-mode__horizontal-menu";
      break;
    case core.ScrollMode.Page:
      testId = "scroll-mode__page-menu";
      break;
    case core.ScrollMode.Wrapped:
      testId = "scroll-mode__wrapped-menu";
      break;
    case core.ScrollMode.Vertical:
    default:
      testId = "scroll-mode__vertical-menu";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      checked: isSelected,
      icon: props.icon,
      isDisabled,
      testId,
      onClick: props.onClick
    },
    props.label
  ));
};

const SwitchViewModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
  switch (mode) {
    case core.ViewMode.DualPage:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.dualPage : "Dual page";
      icon = /* @__PURE__ */ React__namespace.createElement(DualPageViewModeIcon, null);
      break;
    case core.ViewMode.DualPageWithCover:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.dualPageCover : "Dual page with cover";
      icon = /* @__PURE__ */ React__namespace.createElement(DualPageCoverViewModeIcon, null);
      break;
    case core.ViewMode.SinglePage:
    default:
      label = l10n && l10n.scrollMode ? l10n.scrollMode.singlePage : "Single page";
      icon = /* @__PURE__ */ React__namespace.createElement(PageScrollingIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchViewModeButton = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case core.ViewMode.DualPage:
      testId = "view-mode__dual-button";
      break;
    case core.ViewMode.DualPageWithCover:
      testId = "view-mode__dual-cover-button";
      break;
    case core.ViewMode.SinglePage:
    default:
      testId = "view-mode__single-button";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "view-mode-switch",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: props.label,
          isDisabled,
          isSelected,
          testId,
          onClick: props.onClick
        },
        props.icon
      ),
      content: () => props.label
    }
  ));
};

const switchViewMode = (store, viewMode) => {
  store.get("switchViewMode")(viewMode);
  const currentScrollMode = store.get("scrollMode");
  if ((currentScrollMode === core.ScrollMode.Horizontal || currentScrollMode === core.ScrollMode.Wrapped) && viewMode !== core.ViewMode.SinglePage) {
    store.get("switchScrollMode")(core.ScrollMode.Vertical);
  }
};

const SwitchViewMode = ({ children, mode, store }) => {
  if (!store) {
    throw new Error("store is required");
  }
  const { viewMode } = useViewMode(store);
  const { scrollMode } = useScrollMode(store);
  const onClick = () => {
    switchViewMode(store, mode);
  };
  const isSelected = viewMode === mode;
  const isDisabled = (scrollMode === core.ScrollMode.Horizontal || scrollMode === core.ScrollMode.Wrapped) && mode !== core.ViewMode.SinglePage;
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeButton,
    {
      isDisabled,
      isSelected,
      mode: props.mode,
      onClick: props.onClick
    }
  );
  const render = children || defaultChildren;
  return render({
    isDisabled,
    isSelected,
    mode,
    onClick
  });
};

const SwitchViewModeMenuItem = ({
  isDisabled,
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case core.ViewMode.DualPage:
      testId = "view-mode__dual-menu";
      break;
    case core.ViewMode.DualPageWithCover:
      testId = "view-mode__dual-cover-menu";
      break;
    case core.ViewMode.SinglePage:
    default:
      testId = "view-mode__single-menu";
      break;
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      checked: isSelected,
      icon: props.icon,
      isDisabled,
      testId,
      onClick: props.onClick
    },
    props.label
  ));
};

const scrollModePlugin = () => {
  const store = React__namespace.useMemo(
    () => core.createStore({
      scrollMode: core.ScrollMode.Vertical,
      viewMode: core.ViewMode.SinglePage,
      switchScrollMode: () => {
      },
      switchViewMode: () => {
      }
    }),
    []
  );
  const SwitchScrollModeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollMode, { ...props, store });
  const SwitchScrollModeButtonDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeButton,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchScrollModeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchScrollModeMenuItem,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  const SwitchViewModeDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewMode, { ...props, store });
  const SwitchViewModeButtonDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeButton,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchViewModeMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchViewModeDecorator, { mode: props.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchViewModeMenuItem,
    {
      isDisabled: p.isDisabled,
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props.onClick();
      }
    }
  ));
  return {
    install: (pluginFunctions) => {
      store.update("switchScrollMode", pluginFunctions.switchScrollMode);
      store.update("switchViewMode", pluginFunctions.switchViewMode);
    },
    // Plugin functions
    onViewerStateChange: (viewerState) => {
      store.update("scrollMode", viewerState.scrollMode);
      store.update("viewMode", viewerState.viewMode);
      return viewerState;
    },
    switchScrollMode: (scrollMode) => {
      switchScrollMode(store, scrollMode);
    },
    switchViewMode: (viewMode) => {
      switchViewMode(store, viewMode);
    },
    SwitchScrollMode: SwitchScrollModeDecorator,
    SwitchScrollModeButton: SwitchScrollModeButtonDecorator,
    SwitchScrollModeMenuItem: SwitchScrollModeMenuItemDecorator,
    SwitchViewMode: SwitchViewModeDecorator,
    SwitchViewModeButton: SwitchViewModeButtonDecorator,
    SwitchViewModeMenuItem: SwitchViewModeMenuItemDecorator
  };
};

exports.DualPageCoverViewModeIcon = DualPageCoverViewModeIcon;
exports.DualPageViewModeIcon = DualPageViewModeIcon;
exports.HorizontalScrollingIcon = HorizontalScrollingIcon;
exports.PageScrollingIcon = PageScrollingIcon;
exports.VerticalScrollingIcon = VerticalScrollingIcon;
exports.WrappedScrollingIcon = WrappedScrollingIcon;
exports.scrollModePlugin = scrollModePlugin;

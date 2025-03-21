'use strict';

var core = require('@react-pdf-viewer/core');
var selectionMode = require('@react-pdf-viewer/selection-mode');
var React = require('react');
var fullScreen = require('@react-pdf-viewer/full-screen');
var getFile = require('@react-pdf-viewer/get-file');
var open = require('@react-pdf-viewer/open');
var pageNavigation = require('@react-pdf-viewer/page-navigation');
var print = require('@react-pdf-viewer/print');
var properties = require('@react-pdf-viewer/properties');
var rotate = require('@react-pdf-viewer/rotate');
var scrollMode = require('@react-pdf-viewer/scroll-mode');
var search = require('@react-pdf-viewer/search');
var theme = require('@react-pdf-viewer/theme');
var zoom = require('@react-pdf-viewer/zoom');

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

const MoreIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M12,0.5c1.381,0,2.5,1.119,2.5,2.5S13.381,5.5,12,5.5S9.5,4.381,9.5,3S10.619,0.5,12,0.5z
            M12,9.5
            c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5S9.5,13.381,9.5,12S10.619,9.5,12,9.5z
            M12,18.5c1.381,0,2.5,1.119,2.5,2.5
            s-1.119,2.5-2.5,2.5S9.5,22.381,9.5,21S10.619,18.5,12,18.5z`
  }
));

const MoreActionsPopover = ({ toolbarSlot }) => {
  const breakpoint = React__namespace.useContext(core.BreakpointContext);
  const isSmallBreakpoint = breakpoint === core.Breakpoint.ExtraSmall || breakpoint === core.Breakpoint.Small;
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const {
    DownloadMenuItem,
    EnterFullScreenMenuItem,
    GoToFirstPageMenuItem,
    GoToLastPageMenuItem,
    GoToNextPageMenuItem,
    GoToPreviousPageMenuItem,
    OpenMenuItem,
    PrintMenuItem,
    RotateBackwardMenuItem,
    RotateForwardMenuItem,
    ShowPropertiesMenuItem,
    SwitchScrollModeMenuItem,
    SwitchSelectionModeMenuItem,
    SwitchViewModeMenuItem,
    SwitchThemeMenuItem
  } = toolbarSlot;
  const renderTarget = (toggle, opened) => {
    const label = l10n && l10n.toolbar ? l10n.toolbar.moreActions : "More actions";
    return /* @__PURE__ */ React__namespace.createElement(
      core.Tooltip,
      {
        ariaControlsSuffix: "toolbar-more-actions",
        position: core.Position.BottomCenter,
        target: /* @__PURE__ */ React__namespace.createElement(
          core.MinimalButton,
          {
            ariaLabel: label,
            isSelected: opened,
            testId: "toolbar__more-actions-popover-target",
            onClick: toggle
          },
          /* @__PURE__ */ React__namespace.createElement(MoreIcon, null)
        ),
        content: () => label
      }
    );
  };
  const renderContent = (toggle) => {
    return /* @__PURE__ */ React__namespace.createElement(core.Menu, null, isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(SwitchThemeMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(EnterFullScreenMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(OpenMenuItem, null), /* @__PURE__ */ React__namespace.createElement(PrintMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(DownloadMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null)), /* @__PURE__ */ React__namespace.createElement(GoToFirstPageMenuItem, { onClick: toggle }), isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(GoToNextPageMenuItem, { onClick: toggle })), /* @__PURE__ */ React__namespace.createElement(GoToLastPageMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(RotateForwardMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(RotateBackwardMenuItem, { onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeMenuItem, { mode: selectionMode.SelectionMode.Text, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeMenuItem, { mode: selectionMode.SelectionMode.Hand, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: core.ScrollMode.Page, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: core.ScrollMode.Vertical, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: core.ScrollMode.Horizontal, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchScrollModeMenuItem, { mode: core.ScrollMode.Wrapped, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null), !isSmallBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: core.ViewMode.SinglePage, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: core.ViewMode.DualPage, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(SwitchViewModeMenuItem, { mode: core.ViewMode.DualPageWithCover, onClick: toggle }), /* @__PURE__ */ React__namespace.createElement(core.MenuDivider, null)), /* @__PURE__ */ React__namespace.createElement(ShowPropertiesMenuItem, { onClick: toggle }));
  };
  return /* @__PURE__ */ React__namespace.createElement(
    core.Popover,
    {
      ariaControlsSuffix: "toolbar-more-actions",
      ariaHasPopup: "menu",
      position: core.Position.BottomCenter,
      target: renderTarget,
      content: renderContent,
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  );
};

var styles = {"toolbar":"rpv_fa73c6a8","toolbarRtl":"rpv_66fc1aa2","left":"rpv_9116fbfa","center":"rpv_97eff788","right":"rpv_921ee489","item":"rpv_9115d706","label":"rpv_91c6a161"};

const renderDefaultToolbar = (transformToolbarSlot) => (
  // eslint-disable-next-line react/display-name
  (defaultToolbarSlot) => {
    const toolbarSlot = React__namespace.useMemo(() => transformToolbarSlot(defaultToolbarSlot), []);
    const { direction } = React__namespace.useContext(core.ThemeContext);
    const breakpoint = React__namespace.useContext(core.BreakpointContext);
    const isMediumBreakpoint = breakpoint !== core.Breakpoint.ExtraSmall && breakpoint !== core.Breakpoint.Small;
    const isRtl = direction === core.TextDirection.RightToLeft;
    const {
      CurrentPageInput,
      Download,
      EnterFullScreen,
      GoToNextPage,
      GoToPreviousPage,
      NumberOfPages,
      Open,
      Print,
      ShowSearchPopover,
      SwitchTheme,
      Zoom,
      ZoomIn,
      ZoomOut
    } = toolbarSlot;
    return /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        "data-testid": "toolbar",
        className: core.classNames({
          [styles.toolbar]: true,
          [styles.toolbarRtl]: isRtl
        }),
        role: "toolbar",
        "aria-orientation": "horizontal"
      },
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.left }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ShowSearchPopover, null)), breakpoint !== core.Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(GoToPreviousPage, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(CurrentPageInput, null), /* @__PURE__ */ React__namespace.createElement("span", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(NumberOfPages, null))), breakpoint !== core.Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(GoToNextPage, null))),
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.center }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ZoomOut, null)), breakpoint !== core.Breakpoint.ExtraSmall && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Zoom, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(ZoomIn, null))),
      /* @__PURE__ */ React__namespace.createElement("div", { className: styles.right }, isMediumBreakpoint && /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(SwitchTheme, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(EnterFullScreen, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Open, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Download, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(Print, null))), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.item }, /* @__PURE__ */ React__namespace.createElement(MoreActionsPopover, { toolbarSlot })))
    );
  }
);

const defaultTransform = (slot) => {
  const { NumberOfPages } = slot;
  return Object.assign({}, slot, {
    NumberOfPages: () => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, "/ ", /* @__PURE__ */ React__namespace.createElement(NumberOfPages, null))
  });
};
const DefaultToobar = (toolbarSlot) => renderDefaultToolbar(defaultTransform)(toolbarSlot);

const Toolbar = ({ children, slot }) => {
  const render = children || DefaultToobar;
  return render(slot);
};

const toolbarPlugin = (props) => {
  const fullScreenPluginInstance = fullScreen.fullScreenPlugin(props ? props.fullScreenPlugin : {});
  const getFilePluginInstance = getFile.getFilePlugin(props ? props.getFilePlugin : {});
  const openPluginInstance = open.openPlugin(props ? props.openPlugin : {});
  const pageNavigationPluginInstance = pageNavigation.pageNavigationPlugin(props ? props.pageNavigationPlugin : {});
  const printPluginInstance = print.printPlugin(props ? props.printPlugin : {});
  const propertiesPluginInstance = properties.propertiesPlugin();
  const rotatePluginInstance = rotate.rotatePlugin();
  const scrollModePluginInstance = scrollMode.scrollModePlugin();
  const searchPluginInstance = search.searchPlugin(props ? props.searchPlugin : {});
  const selectionModePluginInstance = selectionMode.selectionModePlugin(props ? props.selectionModePlugin : {});
  const themePluginInstance = theme.themePlugin();
  const zoomPluginInstance = zoom.zoomPlugin(props ? props.zoomPlugin : {});
  const plugins = [
    fullScreenPluginInstance,
    getFilePluginInstance,
    openPluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    propertiesPluginInstance,
    rotatePluginInstance,
    scrollModePluginInstance,
    searchPluginInstance,
    selectionModePluginInstance,
    themePluginInstance,
    zoomPluginInstance
  ];
  const ToolbarDecorator = React__namespace.useCallback((props2) => {
    const { EnterFullScreen, EnterFullScreenMenuItem } = fullScreenPluginInstance;
    const { Download, DownloadMenuItem } = getFilePluginInstance;
    const { Open, OpenMenuItem } = openPluginInstance;
    const {
      CurrentPageInput,
      CurrentPageLabel,
      GoToFirstPage,
      GoToFirstPageMenuItem,
      GoToLastPage,
      GoToLastPageMenuItem,
      GoToNextPage,
      GoToNextPageMenuItem,
      GoToPreviousPage,
      GoToPreviousPageMenuItem,
      NumberOfPages
    } = pageNavigationPluginInstance;
    const { Print, PrintMenuItem } = printPluginInstance;
    const { ShowProperties, ShowPropertiesMenuItem } = propertiesPluginInstance;
    const { Rotate, RotateBackwardMenuItem, RotateForwardMenuItem } = rotatePluginInstance;
    const { SwitchScrollMode, SwitchScrollModeMenuItem, SwitchViewMode, SwitchViewModeMenuItem } = scrollModePluginInstance;
    const { Search, ShowSearchPopover } = searchPluginInstance;
    const { SwitchSelectionMode, SwitchSelectionModeMenuItem } = selectionModePluginInstance;
    const { SwitchTheme, SwitchThemeMenuItem } = themePluginInstance;
    const { CurrentScale, Zoom, ZoomIn, ZoomInMenuItem, ZoomOut, ZoomOutMenuItem } = zoomPluginInstance;
    return /* @__PURE__ */ React__namespace.createElement(
      Toolbar,
      {
        ...props2,
        slot: {
          CurrentPageInput,
          CurrentPageLabel,
          CurrentScale,
          Download,
          DownloadMenuItem,
          EnterFullScreen,
          EnterFullScreenMenuItem,
          GoToFirstPage,
          GoToFirstPageMenuItem,
          GoToLastPage,
          GoToLastPageMenuItem,
          GoToNextPage,
          GoToNextPageMenuItem,
          GoToPreviousPage,
          GoToPreviousPageMenuItem,
          NumberOfPages,
          Open,
          OpenMenuItem,
          Print,
          PrintMenuItem,
          Rotate,
          RotateBackwardMenuItem,
          RotateForwardMenuItem,
          Search,
          ShowProperties,
          ShowPropertiesMenuItem,
          ShowSearchPopover,
          SwitchScrollMode,
          SwitchScrollModeMenuItem,
          SwitchSelectionMode,
          SwitchSelectionModeMenuItem,
          SwitchViewMode,
          SwitchViewModeMenuItem,
          SwitchTheme,
          SwitchThemeMenuItem,
          Zoom,
          ZoomIn,
          ZoomInMenuItem,
          ZoomOut,
          ZoomOutMenuItem
        }
      }
    );
  }, []);
  return {
    // Plugin instances
    fullScreenPluginInstance,
    getFilePluginInstance,
    openPluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    propertiesPluginInstance,
    rotatePluginInstance,
    scrollModePluginInstance,
    searchPluginInstance,
    selectionModePluginInstance,
    themePluginInstance,
    zoomPluginInstance,
    dependencies: plugins,
    renderDefaultToolbar,
    Toolbar: ToolbarDecorator
  };
};

exports.MoreActionsPopover = MoreActionsPopover;
exports.MoreIcon = MoreIcon;
exports.toolbarPlugin = toolbarPlugin;

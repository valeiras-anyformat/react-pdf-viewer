'use strict';

var core = require('@react-pdf-viewer/core');
var React = require('react');
var attachment = require('@react-pdf-viewer/attachment');
var bookmark = require('@react-pdf-viewer/bookmark');
var thumbnail = require('@react-pdf-viewer/thumbnail');
var toolbar = require('@react-pdf-viewer/toolbar');

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

const BookmarkIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M11.5,1.5h11c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h3
            M11.5,10.5c0,0.55-0.3,0.661-0.659,0.248L8,7.5l-2.844,3.246c-0.363,0.414-0.659,0.3-0.659-0.247v-9c0-0.552,0.448-1,1-1h5
            c0.552,0,1,0.448,1,1L11.5,10.5z
            M14.5,6.499h6
            M14.5,10.499h6
            M3.5,14.499h17
            M3.5,18.499h16.497`
  }
));

const FileIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M7.618,15.345l8.666-8.666c0.78-0.812,2.071-0.838,2.883-0.058s0.838,2.071,0.058,2.883
            c-0.019,0.02-0.038,0.039-0.058,0.058L7.461,21.305c-1.593,1.593-4.175,1.592-5.767,0s-1.592-4.175,0-5.767c0,0,0,0,0,0
            L13.928,3.305c2.189-2.19,5.739-2.19,7.929-0.001s2.19,5.739,0,7.929l0,0L13.192,19.9`
  }
));

const ThumbnailIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z
            M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z
            M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z`
  }
));

var styles$1 = {"sidebar":"rpv_a85ddeb","sidebarOpened":"rpv_306d3634","sidebarLtr":"rpv_903d01ff","sidebarRtl":"rpv_903d187f","tabs":"rpv_86f3034f","headers":"rpv_bda34215","header":"rpv_81fd021e","content":"rpv_c6f30708","contentOpened":"rpv_4ac5591","contentLtr":"rpv_f36067c2","contentRtl":"rpv_f3607e42"};

const Sidebar = ({
  attachmentTabContent,
  bookmarkTabContent,
  store,
  thumbnailTabContent,
  tabs
}) => {
  const containerRef = React__namespace.useRef(null);
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const [opened, setOpened] = React__namespace.useState(store.get("isCurrentTabOpened") || false);
  const [currentTab, setCurrentTab] = React__namespace.useState(store.get("currentTab"));
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const resizeConstrain = (size) => size.firstHalfPercentage >= 20 && size.firstHalfPercentage <= 80;
  const defaultTabs = [
    {
      content: thumbnailTabContent,
      icon: /* @__PURE__ */ React__namespace.createElement(ThumbnailIcon, null),
      title: l10n && l10n.defaultLayout ? l10n.defaultLayout.thumbnail : "Thumbnail"
    },
    {
      content: bookmarkTabContent,
      icon: /* @__PURE__ */ React__namespace.createElement(BookmarkIcon, null),
      title: l10n && l10n.defaultLayout ? l10n.defaultLayout.bookmark : "Bookmark"
    },
    {
      content: attachmentTabContent,
      icon: /* @__PURE__ */ React__namespace.createElement(FileIcon, null),
      title: l10n && l10n.defaultLayout ? l10n.defaultLayout.attachment : "Attachment"
    }
  ];
  const listTabs = tabs ? tabs(defaultTabs) : defaultTabs;
  const toggleTab = (index) => {
    if (currentTab === index) {
      store.update("isCurrentTabOpened", !store.get("isCurrentTabOpened"));
      const container = containerRef.current;
      if (container) {
        const width = container.style.width;
        if (width) {
          container.style.removeProperty("width");
        }
      }
    } else {
      store.update("currentTab", index);
    }
  };
  const switchToTab = (index) => {
    if (index >= 0 && index <= listTabs.length - 1) {
      store.update("isCurrentTabOpened", true);
      setCurrentTab(index);
    }
  };
  const handleCurrentTabOpened = (opened2) => {
    setOpened(opened2);
  };
  React__namespace.useEffect(() => {
    store.subscribe("currentTab", switchToTab);
    store.subscribe("isCurrentTabOpened", handleCurrentTabOpened);
    return () => {
      store.unsubscribe("currentTab", switchToTab);
      store.unsubscribe("isCurrentTabOpened", handleCurrentTabOpened);
    };
  }, []);
  if (listTabs.length === 0) {
    return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
  }
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "default-layout__sidebar",
      className: core.classNames({
        [styles$1.sidebar]: true,
        [styles$1.sidebarOpened]: opened,
        [styles$1.sidebarLtr]: !isRtl,
        [styles$1.sidebarRtl]: isRtl
      }),
      ref: containerRef
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.tabs }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.headers, role: "tablist", "aria-orientation": "vertical" }, listTabs.map((tab, index) => /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        "aria-controls": "rpv-default-layout__sidebar-content",
        "aria-selected": currentTab === index,
        key: index,
        className: styles$1.header,
        id: `rpv-default-layout__sidebar-tab-${index}`,
        role: "tab"
      },
      /* @__PURE__ */ React__namespace.createElement(
        core.Tooltip,
        {
          ariaControlsSuffix: `default-layout-sidebar-tab-${index}`,
          position: isRtl ? core.Position.LeftCenter : core.Position.RightCenter,
          target: /* @__PURE__ */ React__namespace.createElement(
            core.MinimalButton,
            {
              ariaLabel: tab.title,
              isSelected: currentTab === index,
              onClick: () => toggleTab(index)
            },
            tab.icon
          ),
          content: () => tab.title
        }
      )
    ))), currentTab >= 0 && /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        "aria-labelledby": `rpv-default-layout__sidebar-tab-${currentTab}`,
        id: "rpv-default-layout__sidebar-content",
        className: core.classNames({
          [styles$1.content]: true,
          [styles$1.contentOpened]: opened,
          [styles$1.contentLtr]: !isRtl,
          [styles$1.contentRtl]: isRtl
        }),
        role: "tabpanel",
        tabIndex: -1
      },
      listTabs[currentTab].content
    ))
  ), opened && /* @__PURE__ */ React__namespace.createElement(core.Splitter, { constrain: resizeConstrain }));
};

var styles = {"container":"rpv_d51a35ff","main":"rpv_36f1a57b","mainRtl":"rpv_e2a966ef","body":"rpv_36ecd964","toolbar":"rpv_6d2cbc79"};

const defaultLayoutPlugin = (props) => {
  const store = React__namespace.useMemo(
    () => core.createStore({
      isCurrentTabOpened: false,
      currentTab: -1
    }),
    []
  );
  const attachmentPluginInstance = attachment.attachmentPlugin();
  const bookmarkPluginInstance = bookmark.bookmarkPlugin();
  const thumbnailPluginInstance = thumbnail.thumbnailPlugin(props ? props.thumbnailPlugin : {});
  const toolbarPluginInstance = toolbar.toolbarPlugin(props ? props.toolbarPlugin : {});
  const { Attachments } = attachmentPluginInstance;
  const { Bookmarks } = bookmarkPluginInstance;
  const { Thumbnails } = thumbnailPluginInstance;
  const { Toolbar } = toolbarPluginInstance;
  const sidebarTabs = props ? props.sidebarTabs : (defaultTabs) => defaultTabs;
  const plugins = [attachmentPluginInstance, bookmarkPluginInstance, thumbnailPluginInstance, toolbarPluginInstance];
  return {
    // The plugin instances
    attachmentPluginInstance,
    bookmarkPluginInstance,
    thumbnailPluginInstance,
    toolbarPluginInstance,
    dependencies: plugins,
    activateTab: (index) => {
      store.update("currentTab", index);
    },
    toggleTab: (index) => {
      const currentTab = store.get("currentTab");
      store.update("isCurrentTabOpened", !store.get("isCurrentTabOpened"));
      if (currentTab !== index) {
        store.update("currentTab", index);
      }
    },
    renderViewer: (renderProps) => {
      const { slot } = renderProps;
      const mergeSubSlot = slot.subSlot && slot.subSlot.attrs ? {
        className: slot.subSlot.attrs.className,
        "data-testid": slot.subSlot.attrs["data-testid"],
        ref: slot.subSlot.attrs.ref,
        style: slot.subSlot.attrs.style
      } : {};
      slot.children = /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          "data-testid": "default-layout__main",
          className: core.classNames({
            [styles.main]: true,
            [styles.mainRtl]: renderProps.themeContext.direction === core.TextDirection.RightToLeft
          })
        },
        /* @__PURE__ */ React__namespace.createElement(
          Sidebar,
          {
            attachmentTabContent: /* @__PURE__ */ React__namespace.createElement(Attachments, null),
            bookmarkTabContent: /* @__PURE__ */ React__namespace.createElement(Bookmarks, null),
            store,
            thumbnailTabContent: /* @__PURE__ */ React__namespace.createElement(Thumbnails, null),
            tabs: sidebarTabs
          }
        ),
        /* @__PURE__ */ React__namespace.createElement("div", { className: styles.body, "data-testid": "default-layout__body" }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.toolbar }, props && props.renderToolbar ? props.renderToolbar(Toolbar) : /* @__PURE__ */ React__namespace.createElement(Toolbar, null)), /* @__PURE__ */ React__namespace.createElement("div", { ...mergeSubSlot }, slot.subSlot.children))
      ), slot.children);
      slot.subSlot.attrs = {};
      slot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
      return slot;
    },
    onDocumentLoad: (documentLoadProps) => {
      if (props && props.setInitialTab) {
        props.setInitialTab(documentLoadProps.doc).then((initialTab) => {
          store.update("currentTab", initialTab);
          store.update("isCurrentTabOpened", true);
        });
      }
    }
  };
};

const setInitialTabFromPageMode = (doc) => (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  new Promise((resolve, _) => {
    doc.getPageMode().then((pageMode) => {
      if (!pageMode) {
        resolve(-1);
      } else {
        switch (pageMode) {
          case core.PageMode.Attachments:
            resolve(2);
            break;
          case core.PageMode.Bookmarks:
            resolve(1);
            break;
          case core.PageMode.Thumbnails:
            resolve(0);
            break;
          default:
            resolve(-1);
            break;
        }
      }
    });
  })
);

exports.BookmarkIcon = BookmarkIcon;
exports.FileIcon = FileIcon;
exports.ThumbnailIcon = ThumbnailIcon;
exports.defaultLayoutPlugin = defaultLayoutPlugin;
exports.setInitialTabFromPageMode = setInitialTabFromPageMode;

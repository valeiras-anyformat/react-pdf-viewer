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

const OpenFileIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M18.5,7.5c.275,0,.341-.159.146-.354L12.354.854a.5.5,0,0,0-.708,0L5.354,7.147c-.2.195-.129.354.146.354h3v10a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V7.5Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4" }));

var styles = {"container":"rpv_46d1c694","input":"rpv_bee9d35d"};

const useTriggerOpen = (store) => {
  const inputRef = React__namespace.useRef(null);
  const openFile = () => {
    const inputEle = inputRef.current;
    if (inputEle) {
      inputEle.click();
      if (store.get("triggerOpenFile")) {
        store.update("triggerOpenFile", false);
      }
    }
  };
  const handleOpenFileTriggered = (trigger) => {
    if (trigger) {
      openFile();
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("triggerOpenFile", handleOpenFileTriggered);
    return () => {
      store.unsubscribe("triggerOpenFile", handleOpenFileTriggered);
    };
  }, []);
  return {
    inputRef,
    openFile
  };
};

const OpenButton = ({ enableShortcuts, store, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.open ? l10n.open.openFile : "Open file";
  const { inputRef, openFile } = useTriggerOpen(store);
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+O" : "Ctrl+O" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "open",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
        "input",
        {
          accept: ".pdf",
          className: styles.input,
          multiple: false,
          ref: inputRef,
          tabIndex: -1,
          title: "",
          type: "file",
          onChange: onClick
        }
      ), /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "open__button",
          onClick: openFile
        },
        /* @__PURE__ */ React__namespace.createElement(OpenFileIcon, null)
      )),
      content: () => label
    }
  );
};

const Open = ({ children, enableShortcuts, store }) => {
  const handleOpenFiles = (e) => {
    const files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    const openFile = store.get("openFile");
    if (openFile) {
      openFile(files[0]);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(OpenButton, { enableShortcuts, store, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: handleOpenFiles
  });
};

const OpenMenuItem = ({ store, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.open ? l10n.open.openFile : "Open file";
  const { inputRef, openFile } = useTriggerOpen(store);
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(OpenFileIcon, null), testId: "open__menu", onClick: openFile }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      accept: ".pdf",
      className: styles.input,
      multiple: false,
      ref: inputRef,
      tabIndex: -1,
      title: "",
      type: "file",
      onChange: onClick
    }
  ), label));
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
      if (!element || e.shiftKey || e.altKey || e.key !== "o") {
        return;
      }
      const isCommandPressed = core.isMac() ? e.metaKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (!document.activeElement || !element.contains(document.activeElement)) {
        return;
      }
      e.preventDefault();
      store.update("triggerOpenFile", true);
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

const openPlugin = (props) => {
  const openPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => core.createStore({}), []);
  const OpenDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Open, { enableShortcuts: openPluginProps.enableShortcuts, ...props2, store });
  const OpenButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(OpenDecorator, null);
  const OpenMenuItemDecorator = () => /* @__PURE__ */ React__namespace.createElement(OpenDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(OpenMenuItem, { store, onClick: p.onClick }));
  const renderViewer = (props2) => {
    const { slot } = props2;
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, openPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: props2.containerRef, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    install: (pluginFunctions) => {
      store.update("openFile", pluginFunctions.openFile);
    },
    renderViewer,
    Open: OpenDecorator,
    OpenButton: OpenButtonDecorator,
    OpenMenuItem: OpenMenuItemDecorator
  };
};

exports.OpenFileIcon = OpenFileIcon;
exports.openPlugin = openPlugin;

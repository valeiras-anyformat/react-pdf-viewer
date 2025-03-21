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

const HandToolIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M11.5,5.5v-2C11.5,2.672,12.172,2,13,2s1.5,0.672,1.5,1.5v2 M14.5,11.5v-6C14.5,4.672,15.172,4,16,4
            c0.828,0,1.5,0.672,1.5,1.5v3 M17.5,13V8.5C17.5,7.672,18.172,7,19,7s1.5,0.672,1.5,1.5v10c0,2.761-2.239,5-5,5h-3.335
            c-1.712-0.001-3.305-0.876-4.223-2.321C6.22,18.467,4.083,14,4.083,14c-0.378-0.545-0.242-1.292,0.303-1.67
            c0.446-0.309,1.044-0.281,1.458,0.07L8.5,15.5v-10C8.5,4.672,9.172,4,10,4s1.5,0.672,1.5,1.5v6`
  }
));

const TextSelectionIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M13.675,11.671l2.941-2.941c0.195-0.196,0.195-0.512-0.001-0.707C16.563,7.971,16.5,7.931,16.43,7.906
            L4.168,3.527C3.908,3.434,3.622,3.57,3.529,3.83c-0.039,0.109-0.039,0.228,0,0.336l4.379,12.262
            c0.093,0.26,0.379,0.396,0.639,0.303c0.07-0.025,0.133-0.065,0.185-0.117l2.943-2.943l6.146,6.146c0.195,0.195,0.512,0.195,0.707,0
            l1.293-1.293c0.195-0.195,0.195-0.512,0-0.707L13.675,11.671z`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var SelectionMode = /* @__PURE__ */ ((SelectionMode2) => {
  SelectionMode2["Hand"] = "Hand";
  SelectionMode2["Text"] = "Text";
  return SelectionMode2;
})(SelectionMode || {});

const SwitchSelectionModeDecorator = ({ children, mode, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  let label = "";
  let icon = /* @__PURE__ */ React__namespace.createElement(TextSelectionIcon, null);
  switch (mode) {
    case SelectionMode.Hand:
      label = l10n && l10n.selectionMode ? l10n.selectionMode.handTool : "Hand tool";
      icon = /* @__PURE__ */ React__namespace.createElement(HandToolIcon, null);
      break;
    case SelectionMode.Text:
    default:
      label = l10n && l10n.selectionMode ? l10n.selectionMode.textSelectionTool : "Text selection tool";
      icon = /* @__PURE__ */ React__namespace.createElement(TextSelectionIcon, null);
      break;
  }
  return children({ icon, label, onClick });
};

const SwitchSelectionModeButton = ({ isSelected, mode, onClick }) => {
  let testId = "";
  switch (mode) {
    case SelectionMode.Hand:
      testId = "selection-mode__hand-button";
      break;
    case SelectionMode.Text:
    default:
      testId = "selection-mode__text-button";
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "selection-mode-switch",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: props.label,
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

const SwitchSelectionMode = ({ children, mode, store }) => {
  const onClick = () => store.update("selectionMode", mode);
  const isSelected = mode === store.get("selectionMode");
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeButton, { isSelected, mode: props.mode, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isSelected,
    mode,
    onClick
  });
};

const SwitchSelectionModeMenuItem = ({
  isSelected,
  mode,
  onClick
}) => {
  let testId = "";
  switch (mode) {
    case SelectionMode.Hand:
      testId = "selection-mode__hand-menu";
      break;
    case SelectionMode.Text:
    default:
      testId = "selection-mode__text-menu";
  }
  return /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode, onClick }, (props) => /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { checked: isSelected, icon: props.icon, testId, onClick: props.onClick }, props.label));
};

var styles = {"grab":"rpv_548bac0a","grabbing":"rpv_8f90bb4a"};

const Tracker = ({ store }) => {
  const pagesRef = React__namespace.useRef(null);
  const [selectionMode, setSelectionMode] = React__namespace.useState(SelectionMode.Text);
  const pos = React__namespace.useRef({ top: 0, left: 0, x: 0, y: 0 });
  const onMouseMoveHandler = (e) => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    ele.scrollTop = pos.current.top - (e.clientY - pos.current.y);
    ele.scrollLeft = pos.current.left - (e.clientX - pos.current.x);
  };
  const onMouseUpHandler = () => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    ele.classList.add(styles.grab);
    ele.classList.remove(styles.grabbing);
    document.removeEventListener("mousemove", onMouseMoveHandler);
    document.removeEventListener("mouseup", onMouseUpHandler);
  };
  const onMouseDownHandler = (e) => {
    const ele = pagesRef.current;
    if (!ele || selectionMode === SelectionMode.Text) {
      return;
    }
    ele.classList.remove(styles.grab);
    ele.classList.add(styles.grabbing);
    e.preventDefault();
    e.stopPropagation();
    pos.current = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);
  };
  const handlePagesContainer = (getPagesContainer) => {
    pagesRef.current = getPagesContainer();
  };
  const handleSelectionModeChanged = (mode) => {
    setSelectionMode(mode);
  };
  React__namespace.useEffect(() => {
    const ele = pagesRef.current;
    if (!ele) {
      return;
    }
    selectionMode === SelectionMode.Hand ? ele.classList.add(styles.grab) : ele.classList.remove(styles.grab);
    ele.addEventListener("mousedown", onMouseDownHandler);
    return () => {
      ele.removeEventListener("mousedown", onMouseDownHandler);
    };
  }, [selectionMode]);
  React__namespace.useEffect(() => {
    store.subscribe("getPagesContainer", handlePagesContainer);
    store.subscribe("selectionMode", handleSelectionModeChanged);
    return () => {
      store.unsubscribe("getPagesContainer", handlePagesContainer);
      store.unsubscribe("selectionMode", handleSelectionModeChanged);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const selectionModePlugin = (props) => {
  const store = React__namespace.useMemo(() => core.createStore(), []);
  const SwitchSelectionModeDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionMode, { ...props2, store });
  const SwitchSelectionModeButtonDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode: props2.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchSelectionModeButton,
    {
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
      }
    }
  ));
  const SwitchSelectionModeMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(SwitchSelectionModeDecorator, { mode: props2.mode }, (p) => /* @__PURE__ */ React__namespace.createElement(
    SwitchSelectionModeMenuItem,
    {
      isSelected: p.isSelected,
      mode: p.mode,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const renderViewer = (props2) => {
    const currentSlot = props2.slot;
    if (currentSlot.subSlot && currentSlot.subSlot.children) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(Tracker, { store }), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  return {
    install: (pluginFunctions) => {
      store.update("selectionMode", props && props.selectionMode ? props.selectionMode : SelectionMode.Text);
      store.update("getPagesContainer", pluginFunctions.getPagesContainer);
    },
    renderViewer,
    SwitchSelectionMode: SwitchSelectionModeDecorator,
    SwitchSelectionModeButton: SwitchSelectionModeButtonDecorator,
    SwitchSelectionModeMenuItem: SwitchSelectionModeMenuItemDecorator
  };
};

exports.HandToolIcon = HandToolIcon;
exports.SelectionMode = SelectionMode;
exports.TextSelectionIcon = TextSelectionIcon;
exports.selectionModePlugin = selectionModePlugin;

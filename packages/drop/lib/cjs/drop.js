'use strict';

var React = require('react');
var core = require('@react-pdf-viewer/core');

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

var styles = {"container":"rpv_2eb02010","inner":"rpv_d2084165","innerRtl":"rpv_aeb34ac5"};

const useDrop = (ref, onDrop) => {
  const dragCount = React__namespace.useRef(0);
  const [isDragging, setDragging] = React__namespace.useState(false);
  const [element, setElement] = React__namespace.useState(ref.current);
  React__namespace.useEffect(() => {
    if (ref.current !== element) {
      setElement(ref.current);
    }
  }, []);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    dragCount.current = 0;
    if (e.dataTransfer) {
      onDrop(e.dataTransfer.files);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCount.current += 1;
    if (dragCount.current <= 1) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCount.current -= 1;
    if (dragCount.current <= 0) {
      setDragging(false);
    }
  };
  React__namespace.useEffect(() => {
    if (!element) {
      return;
    }
    element.addEventListener("drop", handleDrop);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragleave", handleDragLeave);
    return () => {
      element.removeEventListener("drop", handleDrop);
      element.removeEventListener("dragover", handleDragOver);
      element.removeEventListener("dragenter", handleDragEnter);
      element.removeEventListener("dragleave", handleDragLeave);
    };
  }, [element]);
  return { isDragging };
};

const DropArea = ({ containerRef, openFile }) => {
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const { isDragging } = useDrop(containerRef, (files) => {
    if (files.length === 0) {
      return;
    }
    openFile(files[0]);
  });
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, isDragging && /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: core.classNames({
        [styles.inner]: true,
        [styles.innerRtl]: isRtl
      })
    },
    l10n && l10n.drop ? l10n.drop.dragDropFile : "Drag and drop a PDF document here"
  )));
};

const dropPlugin = () => {
  const renderViewer = (props) => {
    const { slot } = props;
    if (slot.attrs) {
      const styles = slot.attrs && slot.attrs.style ? slot.attrs.style : {};
      const updateStyle = {
        ...styles,
        ...{
          height: "100%",
          position: "relative",
          width: "100%"
        }
      };
      slot.attrs.style = updateStyle;
    }
    slot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(DropArea, { containerRef: props.containerRef, openFile: props.openFile }), slot.children);
    return slot;
  };
  return {
    renderViewer
  };
};

exports.dropPlugin = dropPlugin;

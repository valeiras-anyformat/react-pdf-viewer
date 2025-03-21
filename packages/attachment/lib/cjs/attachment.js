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

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getFileName = (url) => {
  const str = url.split("/").pop();
  return str ? str.split("#")[0].split("?")[0] : url;
};

const downloadFile = (url, data) => {
  const blobUrl = typeof data === "string" ? "" : URL.createObjectURL(new Blob([data], { type: "" }));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = blobUrl || url;
  link.setAttribute("download", getFileName(url));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
};

var styles$2 = {"list":"rpv_74ff328a","listRtl":"rpv_d9b8b80","item":"rpv_74fdfcff"};

const AttachmentList = ({ files }) => {
  const containerRef = React__namespace.useRef(null);
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const attachmentItemsRef = React__namespace.useRef([]);
  const clickDownloadLabel = l10n && l10n.attachment ? l10n.attachment.clickToDownload : "Click to download";
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveToItem((items, activeEle) => items.indexOf(activeEle) + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveToItem((items, activeEle) => items.indexOf(activeEle) - 1);
        break;
      case "End":
        e.preventDefault();
        moveToItem((items, _) => items.length - 1);
        break;
      case "Home":
        e.preventDefault();
        moveToItem((_, __) => 0);
        break;
    }
  };
  const moveToItem = (getItemIndex) => {
    const container = containerRef.current;
    const attachmentItems = [].slice.call(container.getElementsByClassName(styles$2.item));
    if (attachmentItems.length === 0) {
      return;
    }
    attachmentItems.forEach((item) => item.setAttribute("tabindex", "-1"));
    const activeEle = document.activeElement;
    const targetIndex = Math.min(
      attachmentItems.length - 1,
      Math.max(0, getItemIndex(attachmentItems, activeEle))
    );
    const targetEle = attachmentItems[targetIndex];
    targetEle.setAttribute("tabindex", "0");
    targetEle.focus();
  };
  core.useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const attachmentItems = [].slice.call(container.getElementsByClassName(styles$2.item));
    attachmentItemsRef.current = attachmentItems;
    if (attachmentItems.length > 0) {
      const firstItem = attachmentItems[0];
      firstItem.focus();
      firstItem.setAttribute("tabindex", "0");
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "attachment__list",
      className: core.classNames({
        [styles$2.list]: true,
        [styles$2.listRtl]: isRtl
      }),
      ref: containerRef,
      tabIndex: -1,
      onKeyDown: handleKeyDown
    },
    files.map((file) => /* @__PURE__ */ React__namespace.createElement(
      "button",
      {
        className: styles$2.item,
        key: file.fileName,
        tabIndex: -1,
        title: clickDownloadLabel,
        type: "button",
        onClick: () => downloadFile(file.fileName, file.data)
      },
      file.fileName
    ))
  );
};

var styles$1 = {"empty":"rpv_a9033fd6","emptyRtl":"rpv_3122eab4"};

const AttachmentLoader = ({ doc }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const noAttachmentLabel = l10n && l10n.attachment ? l10n.attachment.noAttachment : "There is no attachment";
  const [attachments, setAttachments] = React__namespace.useState({
    files: [],
    isLoaded: false
  });
  React__namespace.useEffect(() => {
    doc.getAttachments().then((response) => {
      const files = response ? Object.keys(response).map((file) => {
        return {
          data: response[file].content,
          fileName: response[file].filename
        };
      }) : [];
      setAttachments({
        files,
        isLoaded: true
      });
    });
  }, [doc]);
  return !attachments.isLoaded ? /* @__PURE__ */ React__namespace.createElement(core.Spinner, null) : attachments.files.length === 0 ? /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "attachment__empty",
      className: core.classNames({
        [styles$1.empty]: true,
        [styles$1.emptyRtl]: isRtl
      })
    },
    noAttachmentLabel
  ) : /* @__PURE__ */ React__namespace.createElement(AttachmentList, { files: attachments.files });
};

var styles = {"container":"rpv_fdd432ce"};

const AttachmentListWithStore = ({ store }) => {
  const [currentDoc, setCurrentDoc] = React__namespace.useState(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(AttachmentLoader, { doc: currentDoc }) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(core.Spinner, null));
};

const attachmentPlugin = () => {
  const store = React__namespace.useMemo(() => core.createStore({}), []);
  const AttachmentsDecorator = () => /* @__PURE__ */ React__namespace.createElement(AttachmentListWithStore, { store });
  return {
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    Attachments: AttachmentsDecorator
  };
};

exports.attachmentPlugin = attachmentPlugin;

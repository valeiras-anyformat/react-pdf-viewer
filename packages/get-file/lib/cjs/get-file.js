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

const DownloadIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M5.5,11.5c-.275,0-.341.159-.146.354l6.292,6.293a.5.5,0,0,0,.709,0l6.311-6.275c.2-.193.13-.353-.145-.355L15.5,11.5V1.5a1,1,0,0,0-1-1h-5a1,1,0,0,0-1,1V11a.5.5,0,0,1-.5.5Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M23.5,18.5v4a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1v-4" }));

const DownloadButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.download ? l10n.download.download : "Download";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "get-file",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(core.MinimalButton, { ariaLabel: label, testId: "get-file__download-button", onClick }, /* @__PURE__ */ React__namespace.createElement(DownloadIcon, null)),
      content: () => label
    }
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isChromeIOS = () => /iphone|ipod|ipad/i.test(navigator.userAgent) && /CriOS/i.test(navigator.userAgent);
const isSafariIOS = () => /iphone|ipod|ipad/i.test(navigator.userAgent) && !/CriOS/i.test(navigator.userAgent);
const encodeUint8Array = (data) => btoa(
  Array(data.length).fill("").map((_, i) => String.fromCharCode(data[i])).join("")
);
const download = (url, saveAs) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", saveAs);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const downloadBlob = (data, saveAs, mimeType) => {
  const blobUrl = URL.createObjectURL(new Blob([data], { type: mimeType }));
  download(blobUrl, saveAs);
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
  }
  return;
};
const downloadFile = (doc, saveAs) => {
  doc.getData().then((data) => {
    isSafariIOS() ? (
      // `application/pdf` is the correct MIME type for a PDF file. However, it's a known supported file type on iOS
      // and iOS will try to open the file instead of downloading it.
      // Using `application/octet-stream` forces iOS Safari to download the file
      downloadBlob(data, saveAs, "application/octet-stream")
    ) : isChromeIOS() ? download(`data:application/pdf;base64,${encodeUint8Array(data)}`, saveAs) : downloadBlob(data, saveAs, "application/pdf");
  });
};

const Download = ({ children, fileNameGenerator, store }) => {
  const [currentFile, setCurrentFile] = React__namespace.useState(store.get("file"));
  const [currentDocument, setCurrentDocument] = React__namespace.useState(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    setCurrentDocument(doc);
  };
  const handleFileChanged = (file) => {
    setCurrentFile(file);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    store.subscribe("file", handleFileChanged);
    return () => {
      store.subscribe("doc", handleDocumentChanged);
      store.unsubscribe("file", handleFileChanged);
    };
  }, []);
  const download = () => {
    if (currentDocument && currentFile) {
      downloadFile(currentDocument, fileNameGenerator(currentFile));
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(DownloadButton, { onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    onClick: download
  });
};

const DownloadMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.download ? l10n.download.download : "Download";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(DownloadIcon, null), testId: "get-file__download-menu", onClick }, label);
};

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

const getFilePlugin = (props) => {
  const store = React__namespace.useMemo(() => core.createStore({}), []);
  const defaultFileNameGenerator = (file) => file.name ? getFileName(file.name) : "document.pdf";
  const DownloadDecorator = (downloadProps) => /* @__PURE__ */ React__namespace.createElement(
    Download,
    {
      ...downloadProps,
      fileNameGenerator: props ? props.fileNameGenerator || defaultFileNameGenerator : defaultFileNameGenerator,
      store
    }
  );
  const DownloadButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(DownloadDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(DownloadButton, { ...props2 }));
  const DownloadMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(DownloadDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    DownloadMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  return {
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
      store.update("file", props2.file);
    },
    Download: DownloadDecorator,
    DownloadButton: DownloadButtonDecorator,
    DownloadMenuItem: DownloadMenuItemDecorator
  };
};

exports.DownloadIcon = DownloadIcon;
exports.getFilePlugin = getFilePlugin;

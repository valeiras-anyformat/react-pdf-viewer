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

const InfoIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z
            M14.5,17.005H13
            c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10
            M11.745,6.504L11.745,6.504
            M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25
            S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5`
  }
));

var styles$2 = {"loader":"rpv_1c26ac9a"};

const PropertiesLoader = ({ doc, render }) => {
  const [data, setData] = React__namespace.useState();
  React__namespace.useEffect(() => {
    doc.getMetadata().then((meta) => {
      return Promise.resolve(meta);
    }).then((meta) => {
      return doc.getDownloadInfo().then((d) => {
        return Promise.resolve({
          fileName: meta.contentDispositionFilename || "",
          info: meta.info,
          length: d.length
        });
      });
    }).then((response) => {
      setData(response);
    });
  }, []);
  return data ? render(data) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.loader }, /* @__PURE__ */ React__namespace.createElement(core.Spinner, null));
};

var styles$1 = {"item":"rpv_6ea31738","itemRtl":"rpv_f50c4012","label":"rpv_65e1676f","value":"rpv_666e79ec"};

const PropertyItem = ({ label, value }) => {
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  return /* @__PURE__ */ React__namespace.createElement(
    "dl",
    {
      className: core.classNames({
        [styles$1.item]: true,
        [styles$1.itemRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("dt", { className: styles$1.label }, label, ":"),
    /* @__PURE__ */ React__namespace.createElement("dd", { className: styles$1.value }, value || "-")
  );
};

var styles = {"modal":"rpv_255a805a","section":"rpv_650b4d52","footer":"rpv_7a08e58e"};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const dateRegex = new RegExp(
  "^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"
);
const parse = (value, min, max, defaultValue) => {
  const parsed = parseInt(value, 10);
  return parsed >= min && parsed <= max ? parsed : defaultValue;
};
const convertDate = (input) => {
  const matches = dateRegex.exec(input);
  if (!matches) {
    return null;
  }
  const year = parseInt(matches[1], 10);
  const month = parse(matches[2], 1, 12, 1) - 1;
  const day = parse(matches[3], 1, 31, 1);
  let hour = parse(matches[4], 0, 23, 0);
  let minute = parse(matches[5], 0, 59, 0);
  const second = parse(matches[6], 0, 59, 0);
  const universalTimeRelation = matches[7] || "Z";
  const offsetHour = parse(matches[8], 0, 23, 0);
  const offsetMinute = parse(matches[9], 0, 59, 0);
  switch (universalTimeRelation) {
    case "-":
      hour += offsetHour;
      minute += offsetMinute;
      break;
    case "+":
      hour -= offsetHour;
      minute -= offsetMinute;
      break;
  }
  return new Date(Date.UTC(year, month, day, hour, minute, second));
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

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getFileSize = (bytes) => {
  const sufixes = ["B", "kB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};

const PropertiesModal = ({ doc, fileName, onToggle }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const formatDate = (input) => {
    const date = convertDate(input);
    return date ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}` : "";
  };
  const renderData = (data) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.fileName : "File name",
      value: data.fileName || getFileName(fileName)
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.fileSize : "File size",
      value: getFileSize(data.length)
    }
  )), /* @__PURE__ */ React__namespace.createElement(core.Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.title : "Title",
      value: data.info.Title
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.author : "Author",
      value: data.info.Author
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.subject : "Subject",
      value: data.info.Subject
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.keywords : "Keywords",
      value: data.info.Keywords
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.creator : "Creator",
      value: data.info.Creator
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.creationDate : "Creation date",
      value: formatDate(data.info.CreationDate)
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.modificationDate : "Modification date",
      value: formatDate(data.info.ModDate)
    }
  )), /* @__PURE__ */ React__namespace.createElement(core.Separator, null), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.section }, /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pdfProducer : "PDF producer",
      value: data.info.Producer
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pdfVersion : "PDF version",
      value: data.info.PDFFormatVersion
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    PropertyItem,
    {
      label: l10n && l10n.properties ? l10n.properties.pageCount : "Page count",
      value: `${doc.numPages}`
    }
  )));
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles.modal }, /* @__PURE__ */ React__namespace.createElement(PropertiesLoader, { doc, render: renderData }), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footer }, /* @__PURE__ */ React__namespace.createElement(core.Button, { onClick: onToggle }, l10n && l10n.properties ? l10n.properties.close : "Close")));
};

const ShowPropertiesButton = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.properties ? l10n.properties.showProperties : "Show properties";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "properties",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(core.MinimalButton, { ariaLabel: label, testId: "properties__button", onClick }, /* @__PURE__ */ React__namespace.createElement(InfoIcon, null)),
      content: () => label
    }
  );
};

const useDocument = (store) => {
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
  return { currentDoc };
};

const ShowProperties = ({ children, store }) => {
  const { currentDoc } = useDocument(store);
  const fileName = store.get("fileName") || "";
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesButton, { ...props });
  const render = children || defaultChildren;
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    core.Modal,
    {
      ariaControlsSuffix: "properties",
      target: (toggle) => render({
        onClick: toggle
      }),
      content: (toggle) => /* @__PURE__ */ React__namespace.createElement(PropertiesModal, { doc: currentDoc, fileName, onToggle: toggle }),
      closeOnClickOutside: true,
      closeOnEscape: true
    }
  ) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const ShowPropertiesMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.properties ? l10n.properties.showProperties : "Show properties";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(InfoIcon, null), testId: "properties__menu", onClick }, label);
};

const propertiesPlugin = () => {
  const store = React__namespace.useMemo(
    () => core.createStore({
      fileName: ""
    }),
    []
  );
  const ShowPropertiesDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(ShowProperties, { ...props, store });
  const ShowPropertiesButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ShowProperties, { store });
  const ShowPropertiesMenuItemDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(ShowPropertiesMenuItem, { ...p }));
  return {
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    onViewerStateChange: (viewerState) => {
      store.update("fileName", viewerState.file.name);
      return viewerState;
    },
    ShowProperties: ShowPropertiesDecorator,
    ShowPropertiesButton: ShowPropertiesButtonDecorator,
    ShowPropertiesMenuItem: ShowPropertiesMenuItemDecorator
  };
};

exports.InfoIcon = InfoIcon;
exports.propertiesPlugin = propertiesPlugin;

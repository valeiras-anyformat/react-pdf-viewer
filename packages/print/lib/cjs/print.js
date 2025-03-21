'use strict';

var core = require('@react-pdf-viewer/core');
var React = require('react');
var reactDom = require('react-dom');

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

const PrintIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M7.5,19.499h9 M7.5,16.499h9 M5.5,16.5h-3c-1.103-0.003-1.997-0.897-2-2v-6c0.003-1.103,0.897-1.997,2-2h19
            c1.103,0.003,1.997,0.897,2,2v6c-0.003,1.103-0.897,1.997-2,2h-3
            M5.5,4.5v-4h9.586c0.265,0,0.52,0.105,0.707,0.293l2.414,2.414
            C18.395,3.394,18.5,3.649,18.5,3.914V4.5
            M18.5,22.5c0,0.552-0.448,1-1,1h-11c-0.552,0-1-0.448-1-1v-9h13V22.5z
            M3.5,8.499
            c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S2.948,8.499,3.5,8.499z
            M14.5,0.499v4h4`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getAllPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const generateRange = (min, max) => Array(max - min + 1).fill(0).map((_, i) => min + i);
const removeDuplicate = (arr) => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
const getCustomPagesNumbers = (customPages) => {
  return (doc) => {
    const results = [];
    customPages.replace(/\s+/g, "").split(",").forEach((part) => {
      const range = part.split("-").map((c) => parseInt(c, 10)).filter((c) => Number.isInteger(c));
      if (range.length === 1) {
        results.push(range[0] - 1);
      } else if (range.length === 2) {
        results.push(...generateRange(range[0] - 1, range[1] - 1));
      }
    });
    return removeDuplicate(results).filter((i) => i >= 0 && i < doc.numPages);
  };
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getEvenPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i).filter((i) => (i + 1) % 2 === 0);

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getOddPagesNumbers = (doc) => Array(doc.numPages).fill(0).map((_, i) => i).filter((i) => (i + 1) % 2 === 1);

const PrintButton = ({ enableShortcuts, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.print ? l10n.print.print : "Print";
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+P" : "Ctrl+P" : "";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "print",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: label,
          testId: "print__button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(PrintIcon, null)
      ),
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
var PrintStatus = /* @__PURE__ */ ((PrintStatus2) => {
  PrintStatus2["CheckingPermission"] = "CheckingPermission";
  PrintStatus2["Inactive"] = "Inactive";
  PrintStatus2["Preparing"] = "Preparing";
  PrintStatus2["Cancelled"] = "Cancelled";
  PrintStatus2["Ready"] = "Ready";
  return PrintStatus2;
})(PrintStatus || {});

const Print = ({ children, enableShortcuts, store }) => {
  const print = () => {
    store.update("printStatus", PrintStatus.CheckingPermission);
  };
  const render = children || PrintButton;
  return render({
    enableShortcuts,
    onClick: print
  });
};

var styles$3 = {"body":"rpv_6708d99b","footer":"rpv_cf113b54"};

const PERMISSION_PRINT = 4;
const PERMISSION_PRINT_HIGHT_QUALITY = 2048;
const CheckPrintPermission = ({ doc, store }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const [isAllowed, setIsAllowed] = React__namespace.useState(true);
  React__namespace.useEffect(() => {
    doc.getPermissions().then((permissions) => {
      const canPrint = permissions === null || permissions.includes(PERMISSION_PRINT) || permissions.includes(PERMISSION_PRINT_HIGHT_QUALITY);
      canPrint ? store.update("printStatus", PrintStatus.Preparing) : setIsAllowed(false);
    });
  }, []);
  return isAllowed ? /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null) : /* @__PURE__ */ React__namespace.createElement(
    core.Modal,
    {
      ariaControlsSuffix: "print-permission",
      closeOnClickOutside: false,
      closeOnEscape: false,
      content: (toggle) => {
        const close = () => {
          toggle();
          store.update("printStatus", PrintStatus.Cancelled);
        };
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.body }, l10n && l10n.print ? l10n.print.disallowPrint : "The document does not allow to print"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.footer }, /* @__PURE__ */ React__namespace.createElement(core.Button, { onClick: close }, l10n && l10n.print ? l10n.print.close : "Close")));
      },
      isOpened: true
    }
  );
};

var styles$2 = {"container":"rpv_ede6da6e","inner":"rpv_cf06dac3","innerRtl":"rpv_eeaccca7","progress":"rpv_9b3f42a0","message":"rpv_ed452534"};

const PrintProgress = ({ numLoadedPages, numPages, onCancel }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const progress = Math.floor(numLoadedPages * 100 / numPages);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.container }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: core.classNames({
        [styles$2.inner]: true,
        [styles$2.innerRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.message }, l10n && l10n.print ? l10n.print.preparingDocument : "Preparing document ..."),
    /* @__PURE__ */ React__namespace.createElement("div", { className: styles$2.progress }, /* @__PURE__ */ React__namespace.createElement(core.ProgressBar, { progress })),
    /* @__PURE__ */ React__namespace.createElement(core.Button, { onClick: onCancel }, l10n && l10n.print ? l10n.print.cancel : "Cancel")
  ));
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const isRunningInJest = () => typeof process !== "undefined" && process.env.JEST_WORKER_ID !== void 0;

var styles$1 = {"page":"rpv_3441ef3f","image":"rpv_539eb2ab"};

const PageThumbnail = ({ canvas, page, pageHeight, pageIndex, pageWidth, rotation, onLoad }) => {
  const renderTask = React__namespace.useRef();
  const [src, setSrc] = core.useSafeState("");
  const testWithJest = React__namespace.useMemo(() => isRunningInJest(), []);
  const handleImageLoad = () => {
    if (!testWithJest) {
      onLoad();
    }
  };
  React__namespace.useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }
    const printUnit = 150 / 72;
    canvas.height = Math.floor(pageHeight * printUnit);
    canvas.width = Math.floor(pageWidth * printUnit);
    const canvasContext = canvas.getContext("2d");
    canvasContext.save();
    canvasContext.fillStyle = "rgb(255, 255, 255)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
    const viewport = page.getViewport({ rotation, scale: 1 });
    renderTask.current = page.render({
      canvasContext,
      intent: "print",
      transform: [printUnit, 0, 0, printUnit, 0, 0],
      viewport
    });
    renderTask.current.promise.then(
      () => {
        if ("toBlob" in canvas && "createObjectURL" in URL) {
          canvas.toBlob((blob) => {
            if (blob) {
              setSrc(URL.createObjectURL(blob));
              testWithJest && onLoad();
            }
          });
        } else {
          setSrc(canvas.toDataURL());
          testWithJest && onLoad();
        }
      },
      () => {
      }
    );
  }, []);
  return src && /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.page }, /* @__PURE__ */ React__namespace.createElement(
    "img",
    {
      className: styles$1.image,
      "data-testid": `print__thumbnail-${pageIndex}`,
      src,
      onLoad: handleImageLoad
    }
  ));
};

const PageThumbnailContainer = ({ canvas, doc, pageIndex, pageRotation, pageSize, rotation, shouldRender, onLoad }) => {
  const [page, setPage] = core.useSafeState(null);
  const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
  React__namespace.useEffect(() => {
    if (shouldRender) {
      core.getPage(doc, pageIndex).then((pdfPage) => {
        setPage(pdfPage);
      });
    }
  }, [shouldRender]);
  const rotationNumber = (pageSize.rotation + rotation + pageRotation) % 360;
  return page && /* @__PURE__ */ React__namespace.createElement(
    PageThumbnail,
    {
      canvas,
      page,
      pageHeight: isVertical ? pageSize.pageHeight : pageSize.pageWidth,
      pageIndex,
      pageWidth: isVertical ? pageSize.pageWidth : pageSize.pageHeight,
      rotation: rotationNumber,
      onLoad
    }
  );
};

var styles = {"zone":"rpv_ef75ad00","htmlPrinting":"rpv_1f5dd034","bodyPrinting":"rpv_f9a11b2b"};

const PrintZone = ({ doc, numLoadedPages, pagesRotation, pageSizes, printPages, printStatus, rotation, onCancel, onLoad }) => {
  const canvas = React__namespace.useMemo(() => document.createElement("canvas"), []);
  const container = React__namespace.useMemo(() => {
    const zoneEle = document.querySelector(`.${styles.zone}`);
    if (zoneEle) {
      return zoneEle;
    }
    const div = document.createElement("div");
    div.classList.add(styles.zone);
    div.setAttribute("data-testid", "print__zone");
    document.body.appendChild(div);
    return div;
  }, []);
  React__namespace.useEffect(() => {
    if (printStatus === PrintStatus.Ready) {
      document.documentElement.classList.add(styles.htmlPrinting);
      document.body.classList.add(styles.bodyPrinting);
      window.print();
    }
    const handler = () => {
      if (printStatus === PrintStatus.Ready) {
        document.documentElement.classList.remove(styles.htmlPrinting);
        document.body.classList.remove(styles.bodyPrinting);
        const zones = document.querySelectorAll(`.${styles.zone}`);
        if (zones) {
          zones.forEach((zoneEle) => {
            zoneEle.parentElement?.removeChild(zoneEle);
          });
        }
        canvas.height = 0;
        canvas.width = 0;
        document.removeEventListener("mousemove", handler);
        onCancel();
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [printStatus]);
  const pageHeight = pageSizes[0].pageHeight;
  const pageWidth = pageSizes[0].pageWidth;
  return reactDom.createPortal(
    /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printPages.map((pageIndex, loopIndex) => /* @__PURE__ */ React__namespace.createElement(
      PageThumbnailContainer,
      {
        key: pageIndex,
        canvas,
        doc,
        pageIndex,
        pageRotation: pagesRotation.has(pageIndex) ? pagesRotation.get(pageIndex) : 0,
        pageSize: pageSizes[pageIndex],
        rotation,
        shouldRender: loopIndex === numLoadedPages,
        onLoad
      }
    )), /* @__PURE__ */ React__namespace.createElement(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: `@page { size: ${pageWidth}pt ${pageHeight}pt }`
        }
      }
    )),
    container
  );
};

const PrintContainer = ({ doc, pagesRotation, pageSizes, renderProgressBar, rotation, setPages, store }) => {
  const [printStatus, setPrintStatus] = React__namespace.useState(PrintStatus.Inactive);
  const [numLoadedPagesForPrint, setNumLoadedPagesForPrint] = React__namespace.useState(0);
  const printPages = React__namespace.useMemo(() => {
    const { numPages } = doc;
    return setPages(doc).filter((index) => index >= 0 && index < numPages);
  }, [doc, setPages]);
  const numPrintPages = printPages.length;
  const cancelPrinting = () => {
    setNumLoadedPagesForPrint(0);
    setPrintStatus(PrintStatus.Inactive);
  };
  const handlePrintStatus = (status) => setPrintStatus(status);
  const onLoadPage = () => {
    const total = numLoadedPagesForPrint + 1;
    if (total <= numPrintPages) {
      setNumLoadedPagesForPrint(total);
      total === numPrintPages && setPrintStatus(PrintStatus.Ready);
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("printStatus", handlePrintStatus);
    return () => {
      store.unsubscribe("printStatus", handlePrintStatus);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printStatus === PrintStatus.CheckingPermission && /* @__PURE__ */ React__namespace.createElement(CheckPrintPermission, { doc, store }), printStatus === PrintStatus.Preparing && (renderProgressBar ? renderProgressBar(numLoadedPagesForPrint, numPrintPages, cancelPrinting) : /* @__PURE__ */ React__namespace.createElement(
    PrintProgress,
    {
      numLoadedPages: numLoadedPagesForPrint,
      numPages: numPrintPages,
      onCancel: cancelPrinting
    }
  )), (printStatus === PrintStatus.Preparing || printStatus === PrintStatus.Ready) && numLoadedPagesForPrint <= numPrintPages && /* @__PURE__ */ React__namespace.createElement(
    PrintZone,
    {
      doc,
      numLoadedPages: numLoadedPagesForPrint,
      pagesRotation,
      pageSizes,
      printPages,
      printStatus,
      rotation,
      onCancel: cancelPrinting,
      onLoad: onLoadPage
    }
  ));
};

const PrintMenuItem = ({ onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.print ? l10n.print.print : "Print";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(PrintIcon, null), testId: "print__menu", onClick }, label);
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
      if (!element || e.shiftKey || e.altKey || e.key !== "p") {
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
      store.update("printStatus", PrintStatus.Preparing);
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

const printPlugin = (props) => {
  const printPluginProps = React__namespace.useMemo(
    () => Object.assign(
      {},
      {
        enableShortcuts: true,
        setPages: (doc) => Array(doc.numPages).fill(0).map((_, i) => i)
      },
      props
    ),
    []
  );
  const store = React__namespace.useMemo(
    () => core.createStore({
      printStatus: PrintStatus.Inactive
    }),
    []
  );
  const print = () => {
    store.update("printStatus", PrintStatus.CheckingPermission);
  };
  const PrintDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Print, { enableShortcuts: printPluginProps.enableShortcuts, ...props2, store });
  const PrintButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(PrintDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(PrintButton, { ...props2 }));
  const PrintMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(PrintDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    PrintMenuItem,
    {
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const renderViewer = (renderViewerProps) => {
    const { slot } = renderViewerProps;
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, printPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: renderViewerProps.containerRef, store }), /* @__PURE__ */ React__namespace.createElement(
        PrintContainer,
        {
          doc: renderViewerProps.doc,
          pagesRotation: renderViewerProps.pagesRotation,
          pageSizes: renderViewerProps.pageSizes,
          renderProgressBar: props?.renderProgressBar,
          rotation: renderViewerProps.rotation,
          setPages: printPluginProps.setPages,
          store
        }
      ), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  const setPages = (printPages) => {
    printPluginProps.setPages = printPages;
  };
  return {
    print,
    renderViewer,
    Print: PrintDecorator,
    PrintButton: PrintButtonDecorator,
    PrintMenuItem: PrintMenuItemDecorator,
    setPages
  };
};

exports.PrintIcon = PrintIcon;
exports.getAllPagesNumbers = getAllPagesNumbers;
exports.getCustomPagesNumbers = getCustomPagesNumbers;
exports.getEvenPagesNumbers = getEvenPagesNumbers;
exports.getOddPagesNumbers = getOddPagesNumbers;
exports.printPlugin = printPlugin;

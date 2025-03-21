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
var ThumbnailDirection = /* @__PURE__ */ ((ThumbnailDirection2) => {
  ThumbnailDirection2["Horizontal"] = "Horizontal";
  ThumbnailDirection2["Vertical"] = "Vertical";
  return ThumbnailDirection2;
})(ThumbnailDirection || {});

var styles$3 = {"cover":"rpv_34a2d621","loader":"rpv_6f09fae9","inner":"rpv_34f6d0c0","image":"rpv_34f62bc5"};

const CoverInner = ({ doc, getPageIndex, renderSpinner, store, width }) => {
  const { numPages } = doc;
  const targetPage = getPageIndex ? getPageIndex({ numPages }) : 0;
  const normalizePage = Math.max(0, Math.min(targetPage, numPages - 1));
  const initialPagesRotation = store.get("pagesRotation") || /* @__PURE__ */ new Map();
  const initialTargetPageRotation = initialPagesRotation.has(normalizePage) ? initialPagesRotation.get(normalizePage) : 0;
  const [src, setSrc] = core.useSafeState("");
  const renderTask = React__namespace.useRef();
  const [rotation, setRotation] = React__namespace.useState(store.get("rotation") || 0);
  const [pageRotation, setPageRotation] = React__namespace.useState(initialTargetPageRotation);
  const [isVisible, setVisible] = React__namespace.useState(false);
  const handlePagesRotationChanged = (rotations) => {
    const pageRotation2 = rotations.has(normalizePage) ? rotations.get(normalizePage) : 0;
    setPageRotation(pageRotation2);
  };
  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };
  const handleVisibilityChanged = (params) => {
    setVisible(params.isVisible);
  };
  const containerRef = core.useIntersectionObserver({
    onVisibilityChanged: handleVisibilityChanged
  });
  React__namespace.useEffect(() => {
    if (!isVisible) {
      return;
    }
    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    setSrc("");
    core.getPage(doc, normalizePage).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const viewportRotation = viewport.rotation;
      const rotationValue = (viewportRotation + rotation + pageRotation) % 360;
      const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
      const w = isVertical ? viewport.width : viewport.height;
      const h = isVertical ? viewport.height : viewport.width;
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d", { alpha: false });
      if (!canvasContext) {
        return;
      }
      const containerWidth = containerEle.clientWidth;
      const containerHeight = containerEle.clientHeight;
      const scaled = width ? width / w : Math.min(containerWidth / w, containerHeight / h);
      const canvasWidth = scaled * w;
      const canvasHeight = scaled * h;
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
      canvas.style.opacity = "0";
      const renderViewport = page.getViewport({
        rotation: rotationValue,
        scale: scaled
      });
      renderTask.current = page.render({ canvasContext, viewport: renderViewport });
      renderTask.current.promise.then(
        () => {
          setSrc(canvas.toDataURL());
          canvas.width = 0;
          canvas.height = 0;
        },
        () => {
        }
      );
    });
  }, [pageRotation, isVisible]);
  React__namespace.useEffect(() => {
    store.subscribe("pagesRotation", handlePagesRotationChanged);
    store.subscribe("rotation", handleRotationChanged);
    return () => {
      store.unsubscribe("pagesRotation", handlePagesRotationChanged);
      store.unsubscribe("rotation", handleRotationChanged);
    };
  }, []);
  React__namespace.useEffect(() => {
    return () => {
      renderTask.current?.cancel();
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef, className: styles$3.inner, "data-testid": "thumbnail__cover-inner" }, src ? /* @__PURE__ */ React__namespace.createElement("img", { className: styles$3.image, "data-testid": "thumbnail__cover-image", src }) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.loader, "data-testid": "thumbnail__cover-loader" }, renderSpinner ? renderSpinner() : /* @__PURE__ */ React__namespace.createElement(core.Spinner, null)));
};

const Cover = ({ getPageIndex, renderSpinner, store, width }) => {
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
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.cover }, currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    CoverInner,
    {
      doc: currentDoc,
      getPageIndex,
      renderSpinner,
      store,
      width
    }
  ) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.loader }, renderSpinner ? renderSpinner() : /* @__PURE__ */ React__namespace.createElement(core.Spinner, null)));
};

const defaultSpinner = () => /* @__PURE__ */ React__namespace.createElement(core.Spinner, null);
const SpinnerContext = React__namespace.createContext({
  renderSpinner: defaultSpinner
});

const FetchLabels = ({ children, doc }) => {
  const [status, setStatus] = core.useSafeState({
    loading: true,
    labels: []
  });
  React__namespace.useEffect(() => {
    doc.getPageLabels().then((result) => {
      setStatus({ loading: false, labels: result || [] });
    });
  }, [doc.loadingTask.docId]);
  return status.loading ? /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null) : children(status.labels);
};

const ThumbnailItem = ({ page, pageHeight, pageIndex, pageWidth, rotation, thumbnailHeight, thumbnailWidth, onRenderCompleted }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const renderTask = React__namespace.useRef();
  const [src, setSrc] = React__namespace.useState("");
  const thumbnailLabel = l10n && l10n.thumbnail ? l10n.thumbnail.thumbnailLabel : "Thumbnail of page {{pageIndex}}";
  React__namespace.useEffect(() => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d", { alpha: false });
    if (!canvasContext) {
      return;
    }
    const w = thumbnailWidth;
    const h = w / (pageWidth / pageHeight);
    const scale = w / pageWidth;
    canvas.height = h;
    canvas.width = w;
    canvas.style.height = `${h}px`;
    canvas.style.width = `${w}px`;
    const viewport = page.getViewport({ rotation, scale });
    renderTask.current = page.render({ canvasContext, viewport });
    renderTask.current.promise.then(
      () => {
        setSrc(canvas.toDataURL());
        onRenderCompleted(pageIndex);
      },
      () => {
        onRenderCompleted(pageIndex);
      }
    );
    return () => {
      renderTask.current?.cancel();
    };
  }, [rotation]);
  return !src ? React__namespace.useContext(SpinnerContext).renderSpinner() : /* @__PURE__ */ React__namespace.createElement(
    "img",
    {
      "aria-label": thumbnailLabel.replace("{{pageIndex}}", `${pageIndex + 1}`),
      src,
      height: `${thumbnailHeight}px`,
      width: `${thumbnailWidth}px`
    }
  );
};

var styles$2 = {"container":"rpv_87cfa5a9"};

const ThumbnailContainer = ({
  doc,
  pageHeight,
  pageIndex,
  pageRotation,
  pageWidth,
  rotation,
  shouldRender,
  thumbnailWidth,
  onRenderCompleted,
  onVisibilityChanged
}) => {
  const [pageSize, setPageSize] = core.useSafeState({
    height: pageHeight,
    page: null,
    viewportRotation: 0,
    width: pageWidth
  });
  const { page, height, width } = pageSize;
  const scale = width / height;
  const isVertical = Math.abs(rotation + pageRotation) % 180 === 0;
  const w = isVertical ? thumbnailWidth : thumbnailWidth / scale;
  const h = isVertical ? thumbnailWidth / scale : thumbnailWidth;
  React__namespace.useEffect(() => {
    if (shouldRender) {
      core.getPage(doc, pageIndex).then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });
        setPageSize({
          height: viewport.height,
          page: pdfPage,
          viewportRotation: viewport.rotation,
          width: viewport.width
        });
      });
    }
  }, [shouldRender]);
  const rotationNumber = (pageSize.viewportRotation + rotation + pageRotation) % 360;
  const containerRef = core.useIntersectionObserver({
    onVisibilityChanged: (visibility) => {
      onVisibilityChanged(pageIndex, visibility);
    }
  });
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$2.container,
      "data-testid": `thumbnail__container-${pageIndex}`,
      ref: containerRef,
      style: {
        height: `${h}px`,
        width: `${w}px`
      }
    },
    !page ? React__namespace.useContext(SpinnerContext).renderSpinner() : /* @__PURE__ */ React__namespace.createElement(
      ThumbnailItem,
      {
        page,
        pageHeight: isVertical ? height : width,
        pageIndex,
        pageWidth: isVertical ? width : height,
        rotation: rotationNumber,
        thumbnailHeight: h,
        thumbnailWidth: w,
        onRenderCompleted
      }
    )
  );
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const scrollToBeVisibleVertically = (ele, container) => {
  const top = ele.getBoundingClientRect().top - container.getBoundingClientRect().top;
  const eleHeight = ele.clientHeight;
  const containerHeight = container.clientHeight;
  if (top < 0) {
    container.scrollTop += top;
    return;
  }
  if (top + eleHeight <= containerHeight) {
    return;
  }
  container.scrollTop += top + eleHeight - containerHeight;
};
const scrollToBeVisibleHorizontally = (ele, container) => {
  const left = ele.getBoundingClientRect().left - container.getBoundingClientRect().left;
  const eleWidth = ele.clientWidth;
  const containerWidth = container.clientWidth;
  if (left < 0) {
    container.scrollLeft += left;
    return;
  }
  if (left + eleWidth <= containerWidth) {
    return;
  }
  container.scrollLeft += left + eleWidth - containerWidth;
};

var styles$1 = {"container":"rpv_fcb6421e","containerRtl":"rpv_5d99636c","containerHorizontal":"rpv_43a01ce2","containerVertical":"rpv_78f00fb4","inner":"rpv_8b9d9a73","innerDual":"rpv_f5b5d58f","item":"rpv_db36b756","innerDualCover":"rpv_c390af68","itemSingle":"rpv_806cf3e","itemDualCover":"rpv_959661e5","itemDualEven":"rpv_702f252c","itemDualCoverOdd":"rpv_a72b4d0a","itemDualOdd":"rpv_f31a6edd","itemDualCoverEven":"rpv_3e3a0c9f","itemSelected":"rpv_4a6d5811","label":"rpv_8bc1cb11"};

const ThumbnailList = ({
  currentPage,
  doc,
  labels,
  pagesRotation,
  pageHeight,
  pageWidth,
  renderCurrentPageLabel,
  renderThumbnailItem,
  rotatedPage,
  rotation,
  thumbnailDirection,
  thumbnailWidth,
  viewMode,
  onJumpToPage,
  onRotatePage
}) => {
  const { numPages } = doc;
  const docId = doc.loadingTask.docId;
  const containerRef = React__namespace.useRef(null);
  const thumbnailsRef = React__namespace.useRef([]);
  const [currentFocused, setCurrentFocused] = React__namespace.useState(currentPage);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const [renderPageIndex, setRenderPageIndex] = React__namespace.useState(-1);
  const isMounted = core.useIsMounted();
  const previousViewMode = core.usePrevious(viewMode);
  const hasRenderingThumbnailRef = React__namespace.useRef(false);
  const renderQueue = core.useRenderQueue({ doc });
  const pageIndexes = React__namespace.useMemo(
    () => Array(numPages).fill(0).map((_, pageIndex) => pageIndex),
    [docId]
  );
  const chunks = React__namespace.useMemo(() => {
    switch (viewMode) {
      case core.ViewMode.DualPage:
        return core.chunk(pageIndexes, 2);
      case core.ViewMode.DualPageWithCover:
        return [[pageIndexes[0]]].concat(core.chunk(pageIndexes.slice(1), 2));
      case core.ViewMode.SinglePage:
      default:
        return core.chunk(pageIndexes, 1);
    }
  }, [docId, viewMode]);
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        activateNextItem();
        break;
      case "ArrowUp":
        activatePreviousItem();
        break;
      case "Enter":
        jumpToFocusedPage();
        break;
    }
  };
  const activateNextItem = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const items = thumbnailsRef.current;
    const nextItem = currentFocused + 1;
    if (nextItem < items.length) {
      if (currentFocused >= 0) {
        items[currentFocused].setAttribute("tabindex", "-1");
      }
      setCurrentFocused(nextItem);
    }
  };
  const activatePreviousItem = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const items = thumbnailsRef.current;
    const prevItem = currentFocused - 1;
    if (prevItem >= 0) {
      if (currentFocused >= 0) {
        items[currentFocused].setAttribute("tabindex", "-1");
      }
      setCurrentFocused(prevItem);
    }
  };
  const jumpToFocusedPage = () => {
    if (currentFocused >= 0 && currentFocused < numPages) {
      onJumpToPage(currentFocused);
    }
  };
  core.useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    thumbnailsRef.current = Array.from(container.querySelectorAll(`.${styles$1.item}`));
  }, [viewMode]);
  React__namespace.useEffect(() => {
    const thumbnails = thumbnailsRef.current;
    if (thumbnails.length === 0 || currentFocused < 0 || currentFocused > thumbnails.length) {
      return;
    }
    const thumbnailEle = thumbnails[currentFocused];
    thumbnailEle.setAttribute("tabindex", "0");
    thumbnailEle.focus();
  }, [currentFocused]);
  core.useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const thumbnails = thumbnailsRef.current;
    if (!container || thumbnails.length === 0 || currentPage < 0 || currentPage > thumbnails.length) {
      return;
    }
    const thumbnailContainer = thumbnails[currentPage].closest(`.${styles$1.inner}`);
    if (thumbnailContainer) {
      thumbnailDirection === ThumbnailDirection.Vertical ? scrollToBeVisibleVertically(thumbnailContainer, container) : scrollToBeVisibleHorizontally(thumbnailContainer, container);
    }
  }, [currentPage, thumbnailDirection]);
  const handleRenderCompleted = React__namespace.useCallback(
    (pageIndex) => {
      if (isMounted.current) {
        renderQueue.markRendered(pageIndex);
        hasRenderingThumbnailRef.current = false;
        renderNextThumbnail();
      }
    },
    [docId]
  );
  const handleVisibilityChanged = React__namespace.useCallback(
    (pageIndex, visibility) => {
      visibility.isVisible ? renderQueue.setVisibility(pageIndex, visibility.ratio) : (
        // Notice that we don't virtualize the list of thumbnails
        renderQueue.setOutOfRange(pageIndex)
      );
      renderNextThumbnail();
    },
    [docId]
  );
  const renderNextThumbnail = React__namespace.useCallback(() => {
    if (hasRenderingThumbnailRef.current) {
      return;
    }
    const nextPage = renderQueue.getHighestPriorityPage();
    if (nextPage > -1) {
      renderQueue.markRendering(nextPage);
      hasRenderingThumbnailRef.current = true;
      setRenderPageIndex(nextPage);
    }
  }, [docId]);
  React__namespace.useEffect(() => {
    if (rotatedPage >= 0) {
      renderQueue.markRendering(rotatedPage);
      hasRenderingThumbnailRef.current = true;
      setRenderPageIndex(rotatedPage);
    }
  }, [docId, rotatedPage]);
  core.useIsomorphicLayoutEffect(() => {
    if (previousViewMode !== viewMode) {
      renderQueue.markNotRendered();
      renderNextThumbnail();
    }
  }, [viewMode]);
  const renderPageThumbnail = (pageIndex) => {
    const isCover = viewMode === core.ViewMode.DualPageWithCover && (pageIndex === 0 || numPages % 2 === 0 && pageIndex === numPages - 1);
    const key = `${doc.loadingTask.docId}___${pageIndex}`;
    const pageLabel = labels.length === numPages ? labels[pageIndex] : `${pageIndex + 1}`;
    const label = renderCurrentPageLabel ? renderCurrentPageLabel({ currentPage, pageIndex, numPages, pageLabel }) : pageLabel;
    const pageRotation = pagesRotation.has(pageIndex) ? pagesRotation.get(pageIndex) : 0;
    const thumbnail = /* @__PURE__ */ React__namespace.createElement(
      ThumbnailContainer,
      {
        doc,
        pageHeight,
        pageIndex,
        pageRotation,
        pageWidth,
        rotation,
        shouldRender: renderPageIndex === pageIndex,
        thumbnailWidth,
        onRenderCompleted: handleRenderCompleted,
        onVisibilityChanged: handleVisibilityChanged
      }
    );
    return renderThumbnailItem ? renderThumbnailItem({
      currentPage,
      key,
      numPages,
      pageIndex,
      renderPageLabel: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, label),
      renderPageThumbnail: thumbnail,
      onJumpToPage: () => onJumpToPage(pageIndex),
      onRotatePage: (direction2) => onRotatePage(pageIndex, direction2)
    }) : /* @__PURE__ */ React__namespace.createElement("div", { key }, /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: core.classNames({
          [styles$1.item]: true,
          [styles$1.itemDualEven]: viewMode === core.ViewMode.DualPage && pageIndex % 2 === 0,
          [styles$1.itemDualOdd]: viewMode === core.ViewMode.DualPage && pageIndex % 2 === 1,
          [styles$1.itemDualCover]: isCover,
          [styles$1.itemDualCoverEven]: viewMode === core.ViewMode.DualPageWithCover && !isCover && pageIndex % 2 === 0,
          [styles$1.itemDualCoverOdd]: viewMode === core.ViewMode.DualPageWithCover && !isCover && pageIndex % 2 === 1,
          [styles$1.itemSingle]: viewMode === core.ViewMode.SinglePage,
          [styles$1.itemSelected]: currentPage === pageIndex
        }),
        role: "button",
        tabIndex: currentPage === pageIndex ? 0 : -1,
        onClick: () => onJumpToPage(pageIndex)
      },
      thumbnail
    ), /* @__PURE__ */ React__namespace.createElement("div", { "data-testid": `thumbnail__label-${pageIndex}`, className: styles$1.label }, label));
  };
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref: containerRef,
      "data-testid": "thumbnail__list",
      className: core.classNames({
        [styles$1.container]: true,
        [styles$1.containerHorizontal]: thumbnailDirection === ThumbnailDirection.Horizontal,
        [styles$1.containerRtl]: isRtl,
        [styles$1.containerVertical]: thumbnailDirection === ThumbnailDirection.Vertical
      }),
      onKeyDown: handleKeyDown
    },
    chunks.map((chunkItem, index) => {
      switch (viewMode) {
        case core.ViewMode.DualPage:
          break;
        case core.ViewMode.DualPageWithCover:
          break;
        case core.ViewMode.SinglePage:
      }
      return /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          className: core.classNames({
            [styles$1.inner]: true,
            [styles$1.innerDual]: viewMode === core.ViewMode.DualPage,
            [styles$1.innerDualCover]: viewMode === core.ViewMode.DualPageWithCover
          }),
          key: `${index}___${viewMode}`
        },
        chunkItem.map((pageIndex) => renderPageThumbnail(pageIndex))
      );
    })
  );
};

var styles = {"container":"rpv_16d088e5","loader":"rpv_3031ee2f"};

const ThumbnailListWithStore = ({ renderCurrentPageLabel, renderThumbnailItem, store, thumbnailDirection, thumbnailWidth }) => {
  const [currentDoc, setCurrentDoc] = React__namespace.useState(store.get("doc"));
  const [currentPage, setCurrentPage] = React__namespace.useState(store.get("currentPage") || 0);
  const [pageHeight, setPageHeight] = React__namespace.useState(store.get("pageHeight") || 0);
  const [pageWidth, setPageWidth] = React__namespace.useState(store.get("pageWidth") || 0);
  const [rotation, setRotation] = React__namespace.useState(store.get("rotation") || 0);
  const [pagesRotation, setPagesRotation] = React__namespace.useState(store.get("pagesRotation") || /* @__PURE__ */ new Map());
  const [rotatedPage, setRotatedPage] = React__namespace.useState(store.get("rotatedPage") || -1);
  const [viewMode, setViewMode] = React__namespace.useState(store.get("viewMode"));
  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };
  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };
  const handlePageHeightChanged = (height) => {
    setPageHeight(height);
  };
  const handlePageWidthChanged = (width) => {
    setPageWidth(width);
  };
  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };
  const handlePagesRotationChanged = (rotations) => {
    setPagesRotation(rotations);
  };
  const handleRotatedPage = (rotatedPage2) => {
    setRotatedPage(rotatedPage2);
  };
  const handleViewModeChanged = (viewMode2) => {
    setViewMode(viewMode2);
  };
  const jump = (pageIndex) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(pageIndex);
    }
  };
  const rotatePage = (pageIndex, direction) => {
    store.get("rotatePage")(pageIndex, direction);
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    store.subscribe("pageHeight", handlePageHeightChanged);
    store.subscribe("pageWidth", handlePageWidthChanged);
    store.subscribe("rotatedPage", handleRotatedPage);
    store.subscribe("rotation", handleRotationChanged);
    store.subscribe("pagesRotation", handlePagesRotationChanged);
    store.subscribe("viewMode", handleViewModeChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
      store.unsubscribe("pageHeight", handlePageHeightChanged);
      store.unsubscribe("pageWidth", handlePageWidthChanged);
      store.unsubscribe("rotatedPage", handleRotatedPage);
      store.unsubscribe("rotation", handleRotationChanged);
      store.unsubscribe("pagesRotation", handlePagesRotationChanged);
      store.unsubscribe("viewMode", handleViewModeChanged);
    };
  }, []);
  core.useIsomorphicLayoutEffect(() => {
    store.subscribe("currentPage", handleCurrentPageChanged);
    return () => {
      store.unsubscribe("currentPage", handleCurrentPageChanged);
    };
  }, []);
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(
    core.LazyRender,
    {
      testId: "thumbnail__list-container",
      attrs: {
        className: styles.container
      }
    },
    /* @__PURE__ */ React__namespace.createElement(FetchLabels, { doc: currentDoc }, (labels) => /* @__PURE__ */ React__namespace.createElement(
      ThumbnailList,
      {
        currentPage,
        doc: currentDoc,
        labels,
        pagesRotation,
        pageHeight,
        pageWidth,
        renderCurrentPageLabel,
        renderThumbnailItem,
        rotatedPage,
        rotation,
        thumbnailDirection,
        thumbnailWidth,
        viewMode,
        onJumpToPage: jump,
        onRotatePage: rotatePage
      }
    ))
  ) : /* @__PURE__ */ React__namespace.createElement("div", { "data-testid": "thumbnail-list__loader", className: styles.loader }, React__namespace.useContext(SpinnerContext).renderSpinner());
};

const thumbnailPlugin = (pluginProps) => {
  const store = React__namespace.useMemo(
    () => core.createStore({
      rotatePage: () => {
      },
      viewMode: core.ViewMode.SinglePage
    }),
    []
  );
  const [docId, setDocId] = React__namespace.useState("");
  const CoverDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(Cover, { ...props, renderSpinner: pluginProps?.renderSpinner, store });
  const ThumbnailsDecorator = React__namespace.useCallback(
    (props) => /* @__PURE__ */ React__namespace.createElement(SpinnerContext.Provider, { value: { renderSpinner: pluginProps?.renderSpinner || defaultSpinner } }, /* @__PURE__ */ React__namespace.createElement(
      ThumbnailListWithStore,
      {
        renderCurrentPageLabel: pluginProps?.renderCurrentPageLabel,
        renderThumbnailItem: props?.renderThumbnailItem,
        store,
        thumbnailDirection: props?.thumbnailDirection || ThumbnailDirection.Vertical,
        thumbnailWidth: pluginProps?.thumbnailWidth || 100
      }
    )),
    [docId]
  );
  return {
    install: (pluginFunctions) => {
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("rotatePage", pluginFunctions.rotatePage);
    },
    onDocumentLoad: (props) => {
      setDocId(props.doc.loadingTask.docId);
      store.update("doc", props.doc);
    },
    onViewerStateChange: (viewerState) => {
      store.update("currentPage", viewerState.pageIndex);
      store.update("pagesRotation", viewerState.pagesRotation);
      store.update("pageHeight", viewerState.pageHeight);
      store.update("pageWidth", viewerState.pageWidth);
      store.update("rotation", viewerState.rotation);
      store.update("rotatedPage", viewerState.rotatedPage);
      store.update("viewMode", viewerState.viewMode);
      return viewerState;
    },
    Cover: CoverDecorator,
    Thumbnails: ThumbnailsDecorator
  };
};

exports.ThumbnailDirection = ThumbnailDirection;
exports.thumbnailPlugin = thumbnailPlugin;

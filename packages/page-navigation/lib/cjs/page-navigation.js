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

const DownArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552
            c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11
            C1.96,3.016,2.138,2.966,2.32,2.966z`
  }
));

const NextIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043
            L23.541,5.627`
  }
));

const PreviousIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8
            L0.535,18.373`
  }
));

const UpArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M21.783,21.034H2.332c-0.552,0-1-0.448-1-1c0-0.182,0.05-0.361,0.144-0.517L11.2,3.448
            c0.286-0.472,0.901-0.624,1.373-0.338c0.138,0.084,0.254,0.2,0.338,0.338l9.726,16.069c0.286,0.473,0.134,1.087-0.339,1.373
            C22.143,20.984,21.965,21.034,21.783,21.034z`
  }
));

var styles = {"container":"rpv_638e1576"};

const useCurrentPage = (store) => {
  const [currentPage, setCurrentPage] = React__namespace.useState(store.get("currentPage") || 0);
  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };
  core.useIsomorphicLayoutEffect(() => {
    store.subscribe("currentPage", handleCurrentPageChanged);
    return () => {
      store.unsubscribe("currentPage", handleCurrentPageChanged);
    };
  }, []);
  return { currentPage };
};

const useNumberOfPages = (store) => {
  const [numberOfPages, setNumberOfPages] = React__namespace.useState(store.get("numberOfPages") || 0);
  const handleNumberOfPages = (total) => {
    setNumberOfPages(total);
  };
  React__namespace.useEffect(() => {
    store.subscribe("numberOfPages", handleNumberOfPages);
    return () => {
      store.unsubscribe("numberOfPages", handleNumberOfPages);
    };
  }, []);
  return { numberOfPages };
};

const CurrentPageInput = ({ store }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const [editingPage, setEditingPage] = React__namespace.useState("1");
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  React__namespace.useEffect(() => setEditingPage(`${currentPage + 1}`), [currentPage]);
  const gotoNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < numberOfPages) {
      setEditingPage(`${nextPage + 1}`);
      jumpTo(nextPage);
    }
  };
  const gotoPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 0) {
      setEditingPage(`${previousPage + 1}`);
      jumpTo(previousPage);
    }
  };
  const jumpTo = (page) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(page);
    }
  };
  const jump = () => {
    const newPage = parseInt(editingPage, 10);
    editingPage === "" || newPage < 1 || newPage > numberOfPages ? setEditingPage(`${currentPage + 1}`) : jumpTo(newPage - 1);
  };
  const keydownPage = (e) => {
    switch (e.key) {
      // Up key is pressed
      case "ArrowUp":
        gotoPreviousPage();
        break;
      // Down key
      case "ArrowDown":
        gotoNextPage();
        break;
      // Enter key
      case "Enter":
        jump();
        break;
    }
  };
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.enterPageNumber : "Enter a page number";
  return /* @__PURE__ */ React__namespace.createElement("span", { className: styles.container }, /* @__PURE__ */ React__namespace.createElement(
    core.TextBox,
    {
      ariaLabel: label,
      testId: "page-navigation__current-page-input",
      type: "text",
      value: editingPage,
      onChange: setEditingPage,
      onKeyDown: keydownPage
    }
  ));
};

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
  return currentDoc;
};

const CurrentPageLabel = ({ children, store }) => {
  const currentDoc = useDocument(store);
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, props.currentPage + 1);
  const render = children || defaultChildren;
  return currentDoc ? /* @__PURE__ */ React__namespace.createElement(FetchLabels, { doc: currentDoc }, (labels) => {
    const pageLabel = labels.length === numberOfPages && numberOfPages > 0 ? labels[currentPage] : "";
    return render({
      currentPage,
      numberOfPages,
      pageLabel
    });
  }) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const GoToFirstPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToFirstPage : "First page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "page-navigation-first",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__first-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(UpArrowIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToFirstPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const goToFirstPage = () => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(0);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage === 0,
    onClick: goToFirstPage
  });
};

const GoToFirstPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToFirstPage : "First page";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(UpArrowIcon, null), isDisabled, testId: "page-navigation__first-menu", onClick }, label);
};

const GoToLastPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToLastPage : "Last page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "page-navigation-last",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__last-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToLastPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const goToLastPage = () => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(numberOfPages - 1);
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage + 1 >= numberOfPages,
    onClick: goToLastPage
  });
};

const GoToLastPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToLastPage : "Last page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null),
      isDisabled,
      testId: "page-navigation__last-menu",
      onClick
    },
    label
  );
};

const GoToNextPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToNextPage : "Next page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "page-navigation-next",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__next-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(NextIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToNextPage = ({ children, store }) => {
  const { currentPage } = useCurrentPage(store);
  const { numberOfPages } = useNumberOfPages(store);
  const goToNextPage = () => {
    const jumpToNextPage = store.get("jumpToNextPage");
    if (jumpToNextPage) {
      jumpToNextPage();
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageButton, { onClick: props.onClick, isDisabled: props.isDisabled });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage + 1 >= numberOfPages,
    onClick: goToNextPage
  });
};

const GoToNextPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToNextPage : "Next page";
  return /* @__PURE__ */ React__namespace.createElement(core.MenuItem, { icon: /* @__PURE__ */ React__namespace.createElement(NextIcon, null), isDisabled, testId: "page-navigation__next-menu", onClick }, label);
};

const GoToPreviousPageButton = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToPreviousPage : "Previous page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "page-navigation-previous",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: label,
          isDisabled,
          testId: "page-navigation__previous-button",
          onClick
        },
        /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null)
      ),
      content: () => label
    }
  );
};

const GoToPreviousPage = ({ store, children }) => {
  const { currentPage } = useCurrentPage(store);
  const goToPreviousPage = () => {
    const jumpToPreviousPage = store.get("jumpToPreviousPage");
    if (jumpToPreviousPage) {
      jumpToPreviousPage();
    }
  };
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageButton, { isDisabled: props.isDisabled, onClick: props.onClick });
  const render = children || defaultChildren;
  return render({
    isDisabled: currentPage <= 0,
    onClick: goToPreviousPage
  });
};

const GoToPreviousPageMenuItem = ({ isDisabled, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.pageNavigation ? l10n.pageNavigation.goToPreviousPage : "Previous page";
  return /* @__PURE__ */ React__namespace.createElement(
    core.MenuItem,
    {
      icon: /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null),
      isDisabled,
      testId: "page-navigation__previous-menu",
      onClick
    },
    label
  );
};

const NumberOfPages = ({ children, store }) => {
  const { numberOfPages } = useNumberOfPages(store);
  return children ? children({ numberOfPages }) : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, numberOfPages);
};

const ShortcutHandler = ({ containerRef, numPages, store }) => {
  const { currentPage } = useCurrentPage(store);
  const currentPageRef = React__namespace.useRef(currentPage);
  currentPageRef.current = currentPage;
  const isMouseInsideRef = React__namespace.useRef(false);
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };
  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
  };
  const goToNextPage = () => {
    const jumpToPage = store.get("jumpToPage");
    const targetPage = currentPageRef.current + 1;
    if (jumpToPage && targetPage < numPages) {
      jumpToPage(targetPage);
    }
  };
  const goToPreviousPage = () => {
    const jumpToPage = store.get("jumpToPage");
    const targetPage = currentPageRef.current - 1;
    if (jumpToPage && targetPage >= 0) {
      jumpToPage(targetPage);
    }
  };
  const jumpToNextDestination = () => {
    const jumpToNextDestination2 = store.get("jumpToNextDestination");
    if (jumpToNextDestination2) {
      jumpToNextDestination2();
    }
  };
  const jumpToPreviousDestination = () => {
    const jumpToPreviousDestination2 = store.get("jumpToPreviousDestination");
    if (jumpToPreviousDestination2) {
      jumpToPreviousDestination2();
    }
  };
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element) {
        return;
      }
      const shouldHandleShortcuts = isMouseInsideRef.current || document.activeElement && element.contains(document.activeElement);
      if (!shouldHandleShortcuts) {
        return;
      }
      const shouldGoToNextPage = e.altKey && e.key === "ArrowDown" || !e.shiftKey && !e.altKey && e.key === "PageDown";
      const shouldGoToPreviousPage = e.altKey && e.key === "ArrowUp" || !e.shiftKey && !e.altKey && e.key === "PageUp";
      if (shouldGoToNextPage) {
        e.preventDefault();
        goToNextPage();
        return;
      }
      if (shouldGoToPreviousPage) {
        e.preventDefault();
        goToPreviousPage();
        return;
      }
      const isCommandPressed = core.isMac() ? e.metaKey && !e.ctrlKey : e.altKey;
      if (isCommandPressed) {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            jumpToPreviousDestination();
            break;
          case "ArrowRight":
            e.preventDefault();
            jumpToNextDestination();
            break;
        }
      }
    },
    [element]
  );
  React__namespace.useEffect(() => {
    if (!element) {
      return;
    }
    document.addEventListener("keydown", handleDocumentKeyDown);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [element]);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const pageNavigationPlugin = (props) => {
  const pageNavigationPluginProps = React__namespace.useMemo(() => Object.assign({}, { enableShortcuts: true }, props), []);
  const store = React__namespace.useMemo(() => core.createStore(), []);
  const CurrentPageInputDecorator = () => /* @__PURE__ */ React__namespace.createElement(CurrentPageInput, { store });
  const CurrentPageLabelDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(CurrentPageLabel, { ...props2, store });
  const GoToFirstPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPage, { ...props2, store });
  const GoToFirstPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageButton, { ...props2 }));
  const GoToFirstPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToFirstPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToFirstPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToLastPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPage, { ...props2, store });
  const GoToLastPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToLastPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageButton, { ...props2 }));
  const GoToLastPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToLastPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToLastPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToNextPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPage, { ...props2, store });
  const GoToNextPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToNextPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageButton, { ...props2 }));
  const GoToNextPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToNextPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToNextPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const GoToPreviousPageDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPage, { ...props2, store });
  const GoToPreviousPageButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageButton, { ...props2 }));
  const GoToPreviousPageMenuItemDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(GoToPreviousPageDecorator, null, (p) => /* @__PURE__ */ React__namespace.createElement(
    GoToPreviousPageMenuItem,
    {
      isDisabled: p.isDisabled,
      onClick: () => {
        p.onClick();
        props2.onClick();
      }
    }
  ));
  const NumberOfPagesDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(NumberOfPages, { ...props2, store });
  const renderViewer = (props2) => {
    const { slot } = props2;
    if (!pageNavigationPluginProps.enableShortcuts) {
      return slot;
    }
    const updateSlot = {
      children: /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: props2.containerRef, numPages: props2.doc.numPages, store }), slot.children)
    };
    return { ...slot, ...updateSlot };
  };
  return {
    install: (pluginFunctions) => {
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
      store.update("jumpToNextDestination", pluginFunctions.jumpToNextDestination);
      store.update("jumpToNextPage", pluginFunctions.jumpToNextPage);
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("jumpToPreviousDestination", pluginFunctions.jumpToPreviousDestination);
      store.update("jumpToPreviousPage", pluginFunctions.jumpToPreviousPage);
    },
    renderViewer,
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
      store.update("numberOfPages", props2.doc.numPages);
    },
    onViewerStateChange: (viewerState) => {
      store.update("currentPage", viewerState.pageIndex);
      return viewerState;
    },
    jumpToNextPage: () => {
      const jump = store.get("jumpToNextPage");
      if (jump) {
        jump();
      }
    },
    jumpToPage: (pageIndex) => {
      const jumpTo = store.get("jumpToPage");
      if (jumpTo) {
        jumpTo(pageIndex);
      }
    },
    jumpToPreviousPage: () => {
      const jump = store.get("jumpToPreviousPage");
      if (jump) {
        jump();
      }
    },
    CurrentPageInput: CurrentPageInputDecorator,
    CurrentPageLabel: CurrentPageLabelDecorator,
    GoToFirstPage: GoToFirstPageDecorator,
    GoToFirstPageButton: GoToFirstPageButtonDecorator,
    GoToFirstPageMenuItem: GoToFirstPageMenuItemDecorator,
    GoToLastPage: GoToLastPageDecorator,
    GoToLastPageButton: GoToLastPageButtonDecorator,
    GoToLastPageMenuItem: GoToLastPageMenuItemDecorator,
    GoToNextPage: GoToNextPageDecorator,
    GoToNextPageButton: GoToNextPageButtonDecorator,
    GoToNextPageMenuItem: GoToNextPageMenuItemDecorator,
    GoToPreviousPage: GoToPreviousPageDecorator,
    GoToPreviousPageButton: GoToPreviousPageButtonDecorator,
    GoToPreviousPageMenuItem: GoToPreviousPageMenuItemDecorator,
    NumberOfPages: NumberOfPagesDecorator
  };
};

exports.DownArrowIcon = DownArrowIcon;
exports.NextIcon = NextIcon;
exports.PreviousIcon = PreviousIcon;
exports.UpArrowIcon = UpArrowIcon;
exports.pageNavigationPlugin = pageNavigationPlugin;

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

const DownArrowIcon = () => {
  return /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M6.427,8.245A.5.5,0,0,1,6.862,7.5H17.138a.5.5,0,0,1,.435.749l-5.139,9a.5.5,0,0,1-.868,0Z" }));
};

const RightArrowIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M9.248,17.572a.5.5,0,0,1-.748-.434V6.862a.5.5,0,0,1,.748-.434l8.992,5.138a.5.5,0,0,1,0,.868Z" }));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const shouldBeCollapsed = (bookmark) => {
  const { count, items } = bookmark;
  if (count === void 0) {
    return false;
  }
  if (count >= 0) {
    return false;
  }
  let numSubItems = items.length;
  if (numSubItems === 0) {
    return false;
  }
  let subItems = items.concat([]);
  while (subItems.length > 0) {
    const firstChild = subItems.shift();
    const children = firstChild.items;
    if (firstChild.count && children && firstChild.count > 0 && children.length > 0) {
      numSubItems += children.length;
      subItems = subItems.concat(children);
    }
  }
  return Math.abs(count) === numSubItems;
};

var styles$3 = {"item":"rpv_62cd0cf7","toggle":"rpv_f63d6438","title":"rpv_f76accf4"};

const useCollapse = (onToggle) => {
  const [node, setNode] = React__namespace.useState(null);
  const ref = React__namespace.useCallback((ele) => {
    setNode(ele);
  }, []);
  const collapse = React__namespace.useCallback(() => {
    if (!node) {
      return;
    }
    node.style.overflow = "hidden";
    node.style.height = `${node.getBoundingClientRect().height}px`;
    const collapsingAnimation = node.animate(
      [
        {
          height: `${node.scrollHeight}px`
        },
        {
          height: "0px"
        }
      ],
      {
        duration: 150
      }
    );
    collapsingAnimation.finished.then(() => {
      node.style.display = "none";
      node.style.overflow = "";
      onToggle();
    });
  }, [node]);
  const expand = React__namespace.useCallback(() => {
    if (!node) {
      return;
    }
    node.style.display = "";
    node.style.overflow = "hidden";
    node.style.height = `${node.getBoundingClientRect().height}px`;
    const expandingAnimation = node.animate(
      [
        {
          height: "0px"
        },
        {
          height: `${node.scrollHeight}px`
        }
      ],
      {
        duration: 150
      }
    );
    expandingAnimation.finished.then(() => {
      node.style.height = "";
      node.style.overflow = "";
      onToggle();
    });
  }, [node]);
  return [ref, collapse, expand];
};

const BookmarkItem = ({
  bookmark,
  depth,
  doc,
  index,
  isBookmarkExpanded,
  numberOfSiblings,
  pathFromRoot,
  renderBookmarkItem,
  store
}) => {
  const path = pathFromRoot ? `${pathFromRoot}.${index}` : `${index}`;
  const defaultIsCollapsed = React__namespace.useMemo(() => shouldBeCollapsed(bookmark), [bookmark]);
  const bookmarkExpandedMap = store.get("bookmarkExpandedMap");
  const defaultExpanded = isBookmarkExpanded ? isBookmarkExpanded({ bookmark, doc, depth, index }) : bookmarkExpandedMap && bookmarkExpandedMap.has(path) ? bookmarkExpandedMap.get(path) : !defaultIsCollapsed;
  const [expanded, setExpanded] = React__namespace.useState(defaultExpanded);
  const toggle = () => setExpanded((v) => !v);
  const [subItemsListRef, collapseSubItems, expandSubItems] = useCollapse(toggle);
  const hasSubItems = bookmark.items && bookmark.items.length > 0;
  const toggleSubItems = () => {
    store.updateCurrentValue("bookmarkExpandedMap", (currentValue) => currentValue.set(path, !expanded));
    expanded ? collapseSubItems() : expandSubItems();
  };
  const jumpToDest = () => {
    const { dest } = bookmark;
    if (!dest) {
      return;
    }
    const jumpToDestination = store.get("jumpToDestination");
    core.getDestination(doc, dest).then((target) => {
      if (jumpToDestination) {
        jumpToDestination({
          label: bookmark.title,
          ...target
        });
      }
    });
  };
  const clickBookmark = () => {
    if (hasSubItems && bookmark.dest) {
      jumpToDest();
    }
  };
  const clickItem = () => {
    if (!hasSubItems && bookmark.dest) {
      jumpToDest();
    }
  };
  const defaultRenderItem = (onClickItem, children) => /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$3.item,
      style: {
        paddingLeft: `${depth * 1.25}rem`
      },
      onClick: onClickItem
    },
    children
  );
  const defaultRenderToggle = (expandIcon, collapseIcon) => hasSubItems ? /* @__PURE__ */ React__namespace.createElement("span", { className: styles$3.toggle, "data-testid": `bookmark__toggle-${depth}-${index}`, onClick: toggleSubItems }, expanded ? expandIcon : collapseIcon) : /* @__PURE__ */ React__namespace.createElement("span", { className: styles$3.toggle });
  const defaultRenderTitle = (onClickBookmark) => bookmark.url ? /* @__PURE__ */ React__namespace.createElement(
    "a",
    {
      className: styles$3.title,
      href: bookmark.url,
      rel: "noopener noreferrer nofollow",
      target: bookmark.newWindow ? "_blank" : ""
    },
    bookmark.title
  ) : /* @__PURE__ */ React__namespace.createElement("div", { className: styles$3.title, "aria-label": bookmark.title, onClick: onClickBookmark }, bookmark.title);
  return /* @__PURE__ */ React__namespace.createElement(
    "li",
    {
      "aria-expanded": expanded ? "true" : "false",
      "aria-label": bookmark.title,
      "aria-level": depth + 1,
      "aria-posinset": index + 1,
      "aria-setsize": numberOfSiblings,
      role: "treeitem",
      tabIndex: -1
    },
    renderBookmarkItem ? renderBookmarkItem({
      bookmark,
      depth,
      hasSubItems,
      index,
      isExpanded: expanded,
      path,
      defaultRenderItem,
      defaultRenderTitle,
      defaultRenderToggle,
      onClickItem: clickItem,
      onClickTitle: clickBookmark,
      onToggleSubItems: toggleSubItems
    }) : defaultRenderItem(
      clickItem,
      /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, defaultRenderToggle(/* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null), /* @__PURE__ */ React__namespace.createElement(RightArrowIcon, null)), defaultRenderTitle(clickBookmark))
    ),
    hasSubItems && /* @__PURE__ */ React__namespace.createElement(
      BookmarkList,
      {
        bookmarks: bookmark.items,
        depth: depth + 1,
        doc,
        isBookmarkExpanded,
        isRoot: false,
        pathFromRoot: path,
        ref: subItemsListRef,
        renderBookmarkItem,
        store
      }
    )
  );
};

var styles$2 = {"list":"rpv_9977cbd7"};

const BookmarkList = React__namespace.forwardRef(
  ({ bookmarks, depth = 0, doc, isBookmarkExpanded, isRoot, pathFromRoot, renderBookmarkItem, store }, ref) => /* @__PURE__ */ React__namespace.createElement(
    "ul",
    {
      className: styles$2.list,
      ref,
      role: isRoot ? "tree" : "group",
      style: {
        display: isRoot ? "block" : "none"
      },
      tabIndex: -1
    },
    bookmarks.map((bookmark, index) => /* @__PURE__ */ React__namespace.createElement(
      BookmarkItem,
      {
        bookmark,
        depth,
        doc,
        index,
        isBookmarkExpanded,
        key: index,
        numberOfSiblings: bookmarks.length,
        pathFromRoot,
        renderBookmarkItem,
        store
      }
    ))
  )
);
BookmarkList.displayName = "BookmarkList";

const BookmarkListRoot = ({ bookmarks, doc, isBookmarkExpanded, renderBookmarkItem, store }) => {
  const containerRef = React__namespace.useRef(null);
  const handleKeyDown = (e) => {
    const container = containerRef.current;
    if (!container || !(e.target instanceof HTMLElement) || !container.contains(e.target)) {
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveToItem((bookmarkElements, activeEle) => bookmarkElements.indexOf(activeEle) + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        toggle(0 /* Collapse */);
        break;
      case "ArrowRight":
        e.preventDefault();
        toggle(1 /* Expand */);
        break;
      case "ArrowUp":
        e.preventDefault;
        moveToItem((bookmarkElements, activeEle) => bookmarkElements.indexOf(activeEle) - 1);
        break;
      case "End":
        e.preventDefault();
        moveToItem((bookmarkElements, _) => bookmarkElements.length - 1);
        break;
      case " ":
      case "Enter":
      case "Space":
        e.preventDefault();
        clickBookmark();
        break;
      case "Home":
        e.preventDefault();
        moveToItem((_, __) => 0);
        break;
    }
  };
  const clickBookmark = () => {
    const closestItem = document.activeElement?.closest(`.${styles$3.item}`);
    const titleEle = closestItem?.querySelector(`.${styles$3.title}`);
    if (titleEle) {
      titleEle.click();
    }
  };
  const moveToItem = (getItemIndex) => {
    const container = containerRef.current;
    const bookmarkElements = [].slice.call(container?.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length === 0) {
      return;
    }
    const activeEle = document.activeElement;
    const targetIndex = Math.min(
      bookmarkElements.length - 1,
      Math.max(0, getItemIndex(bookmarkElements, activeEle))
    );
    const targetEle = bookmarkElements[targetIndex];
    activeEle.setAttribute("tabindex", "-1");
    targetEle.setAttribute("tabindex", "0");
    targetEle.focus();
  };
  const toggle = (toggle2) => {
    const container = containerRef.current;
    const bookmarkElements = [].slice.call(container?.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length === 0) {
      return;
    }
    const closestItem = document.activeElement?.closest(`.${styles$3.item}`);
    const expanedAttribute = toggle2 === 0 /* Collapse */ ? "true" : "false";
    if (closestItem && closestItem.parentElement?.getAttribute("aria-expanded") === expanedAttribute) {
      const toggleEle = closestItem.querySelector(`.${styles$3.toggle}`);
      if (toggleEle) {
        toggleEle.click();
      }
    }
  };
  React__namespace.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  React__namespace.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const bookmarkElements = [].slice.call(container.getElementsByClassName(styles$3.item));
    if (bookmarkElements.length > 0) {
      bookmarkElements[0].focus();
      bookmarkElements[0].setAttribute("tabindex", "0");
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef }, /* @__PURE__ */ React__namespace.createElement(
    BookmarkList,
    {
      bookmarks,
      depth: 0,
      doc,
      isBookmarkExpanded,
      isRoot: true,
      pathFromRoot: "",
      renderBookmarkItem,
      store
    }
  ));
};

var styles$1 = {"list":"rpv_ebc43488","item":"rpv_ebc2fefd","toggle":"rpv_197eecbe","title":"rpv_8d331bae"};

const BookmarkItemSkeleton = ({ depth = 0, icon }) => {
  const width = React__namespace.useMemo(() => 10 * core.randomNumber(4, 8), []);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.item, style: { paddingLeft: `${depth * 1.25}rem` } }, /* @__PURE__ */ React__namespace.createElement("span", { className: styles$1.toggle }, icon ? icon : /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null)), /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.title }, /* @__PURE__ */ React__namespace.createElement(core.Skeleton, null, ({ attributes, ref }) => /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      ref,
      ...attributes,
      style: {
        borderRadius: "calc(var(--rpv-radius) - 4px)",
        height: "1rem",
        width: `${width}%`
      }
    }
  ))));
};

const BookmarkSkeleton = () => /* @__PURE__ */ React__namespace.createElement("ul", { className: styles$1.list }, /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, null)), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { icon: /* @__PURE__ */ React__namespace.createElement(DownArrowIcon, null) }), /* @__PURE__ */ React__namespace.createElement("ul", { className: styles$1.list }, /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { depth: 1 })))), /* @__PURE__ */ React__namespace.createElement("li", null, /* @__PURE__ */ React__namespace.createElement(BookmarkItemSkeleton, { icon: /* @__PURE__ */ React__namespace.createElement(RightArrowIcon, null) })));

var styles = {"empty":"rpv_151ef427","emptyRtl":"rpv_dd1f88c3","container":"rpv_2f6be5b","containerRtl":"rpv_e7d3220f"};

const BookmarkLoader = ({ doc, isBookmarkExpanded, renderBookmarkItem, store }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const [bookmarks, setBookmarks] = React__namespace.useState({
    isLoaded: false,
    items: []
  });
  React__namespace.useEffect(() => {
    if (!doc) {
      return;
    }
    setBookmarks({
      isLoaded: false,
      items: []
    });
    doc.getOutline().then((outline) => {
      setBookmarks({
        isLoaded: true,
        items: outline || []
      });
    });
  }, [doc]);
  return !doc || !bookmarks.isLoaded ? /* @__PURE__ */ React__namespace.createElement(BookmarkSkeleton, null) : bookmarks.items.length === 0 ? /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "bookmark__empty",
      className: core.classNames({
        [styles.empty]: true,
        [styles.emptyRtl]: isRtl
      })
    },
    l10n && l10n.bookmark ? l10n.bookmark.noBookmark : "There is no bookmark"
  ) : /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      "data-testid": "bookmark__container",
      className: core.classNames({
        [styles.container]: true,
        [styles.containerRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(
      BookmarkListRoot,
      {
        bookmarks: bookmarks.items,
        doc,
        isBookmarkExpanded,
        renderBookmarkItem,
        store
      }
    )
  );
};

const BookmarkListWithStore = ({ isBookmarkExpanded, renderBookmarkItem, store }) => {
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
  return /* @__PURE__ */ React__namespace.createElement(
    BookmarkLoader,
    {
      doc: currentDoc,
      isBookmarkExpanded,
      renderBookmarkItem,
      store
    }
  );
};

const bookmarkPlugin = () => {
  const store = React__namespace.useMemo(
    () => core.createStore({
      bookmarkExpandedMap: /* @__PURE__ */ new Map()
    }),
    []
  );
  const BookmarksDecorator = (props) => /* @__PURE__ */ React__namespace.createElement(
    BookmarkListWithStore,
    {
      isBookmarkExpanded: props?.isBookmarkExpanded,
      renderBookmarkItem: props?.renderBookmarkItem,
      store
    }
  );
  return {
    install: (pluginFunctions) => {
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
    },
    onDocumentLoad: (props) => {
      store.update("doc", props.doc);
    },
    Bookmarks: BookmarksDecorator
  };
};

exports.DownArrowIcon = DownArrowIcon;
exports.RightArrowIcon = RightArrowIcon;
exports.bookmarkPlugin = bookmarkPlugin;

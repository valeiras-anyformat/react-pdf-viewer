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

const SearchIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { ignoreDirection: true, size: 16 }, /* @__PURE__ */ React__namespace.createElement(
  "path",
  {
    d: `M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z
            M23.5,23.5
            l-5.929-5.929`
  }
));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getCssProperties = (area) => {
  return {
    left: `${area.left}%`,
    top: `${area.top}%`,
    height: `${area.height}%`,
    width: `${area.width}%`
  };
};

var styles$1 = {"highlights":"rpv_5852b0f8","highlight":"rpv_a802aadb","highlightCurrent":"rpv_bd8fce1e"};

const HightlightItem = ({ index, area, onHighlightKeyword }) => {
  const containerRef = React__namespace.useRef(null);
  core.useIsomorphicLayoutEffect(() => {
    const highlightEle = containerRef.current;
    if (onHighlightKeyword && highlightEle) {
      onHighlightKeyword({
        highlightEle,
        keyword: area.keyword
      });
    }
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: styles$1.highlight,
      "data-index": index,
      ref: containerRef,
      style: getCssProperties(area),
      title: area.keywordStr.trim()
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
const calculateOffset = (children, parent) => {
  let top = children.offsetTop;
  let left = children.offsetLeft;
  let p = children.parentElement;
  while (p && p !== parent) {
    top += p.offsetTop;
    left += p.offsetLeft;
    p = p.parentElement;
  }
  return {
    left,
    top
  };
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const EMPTY_KEYWORD_REGEXP = {
  keyword: "",
  regExp: new RegExp(" "),
  wholeWords: false
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const removeNode = (ele) => {
  const parent = ele.parentNode;
  if (parent) {
    parent.removeChild(ele);
  }
};
const replaceNode = (replacementNode, node) => {
  removeNode(replacementNode);
  const parent = node.parentNode;
  if (parent) {
    parent.insertBefore(replacementNode, node);
  }
  removeNode(node);
};
const unwrap = (ele) => {
  const parent = ele.parentNode;
  if (!parent) {
    return;
  }
  const range = document.createRange();
  range.selectNodeContents(ele);
  replaceNode(range.extractContents(), ele);
  parent.normalize();
};

const sortHighlightPosition = (a, b) => {
  if (a.top < b.top) {
    return -1;
  }
  if (a.top > b.top) {
    return 1;
  }
  if (a.left < b.left) {
    return -1;
  }
  if (a.left > b.left) {
    return 1;
  }
  return 0;
};
const Highlights = ({ numPages, pageIndex, renderHighlights, store, onHighlightKeyword }) => {
  const containerRef = React__namespace.useRef(null);
  const defaultRenderHighlights = React__namespace.useCallback(
    (renderProps) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, renderProps.highlightAreas.map((area, index) => /* @__PURE__ */ React__namespace.createElement(HightlightItem, { index, key: index, area, onHighlightKeyword }))),
    []
  );
  const renderHighlightElements = renderHighlights || defaultRenderHighlights;
  const [matchPosition, setMatchPosition] = React__namespace.useState(store.get("matchPosition"));
  const [keywordRegexp, setKeywordRegexp] = React__namespace.useState(
    store.get("keyword") || [EMPTY_KEYWORD_REGEXP]
  );
  const [renderStatus, setRenderStatus] = React__namespace.useState({
    pageIndex,
    scale: 1,
    status: core.LayerRenderStatus.PreRender
  });
  const currentMatchRef = React__namespace.useRef(null);
  const characterIndexesRef = React__namespace.useRef([]);
  const [highlightAreas, setHighlightAreas] = React__namespace.useState([]);
  const defaultTargetPageFilter = () => true;
  const targetPageFilter = React__namespace.useCallback(
    () => store.get("targetPageFilter") || defaultTargetPageFilter,
    [store.get("targetPageFilter")]
  );
  const highlight = (keywordStr, keyword, textLayerEle, span, charIndexSpan) => {
    const range = document.createRange();
    const firstChild = span.firstChild;
    if (!firstChild || firstChild.nodeType !== Node.TEXT_NODE) {
      return null;
    }
    const length = firstChild.textContent.length;
    const startOffset = charIndexSpan[0].charIndexInSpan;
    const endOffset = charIndexSpan.length === 1 ? startOffset : charIndexSpan[charIndexSpan.length - 1].charIndexInSpan;
    if (startOffset > length || endOffset + 1 > length) {
      return null;
    }
    range.setStart(firstChild, startOffset);
    range.setEnd(firstChild, endOffset + 1);
    const wrapper = document.createElement("span");
    range.surroundContents(wrapper);
    const wrapperRect = wrapper.getBoundingClientRect();
    const textLayerRect = textLayerEle.getBoundingClientRect();
    const pageHeight = textLayerRect.height;
    const pageWidth = textLayerRect.width;
    const left = 100 * (wrapperRect.left - textLayerRect.left) / pageWidth;
    const top = 100 * (wrapperRect.top - textLayerRect.top) / pageHeight;
    const height = 100 * wrapperRect.height / pageHeight;
    const width = 100 * wrapperRect.width / pageWidth;
    unwrap(wrapper);
    return {
      keyword,
      keywordStr,
      numPages,
      pageIndex,
      left,
      top,
      height,
      width,
      pageHeight,
      pageWidth
    };
  };
  const highlightAll = (textLayerEle) => {
    const charIndexes = characterIndexesRef.current;
    if (charIndexes.length === 0) {
      return [];
    }
    const highlightPos = [];
    const spans = [].slice.call(textLayerEle.querySelectorAll('[data-text="true"]'));
    const fullText = charIndexes.map((item) => item.char).join("");
    keywordRegexp.forEach((keyword) => {
      const keywordStr = keyword.keyword;
      if (!keywordStr.trim()) {
        return;
      }
      const cloneKeyword = keyword.regExp.flags.indexOf("g") === -1 ? new RegExp(keyword.regExp, `${keyword.regExp.flags}g`) : keyword.regExp;
      let match;
      const matches = [];
      while ((match = cloneKeyword.exec(fullText)) !== null) {
        matches.push({
          keyword: cloneKeyword,
          startIndex: match.index,
          endIndex: cloneKeyword.lastIndex
        });
      }
      matches.map((item) => ({
        keyword: item.keyword,
        indexes: charIndexes.slice(item.startIndex, item.endIndex)
      })).forEach((item) => {
        const spanIndexes = item.indexes.reduce(
          (acc, item2) => {
            acc[item2.spanIndex] = (acc[item2.spanIndex] || []).concat([item2]);
            return acc;
          },
          {}
        );
        Object.values(spanIndexes).forEach((charIndexSpan) => {
          if (charIndexSpan.length !== 1 || charIndexSpan[0].char.trim() !== "") {
            const normalizedCharSpan = keyword.wholeWords ? charIndexSpan.slice(1, -1) : charIndexSpan;
            const hightlighPosition = highlight(
              keywordStr,
              item.keyword,
              textLayerEle,
              spans[normalizedCharSpan[0].spanIndex],
              normalizedCharSpan
            );
            if (hightlighPosition) {
              highlightPos.push(hightlighPosition);
            }
          }
        });
      });
    });
    return highlightPos.sort(sortHighlightPosition);
  };
  const handleKeywordChanged = (keyword) => {
    if (keyword && keyword.length > 0) {
      setKeywordRegexp(keyword);
    }
  };
  const handleMatchPositionChanged = (currentPosition) => setMatchPosition(currentPosition);
  const handleRenderStatusChanged = (status) => {
    if (!status.has(pageIndex)) {
      return;
    }
    const currentStatus = status.get(pageIndex);
    if (currentStatus) {
      setRenderStatus({
        ele: currentStatus.ele,
        pageIndex,
        scale: currentStatus.scale,
        status: currentStatus.status
      });
    }
  };
  const isEmptyKeyword = () => keywordRegexp.length === 0 || keywordRegexp.length === 1 && keywordRegexp[0].keyword.trim() === "";
  React__namespace.useEffect(() => {
    const textLayerEle = renderStatus.ele;
    if (isEmptyKeyword() || renderStatus.status !== core.LayerRenderStatus.DidRender || characterIndexesRef.current.length || !textLayerEle) {
      return;
    }
    const spans = [].slice.call(textLayerEle.querySelectorAll('[data-text="true"]'));
    const charIndexes = spans.map((span) => span.textContent).reduce(
      (prev, curr, index) => prev.concat(
        curr.split("").map((c, i) => ({
          char: c,
          charIndexInSpan: i,
          spanIndex: index
        }))
      ),
      [
        {
          char: "",
          charIndexInSpan: 0,
          spanIndex: 0
        }
      ]
    ).slice(1);
    characterIndexesRef.current = charIndexes;
  }, [keywordRegexp, renderStatus.status]);
  React__namespace.useEffect(() => {
    if (isEmptyKeyword() || !renderStatus.ele || renderStatus.status !== core.LayerRenderStatus.DidRender || !targetPageFilter()({ pageIndex, numPages })) {
      return;
    }
    const textLayerEle = renderStatus.ele;
    const highlightPos = highlightAll(textLayerEle);
    setHighlightAreas(highlightPos);
  }, [keywordRegexp, matchPosition, renderStatus.status, characterIndexesRef.current]);
  React__namespace.useEffect(() => {
    if (isEmptyKeyword() && renderStatus.ele && renderStatus.status === core.LayerRenderStatus.DidRender) {
      setHighlightAreas([]);
    }
  }, [keywordRegexp, renderStatus.status]);
  React__namespace.useEffect(() => {
    if (highlightAreas.length === 0) {
      return;
    }
    const container = containerRef.current;
    if (matchPosition.pageIndex !== pageIndex || !container || renderStatus.status !== core.LayerRenderStatus.DidRender) {
      return;
    }
    const highlightEle = container.querySelector(`.${styles$1.highlight}[data-index="${matchPosition.matchIndex}"]`);
    if (!highlightEle) {
      return;
    }
    const { left, top } = calculateOffset(highlightEle, container);
    const jump = store.get("jumpToDestination");
    if (jump) {
      jump({
        pageIndex,
        bottomOffset: (container.getBoundingClientRect().height - top) / renderStatus.scale,
        leftOffset: left / renderStatus.scale,
        scaleTo: renderStatus.scale
      });
      if (currentMatchRef.current) {
        currentMatchRef.current.classList.remove(styles$1.highlightCurrent);
      }
      currentMatchRef.current = highlightEle;
      highlightEle.classList.add(styles$1.highlightCurrent);
    }
  }, [highlightAreas, matchPosition]);
  React__namespace.useEffect(() => {
    store.subscribe("keyword", handleKeywordChanged);
    store.subscribe("matchPosition", handleMatchPositionChanged);
    store.subscribe("renderStatus", handleRenderStatusChanged);
    return () => {
      store.unsubscribe("keyword", handleKeywordChanged);
      store.unsubscribe("matchPosition", handleMatchPositionChanged);
      store.unsubscribe("renderStatus", handleRenderStatusChanged);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles$1.highlights, "data-testid": `search__highlights-${pageIndex}`, ref: containerRef }, renderHighlightElements({
    getCssProperties,
    highlightAreas
  }));
};

const escapeRegExp = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizeFlagKeyword = (flagKeyword) => {
  const source = flagKeyword.wholeWords ? ` ${flagKeyword.keyword} ` : flagKeyword.keyword;
  const flags = flagKeyword.matchCase ? "g" : "gi";
  return {
    keyword: flagKeyword.keyword,
    regExp: new RegExp(escapeRegExp(source), flags),
    wholeWords: flagKeyword.wholeWords || false
  };
};
const normalizeSingleKeyword = (keyword, matchCase, wholeWords) => {
  if (keyword instanceof RegExp) {
    return {
      keyword: keyword.source,
      regExp: keyword,
      wholeWords: wholeWords || false
    };
  }
  if (typeof keyword === "string") {
    return keyword === "" ? EMPTY_KEYWORD_REGEXP : normalizeFlagKeyword({
      keyword,
      matchCase: matchCase || false,
      wholeWords: wholeWords || false
    });
  }
  if (typeof matchCase !== "undefined") {
    keyword.matchCase = matchCase;
  }
  if (typeof wholeWords !== "undefined") {
    keyword.wholeWords = wholeWords;
  }
  return normalizeFlagKeyword(keyword);
};

const useDocument = (store) => {
  const currentDocRef = React__namespace.useRef(store.get("doc"));
  const handleDocumentChanged = (doc) => {
    currentDocRef.current = doc;
  };
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return currentDocRef;
};

const useSearch = (store) => {
  const initialKeyword = store.get("initialKeyword");
  const normalizedKeywordFlags = React__namespace.useMemo(() => {
    if (initialKeyword && initialKeyword.length === 1) {
      const normalizedKeyword = normalizeSingleKeyword(initialKeyword[0]);
      return {
        matchCase: normalizedKeyword.regExp.flags.indexOf("i") === -1,
        wholeWords: normalizedKeyword.wholeWords
      };
    } else {
      return {
        matchCase: false,
        wholeWords: false
      };
    }
  }, []);
  const currentDocRef = useDocument(store);
  const [keywords, setKeywords] = React__namespace.useState(initialKeyword);
  const [found, setFound] = React__namespace.useState([]);
  const [currentMatch, setCurrentMatch] = React__namespace.useState(0);
  const [matchCase, setMatchCase] = React__namespace.useState(normalizedKeywordFlags.matchCase);
  const textContents = React__namespace.useRef([]);
  const [wholeWords, setWholeWords] = React__namespace.useState(normalizedKeywordFlags.wholeWords);
  const defaultTargetPageFilter = () => true;
  const targetPageFilter = React__namespace.useCallback(
    () => store.get("targetPageFilter") || defaultTargetPageFilter,
    [store.get("targetPageFilter")]
  );
  const changeMatchCase = (isChecked) => {
    setMatchCase(isChecked);
    if (keywords.length > 0) {
      searchFor(keywords, isChecked, wholeWords);
    }
  };
  const changeWholeWords = (isChecked) => {
    setWholeWords(isChecked);
    if (keywords.length > 0) {
      searchFor(keywords, matchCase, isChecked);
    }
  };
  const jumpToMatch = (index) => {
    const numMatches = found.length;
    if (keywords.length === 0 || numMatches === 0) {
      return null;
    }
    const normalizedIndex = index === numMatches + 1 ? 1 : Math.max(1, Math.min(numMatches, index));
    setCurrentMatch(normalizedIndex);
    return jumpToGivenMatch(found[normalizedIndex - 1]);
  };
  const jumpToPreviousMatch = () => jumpToMatch(currentMatch - 1);
  const jumpToNextMatch = () => jumpToMatch(currentMatch + 1);
  const clearKeyword = () => {
    store.update("keyword", [EMPTY_KEYWORD_REGEXP]);
    setKeyword("");
    setCurrentMatch(0);
    setFound([]);
    setMatchCase(false);
    setWholeWords(false);
  };
  const search = () => searchFor(keywords, matchCase, wholeWords);
  const setKeyword = (keyword) => setKeywords(keyword === "" ? [] : [keyword]);
  const setTargetPages = (targetPageFilter2) => {
    store.update("targetPageFilter", targetPageFilter2);
  };
  const getTextContents = () => {
    const currentDoc = currentDocRef.current;
    if (!currentDoc) {
      return Promise.resolve([]);
    }
    const promises = Array(currentDoc.numPages).fill(0).map(
      (_, pageIndex) => core.getPage(currentDoc, pageIndex).then((page) => {
        return page.getTextContent();
      }).then((content) => {
        const pageContent = content.items.map((item) => item.str || "").join("");
        return Promise.resolve({
          pageContent,
          pageIndex
        });
      })
    );
    return Promise.all(promises).then((data) => {
      data.sort((a, b) => a.pageIndex - b.pageIndex);
      return Promise.resolve(data.map((item) => item.pageContent));
    });
  };
  const jumpToGivenMatch = (match) => {
    const jumpToPage = store.get("jumpToPage");
    if (jumpToPage) {
      jumpToPage(match.pageIndex);
    }
    store.update("matchPosition", {
      matchIndex: match.matchIndex,
      pageIndex: match.pageIndex
    });
    return match;
  };
  const getKeywordSource = (keyword) => {
    if (keyword instanceof RegExp) {
      return keyword.source;
    }
    if (typeof keyword === "string") {
      return keyword;
    }
    return keyword.keyword;
  };
  const searchFor = (keywordParam, matchCaseParam, wholeWordsParam) => {
    const currentDoc = currentDocRef.current;
    if (!currentDoc) {
      return Promise.resolve([]);
    }
    const numPages = currentDoc.numPages;
    const keywords2 = keywordParam.map((k) => normalizeSingleKeyword(k, matchCaseParam, wholeWordsParam));
    store.update("keyword", keywords2);
    setCurrentMatch(0);
    setFound([]);
    return new Promise((resolve, _) => {
      const getTextPromise = textContents.current.length === 0 ? getTextContents().then((response) => {
        textContents.current = response;
        return Promise.resolve(response);
      }) : Promise.resolve(textContents.current);
      getTextPromise.then((response) => {
        const arr = [];
        response.forEach((pageText, pageIndex) => {
          if (targetPageFilter()({ pageIndex, numPages })) {
            keywords2.forEach((keyword) => {
              let matchIndex = 0;
              let matches;
              while ((matches = keyword.regExp.exec(pageText)) !== null) {
                arr.push({
                  keyword: keyword.regExp,
                  matchIndex,
                  pageIndex,
                  pageText,
                  startIndex: matches.index,
                  endIndex: keyword.regExp.lastIndex
                });
                matchIndex++;
              }
            });
          }
        });
        setFound(arr);
        if (arr.length > 0) {
          setCurrentMatch(1);
          jumpToGivenMatch(arr[0]);
        }
        resolve(arr);
      });
    });
  };
  React__namespace.useEffect(() => {
    textContents.current = [];
  }, [currentDocRef.current]);
  return {
    clearKeyword,
    changeMatchCase,
    changeWholeWords,
    currentMatch,
    jumpToMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    keywords,
    matchCase,
    numberOfMatches: found.length,
    wholeWords,
    search,
    searchFor,
    setKeywords,
    // Compatible with the single keyword search
    keyword: keywords.length === 0 ? "" : getKeywordSource(keywords[0]),
    setKeyword,
    setTargetPages
  };
};

const Search = ({ children, store }) => {
  const result = useSearch(store);
  const [isDocumentLoaded, setDocumentLoaded] = React__namespace.useState(false);
  const handleDocumentChanged = (_) => setDocumentLoaded(true);
  React__namespace.useEffect(() => {
    store.subscribe("doc", handleDocumentChanged);
    return () => {
      store.unsubscribe("doc", handleDocumentChanged);
    };
  }, []);
  return children({ ...result, isDocumentLoaded });
};

const ShortcutHandler = ({ containerRef, store }) => {
  const [element, setElement] = React__namespace.useState(containerRef.current);
  React__namespace.useEffect(() => {
    if (containerRef.current !== element) {
      setElement(containerRef.current);
    }
  }, []);
  const isMouseInsideRef = React__namespace.useRef(false);
  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };
  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
  };
  const handleDocumentKeyDown = React__namespace.useCallback(
    (e) => {
      if (!element) {
        return;
      }
      if (e.shiftKey || e.altKey || e.key !== "f") {
        return;
      }
      const isCommandPressed = core.isMac() ? e.metaKey && !e.ctrlKey : e.ctrlKey;
      if (!isCommandPressed) {
        return;
      }
      if (isMouseInsideRef.current || document.activeElement && element.contains(document.activeElement)) {
        e.preventDefault();
        store.update("areShortcutsPressed", true);
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

var styles = {"popover":"rpv_be1278b5","inputCounter":"rpv_119fcec2","counter":"rpv_ea7700c","counterLtr":"rpv_4ee9303e","counterRtl":"rpv_4ee946be","label":"rpv_1a0edd04","checkbox":"rpv_380e43b3","footer":"rpv_1e5b198b","footerItem":"rpv_e0f04b3e","footerButtonLtr":"rpv_2013f20d","footerButtonRtl":"rpv_2014088d"};

const SearchPopover = ({ store, onToggle }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const { direction } = React__namespace.useContext(core.ThemeContext);
  const [isQuerying, setIsQuerying] = React__namespace.useState(false);
  const [searchDone, setSearchDone] = React__namespace.useState(false);
  const isRtl = direction === core.TextDirection.RightToLeft;
  const {
    clearKeyword,
    changeMatchCase,
    changeWholeWords,
    currentMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    keyword,
    matchCase,
    numberOfMatches,
    wholeWords,
    search,
    setKeyword
  } = useSearch(store);
  const performSearch = (cb) => {
    setIsQuerying(true);
    search().then((_) => {
      setIsQuerying(false);
      setSearchDone(true);
      cb && cb();
    });
  };
  const onKeydownSearch = (e) => {
    if (e.key === "Enter" && keyword) {
      searchDone ? jumpToNextMatch() : performSearch();
    }
  };
  const onChangeMatchCase = (e) => {
    setSearchDone(false);
    changeMatchCase(e.target.checked);
  };
  const onChangeWholeWords = (e) => {
    setSearchDone(false);
    changeWholeWords(e.target.checked);
  };
  const onClose = () => {
    onToggle();
    clearKeyword();
  };
  const onChangeKeyword = (value) => {
    setSearchDone(false);
    setKeyword(value);
  };
  React__namespace.useEffect(() => {
    const initialKeyword = store.get("initialKeyword");
    if (initialKeyword && initialKeyword.length === 1 && keyword) {
      performSearch(() => {
        store.update("initialKeyword", []);
      });
    }
  }, []);
  const searchLabel = l10n && l10n.search ? l10n.search.enterToSearch : "Enter to search";
  const previousMatchLabel = l10n && l10n.search ? l10n.search.previousMatch : "Previous match";
  const nextMatchLabel = l10n && l10n.search ? l10n.search.nextMatch : "Next match";
  const closeButtonLabel = l10n && l10n.search ? l10n.search.close : "Close";
  return /* @__PURE__ */ React__namespace.createElement("div", { className: styles.popover }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.inputCounter }, /* @__PURE__ */ React__namespace.createElement(
    core.TextBox,
    {
      ariaLabel: searchLabel,
      autoFocus: true,
      placeholder: searchLabel,
      type: "text",
      value: keyword,
      onChange: onChangeKeyword,
      onKeyDown: onKeydownSearch
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: core.classNames({
        [styles.counter]: true,
        [styles.counterLtr]: !isRtl,
        [styles.counterRtl]: isRtl
      })
    },
    isQuerying && /* @__PURE__ */ React__namespace.createElement(core.Spinner, { testId: "search__popover-searching", size: "1rem" }),
    !isQuerying && /* @__PURE__ */ React__namespace.createElement("span", { "data-testid": "search__popover-num-matches" }, currentMatch, "/", numberOfMatches)
  )), /* @__PURE__ */ React__namespace.createElement("label", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles.checkbox,
      "data-testid": "search__popover-match-case",
      checked: matchCase,
      type: "checkbox",
      onChange: onChangeMatchCase
    }
  ), " ", l10n && l10n.search ? l10n.search.matchCase : "Match case"), /* @__PURE__ */ React__namespace.createElement("label", { className: styles.label }, /* @__PURE__ */ React__namespace.createElement(
    "input",
    {
      className: styles.checkbox,
      checked: wholeWords,
      "data-testid": "search__popover-whole-words",
      type: "checkbox",
      onChange: onChangeWholeWords
    }
  ), " ", l10n && l10n.search ? l10n.search.wholeWords : "Whole words"), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footer }, /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footerItem }, /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "search-previous-match",
      position: isRtl ? core.Position.BottomRight : core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: previousMatchLabel,
          isDisabled: currentMatch <= 1,
          onClick: jumpToPreviousMatch
        },
        /* @__PURE__ */ React__namespace.createElement(PreviousIcon, null)
      ),
      content: () => previousMatchLabel
    }
  )), /* @__PURE__ */ React__namespace.createElement("div", { className: styles.footerItem }, /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "search-next-match",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaLabel: nextMatchLabel,
          isDisabled: currentMatch > numberOfMatches - 1,
          onClick: jumpToNextMatch
        },
        /* @__PURE__ */ React__namespace.createElement(NextIcon, null)
      ),
      content: () => nextMatchLabel
    }
  )), /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: core.classNames({
        [styles.footerButtonLtr]: !isRtl,
        [styles.footerButtonRtl]: isRtl
      })
    },
    /* @__PURE__ */ React__namespace.createElement(core.Button, { onClick: onClose }, closeButtonLabel)
  )));
};

const ShowSearchPopoverDecorator = ({ children, onClick }) => {
  const { l10n } = React__namespace.useContext(core.LocalizationContext);
  const label = l10n && l10n.search ? l10n.search.search : "Search";
  const icon = /* @__PURE__ */ React__namespace.createElement(SearchIcon, null);
  return children({ icon, label, onClick });
};

const ShowSearchPopoverButton = ({ enableShortcuts, store, onClick }) => {
  const ariaKeyShortcuts = enableShortcuts ? core.isMac() ? "Meta+F" : "Ctrl+F" : "";
  const handleShortcutsPressed = (areShortcutsPressed) => {
    if (areShortcutsPressed) {
      onClick();
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("areShortcutsPressed", handleShortcutsPressed);
    return () => {
      store.unsubscribe("areShortcutsPressed", handleShortcutsPressed);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverDecorator, { onClick }, (p) => /* @__PURE__ */ React__namespace.createElement(
    core.Tooltip,
    {
      ariaControlsSuffix: "search-popover",
      position: core.Position.BottomCenter,
      target: /* @__PURE__ */ React__namespace.createElement(
        core.MinimalButton,
        {
          ariaKeyShortcuts,
          ariaLabel: p.label,
          testId: "search__popover-button",
          onClick
        },
        p.icon
      ),
      content: () => p.label
    }
  ));
};

const ShowSearchPopover = ({ children, enableShortcuts, store }) => {
  const defaultChildren = (props) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverButton, { enableShortcuts, store, ...props });
  const render = children || defaultChildren;
  return /* @__PURE__ */ React__namespace.createElement(
    core.Popover,
    {
      ariaControlsSuffix: "search",
      lockScroll: false,
      position: core.Position.BottomCenter,
      target: (toggle) => render({
        onClick: toggle
      }),
      content: (toggle) => /* @__PURE__ */ React__namespace.createElement(SearchPopover, { store, onToggle: toggle }),
      closeOnClickOutside: false,
      closeOnEscape: true
    }
  );
};

const normalizeKeywords = (keyword) => Array.isArray(keyword) ? keyword.map((k) => normalizeSingleKeyword(k)) : keyword ? [normalizeSingleKeyword(keyword)] : [];
const searchPlugin = (props) => {
  const searchPluginProps = React__namespace.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => Object.assign({}, { enableShortcuts: true, onHighlightKeyword: () => {
    } }, props),
    []
  );
  const store = React__namespace.useMemo(
    () => core.createStore({
      initialKeyword: props && props.keyword ? Array.isArray(props.keyword) ? props.keyword : [props.keyword] : [],
      keyword: props && props.keyword ? normalizeKeywords(props.keyword) : [EMPTY_KEYWORD_REGEXP],
      matchPosition: {
        matchIndex: -1,
        pageIndex: -1
      },
      renderStatus: /* @__PURE__ */ new Map()
    }),
    []
  );
  const { clearKeyword, jumpToMatch, jumpToNextMatch, jumpToPreviousMatch, searchFor, setKeywords, setTargetPages } = useSearch(store);
  const SearchDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(Search, { ...props2, store });
  const ShowSearchPopoverDecorator = (props2) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopover, { enableShortcuts: searchPluginProps.enableShortcuts, ...props2, store });
  const ShowSearchPopoverButtonDecorator = () => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverDecorator, null, (props2) => /* @__PURE__ */ React__namespace.createElement(ShowSearchPopoverButton, { enableShortcuts: searchPluginProps.enableShortcuts, store, ...props2 }));
  const renderViewer = (renderViewerProps) => {
    const currentSlot = renderViewerProps.slot;
    if (currentSlot.subSlot) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, searchPluginProps.enableShortcuts && /* @__PURE__ */ React__namespace.createElement(ShortcutHandler, { containerRef: renderViewerProps.containerRef, store }), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  const renderPageLayer = (renderProps) => /* @__PURE__ */ React__namespace.createElement(
    Highlights,
    {
      key: renderProps.pageIndex,
      numPages: renderProps.doc.numPages,
      pageIndex: renderProps.pageIndex,
      renderHighlights: props?.renderHighlights,
      store,
      onHighlightKeyword: searchPluginProps.onHighlightKeyword
    }
  );
  return {
    install: (pluginFunctions) => {
      const initialKeyword = props && props.keyword ? Array.isArray(props.keyword) ? props.keyword : [props.keyword] : [];
      const keyword = props && props.keyword ? normalizeKeywords(props.keyword) : [EMPTY_KEYWORD_REGEXP];
      store.update("initialKeyword", initialKeyword);
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
      store.update("jumpToPage", pluginFunctions.jumpToPage);
      store.update("keyword", keyword);
    },
    renderPageLayer,
    renderViewer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uninstall: (props2) => {
      const renderStatus = store.get("renderStatus");
      if (renderStatus) {
        renderStatus.clear();
      }
    },
    onDocumentLoad: (props2) => {
      store.update("doc", props2.doc);
    },
    onTextLayerRender: (props2) => {
      let renderStatus = store.get("renderStatus");
      if (renderStatus) {
        renderStatus = renderStatus.set(props2.pageIndex, props2);
        store.update("renderStatus", renderStatus);
      }
    },
    Search: SearchDecorator,
    ShowSearchPopover: ShowSearchPopoverDecorator,
    ShowSearchPopoverButton: ShowSearchPopoverButtonDecorator,
    clearHighlights: () => {
      clearKeyword();
    },
    highlight: (keyword) => {
      const keywords = Array.isArray(keyword) ? keyword : [keyword];
      setKeywords(keywords);
      return searchFor(keywords);
    },
    jumpToMatch,
    jumpToNextMatch,
    jumpToPreviousMatch,
    setTargetPages
  };
};

exports.NextIcon = NextIcon;
exports.PreviousIcon = PreviousIcon;
exports.SearchIcon = SearchIcon;
exports.searchPlugin = searchPlugin;

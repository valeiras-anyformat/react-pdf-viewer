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

const MessageIcon = () => /* @__PURE__ */ React__namespace.createElement(core.Icon, { size: 16 }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M23.5,17a1,1,0,0,1-1,1h-11l-4,4V18h-6a1,1,0,0,1-1-1V3a1,1,0,0,1,1-1h21a1,1,0,0,1,1,1Z" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M5.5 12L18.5 12" }), /* @__PURE__ */ React__namespace.createElement("path", { d: "M5.5 7L18.5 7" }));

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getImageFromArea = () => {
  const newCanvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 1;
  return (canvasEle, highlightArea) => {
    const canvasRect = canvasEle.getBoundingClientRect();
    const left = highlightArea.left * canvasRect.width / 100;
    const top = highlightArea.top * canvasRect.height / 100;
    const width = highlightArea.width * canvasRect.width / 100;
    const height = highlightArea.height * canvasRect.height / 100;
    const context = newCanvas.getContext("2d");
    newCanvas.width = width;
    newCanvas.height = height;
    context?.drawImage(canvasEle, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
    return newCanvas.toDataURL("image/png");
  };
};

var styles$1 = {"clickDrag":"rpv_5990c52b","clickDragHidden":"rpv_7ca882b5"};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var HighlightStateType = /* @__PURE__ */ ((HighlightStateType2) => {
  HighlightStateType2["NoSelection"] = "NoSelection";
  HighlightStateType2["Selecting"] = "Selecting";
  HighlightStateType2["Selected"] = "Selected";
  HighlightStateType2["Selection"] = "Selection";
  HighlightStateType2["ClickDragging"] = "ClickDragging";
  HighlightStateType2["ClickDragged"] = "ClickDragged";
  return HighlightStateType2;
})(HighlightStateType || {});
const EMPTY_SELECTION_REGION = {
  height: 0,
  left: 0,
  pageIndex: -1,
  top: 0,
  width: 0
};
const NO_SELECTION_STATE = {
  highlightAreas: [],
  selectionRegion: EMPTY_SELECTION_REGION,
  type: "NoSelection" /* NoSelection */
};
const SELECTING_STATE = {
  highlightAreas: [],
  selectionRegion: EMPTY_SELECTION_REGION,
  type: "Selecting" /* Selecting */
};

const ClickDrag = ({ canvasLayerRef, canvasLayerRendered, pageIndex, store, textLayerRef, textLayerRendered }) => {
  const containerRef = React__namespace.useRef(null);
  const currentCursorRef = React__namespace.useRef(document.body.style.cursor);
  const startPointRef = React__namespace.useRef({ x: 0, y: 0 });
  const offsetRef = React__namespace.useRef({ top: 0, left: 0 });
  const hideContainer = () => {
    const container = containerRef.current;
    if (container) {
      container.classList.add(styles$1.clickDragHidden);
    }
  };
  const handleMouseDown = (e) => {
    const textLayerEle = textLayerRef.current;
    const container = containerRef.current;
    if (!e.altKey || !textLayerEle || !container || e.button !== 0) {
      return;
    }
    e.preventDefault();
    document.body.style.cursor = "crosshair";
    const rect = textLayerEle.getBoundingClientRect();
    const startPoint = {
      x: e.clientX,
      y: e.clientY
    };
    startPointRef.current = startPoint;
    const offset = {
      top: (startPoint.y - rect.top) * 100 / rect.height,
      left: (startPoint.x - rect.left) * 100 / rect.width
    };
    offsetRef.current = offset;
    container.style.top = `${offset.top}%`;
    container.style.left = `${offset.left}%`;
    container.style.height = "0px";
    container.style.width = "0px";
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    store.updateCurrentValue(
      "highlightState",
      (currentState) => Object.assign({}, currentState, { type: HighlightStateType.ClickDragging })
    );
  };
  const handleDocumentMouseMove = (e) => {
    const textLayerEle = textLayerRef.current;
    const container = containerRef.current;
    if (!textLayerEle || !container) {
      return;
    }
    e.preventDefault();
    const endPoint = {
      x: e.clientX - startPointRef.current.x,
      y: e.clientY - startPointRef.current.y
    };
    const rect = textLayerEle.getBoundingClientRect();
    if (container.classList.contains(styles$1.clickDragHidden)) {
      container.classList.remove(styles$1.clickDragHidden);
    }
    const width = Math.min(100 - offsetRef.current.left, endPoint.x * 100 / rect.width);
    const height = Math.min(100 - offsetRef.current.top, endPoint.y * 100 / rect.height);
    container.style.width = `${width}%`;
    container.style.height = `${height}%`;
  };
  const handleDocumentKeyDown = (e) => {
    if (e.key === "Escape" && store.get("highlightState").type === HighlightStateType.ClickDragged) {
      e.preventDefault();
      hideContainer();
      store.update("highlightState", NO_SELECTION_STATE);
    }
  };
  const handleDocumenClick = (e) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const highlightType = store.get("highlightState").type;
    if (highlightType === HighlightStateType.NoSelection && e.target !== container) {
      hideContainer();
    }
  };
  const handleDocumentMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener("mousemove", handleDocumentMouseMove);
    document.removeEventListener("mouseup", handleDocumentMouseUp);
    resetCursor();
    const container = containerRef.current;
    const canvasEle = canvasLayerRef.current;
    if (!container || !canvasEle) {
      return;
    }
    const highlightArea = {
      pageIndex,
      top: parseFloat(container.style.top.slice(0, -1)),
      left: parseFloat(container.style.left.slice(0, -1)),
      height: parseFloat(container.style.height.slice(0, -1)),
      width: parseFloat(container.style.width.slice(0, -1))
    };
    const previewImage = getImageFromArea()(canvasEle, highlightArea);
    const newState = {
      highlightAreas: [highlightArea],
      previewImage,
      selectionRegion: highlightArea,
      type: HighlightStateType.ClickDragged
    };
    store.update("highlightState", newState);
  };
  const resetCursor = () => {
    currentCursorRef.current ? document.body.style.cursor = currentCursorRef.current : document.body.style.removeProperty("cursor");
  };
  const handleHighlightState = (s) => {
    if (s.type === HighlightStateType.Selection || // User is dragging in other page
    s.type === HighlightStateType.ClickDragging && s.selectionRegion.pageIndex !== pageIndex) {
      hideContainer();
    }
  };
  React__namespace.useEffect(() => {
    store.subscribe("highlightState", handleHighlightState);
    return () => {
      store.unsubscribe("highlightState", handleHighlightState);
    };
  }, []);
  React__namespace.useEffect(() => {
    const canvasEle = canvasLayerRef.current;
    const textLayerEle = textLayerRef.current;
    if (!canvasLayerRendered || !textLayerRendered || !canvasEle || !textLayerEle) {
      return;
    }
    textLayerEle.addEventListener("mousedown", handleMouseDown);
    const eventOptions = {
      capture: true
    };
    document.addEventListener("keydown", handleDocumentKeyDown);
    document.addEventListener("click", handleDocumenClick, eventOptions);
    return () => {
      textLayerEle.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleDocumenClick, eventOptions);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [textLayerRendered]);
  return /* @__PURE__ */ React__namespace.createElement("div", { ref: containerRef, className: `${styles$1.clickDrag} ${styles$1.clickDragHidden}` });
};

var styles = {"selectedText":"rpv_e1c7cdad","selectedEnd":"rpv_59dcf05b"};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const normalizeRotation = (rotation) => rotation >= 0 ? rotation : 360 + rotation;
const getCssProperties = (area, rotation) => {
  const r = normalizeRotation(rotation);
  switch (r) {
    case 90:
      return {
        height: `${area.width}%`,
        position: "absolute",
        right: `${area.top}%`,
        top: `${area.left}%`,
        width: `${area.height}%`
      };
    case 180:
      return {
        bottom: `${area.top}%`,
        height: `${area.height}%`,
        position: "absolute",
        right: `${area.left}%`,
        width: `${area.width}%`
      };
    case 270:
      return {
        height: `${area.width}%`,
        position: "absolute",
        left: `${area.top}%`,
        bottom: `${area.left}%`,
        width: `${area.height}%`
      };
    case 0:
    case 360:
    default:
      return {
        height: `${area.height}%`,
        position: "absolute",
        top: `${area.top}%`,
        left: `${area.left}%`,
        width: `${area.width}%`
      };
  }
};
const transformArea = (area, rotation) => {
  const r = normalizeRotation(rotation);
  switch (r) {
    case 90:
      return {
        height: area.width,
        left: area.top,
        pageIndex: area.pageIndex,
        top: 100 - area.width - area.left,
        width: area.height
      };
    case 180:
      return {
        height: area.height,
        left: 100 - area.width - area.left,
        pageIndex: area.pageIndex,
        top: 100 - area.height - area.top,
        width: area.width
      };
    case 270:
      return {
        height: area.width,
        left: 100 - area.height - area.top,
        pageIndex: area.pageIndex,
        top: area.left,
        width: area.height
      };
    case 0:
    case 360:
    default:
      return area;
  }
};

const HighlightRect = ({ area, rotation }) => /* @__PURE__ */ React__namespace.createElement("div", { className: styles.selectedText, style: getCssProperties(area, rotation) });

const useRotation = (store) => {
  const [rotation, setRotation] = React__namespace.useState(store.get("rotation") || 0);
  const handleRotationChanged = (currentRotation) => setRotation(currentRotation);
  React__namespace.useEffect(() => {
    store.subscribe("rotation", handleRotationChanged);
    return () => {
      store.unsubscribe("rotation", handleRotationChanged);
    };
  }, []);
  return { rotation };
};

const HighlightAreaList = ({ pageIndex, renderHighlightContent, renderHighlightTarget, renderHighlights, store }) => {
  const [highlightState, setHighlightState] = React__namespace.useState(store.get("highlightState"));
  const { rotation } = useRotation(store);
  const handleHighlightState = (s) => setHighlightState(s);
  const cancel = () => {
    window.getSelection()?.removeAllRanges();
    store.update("highlightState", NO_SELECTION_STATE);
  };
  React__namespace.useEffect(() => {
    store.subscribe("highlightState", handleHighlightState);
    return () => {
      store.unsubscribe("highlightState", handleHighlightState);
    };
  }, []);
  const listAreas = highlightState.type === HighlightStateType.Selection ? highlightState.highlightAreas.filter((s) => s.pageIndex === pageIndex) : [];
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, renderHighlightTarget && (highlightState.type === HighlightStateType.Selected || highlightState.type === HighlightStateType.ClickDragged) && highlightState.selectionRegion.pageIndex === pageIndex && renderHighlightTarget({
    highlightAreas: highlightState.highlightAreas,
    previewImage: highlightState.previewImage || "",
    selectedText: highlightState.selectedText || "",
    selectionRegion: highlightState.selectionRegion,
    selectionData: highlightState.selectionData,
    cancel,
    toggle: () => {
      const newState = Object.assign({}, highlightState, {
        type: HighlightStateType.Selection
      });
      store.update("highlightState", newState);
      window.getSelection()?.removeAllRanges();
    }
  }), renderHighlightContent && highlightState.type == HighlightStateType.Selection && highlightState.selectionRegion.pageIndex === pageIndex && renderHighlightContent({
    highlightAreas: highlightState.highlightAreas,
    previewImage: highlightState.previewImage || "",
    selectedText: highlightState.selectedText || "",
    selectionRegion: highlightState.selectionRegion,
    selectionData: highlightState.selectionData,
    cancel
  }), listAreas.length > 0 && /* @__PURE__ */ React__namespace.createElement("div", null, listAreas.map((area, idx) => /* @__PURE__ */ React__namespace.createElement(HighlightRect, { key: idx, area, rotation }))), renderHighlights && renderHighlights({
    pageIndex,
    rotation,
    getCssProperties
  }));
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const HIGHLIGHT_LAYER_ATTR = "data-highlight-text-layer";
const HIGHLIGHT_PAGE_ATTR = "data-highlight-text-page";

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getRectFromOffsets = (textDiv, startOffset, endOffset) => {
  const clonedEle = textDiv.cloneNode(true);
  textDiv.parentNode.appendChild(clonedEle);
  const firstChild = clonedEle.firstChild;
  const range = new Range();
  range.setStart(firstChild, startOffset);
  range.setEnd(firstChild, endOffset);
  const wrapper = document.createElement("span");
  range.surroundContents(wrapper);
  const rect = wrapper.getBoundingClientRect();
  clonedEle.parentNode.removeChild(clonedEle);
  return rect;
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
const getTextFromOffsets = (nodes, pageIndex, startDivIdx, startOffset, endDivIdx, endOffset) => {
  if (startDivIdx < endDivIdx) {
    const startDivText = nodes.slice(startDivIdx, startDivIdx + 1).map((node) => node.textContent.substring(startOffset).trim()).join(" ");
    const middleDivText = nodes.slice(startDivIdx + 1, endDivIdx).map((node) => node.textContent.trim()).join(" ");
    const endDivText = nodes.slice(endDivIdx, endDivIdx + 1).map((endDiv) => endDiv.textContent.substring(0, endOffset || endDiv.textContent.length)).join(" ");
    const wholeText = `${startDivText} ${middleDivText} ${endDivText}`;
    const divTexts = nodes.slice(startDivIdx, endDivIdx + 1).map((node, idx) => ({
      divIndex: startDivIdx + idx,
      pageIndex,
      textContent: node.textContent
    }));
    return {
      divTexts,
      wholeText
    };
  } else {
    const div = nodes[startDivIdx];
    const wholeText = div.textContent.substring(startOffset, endOffset || div.textContent.length).trim();
    const divTexts = [
      {
        divIndex: startDivIdx,
        pageIndex,
        textContent: div.textContent
      }
    ];
    return {
      divTexts,
      wholeText
    };
  }
};

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var SelectionRange = /* @__PURE__ */ ((SelectionRange2) => {
  SelectionRange2["SameDiv"] = "SameDiv";
  SelectionRange2["DifferentDivs"] = "DifferentDivs";
  SelectionRange2["DifferentPages"] = "DifferentPages";
  return SelectionRange2;
})(SelectionRange || {});

/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */
var Trigger = /* @__PURE__ */ ((Trigger2) => {
  Trigger2["None"] = "None";
  Trigger2["TextSelection"] = "TextSelection";
  return Trigger2;
})(Trigger || {});

const EMPTY_SELECTION = ["", "\n"];
const Tracker = ({ store }) => {
  const { rotation } = useRotation(store);
  const pagesRef = React__namespace.useRef(null);
  const [arePagesFound, setPagesFound] = React__namespace.useState(false);
  const [trigger, setTrigger] = React__namespace.useState(store.get("trigger"));
  const handlePagesContainer = (getPagesContainer) => {
    const ele = getPagesContainer();
    pagesRef.current = ele;
    setPagesFound(!!ele);
  };
  const handleTrigger = (trigger2) => setTrigger(trigger2);
  const onMouseUpHandler = () => {
    const selection = document.getSelection();
    const highlightState = store.get("highlightState");
    const hasSelection = (highlightState.type === HighlightStateType.NoSelection || highlightState.type === HighlightStateType.Selected) && selection.rangeCount > 0 && EMPTY_SELECTION.indexOf(selection.toString()) === -1;
    if (!hasSelection) {
      return;
    }
    const range = selection.getRangeAt(0);
    const startDiv = range.startContainer.parentNode;
    const parentEndContainer = range.endContainer.parentNode;
    const shouldIgnoreEndContainer = parentEndContainer instanceof HTMLElement && parentEndContainer.hasAttribute(HIGHLIGHT_LAYER_ATTR);
    let endDiv, endOffset;
    if (startDiv && startDiv.parentNode == range.endContainer) {
      endDiv = startDiv;
      endOffset = endDiv.textContent.length;
    } else if (shouldIgnoreEndContainer && range.endOffset == 0) {
      endDiv = range.endContainer.previousSibling;
      endOffset = endDiv.textContent.length;
    } else if (shouldIgnoreEndContainer) {
      endDiv = range.endContainer;
      endOffset = range.endOffset;
    } else {
      endDiv = parentEndContainer;
      endOffset = range.endOffset;
    }
    if (!(startDiv instanceof HTMLElement) || !(endDiv instanceof HTMLElement)) {
      return;
    }
    const startPageIndex = parseInt(startDiv.getAttribute(HIGHLIGHT_PAGE_ATTR) || "", 10);
    const endPageIndex = parseInt(endDiv.getAttribute(HIGHLIGHT_PAGE_ATTR) || "", 10);
    const startTextLayer = startDiv.parentElement;
    const endTextLayer = endDiv.parentElement;
    const startPageRect = startTextLayer.getBoundingClientRect();
    const startDivSiblings = [].slice.call(
      startTextLayer.querySelectorAll(`[${HIGHLIGHT_PAGE_ATTR}]`)
    );
    const startDivIndex = startDivSiblings.indexOf(startDiv);
    const endPageRect = endTextLayer.getBoundingClientRect();
    const endDivSiblings = [].slice.call(endTextLayer.querySelectorAll(`[${HIGHLIGHT_PAGE_ATTR}]`));
    const endDivIndex = endDivSiblings.indexOf(endDiv);
    const startOffset = range.startOffset;
    let rangeType = SelectionRange.DifferentPages;
    switch (true) {
      case (startPageIndex === endPageIndex && startDivIndex === endDivIndex):
        rangeType = SelectionRange.SameDiv;
        break;
      case (startPageIndex === endPageIndex && startDivIndex < endDivIndex):
        rangeType = SelectionRange.DifferentDivs;
        break;
      default:
        rangeType = SelectionRange.DifferentPages;
        break;
    }
    const getRectBetween = (min, max, eleArray) => Array(max - min + 1).fill(0).map((_, i) => eleArray[min + i].getBoundingClientRect());
    let highlightAreas = [];
    switch (rangeType) {
      case SelectionRange.SameDiv:
        const rect = getRectFromOffsets(startDiv, startOffset, endOffset);
        highlightAreas = [
          {
            height: rect.height * 100 / startPageRect.height,
            left: (rect.left - startPageRect.left) * 100 / startPageRect.width,
            pageIndex: startPageIndex,
            top: (rect.top - startPageRect.top) * 100 / startPageRect.height,
            width: rect.width * 100 / startPageRect.width
          }
        ];
        break;
      case SelectionRange.DifferentDivs:
        highlightAreas = [getRectFromOffsets(startDiv, startOffset, startDiv.textContent.length)].concat(getRectBetween(startDivIndex + 1, endDivIndex - 1, startDivSiblings)).concat([getRectFromOffsets(endDiv, 0, endOffset)]).map((rect2) => {
          return {
            height: rect2.height * 100 / startPageRect.height,
            left: (rect2.left - startPageRect.left) * 100 / startPageRect.width,
            pageIndex: startPageIndex,
            top: (rect2.top - startPageRect.top) * 100 / startPageRect.height,
            width: rect2.width * 100 / startPageRect.width
          };
        });
        break;
      case SelectionRange.DifferentPages:
        const startAreas = [getRectFromOffsets(startDiv, startOffset, startDiv.textContent.length)].concat(getRectBetween(startDivIndex + 1, startDivSiblings.length - 1, startDivSiblings)).map((rect2) => {
          return {
            height: rect2.height * 100 / startPageRect.height,
            left: (rect2.left - startPageRect.left) * 100 / startPageRect.width,
            pageIndex: startPageIndex,
            top: (rect2.top - startPageRect.top) * 100 / startPageRect.height,
            width: rect2.width * 100 / startPageRect.width
          };
        });
        const endAreas = getRectBetween(0, endDivIndex - 1, endDivSiblings).concat([getRectFromOffsets(endDiv, 0, endOffset)]).map((rect2) => {
          return {
            height: rect2.height * 100 / endPageRect.height,
            left: (rect2.left - endPageRect.left) * 100 / endPageRect.width,
            pageIndex: endPageIndex,
            top: (rect2.top - endPageRect.top) * 100 / endPageRect.height,
            width: rect2.width * 100 / endPageRect.width
          };
        });
        highlightAreas = startAreas.concat(endAreas);
        break;
    }
    let selectedText = "";
    let divTexts = [];
    switch (rangeType) {
      case SelectionRange.SameDiv:
        const textDataSameDiv = getTextFromOffsets(
          startDivSiblings,
          startPageIndex,
          startDivIndex,
          startOffset,
          startDivIndex,
          endOffset
        );
        selectedText = textDataSameDiv.wholeText;
        divTexts = textDataSameDiv.divTexts;
        break;
      case SelectionRange.DifferentDivs:
        const textDataDifferentDivs = getTextFromOffsets(
          startDivSiblings,
          startPageIndex,
          startDivIndex,
          startOffset,
          endDivIndex,
          endOffset
        );
        selectedText = textDataDifferentDivs.wholeText;
        divTexts = textDataDifferentDivs.divTexts;
        break;
      case SelectionRange.DifferentPages:
        const startTextData = getTextFromOffsets(
          startDivSiblings,
          startPageIndex,
          startDivIndex,
          startOffset,
          startDivSiblings.length
        );
        const endTextData = getTextFromOffsets(endDivSiblings, endPageIndex, 0, 0, endDivIndex, endOffset);
        selectedText = `${startTextData.wholeText}
${endTextData.wholeText}`;
        divTexts = startTextData.divTexts.concat(endTextData.divTexts);
        break;
    }
    let selectionRegion;
    if (highlightAreas.length > 0) {
      selectionRegion = highlightAreas[highlightAreas.length - 1];
    } else {
      const endDivRect = endDiv.getBoundingClientRect();
      selectionRegion = {
        height: endDivRect.height * 100 / endPageRect.height,
        left: (endDivRect.left - endPageRect.left) * 100 / endPageRect.width,
        pageIndex: endPageIndex,
        top: (endDivRect.top - endPageRect.top) * 100 / endPageRect.height,
        width: endDivRect.width * 100 / endPageRect.width
      };
    }
    const selectionData = {
      divTexts,
      selectedText,
      startPageIndex,
      endPageIndex,
      startOffset,
      startDivIndex,
      endOffset,
      endDivIndex
    };
    const selectedState = {
      type: HighlightStateType.Selected,
      selectedText,
      highlightAreas: highlightAreas.map((area) => transformArea(area, rotation)),
      selectionData,
      selectionRegion
    };
    store.update("highlightState", selectedState);
  };
  React__namespace.useEffect(() => {
    const ele = pagesRef.current;
    if (!ele || trigger === Trigger.None) {
      return;
    }
    ele.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      ele.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [arePagesFound, trigger, rotation]);
  React__namespace.useEffect(() => {
    store.subscribe("getPagesContainer", handlePagesContainer);
    store.subscribe("trigger", handleTrigger);
    return () => {
      store.unsubscribe("getPagesContainer", handlePagesContainer);
      store.unsubscribe("trigger", handleTrigger);
    };
  }, []);
  return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null);
};

const TEXT_LAYER_END_SELECTOR = styles.selectedEnd;
const highlightPlugin = (props) => {
  const highlightPluginProps = Object.assign({}, { trigger: Trigger.TextSelection }, props);
  const store = React__namespace.useMemo(
    () => core.createStore({
      highlightState: NO_SELECTION_STATE,
      trigger: highlightPluginProps.trigger
    }),
    []
  );
  const renderViewer = (props2) => {
    const currentSlot = props2.slot;
    if (currentSlot.subSlot && currentSlot.subSlot.children) {
      currentSlot.subSlot.children = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(Tracker, { store }), currentSlot.subSlot.children);
    }
    return currentSlot;
  };
  const handleMouseDown = (textLayerRender) => (e) => {
    if (store.get("trigger") === Trigger.None || e.button !== 0) {
      return;
    }
    const textLayer = textLayerRender.ele;
    const pageRect = textLayer.getBoundingClientRect();
    const highlightState = store.get("highlightState");
    if (!highlightState) {
      return;
    }
    if (highlightState.type === HighlightStateType.Selected) {
      const mouseTop = e.clientY - pageRect.top;
      const mouseLeft = e.clientX - pageRect.left;
      const userClickedInsideArea = highlightState.highlightAreas.filter((area) => area.pageIndex === textLayerRender.pageIndex).find((area) => {
        const t = area.top * pageRect.height / 100;
        const l = area.left * pageRect.width / 100;
        const h = area.height * pageRect.height / 100;
        const w = area.width * pageRect.width / 100;
        return t <= mouseTop && mouseTop <= t + h && l <= mouseLeft && mouseLeft <= l + w;
      });
      if (userClickedInsideArea) {
        window.getSelection()?.removeAllRanges();
        store.update("highlightState", NO_SELECTION_STATE);
      } else {
        store.update("highlightState", SELECTING_STATE);
      }
    } else {
      store.update("highlightState", NO_SELECTION_STATE);
    }
    const selectionTop = (e.clientY - pageRect.top) * 100 / pageRect.height;
    const selectEnd = textLayer.querySelector(`.${TEXT_LAYER_END_SELECTOR}`);
    if (selectEnd && e.target !== textLayer) {
      selectEnd.style.top = `${Math.max(0, selectionTop)}%`;
    }
  };
  const handleMouseUp = (textLayerRender) => (e) => {
    if (store.get("trigger") === Trigger.None) {
      return;
    }
    const selectEnd = textLayerRender.ele.querySelector(`.${TEXT_LAYER_END_SELECTOR}`);
    if (selectEnd) {
      selectEnd.style.removeProperty("top");
    }
  };
  const onTextLayerRender = (e) => {
    const mouseDownHandler = handleMouseDown(e);
    const mouseUpHandler = handleMouseUp(e);
    const textEle = e.ele;
    if (e.status === core.LayerRenderStatus.PreRender) {
      textEle.removeEventListener("mousedown", mouseDownHandler);
      textEle.removeEventListener("mouseup", mouseUpHandler);
      const selectEndEle = textEle.querySelector(`.${TEXT_LAYER_END_SELECTOR}`);
      if (selectEndEle) {
        textEle.removeChild(selectEndEle);
      }
    } else if (e.status === core.LayerRenderStatus.DidRender) {
      textEle.addEventListener("mousedown", mouseDownHandler);
      textEle.addEventListener("mouseup", mouseUpHandler);
      textEle.setAttribute(HIGHLIGHT_LAYER_ATTR, "true");
      textEle.querySelectorAll(".rpv-core__text-layer-text").forEach((span) => span.setAttribute(HIGHLIGHT_PAGE_ATTR, `${e.pageIndex}`));
      if (!textEle.querySelector(`.${TEXT_LAYER_END_SELECTOR}`)) {
        const selectEnd = document.createElement("div");
        selectEnd.classList.add(TEXT_LAYER_END_SELECTOR);
        selectEnd.setAttribute("data-text", "false");
        textEle.appendChild(selectEnd);
      }
    }
  };
  const renderPageLayer = (renderPageProps) => /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(
    ClickDrag,
    {
      canvasLayerRef: renderPageProps.canvasLayerRef,
      canvasLayerRendered: renderPageProps.canvasLayerRendered,
      pageIndex: renderPageProps.pageIndex,
      store,
      textLayerRef: renderPageProps.textLayerRef,
      textLayerRendered: renderPageProps.textLayerRendered
    }
  ), /* @__PURE__ */ React__namespace.createElement(
    HighlightAreaList,
    {
      pageIndex: renderPageProps.pageIndex,
      renderHighlightContent: highlightPluginProps.renderHighlightContent,
      renderHighlightTarget: highlightPluginProps.renderHighlightTarget,
      renderHighlights: highlightPluginProps.renderHighlights,
      store
    }
  ));
  const jumpToHighlightArea = (area) => {
    const jumpToDestination = store.get("jumpToDestination");
    if (jumpToDestination) {
      const bottomOffset = (_, viewportHeight) => (100 - area.top) * viewportHeight / 100;
      const leftOffset = (viewportWidth, _) => (100 - area.left) * viewportWidth / 100;
      jumpToDestination({
        pageIndex: area.pageIndex,
        bottomOffset,
        leftOffset
      });
    }
  };
  const switchTrigger = (trigger) => {
    store.update("trigger", trigger);
  };
  return {
    install: (pluginFunctions) => {
      store.update("jumpToDestination", pluginFunctions.jumpToDestination);
      store.update("getPagesContainer", pluginFunctions.getPagesContainer);
    },
    onViewerStateChange: (viewerState) => {
      store.update("rotation", viewerState.rotation);
      return viewerState;
    },
    onTextLayerRender,
    renderPageLayer,
    renderViewer,
    jumpToHighlightArea,
    switchTrigger
  };
};

exports.MessageIcon = MessageIcon;
exports.Trigger = Trigger;
exports.highlightPlugin = highlightPlugin;

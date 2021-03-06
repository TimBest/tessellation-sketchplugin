export function svgPathToBezierPath(svgPath) {
    var isClosedPtr = MOPointer.alloc().init();
    var path = SVGPathInterpreter.bezierPathFromCommands_isPathClosed(svgPath,isClosedPtr);

    return {
        path: path,
        isClosed: isClosedPtr.value()
    };
}

export function getParentGroup(document) {
  var documentData = document.documentData();
  return documentData.currentPage().currentArtboard() || documentData.currentPage();
}

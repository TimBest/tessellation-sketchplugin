var UI = require('sketch/ui');
var {parseSVG, makeAbsolute} = require('svg-path-parser');
// M200,200 L300,200 L300,300 L200,300 L200,200 Z

// TODO: calculate corners using bounding box
var corner1 = {x: 200, y: 200};
var corner2 = {x: 300, y: 200};
var corner3 = {x: 300, y: 300};
var corner4 = {x: 200, y: 300};

/*
originalPath: string; previous path data for svg
newPath: string; new path data for svg

return: {edge1: [], edge2: [], edge3: [], edge4: []}; edge arrays are in PEG.js svg grammer
*/
function pathToEdges(path) {
  var parsedPath = makeAbsolute(parseSVG(path));

  // get corner indices
  var corner1Index = -1;
  var corner2Index = -1;
  var corner3Index = -1;
  var corner4Index = -1;
  parsedPath.forEach((point, index) => {
    if (point.code == 'M') {
      corner1Index = index;
    }
    if (point.x == corner2.x && point.y == corner2.y) {
      corner2Index = index;
    }
    if (point.x == corner3.x && point.y == corner3.y) {
      corner3Index = index;
    }
    if (point.x == corner4.x && point.y == corner4.y) {
      corner4Index = index;
    }
  });

  // get edges
  var edge1 = parsedPath.slice(corner1Index, corner2Index + 1);
  var edge2 = parsedPath.slice(corner2Index, corner3Index + 1);
  var edge3 = parsedPath.slice(corner3Index, corner4Index + 1);
  var edge4 = parsedPath.slice(corner4Index);

  return { edge1, edge2, edge3, edge4};
}

/*
edgeA: []; elements in array PEG.js svg grammer
edgeB: []; elements in array PEG.js svg grammer

return: bool
*/
function areEdgesDifferent(edgeA, edgeB) {
  if (edgeA.length < 2 || edgeB.length < 2) {
    UI.message('Error: Edge length incorrect');
  }
  if (edgeA.length != edgeB.length) {
        return true;
  }
  var lastElementIndex = edgeA.length - 1;


  // compare ending point of the first element
  if (edgeA[0].x != edgeB[0].x || edgeA[0].y != edgeB[0].y ) {
    return true;
  }

  if (edgeA.length > 2) {
    // compare middle elements
    var middleA = edgeA.slice(1, lastElementIndex - 1);
    var middleB = edgeB.slice(1, lastElementIndex - 1);
    if (JSON.stringify(middleA) != JSON.stringify(middleB)) {
      return true;
    }
  }

  // compare last point
  if (edgeA[lastElementIndex].x != edgeB[lastElementIndex].x || edgeA[lastElementIndex].y != edgeB[lastElementIndex].y ) {
    return true;
  }

  return false;
}

/*
originalPath: string; previous path data for svg
newPath: string; new path data for svg

return: string; tessellate path data for svg
*/
export function tessellate(originalPath, editedPath) {
  var editedEdges = pathToEdges(editedPath);
  var originalEdges = pathToEdges(originalPath);

  var isEdge1Different = areEdgesDifferent(editedEdges.edge1, originalEdges.edge1);
  var isEdge2Different = areEdgesDifferent(editedEdges.edge2, originalEdges.edge2);
  var isEdge3Different = areEdgesDifferent(editedEdges.edge3, originalEdges.edge3);
  var isEdge4Different = areEdgesDifferent(editedEdges.edge4, originalEdges.edge4);

  if (isEdge1Different) {
    // copy and translate 1 to 3
  } else if (isEdge3Different) {
    // copy and translate 3 to 1
  }

  if (isEdge2Different) {
    // copy and translate 2 to 4
  } else if (isEdge4Different) {
    // copy and translate 4 to 2
  }

  UI.alert('new edges', {isEdge1Different, isEdge2Different, isEdge3Different, isEdge4Different});
  // UI.alert('new edges', {editedEdges});

  return editedPath;
}

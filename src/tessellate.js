var UI = require('sketch/ui');
var parseSVG = require('svg-path-parser');
// M200,200 L300,200 L300,300 L200,300 L200,200 Z

// TODO: calculate corners using bounding box
var corner1 = {x: 200, y: 200};
var corner2 = {x: 300, y: 200};
var corner3 = {x: 300, y: 300};
var corner4 = {x: 200, y: 300};

function pathToEdges(path) {
  var parsedPath = parseSVG(path);

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
originalPath: string; previous path data for svg
newPath: string; new path data for svg

return: string; tessellate path data for svg
*/
export function tessellate(originalPath, editedPath) {
  var editedEdges = pathToEdges(editedPath);
  var originalEdges = pathToEdges(originalPath);

  // UI.alert('new edges', {editedEdges, originalEdges});


  return editedPath;
}

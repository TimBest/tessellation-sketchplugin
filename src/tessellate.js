var UI = require('sketch/ui');

// M200,200 L300,200 L300,300 L200,300 L200,200 Z

// TODO: calculate corners using bounding box
var corner1 = '200,200';
var corner2 = '300,200';
var corner3 = '300,300';
var corner4 = '200,300';

function pathToEdges(path) {
  var corner1Index = path.indexOf(corner1);
  var corner2Index = path.indexOf(corner2);
  var corner3Index = path.indexOf(corner3);
  var corner4Index = path.indexOf(corner4);

  var edge1 = path.substring(corner1Index, corner2Index + corner2.length);
  var edge2 = path.substring(corner2Index, corner3Index + corner3.length);
  var edge3 = path.substring(corner3Index, corner4Index + corner4.length);
  var edge4 = path.substring(corner4Index, path.length - 2);

  return { edge1, edge2, edge3, edge4 };
}

function getChangedEdge(originalPath, editedPath) {
  var editedEdges = pathToEdges(editedPath);
  var originalEdges = pathToEdges(originalPath);
  UI.alert('new edges', editedEdges);
  // UI.alert('new edges', {editedEdges, originalEdges});
}

/*
originalPath: string; previous path data for svg
newPath: string; new path data for svg

return: string; tessellate path data for svg
*/
export function tessellate(originalPath, editedPath) {
  var editedSide = getChangedEdge(originalPath, editedPath);
}

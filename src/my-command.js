var UI = require('sketch/ui');
var Document = require('sketch/dom').Document;
var Shape = require('sketch/dom').Shape;
var Rectangle = require('sketch/dom').Rectangle

// also exposed on Document

function getSelectedArtboards() {
  var document = Document.getSelectedDocument();
  var page = document.selectedPage;
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;

  if (selectedCount === 0) {
    return [];
  }

  var artboards = [];
  selectedLayers.forEach(function(layer) {
    if (layer.type === "Artboard") {
      artboards.push(layer);
    }
  });
  return artboards;
}


export default function() {
  var artboards = getSelectedArtboards();

  if (artboards.length === 0) {
    UI.message('No Artboard selected');
    return;
  }

  if (artboards.length > 1) {
    UI.message('Too many Artboards selected. Select a single Artboard');
    return;
  }

  var artboard = artboards[0];

  var artboardLayers = artboard.layers.map(function(item) {
    return item.sketchObject;
  });

  var frame = new Rectangle(0, 0, 100, 100);
  var shape = new Shape({
    name: 'my shape',
    frame: frame,
    style: {
      fills: ['#4A90E2']
    }
  });

  artboard.layers = artboardLayers.concat(shape);


}

var UI = require('sketch/ui');
var Utils = require('./utils');
var Settings = require('sketch/settings');

export function onActionHandler(context) {
  var oldSelection = context.actionContext.oldSelection;
  var name = oldSelection[0].name();

  if (name != 'testName') {
    // if name is in -> Settings.settingForKey('tesselations')
    return;
  }

   // var triangle = Utils.svgPathToBezierPath("M0,0L90 100 0 100z").path;
   // oldSelection[0].setName('trianlge');

   var path = oldSelection[0].bezierPath().svgPathAttribute()
   UI.alert("title", Settings.settingForKey('tesselations'));

  // UI.alert("title", shape);

  // var document = Document.getSelectedDocument();
  // var layers = document.getLayersNamed(name);


  // UI.alert("layers", layers[0]);

  // check if layers is length 1 and that selection is a tesselation layer
  // upldae layer with changes so that it can tessellate
  // context.actionContext.document.showMessage('edit?')
}

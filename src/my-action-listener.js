var UI = require('sketch/ui');
var Document = require('sketch/dom').Document;

export function onActionHandler(context) {
  // UI.alert("title", context);
  var oldSelection = context.actionContext.oldSelection;
  var name = oldSelection[0].name();

  if (name != 'my shape') {
    UI.message(`object ${name} not named my shape`);
    return;
  }

  var document = Document.getSelectedDocument();
  var layers = document.getLayersNamed(name);


  UI.alert("layers", layers[0].style.LineEnd);

  // UI.alert("layers", layers[0].name)
  // check if layers is length 1 and that selection is a tesselation layer
  // upldae layer with changes so that it can tessellate
  // context.actionContext.document.showMessage('edit?')
}

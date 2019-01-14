var UI = require('sketch/ui');
var Utils = require('./utils');
var Settings = require('sketch/settings');

function MSRectToSVGCommands(rect) {
  var x = rect.x();
  var y = rect.y();
  var w = rect.width();
  var h = rect.height();

  return `M ${x} ${y} h ${w} v ${h} H ${x} z`;
}

function squarePath(svgPath) {
  var name = 'boundingbox';

  var bezierPath = Utils.svgPathToBezierPath(svgPath).path;
  var shape = MSShapeGroup.shapeWithBezierPath(bezierPath);
  shape.setName(name);
  // `0` constant indicates that we need a `fill` part to be created
  var fill = shape.style().addStylePartOfType(0);
  fill.color = MSColor.colorWithRGBADictionary({r: 0, g: 0.8, b: 0.4, a: 1});
  return shape;
}

export function onActionHandler(context) {
  var oldSelection = context.actionContext.oldSelection;
  var name = oldSelection[0].name();

  if (name != 'testName') {
    // if name is in -> Settings.settingForKey('tesselations')
    return;
  }

   var newPath = oldSelection[0].bezierPath().svgPathAttribute();
   var oldPath = Settings.settingForKey('tesselations').path;
   if (newPath == oldPath) {
     return;
   }
   var boundingBox = MSRectToSVGCommands(oldSelection[0].frame());

   var currentParentGroup = Utils.getParentGroup(context.actionContext.document);
   currentParentGroup.addLayers([squarePath(boundingBox)]);
   // currentParentGroup.removeLayer(oldPath[0]);
}

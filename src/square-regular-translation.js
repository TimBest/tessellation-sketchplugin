var UI = require('sketch/ui');
var Settings = require('sketch/settings');
var Utils = require('./utils');


function squarePath() {
  var name = 'testName';
  var svgPath = "M200,200 L300,200 L300,300 L200,300 L200,200 Z";
  Settings.setSettingForKey(
    'tesselations',
    {
      name,
      path: svgPath
    }
  );

  var bezierPath = Utils.svgPathToBezierPath(svgPath).path;
  var shape = MSShapeGroup.shapeWithBezierPath(bezierPath);
  shape.setName(name);
  // `0` constant indicates that we need a `fill` part to be created
  var fill = shape.style().addStylePartOfType(0);
  fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 1});
  return shape;
}

export default function(context) {
  var shape = squarePath();
  var currentParentGroup = Utils.getParentGroup(context.document);
  currentParentGroup.addLayers([shape]);
}

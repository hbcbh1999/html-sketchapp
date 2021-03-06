import {generateID} from './helpers/utils';
import Base from './base';
import SymbolInstance from './symbolInstance';

class SymbolMaster extends Base {
  constructor({x, y}) {
    super();
    this._class = 'symbolMaster';
    this._x = x;
    this._y = y;
    this._symbolID = generateID();
  }

  getSymbolInstance({x, y, width, height}) {
    return new SymbolInstance({x, y, width, height, symbolID: this._symbolID});
  }

  addLayer(layer) {
    //position child layers relatively to the symbol layer
    layer._x -= this._x;
    layer._y -= this._y;

    super.addLayer(layer);
  }

  toJSON() {
    const obj = super.toJSON();
    let width = 0;
    let height = 0;

    // fit symbol size to its contents
    this._layers.forEach(layer => {
      const layerWidth = layer._x + layer._width;
      const layerHeight = layer._y + layer._height;

      if (width < layerWidth) {
        width = layerWidth;
      }
      if (height < layerHeight) {
        height = layerHeight;
      }
    });

    obj.frame = {
      '_class': 'rect',
      'constrainProportions': false,
      width,
      height,
      'x': this._x,
      'y': this._y
    };

    obj.style = {
      '_class': 'style',
      'endDecorationType': 0,
      'miterLimit': 10,
      'startDecorationType': 0
    };

    obj.horizontalRulerData = {
      '_class': 'rulerData',
      'base': 0,
      'guides': []
    };

    obj.verticalRulerData = {
      '_class': 'rulerData',
      'base': 0,
      'guides': []
    };

    obj.backgroundColor = {
      '_class': 'color',
      'alpha': 1,
      'blue': 1,
      'green': 1,
      'red': 1
    };

    obj.hasClickThrough = true;
    obj.includeInCloudUpload = true;
    obj.hasBackgroundColor = false;
    obj.includeBackgroundColorInExport = true;
    obj.resizesContent = false;
    obj.includeBackgroundColorInInstance = false;
    obj.symbolID = this._symbolID;
    obj.changeIdentifier = 0;

    return obj;
  }
}

export default SymbolMaster;

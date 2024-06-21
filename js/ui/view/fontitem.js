var FontItem = function(){this.initialize.apply(this, arguments);}
FontItem.prototype = toolBox.extend(new MenuItem(), {
    textFont : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _textFont) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'FontItem';
        this.textFont = _textFont;
        this.shapeFormat.textSize = 12;

        this.alive = true;
        this.registerDrawBuffer();
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.saveCurrentDrawingPoints();
    }
,   commandDoubleHit: function(_x, _y) {
        this.menuCommand();
        this.parentShape.save(); 
    }
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.text = _menuCommandName;
    }
});

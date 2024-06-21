var FontMenuItem = function(){this.initialize.apply(this, arguments);}
FontMenuItem.prototype = toolBox.extend(new MenuItem(), {
    initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _textFont) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'FontMenuItem';

        this.shapeFormat.textFont = _textFont;

        this.zoomable = true;

        this.alive = true;
    }
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.text = this.shapeFormat.textFont;
    }
});

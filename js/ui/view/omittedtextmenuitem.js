var OmittedTextMenuItem = function(){this.initialize.apply(this, arguments);}
OmittedTextMenuItem.prototype = toolBox.extend(new MenuItem(), {
    originalText    : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'OmittedTextMenuItem';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
    }
,   commandMouseOver: function() {
        this.changeMouseCursor();
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.w = this.containerShape.w - this.thisAndContainersWidthDiff;
        this.saveCurrentDrawingPoints();
        this.setOmittedText();
    }
,   setMenuCommand: function(_menuCommand, _menuCommandName) {
        this.menuCommand = _menuCommand;
        this.menuCommandName = _menuCommandName;
        this.originalText = _menuCommandName;
        this.setOmittedText();
    }
,   commandDoubleHit: function(_x, _y) {
        if (this.menuCommand) {
            this.menuCommand();
            this.parentShape.save(); 
        }
    }
,   setOmittedText: function() {
        var tempText = this.originalText;
        while (true) {
            if (tempText !== tempText.replace(/\n/,'')) {
                tempText = tempText.replace(/\n/,'');
            }
            else {
                break;
            }
        }
        var ctx = this.defaultLayer.ctx;
        this.text = '';
        for (var i=0;i<tempText.length;i++) {
            this.text = tempText.substring(0,i+1);
            ctx.font = this.shapeFormat.getFont(this.getParentZoom());
            if ((ctx.measureText(this.text).width + ctx.measureText('...........').width) > this.currentActualW) {
                this.text += '...';
                break;
            }
        }
        
    }
});

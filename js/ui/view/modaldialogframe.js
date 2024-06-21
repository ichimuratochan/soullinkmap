var ModalDialogFrame = function(){this.initialize.apply(this, arguments);}
ModalDialogFrame.prototype = toolBox.extend(new ViewFrame(), {
    isModalDialog   : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _maxButton, _closeButton) {
        ViewFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _maxButton, _closeButton]);
        if (_parentShape) {
            this.maxWidth = _parentShape.backGroundShape.w;
            this.maxHeight = _parentShape.backGroundShape.h;
        }
        this.classType = 'ModalDialogFrame';
        this.text = 'Modal Dialog';
    }
,   hit: function(_x, _y) {
        return true;
    }
,   commandSelect: function(_x, _y, _multiSelect) {
        if (this.alive === false || this.isVisible() === false) {
            this.backGroundShape.clearSelectedShapes();
            this.backGroundShape.registerSelectedShapesToDrawBuffer();
            return;
        }
        if (this.currentActualX <= _x && _x <= this.currentActualX2 &&
            this.currentActualY <= _y && _y <= this.currentActualY2) {
            this.select(_x, _y, _multiSelect);
        }
        else {
            this.unselect();
            this.registerDrawBuffer();
        }
    }
,   commandClose: function() {
        this.soulMaster.mainAction.closeAll();
    }
,   isResizable: function() {
        if (this.isMaximized && this.isMaximized() === true) {
            return false;
        }
        if (this.isMyFamilySelected() === false) {
            return false;
        }
        else {
            return true;
        }
    }
,   move: function(_moveX, _moveY) {
        if (this.isSelected() === true) {
            this.setActualX(this.currentActualX + _moveX);
            this.setActualY(this.currentActualY + _moveY);
            this.registerDrawBuffer();
        }
    }
,   centerize: function() {
        this.setActualX((this.backGroundShape.currentActualW / 2) - (this.currentActualW / 2));
        this.setActualY((this.backGroundShape.currentActualH / 2) - (this.currentActualH / 2));

        if (this.currentActualX < 0) {
            this.setActualX(0);
        }
        if (this.currentActualY < 0) {
            this.setActualY(0);
        }
        if (this.currentActualX2 > this.backGroundShape.currentActualW) {
            this.setActualX(this.backGroundShape.currentActualW - this.currentActualW);
        }
        if (this.currentActualY2 > this.backGroundShape.currentActualH) {
            this.setActualY(this.backGroundShape.currentActualH - this.currentActualH);
        }
    }
});

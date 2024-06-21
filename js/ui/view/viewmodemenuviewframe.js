var ViewModeMenuViewFrame = function(){this.initialize.apply(this, arguments);}
ViewModeMenuViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 116
,   minWidth    : 223
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _view) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, false, true]);
        this.classType = 'ViewModeMenuViewFrame';

        this.setActualW(this.minWidth);
        this.setActualH(this.minHeight);
        this.initializeFrameButtons();
        this.text = translator.t('');
        this.view = new ViewModeMenuView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + 1),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + 1),
            _view
        );
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.fillStyle = '#FFFFFF';
        this.shapeFormat.fillStyle = '#b0c4de';
//        this.shapeFormat.fillStyle = '#696969';
//        this.shapeFormat.textFillStyle = '#e6e6fa';

        this.alive = true;

        this.registerDrawBuffer();
    }
,   commandClose: function() {
        this.soulMaster.mainAction.closeAll();
    }
,   commandSelect: function(_x, _y, _multiSelect) {
        if (this.alive === false || this.isVisible() === false) {
            this.backGroundShape.clearSelectedShapes();
            this.backGroundShape.registerSelectedShapesToDrawBuffer();
            return;
        }
        this.select(_x, _y, _multiSelect);
        if (!(this.currentActualX <= _x && _x <= this.currentActualX2 &&
            this.currentActualY <= _y && _y <= this.currentActualY2)) {
            this.soulMaster.mainAction.closeAll();
        }
    }
});

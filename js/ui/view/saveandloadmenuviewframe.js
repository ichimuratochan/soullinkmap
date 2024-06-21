var SaveAndLoadMenuViewFrame = function(){this.initialize.apply(this, arguments);}
SaveAndLoadMenuViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 113
,   minWidth    : 293
,   fixedSize   : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, false, true]);
        this.classType = 'SaveAndLoadMenuViewFrame';
        this.text = translator.t('保存・読込メニュー');

        this.setActualW(this.minWidth);
        this.setActualH(this.minHeight);
        this.centerize();
        this.shapeFormat.fillStyle = '#696969';
        this.shapeFormat.textFillStyle = '#e6e6fa';

        this.view = new SaveAndLoadMenuView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH + 1),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1)
        );

        this.alive = true;

        this.registerDrawBuffer();
    }
,   commandClose: function() {
        this.soulMaster.mainAction.closeAll();
    }
});

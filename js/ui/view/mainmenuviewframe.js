var MainMenuViewFrame = function(){this.initialize.apply(this, arguments);}
MainMenuViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 233
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, false, true]);
        this.classType = 'MainMenuViewFrame';
        this.text = translator.t('メニュー');

        this.setActualW(this.minWidth);
        this.setActualH(this.minHeight);

        this.view = new MainMenuView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH + 1),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1)
        );

        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_VERTICAL);
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.fillStyle = '#FFFFFF';

        this.alive = true;

        this.registerDrawBuffer();
    }
,   commandClose: function() {
        this.soulMaster.mainAction.closeAll();
    }
});

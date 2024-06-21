var SelectedShapesMenuViewFrame = function(){this.initialize.apply(this, arguments);}
SelectedShapesMenuViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 250
,   minWidth    : 210
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, true]);
        this.classType = 'SelectedShapesMenuViewFrame';
        this.text = translator.t('選択中メニュー');

        this.setActualW(this.minWidth);
        this.setActualH(this.minHeight);

        this.view = new SelectedShapesMenuView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH + 1),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1)
        );
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_VERTICAL);

        this.alive = true;

        this.registerDrawBuffer();
    }
,   commandClose: function() {
        this.soulMaster.mainAction.closeAll();
    }
});

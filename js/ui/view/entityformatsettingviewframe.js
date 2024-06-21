var EntityFormatSettingViewFrame = function(){this.initialize.apply(this, arguments);}
EntityFormatSettingViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 233
,   minWidth    : 300
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _callBackTarget, _defaultShapeFormat, _arg1, _arg2, _arg3, _arg4, _arg5) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, false]);
        this.classType = 'EntityFormatSettingMenuViewFrame';
        this.text = translator.t('スタイル');

        this.setActualW(this.minWidth);
        this.setActualH(this.minHeight);
        this.centerize();

        this.view = new EntityFormatSettingView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH + 1),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1),
            _callBackTarget,
            _defaultShapeFormat,
            _arg1,
            _arg2,
            _arg3,
            _arg4,
            _arg5
        );

        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_OK);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CANCEL);

        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_VERTICAL);

        this.alive = true;

        this.registerDrawBuffer();
    }
,   callBackFromShapeTransferAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.onMoveToTop();
        this.visible = true;
        this.registerDrawBuffer();
        this.soulMaster.formatSettingBox = this;
    }
,   save: function() {
        this.view.save();
    }
,   cancel: function() {
        this.view.cancel();
    }
});

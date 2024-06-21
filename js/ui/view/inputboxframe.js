var InputBoxFrame = function(){this.initialize.apply(this, arguments);}
InputBoxFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 70
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _callBackTarget, _defaultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, false]);
        this.classType = 'InputBoxFrame';
        this.text = translator.t('URLを入力してF2で確定');

        if (!this.soulMaster) {
            return;
        }

        this.setActualW(this.soulMaster.backGroundShape.currentActualW * 4 / 5);
        this.setActualH(70);
        this.setActualX((this.soulMaster.backGroundShape.currentActualW / 2) - (this.currentActualW / 2));
        this.setActualY((this.soulMaster.backGroundShape.currentActualH / 2) - (this.currentActualH / 2));

        if (this.currentActualX < 0) {
            this.setActualX(0);
        }
        if (this.currentActualY < 0) {
            this.setActualY(0);
        }
        if (this.currentActualX2 > this.soulMaster.backGroundShape.currentActualW) {
            this.setActualX(this.soulMaster.backGroundShape.currentActualW - this.currentActualW);
        }
        if (this.currentActualY2 > this.soulMaster.backGroundShape.currentActualH) {
            this.setActualY(this.soulMaster.backGroundShape.currentActualH - this.currentActualH);
        }

        this.view = new InputBox(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1),
            _callBackTarget,
            _defaultText,
            _arg1,
            _arg2,
            _arg3,
            _arg4,
            _arg5
        );

        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_OK);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CANCEL);

        this.view.select(0, 0, false);

        this.alive = true;

        this.registerDrawBuffer();
    }
,   callBackFromShapeTransferAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.onMoveToTop();
        this.visible = true;
        this.registerDrawBuffer();
        this.soulMaster.inputBox = this;
    }
,   save: function() {
        this.view.save();
    }
,   cancel: function() {
        this.view.cancel();
        this.soulMaster.actionInProgress = false;
    }
});

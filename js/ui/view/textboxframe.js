var TextBoxFrame = function(){this.initialize.apply(this, arguments);}
TextBoxFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    initialize: function(_containerShape, _parentShape, _defaultLayer, _callBackTarget, _defaultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, false]);
        this.classType = 'TextBoxFrame';
        this.text = translator.t('入力してF2で確定');

        if (!this.soulMaster) {
            return;
        }

        if (_defaultText.length < 200) {
            this.setActualW(400);
            this.setActualH(200);
        }
        else {
            this.setActualW(800);
            this.setActualH(300);
        }
        this.centerize();

        this.view = new TextBox(
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

        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
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
        this.soulMaster.editTextBox = this;
    }
,   save: function() {
        this.view.save();
    }
,   cancel: function() {
        this.view.cancel();
        this.soulMaster.actionInProgress = false;
    }
});

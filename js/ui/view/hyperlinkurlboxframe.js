var HyperLinkUrlBoxFrame = function(){this.initialize.apply(this, arguments);}
HyperLinkUrlBoxFrame.prototype = toolBox.extend(new InputBoxFrame(), {
    hyperLinkUrlMode    : toolBox.HYPER_LINK_URL_MODE_NORMAL
,   hyperLinkJsonpDirectJumpFlag : '0'
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   backupShapeFormat   : null
,   checkBox            : null
,   checkBoxLabel       : null
,   minWidth            : 550
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _callBackTarget, _defaultHyperLinkUrl, _defaultHyperLinkUrlMode, _defaultHyperLinkJsonpDirectJumpFlag, _arg1, _arg2, _arg3, _arg4, _arg5) {
        InputBoxFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _callBackTarget, _defaultHyperLinkUrl, _arg1, _arg2, _arg3, _arg4, _arg5]);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CHANGE_URLMODE);
        var leftMostFrameButton = this.getLeftMostFrameButton();
        this.checkBox = new CheckBox(_containerShape, this, _defaultLayer, leftMostFrameButton.x - 30, leftMostFrameButton.y + 2, 16, 16);
        this.checkBox.syncPositionWithParentWidth = true;
        this.checkBox.setClickCommand(this.checkBoxChanged);
        this.checkBoxLabel = new Label(_containerShape, this, _defaultLayer, this.checkBox.x - 180, leftMostFrameButton.y, 180, leftMostFrameButton.h);
        this.checkBoxLabel.syncPositionWithParentWidth = true;
        this.checkBoxLabel.shapeFormat.textFillStyle = '#ffffff';
        this.checkBoxLabel.shapeFormat.textAlign = toolBox.TEXT_ALIGN_RIGHT;
        this.checkBoxLabel.text = translator.t('同一名称のSoulにジャンプ');

        this.hyperLinkUrlMode = _defaultHyperLinkUrlMode;
        this.hyperLinkJsonpDirectJumpFlag = _defaultHyperLinkJsonpDirectJumpFlag;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        this.shapeFormat.fillStyle = _callBackTarget.shapeFormat.fillStyle;
        this.shapeFormat.shapeType = _callBackTarget.shapeFormat.shapeType;
        this.shapeFormat.textFillStyle = _callBackTarget.shapeFormat.textFillStyle;

        this.backupShapeFormat = new ShapeFormat();
        this.backupShapeFormat.copyFrom(this.shapeFormat);

        this.setShapeFormat();
        if (this.hyperLinkJsonpDirectJumpFlag === '1') {
            this.checkBox.check();
        }
        else {
            this.checkBox.uncheck();
        }
        this.checkBox.clickCommand();

        this.classType = 'HyperLinkUrlBoxFrame';
        this.text = translator.t('URLを入力してF2で確定');
    }
,   checkBoxChanged: function() {
        if (this.checked === true) {
            this.parentShape.hyperLinkJsonpDirectJumpFlag = '1';
        }
        else {
            this.parentShape.hyperLinkJsonpDirectJumpFlag = '0';
        }
    }
,   changeUrlMode: function() {
        this.hyperLinkUrlMode++;
        if (this.hyperLinkUrlMode > toolBox.HYPER_LINK_URL_MODE_MAX) {
            this.hyperLinkUrlMode = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        }
        this.setShapeFormat();
    }
,   setShapeFormat: function() {
        if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
            this.text = translator.t('URLを入力してF2で確定');
            this.shapeFormat.copyFrom(this.backupShapeFormat);
            this.checkBox.visible = false;
            this.checkBoxLabel.visible = false;
            this.checkBox.checked = false;
            this.checkBox.clickCommand();
        }
        else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
            this.text = translator.t('URLを入力してF2で確定') + ' - ' + translator.t('JSONP');
            this.shapeFormat.fillStyle = toolBox.HYPER_LINK_JSONP_FILL_COLOR;
            this.shapeFormat.textFillStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
            this.checkBox.visible = true;
            this.checkBoxLabel.visible = true;
        }
        this.registerDrawBuffer();
    }
,   save: function() {
        this.callBackTarget.callBackFromHyperLinkUrlBox(this.view.getText(), this.hyperLinkUrlMode, this.hyperLinkJsonpDirectJumpFlag, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.soulMaster.mainAction.closeAll();
    }
});

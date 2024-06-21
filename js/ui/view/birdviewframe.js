var BirdViewFrame = function(){this.initialize.apply(this, arguments);}
BirdViewFrame.prototype = toolBox.extend(new ModalDialogFrame(), {
    minHeight   : 233
,   viewMode            : toolBox.VIEW_MODE_BIRDVIEW
,   viewStyleMode       : toolBox.VIEW_STYLE_MODE_ORIGINAL
,   viewImageMode       : toolBox.VIEW_IMAGE_MODE_ORIGINAL
,   birdViewParentStepCount : 5
,   birdViewChildStepCount  : 5
,   birdViewDirection       : toolBox.BIRDVIEW_DIRECTION_RIGHT
,   birdViewHorizontalSpace : 5
,   birdViewVerticalSpace   : 15
,   birdViewLevel           : toolBox.BIRDVIEW_LEVEL_NORMAL
,   viewOriginalShapeFormat : null
,   viewOriginalImageUrl    : ''
,   detailButton    : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _detailButton, _soulId) {
        ModalDialogFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, 0, 0, 0, 0, false, false]);
        this.classType = 'BirdViewFrame';
        this.text = translator.t('俯瞰ビュー');
        this.detailButton = _detailButton;

        this.setActualW(this.soulMaster.backGroundShape.w * 0.8);
        this.setActualH(this.soulMaster.backGroundShape.h * 0.8);
        this.setActualX(this.soulMaster.backGroundShape.w * 0.1);
        this.setActualY(this.soulMaster.backGroundShape.h * 0.1);

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

        var bodyId = '';
        var bodyRows = this.soulMaster.dataAccessAction.findBodiesBySoulId(_soulId);
        if (bodyRows.length > 0) {
            bodyId = bodyRows[0]['BODY_ID'];
        }

        this.view = new BirdView(
            this.containerShape,
            this,
            this.defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.SCROLL_BAR_WIDTH),
            bodyId
        );

        this.viewOriginalShapeFormat = new ShapeFormat();
        this.viewOriginalShapeFormat.copyFrom(this.view.shapeFormat);
        this.viewOriginalShapeFormat.fillStyle = this.soulMaster.targetBackGround.standardViewFormat.fillStyle;
        this.viewOriginalShapeFormat.textAlign = this.soulMaster.targetBackGround.standardViewFormat.textAlign;
        this.viewOriginalShapeFormat.textVerticalAlign = this.soulMaster.targetBackGround.standardViewFormat.textVerticalAlign;
        this.viewOriginalShapeFormat.textDescription = this.soulMaster.targetBackGround.standardViewFormat.textDescription;
        this.viewOriginalShapeFormat.textSize = this.soulMaster.targetBackGround.standardViewFormat.textSize;
        this.viewOriginalShapeFormat.textFont = this.soulMaster.targetBackGround.standardViewFormat.textFont;
        this.viewOriginalShapeFormat.textFillStyle = this.soulMaster.targetBackGround.standardViewFormat.textFillStyle;

        this.viewOriginalImageUrl = this.soulMaster.targetBackGround.standardViewImageUrl;

        this.view.shapeFormat.copyFrom(this.viewOriginalShapeFormat);
        this.view.setImageUrl('', false);
//        this.view.setImageUrl(this.viewOriginalImageUrl, true);

        this.view.showBodyData(true);

        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CLOSE);

        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_VERTICAL);
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_HORIZONTAL);
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_RESET);

        this.zoomable = true;
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].zoomable = true;
        }

        this.view.innerZoom = 0.8;
        this.view.adjustInnerOffsetToStartPosition();

        this.view.select(0, 0, false);
        
        this.alive = true;

        this.registerDrawBuffer();
    }
,   callBackFromShapeTransferAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.onMoveToTop();
        this.visible = true;
        this.registerDrawBuffer();
        this.soulMaster.detailBirdViewBox = this;
    }
,   cancel: function() {
        this.detailButton.select(0, 0, false);
        this.destroy();
    }
});

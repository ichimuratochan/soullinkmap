var FrameButton = function(){this.initialize.apply(this, arguments);}
FrameButton.prototype = toolBox.extend(new Shape(), {
    buttonType  : 0
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _buttonType) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        this.buttonType = _buttonType;
        this.syncPositionWithParentShape(true);
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);
        this.r = 3;
        this.classType = 'FrameButton';
        this.shapeFormat.textDescription = 'bold';
        this.shapeFormat.textSize = 10;
        this.shapeFormat.textFont = 'Arial';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.fillStyle = '#f5f5f5';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.drawShadow = false;
        this.globalAlpha = this.parentShape.globalAlpha;

        this.alive = true;
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        var frameButtonCount = 0;
        var thisFrameButtonIndex = 0;
        for (var i=0;i<this.parentShape.childShapes.length;i++) {
            if (this.parentShape.childShapes[i].classType === 'FrameButton') {
                frameButtonCount++;
                if (this.parentShape.childShapes[i] === this) {
                    thisFrameButtonIndex = frameButtonCount;
                }
            }
        }
        var thisFrameButtonIndexReverse = (frameButtonCount - thisFrameButtonIndex) + 1;

        if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CLOSE) {
            this.text = translator.t('閉じる');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_MAXIMIZE) {
            this.text = translator.t('最大');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE) {
            this.text = translator.t('戻る');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_OK) {
            this.text = translator.t('OK');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CANCEL) {
            this.text = translator.t('取消');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_VIEWMODE) {
            this.text = translator.t('ビュー');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_EXPORTMODE) {
            this.text = translator.t('切替');
        }
        else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_URLMODE) {
            this.text = translator.t('切替');
        }
        this.x = this.parentShape.getInnerW() - (toolBox.BORDER_SIZE + 1 + ((toolBox.FRAME_BUTTON1_WIDTH + 1) * thisFrameButtonIndexReverse));
        this.y = toolBox.BORDER_SIZE + 1;
        this.w = toolBox.FRAME_BUTTON1_WIDTH;
        this.h = toolBox.FRAME_BUTTON1_HEIGHT;

        this.saveCurrentDrawingPoints();
    }
,   commandDrop: function(_x, _y) {
        if (this.isSelected() && this.hit(_x, _y)) {
            if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CLOSE) {
                this.execute(toolBox.COMMAND_TYPE_CLOSE, 0, 0);
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_MAXIMIZE) {
                this.execute(toolBox.COMMAND_TYPE_MAXIMIZE, 0, 0);
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE) {
                this.execute(toolBox.COMMAND_TYPE_RESUME_SIZE, 0, 0);
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_OK) {
                this.commandOK();
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CANCEL) {
                this.commandCancel();
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_VIEWMODE) {
                this.commandChangeViewMode();
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_EXPORTMODE) {
                this.commandChangeExportMode();
            }
            else if (this.buttonType === toolBox.FRAME_BUTTON_TYPE_CHANGE_URLMODE) {
                this.commandChangeUrlMode();
            }
        }
    }
,   commandClose: function() {
        this.parentShape.commandClose();
    }
,   commandMaximize: function() {
        this.parentShape.maximize();
        this.buttonType = toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE;
        this.text = translator.t('戻る');
    }
,   commandResumeSize: function() {
        this.parentShape.resumeSize();
        this.buttonType = toolBox.FRAME_BUTTON_TYPE_MAXIMIZE;
        this.text = translator.t('最大');
    }
,   commandOK: function() {
        if (this.parentShape.save) {
            this.parentShape.save();
        }
    }
,   commandCancel: function() {
        if (this.parentShape.cancel) {
            this.parentShape.cancel();
        }
    }
,   commandChangeViewMode: function() {
        this.soulMaster.mainAction.createViewModeMenu(toolBox.savedMouseX, toolBox.savedMouseY, this.parentShape);
    }
,   commandChangeExportMode: function() {
        if (this.parentShape.changeExportMode) {
            this.parentShape.changeExportMode();
        }
    }
,   commandChangeUrlMode: function() {
        if (this.parentShape.changeUrlMode) {
            this.parentShape.changeUrlMode();
        }
    }
,   move: function() {
    }
,   select: function(_x, _y, _multiSelect) {
        this.zOrder.moveToTop();
        this.backGroundShape.clearSelectedShapes();
        this.backGroundShape.addSelectedShape(this);
        this.backGroundShape.adjustForMultiSelection();
        this.backGroundShape.registerSelectedShapesToDrawBuffer();
    }
,   addToArrayIfIsInRect: function(_array, _x, _y, _w, _h) {
    }
,   getEffectedShapes: function() {
        return toolBox.arrayWithout(this.parentShape.childShapes, this);
    }
,   drawRect: function(_ctx) {
        if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RECT) {
            _ctx.fillRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);
            if (this.hasNoImage() === false) {
                this.drawImage(_ctx);
            }
            _ctx.strokeRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);
            if (this.shapeFormat.drawShadow === true) {
                _ctx.lineWidth = this.shapeFormat.shadowStrokeLineWidth;
                _ctx.strokeStyle = this.shapeFormat.shadowStrokeStyle;
                _ctx.strokeLine(toolBox.tempX + toolBox.tempW, toolBox.tempY + 1, toolBox.tempX + toolBox.tempW, toolBox.tempY + toolBox.tempH);
                _ctx.strokeLine(toolBox.tempX + 1, toolBox.tempY + toolBox.tempH, toolBox.tempX + toolBox.tempW, toolBox.tempY + toolBox.tempH);
            }
        }
        else if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RRECT) {
            _ctx.fillRRectGrad(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR,this.shapeFormat.fillStyle,'#e6e6fa',//'#b0c4de', 
                               toolBox.tempX, toolBox.tempY + toolBox.tempH, toolBox.tempX + toolBox.tempW, toolBox.tempY);
//            _ctx.fillRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
            if (this.hasNoImage() === false) {
                this.drawImage(_ctx);
            }
            _ctx.strokeRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
            if (this.shapeFormat.drawShadow === true) {
                _ctx.lineWidth = this.shapeFormat.shadowStrokeLineWidth;
                _ctx.strokeStyle = this.shapeFormat.shadowStrokeStyle;
                toolBox.tempRect1.x = toolBox.tempX + toolBox.tempW;
                toolBox.tempRect1.y = toolBox.tempY + toolBox.tempR;
                toolBox.tempRect1.x2 = toolBox.tempX + toolBox.tempW;
                toolBox.tempRect1.y2 = toolBox.tempY + toolBox.tempH - toolBox.tempR;
                _ctx.strokeLine(toolBox.tempRect1.x, toolBox.tempRect1.y, toolBox.tempRect1.x2, toolBox.tempRect1.y2);
                toolBox.tempRect2.x = toolBox.tempX + toolBox.tempR;
                toolBox.tempRect2.y = toolBox.tempY + toolBox.tempH;
                toolBox.tempRect2.x2 = toolBox.tempX + toolBox.tempW - toolBox.tempR;
                toolBox.tempRect2.y2 = toolBox.tempY + toolBox.tempH;
                _ctx.strokeLine(toolBox.tempRect2.x, toolBox.tempRect2.y, toolBox.tempRect2.x2, toolBox.tempRect2.y2);
                _ctx.strokeCurveRightBottomCorner(toolBox.tempRect1.x2, toolBox.tempRect1.y2, toolBox.tempRect2.x2, toolBox.tempRect2.y2, toolBox.tempR);
            }
        }
    }
});

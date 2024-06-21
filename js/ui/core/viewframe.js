var ViewFrame = function(){this.initialize.apply(this, arguments);}
ViewFrame.prototype = toolBox.extend(new ResizableShape(), {
    view            : null
,   isViewFrame     : 1
,   minWidth        : (toolBox.BORDER_SIZE * 2) + 250
,   minHeight       : (toolBox.BORDER_SIZE * 2) + 100
,   changed         : false
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _maxButton, _closeButton) {
        ResizableShape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        if (!_parentShape) return;
        this.classType = 'ViewFrame';

        if (_maxButton === true) {
            new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
        }
        if (_closeButton === true) {
            new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CLOSE);
        }

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.textBaseline = 'top';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.strokeStyle = '#fafad2';
        this.shapeFormat.fillStyle = '#b0c4de';
        this.shapeFormat.textFillStyle = '#000000';
//        this.shapeFormat.fillStyle = '#696969';
//        this.shapeFormat.textFillStyle = '#e6e6fa';

        this.text = 'view';

    }
,   initializeFrameButtons: function() {
        var found = false;
        while (true) {
            found = false;
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].classType === 'FrameButton') {
                    found = true;
                    this.childShapes[i].destroy();
                    break;
                }
            }
            if (found === false) {
                break;
            }
        }
    }
,   getLeftMostFrameButton: function() {
        var leftMostFrameButton = null;
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].classType === 'FrameButton') {
                if (leftMostFrameButton === null) {
                    leftMostFrameButton = this.childShapes[i];
                }
                else if (this.childShapes[i].x < leftMostFrameButton.x) {
                    leftMostFrameButton = this.childShapes[i];
                }
            }
        }
        return leftMostFrameButton;
    }
,   getRightMostFrameButton: function() {
        var rightMostFrameButton = null;
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].classType === 'FrameButton') {
                if (rightMostFrameButton === null) {
                    rightMostFrameButton = this.childShapes[i];
                }
                else if (this.childShapes[i].x > rightMostFrameButton.x) {
                    rightMostFrameButton = this.childShapes[i];
                }
            }
        }
        return rightMostFrameButton;
    }
,   getViewMode: function() {
        return null;
    }
,   zoomIn: function(_x, _y) {
    }
,   zoomOut: function(_x, _y) {
    }
,   commandDoubleHit: function(_x, _y) {
        if (this.currentActualX <= _x && _x <= this.currentActualX2 &&
            this.currentActualY <= _y && _y <= this.currentActualY2) {
            if (!this.isMaximized()) {
                if (this.getButton(toolBox.FRAME_BUTTON_TYPE_MAXIMIZE)) {
                    this.getButton(toolBox.FRAME_BUTTON_TYPE_MAXIMIZE).commandMaximize();
                }
            }
            else {
                if (this.getButton(toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE)) {
                    this.getButton(toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE).commandResumeSize();
                }
            }
        }
    }
,   commandDrag: function(_x, _y) {
        if (!this.isMaximized()) {
            this.move(_x, _y);
        }
    }
,   isMaximized: function() {
        var resumeButton = this.getButton(toolBox.FRAME_BUTTON_TYPE_RESUME_SIZE);
        if (resumeButton !== null) {
            return true;
        }
        else {
            return false;
        }
    }
,   getButton: function(_buttonType) {
        var retButton = null
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].buttonType) {
                if (this.childShapes[i].buttonType === _buttonType) {
                    retButton = this.childShapes[i];
                }
            }
        }
        return retButton;
    }
,   innerDestroy: function() {
        if (this.backGroundShape.classType === 'MainBackGround') {
            toolBox.addToArray(this.backGroundShape.garbages, this);
        }
    }
,   afterDestroy: function() {
        this.soulMaster.showSoulMasterMenus();
        this.soulMaster.registerDrawBuffer();
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
//            _ctx.fillRRectGrad(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR,this.shapeFormat.fillStyle,'#b0c4de', 
//                               toolBox.tempX, toolBox.tempY + toolBox.tempH, toolBox.tempX + toolBox.tempW, toolBox.tempY);
            _ctx.fillRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
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
,   save: function() {
        this.view.save();
    }
,   cancel: function() {
        this.view.cancel();
    }
});

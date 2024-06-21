var TextBox = function(){this.initialize.apply(this, arguments);}
TextBox.prototype = toolBox.extend(new Shape(), {
    wDiff               : 0
,   hDiff               : 0
,   htmlTextAreaElement : null
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.wDiff = this.parentShape.w - this.w;
        this.hDiff = this.parentShape.h - this.h;
        this.classType = 'TextBox';
        this.shapeFormat.drawShadow = false;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        this.prepareTextBox();
        if (toolBox.isNullOrUndefined(_defaultText) === false) {
            this.setText(_defaultText);
        }
        else {
            this.setText('');
        }
        this.syncPositionWithParentShape(true);

        this.alive = true;
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        if (this.parentShape.currentActualX + ((this.wDiff * this.getParentZoom()) / 2) < 0) {
            this.setActualX(0);
            this.w = this.parentShape.w - (this.x + (this.wDiff / 2));
        }
        else {
            this.x = this.wDiff / 2;
            this.w = this.parentShape.w - this.wDiff;
        }
        this.h = this.parentShape.h - this.hDiff;
        this.saveCurrentDrawingPoints();
        if (this.backGroundShape.currentActualW - (this.currentActualX + 2) < this.currentActualW) {
            this.setActualW(this.backGroundShape.currentActualW - (this.currentActualX + 2));
        }
        if (this.backGroundShape.currentActualH - (this.currentActualY + 2) < this.currentActualH) {
            this.setActualH(this.backGroundShape.currentActualH - (this.currentActualY + 2));
        }
    }
,   move: function() {
    }
,   destroy: function() {
        this.alive = false;
        while (true) {
            if (this.childShapes.length > 0) {
                this.childShapes[0].destroy();
            }
            else {
                break;
            }
        }
        this.childShapes.length = 0;
        this.undockAllShapes();
        this.zOrder.destroy();
        if (this.parentShape) {
            if (this.parentShape.childShapes.length > 0) {
                this.parentShape.childShapes = toolBox.arrayWithout(this.parentShape.childShapes, this);
            }
            this.parentShape.registerDrawBufferWithoutChildren();
        }
        canvasManager.destroyTextAreaDiv(this.id);
//        this.htmlTextAreaElement.style.display = 'none';
//        this.htmlTextAreaElement.children[0].disabled = true;
        $('searchtext').focus();
        $('searchtext').blur();
        $('app_footer').focus();
//        document.activeElement = $('systemtoplayer');
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        this.syncPositionWithParentShape(true);
        toolBox.setTempPos(this, _drawLastPos);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        ctx.strokeRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH);
        if (this.currentActualX + 22 > this.backGroundShape.currentActualW ||
            this.currentActualX2 < 22 ||
            this.backGroundShape.currentActualH - this.currentActualY <= 15 ||
            this.currentActualY2 < 15) {
            this.htmlTextAreaElement.style.display = 'none';
        }
        else {
            this.htmlTextAreaElement.style.left = this.currentActualX + 'px';
            this.htmlTextAreaElement.style.top = this.currentActualY + 'px';
            this.htmlTextAreaElement.style.width = (this.currentActualW - 5) + 'px';
            this.htmlTextAreaElement.style.height = (this.currentActualH - 5) + 'px';
            if (this.isVisible() === true) {
                this.htmlTextAreaElement.style.display = 'block';
            }
            else {
                this.htmlTextAreaElement.style.display = 'none';
            }
        }
        this.htmlTextAreaElement.children[0].disabled = false;
        this.htmlTextAreaElement.children[0].focus();
    }
,   getText: function() {
        return this.htmlTextAreaElement.children[0].value;
    }
,   setText: function(_newText) {
        this.htmlTextAreaElement.children[0].value = _newText;
    }
,   prepareTextBox: function() {
        this.htmlTextAreaElement = canvasManager.createTextAreaDiv(this.id);
        this.htmlTextAreaElement.children[0].parentShape = this;
    }
,   save: function() {
        if (this.callBackTarget) {
            this.callBackTarget.callBackFromTextBox(this.getText(), this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        }
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
});

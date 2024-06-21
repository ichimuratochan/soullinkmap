var SpecialMenuItem = function(){this.initialize.apply(this, arguments);}
SpecialMenuItem.prototype = toolBox.extend(new MenuItem(), {
    imageMargin : 5
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        MenuItem.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'SpecialMenuItem';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.strokeLineWidth = 3;
        this.shapeFormat.textSize = 15;
        this.shapeFormat.fillStyle = '#000000';
        this.shapeFormat.textFillStyle = '#e6e6fa';
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
,   drawImage: function(_ctx) {
        if (this.hasNoImage() === true) {
            return;
        }
        toolBox.a = this.image.width / this.image.height;
        toolBox.b = toolBox.tempW / toolBox.tempH;
        if (toolBox.a > toolBox.b) {
            toolBox.tempRect1.w = toolBox.tempW;
            toolBox.tempRect1.h = toolBox.tempW / toolBox.a;
            toolBox.tempRect1.x = toolBox.tempX;
            toolBox.tempRect1.y = toolBox.tempY + ((toolBox.tempH - toolBox.tempRect1.h) / 2);
        }
        else {
            toolBox.tempRect1.h = toolBox.tempH;
            toolBox.tempRect1.w = toolBox.tempH * toolBox.a;
            toolBox.tempRect1.y = toolBox.tempY;
            toolBox.tempRect1.x = toolBox.tempX + ((toolBox.tempW - toolBox.tempRect1.w) / 2);;
        }
        try {
            _ctx.drawImage(
                this.image,
                toolBox.tempRect1.x + this.imageMargin,
                toolBox.tempRect1.y + this.imageMargin,
                toolBox.tempRect1.w - this.imageMargin * 2,
                toolBox.tempRect1.h - this.imageMargin * 2
            );
        }
        catch (e) {
            
        }
    }
});

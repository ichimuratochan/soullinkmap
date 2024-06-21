var ConnectionLine = function(){this.initialize.apply(this, arguments);}
ConnectionLine.prototype = toolBox.extend(new BaseObject(), {
    connectFromShape    : null
,   connectToShape      : null
,   line                : null
,   shapeFormat         : null
,   isMasterConnection  : true
,   initialize: function(_connectFromShape, _connectToShape, _isMasterConnection) {
        BaseObject.prototype.initialize.apply(this);
        this.connectFromShape = _connectFromShape;
        this.connectToShape = _connectToShape;
        this.isMasterConnection = _isMasterConnection;
        this.line = new Rect(0, 0, 0, 0);
        this.shapeFormat = new ShapeFormat();
        this.shapeFormat.fillStyle = '#008b8b';
        this.shapeFormat.strokeStyle = '#008b8b';
        this.shapeFormat.strokeLineWidth = 5;

        this.classType = 'Shape';

        this.alive = true;
    }
,   fadeConnection: function(_ctx, _fadeLastPos) {
        this.setPointOfLine(_fadeLastPos);
        if (toolBox.rectHitRect(
                toolBox.tempRect1.x, toolBox.tempRect1.y, toolBox.tempRect1.x2, toolBox.tempRect1.y2,
                toolBox.tempRect2.x, toolBox.tempRect2.y, toolBox.tempRect2.x2, toolBox.tempRect2.y2
            ) === true) {
            return;
        }
        _ctx.strokeStyle = toolBox.FADE_FILL_COLOR;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth * this.connectToShape.getActualZoom();
        _ctx.beginPath();
        _ctx.moveTo(this.line.x, this.line.y);
        _ctx.lineTo(this.line.x2, this.line.y2);
        _ctx.closePath();
        _ctx.stroke();
        _ctx.beginPath();
        if (this.isMasterConnection === null) {
            toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x, this.line.y, this.line.x2, this.line.y2);
            _ctx.beginPath();
            _ctx.moveTo(this.line.x2 - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x2 - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x2, this.line.y2);
            _ctx.closePath();
            _ctx.fill();
            toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x2, this.line.y2, this.line.x, this.line.y);
            _ctx.beginPath();
            _ctx.moveTo(this.line.x - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x, this.line.y);
            _ctx.closePath();
            _ctx.fill();
//            _ctx.arc(this.line.x2, this.line.y2, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
//            _ctx.arc(this.line.x, this.line.y, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
        }
        else {
            if (this.isMasterConnection === true) {
                toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x, this.line.y, this.line.x2, this.line.y2);
                _ctx.beginPath();
                _ctx.moveTo(this.line.x2 - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x2 - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x2, this.line.y2);
                _ctx.closePath();
                _ctx.fill();
//                _ctx.arc(this.line.x2, this.line.y2, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
            }
            else {
                toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x2, this.line.y2, this.line.x, this.line.y);
                _ctx.beginPath();
                _ctx.moveTo(this.line.x - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x, this.line.y);
                _ctx.closePath();
                _ctx.fill();
//                _ctx.arc(this.line.x, this.line.y, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
            }
        }
        _ctx.fillStyle = toolBox.FADE_FILL_COLOR;
        _ctx.fill();
    }
,   drawConnection: function(_ctx, _drawLastPos) {
        this.setPointOfLine(_drawLastPos);
        if (toolBox.rectHitRect(
                toolBox.tempRect1.x, toolBox.tempRect1.y, toolBox.tempRect1.x2, toolBox.tempRect1.y2,
                toolBox.tempRect2.x, toolBox.tempRect2.y, toolBox.tempRect2.x2, toolBox.tempRect2.y2
            ) === true) {
            return;
        }
        _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth * this.connectToShape.getActualZoom();
        _ctx.beginPath();
        _ctx.moveTo(this.line.x, this.line.y);
        _ctx.lineTo(this.line.x2, this.line.y2);
        _ctx.closePath();
        _ctx.stroke();
        _ctx.strokeStyle = toolBox.FADE_FILL_COLOR;
        _ctx.lineWidth = (this.shapeFormat.strokeLineWidth - 2) * this.connectToShape.getActualZoom();
        _ctx.stroke();
        _ctx.fillStyle = this.shapeFormat.strokeStyle;
        if (this.isMasterConnection === null) {
            toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x, this.line.y, this.line.x2, this.line.y2);
            _ctx.beginPath();
            _ctx.moveTo(this.line.x2 - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x2 - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x2, this.line.y2);
            _ctx.closePath();
            _ctx.fill();
            toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x2, this.line.y2, this.line.x, this.line.y);
            _ctx.beginPath();
            _ctx.moveTo(this.line.x - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
            _ctx.lineTo(this.line.x, this.line.y);
            _ctx.closePath();
            _ctx.fill();
//            _ctx.arc(this.line.x2, this.line.y2, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
//            _ctx.arc(this.line.x, this.line.y, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
        }
        else {
            if (this.isMasterConnection === true) {
                toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x, this.line.y, this.line.x2, this.line.y2);
                _ctx.beginPath();
                _ctx.moveTo(this.line.x2 - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x2 - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y2 - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x2, this.line.y2);
                _ctx.closePath();
                _ctx.fill();
//            _ctx.arc(this.line.x2, this.line.y2, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
            }
            else {
                toolBox.calcArrowsFeetPointAndSetTempPos(this.line.x2, this.line.y2, this.line.x, this.line.y);
                _ctx.beginPath();
                _ctx.moveTo(this.line.x - (toolBox.tempX * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x - (toolBox.tempX2 * this.connectToShape.getActualZoom()), this.line.y - (toolBox.tempY2 * this.connectToShape.getActualZoom()));
                _ctx.lineTo(this.line.x, this.line.y);
                _ctx.closePath();
                _ctx.fill();
//            _ctx.arc(this.line.x, this.line.y, _ctx.lineWidth * 1.7, 0, Math.PI*2, false);
            }
        }
    }
,   setPointOfLine: function(_lastPos) {
        toolBox.setTempPos(this.connectFromShape, _lastPos);
        toolBox.tempRect1.x = toolBox.tempX;
        toolBox.tempRect1.y = toolBox.tempY;
        toolBox.tempRect1.x2 = toolBox.tempX + toolBox.tempW;
        toolBox.tempRect1.y2 = toolBox.tempY + toolBox.tempH;
        toolBox.setTempPos(this.connectToShape, _lastPos);
        toolBox.tempRect2.x = toolBox.tempX;
        toolBox.tempRect2.y = toolBox.tempY;
        toolBox.tempRect2.x2 = toolBox.tempX + toolBox.tempW;
        toolBox.tempRect2.y2 = toolBox.tempY + toolBox.tempH;
        this.line = toolBox.createLineFromTwoRect(toolBox.tempRect1, toolBox.tempRect2);
    }
,   destroy: function() {
        this.connectFromShape.connectionLines = toolBox.arrayWithout(this.connectFromShape.connectionLines, this);
        toolBox.clean(this);
/*
        this.connectFromShape = null;
        this.connectToShape = null;
        this.line = null;
*/
    }
});

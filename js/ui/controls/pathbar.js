var PathBar = function(){this.initialize.apply(this, arguments);}
PathBar.prototype = toolBox.extend(new Shape(), {
    oneBodyTextLength   : 200
,   path                : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer) {
        if (!_parentShape) return;
        this.parentShape = _parentShape;
        this.syncPositionWithParentShape(true);
        Shape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, this.x, this.y, this.w, this.h]);
        this.r = 5;
        this.classType = 'PathBar';

        this.shapeFormat.textDescription = 'bold';
        this.shapeFormat.textSize = 10;
        this.shapeFormat.textFont = 'Arial';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
        this.shapeFormat.textFillStyle = '#a9a9a9';
        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.selectedStrokeStyle = '#d3d3d3';
        this.shapeFormat.fillStyle = '#f8f8ff';
        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.drawShadow = false;
        this.text = ' ';

        this.alive = true;
    }
,   commandDoubleHit: function(_x, _y) {
        this.soulMaster.selectedShapesAction.surfaceFromCurrentBody();
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.x = toolBox.BORDER_SIZE + 1;
        this.y = toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1;
        this.w = this.parentShape.w - ((toolBox.BORDER_SIZE + 1) * 2);
        this.h = toolBox.PATH_BAR_HEIGHT;
        this.saveCurrentDrawingPoints();
    }
,   showPathData: function(_bodyId) {
        var pathList = new Array();
        this.getParentBodyPathRecursive(_bodyId, pathList);
        this.path = ' ';
        for (var i=0;i<pathList.length;i++) {
            if (i === 0) {
                this.path = this.getOmittedBodyTextByBodyId(pathList[i]);
            }
            else {
                this.path = this.getOmittedBodyTextByBodyId(pathList[i]) + ' > ' + this.path;
            }
        }
        this.registerDrawBuffer();
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        this.text = this.path;
        ctx.font = this.shapeFormat.getFont(this.getParentZoom());
        for (var i=this.text.length;i>0;i--) {
            if (ctx.measureText(this.text).width <= toolBox.tempW) {
                break;
            }
            this.text = this.text.substr(1);
        }
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);
        this.drawText(ctx);
    }
,   getParentBodyPathRecursive: function(_bodyId, _pathList) {
        var row = this.soulMaster.dataAccessAction.findBodyById(_bodyId);
        if (row !== null) {
            var parentBodyRow = this.soulMaster.dataAccessAction.findBodyById(row['PARENT_BODY_ID']);
            if (parentBodyRow !== null) {
                toolBox.addToArray(_pathList, parentBodyRow);
                this.getParentBodyPathRecursive(parentBodyRow['BODY_ID'], _pathList);
            }
        }
    }
,   getOmittedBodyTextByBodyId: function(_bodyRow) {
        var tempText = this.soulMaster.dataAccessAction.getTextOfBodyById(_bodyRow['BODY_ID']).replace(/[\n\r]/g,"");
        var text = '';
        var ctx = this.defaultLayer.ctx;
        if (toolBox.trim(tempText) === '') {
            if (_bodyRow['LINK_FLAG'] === '1') {
                text = toolBox.DEFAULT_TEXT_LINK;
            }
            else {
                text = toolBox.DEFAULT_TEXT_BODY;
            }
        }
        else {
            for (var i=0;i<tempText.length;i++) {
                text = tempText.substring(0,i+1);
                ctx.font = this.shapeFormat.getFont(this.getParentZoom());
                if ((ctx.measureText(text).width + ctx.measureText('...........').width) > this.oneBodyTextLength) {
                    text += '...';
                    break;
                }
            }
        }
        return text;
    }
,   move: function() {
    }
,   getEffectedShapes: function() {
        return toolBox.arrayWithout(this.parentShape.childShapes, this);
    }
});

var Shape = function(){this.initialize.apply(this, arguments);}
Shape.prototype = toolBox.extend(new BaseObject(), {
    parentShape         : null
,   childShapes         : null
,   dockedShapeInfos    : null
,   ioJobController     : null
,   soulMaster          : null
,   backGroundShape     : null
,   containerShape      : null
,   defaultLayer        : null
,   zOrder              : null
,   minWidth            : toolBox.SHAPE_WIDTH_MIN
,   minHeight           : toolBox.SHAPE_HEIGHT_MIN
,   maxWidth            : toolBox.SHAPE_WIDTH_MAX
,   maxHeight           : toolBox.SHAPE_HEIGHT_MAX
,   x                   : 0
,   y                   : 0
,   w                   : 0
,   h                   : 0
,   r                   : 0
,   currentActualX      : 0
,   currentActualY      : 0
,   currentActualW      : 0
,   currentActualH      : 0
,   currentActualX2     : 0
,   currentActualY2     : 0
,   currentActualR      : 0
,   lastActualX         : 0
,   lastActualY         : 0
,   lastActualW         : 0
,   lastActualH         : 0
,   lastActualX2        : 0
,   lastActualY2        : 0
,   lastActualR         : 0
,   savedActualX        : 0
,   savedActualY        : 0
,   savedActualW        : 0
,   savedActualH        : 0
,   savedActualX2       : 0
,   savedActualY2       : 0
,   savedActualR        : 0
,   innerOffsetX        : 0
,   innerOffsetY        : 0
,   innerZoom           : 1
,   resumeX             : 0
,   resumeY             : 0
,   resumeW             : 0
,   resumeH             : 0
,   skylightRects       : null
,   alreadyDrawn        : false
,   zoomable            : false
,   shapeFormat         : null
,   globalAlpha         : 1
,   image               : null
,   imageUrl            : ''
,   imageNotAvailable   : false
,   text                : ''
,   text2               : ''
,   defaultText         : ''
,   visible             : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        BaseObject.prototype.initialize.apply(this);
        this.shapeFormat = new ShapeFormat();
        this.classType = 'Shape';
        this.childShapes = new Array();
        this.dockedShapeInfos = new Array();
        this.containerShape = _containerShape;
        this.parentShape = _parentShape;
        this.defaultLayer = _defaultLayer;
        if (this.parentShape) {
            this.ioJobController = this.parentShape.ioJobController;
            this.backGroundShape = this.parentShape.backGroundShape;
            this.soulMaster = this.backGroundShape.soulMaster;
            var topZorderShape = null;
            if (this.parentShape.childShapes.length > 0) {
                topZorderShape = this.parentShape.childShapes[0].zOrder.getTopShape();
            }
            this.zOrder = new ZOrder(this, topZorderShape);
            toolBox.addToArray(this.parentShape.childShapes, this);
        }
        else {
            this.zOrder = new ZOrder(this, null);
            this.parentShape = null;
        }
        if (_x) this.x = _x;
        if (_y) this.y = _y;
        if (_w) this.w = _w;
        if (_h) this.h = _h;
        this.r = toolBox.RRECT_RADIUS_SIZE;
        this.image = new Image();
        this.image.parentShape = this;
        this.saveCurrentDrawingPoints();
        this.saveLastDrawingPoints();
    }
,   execute: function(_commandType, _x, _y) {
        if (_commandType === toolBox.COMMAND_TYPE_DIVE_OR_EDIT) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                if (this.isSelected() === false) {
                    this.commandSelect(_x, _y, false);
                }
                this.commandDoubleHit(_x, _y);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_MOUSE_OVER) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandMouseOver(_x, _y);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_SELECT) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandSelect(_x, _y, false);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_MULTI_SELECT) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandSelect(_x, _y, true);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_DRAG) {
            if (this.isSelected()) {
                this.commandDrag(_x, _y);
                return this;
            }
            else {
                return null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_DROP) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandDrop(_x, _y);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_VIRTUAL_DROP) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandVirtualDrop(_x, _y);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_CLOSE) {
            this.commandClose();
            return this;
        }
        else if (_commandType === toolBox.COMMAND_TYPE_MAXIMIZE) {
            this.commandMaximize();
            return this;
        }
        else if (_commandType === toolBox.COMMAND_TYPE_RESUME_SIZE) {
            this.commandResumeSize();
            return this;
        }
        else if (_commandType === toolBox.COMMAND_TYPE_ZOOM_IN) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandZoomIn(_x, _y);
                return this;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_ZOOM_OUT) {
            if (this.hit(_x, _y) === false) {
                return null;
            }
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.commandZoomOut(_x, _y);
                return this;
            }
        }
        else {
            throw new Error('実装されていません。');
        }
    }
,   commandMouseOver: function(_x, _y) {
        this.changeMouseCursor();
    }
,   commandClose: function() {
        this.destroy();
    }
,   commandMaximize: function() {
        this.maximize();
    }
,   commandResumeSize: function() {
        this.resumeSize();
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   commandSelect: function(_x, _y, _multiSelect) {
        this.select(_x, _y, _multiSelect);
    }
,   commandDrag: function(_moveX, _moveY) {
        this.move(_moveX, _moveY);
    }
,   commandDrop: function(_x, _y) {
/*
        if (this.containerShape) {
            this.containerShape.registerDrawBuffer();
        }
        else {
            this.backGroundShape.registerDrawBuffer();
        }
*/
    }
,   commandVirtualDrop: function(_x, _y) {
    }
,   commandZoomIn: function(_x, _y) {
        this.zoomIn(_x, _y);
    }
,   commandZoomOut: function(_x, _y) {
        this.zoomOut(_x, _y);
    }
,   changeMouseCursor: function() {
        this.ioJobController.setMouseCursor('default');
    }
,   maximize: function() {
        this.resumeX = this.x;
        this.resumeY = this.y;
        this.resumeW = this.w;
        this.resumeH = this.h;
        this.setActualX(0);
        this.setActualY(0);
        this.setActualW(this.parentShape.currentActualW);
        this.setActualH(this.parentShape.currentActualH);
        this.registerDrawBuffer();
    }
,   resumeSize: function() {
        this.x = this.resumeX;
        this.y = this.resumeY;
        this.w = this.resumeW;
        this.h = this.resumeH;
        this.parentShape.registerDrawBuffer();
    }
,   destroy: function() {
        this.alive = false;
        this.innerDestroy();
        while (true) {
            if (this.childShapes.length > 0) {
                this.childShapes[0].destroy();
            }
            else {
                break;
            }
        }
        if (this.image && this.image.parentShape) {
            this.image.parentShape = null;
        }
        this.image.src = null;
        this.childShapes.length = 0;
        this.undockAllShapes();
        this.zOrder.destroy();
        if (this.parentShape) {
            if (this.parentShape.childShapes.length > 0) {
                this.parentShape.childShapes = toolBox.arrayWithout(this.parentShape.childShapes, this);
            }
            this.parentShape.registerDrawBufferWithoutChildren();
        }
        this.afterDestroy();
    }
,   innerDestroy: function() {
    }
,   afterDestroy: function() {
    }
,   clean: function() {
        if (this.childShapes) {
            for (var i=0;i<this.childShapes.length;i++) {
                this.childShapes[i].clean();
            }
        }
        toolBox.clean(this);
    }
,   move: function(_moveX, _moveY) {
        this.setActualX(this.currentActualX + _moveX);
        this.setActualY(this.currentActualY + _moveY);
        this.registerDrawBufferWithoutChildren();
        this.syncDockedShapePosition(true);
    }
,   tooSmallForActualSize: function(_width, _height) {
        if (_width < this.minWidth * this.getParentZoom() || _height < this.minHeight * this.getParentZoom()) {
            return true;
        }
        else {
            return false;
        }
    }
,   addToArrayIfIsInRect: function(_array, _x, _y, _w, _h) {
        if (toolBox.rectContainsRect(
            _x,
            _y,
            _x + _w,
            _y + _h,
            this.currentActualX,
            this.currentActualY,
            this.currentActualX2,
            this.currentActualY2
            ) === true
        ) {
            if (this.isVisible() === true) {
                toolBox.addToArray(_array, this);
            }
        }
        else {
            for (var i=0;i<this.childShapes.length;i++) {
                this.childShapes[i].addToArrayIfIsInRect(_array, _x, _y, _w, _h);
            }
        }
    }
,   hit: function(_x, _y) {
        if (this.alive === false || this.isVisible() === false) {
            return false;
        }
        if (this.currentActualX <= _x && _x <= this.currentActualX2 &&
            this.currentActualY <= _y && _y <= this.currentActualY2) {
            return true;
        }
        else {
            return false;
        }
    }
,   findHitChild: function(_x, _y) {
        var retShape = null;
        if (this.childShapes.length > 0) {
            retShape = this.childShapes[0].zOrder.getTopShape();
            var found = false;
            while (true) {
                if (retShape.hit(_x, _y)) {
                    found = true;
                    break;
                }
                else {
                    if (retShape.zOrder.nextLowerShape === null) {
                        break;
                    }
                    else {
                        retShape = retShape.zOrder.nextLowerShape;
                    }
                }
            }
            if (found === false) {
                retShape = null;
            }
        }
        return retShape;
    }
,   findParentContainer: function() {
        var curShape = this;
        while (true) {
            if (curShape.isContainerShape) {
                return curShape;
            }
            curShape = curShape.parentShape;
            if (curShape === null) {
                return null;
            }
        }
    }
,   select: function(_x, _y, _multiSelect) {
        this.zOrder.moveToTop();
        if (_multiSelect === true && this.isSelected() === true) {
            this.backGroundShape.removeSelectedShape(this);
        }
        else {
            if (_multiSelect === false && !this.isSelected()) {
                this.backGroundShape.clearSelectedShapes();
            }
            this.backGroundShape.addSelectedShape(this);
        }
        this.backGroundShape.adjustForMultiSelection();
        this.backGroundShape.registerSelectedShapesToDrawBuffer();
    }
,   unselect: function() {
        this.backGroundShape.removeSelectedShape(this);
    }
,   isResizable: function() {
        if (this.isMaximized && this.isMaximized() === true) {
            return false;
        }
    }
,   onMoveToTop: function() {
        this.syncDockedShapePosition(false);
    }
,   onDropFromTop: function() {
    }
,   zoomIn: function(_x, _y) {
        if (this.zoomable === false) {
            return;
        }
        var parentContainer = this.findParentContainer();
        if (parentContainer !== null) {
            parentContainer.zoomIn(_x, _y);
        }
    }
,   zoomOut: function(_x, _y) {
        if (this.zoomable === false) {
            return;
        }
        var parentContainer = this.findParentContainer();
        if (parentContainer !== null) {
            parentContainer.zoomOut(_x, _y);
        }
    }
,   isSelected: function() {
        return this.backGroundShape.isSelectedShape(this);
    }
,   isMyFamilySelected: function() {
        if (this.isSelected() === true) {
            return true;
        }
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isSelected() === true) {
                return true;
            }
        }
        return false;
    }
,   zOrderSort: function(_targetShapes, _sortedShapes) {
        for (var i=0;i<_targetShapes.length;i++) {
            if (this === _targetShapes[i]) {
                toolBox.addToArray(_sortedShapes, this);
                break;
            }
        }
        if (this.childShapes.length > 0) {
            var curShape = this.childShapes[0].zOrder.getBottomShape();
            while (true) {
                curShape.zOrderSort(_targetShapes, _sortedShapes);
                curShape = curShape.zOrder.nextHigherShape;
                if (curShape === null) {
                    break;
                }
            }
        }
    }
,   getZOrderSortedAllShapes: function(_sortedShapes) {
        toolBox.addToArray(_sortedShapes, this);
        if (this.childShapes.length > 0) {
            var curShape = this.childShapes[0].zOrder.getBottomShape();
            while (true) {
                curShape.getZOrderSortedAllShapes(_sortedShapes);
                curShape = curShape.zOrder.nextHigherShape;
                if (curShape === null) {
                    break;
                }
            }
        }
    }
,   getGenerationLevelFromBackGroundShape: function() {
        if (this === this.backGroundShape) {
            return 0;
        }
        var level = 0;
        var tempShape = this;
        while (true) {
            level++;
            if (tempShape.parentShape === this.backGroundShape) {
                break;
            }
            tempShape = tempShape.parentShape;
        }
        return level;
    }
,   getMyFamilyLineByGenerationLevel: function(_level) {
        var myLevel = this.getGenerationLevelFromBackGroundShape();
        if (myLevel <= _level) {
            return this;
        }
        else if (_level <= 0) {
            return this.backGroundShape;
        }
        var tempShape = this;
        for (var i=1;i<=myLevel-_level;i++) {
            if (tempShape.parentShape) {
                tempShape = tempShape.parentShape;
            }
        }
        return tempShape;
    }
,   registerDrawBuffer: function() {
        if (!this.ioJobController) {
            return;
        }
        this.ioJobController.registerDrawShape(this);
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].syncPositionWithParentShape(true);
        }
    }
,   registerDrawBufferWithoutChildren: function() {
        this.ioJobController.registerDrawShape(this);
    }
,   syncPositionWithParentShape: function(_syncRecursive) {
        this.saveCurrentDrawingPoints();
        if (_syncRecursive === true) {
            for (var i=0;i<this.childShapes.length;i++) {
                this.childShapes[i].syncPositionWithParentShape(_syncRecursive);
            }
        }
    }
,   getParentZoom: function() {
        if (this.parentShape !== null) {
            return this.parentShape.getActualZoom();
        }
        else {
            return 1;
        }
    }
,   getActualZoom: function() {
        return this.getParentZoom() * this.innerZoom;
    }
,   getActualInnerOffsetX: function() {
        return this.innerOffsetX * this.getActualZoom()
    }
,   getActualInnerOffsetY: function() {
        return this.innerOffsetY * this.getActualZoom()
    }
,   setActualX: function(_x) {
        if (this.parentShape !== null) {
            this.x = (_x - (this.parentShape.currentActualX + this.parentShape.getActualInnerOffsetX())) / this.getParentZoom();
        }
        else {
            this.x = _x;
        }
        this.saveCurrentDrawingPoints();
    }
,   setActualY: function(_y) {
        if (this.parentShape !== null) {
            this.y = (_y - (this.parentShape.currentActualY + this.parentShape.getActualInnerOffsetY())) / this.getParentZoom();
        }
        else {
            this.x = _y;
        }
        this.saveCurrentDrawingPoints();
    }
,   setActualW: function(_w) {
        if (_w > this.maxWidth) {
            _w = this.maxWidth;
        }
        this.w = _w / this.getParentZoom();
        this.saveCurrentDrawingPoints();
    }
,   setActualH: function(_h) {
        if (_h > this.maxHeight) {
            _h = this.maxHeight;
        }
        this.h = _h / this.getParentZoom();
        this.saveCurrentDrawingPoints();
   }
,   setActualR: function(_r) {
        this.r = _r / this.getParentZoom();
        this.saveCurrentDrawingPoints();
    }
,   setActualInnerOffsetX: function(_innerOffsetX) {
        this.innerOffsetX = _innerOffsetX / this.getActualZoom();
    }
,   setActualInnerOffsetY: function(_innerOffsetY) {
        this.innerOffsetY = _innerOffsetY / this.getActualZoom();
    }
,   getInnerW: function() {
        return this.w * this.innerZoom;
    }
,   getInnerH: function() {
        return this.h * this.innerZoom;
    }
,   isOutOfSight: function() {
        if (this.containerShape) {
            if (this.currentActualX > this.containerShape.currentActualX2 ||
                this.currentActualY > this.containerShape.currentActualY2 ||
                this.currentActualX2 < this.containerShape.currentActualX ||
                this.currentActualY2 < this.containerShape.currentActualY) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
,   isVisible: function() {
        if (this.visible === false) {
            return false;
        }
        if (this.parentShape) {
            if (this.parentShape.isVisible() === false) {
                return false;
            }
        }
        if (this.containerShape) {
            if (this.containerShape.isOutOfSight() === true) {
                return false;
            }
            else {
                if (this.isOutOfSight() === true) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
,   draw: function(_ctx, _drawLastPos) {
logger.put('shape ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
            toolBox.clean(this);
            return;
        }
        if (this.isVisible() === true) {
            if (this.containerShape) {
                this.containerShape.startClip(this.getCtx(_ctx), _drawLastPos);
            }
            this.innerDraw(this.getCtx(_ctx), _drawLastPos);
            if (this.containerShape) {
                this.containerShape.endClip(this.getCtx(_ctx));
            }
        }
        var zOrderSortedShapes = new Array();
        this.zOrderSort(this.childShapes, zOrderSortedShapes);
        for (var i=0;i<zOrderSortedShapes.length;i++) {
            zOrderSortedShapes[i].draw(this.getCtx(_ctx), _drawLastPos);
        }
    }
,   draw2: function(_ctx) {
        this.innerDraw(_ctx, false);
        var zOrderSortedShapes = new Array();
        this.zOrderSort(this.childShapes, zOrderSortedShapes);
        for (var i=0;i<zOrderSortedShapes.length;i++) {
            zOrderSortedShapes[i].draw2(_ctx);
        }
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        this.beforeInnerDraw(ctx, _drawLastPos);
        if (this.globalAlpha !== 1) {
            ctx.save();
            ctx.globalAlpha = this.globalAlpha;
        }
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);
        this.drawText(ctx);
        if (this.globalAlpha !== 1) {
            ctx.restore();
        }
        this.afterInnerDraw(ctx, _drawLastPos);
    }
,   beforeInnerDraw: function(_ctx, _drawLastPos) {
    }
,   afterInnerDraw: function(_ctx, _drawLastPos) {
    }
,   prepareInnerDraw: function(_ctx) {
        if (this.isSelected()) {
            _ctx.strokeStyle = this.shapeFormat.selectedStrokeStyle;
        }
        else {
            _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        }
        _ctx.fillStyle = this.shapeFormat.fillStyle;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
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
            _ctx.drawImage(this.image, toolBox.tempRect1.x, toolBox.tempRect1.y, toolBox.tempRect1.w, toolBox.tempRect1.h);
        }
        catch (e) {
            
        }
    }
,   drawText: function(_ctx) {
        _ctx.textBaseline = this.shapeFormat.textBaseline;
        _ctx.textAlign = this.shapeFormat.textAlign;
        _ctx.font = this.shapeFormat.getFont(this.getParentZoom());
        _ctx.fillStyle = this.shapeFormat.textFillStyle;
        if (this.shapeFormat.textAlign === toolBox.TEXT_ALIGN_CENTER) {
            toolBox.tempX = toolBox.tempX + (toolBox.tempW / 2);
        }
        else if (this.shapeFormat.textAlign === toolBox.TEXT_ALIGN_LEFT) {
            toolBox.tempX = toolBox.tempX + toolBox.tempR;
        }
        else if (this.shapeFormat.textAlign === toolBox.TEXT_ALIGN_RIGHT) {
            toolBox.tempX = toolBox.tempX + toolBox.tempW - toolBox.tempR;
        }
        toolBox.tempW = toolBox.tempW - (toolBox.tempR * 2);
        if (this.text2 !== '') {
            if (this.shapeFormat.textVerticalAlign === 'middle') {
                toolBox.tempY = toolBox.tempY + (toolBox.tempH / 2);
            }
            else if (this.shapeFormat.textVerticalAlign === 'top') {
                toolBox.tempY = toolBox.tempY + toolBox.tempR;
            }
            _ctx.fillText2(this.text2, toolBox.tempX, toolBox.tempY, toolBox.tempW, this.shapeFormat.textSize * this.getParentZoom());
        }
        else {
            if (this.text.indexOf('\n') === -1) {
                if (this.shapeFormat.textVerticalAlign === 'middle') {
                    toolBox.tempY = toolBox.tempY + (toolBox.tempH / 2);
                }
                else if (this.shapeFormat.textVerticalAlign === 'top') {
                    toolBox.tempY = toolBox.tempY + toolBox.tempR;
                }
                if (this.text === '') {
                    _ctx.fillText2(this.defaultText, toolBox.tempX, toolBox.tempY, toolBox.tempW, this.shapeFormat.textSize * this.getParentZoom());
                }
                else {
                    _ctx.fillText2(this.text, toolBox.tempX, toolBox.tempY, toolBox.tempW, this.shapeFormat.textSize * this.getParentZoom());
                }
            }
            else {
                var textLines = this.text.split('\n');
                var textHeight = this.shapeFormat.textSize * this.getParentZoom() * 1.5;
                var textAreaHeight = Math.min((textLines.length * textHeight), (toolBox.tempH - (toolBox.tempR * 2)));
                var y = 0;
                var y2 = 0;
                if (this.shapeFormat.textVerticalAlign === 'middle' && textAreaHeight < toolBox.tempH) {
                    y2 += (toolBox.tempH - textAreaHeight) / 2;
                }
                for (var i=0;i<textLines.length;i++) {
                    y = y2 + toolBox.tempY + (((textAreaHeight / textLines.length) * i) + ((textAreaHeight / textLines.length) / 2));
                    _ctx.fillText2(textLines[i], toolBox.tempX, y, toolBox.tempW, this.shapeFormat.textSize * this.getParentZoom());
                }
            }
        }
    }
,   drawIsolatedShape: function(_sourceLayer, _destinationLayer, _drawLastPos) {
logger.put(this.id + ' IsolationDraw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
            return;
        }
        if (this.isVisible() === true) {
            if (this.containerShape) {
                this.containerShape.startClip(_destinationLayer.ctx, _drawLastPos);
            }
            this.innerDrawIsolatedShape(_sourceLayer, _destinationLayer, _drawLastPos);
            if (this.containerShape) {
                this.containerShape.endClip(_destinationLayer.ctx);
            }
        }
    }
,   innerDrawIsolatedShape: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        if (!this.containerShape) {
            return;
        }
        //ソースコンテキストから元イメージを切り出し
        this.containerShape.tempLayer.clear();
        var x = Math.max(this.savedActualX, this.containerShape.currentActualX);
        var y = Math.max(this.savedActualY, this.containerShape.currentActualY);
        var w = Math.min(this.containerShape.currentActualX2, this.savedActualX2) - x;
        var h = Math.min(this.containerShape.currentActualY2, this.savedActualY2) - y;
        if (_drawLastPos === true) {
            w =  Math.min(w, this.lastActualW);
            h =  Math.min(h, this.lastActualH);
        }
        else {
            w =  Math.min(w, this.currentActualW);
            h =  Math.min(h, this.currentActualH);
        }
        this.containerShape.tempLayer.ctx.drawImage(_sourceLayer, -x, -y);
        this.containerShape.tempLayer.ctx.clearRect(w, 0, this.containerShape.tempLayer.width - w, this.containerShape.tempLayer.height)
        this.containerShape.tempLayer.ctx.clearRect(0, h, w + 1, this.containerShape.tempLayer.height)
        //切り出しイメージを画像描画
        if (_drawLastPos === true) {
            _destinationLayer.ctx.drawImage(this.containerShape.tempLayer, this.lastActualX + (x - this.savedActualX), this.lastActualY + (y - this.savedActualY));
        }
        else {
            _destinationLayer.ctx.drawImage(this.containerShape.tempLayer, this.currentActualX + (x - this.savedActualX), this.currentActualY + (y - this.savedActualY));
        }
    }
,   saveLastDrawingPoints: function() {
        this.lastActualX = this.currentActualX;
        this.lastActualY = this.currentActualY;
        this.lastActualW = this.currentActualW;
        this.lastActualH = this.currentActualH;
        this.lastActualX2 = this.currentActualX2;
        this.lastActualY2 = this.currentActualY2;
        this.lastActualR = this.currentActualR;
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].saveLastDrawingPoints();
        }
    }
,   saveCurrentDrawingPoints: function() {
        if (this.parentShape) {
            this.currentActualX = this.parentShape.currentActualX + this.parentShape.getActualInnerOffsetX() + (this.x * this.getParentZoom());
            this.currentActualY = this.parentShape.currentActualY + this.parentShape.getActualInnerOffsetY() + (this.y * this.getParentZoom());
        }
        else {
            this.currentActualX = this.x;
            this.currentActualY = this.y;
        }
        this.currentActualW = this.w * this.getParentZoom();
        this.currentActualH = this.h * this.getParentZoom();
        this.currentActualX2 = this.currentActualX + this.currentActualW;
        this.currentActualY2 = this.currentActualY + this.currentActualH;
        this.currentActualR = this.r * this.getParentZoom();
    }
,   clear: function(_ctx, _clearLastPos) {
        var ctx = this.getCtx(_ctx);
        if (this.containerShape) {
            this.containerShape.startClip(ctx, _clearLastPos);
        }
        ctx.beginPath();
        if (_clearLastPos === true) {
            ctx.clearRect(this.lastActualX, this.lastActualY, this.lastActualW, this.lastActualH);
        }
        else {
            ctx.clearRect(this.currentActualX, this.currentActualY, this.currentActualW, this.currentActualH);
        }
        if (this.containerShape) {
            this.containerShape.endClip(ctx);
        }
    }
,   fade: function(_ctx, _fadeLastPos) {
        if (this.isVisible() === true) {
            var ctx = this.getCtx(_ctx);
            if (this.containerShape) {
                this.containerShape.startClip(ctx, _fadeLastPos);
            }
            this.innerFade(_ctx, _fadeLastPos);
            if (this.containerShape) {
                this.containerShape.endClip(ctx);
            }
        }
    }
,   innerFade: function(_ctx, _fadeLastPos) {
        var ctx = this.getCtx(_ctx);
        ctx.strokeStyle = toolBox.FADE_STROKE_COLOR;
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        toolBox.setTempPos(this, _fadeLastPos);
        if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RECT) {
            ctx.strokeRect(toolBox.tempX-1, toolBox.tempY-1, toolBox.tempW+2, toolBox.tempH+2);
            ctx.fillStyle = toolBox.FADE_FILL_COLOR;
            ctx.fillRect(toolBox.tempX-1, toolBox.tempY-1, toolBox.tempW+2, toolBox.tempH+2);
        }
        else if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RRECT) {
            ctx.strokeRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
            ctx.fillStyle = toolBox.FADE_FILL_COLOR;
            ctx.fillRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
        }
    }
,   getAllChildShapes: function(_allShapes) {
        for (var i=0;i<this.childShapes.length;i++) {
            toolBox.addToArray(_allShapes, this.childShapes[i]);
            this.childShapes[i].getAllChildShapes(_allShapes);
        }
    }
,   hitShape: function(_anotherShape) {
        if ((_anotherShape.currentActualX >= this.currentActualX && _anotherShape.currentActualX <= this.currentActualX2) ||
            (_anotherShape.currentActualX2 >= this.currentActualX && _anotherShape.currentActualX2 <= this.currentActualX2) ||
            (_anotherShape.currentActualX <= this.currentActualX && _anotherShape.currentActualX2 >= this.currentActualX2)
           ) {
            if (_anotherShape.currentActualY >= this.currentActualY &&
                _anotherShape.currentActualY <= this.currentActualY2) {
                return true;
            }
            if (_anotherShape.currentActualY2 >= this.currentActualY &&
                _anotherShape.currentActualY2 <= this.currentActualY2) {
                return true;
            }
            if (_anotherShape.currentActualY <= this.currentActualY &&
                _anotherShape.currentActualY2 >= this.currentActualY2) {
                return true;
            }
        }
        return false;
    }
,   getCtx: function(_ctx) {
        if (toolBox.isNullOrUndefined(_ctx) === false) {
            return _ctx;
        }
        else {
            return this.defaultLayer.ctx;
        }
    }
,   saveActualPosition: function() {
        this.savedActualX = this.currentActualX;
        this.savedActualY = this.currentActualY;
        this.savedActualW = this.currentActualW;
        this.savedActualH = this.currentActualH;
        this.savedActualX2 = this.currentActualX2;
        this.savedActualY2 = this.currentActualY2;
        this.savedActualR = this.currentActualR;
    }
,   getEffectedShapes: function() {
        var effectedShapes = toolBox.copyArray(this.childShapes);
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            toolBox.addToArrayIfNotExists(effectedShapes, this.dockedShapeInfos[i].info1);
        }
        return effectedShapes;
    }
,   getRect: function() {
        return new Rect(this.currentActualX, this.currentActualY, this.currentActualX2, this.currentActualY2, this.currentActualR);
    }
,   dockShape: function(_targetShape, _dockPosition) {
        var found = false;
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            if (this.dockedShapeInfos[i].info1 === _targetShape) {
                this.dockedShapeInfos[i].info2 = _dockPosition;
                for (var j=0;j<_targetShape.dockedShapeInfos.length;j++) {
                    if (_targetShape.dockedShapeInfos[j].info1 === this) {
                        _targetShape.dockedShapeInfos[j].info2 = toolBox.getReversedDockPosition(_dockPosition);
                        break;
                    }
                }
                found = true;
                break;
            }
        }
        if (found === false) {
            toolBox.addToArray(this.dockedShapeInfos, new Info(_targetShape, _dockPosition));
            toolBox.addToArray(_targetShape.dockedShapeInfos, new Info(this, toolBox.getReversedDockPosition(_dockPosition)));
            this.syncDockedShapePosition(false);
        }
    }
,   undockShape: function(_targetShape) {
        var info = null;
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            if (this.dockedShapeInfos[i].info1 === _targetShape) {
                info = this.dockedShapeInfos[i];
                break;
            }
        }
        if (info !== null) {
            this.dockedShapeInfos = toolBox.arrayWithout(this.dockedShapeInfos, info);
            info = null;
            for (var i=0;i<_targetShape.dockedShapeInfos.length;i++) {
                if (_targetShape.dockedShapeInfos[i].info1 === this) {
                    info = _targetShape.dockedShapeInfos[i];
                }
            }
            if (info !== null) {
                _targetShape.dockedShapeInfos = toolBox.arrayWithout(_targetShape.dockedShapeInfos, info);
            }
        }
    }
,   undockAllShapes: function() {
        while (true) {
            if (this.dockedShapeInfos.length === 0) {
                break;
            }
            this.undockShape(this.dockedShapeInfos[0].info1);
        }
    }
,   syncDockedShapePosition: function(_donotSyncIfDockedShapeIsSelected) {
        var info = null;
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            info = this.dockedShapeInfos[i];
            if (_donotSyncIfDockedShapeIsSelected === true && info.info1.isSelected() === true) {
                continue;
            }
            if (info.info2 === toolBox.DOCK_POSITION_TOP) {
                info.info1.x = this.x;
                info.info1.y = this.y - (info.info1.h + 1);
                info.info1.w = this.w;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_TOP_RIGHT_CORNER) {
                info.info1.x = this.x + this.w + 1;
                info.info1.y = this.y - (info.info1.h + 1);
            }
            else if (info.info2 === toolBox.DOCK_POSITION_RIGHT) {
                info.info1.x = this.x + this.w + 1;
                info.info1.y = this.y;
                info.info1.h = this.h;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER) {
                info.info1.x = this.x + this.w + 1;
                info.info1.y = this.y + this.h + 1;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_BOTTOM) {
                info.info1.x = this.x;
                info.info1.y = this.y + this.h + 1;
                info.info1.w = this.w;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER) {
                info.info1.x = this.x - (info.info1.w + 1);
                info.info1.y = this.y + this.h + 1;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_LEFT) {
                info.info1.x = this.x - (info.info1.w + 1);
                info.info1.y = this.y;
                info.info1.h = this.h;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_TOP_LEFT_CORNER) {
                info.info1.x = this.x - (info.info1.w + 1);
                info.info1.y = this.y - (info.info1.h + 1);
            }
            else if (info.info2 === toolBox.DOCK_POSITION_LINK) {
                info.info1.x = this.x;
                info.info1.y = this.y + this.h + 1;
            }
            else if (info.info2 === toolBox.DOCK_POSITION_BODY) {
                info.info1.x = this.x;
                info.info1.y = this.y - (info.info1.h + 1);
            }
            info.info1.zOrder.moveToNextOfTargetShape(this);
            info.info1.registerDrawBuffer();
        }
    }
,   getDockedShape: function() {
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            return this.dockedShapeInfos[i].info1;
        }
        return null;
    }
,   setImageUrl: function(_imageUrl, _displayImageOnLoad) {
        if (toolBox.trim(_imageUrl) === '' || _imageUrl === null) {
            this.imageUrl = '';
            this.image = new Image();
            this.image.parentShape = this;
        }
        else {
//            this.text2 = 'Image loading...';
            this.image.parentShape = this;
            this.image.onload = function() {
                this.parentShape.text2 = '';
                this.parentShape.imageNotAvailable = false;
                if (_displayImageOnLoad === true) {
                    if (toolBox.isNullOrUndefined(this.parentShape.containerShape) === false) {
                        this.parentShape.containerShape.registerDrawBuffer();
                        if (this.parentShape.containerShape !== this.parentShape.backGroundShape.getTopView().view) {
                            this.parentShape.backGroundShape.registerDrawBuffer();
                        }
                    }
                    else {
                        this.parentShape.registerDrawBuffer();
                    }
                }
            }
            this.image.onerror = function() {
//                this.parentShape.imageUrl = '';
                if (this.parentShape) {
                    this.parentShape.imageNotAvailable = true;
                    this.parentShape.image = new Image();
                    this.parentShape.image.parentShape = this.parentShape;
                    this.parentShape.registerDrawBuffer();
                }
            }
            this.imageUrl = _imageUrl
            this.image.src = _imageUrl;
        }
    }
,   hasNoImage: function() {
        if (this.image === null) {
            return true;
        }
        if (this.image.src === null || this.image.src === '') {
            return true;
        }
        if (this.image.complete === false) {
            return true;
        }
        if (this.imageNotAvailable === true) {
            return true;
        }
        return false;
    }
,   test: function(_shape, _level) {
logger.put('#### ' + toolBox.strCopy(' ', _level) + _shape.classType + ' ' + _shape.id, toolBox.LOG_LEVEL_DEBUG);
        if (_shape === null || _shape.zOrder.nextHigherShape === null) {
            return;
        }
        else {
            this.test(_shape.zOrder.nextHigherShape, _level + 1);
        }
    }
});

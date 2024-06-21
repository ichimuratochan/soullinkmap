var EntityViewBase = function(){this.initialize.apply(this, arguments);}
EntityViewBase.prototype = toolBox.extend(new ContainerShape(), {
    bodyId  : ''
,   changed : false
,   isEntityView        : true
,   viewInformationMap  : {}
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        ContainerShape.prototype.initialize.apply(this,[_containerShape, _parentShape, _parentShape.backGroundShape.tempLayer, _defaultLayer, _x, _y, _w, _h]);
        this.classType  = 'EntityViewBase';
        this.syncPositionWithParentShape(true);

    }
,   isChanged: function() {
        return this.changed;
    }
,   showData: function(_row) {
    }
,   saveViewInformation: function() {
        var selectedBodyList = new Array();
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isEntity) {
                if (this.childShapes[i].isSelected() === true) {
                    toolBox.addToArray(selectedBodyList, this.childShapes[i].bodyId);
                }
            }
        }
        var info = new Info(
                            this.innerOffsetX
                           ,this.innerOffsetY
                           ,selectedBodyList
                           ,null
                           ,null
                       );
        this.viewInformationMap[this.bodyId] = info;
    }
,   loadViewInfornation: function() {
        if (!this.viewInformationMap[this.bodyId]) {
            return;
        }
        this.backGroundShape.clearSelectedShapes();
        var selectedBodyList = this.viewInformationMap[this.bodyId].info3;
        if (selectedBodyList !== null) {
            for (var i=0;i<selectedBodyList.length;i++) {
                for (var j=0;j<this.childShapes.length;j++) {
                    if (this.childShapes[j].isEntity) {
                        if (this.childShapes[j].bodyId === selectedBodyList[i]) {
                            this.childShapes[j].select(0, 0, true);
                        }
                    }
                }
            }
        }
        this.innerOffsetX = this.viewInformationMap[this.bodyId].info1;
        this.innerOffsetY = this.viewInformationMap[this.bodyId].info2;
    }
,   showViewData: function(_row) {
        this.bodyId = _row['BODY_ID'];
        this.innerOffsetX = _row['INNER_OFFSET_X'];
        this.innerOffsetY = _row['INNER_OFFSET_Y'];
        this.innerZoom = _row['INNER_ZOOM'];
        this.parentShape.viewOriginalShapeFormat.fillStyle = _row['FILL_STYLE'], '#ffffff';
        this.parentShape.viewOriginalShapeFormat.textDescription = _row['TEXT_DESCRIPTION'];
        this.parentShape.viewOriginalShapeFormat.textSize = _row['TEXT_SIZE'];
        this.parentShape.viewOriginalShapeFormat.textFont = _row['TEXT_FONT'];
        this.parentShape.viewOriginalShapeFormat.textFillStyle = _row['TEXT_FILL_STYLE'], '#000000';
        this.parentShape.viewOriginalImage = _row['IMAGE_URL'];
        this.saveCurrentDrawingPoints();
    }
,   adjustInnerOffsetToStartPosition: function() {
    }
,   reset: function() {
        this.childShapes.length = 0;
    }
,   commandDoubleHit: function(_x, _y) {
        var entity = this.addEntity(_x, _y, true);
        entity.onMoveToTop();
        return entity;
    }
,   addEntity: function(_x, _y, _edit) {
        var newEntity = new Entity(
            this,
            this,
            this.defaultLayer,
            ((_x - this.currentActualX) - this.getActualInnerOffsetX()) / this.getActualZoom(),
            ((_y - this.currentActualY) - this.getActualInnerOffsetY()) / this.getActualZoom(),
            this.w / 4,
            this.h / 4
        );
        newEntity.registerDrawBuffer();
        return newEntity;
    }
,   prepareInnerDraw: function(_ctx) {
        if (this.isSelected()) {
            _ctx.strokeStyle = this.shapeFormat.selectedStrokeStyle;
        }
        else {
            _ctx.strokeStyle = this.shapeFormat.strokeStyle;
        }
        _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
        if (this.parentShape.viewStyleMode === toolBox.VIEW_STYLE_MODE_ORIGINAL || this.bodyId === toolBox.BODY_ID_WORLD) {
            this.shapeFormat.copyFrom(this.parentShape.viewOriginalShapeFormat);
        }
        else if (this.parentShape.viewStyleMode === toolBox.VIEW_STYLE_MODE_BODY) {
            var soulRow = this.soulMaster.dataAccessAction.findSoulByBodyId(this.bodyId);
            if (soulRow !== null) {
                var bodyFormatRow = this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']);
                if (bodyFormatRow !== null) {
                    var bodyFormat = new EntityFormat();
                    bodyFormat.loadFromBodyFormatRowData(bodyFormatRow);
                    this.shapeFormat.fillStyle = bodyFormat.fillStyle;
                    this.shapeFormat.textAlign = bodyFormat.textAlign;
                    this.shapeFormat.textVerticalAlign = bodyFormat.textVerticalAlign;
                    this.shapeFormat.textDescription = bodyFormat.textDescription;
                    this.shapeFormat.textSize = bodyFormat.textSize;
                    this.shapeFormat.textFont = bodyFormat.textFont;
                    this.shapeFormat.textFillStyle = bodyFormat.textFillStyle;
                    this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_LEFT;
                    this.shapeFormat.textVerticalAlign = 'top';
                }
            }
        }
        if (this.parentShape.viewImageMode === toolBox.VIEW_IMAGE_MODE_ORIGINAL) {
            this.setImageUrl(this.parentShape.viewOriginalImageUrl, false);
        }
        else if (this.parentShape.viewImageMode === toolBox.VIEW_IMAGE_MODE_BODY) {
            var soulRow = this.soulMaster.dataAccessAction.findSoulByBodyId(this.bodyId);
            if (soulRow !== null) {
                this.setImageUrl(soulRow['IMAGE_URL'], false);
            }
        }
        _ctx.fillStyle = this.shapeFormat.fillStyle;
    }
,   generateImage: function(_canvas) {
        this.draw2(_canvas.getContext('2d'));
    }
,   callBackFromShapeTransferAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        if (_arg1 === 'diveToBody') {
            this.onMoveToTop();
            this.visible = true;
            this.backGroundShape.registerDrawBuffer();
        }
    }
,   callBackFromInputBox: function(_resultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (_arg1 === 'editImageOfSelectedShape') {
            var newUrl = _resultText;
            this.setImageUrl(newUrl, true);
            this.parentShape.viewOriginalImageUrl = newUrl;
            this.soulMaster.targetBackGround.standardViewImageUrl = newUrl;
            this.select(0, 0, false);
            this.soulMaster.dataAccessAction.saveToData();
            this.registerDrawBuffer();
        }
    }
,   callBackCancelFromInputBox: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.select(0, 0, false);
    }
/*
,   getEntities: function() {
        var entities = new Array();
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isEntity) {
                toolBox.addToArray(entities, this.childShapes[i]);
            }
        }
        return entities;
    }
*/
});

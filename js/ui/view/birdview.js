var BirdView = function(){this.initialize.apply(this, arguments);}
BirdView.prototype = toolBox.extend(new EditView(), {
    bodyFormats : null
,   defaultText : ''
,   bodyModels              : null
,   beforeBodyId            : ''
,   birdViewType            : toolBox.BIRDVIEW_TYPE_UNITE
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _bodyId) {
        if (!_parentShape) return;
        EditView.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType  = 'BirdView';

        this.bodyFormats = new Array();

        this.bodyId = _bodyId;

        this.alive = true;
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   isChanged: function(_row) {
        return false;
    }
,   saveToData: function() {
    }
,   changeBirdViewLevel: function(_plusMinus) {
        this.parentShape.birdViewLevel += _plusMinus;
        if (this.parentShape.birdViewLevel < toolBox.BIRDVIEW_LEVEL_MIN) {
            this.parentShape.birdViewLevel = toolBox.BIRDVIEW_LEVEL_MIN;
        }
        else if (this.parentShape.birdViewLevel > toolBox.BIRDVIEW_LEVEL_MAX) {
            this.parentShape.birdViewLevel = toolBox.BIRDVIEW_LEVEL_MAX;
        }
    }
,   changeBirdViewSpaceBetweenBodies: function(_plusMinus) {
        if (this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
            var plusMinus = (toolBox.round(this.parentShape.birdViewHorizontalSpace / 10, 0) * _plusMinus) + _plusMinus;
            this.parentShape.birdViewHorizontalSpace += plusMinus;
            if (this.parentShape.birdViewHorizontalSpace < 1) {
                this.parentShape.birdViewHorizontalSpace = 1;
            }
        }
        else {
            var plusMinus = (toolBox.round(this.parentShape.birdViewVerticalSpace / 10, 0) * _plusMinus) + _plusMinus;
            this.parentShape.birdViewVerticalSpace += plusMinus;
            if (this.parentShape.birdViewVerticalSpace < 1) {
                this.parentShape.birdViewVerticalSpace = 1;
            }
        }
    }
,   showBodyData: function(_displayImageOnLoad) {
        this.reset();

        if (this.parentShape.pathBar) {
            this.parentShape.pathBar.showPathData(this.bodyId);
        }

        if (this.soulMaster.dataAccessAction.findBodyById(this.bodyId) === null) {
            this.bodyId = toolBox.BODY_ID_WORLD;
        }
        var row = this.soulMaster.dataAccessAction.findBodyById(this.bodyId);
        if (row['LINK_FLAG'] === '1') {
            this.defaultText = toolBox.DEFAULT_TEXT_LINK;
        }
        else {
            this.defaultText = toolBox.DEFAULT_TEXT_BODY;
        }
        row = this.soulMaster.dataAccessAction.findSoulById(row['SOUL_ID']);
        if (row !== null) {
            this.text = row['TEXT'];
        }
        else {
            this.text = '';
        }

        //find bodies with the same soul and soul which means the same soul
        this.bodyModels = this.soulMaster.dataAccessAction.findBodyModelsForBirdView(this.bodyId, this.parentShape.birdViewParentStepCount, this.parentShape.birdViewChildStepCount, this.parentShape.birdViewLevel);
        if (this.birdViewType === toolBox.BIRDVIEW_TYPE_UNITE) {
            var tempBodyModel = this.uniteSameSoulBodyModels(this.bodyModels);
            this.bodyModels = new Array();
            toolBox.addToArray(this.bodyModels, tempBodyModel);
        }
        this.generateBodyFormats(this.bodyModels);
        var adjustX = 0;
        var adjustY = 0;
        for (var i=0;i<this.bodyModels.length;i++) {
            this.bodyModels[i].calcPositionForBirdView(this.parentShape.birdViewDirection, this.parentShape.birdViewHorizontalSpace, this.parentShape.birdViewVerticalSpace);
            if (i !== 0) {
                if (this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                    adjustY += (Math.max(this.bodyModels[i].childrensH, this.bodyModels[i].parentsH) / 2) - (this.bodyModels[i].h / 2);
                }
                else if (this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN || this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP) {
                    adjustX += (Math.max(this.bodyModels[i].childrensW, this.bodyModels[i].parentsW) / 2) - (this.bodyModels[i].w / 2);
                }
            }
            this.addChildrensEntity(this.bodyModels[i], adjustX, adjustY);
            this.addParentsEntity(this.bodyModels[i], adjustX, adjustY);

            var tempFormat = new EntityFormat();
            tempFormat.copyFrom(this.bodyModels[i].entity.shapeFormat);
            toolBox.addToArrayIfNotExists(this.bodyFormats, tempFormat);
            tempFormat.strokeStyle = toolBox.CENTER_SOUL_STROKE_COLOR;
            this.bodyModels[i].entity.shapeFormat = tempFormat;

            if (i !== 0) {
                this.bodyModels[i].entity.connectEntity(this.bodyModels[i-1].entity, true, toolBox.CENTER_SOUL_STROKE_COLOR);
                this.bodyModels[i-1].entity.connectEntity(this.bodyModels[i].entity, true, toolBox.CENTER_SOUL_STROKE_COLOR);
            };
            if (this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                adjustY += (Math.max(this.bodyModels[i].childrensH, this.bodyModels[i].parentsH) / 2) + (this.bodyModels[i].h / 2) + this.bodyModels[i].verticalSpace;
            }
            else if (this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN || this.parentShape.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP) {
                adjustX += (Math.max(this.bodyModels[i].childrensW, this.bodyModels[i].parentsW) / 2) + (this.bodyModels[i].w / 2) + this.bodyModels[i].horizontalSpace;
            }
        }
        this.changed = false;
        this.beforeBodyId = this.bodyId;
        this.backGroundShape.registerDrawBuffer();
    }
,   uniteSameSoulBodyModels: function(_bodyModels) {
        var uniteBodyModel = _bodyModels[0];
        if (_bodyModels.length > 1) {
            for (var i=1;i<_bodyModels.length;i++) {
                for (var j=0;j<_bodyModels[i].childBodyModels.length;j++) {
                    _bodyModels[i].childBodyModels[j].parentBodyModel = uniteBodyModel;
                    toolBox.addToArray(uniteBodyModel.childBodyModels, _bodyModels[i].childBodyModels[j]);
                }
                if (_bodyModels[i].parentBodyModel != null) {
                    _bodyModels[i].parentBodyModel.childBodyModels[0] = uniteBodyModel;
                    toolBox.addToArray(uniteBodyModel.parentBodyModels, _bodyModels[i].parentBodyModel);
                }
            }
        }
        return uniteBodyModel;
    }
,   adjustInnerOffsetToStartPosition: function() {
        for (var i=0;i<this.bodyModels.length;i++) {
            if (this.bodyId === this.bodyModels[i].bodyId) {
                this.innerOffsetY = -(this.bodyModels[i].entity.y + (this.bodyModels[i].entity.h / 2)) + ((this.h / 2) * (1 / this.innerZoom));
                this.innerOffsetX = -(this.bodyModels[i].entity.x + (this.bodyModels[i].entity.w / 2)) + ((this.w / 2) * (1 / this.innerZoom));
                break;
            }
        }
    }
,   generateBodyFormats: function(_bodyModels) {
        var bodyFormatList = new Array();
        for (var i=0;i<_bodyModels.length;i++) {
            this.generateChildrensBodyFormatList(bodyFormatList, _bodyModels[i]);
            this.generateParentsBodyFormatList(bodyFormatList, _bodyModels[i]);
        }
        if (this.bodyFormats.length > bodyFormatList.length) {
            this.bodyFormats.length = bodyFormatList.length;
        }
        for (var i=0;i<bodyFormatList.length;i++) {
            if (this.bodyFormats.length < (i + 1)) {
                this.bodyFormats[i] = new EntityFormat();
            }
            this.bodyFormats[i].loadFromBodyFormatRowData(bodyFormatList[i]);
        }
    }
,   generateChildrensBodyFormatList: function(_bodyFormatList, _bodyModel) {
        toolBox.addToArrayIfNotExists(_bodyFormatList, this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(_bodyModel.soulRow['BODY_FORMAT_ID']));
        for (var i=0;i<_bodyModel.childBodyModels.length;i++) {
            this.generateChildrensBodyFormatList(_bodyFormatList, _bodyModel.childBodyModels[i]);
        }
    }
,   generateParentsBodyFormatList: function(_bodyFormatList, _bodyModel) {
        if (_bodyModel.parentBodyModel !== null) {
            toolBox.addToArrayIfNotExists(_bodyFormatList, this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(_bodyModel.parentBodyModel.soulRow['BODY_FORMAT_ID']));
            for (var i=0;i<_bodyModel.parentBodyModels.length;i++) {
                this.generateParentsBodyFormatList(_bodyFormatList, _bodyModel.parentBodyModels[i]);
            }
        }
    }
,   addChildrensEntity: function(_bodyModel, _adjustX, _adjustY) {
        _bodyModel.addEntityToBirdView(this);
        _bodyModel.entity.x += _adjustX;
        _bodyModel.entity.y += _adjustY;
        _bodyModel.entity.syncPositionWithParentShape(true);
        for (var i=0;i<_bodyModel.childBodyModels.length;i++) {
            this.addChildrensEntity(_bodyModel.childBodyModels[i], _adjustX, _adjustY);
            _bodyModel.entity.connectEntity(_bodyModel.childBodyModels[i].entity);
        }
    }
,   addParentsEntity: function(_bodyModel, _adjustX, _adjustY) {
        if (_bodyModel.isMainBody === false) {
            _bodyModel.addEntityToBirdView(this);
            _bodyModel.entity.x += _adjustX;
            _bodyModel.entity.y += _adjustY;
            _bodyModel.entity.syncPositionWithParentShape(true);
        }
        for (var i=0;i<_bodyModel.parentBodyModels.length;i++) {
            this.addParentsEntity(_bodyModel.parentBodyModels[i], _adjustX, _adjustY);
            _bodyModel.parentBodyModels[i].entity.connectEntity(_bodyModel.entity);
        }
    }
,   addEntity: function(_x, _y, _edit) {
    }
/*
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
*/
});

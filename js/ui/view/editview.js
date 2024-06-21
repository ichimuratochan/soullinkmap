var EditView = function(){this.initialize.apply(this, arguments);}
EditView.prototype = toolBox.extend(new EntityViewBase(), {
    bodyFormats : null
,   defaultText : ''
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _bodyId) {
        if (!_parentShape) return;
        EntityViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType  = 'EditView';

        this.bodyFormats = new Array();

        this.bodyId = _bodyId;

        this.alive = true;
    }
,   isChanged: function() {
        if (this.changed === true) {
            return true;
        }
        if (this.backGroundShape.isTopOfEditView(this.parentShape) === true) {
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].isEntity) {
                    if (this.childShapes[i].isChanged() === true) {
                        this.changed = true;
                    }
                }
            }
            for (var i=0;i<this.bodyFormats.length;i++) {
                if (this.bodyFormats[i].isChanged(this.soulMaster) === true) {
                    this.changed = true;
                }
            }
        }
        return this.changed;
    }
,   saveToData: function() {
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isEntity && this.childShapes[i].changed === true) {
                this.childShapes[i].saveToData();
            }
        }
        for (var i=0;i<this.bodyFormats.length;i++) {
            if (this.bodyFormats[i].changed === true) {
                this.bodyFormats[i].saveToData(this.soulMaster);
            }
        }
        this.changed = false;
    }
/*
,   garbageUnnecessaryBodyFormats: function() {
        var found = false;
        for (var i=0;i<this.bodyFormats.length;i++) {
            if (this.bodyFormats[i].id !== toolBox.BODY_FORMAT_ID_BODY_STANDARD && this.bodyFormats[i].id !== toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
                found = false;
                for (var j=0;j<this.childShapes.length;j++) {
                    if (this.childShapes[j].isEntity) {
                        if (this.childShapes[j].shapeFormat.id === this.bodyFormats[i].id) {
                            found = true;
                            break;
                        }
                    }
                }
                if (found === false) {
                    toolBox.addToArrayIfNotExists(this.backGroundShape.garbages, this.bodyFormats[i]);
                }
            }
        }
    }
*/
,   showBodyData: function(_displayImageOnLoad) {

        this.parentShape.pathBar.showPathData(this.bodyId);

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

        if (this.childShapes.length > 0) {
            this.childShapes[0].zOrder.getTopShape().onDropFromTop();
        }
        var linksAndBodies = this.soulMaster.dataAccessAction.findLinksAndBodiesByParentBodyId(this.bodyId);
        if (this.childShapes.length > linksAndBodies.length) {
            this.childShapes.length = linksAndBodies.length;
        }
        var bodyFormatList = new Array();
        for (var i=0;i<linksAndBodies.length;i++) {
            toolBox.addToArrayIfNotExists(bodyFormatList, this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(linksAndBodies[i]['BODY_FORMAT_ID']));
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

        var entityType = '';
        var entity = null;
        var bodyFormat = null;
        var bodyFormatCounter = 0;
        var befEntity = null;
        var links = {};
        var childShapeMap = {};
        var i = 0;
        var j = 0;
        var found = false;
        while (i<linksAndBodies.length) {
            entityType = toolBox.ENTITY_TYPE_BODY;
            if (linksAndBodies[i]['LINK_FLAG'] === '1') {
                entityType = toolBox.ENTITY_TYPE_LINK;
            }
            if (this.childShapes.length < (i+1)) {
                entity = new Entity(
                    this,
                    this,
                    this.defaultLayer,
                    linksAndBodies[i]['X'],
                    linksAndBodies[i]['Y'],
                    linksAndBodies[i]['W'],
                    linksAndBodies[i]['H'],
                    entityType
                );
            }
            else {
                entity = this.childShapes[i];
                entity.undockAllShapes();
                entity.x = linksAndBodies[i]['X'];
                entity.y = linksAndBodies[i]['Y'];
                entity.w = linksAndBodies[i]['W'];
                entity.h = linksAndBodies[i]['H'];
                entity.entityType = entityType;
            }
            entity.r = linksAndBodies[i]['R'];
            entity.bodyId = linksAndBodies[i]['BODY_ID'];
            entity.soulId = linksAndBodies[i]['SOUL_ID'];
            entity.text = linksAndBodies[i]['TEXT'];
            entity.setImageUrl(linksAndBodies[i]['IMAGE_URL'], _displayImageOnLoad);
            entity.setHyperLinkUrl(linksAndBodies[i]['HYPER_LINK_URL'], linksAndBodies[i]['HYPER_LINK_URL_MODE'], linksAndBodies[i]['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']);
            entity.soulShareCount = linksAndBodies[i]['SOUL_SHARE_COUNT'];
            entity.linkChildrenCount = linksAndBodies[i]['LINK_CHILDREN_COUNT'];
            entity.syncPositionWithParentShape(true);
            if (linksAndBodies[i]['LINK_FLAG'] === '1') {
                links[entity.bodyId] = entity;
            }
            childShapeMap[entity.bodyId] = entity;
            if (i===0) {
                entity.zOrder.nextLowerShape = null;
                entity.zOrder.nextHigherShape = null;
            }
            else {
                entity.zOrder.nextLowerShape = befEntity;
                befEntity.zOrder.nextHigherShape = entity;
                entity.zOrder.nextHigherShape = null;
            }
            //bodyFormat
            found = false;
            for (j=0;j<this.bodyFormats.length;j++) {
                if (this.bodyFormats[j].id === linksAndBodies[i]['BODY_FORMAT_ID']) {
                    found = true;
                    bodyFormat = this.bodyFormats[j];
                    break;
                }
            }
            if (found === false) {
                bodyFormatCounter++;
                if (bodyFormatCounter <= this.bodyFormats.length) {
                    bodyFormat = this.bodyFormats[bodyFormatCounter - 1];
                }
                else {
                    bodyFormat = new EntityFormat();
                    toolBox.addToArray(this.bodyFormats, bodyFormat);
                }
                row = this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(linksAndBodies[i]['BODY_FORMAT_ID']);
                if (row !== null) {
                    bodyFormat.loadFromBodyFormatRowData(row);
                }
            }
            entity.shapeFormat = bodyFormat;
            befEntity = entity;
            i++;
        }
        for (i=0;i<linksAndBodies.length;i++) {
            if (linksAndBodies[i]['LINK_FLAG'] === '0') {
                //LINKとBODYドッキング
                links[linksAndBodies[i]['PARENT_BODY_ID']].dockShape(childShapeMap[linksAndBodies[i]['BODY_ID']], toolBox.DOCK_POSITION_LINK);
            }
        }
        //zOrder設定
        if (linksAndBodies.length > 0) {
            childShapeMap[linksAndBodies[0]['BODY_ID']].zOrder.getTopShape().onDropFromTop();
        }
        for (i=0;i<linksAndBodies.length;i++) {
            if (linksAndBodies[i]['ZORDER_NEXT_LOWER_BODY_ID'] === '') {
                childShapeMap[linksAndBodies[i]['BODY_ID']].zOrder.nextLowerShape = null;
            }
            else {
                childShapeMap[linksAndBodies[i]['BODY_ID']].zOrder.nextLowerShape = childShapeMap[linksAndBodies[i]['ZORDER_NEXT_LOWER_BODY_ID']];
            }
            if (linksAndBodies[i]['ZORDER_NEXT_HIGHER_BODY_ID'] === '') {
                childShapeMap[linksAndBodies[i]['BODY_ID']].zOrder.nextHigherShape = null;
            }
            else {
                childShapeMap[linksAndBodies[i]['BODY_ID']].zOrder.nextHigherShape = childShapeMap[linksAndBodies[i]['ZORDER_NEXT_HIGHER_BODY_ID']];
            }
        }
        if (linksAndBodies.length > 0) {
            childShapeMap[linksAndBodies[0]['BODY_ID']].zOrder.getTopShape().onMoveToTop();
        }
        this.changed = false;
        this.backGroundShape.registerDrawBuffer();
    }
,   addEntity: function(_x, _y, _edit) {
        var standardBodyFormat = this.getMyStandardBodyFormat(toolBox.ENTITY_TYPE_LINK);
        var w = toolBox.DEFAULT_LINK_WIDTH;
        var h = toolBox.DEFAULT_LINK_HEIGHT;
        var linkEntity = new Entity(
            this,
            this,
            this.defaultLayer,
            ((_x - this.currentActualX) - this.getActualInnerOffsetX()) / this.getActualZoom(),
            ((_y - this.currentActualY) - this.getActualInnerOffsetY()) / this.getActualZoom(),
            w,
            h,
            toolBox.ENTITY_TYPE_LINK
        );
        linkEntity.visible = false;
        linkEntity.bodyId = this.soulMaster.dataAccessAction.getNewBodyId();
        linkEntity.soulId = this.soulMaster.dataAccessAction.getNewSoulId();
        linkEntity.shapeFormat = standardBodyFormat;

        var standardBodyFormat = this.getMyStandardBodyFormat(toolBox.ENTITY_TYPE_BODY);
        w = toolBox.DEFAULT_BODY_WIDTH;
        h = toolBox.DEFAULT_BODY_HEIGHT;
        var bodyEntity = new Entity(
            this,
            this,
            this.defaultLayer,
            ((_x - this.currentActualX) - this.getActualInnerOffsetX()) / this.getActualZoom(),
            ((_y - this.currentActualY) - this.getActualInnerOffsetY()) / this.getActualZoom(),
            w,
            h,
            toolBox.ENTITY_TYPE_BODY
        );
        bodyEntity.visible = false;
        bodyEntity.bodyId = this.soulMaster.dataAccessAction.getNewBodyId();
        bodyEntity.soulId = this.soulMaster.dataAccessAction.getNewSoulId();
        bodyEntity.shapeFormat = standardBodyFormat;

        linkEntity.dockShape(bodyEntity, toolBox.DOCK_POSITION_LINK);

        bodyEntity.select(0, 0, false);

        var rect = new Rect(linkEntity.x, linkEntity.y, linkEntity.x + Math.max(linkEntity.w, bodyEntity.w), linkEntity.y + linkEntity.h + bodyEntity.h);
        var callBackTarget = null;
        if (_edit) {
            callBackTarget = this;
        }
        new ShapeCreationAnimation(
            this,
            this,
            this.backGroundShape.selectedShapeLayer,
            rect,
            callBackTarget,
            linkEntity,
            bodyEntity
        ).startAnimation();

        this.parentShape.registerDrawBuffer();

        return linkEntity;
    }
,   callBackFromShapeCreationAnimation: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        if (_arg2) {
            var bodyEntity = _arg2;
            bodyEntity.select(0, 0, false);
            this.soulMaster.selectedShapesAction.editTextOfSelectedShapesStart();
        }
    }
,   getMyStandardBodyFormat: function(_entityType) {
        var ret = null;
        for (var i=0;i<this.bodyFormats.length;i++) {
            if ((_entityType === toolBox.ENTITY_TYPE_BODY && this.bodyFormats[i].id === toolBox.BODY_FORMAT_ID_BODY_STANDARD) ||
                (_entityType === toolBox.ENTITY_TYPE_LINK && this.bodyFormats[i].id === toolBox.BODY_FORMAT_ID_LINK_STANDARD)
            ) {
                ret = this.bodyFormats[i];
                break;
            }
        }
        if (ret === null) {
            ret = new EntityFormat();
            if (_entityType === toolBox.ENTITY_TYPE_BODY) {
                ret.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(toolBox.BODY_FORMAT_ID_BODY_STANDARD));
            }
            else {
                ret.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(toolBox.BODY_FORMAT_ID_LINK_STANDARD));
            }
            toolBox.addToArray(this.bodyFormats, ret);
        }
        return ret;
    }
,   adjustInnerOffsetToStartPosition: function() {
        var targetBodyId = '';
        var xPlusY = 0;
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].isEntity) {
                if (i===0) {
                    xPlusY = this.childShapes[i].x + this.childShapes[i].y;
                    targetBodyId = this.childShapes[i].bodyId;
                }
                else {
                    if (xPlusY > this.childShapes[i].x + this.childShapes[i].y) {
                        xPlusY = Math.min(xPlusY, this.childShapes[i].x + this.childShapes[i].y);
                        targetBodyId = this.childShapes[i].bodyId;
                    }
                }
            }
        }
        if (targetBodyId !== '') {
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].bodyId === targetBodyId) {
                    this.innerOffsetY = -this.childShapes[i].y + ((this.h * 0.1) * (1 / this.innerZoom));
                    this.innerOffsetX = -this.childShapes[i].x + ((this.w * 0.1) * (1 / this.innerZoom));
                    break;
                }
            }
        }
    }
});

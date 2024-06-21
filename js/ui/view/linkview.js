var LinkView = function(){this.initialize.apply(this, arguments);}
LinkView.prototype = toolBox.extend(new EditView(), {
    bodyFormats : null
,   defaultText : ''
,   maxCalculateTimes       : 5
,   maxAnimationTimes       : 10
,   animationCounter        : 1
,   bodyModels              : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _bodyId) {
        if (!_parentShape) return;
        EditView.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType  = 'LinkView';
        this.bodyFormats = new Array();

        this.bodyId = _bodyId;

        this.alive = true;
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   startReCalcSpringMovement: function() {
        this.animationCounter = 1;
        this.soulMaster.mainAction.startFormatingLinkViewEntitiesAnimation(this);
    }
,   callBackFromLinkViewFormatAnimation: function() {
        this.reCalcSpringMovement();
        this.animationCounter++;
        if (this.animationCounter < this.maxAnimationTimes) {
            this.soulMaster.mainAction.startFormatingLinkViewEntitiesAnimation(this);
        }
        else {
            this.soulMaster.actionInProgress = false;
        }
    }
,   reCalcSpringMovement: function() {
        //ばねのアルゴリズムで分散配置
        for (var j=0;j<this.bodyModels.length;j++) {
            this.bodyModels[j].adjustCenterPointFromCurrentEntityPosition();
        }
        for (var i=0;i<this.maxCalculateTimes;i++) {
            for (var j=0;j<this.bodyModels.length;j++) {
                this.bodyModels[j].calcSpringMovement();
                this.bodyModels[j].applyMoveXYtoBodyModelAndEntity();
            }
//            this.soulMaster.mainAction.showProgress(i+1*2);
        }
        this.adjustInnerOffsetToStartPosition(false);
        this.changed = false;
        this.backGroundShape.registerDrawBuffer();
    }
,   isChanged: function(_row) {
        return false;
    }
,   saveToData: function() {
    }
,   showBodyData: function(_displayImageOnLoad) {
        this.reset();

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

        this.bodyModels = this.soulMaster.dataAccessAction.findBodyModelsForLinkView(this.bodyId, this.parentShape.linkViewStepCount, this.parentShape.linkFilters);
        this.generateBodyFormats(this.bodyModels);
        //初期位置設定
        var linkViewLockedSoulMap = this.parentShape.createMapOfLinkViewLocks();
        for (var i=0;i<this.bodyModels.length;i++) {
            if (this.bodyModels[i].bodyId === this.bodyId) {
                this.bodyModels[i].initializePosition(0, 0);
            }
            if (linkViewLockedSoulMap[this.bodyModels[i].soulId + this.bodyModels[i].bodyId]) {
                this.bodyModels[i].locked = true;
                this.bodyModels[i].centerX = linkViewLockedSoulMap[this.bodyModels[i].soulId + this.bodyModels[i].bodyId].centerX;
                this.bodyModels[i].centerY = linkViewLockedSoulMap[this.bodyModels[i].soulId + this.bodyModels[i].bodyId].centerY;
            }
        }
        
        //ばねのアルゴリズムで分散配置
        for (var i=0;i<this.maxCalculateTimes;i++) {
            for (var j=0;j<this.bodyModels.length;j++) {
                this.bodyModels[j].calcSpringMovement();
                this.bodyModels[j].applyMoveXYtoBodyModel();
            }
        }
        //初回表示時以降の整形処理によるバネの力を設定
        for (var i=0;i<this.bodyModels.length;i++) {
            this.bodyModels[i].pushingSpringPower = 0.05;
            this.bodyModels[i].pullingSpringPower = 0.01;
        }
        //Entity追加
        for (var i=0;i<this.bodyModels.length;i++) {
            this.bodyModels[i].addEntityToLinkView(this);
        }
        //結線
        for (var i=0;i<this.bodyModels.length;i++) {
            this.bodyModels[i].connectLinkedBodyModels();
        }
        
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();
        this.reCalcSpringMovement();

        this.adjustInnerOffsetToStartPosition(true);
        this.changed = false;
        this.backGroundShape.registerDrawBuffer();
    }
,   adjustInnerOffsetToStartPosition: function(_initializePosition) {
        for (var i=0;i<this.bodyModels.length;i++) {
            if (this.bodyModels[i].bodyId === this.bodyId) {
                var tempFormat = new EntityFormat();
                tempFormat.copyFrom(this.bodyModels[i].entity.shapeFormat);
                toolBox.addToArrayIfNotExists(this.bodyFormats, tempFormat);
                tempFormat.strokeStyle = toolBox.CENTER_SOUL_STROKE_COLOR;
                this.bodyModels[i].entity.shapeFormat = tempFormat;
                if (_initializePosition === true) {
                    this.innerOffsetY = -(this.bodyModels[i].entity.y + (this.bodyModels[i].entity.h / 2)) + ((this.h / 2) * (1 / this.innerZoom));
                    this.innerOffsetX = -(this.bodyModels[i].entity.x + (this.bodyModels[i].entity.w / 2)) + ((this.w / 2) * (1 / this.innerZoom));
                }
                break;
            }
        }
    }
,   generateBodyFormats: function(_bodyModels) {
        var bodyFormatList = new Array();
        for (var i=0;i<_bodyModels.length;i++) {
            toolBox.addToArrayIfNotExists(bodyFormatList, this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(_bodyModels[i].soulRow['BODY_FORMAT_ID']));
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
,   addEntity: function(_x, _y, _edit) {
    }
,   getLockedEntities: function() {
        var ret = new Array();
        for (var i=0;i<this.bodyModels.length;i++) {
            if (this.bodyModels[i].locked === true) {
                toolBox.addToArray(ret, this.bodyModels[i].entity);
            }
        }
        return ret;
    }
});

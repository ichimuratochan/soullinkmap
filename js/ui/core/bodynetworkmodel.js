var BodyNetworkModel = function(){this.initialize.apply(this, arguments);}
BodyNetworkModel.prototype = toolBox.extend(new BaseObject(), {
    soulId                  : ''
,   bodyId                  : ''
,   bodyRow                 : null
,   soulRow                 : null
,   entity                  : null
,   allBodyModels           : null
,   linkedToBodyModels      : null
,   linkedFromBodyModels    : null
,   directLinkBodyModels    : null
,   stepsFromCenter         : 0
,   soulShareCount          : 1
,   centerX                 : 0
,   centerY                 : 0
,   h                       : 0
,   w                       : 0
,   moveX                   : 0
,   moveY                   : 0
,   zeroPowerDistance       : 0
,   pushingSpringPower      : 0
,   pullingSpringPower      : 0
,   locked                  : false
,   isLinkBody              : false
,   entity                  : null
,   soulMaster              : null
,   initialize: function(_soulMaster, _bodyRow) {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'BodyNetworkModel';
        this.soulMaster = _soulMaster;
        this.allBodyModels = new Array();
        this.linkedToBodyModels = new Array();
        this.linkedFromBodyModels = new Array();
        this.directLinkBodyModels = new Array();
        this.soulId = _bodyRow['SOUL_ID'];
        this.bodyId = _bodyRow['BODY_ID'];
        this.bodyRow = _bodyRow;
        this.h = _bodyRow['H'];
        this.w = _bodyRow['W'];
        if (this.bodyRow['LINK_FLAG'] === '1') {
            this.isLinkBody = true;
            this.zeroPowerDistance = 100 + Math.sqrt(this.h * this.h + this.w * this.w) / 2;
            this.pushingSpringPower = 0.005;
            this.pullingSpringPower = 0.0025;
        }
        else {
            this.isLinkBody = false;
            this.zeroPowerDistance = 100 + Math.sqrt(this.h * this.h + this.w * this.w) / 2;
            this.pushingSpringPower = 0.005;
            this.pullingSpringPower = 0.0025;
        }
        this.soulShareCount = this.soulMaster.dataAccessAction.getCountOfBodiesBySoulId(this.soulId);
        this.soulRow = this.soulMaster.dataAccessAction.findSoulById(this.soulId);
    }
,   initializePosition: function(_x, _y) {
        this.moveX = 0;
        this.moveY = 0;
        this.centerX = toolBox.randomNumber(100);
        this.centerY = toolBox.randomNumber(100);
    }
,   adjustNotToBeIntersected: function(_bodyModel) {
        var adjusted = false;
        var maxAdjust = 5;
        var bodyModelFrom = null;
        var bodyModelTo = null;
//        if (this.stepsFromCenter > _bodyModel.stepsFromCenter || (this.stepsFromCenter === _bodyModel.stepsFromCenter && this.id > _bodyModel.id)) {
        for (var i=0;i<this.linkedFromBodyModels.length;i++) {
            if (this.stepsFromCenter > this.linkedFromBodyModels[i].stepsFromCenter) {
                for (var j=0;j<_bodyModel.linkedFromBodyModels.length;j++) {
                    if (_bodyModel.stepsFromCenter > _bodyModel.linkedFromBodyModels[j].stepsFromCenter) {
                        bodyModelFrom = _bodyModel.linkedFromBodyModels[j];
                        bodyModelTo = _bodyModel;
                    }
                    else {
                        bodyModelFrom = _bodyModel;
                        bodyModelTo = _bodyModel.linkedFromBodyModels[j];
                    }
                    if (toolBox.isTwoLinesIntersected(
                            this.linkedFromBodyModels[i].centerX,
                            this.linkedFromBodyModels[i].centerY,
                            this.centerX,
                            this.centerY,
                            bodyModelFrom.centerX,
                            bodyModelFrom.centerY,
                            bodyModelTo.centerX,
                            bodyModelTo.centerY
                    ) === true) {
                        if ((bodyModelTo.centerX - this.centerX) < 0) {
                            this.moveX += Math.max((bodyModelTo.centerX - this.centerX), -maxAdjust);
                        }
                        else if ((bodyModelTo.centerX - this.centerX) > 0) {
                            this.moveX += Math.min((bodyModelTo.centerX - this.centerX), maxAdjust);
                        }
                        if ((bodyModelTo.centerY - this.centerY) < 0) {
                            this.moveY += Math.max((bodyModelTo.centerY - this.centerY), -maxAdjust);
                        }
                        else if ((bodyModelTo.centerY - this.centerY) > 0) {
                            this.moveY += Math.min((bodyModelTo.centerY - this.centerY), maxAdjust);
                        }
                        adjusted = true;
                        break;
                    }
                    if (adjusted === true) {
                        break;
                    }
                }
            }
//            }
        }
        return adjusted;
    }
,   calcSpringMovement: function() {
        if (this.locked === true) {
            return;
        }
        var distance = 0;
        var isDirectLinkedBody = false;
        for (var i=0;i<this.allBodyModels.length;i++) {
            if (this.allBodyModels[i].bodyId !== this.bodyId) {
                if (this.centerX === this.allBodyModels[i].centerX || this.centerY === this.allBodyModels[i].centerY) {
                    this.centerX += toolBox.randomNumber(10);
                    this.centerY += toolBox.randomNumber(20) - 10;
                }
                this.adjustNotToBeIntersected(this.allBodyModels[i]);
                distance = Math.abs(toolBox.calcDistanceBetweenTwoPoint(this.centerX, this.centerY, this.allBodyModels[i].centerX, this.allBodyModels[i].centerY));
                isDirectLinkedBody = false;
                for (var j=0;j<this.linkedToBodyModels.length;j++) {
                    if (this.linkedToBodyModels[j] === this.allBodyModels[i]) {
                        isDirectLinkedBody = true;
                        break;
                    }
                }
                if (isDirectLinkedBody === false) {
                    for (var j=0;j<this.linkedFromBodyModels.length;j++) {
                        if (this.linkedFromBodyModels[j] === this.allBodyModels[i]) {
                            isDirectLinkedBody = true;
                            break;
                        }
                    }
                }
                toolBox.a = Math.max(this.zeroPowerDistance, this.allBodyModels[i].zeroPowerDistance);
                if (distance > toolBox.a && isDirectLinkedBody === true) {
                    //遠すぎるかつ直リンクBodyの場合は引力計算。
                    this.moveX += this.calcPointsToMoveForPulling(this.centerX, this.allBodyModels[i].centerX, distance, toolBox.a, this.pullingSpringPower);
                    this.moveY += this.calcPointsToMoveForPulling(this.centerY, this.allBodyModels[i].centerY, distance, toolBox.a, this.pullingSpringPower);
                }
                else if (distance <= toolBox.a) {
                    //近すぎる場合は斥力
                    this.moveX += this.calcPointsToMoveForPushing(this.centerX, this.allBodyModels[i].centerX, distance, toolBox.a, this.pushingSpringPower);
                    this.moveY += this.calcPointsToMoveForPushing(this.centerY, this.allBodyModels[i].centerY, distance, toolBox.a, this.pushingSpringPower);
                }
            }
        }
    }
,   adjustCenterPointFromCurrentEntityPosition: function() {
        this.moveX = 0;
        this.moveY = 0;
        this.centerX = this.entity.x + (this.entity.w / 2)
        this.centerY = this.entity.y + (this.entity.h / 2)
    }
,   applyMoveXYtoBodyModel: function() {
        if (this.locked === true) {
            return;
        }
        this.centerX += this.moveX;
        this.centerY += this.moveY;
        //摩擦係数をかける
        this.moveX = this.moveX * 0.7;
        this.moveY = this.moveY * 0.7;
    }
,   applyMoveXYtoBodyModelAndEntity: function() {
        if (this.locked === true) {
            return;
        }
        this.applyMoveXYtoBodyModel();
        this.entity.x = this.centerX - (this.w / 2);
        this.entity.y = this.centerY - (this.h / 2);
    }
,   calcPointsToMoveForPushing: function(_p, _p2, _distance, _zeroPowerDistance, _springPower) {
        if (_p > _p2) {
            return (_p - _p2) * (_zeroPowerDistance / _distance) * _springPower;
        }
        else {
            return (_p2 - _p) * (_zeroPowerDistance / _distance ) * _springPower * -1;
        }
    }
,   calcPointsToMoveForPulling: function(_p, _p2, _distance, _zeroPowerDistance, _springPower) {
        if (_p > _p2) {
            return (_p - _p2) * _springPower * -1;
        }
        else {
            return (_p2 - _p) * _springPower;
        }
    }
,   addEntityToLinkView: function(_view) {
        var entityType = toolBox.ENTITY_TYPE_BODY;
        if (this.isLinkBody === true) {
            entityType = toolBox.ENTITY_TYPE_LINK;
        }
        this.entity = new LinkViewEntity(
            _view,
            _view,
            _view.defaultLayer,
            this.centerX - (this.w / 2),
            this.centerY - (this.h / 2),
            this.w,
            this.h,
            entityType,
            this
        );
        this.entity.r = this.bodyRow['R'];
        this.entity.bodyId = this.bodyId;
        this.entity.soulId = this.soulId;
        this.entity.soulShareCount = this.soulShareCount;
        this.entity.text = this.soulRow['TEXT'];
        this.entity.setImageUrl(this.soulRow['IMAGE_URL'], true);
        this.entity.setHyperLinkUrl(this.soulRow['HYPER_LINK_URL'], this.soulRow['HYPER_LINK_URL_MODE'], this.soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']);
        var found = false;
        for (var i=0;i<_view.bodyFormats.length;i++) {
            if (_view.bodyFormats[i].id === this.soulRow['BODY_FORMAT_ID']) {
                this.entity.shapeFormat = _view.bodyFormats[i];
                found = true;
                break;
            }
        }
        if (found === false) {
            this.entity.shapeFormat = _view.getMyStandardBodyFormat(entityType);
        }
    }
,   connectLinkedBodyModels: function() {
        for (var i=0;i<this.linkedToBodyModels.length;i++) {
            this.entity.connectEntity(this.linkedToBodyModels[i].entity);
        }
    }
,   destroy: function() {
        this.bodyRow = null;
        this.soulRow = null;
        this.entity = null;
        this.allBodyModels = null;
        this.linkedToBodyModels.length = 0;
        this.linkedFromBodyModels.length = 0;
        this.directLinkBodyModels.length = 0;
    }
});

var BodyHierarchyModel = function(){this.initialize.apply(this, arguments);}
BodyHierarchyModel.prototype = toolBox.extend(new BaseObject(), {
    bodyId              : ''
,   parentBodyId        : ''
,   bodyRow             : null
,   soulRow             : null
,   entity              : null
,   isLinkBody          : false
,   isMainBody          : false
,   parentBodyModel     : null
,   parentBodyModels    : null
,   childBodyModels     : null
,   soulShareCount      : 1
,   x                   : 0
,   y                   : 0
,   h                   : 0
,   w                   : 0
,   childrensH          : 0
,   parentsH            : 0
,   childrensW          : 0
,   parentsW            : 0
,   horizontalSpace     : 50
,   verticalSpace       : 150
,   soulMaster          : null
,   initialize: function(_soulMaster, _bodyRow) {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'BodyHierarchyModel';
        this.soulMaster = _soulMaster;
        this.bodyId = _bodyRow['BODY_ID'];
        this.bodyRow = _bodyRow;
        this.parentBodyId = _bodyRow['PARENT_BODY_ID'];
        this.h = _bodyRow['H'];
        this.w = _bodyRow['W'];
        if (this.bodyRow['LINK_FLAG'] === '1') {
            this.isLinkBody = true;
        }
        else {
            this.isLinkBody = false;
        }
        this.soulShareCount = this.soulMaster.dataAccessAction.getCountOfBodiesBySoulId(_bodyRow['SOUL_ID'])
        this.soulRow = this.soulMaster.dataAccessAction.findSoulById(this.bodyRow['SOUL_ID']);
        this.parentBodyModels = new Array();
        this.childBodyModels = new Array();
    }
,   calcPositionForBirdView: function(_birdViewDirection, _horizontalSpace, _verticalSpace) {
//        this.isMainBody = true;
        this.horizontalSpace = _horizontalSpace * 10;
        this.verticalSpace = _verticalSpace * 10;
        if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
            this.verticalSpace = 20;
            this.calcChildrensHeightForHorizontalPositioning();
            this.calcParentsHeightForHorizontalPositioning();
            this.calcChildrensY(_birdViewDirection);
            this.calcParentsY(_birdViewDirection);
            this.calcChildrensX(_birdViewDirection);
            this.calcParentsX(_birdViewDirection);
        }
        else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
            this.horizontalSpace = 20;
            this.calcChildrensWidthForVerticalPositioning();
            this.calcParentsWidthForVerticalPositioning();
            this.calcChildrensY(_birdViewDirection);
            this.calcParentsY(_birdViewDirection);
            this.calcChildrensX(_birdViewDirection);
            this.calcParentsX(_birdViewDirection);
        }
    }
,   calcChildrensHeightForHorizontalPositioning: function() {
        var tempH = 0;
        var first = true;
        for (var i=0;i<this.childBodyModels.length;i++) {
            if (first === true) {
                first = false;
            }
            else {
                tempH += this.verticalSpace;
            }
            this.childBodyModels[i].horizontalSpace = this.horizontalSpace;
            this.childBodyModels[i].verticalSpace = this.verticalSpace;
            tempH += this.childBodyModels[i].calcChildrensHeightForHorizontalPositioning();
        }
        this.childrensH = tempH;
        if (this.childrensH < this.h) {
            this.childrensH = this.h;
        }
        return this.childrensH;
    }
,   calcParentsHeightForHorizontalPositioning: function() {
        var tempH = 0;
        var first = true;
        for (var i=0;i<this.parentBodyModels.length;i++) {
            if (first === true) {
                first = false;
            }
            else {
                tempH += this.verticalSpace;
            }
            this.parentBodyModels[i].horizontalSpace = this.horizontalSpace;
            this.parentBodyModels[i].verticalSpace = this.verticalSpace;
            tempH += this.parentBodyModels[i].calcParentsHeightForHorizontalPositioning();
        }
        this.parentsH = tempH;
        if (this.parentsH < this.h) {
            this.parentsH = this.h;
        }
        return this.parentsH;
    }
,   calcChildrensWidthForVerticalPositioning: function() {
        var tempW = 0;
        var first = true;
        for (var i=0;i<this.childBodyModels.length;i++) {
            if (first === true) {
                first = false;
            }
            else {
                tempW += this.horizontalSpace;
            }
            this.childBodyModels[i].horizontalSpace = this.horizontalSpace;
            this.childBodyModels[i].verticalSpace = this.verticalSpace;
            tempW += this.childBodyModels[i].calcChildrensWidthForVerticalPositioning();
        }
        this.childrensW = tempW;
        if (this.childrensW < this.w) {
            this.childrensW = this.w;
        }
        return this.childrensW;
    }
,   calcParentsWidthForVerticalPositioning: function() {
        var tempW = 0;
        var first = true;
        for (var i=0;i<this.parentBodyModels.length;i++) {
            if (first === true) {
                first = false;
            }
            else {
                tempW += this.horizontalSpace;
            }
            this.parentBodyModels[i].horizontalSpace = this.horizontalSpace;
            this.parentBodyModels[i].verticalSpace = this.verticalSpace;
            tempW += this.parentBodyModels[i].calcParentsWidthForVerticalPositioning();
        }
        this.parentsW = tempW;
        if (this.parentsW < this.w) {
            this.parentsW = this.w;
        }
        return this.parentsW;
    }
,   calcChildrensY: function(_birdViewDirection) {
        if (this.isMainBody === false) {
            if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                var found = false;
                for (var i=0;i<this.parentBodyModel.childBodyModels.length;i++) {
                    if (this.parentBodyModel.childBodyModels[i] === this) {
                        if (i !== 0) {
                            this.y = this.parentBodyModel.childBodyModels[i-1].y +
                                     (this.parentBodyModel.childBodyModels[i-1].h / 2) -
                                     (this.parentBodyModel.childBodyModels[i-1].childrensH / 2) +
                                     this.parentBodyModel.childBodyModels[i-1].childrensH +
                                     this.verticalSpace +
                                     (this.childrensH / 2) -
                                     (this.h / 2);
                            found = true;
                        }
                        break;
                    }
                }
                if (found === false) {
                    if (this.parentBodyModel.childBodyModels.length === 1) {
                        this.y = (this.parentBodyModel.y + (this.parentBodyModel.h / 2)) - (this.h / 2);
                    }
                    else {
                        this.y = (this.parentBodyModel.y + (this.parentBodyModel.h / 2)) - (this.parentBodyModel.childrensH / 2) + ((this.childrensH / 2) - (this.h / 2));
                    }
                }
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP) {
                this.y = this.parentBodyModel.y - this.verticalSpace - this.h;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
                this.y = this.parentBodyModel.y + this.parentBodyModel.h + this.verticalSpace;
            }
        }
        for (var i=0;i<this.childBodyModels.length;i++) {
            this.childBodyModels[i].calcChildrensY(_birdViewDirection);
        }
    }
,   calcParentsY: function(_birdViewDirection) {
        if (this.isMainBody === false) {
            if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                var found = false;
                for (var i=0;i<this.childBodyModels[0].parentBodyModels.length;i++) {
                    if (this.childBodyModels[0].parentBodyModels[i] === this) {
                        if (i !== 0) {
                            this.y = this.childBodyModels[0].parentBodyModels[i-1].y +
                                     (this.childBodyModels[0].parentBodyModels[i-1].h / 2) -
                                     (this.childBodyModels[0].parentBodyModels[i-1].parentsH / 2) +
                                     this.childBodyModels[0].parentBodyModels[i-1].parentsH +
                                     this.verticalSpace +
                                     (this.parentsH / 2) -
                                     (this.h / 2);
                            found = true;
                        }
                        break;
                    }
                }
                if (found === false) {
                    if (this.childBodyModels[0].parentBodyModels.length === 1) {
                        this.y = (this.childBodyModels[0].y + (this.childBodyModels[0].h / 2)) - (this.h / 2);
                    }
                    else {
                        this.y = (this.childBodyModels[0].y + (this.childBodyModels[0].h / 2)) - (this.childBodyModels[0].parentsH / 2) + ((this.parentsH / 2) - (this.h / 2));
                    }
                }
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP) {
                this.y = this.childBodyModels[0].y + this.childBodyModels[0].h + this.verticalSpace;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
                this.y = this.childBodyModels[0].y - this.verticalSpace - this.h;
            }
        }
        for (var i=0;i<this.parentBodyModels.length;i++) {
            this.parentBodyModels[i].calcParentsY(_birdViewDirection);
        }
    }
,   calcChildrensX: function(_birdViewDirection) {
        if (this.isMainBody === false) {
            if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT) {
                this.x = this.parentBodyModel.x + this.parentBodyModel.w + this.horizontalSpace;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                this.x = this.parentBodyModel.x - this.horizontalSpace - this.w;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
                var found = false;
                for (var i=0;i<this.parentBodyModel.childBodyModels.length;i++) {
                    if (this.parentBodyModel.childBodyModels[i] === this) {
                        if (i !== 0) {
                            this.x = this.parentBodyModel.childBodyModels[i-1].x +
                                     (this.parentBodyModel.childBodyModels[i-1].w / 2) -
                                     (this.parentBodyModel.childBodyModels[i-1].childrensW / 2) +
                                     this.parentBodyModel.childBodyModels[i-1].childrensW +
                                     this.horizontalSpace +
                                     (this.childrensW / 2) -
                                     (this.w / 2);
                            found = true;
                        }
                        break;
                    }
                }
                if (found === false) {
                    if (this.parentBodyModel.childBodyModels.length === 1) {
                        this.x = (this.parentBodyModel.x + (this.parentBodyModel.w / 2)) - (this.w / 2);
                    }
                    else {
                        this.x = (this.parentBodyModel.x + (this.parentBodyModel.w / 2)) - (this.parentBodyModel.childrensW / 2) + ((this.childrensW / 2) - (this.w / 2));
                    }
                }
            }
        }
        for (var i=0;i<this.childBodyModels.length;i++) {
            this.childBodyModels[i].calcChildrensX(_birdViewDirection);
        }
    }
,   calcParentsX: function(_birdViewDirection) {
        if (this.isMainBody === false) {
            if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT) {
                this.x = this.childBodyModels[0].x - this.horizontalSpace - this.w;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
                this.x = this.childBodyModels[0].x + this.childBodyModels[0].w + this.horizontalSpace;
            }
            else if (_birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP || _birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
                var found = false;
                for (var i=0;i<this.childBodyModels[0].parentBodyModels.length;i++) {
                    if (this.childBodyModels[0].parentBodyModels[i] === this) {
                        if (i !== 0) {
                            this.x = this.childBodyModels[0].parentBodyModels[i-1].x +
                                     (this.childBodyModels[0].parentBodyModels[i-1].w / 2) -
                                     (this.childBodyModels[0].parentBodyModels[i-1].parentsW / 2) +
                                     this.childBodyModels[0].parentBodyModels[i-1].parentsW +
                                     this.horizontalSpace +
                                     (this.parentsW / 2) -
                                     (this.w / 2);
                            found = true;
                        }
                        break;
                    }
                }
                if (found === false) {
                    if (this.childBodyModels[0].parentBodyModels.length === 1) {
                        this.x = (this.childBodyModels[0].x + (this.childBodyModels[0].w / 2)) - (this.w / 2);
                    }
                    else {
                        this.x = (this.childBodyModels[0].x + (this.childBodyModels[0].w / 2)) - (this.childBodyModels[0].parentsW / 2) + ((this.parentsW / 2) - (this.w / 2));
                    }
                }
            }
        }
        for (var i=0;i<this.parentBodyModels.length;i++) {
            this.parentBodyModels[i].calcParentsX(_birdViewDirection);
        }
    }
,   addEntityToBirdView: function(_view) {
        var entityType = toolBox.ENTITY_TYPE_BODY;
        if (this.isLinkBody === true) {
            entityType = toolBox.ENTITY_TYPE_LINK;
        }
        this.entity = new Entity(
            _view,
            _view,
            _view.defaultLayer,
            this.x,
            this.y,
            this.w,
            this.h,
            entityType
        );
        this.entity.r = this.bodyRow['R'];
        this.entity.bodyId = this.bodyId;
        this.entity.soulId = this.bodyRow['SOUL_ID'];
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
,   destroy: function() {
        this.bodyRow = null;
        this.soulRow = null;
        this.childBodyModels.length = 0;
        this.childBodyModels = null;
    }
});

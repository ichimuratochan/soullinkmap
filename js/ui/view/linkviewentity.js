var LinkViewEntity = function(){this.initialize.apply(this, arguments);}
LinkViewEntity.prototype = toolBox.extend(new Entity(), {
    bodyModel       : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _entityType, _bodyModel) {
        Entity.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _entityType]);
        this.bodyModel = _bodyModel;
        this.classType = 'LinkViewEntity';
    }
,   selectGroup: function() {
        for (var i=0;i<this.bodyModel.linkedToBodyModels.length;i++) {
            this.backGroundShape.addSelectedShape(this.bodyModel.linkedToBodyModels[i].entity);
            for (var j=0;j<this.bodyModel.linkedToBodyModels[i].linkedToBodyModels.length;j++) {
                this.backGroundShape.addSelectedShape(this.bodyModel.linkedToBodyModels[i].linkedToBodyModels[j].entity);
            }
        }
        for (var i=0;i<this.bodyModel.linkedFromBodyModels.length;i++) {
            this.backGroundShape.addSelectedShape(this.bodyModel.linkedFromBodyModels[i].entity);
            for (var j=0;j<this.bodyModel.linkedFromBodyModels[i].linkedFromBodyModels.length;j++) {
                this.backGroundShape.addSelectedShape(this.bodyModel.linkedFromBodyModels[i].linkedFromBodyModels[j].entity);
            }
        }
        this.zOrder.moveToTop();
        this.backGroundShape.addSelectedShape(this);
    }
,   move: function(_moveX, _moveY) {
        this.setActualX(this.currentActualX + _moveX);
        this.setActualY(this.currentActualY + _moveY);
        this.registerDrawBufferForResizableShape();
        this.syncDockedShapePosition(true);
        var locks = this.containerShape.parentShape.linkViewLockedSouls;
        for (var i=0;i<locks.length;i++) {
            if (locks[i].soulId === this.bodyModel.soulId && locks[i].bodyId === this.bodyModel.bodyId) {
                locks[i].centerX = this.x + (this.w / 2);
                locks[i].centerY = this.y + (this.h / 2);
                break;
            }
        }
    }
,   lockPosition: function() {
        this.bodyModel.locked = true;
    }
,   unlockPosition: function() {
        this.bodyModel.locked = false;
    }
,   afterInnerFade: function(_ctx) {

    }
,   afterDrawRect: function(_ctx) {
        if (this.bodyModel.locked === true) {
            _ctx.fillStyle = toolBox.LOCK_BOLT_FILL_COLOR;
            var margin = 3 * this.getParentZoom();
            var boltSize = toolBox.LOCK_BOLT_SIZE * this.getParentZoom();
            var halfOfBoltSize = boltSize / 2;

            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + margin + halfOfBoltSize, toolBox.tempY + margin + halfOfBoltSize, halfOfBoltSize, 0, Math.PI*2, false);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + toolBox.tempW - margin - halfOfBoltSize, toolBox.tempY + margin + halfOfBoltSize, halfOfBoltSize, 0, Math.PI*2, false);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + toolBox.tempW - margin - halfOfBoltSize, toolBox.tempY + toolBox.tempH - margin - halfOfBoltSize, halfOfBoltSize, 0, Math.PI*2, false);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + margin + halfOfBoltSize, toolBox.tempY + toolBox.tempH - margin - halfOfBoltSize, halfOfBoltSize, 0, Math.PI*2, false);
            _ctx.fill();
        }
    }
,   innerDestroy: function() {
        this.bodyModel = null;
    }
});

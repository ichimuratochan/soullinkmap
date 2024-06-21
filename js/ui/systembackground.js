var SystemBackGround = function(){this.initialize.apply(this, arguments);}
SystemBackGround.prototype = toolBox.extend(new BackGroundShape(), {
    initialize: function(_ioJobController, _hiddenLayer, _bottomLayer, _middleLayer, _topLayer, _tempLayer, _defaultLayer) {
        if (!_ioJobController) {
            return;
        }
        BackGroundShape.prototype.initialize.apply(this,[
            _ioJobController,
            _hiddenLayer,
            _bottomLayer,
            _middleLayer,
            _topLayer,
            _tempLayer,
            _defaultLayer,
            0,
            0,
            _ioJobController.canvasManager.getWidth(),
            _ioJobController.canvasManager.getHeight()
        ]);
        this.classType = 'SystemBackGround';
        this.soulMaster = new SoulMaster(this, this, this.middleLayer);
        this.alive = true;
    }
,   execute: function(_commandType, _x, _y) {
        var ret = null;
        if (_commandType === toolBox.COMMAND_TYPE_DIVE_OR_EDIT) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.soulMaster.mainAction.closeAll();
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_MOUSE_OVER) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_SELECT) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.soulMaster.mainAction.closeAll();
                this.soulMaster.savePointedXandY();
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_MULTI_SELECT) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.soulMaster.mainAction.closeAll();
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_DRAG) {
            ret = null;
        }
        else if (_commandType === toolBox.COMMAND_TYPE_DROP) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_ZOOM_IN) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.soulMaster.mainAction.closeAll();
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_ZOOM_OUT) {
            var hitChildShape = this.findHitChild(_x, _y);
            if (hitChildShape !== null) {
                return hitChildShape.execute(_commandType, _x, _y);
            }
            else {
                this.soulMaster.mainAction.closeAll();
                ret = null;
            }
        }
        else if (_commandType === toolBox.COMMAND_TYPE_DELETE) {
            this.soulMaster.selectedShapesAction.destroySelectedShape();
            ret = this.soulMaster;
        }
        else {
            ret = null;
        }
        return ret;
    }
,   innerDraw: function(_ctx, _drawLastPos) {
    }
});

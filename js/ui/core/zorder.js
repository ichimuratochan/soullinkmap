var ZOrder = function(){this.initialize.apply(this, arguments);}
ZOrder.prototype = toolBox.extend(new BaseObject(), {
    shape           : null
,   nextLowerShape  : null
,   nextHigherShape : null
,   initialize: function(_shape, _nextLowerShape) {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'ZOrder';
        this.shape = _shape;
        this.nextLowerShape = _nextLowerShape;
        if (this.nextLowerShape !== null) {
            this.nextLowerShape.zOrder.nextHigherShape = this.shape;
            this.nextLowerShape.onDropFromTop();
        }
    }
,   moveToTop: function() {
        this.shape.registerDrawBuffer();
        if (this.shape.parentShape && this.shape.parentShape !== this.shape.backGroundShape) {
            this.shape.parentShape.zOrder.moveToTop();
            if (this.shape.parentShape.fixedChildrensZOrder === true) {
                return;
            }
        }
        var curTopShape = this.getTopShape();
        if (curTopShape !== this.shape) {
            if (this.nextLowerShape !== null) {
                this.nextLowerShape.zOrder.nextHigherShape = this.nextHigherShape;
            }
            this.nextHigherShape.zOrder.nextLowerShape = this.nextLowerShape;
            this.nextHigherShape = null;
            this.nextLowerShape = curTopShape;
            curTopShape.zOrder.nextHigherShape = this.shape;
            curTopShape.onDropFromTop();
            this.shape.onMoveToTop();
        }
    }
,   moveToTopInTheSameLevel: function() {
        var curTopShape = this.getTopShape();
        if (curTopShape !== this.shape) {
            if (this.nextLowerShape !== null) {
                this.nextLowerShape.zOrder.nextHigherShape = this.nextHigherShape;
            }
            this.nextHigherShape.zOrder.nextLowerShape = this.nextLowerShape;
            this.nextHigherShape = null;
            this.nextLowerShape = curTopShape;
            curTopShape.zOrder.nextHigherShape = this.shape;
            curTopShape.onDropFromTop();
            this.shape.onMoveToTop();
        }
    }
,   moveToNextOfTargetShape: function(_targetShape) {
        if (_targetShape.zOrder.nextLowerShape !== this.shape) {
            var curTopShape = this.getTopShape();
            if (curTopShape === this.shape) {
                this.nextLowerShape.zOrder.moveToTopInTheSameLevel();
            }
            if (_targetShape.zOrder.nextLowerShape !== this.shape) {
                if (this.nextHigherShape !== null) {
                    this.nextHigherShape.zOrder.nextLowerShape = this.nextLowerShape;
                }
                if (this.nextLowerShape !== null) {
                    this.nextLowerShape.zOrder.nextHigherShape = this.nextHigherShape;
                }
                this.nextHigherShape = _targetShape;
                this.nextLowerShape = _targetShape.zOrder.nextLowerShape;
                _targetShape.zOrder.nextLowerShape = this.shape;
                if (this.nextLowerShape !== null) {
                    this.nextLowerShape.zOrder.nextHigherShape = this.shape;
                }
            }
        }
    }
,   isHigherThan: function(_shape) {
        var curShape = this.shape;
        while (true) {
            if (curShape.zOrder.nextLowerShape === _shape) {
                return true;
            }
            curShape = curShape.zOrder.nextLowerShape;
            if (curShape === null) {
                return false;
            }
        }
    }
,   getTopShape: function() {
        var curShape = this.shape;
        var counter = 0;
        while (true) {
            if (curShape.zOrder.nextHigherShape !== null) {
                curShape = curShape.zOrder.nextHigherShape;
            }
            else {
                break;
            }
            counter++;
            if (counter > 100000) {
                break;
            }
        }
        //予防策
        if (counter > 100000) {
            var shapes = curShape.parentShape.childShapes;
            for (var i=0;i<shapes.length;i++) {
                if (i === 0) {
                    shapes[i].zOrder.nextLowerShape = null;
                }
                else {
                    shapes[i].zOrder.nextLowerShape = shapes[i-1]
                }
                if (i === (shapes.length - 1)) {
                    shapes[i].zOrder.nextHigherShape = null;
                    curShape = shapes[i];
                }
                else {
                    shapes[i].zOrder.nextHigherShape = shapes[i+1];
                }
            }
        }
        return curShape;
    }
,   isTopShape: function() {
        return this.shape === this.getTopShape();
    }
,   getBottomShape: function() {
        var curShape = this.shape;
        var counter = 0;
        while (true) {
            if (curShape.zOrder.nextLowerShape !== null) {
                curShape = curShape.zOrder.nextLowerShape;
            }
            else {
                break;
            }
            counter++;
            if (counter > 100000) {
                break;
            }
        }
        //予防策
        if (counter > 100000) {
            var shapes = curShape.parentShape.childShapes;
            for (var i=0;i<shapes.length;i++) {
                if (i === 0) {
                    curShape = shapes[i];
                    shapes[i].zOrder.nextLowerShape = null;
                }
                else {
                    shapes[i].zOrder.nextLowerShape = shapes[i-1]
                }
                if (i === (shapes.length - 1)) {
                    shapes[i].zOrder.nextHigherShape = null;
                }
                else {
                    shapes[i].zOrder.nextHigherShape = shapes[i+1];
                }
            }
        }
        return curShape;
    }
,   destroy: function() {
        if (this.nextLowerShape !== null) {
            var isThisTop = false;
            if (this.getTopShape() === this.shape) {
                isThisTop = true;
            }
            this.nextLowerShape.zOrder.nextHigherShape = this.nextHigherShape;
            if (isThisTop === true) {
                this.nextLowerShape.onMoveToTop();
            }
        }
        if (this.nextHigherShape !== null) {
            this.nextHigherShape.zOrder.nextLowerShape = this.nextLowerShape;
        }
        this.nextLowerShape = null;
        this.nextHigherShape = null;
        this.shape = null;
    }
});

var MenuViewBase = function(){this.initialize.apply(this, arguments);}
MenuViewBase.prototype = toolBox.extend(new ContainerShape(), {
    menuItemWidth       : 150 //210
,   menuItemHeight      : 25
,   menuItemMargin      : 5
,   menuItems           : null
,   dragScrollAreaWidth : 17
,   showDragScrollArea  : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h) {
        if (!_parentShape) return;
        ContainerShape.prototype.initialize.apply(this,[_containerShape, _parentShape, _parentShape.backGroundShape.tempLayer, _defaultLayer, _x, _y, _w, _h]);
        this.syncPositionWithParentShape(true);
        this.classType  = 'MenuViewBase';
        this.horizontallyScrollable = false;
        this.verticallyScrollable = true;
        this.zoomable = false;

        this.shapeFormat.strokeStyle = '#d3d3d3';
        this.shapeFormat.fillStyle = '#FFFFFF';

        this.menuItems = new Array();
        this.initMenuItems();
        if (this.menuItems.length > 0) {
            this.menuItems[0].select(0, 0, false);
        }
   }
,   clearMenuItems: function() {
        while (this.menuItems.length > 0) {
            this.menuItems[this.menuItems.length-1].destroy();
            this.menuItems.length = this.menuItems.length - 1;
        }
    }
,   initMenuItems: function() {
    }
,   addMenuItem: function(_x, _y, _menuCommand, _menuCommandName) {
        var newItem = new MenuItem(
            this,
            this,
            this.defaultLayer,
            _x,
            _y,
            this.menuItemWidth,
            this.menuItemHeight
        );
        newItem.setMenuCommand(_menuCommand, _menuCommandName);
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   move: function(_moveX, _moveY) {
        if (this.horizontallyScrollable === true || this.verticallyScrollable === true) {
            if (this.horizontallyScrollable === true) {
                if (this.isOverHorizontalScrollLimit(_moveX) === true) {
                    return;
                }
                this.setActualInnerOffsetX(this.getActualInnerOffsetX() + _moveX);
            }
            if (this.verticallyScrollable === true) {
                if (this.isOverVerticalScrollLimit(_moveY) === true) {
                    return;
                }
                this.setActualInnerOffsetY(this.getActualInnerOffsetY() + _moveY);
            }
            this.registerDrawBuffer();
        }
    }
,   zoomIn: function(_x, _y) {
        this.zoomToScroll(_x, 10);
    }
,   zoomOut: function(_x, _y) {
        this.zoomToScroll(_x, -10);
    }
,   zoomToScroll: function(_x, _y) {
        var moveY = _y;
        if (this.isOverVerticalScrollLimit(moveY) === true) {
            return;
        }
        this.setActualInnerOffsetY(this.getActualInnerOffsetY() + moveY);
    }
,   isOverHorizontalScrollLimit: function(_moveX) {
        if (this.childShapes.length === 0) {
            return true;
        }
        var minX = this.childShapes[0].currentActualX;
        for (var i=1;i<this.childShapes.length;i++) {
            if (minX > this.childShapes[i].currentActualX) {
                minX = this.childShapes[i].currentActualX;
            }
        }
        if (_moveY >= 0 && (minX + _moveX > this.currentActualX + this.menuItemMargin)) {
            return true;
        }
        var maxX2 = this.childShapes[0].currentActualX2;
        for (var i=1;i<this.childShapes.length;i++) {
            if (maxX2 < this.childShapes[i].currentActualX2) {
                maxX2 = this.childShapes[i].currentActualX2;
            }
        }
        if (_moveX >= 0 && (maxX2 + _moveX < this.currentActualX2 - this.menuItemMargin)) {
            return true;
        }
        return false
    }
,   isOverVerticalScrollLimit: function(_moveY) {
        if (this.childShapes.length === 0) {
            return true;
        }
        var minY = this.childShapes[0].currentActualY;
        for (var i=1;i<this.childShapes.length;i++) {
            if (minY > this.childShapes[i].currentActualY) {
                minY = this.childShapes[i].currentActualY;
            }
        }
        if (_moveY >= 0 && (minY + _moveY > this.currentActualY + this.menuItemMargin)) {
            return true;
        }
        var maxY2 = this.childShapes[0].currentActualY2;
        for (var i=1;i<this.childShapes.length;i++) {
            if (maxY2 < this.childShapes[i].currentActualY2) {
                maxY2 = this.childShapes[i].currentActualY2;
            }
        }
        if (_moveY < 0 && (maxY2 + _moveY < this.currentActualY2 - this.menuItemMargin)) {
            return true;
        }
        return false
    }
,   commandDoubleHit: function(_x, _y) {
    }
,   drawContainerWithImage: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        var _ctx = _destinationLayer.ctx;
        this.alreadyDrawn = true;
        if (this.alive === false) {
            toolBox.clean(this);
            return;
        }
        if (this.isVisible() === true) {
            this.containerShape.startClip(this.getCtx(_ctx), _drawLastPos);
            this.innerDraw(this.getCtx(_ctx), _drawLastPos);
            this.containerShape.endClip(this.getCtx(_ctx));
        }
        var zOrderSortedShapes = new Array();
        this.zOrderSort(this.childShapes, zOrderSortedShapes);
        for (var i=0;i<zOrderSortedShapes.length;i++) {
            zOrderSortedShapes[i].draw(this.getCtx(_ctx), _drawLastPos);
        }
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);
        this.drawText(ctx);
        if (this.showDragScrollArea === true) {
            toolBox.setTempPos(this, _drawLastPos);
            ctx.fillStyle = '#f5f5f5';
            ctx.fillRRect(toolBox.tempX + toolBox.tempW - (this.dragScrollAreaWidth + this.menuItemMargin), toolBox.tempY + this.menuItemMargin, this.dragScrollAreaWidth, toolBox.tempH - (this.menuItemMargin * 2), 10);
        }
    }
,   doMenuAction: function() {
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                this.menuItems[i].menuCommand();
                return;
            }
        }
    }
,   selectNextUpwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i > 0) {
                    selectedMenuItem = this.menuItems[i-1]
                    break;
                }
                else {
                    selectedMenuItem = this.menuItems[this.menuItems.length-1]
                    break;
                }
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
        }
    }
,   selectNextDownwardMenuItem: function() {
        var selectedMenuItem = null;;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                if (i+1<this.menuItems.length) {
                    selectedMenuItem = this.menuItems[i+1]
                    break;
                }
                else {
                    selectedMenuItem = this.menuItems[0]
                    break;
                }
            }
        }
        if (selectedMenuItem != null) {
            selectedMenuItem.select(0, 0, false);
            this.scrollToShowSelectedMenuItem();
        }
    }
,   selectNextLeftwardMenuItem: function() {
        this.selectNextUpwardMenuItem();
    }
,   selectNextRightwardMenuItem: function() {
        this.selectNextDownwardMenuItem();
    }
,   scrollToShowSelectedMenuItem: function() {
        var selectedMenuItem = null;
        for (var i=0;i<this.menuItems.length;i++) {
            if (this.menuItems[i].isSelected() === true) {
                selectedMenuItem = this.menuItems[i];
                break;
            }
        }
        if (selectedMenuItem != null) {
            if (this.innerOffsetY + selectedMenuItem.y < 0) {
                this.zoomToScroll(0, -((this.innerOffsetY + selectedMenuItem.y) - this.menuItemMargin));
            }
            else if ((this.innerOffsetY + selectedMenuItem.y + selectedMenuItem.h) > this.h) {
                this.zoomToScroll(0, this.h - (this.innerOffsetY + selectedMenuItem.y + selectedMenuItem.h + this.menuItemMargin));
            }
        }
    }
,   save: function() {
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
});

var BirdViewDirectionSettingView = function(){this.initialize.apply(this, arguments);}
BirdViewDirectionSettingView.prototype = toolBox.extend(new MenuViewBase(), {
    menuItemWidth       : 60
,   menuItemHeight      : 60
,   menuItemUp          : null
,   menuItemDown        : null
,   menuItemRight       : null
,   menuItemLeft        : null
,   birdViewDirection   : toolBox.BIRDVIEW_DIRECTION_RIGHT
,   callBackTarget      : null
,   arg1                : null
,   arg2                : null
,   arg3                : null
,   arg4                : null
,   arg5                : null
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _callBackTarget, _defaultBirdViewDirection, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (!_parentShape) return;

        this.birdViewDirection = _defaultBirdViewDirection;

        this.callBackTarget = _callBackTarget;
        this.arg1 = _arg1;
        this.arg2 = _arg2;
        this.arg3 = _arg3;
        this.arg4 = _arg4;
        this.arg5 = _arg5;

        MenuViewBase.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);

        if (this.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_RIGHT) {
            this.menuItemRight.select(0, 0, false);
        }
        else if (this.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_LEFT) {
            this.menuItemLeft.select(0, 0, false);
        }
        else if (this.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_UP) {
            this.menuItemUp.select(0, 0, false);
        }
        else if (this.birdViewDirection === toolBox.BIRDVIEW_DIRECTION_DOWN) {
            this.menuItemDown.select(0, 0, false);
        }
        else {
            this.menuItemRight.select(0, 0, false);
        }

        this.classType = 'BirdViewDirectionSettingView';

        this.text = ' ';

        this.alive = true;
    }
,   initMenuItems: function() {
        this.menuItemUp = this.addBirdViewDirectionMenuItem(5 + this.menuItemWidth, 5, this.menuCommandUp, translator.t('上'));
        this.menuItemRight = this.addBirdViewDirectionMenuItem(5 + this.menuItemWidth + this.menuItemWidth, 5 + this.menuItemHeight, this.menuCommandRight, translator.t('右'));
        this.menuItemDown = this.addBirdViewDirectionMenuItem(5 + this.menuItemWidth, 5 + this.menuItemHeight + this.menuItemHeight, this.menuCommandDown, translator.t('下'));
        this.menuItemLeft = this.addBirdViewDirectionMenuItem(5, 5 + this.menuItemHeight, this.menuCommandLeft, translator.t('左'));
    }
,   addBirdViewDirectionMenuItem: function(_x, _y, _menuCommand, _menuCommandName) {
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
        newItem.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        newItem.shapeFormat.textVerticalAlign = 'middle';
        newItem.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        toolBox.addToArray(this.menuItems, newItem);
        return newItem;
    }
,   menuCommandUp: function() {
        this.parentShape.birdViewDirection = toolBox.BIRDVIEW_DIRECTION_UP;
        this.parentShape.save();
    }
,   menuCommandDown: function() {
        this.parentShape.birdViewDirection = toolBox.BIRDVIEW_DIRECTION_DOWN;
        this.parentShape.save();
    }
,   menuCommandRight: function() {
        this.parentShape.birdViewDirection = toolBox.BIRDVIEW_DIRECTION_RIGHT;
        this.parentShape.save();
    }
,   menuCommandLeft: function() {
        this.parentShape.birdViewDirection = toolBox.BIRDVIEW_DIRECTION_LEFT;
        this.parentShape.save();
    }
,   selectNextUpwardMenuItem: function() {
        this.menuItemUp.select(0, 0, false);
    }
,   selectNextDownwardMenuItem: function() {
        this.menuItemDown.select(0, 0, false);
    }
,   selectNextRightwardMenuItem: function() {
        this.menuItemRight.select(0, 0, false);
    }
,   selectNextLeftwardMenuItem: function() {
        this.menuItemLeft.select(0, 0, false);
    }
,   save: function() {
        this.callBackTarget.callBackFromBirdViewDirectionSettingView(this.birdViewDirection, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        this.parentShape.destroy();
    }
,   cancel: function() {
        this.parentShape.destroy();
    }
});

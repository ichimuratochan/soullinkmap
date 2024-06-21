var EntityViewFrame = function(){this.initialize.apply(this, arguments);}
EntityViewFrame.prototype = toolBox.extend(new ViewFrame(), {
    bodyId              : ''
,   minWidth            : (toolBox.BORDER_SIZE * 2) + 370
,   viewMode            : toolBox.VIEW_MODE_EDITVIEW
,   viewStyleMode       : toolBox.VIEW_STYLE_MODE_ORIGINAL
,   viewImageMode       : toolBox.VIEW_IMAGE_MODE_ORIGINAL
,   birdViewParentStepCount : 5
,   birdViewChildStepCount  : 5
,   birdViewDirection       : toolBox.BIRDVIEW_DIRECTION_RIGHT
,   birdViewHorizontalSpace : 5
,   birdViewVerticalSpace   : 15
,   birdViewLevel           : toolBox.BIRDVIEW_LEVEL_NORMAL
,   linkViewStepCount       : 5
,   readonlyFlag        : '0'
,   isEntityViewFrame   : true
,   viewStock           : null
,   linkFilters         : null
,   linkViewLockedSouls : null
,   pathBar             : null
,   searchControl       : null
,   viewOriginalShapeFormat : null
,   viewOriginalImageUrl    : ''
,   fixedChildrensZOrder    : true
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _bodyId) {
        ViewFrame.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, false, false]);
        this.classType = 'EntityViewFrame';
        this.text = translator.t('編集ビュー');
        this.bodyID = _bodyId;
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CHANGE_VIEWMODE);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_MAXIMIZE);
        new FrameButton(_containerShape, this, _defaultLayer, toolBox.FRAME_BUTTON_TYPE_CLOSE);
        this.pathBar = new PathBar(_containerShape, this, _defaultLayer);
        
        this.viewStock = new Array();
        this.linkFilters = new Array();
        this.linkViewLockedSouls = new Array();

        this.view = new EditView(
            _containerShape,
            this,
            _defaultLayer,
            toolBox.BORDER_SIZE + 1,
            toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2,
            this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH),
            this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2 + toolBox.SCROLL_BAR_WIDTH),
            this.bodyId
        );
        //Create instance of all mode of the view
        this.changeViewMode(toolBox.VIEW_MODE_BIRDVIEW);
        this.changeViewMode(toolBox.VIEW_MODE_LINKVIEW);
        this.changeViewMode(toolBox.VIEW_MODE_EDITVIEW);

        this.viewOriginalShapeFormat = new ShapeFormat();
        this.viewOriginalShapeFormat.copyFrom(this.view.shapeFormat);
        this.viewOriginalShapeFormat.fillStyle = this.backGroundShape.standardViewFormat.fillStyle;
        this.viewOriginalShapeFormat.textAlign = this.backGroundShape.standardViewFormat.textAlign;
        this.viewOriginalShapeFormat.textVerticalAlign = this.backGroundShape.standardViewFormat.textVerticalAlign;
        this.viewOriginalShapeFormat.textDescription = this.backGroundShape.standardViewFormat.textDescription;
        this.viewOriginalShapeFormat.textSize = this.backGroundShape.standardViewFormat.textSize;
        this.viewOriginalShapeFormat.textFont = this.backGroundShape.standardViewFormat.textFont;
        this.viewOriginalShapeFormat.textFillStyle = this.backGroundShape.standardViewFormat.textFillStyle;

        this.viewOriginalImageUrl = this.backGroundShape.standardViewImageUrl;

        this.view.shapeFormat.copyFrom(this.viewOriginalShapeFormat);
        this.view.setImageUrl('', false);
        this.view.setImageUrl(this.viewOriginalImageUrl, true);

        this.view.showBodyData(true);
        
        toolBox.addToArray(this.viewStock, this.view);
        
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_VERTICAL);
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_HORIZONTAL);
        new ScrollBar(_containerShape, this, _defaultLayer, this.view, toolBox.SCROLL_TYPE_RESET);

        this.searchControl = new SearchControl(_containerShape, this, _defaultLayer);

        this.zoomable = true;
        for (var i=0;i<this.childShapes.length;i++) {
            this.childShapes[i].zoomable = true;
        }

        this.alive = true;

        this.registerDrawBuffer();
    }
,   onDropFromTop: function() {
        var found = false;
        while (true) {
            found = false;
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].classType === 'ShapeBorder') {
                    found = true;
                    this.childShapes[i].destroy();
                    break;
                }
            }
            if (found === false) {
                break;
            }
        }
    }
,   changeViewMode: function(_viewMode) {
        if (toolBox.isNullOrUndefined(_viewMode) === false) {
            this.viewMode = _viewMode;
        }
        else {
            this.viewMode++;
            if (this.viewMode > toolBox.VIEW_MODE_MAX) {
                this.viewMode = toolBox.VIEW_MODE_EDITVIEW;
            }
        }

        this.view.visible = false;
        var resetViewPosition = false;
        var found = false;
        this.setViewTitle();
        if (this.viewMode === toolBox.VIEW_MODE_EDITVIEW) {
//            this.text = translator.t('編集ビュー');
            for (var i=0;i<this.viewStock.length;i++) {
                if (this.viewStock[i].classType === 'EditView') {
                    found = true;
                    if (this.viewStock[i].bodyId !== this.view.bodyId) { 
                        resetViewPosition = true;
                    }
                    this.viewStock[i].bodyId = this.view.bodyId;
                    this.view = this.viewStock[i];
                    break;
                }
            }
            if (found === false) {
                resetViewPosition = true;
                this.view = new EditView(
                    this.containerShape,
                    this,
                    this.defaultLayer,
                    toolBox.BORDER_SIZE + 1,
                    toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2,
                    this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.view.bodyId
                );
                toolBox.addToArray(this.viewStock, this.view);
            }
            if (resetViewPosition === true) {
                this.view.innerZoom = 1;
            }
            this.view.showBodyData(true);
            if (resetViewPosition === true) {
                this.view.adjustInnerOffsetToStartPosition();
            }
        }
        else if (this.viewMode === toolBox.VIEW_MODE_BIRDVIEW) {
//            this.text = translator.t('俯瞰ビュー');
            for (var i=0;i<this.viewStock.length;i++) {
                if (this.viewStock[i].classType === 'BirdView') {
                    found = true;
                    if (this.viewStock[i].bodyId !== this.view.bodyId) { 
                        resetViewPosition = true;
                    }
                    this.viewStock[i].bodyId = this.view.bodyId;
                    this.view = this.viewStock[i];
                    break;
                }
            }
            if (found === false) {
                resetViewPosition = true;
                this.view = new BirdView(
                    this.containerShape,
                    this,
                    this.defaultLayer,
                    toolBox.BORDER_SIZE + 1,
                    toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2,
                    this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.view.bodyId
                );
                toolBox.addToArray(this.viewStock, this.view);
            }
            if (resetViewPosition === true) {
                this.view.innerZoom = 1;
            }
            this.view.showBodyData(true);
            if (resetViewPosition === true) {
                this.view.adjustInnerOffsetToStartPosition();
            }
        }
        else if (this.viewMode === toolBox.VIEW_MODE_LINKVIEW) {
//            this.text = translator.t('Linkビュー');
            for (var i=0;i<this.viewStock.length;i++) {
                if (this.viewStock[i].classType === 'LinkView') {
                    found = true;
                    if (this.viewStock[i].bodyId !== this.view.bodyId) { 
                        resetViewPosition = true;
                    }
                    this.viewStock[i].bodyId = this.view.bodyId;
                    this.view = this.viewStock[i];
                    break;
                }
            }
            if (found === false) {
                resetViewPosition = true;
                this.view = new LinkView(
                    this.containerShape,
                    this,
                    this.defaultLayer,
                    toolBox.BORDER_SIZE + 1,
                    toolBox.BORDER_SIZE + 1 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2,
                    this.w - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.h - ((toolBox.BORDER_SIZE + 1) * 2 + toolBox.FRAME_BUTTON1_HEIGHT + 1 + toolBox.PATH_BAR_HEIGHT + 2 + toolBox.SCROLL_BAR_WIDTH),
                    this.view.bodyId
                );
                toolBox.addToArray(this.viewStock, this.view);
            }
            if (resetViewPosition === true) {
                this.view.innerZoom = 1;
            }
            this.view.showBodyData(true);
            if (resetViewPosition === true) {
                this.view.adjustInnerOffsetToStartPosition();
            }
        }
        this.view.visible = true;
        this.view.zOrder.moveToTop();
        this.view.zoomable = true;
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].classType === 'ScrollBar') {
                this.childShapes[i].targetContainerShape = this.view;
            }
        }
        this.registerDrawBuffer();
    }
,   getEditViewFromViewStock: function() {
        return this.getEntityView(toolBox.VIEW_MODE_EDITVIEW);
    }
,   getBirdViewFromViewStock: function() {
        return this.getEntityView(toolBox.VIEW_MODE_BIRDVIEW);
    }
,   getLinkViewFromViewStock: function() {
        return this.getEntityView(toolBox.VIEW_MODE_LINKVIEW);
    }
,   getEntityView: function(_viewMode) {
        var ret = null;
        for (var i=0;i<this.viewStock.length;i++) {
            if ((_viewMode === toolBox.VIEW_MODE_EDITVIEW && this.viewStock[i].classType === 'EditView') ||
                (_viewMode === toolBox.VIEW_MODE_BIRDVIEW && this.viewStock[i].classType === 'BirdView') ||
                (_viewMode === toolBox.VIEW_MODE_LINKVIEW && this.viewStock[i].classType === 'LinkView')) {
                ret = this.viewStock[i];
                break;
            }
        }
        return ret;
    }
,   saveToData: function() {
        var row = this.soulMaster.dataAccessAction.findViewStatusById(this.id);
        var nextLowerViewId = '';
        if (this.zOrder.nextLowerShape !== null && this.zOrder.nextLowerShape.isViewFrame) {
            nextLowerViewId = this.zOrder.nextLowerShape.id;
        }
        var nextHigherViewId = '';
        if (this.zOrder.nextHigherShape !== null && this.zOrder.nextHigherShape.isViewFrame) {
            nextHigherViewId = this.zOrder.nextHigherShape.id;
        }
        if (row === null) {
            this.soulMaster.dataAccessAction.addViewStatus(
                this.id,
                this.getViewMode(),
                this.viewStyleMode,
                this.viewImageMode,
                this.birdViewParentStepCount,
                this.birdViewChildStepCount,
                this.birdViewDirection,
                this.birdViewHorizontalSpace,
                this.birdViewVerticalSpace,
                this.birdViewLevel,
                this.linkViewStepCount,
                this.readonlyFlag,
                this.viewOriginalShapeFormat.fillStyle,
                this.viewOriginalShapeFormat.textDescription,
                this.viewOriginalShapeFormat.textSize,
                this.viewOriginalShapeFormat.textFont,
                this.viewOriginalShapeFormat.textFillStyle,
                this.view.bodyId,
                this.isMaximized(),
                this.x,
                this.y,
                this.w,
                this.h,
                this.r,
                this.resumeX,
                this.resumeY,
                this.resumeW,
                this.resumeH,
                this.view.innerOffsetX,
                this.view.innerOffsetY,
                this.view.innerZoom,
                this.viewOriginalImageUrl,
                nextLowerViewId,
                nextHigherViewId
            );
            for (var i=0;i<this.linkFilters.length;i++) {
                this.soulMaster.dataAccessAction.addLinkViewFilter(
                    this.id,
                    i,
                    this.linkFilters[i].soulId,
                    this.linkFilters[i].logicalOperator,
                    this.linkFilters[i].conditionOperator
                );
            }
            for (var i=0;i<this.linkViewLockedSouls.length;i++) {
                this.soulMaster.dataAccessAction.addLinkViewLock(
                    this.id,
                    this.linkViewLockedSouls[i].soulId,
                    this.linkViewLockedSouls[i].bodyId,
                    this.linkViewLockedSouls[i].centerX,
                    this.linkViewLockedSouls[i].centerY
                );
            }
        }
        else {
            this.soulMaster.dataAccessAction.updateViewStatus(
                this.id,
                this.getViewMode(),
                this.viewStyleMode,
                this.viewImageMode,
                this.birdViewParentStepCount,
                this.birdViewChildStepCount,
                this.birdViewDirection,
                this.birdViewHorizontalSpace,
                this.birdViewVerticalSpace,
                this.birdViewLevel,
                this.linkViewStepCount,
                this.readonlyFlag,
                this.viewOriginalShapeFormat.fillStyle,
                this.viewOriginalShapeFormat.textDescription,
                this.viewOriginalShapeFormat.textSize,
                this.viewOriginalShapeFormat.textFont,
                this.viewOriginalShapeFormat.textFillStyle,
                this.view.bodyId,
                this.isMaximized(),
                this.x,
                this.y,
                this.w,
                this.h,
                this.r,
                this.resumeX,
                this.resumeY,
                this.resumeW,
                this.resumeH,
                this.view.innerOffsetX,
                this.view.innerOffsetY,
                this.view.innerZoom,
                this.viewOriginalImageUrl,
                nextLowerViewId,
                nextHigherViewId
            );
            this.soulMaster.dataAccessAction.deleteLinkViewFilters(this.id);
            for (var i=0;i<this.linkFilters.length;i++) {
                this.soulMaster.dataAccessAction.addLinkViewFilter(
                    this.id,
                    i,
                    this.linkFilters[i].soulId,
                    this.linkFilters[i].logicalOperator,
                    this.linkFilters[i].conditionOperator
                );
            }
            this.soulMaster.dataAccessAction.deleteLinkViewLocks(this.id);
            for (var i=0;i<this.linkViewLockedSouls.length;i++) {
                this.soulMaster.dataAccessAction.addLinkViewLock(
                    this.id,
                    this.linkViewLockedSouls[i].soulId,
                    this.linkViewLockedSouls[i].bodyId,
                    this.linkViewLockedSouls[i].centerX,
                    this.linkViewLockedSouls[i].centerY
                );
            }
        }
        if (this.view.changed === true) {
            this.view.saveToData();
        }
        this.changed = false;
    }
,   isChanged:  function() {
        if (this.changed === true) {
            return true;
        }
        var ret = false;
        var row = this.soulMaster.dataAccessAction.findViewStatusById(this.id);
        if (row === null) {
            this.changed = true;
            ret = true;
        }
        else {
            var nextLowerViewId = '';
            if (this.zOrder.nextLowerShape !== null && this.zOrder.nextLowerShape.isViewFrame) {
                nextLowerViewId = this.zOrder.nextLowerShape.id;
            }
            var nextHigherViewId = '';
            if (this.zOrder.nextHigherShape !== null && this.zOrder.nextHigherShape.isViewFrame) {
                nextHigherViewId = this.zOrder.nextHigherShape.id;
            }
            if (this.viewMode !== row['VIEW_MODE'] ||
                this.viewStyleMode !== row['VIEW_STYLE_MODE'] ||
                this.viewImageMode !== row['VIEW_IMAGE_MODE'] ||
                this.birdViewParentStepCount !== row['BIRDVIEW_PARENT_STEP_COUNT'] ||
                this.birdViewChildStepCount !== row['BIRDVIEW_CHILD_STEP_COUNT'] ||
                this.birdViewDirection !== row['BIRDVIEW_DIRECTION'] ||
                this.birdViewHorizontalSpace !== row['BIRDVIEW_HORIZONTAL_SPACE'] ||
                this.birdViewVerticalSpace !== row['BIRDVIEW_VERTICAL_SPACE'] ||
                this.birdViewLevel !== row['BIRDVIEW_LEVEL'] ||
                this.linkViewStepCount !== row['LINKVIEW_STEP_COUNT'] ||
                this.readonlyFlag !== row['READONLY_FLAG'] ||
                this.viewOriginalShapeFormat.fillStyle !== row['FILL_STYLE'] ||
                this.viewOriginalShapeFormat.textDescription !== row['TEXT_DESCRIPTION'] ||
                this.viewOriginalShapeFormat.textSize !== row['TEXT_SIZE'] ||
                this.viewOriginalShapeFormat.textFont !== row['TEXT_FONT'] ||
                this.viewOriginalShapeFormat.textFillStyle !== row['TEXT_FILL_STYLE'] ||
                this.view.bodyId !== row['BODY_ID'] ||
                this.isMaximized() !== (row['MAXIMIZED_FLAG'] === '1') ||
                this.x !== row['X'] ||
                this.y !== row['Y'] ||
                this.w !== row['W'] ||
                this.h !== row['H'] ||
                this.r !== row['R'] ||
                this.resumeX !== row['RESUME_X'] ||
                this.resumeY !== row['RESUME_Y'] ||
                this.resumeW !== row['RESUME_W'] ||
                this.resumeH !== row['RESUME_H'] ||
                this.view.innerOffsetX !== row['INNER_OFFSET_X'] ||
                this.view.innerOffsetY !== row['INNER_OFFSET_Y'] ||
                this.view.innerZoom !== row['INNER_ZOOM'] ||
                this.viewOriginalImageUrl !== row['IMAGE_URL'] ||
                nextLowerViewId !== row['ZORDER_NEXT_LOWER_VIEW_ID'] ||
                nextHigherViewId !== row['ZORDER_NEXT_HIGHER_VIEW_ID']
            ) {
                this.changed = true;
                ret = true;
            }
            if (this.changed === false) {
                var linkViewFilterRows = this.soulMaster.dataAccessAction.findLinkViewFiltersByViewId(this.id);
                if (this.linkFilters.length !== linkViewFilterRows.length) {
                    this.changed = true;
                    ret = true;
                }
                else {
                    for (var i=0;i<linkViewFilterRows.length;i++) {
                        if (this.linkFilters[i]) {
                            if (this.linkFilters[i].soulId !== linkViewFilterRows[i]['SOUL_ID'] ||
                                this.linkFilters[i].logicalOperator !== linkViewFilterRows[i]['LOGICAL_OPERATOR'] ||
                                this.linkFilters[i].conditionOperator !== linkViewFilterRows[i]['CONDITION_OPERATOR']) {
                                this.changed = true;
                                ret = true;
                                break;
                            }
                        }
                        else {
                            this.changed = true;
                            ret = true;
                            break;
                        }
                    }
                    if (this.changed === false) {
                        var linkViewLockRows = this.soulMaster.dataAccessAction.findLinkViewLocksByViewId(this.id);
                        if (this.linkViewLockedSouls.length !== linkViewLockRows.length) {
                            this.changed = true;
                            ret = true;
                        }
                        else {
                            var linkViewLockMap = this.createMapOfLinkViewLocks();
                            for (var i=0;i<linkViewLockRows.length;i++) {
                                if (linkViewLockMap[linkViewLockRows[i]['SOUL_ID'] + linkViewLockRows[i]['BODY_ID']]) {
                                    if (linkViewLockMap[linkViewLockRows[i]['SOUL_ID'] + linkViewLockRows[i]['BODY_ID']].centerX !== linkViewLockRows[i]['CENTER_X'] ||
                                        linkViewLockMap[linkViewLockRows[i]['SOUL_ID'] + linkViewLockRows[i]['BODY_ID']].centerY !== linkViewLockRows[i]['CENTER_Y']) {
                                        this.changed = true;
                                        ret = true;
                                        break;
                                    }
                                }
                                else {
                                    this.changed = true;
                                    ret = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this.backGroundShape.isTopOfEditView(this) === true && this.view.isChanged(row) === true) {
            this.changed = true;
            ret = true;
        }
        return ret;
    }
,   createMapOfLinkViewLocks: function() {
        var linkViewLockedSoulMap = {};
        for (var i=0;i<this.linkViewLockedSouls.length;i++) {
            linkViewLockedSoulMap[this.linkViewLockedSouls[i].soulId + this.linkViewLockedSouls[i].bodyId] = this.linkViewLockedSouls[i];
        }
        return linkViewLockedSoulMap;
    }
,   reflectToLinkViewLockedSouls: function() {
        this.linkViewLockedSouls = new Array();
        var linkView = this.getLinkViewFromViewStock();
        if (linkView === null) {
            return;
        }
        var targetEntity = null;
        var linkViewLock = null;
        for (var i=0;i<linkView.childShapes.length;i++) {
            targetEntity = linkView.childShapes[i];
            if (targetEntity.classType === 'LinkViewEntity') {
                if (targetEntity.bodyModel.locked === true) {
                    linkViewLock = new LinkViewLock();
                    linkViewLock.soulId = targetEntity.bodyModel.soulId;
                    linkViewLock.bodyId = targetEntity.bodyModel.bodyId;
                    linkViewLock.centerX = targetEntity.x + (targetEntity.w / 2);
                    linkViewLock.centerY = targetEntity.y + (targetEntity.h / 2);
                    toolBox.addToArray(this.linkViewLockedSouls, linkViewLock);
                }
            }
        }
    }
,   clearLinkViewLockedSouls: function() {
        this.linkViewLockedSouls = new Array();
    }
,   getViewMode: function() {
        return this.viewMode;
    }
,   setViewTitle: function() {
        if (this.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
            this.text = translator.t('編集ビュー');
        }
        else if (this.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
            this.text = translator.t('俯瞰ビュー');
        }
        else if (this.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
            this.text = translator.t('Linkビュー');
        }
    }
,   showData: function(_row) {
        this.id = _row['VIEW_ID'];
        this.x = _row['X'];
        this.y = _row['Y'];
        this.w = _row['W'];
        this.h = _row['H'];
        this.r = _row['R'];
        if (_row['MAXIMIZED_FLAG'] === '1') {
            this.getButton(toolBox.FRAME_BUTTON_TYPE_MAXIMIZE).commandMaximize();
        }
        this.resumeX = _row['RESUME_X'];
        this.resumeY = _row['RESUME_Y'];
        this.resumeW = _row['RESUME_W'];
        this.resumeH = _row['RESUME_H'];
        this.saveCurrentDrawingPoints();
        var linkViewFilterRows = this.soulMaster.dataAccessAction.findLinkViewFiltersByViewId(this.id);
        this.linkFilters.length = 0;
        var linkFilter = null;
        for (var i=0;i<linkViewFilterRows.length;i++) {
            linkFilter = new FilterDefinition();
            linkFilter.soulId = linkViewFilterRows[i]['SOUL_ID'];
            linkFilter.text = this.soulMaster.dataAccessAction.getTextOfSoulById(linkViewFilterRows[i]['SOUL_ID']);
            linkFilter.logicalOperator = linkViewFilterRows[i]['LOGICAL_OPERATOR'];
            linkFilter.conditionOperator = linkViewFilterRows[i]['CONDITION_OPERATOR'];
            toolBox.addToArray(this.linkFilters, linkFilter);
        }
        var linkViewLockRows = this.soulMaster.dataAccessAction.findLinkViewLocksByViewId(this.id);
        this.linkViewLockedSouls.length = 0;
        var linkViewLockedSoul = null;
        for (var i=0;i<linkViewLockRows.length;i++) {
            linkViewLockedSoul = new LinkViewLock();
            linkViewLockedSoul.soulId = linkViewLockRows[i]['SOUL_ID'];
            linkViewLockedSoul.bodyId = linkViewLockRows[i]['BODY_ID'];
            linkViewLockedSoul.centerX = linkViewLockRows[i]['CENTER_X'];
            linkViewLockedSoul.centerY = linkViewLockRows[i]['CENTER_Y'];
            toolBox.addToArray(this.linkViewLockedSouls, linkViewLockedSoul);
        }
        this.viewStyleMode = _row['VIEW_STYLE_MODE'];
        this.viewImageMode = _row['VIEW_IMAGE_MODE'];
        this.birdViewParentStepCount = _row['BIRDVIEW_PARENT_STEP_COUNT'];
        this.birdViewChildStepCount = _row['BIRDVIEW_CHILD_STEP_COUNT']
        this.birdViewDirection = _row['BIRDVIEW_DIRECTION'];
        this.birdViewHorizontalSpace = _row['BIRDVIEW_HORIZONTAL_SPACE'];
        this.birdViewVerticalSpace = _row['BIRDVIEW_VERTICAL_SPACE'];
        this.birdViewLevel = _row['BIRDVIEW_LEVEL'];
        this.linkViewStepCount = _row['LINKVIEW_STEP_COUNT'];
        this.readonlyFlag = _row['READONLY_FLAG'];
        this.changeViewMode(_row['VIEW_MODE']);
        this.view.showViewData(_row);
        this.view.showBodyData(true);
        this.reflectToLinkViewLockedSouls();
        this.saveLastDrawingPoints();
        this.changed = false;
    }
,   showBodyData: function(_displayImageOnLoad) {
        this.view.showBodyData(_displayImageOnLoad);
        this.changed = false;
    }
,   isVisible: function() {
        if (this.visible === false) {
            return false;
        }
        if (this.isOutOfSight() === true) {
            return false;
        }
        else {
            var skylights = this.skylightRects;
            if (skylights === null) {
                return true;
            }
            for (var i=0;i<skylights.length;i++) {
                if (toolBox.rectHitRect(
                    this.currentActualX,
                    this.currentActualY,
                    this.currentActualX2,
                    this.currentActualY2,
                    skylights[i].x,
                    skylights[i].y,
                    skylights[i].x2,
                    skylights[i].y2
                ) === true) {
                    return true;
                }
            }
            return false;
        }
    }
,   isEntitySelected: function() {
        var selected = false;
        for (var i=0;i<this.view.childShapes.length;i++) {
            if (this.view.childShapes[i].isEntity && this.view.childShapes[i].isSelected() === true) {
                selected = true;
                break;
            }
        }
        return selected;
    }
,   innerDestroy: function() {
        this.linkFilters.length = 0;
        new ShapeDestructionAnimation(
            this.containerShape,
            this.parentShape,
            this.backGroundShape.selectedShapeLayer,
            this.x,
            this.y,
            this.w,
            this.h
        ).startAnimation();
        toolBox.addToArray(this.backGroundShape.garbages, this);
    }
});

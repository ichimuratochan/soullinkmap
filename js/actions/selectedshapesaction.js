var SelectedShapesAction = function(){this.initialize.apply(this, arguments);}
SelectedShapesAction.prototype = toolBox.extend(new ActionBase(), {
    editTarget  : null
,   editTargets : null
,   targetEntities  : null
,   targetView      : null
,   initialize: function(_soulMaster) {
        ActionBase.prototype.initialize.apply(this,[_soulMaster]);
        this.classType = 'SelectedShapesAction';
        this.alive = true;
    }
,   createEntity: function() {
        var newEntity = null
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview !== null) {
                if (topview.view) {
                    newEntity = topview.view.commandDoubleHit(this.soulMaster.savedX, this.soulMaster.savedY);
                    this.soulMaster.targetBackGround.registerDrawBuffer();
                }
            }
        }
        return newEntity;
    }
,   destroySelectedShape: function() {
        var targetShape = null;
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
            if (targetShape.isEntity) {
                if (targetShape.parentShape.classType === 'EditView') {
                    //garbageに詰める順序をBODYを先→LINKを後にするために以下ハンドリング実施
                    if (targetShape.entityType === toolBox.ENTITY_TYPE_LINK) {
                        var dockedShape = targetShape.getDockedShape();
                        if (dockedShape !== null) {
                            toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, dockedShape);
                        }
                        toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, targetShape);
                    }
                    else {
                        toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, targetShape);
                        var dockedShape = targetShape.getDockedShape();
                        if (dockedShape !== null) {
                            toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, dockedShape);
                        }
                    }
                    targetShape.destroy();
                }
            }
            else if (targetShape.isViewFrame) {
                targetShape.destroy();
            }
        }
        this.soulMaster.targetBackGround.clearSelectedShapes();
    }
,   copySelectedEntities: function() {
        this.soulMaster.clipBoard.length = 0;
        var targetShape = null;
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
            if (targetShape.isEntity) {
                toolBox.addToArrayIfNotExists(this.soulMaster.clipBoard, targetShape.bodyId);
                this.soulMaster.clipBoardMode = toolBox.CLIPBOARD_MODE_COPY;
            }
        }
    }
,   cutSelectedEntities: function() {
        this.soulMaster.clipBoard.length = 0;
        var targetShape = null;
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
            if (targetShape.isEntity) {
                toolBox.addToArrayIfNotExists(this.soulMaster.clipBoard, targetShape.bodyId);
                this.soulMaster.clipBoardMode = toolBox.CLIPBOARD_MODE_CUT;
            }
        }
    }
,   pasteEntities: function() {
        if (this.soulMaster.clipBoard.length > 0) {
            this.soulMaster.doAnimation = false;
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview === null) {
                return;
            }
            if (!topview.isEntityViewFrame) {
                return;
            }
            if (topview.getViewMode() !== toolBox.VIEW_MODE_EDITVIEW) {
                return;
            }
            var pasteLinks = new Array();
            var pasteLinkBodyIdList = new Array();
            for (var i=0;i<this.soulMaster.clipBoard.length;i++) {
                var bodyRow = this.soulMaster.dataAccessAction.findBodyById(this.soulMaster.clipBoard[i]);
                if (bodyRow !== null) {
                    if (bodyRow['LINK_FLAG'] === '1') {
                        toolBox.addToArrayIfNotExists(pasteLinks, bodyRow);
                        toolBox.addToArrayIfNotExists(pasteLinkBodyIdList, bodyRow['BODY_ID']);
                    }
                    else {
                        bodyRow = this.soulMaster.dataAccessAction.findBodyById(bodyRow['PARENT_BODY_ID']);
                        if (bodyRow !== null) {
                            toolBox.addToArrayIfNotExists(pasteLinks, bodyRow);
                            toolBox.addToArrayIfNotExists(pasteLinkBodyIdList, bodyRow['BODY_ID']);
                        }
                    }
                }
            }
            if (topview.view.bodyId === pasteLinks[0]['BODY_ID'] ||
                this.soulMaster.dataAccessAction.isBodyADecsendantOfBodyB(topview.view.bodyId, pasteLinks[0]['BODY_ID']) === true) {
                alert(translator.t('そのBody自身あるいは親Bodyを貼り付けできません'));
                return;
            }

            //PASTE
            var minX = 0;
            var minY = 0;
            var first = true;
            for (var i=0;i<pasteLinks.length;i++) {
                if (first === true) {
                    minX = pasteLinks[i]['X'];
                    minY = pasteLinks[i]['Y'];
                    first = false;
                }
                else {
                    if (minX > pasteLinks[i]['X']) {
                        minX = pasteLinks[i]['X'];
                    }
                    if (minY > pasteLinks[i]['Y']) {
                        minY = pasteLinks[i]['Y'];
                    }
                }
            }
            var rows = null;
            var row = null;
            var soulRow = null;
            var linkEntity = null;
            var bodyEntity = null;
            for (var i=0;i<pasteLinks.length;i++) {
                row = pasteLinks[i];
                linkEntity = topview.view.addEntity(1, 1, false);
                linkEntity.pastedFromBodyId = row['BODY_ID'];
                linkEntity.x = ((this.soulMaster.savedX - topview.view.currentActualX - topview.view.getActualInnerOffsetX()) / topview.view.getActualZoom()) + (row['X'] - minX);
                linkEntity.y = ((this.soulMaster.savedY - topview.view.currentActualY - topview.view.getActualInnerOffsetY()) / topview.view.getActualZoom()) + (row['Y'] - minY);
                linkEntity.w = row['W'];
                linkEntity.h = row['H'];
                linkEntity.r = row['R'];
                soulRow = this.soulMaster.dataAccessAction.findSoulById(row['SOUL_ID']);
                if (toolBox.trim(soulRow['TEXT']) === '') {
                    linkEntity.soulId = this.soulMaster.dataAccessAction.getNewSoulId();;
                }
                else {
                    linkEntity.soulId = row['SOUL_ID'];
                }
                linkEntity.text = soulRow['TEXT'];
                linkEntity.setImageUrl(soulRow['IMAGE_URL'], true);
                linkEntity.setHyperLinkUrl(soulRow['HYPER_LINK_URL'], soulRow['HYPER_LINK_URL_MODE'], soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']);
                linkEntity.soulShareCount = this.soulMaster.dataAccessAction.getCountOfBodiesBySoulId(linkEntity.soulId) + 1;
                if (soulRow['BODY_FORMAT_ID'] !== toolBox.BODY_FORMAT_ID_BODY_STANDARD && soulRow['BODY_FORMAT_ID'] !== toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
                    linkEntity.shapeFormat = new EntityFormat();
                    linkEntity.shapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']));
                    if (toolBox.trim(soulRow['TEXT']) === '') {
                        linkEntity.shapeFormat = new EntityFormat();
                        linkEntity.shapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']));
                        linkEntity.shapeFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                    }
                    toolBox.addToArray(topview.view.bodyFormats, linkEntity.shapeFormat);
                }
                rows = this.soulMaster.dataAccessAction.findBodiesByParentBodyId(row['BODY_ID']);
                if (rows.length > 0) {
                    for (var j=0;j<rows.length;j++) {
                        row = rows[j];
                        if (row['LINK_FLAG'] === '0') {
                            bodyEntity = linkEntity.getDockedShape();
                            bodyEntity.pastedFromBodyId = row['BODY_ID'];
                            bodyEntity.x = ((this.soulMaster.savedX - topview.view.currentActualX - topview.view.getActualInnerOffsetX()) / topview.view.getActualZoom()) + (row['X'] - minX);
                            bodyEntity.y = ((this.soulMaster.savedY - topview.view.currentActualY - topview.view.getActualInnerOffsetY()) / topview.view.getActualZoom()) + (row['Y'] - minY);
                            bodyEntity.w = row['W'];
                            bodyEntity.h = row['H'];
                            bodyEntity.r = row['R'];
                            soulRow = this.soulMaster.dataAccessAction.findSoulById(row['SOUL_ID']);
                            if (toolBox.trim(soulRow['TEXT']) === '') {
                                bodyEntity.soulId = this.soulMaster.dataAccessAction.getNewSoulId();;
                            }
                            else {
                                bodyEntity.soulId = row['SOUL_ID'];
                            }
                            bodyEntity.text = soulRow['TEXT'];
                            bodyEntity.setImageUrl(soulRow['IMAGE_URL'], true);
                            bodyEntity.setHyperLinkUrl(soulRow['HYPER_LINK_URL'], soulRow['HYPER_LINK_URL_MODE'], soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']);
                            bodyEntity.soulShareCount = this.soulMaster.dataAccessAction.getCountOfBodiesBySoulId(bodyEntity.soulId) + 1;
                            if (soulRow['BODY_FORMAT_ID'] !== toolBox.BODY_FORMAT_ID_BODY_STANDARD && soulRow['BODY_FORMAT_ID'] !== toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
                                bodyEntity.shapeFormat = new EntityFormat();
                                bodyEntity.shapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']));
                                if (toolBox.trim(soulRow['TEXT']) === '') {
                                    bodyEntity.shapeFormat = new EntityFormat();
                                    bodyEntity.shapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']));
                                    bodyEntity.shapeFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                                }
                                toolBox.addToArray(topview.view.bodyFormats, bodyEntity.shapeFormat);
                            }
                            break;
                        }
                    }
                }


//                var rect = new Rect(linkEntity.x, linkEntity.y, linkEntity.x + linkEntity.w, linkEntity.y + linkEntity.h + bodyEntity.h);
//                new ShapeCreationAnimation(
//                    topview.view,
//                    topview.view,
//                    this.soulMaster.targetBackGround.selectedShapeLayer,
//                    rect,
//                    this,
//                    linkEntity,
//                    bodyEntity
//                ).startAnimation();

            }
//            topview.view.garbageUnnecessaryBodyFormats();
            this.soulMaster.dataAccessAction.saveToData();

            if (this.soulMaster.clipBoardMode === toolBox.CLIPBOARD_MODE_CUT) {
                this.soulMaster.dataAccessAction.directDeleteBodyDataForCut(pasteLinkBodyIdList);
                this.soulMaster.clipBoard.length = 0;
            }
            this.soulMaster.targetBackGround.reset();
            this.soulMaster.targetBackGround.showData();
            this.soulMaster.doAnimation = true;
        }
    }
,   shareSoul: function(_targetEntities, _soulId) {
        var soulRow = this.soulMaster.dataAccessAction.findSoulById(_soulId);
        if (soulRow !== null) {
            for (var i=0;i<_targetEntities.length;i++) {
                if (_targetEntities[i].soulId !== _soulId) {
                    toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(_targetEntities[i].soulId));
                }
                _targetEntities[i].soulId = _soulId;
                _targetEntities[i].text = soulRow['TEXT'];
                _targetEntities[i].setImageUrl(soulRow['IMAGE_URL'], true);
                _targetEntities[i].setHyperLinkUrl(soulRow['HYPER_LINK_URL'], soulRow['HYPER_LINK_URL_MODE'], soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']);
                var found = false;
                for (var j=0;j<_targetEntities[i].parentShape.bodyFormats.length;j++) {
                    if (_targetEntities[i].parentShape.bodyFormats[j].id === soulRow['BODY_FORMAT_ID']) {
                        found = true;
                        _targetEntities[i].shapeFormat = _targetEntities[i].parentShape.bodyFormats[j];
                        break;
                    }
                }
                if (found === false) {
                    _targetEntities[i].shapeFormat = new EntityFormat();
                    _targetEntities[i].shapeFormat.loadFromBodyFormatRowData(this.soulMaster.dataAccessAction.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']));
                }
                _targetEntities[i].parentShape.registerDrawBuffer();
            }
        }
    }
,   independSelectedBodyFromSharedSouls: function() {
        var targetEntity = null;
        var targetEntities = new Array();
        var oldSoulIdList = new Array();
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            targetEntity = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
            if (targetEntity.isEntity) {
                if (targetEntity.soulShareCount > 1) {
                    var oldSoulId = targetEntity.soulId;
                    toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(oldSoulId));
                    toolBox.addToArray(oldSoulIdList, oldSoulId);
                    targetEntity.soulId = this.soulMaster.dataAccessAction.getNewSoulId();
                    targetEntity.setImageUrl('', true);
                    targetEntity.setHyperLinkUrl('', toolBox.HYPER_LINK_URL_MODE_NORMAL, '0');
                    var newEntityFormat = new EntityFormat();
                    newEntityFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                    newEntityFormat.copyFrom(targetEntity.shapeFormat);
                    targetEntity.shapeFormat = newEntityFormat;
                    toolBox.addToArray(targetEntity.parentShape.bodyFormats, newEntityFormat);
//                    targetEntity.shapeFormat = targetEntity.parentShape.getMyStandardBodyFormat(targetEntity.entityType);
                    toolBox.addToArray(targetEntities, targetEntity);
                }
            }
        }
        if (targetEntities.length > 0) {
            this.soulMaster.dataAccessAction.saveToData();
            if (targetEntities[0].parentShape.classType === 'EditView') {
                targetEntities[0].parentShape.showBodyData(true);
            }
            this.soulMaster.targetBackGround.registerDrawBuffer();
        }
    }
,   createMultipleEntities: function() {
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview !== null) {
                if (topview.view) {
                    for (var i=0;i<3;i++) {
                        for (var j=0;j<3;j++) {
                            topview.view.addEntity(toolBox.mouseX + (i * 130 * topview.view.getActualZoom()), toolBox.mouseY + (j * 130 * topview.view.getActualZoom()), false);
                        }
                    }
                    this.soulMaster.targetBackGround.registerDrawBuffer();
                }
            }
        }
    }
,   dockShapes: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 2) {
            var shape1 = this.soulMaster.targetBackGround.selectedShapes[0];
            var shape2 = this.soulMaster.targetBackGround.selectedShapes[1];
            if (shape1.dockedShapeInfos.length > 0 || shape2.dockedShapeInfos.length > 0) {
                return;
            }
            var x1 = shape1.currentActualX + (shape1.currentActualW / 2);
            var y1 = shape1.currentActualY + (shape1.currentActualH / 2);
            var x21 = shape1.currentActualX2;
            var y21 = shape1.currentActualY2;
            var w1 = shape1.currentActualW;
            var h1 = shape1.currentActualH;
            var x2 = shape2.currentActualX + (shape2.currentActualW / 2);
            var y2 = shape2.currentActualY + (shape2.currentActualH / 2);
            var x22 = shape2.currentActualX2;
            var y22 = shape2.currentActualY2;
            var w2 = shape2.currentActualW;
            var h2 = shape2.currentActualH;
            var dockPosition = toolBox.DOCK_POSITION_TOP;
            if (x2 > x1) {
                if (y2 > y1) {
                    if (x2 > x21 && y2 > y21) {
                        dockPosition = toolBox.DOCK_POSITION_BOTTOM_RIGHT_CORNER;
                    }
                    else {
                        if (x2 - x1 > y2 - y1) {
                            dockPosition = toolBox.DOCK_POSITION_RIGHT;
                        }
                        else {
                            dockPosition = toolBox.DOCK_POSITION_BOTTOM;
                        }
                    }
                }
                else {
                    if (x2 > x21 && y2 <= shape1.currentActualY) {
                        dockPosition = toolBox.DOCK_POSITION_TOP_RIGHT_CORNER;
                    }
                    else {
                        if (x2 - x1 > y1 - y2) {
                            dockPosition = toolBox.DOCK_POSITION_RIGHT;
                        }
                        else {
                            dockPosition = toolBox.DOCK_POSITION_TOP;
                        }
                    }
                }
            }
            else {
                if (y2 > y1) {
                    if (x2 < shape1.currentActualX && y2 > y21) {
                        dockPosition = toolBox.DOCK_POSITION_BOTTOM_LEFT_CORNER;
                    }
                    else {
                        if (x1 - x2 > y2 - y1) {
                            dockPosition = toolBox.DOCK_POSITION_LEFT;
                        }
                        else {
                            dockPosition = toolBox.DOCK_POSITION_BOTTOM;
                        }
                    }
                }
                else {
                    if (x2 < x21 && y2 < y21) {
                        dockPosition = toolBox.DOCK_POSITION_TOP_LEFT_CORNER;
                    }
                    else {
                        if (x1 - x2 > y1 - y2) {
                            dockPosition = toolBox.DOCK_POSITION_LEFT;
                        }
                        else {
                            dockPosition = toolBox.DOCK_POSITION_TOP;
                        }
                    }
                }
            }
            shape1.dockShape(shape2, dockPosition);
            this.soulMaster.targetBackGround.registerDrawBuffer();
        }
    }
,   undockShapes: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]).undockAllShapes();
        }
        else if (this.soulMaster.targetBackGround.selectedShapes.length === 2) {
            var shape1 = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            var shape2 = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[1]);
            shape1.undockShape(shape2);
        }
    }
,   adjustToViewAll: function() {
        if (this.soulMaster.targetBackGround.isSelected()) {
            this.soulMaster.targetBackGround.moveAndZoomToViewAll();
        }
        else {
            var targetShape = null;
            targetShape = this.getTopViewFrame();
            if (targetShape.view) {
                targetShape.view.moveAndZoomToViewAll();
            }
/*
            for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
                targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
                if (targetShape.view) {
                    targetShape.view.moveAndZoomToViewAll();
                }
                else if (targetShape.isContainerShape) {
                    targetShape.moveAndZoomToViewAll();
                }
                else if (targetShape.containerShape) {
                    targetShape.containerShape.moveAndZoomToViewAll();
                }
            }
*/
        }
        this.soulMaster.targetBackGround.registerDrawBuffer();
    }
,   changeSelectedShapeType: function() {
        var found = false;
        var targetShape = null;
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]);
            if (!targetShape.isBackGroundShape) {
                if (targetShape.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RECT) {
                    targetShape.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
                    found = true;
                }
                else if (targetShape.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RRECT) {
                    targetShape.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RECT;
                    found = true;
                }
            }
        }
        if (found === true) {
            this.soulMaster.targetBackGround.registerDrawBuffer();
        }
    }
,   editTextOfSelectedShapesStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length > 0) {
            var targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (targetShape.isEntity || targetShape.isBackGroundShape) {
                this.editTargets = new Array();
                for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
                    toolBox.addToArray(this.editTargets, this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]));
                }
                if (this.editTargets[0].isEntity && this.editTargets[0].parentShape.classType !== 'EditView') {
                    return;
                }
                this.soulMaster.actionInProgress = true;

                var defaultText = '';
                for (var i=0;i<this.editTargets.length;i++) {
                    if (toolBox.trim(this.editTargets[i].text) !== '') {
                        defaultText = this.editTargets[i].text;
                        break;
                    }
                }

                var newTextBox = new TextBoxFrame(
                    this.soulMaster.backGroundShape,
                    this.soulMaster.backGroundShape,
                    this.soulMaster.defaultLayer,
                    this,
                    defaultText,
                    'editTextOfSelectedShape'
                );
                newTextBox.shapeFormat.fillStyle = this.editTargets[0].shapeFormat.fillStyle;
                newTextBox.shapeFormat.textFillStyle = this.editTargets[0].shapeFormat.textFillStyle;
                newTextBox.shapeFormat.shapeType = this.editTargets[0].shapeFormat.shapeType;
                newTextBox.visible = false;

                this.soulMaster.mainAction.startShapeTransferAnimation(this.editTargets[0].getRect(), newTextBox.getRect(), this.editTargets[0].shapeFormat, newTextBox);
            }
        }
    }
,   callBackFromTextBox: function(_resultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        if (this.editTargets[0].isBackGroundShape) {
            this.editTargets[0].text = _resultText;
            this.editTargets[0].registerDrawBuffer();
            this.soulMaster.mainAction.closeAll();
        }
        else {
            var changed = false;
            var specialSoul = false;
            for (var i=0;i<this.editTargets.length;i++) {
                if (this.editTargets[i].text !== _resultText) {
                    changed = true;
                }
                if (this.soulMaster.dataAccessAction.isSpecialSoulId(this.editTargets[i].soulId) === true) {
                    specialSoul = true;
                }
            }
            //選択エンティティのどれか一つとでも違うTEXTが入力され、かつ選択エンティティは特殊LINKではない
//            if (changed === true && specialSoul == false) {
            //選択エンティティは特殊LINKではない
            if (specialSoul === false) {
                if (this.editTargets.length === 1) {
                    //選択エンティティが一つの場合はTEXTを修正して後処理でsaveToDataで保存
                    if (toolBox.trim(_resultText) === '') {
                        //入力TEXTが空なら全てSoul独立
                        this.editTargets[0].text = _resultText;
                        toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(this.editTargets[0].soulId));
                        this.editTargets[0].soulId = this.soulMaster.dataAccessAction.getNewSoulId();
                        this.editTargets[0].setImageUrl('', true);
                        this.editTargets[0].setHyperLinkUrl('', toolBox.HYPER_LINK_URL_MODE_NORMAL, '0');
//                        this.editTargets[0].shapeFormat = this.editTargets[0].parentShape.getMyStandardBodyFormat(this.editTargets[0].entityType);
                        var newEntityFormat = new EntityFormat();
                        newEntityFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                        newEntityFormat.copyFrom(this.editTargets[0].shapeFormat);
                        this.editTargets[0].shapeFormat = newEntityFormat;
                        toolBox.addToArray(this.editTargets[0].parentShape.bodyFormats, newEntityFormat);
                    }
                    else {
                        this.editTargets[0].text = _resultText;
                    }
                }
                else {
                    //選択エンティティが複数の場合は状況によって処理を分岐
                    if (toolBox.trim(_resultText) === '') {
                        //入力TEXTが空なら全てSoul独立
                        for (var i=0;i<this.editTargets.length;i++) {
                            this.editTargets[i].text = _resultText;
                            toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(this.editTargets[i].soulId));
                            this.editTargets[i].soulId = this.soulMaster.dataAccessAction.getNewSoulId();
                            this.editTargets[i].setImageUrl('', true);
                            this.editTargets[i].setHyperLinkUrl('', toolBox.HYPER_LINK_URL_MODE_NORMAL, '0');
//                            this.editTargets[i].shapeFormat = this.editTargets[i].parentShape.getMyStandardBodyFormat(this.editTargets[i].entityType);
                            var newEntityFormat = new EntityFormat();
                            newEntityFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                            newEntityFormat.copyFrom(this.editTargets[i].shapeFormat);
                            this.editTargets[i].shapeFormat = newEntityFormat;
                            toolBox.addToArray(this.editTargets[i].parentShape.bodyFormats, newEntityFormat);
                        }
                    }
                    else {
                        var isAllBlankTextTargets = true;
                        for (var i=0;i<this.editTargets.length;i++) {
                            if (toolBox.trim(this.editTargets[i].text) !== '') {
                                isAllBlankTextTargets = false;
                                break;
                            }
                        }
                        var befSoulId = '';
                        var isAllTheSameSoulTargets = true;
                        for (var i=0;i<this.editTargets.length;i++) {
                            if (i === 0) {
                                befSoulId = this.editTargets[i].soulId;
                            }
                            else {
                                if (this.editTargets[i].soulId !== befSoulId) {
                                    isAllTheSameSoulTargets = false;
                                    break;
                                }
                            }
                        }
                        var newSoulId = this.soulMaster.dataAccessAction.getNewSoulId();
                        for (var i=0;i<this.editTargets.length;i++) {
                            this.editTargets[i].text = _resultText;
                            if (isAllBlankTextTargets === true) {
                                //全てのエンティティが元々TEXTが空の場合は新しいTEXTでSoul共有する
                                this.editTargets[i].text = _resultText;
                                toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(this.editTargets[i].soulId));
                                this.editTargets[i].soulId = newSoulId;
                                this.editTargets[i].setImageUrl('', true);
                                this.editTargets[i].setHyperLinkUrl('', toolBox.HYPER_LINK_URL_MODE_NORMAL, '0');
                                this.editTargets[i].shapeFormat = this.editTargets[i].parentShape.getMyStandardBodyFormat(this.editTargets[i].entityType);
                            }
                            else if (isAllTheSameSoulTargets === true) {
                                //全てのエンティティが同じSoulの場合は、TEXTを変更して共有しているSoulのTEXTが変更されるようにする
                                this.editTargets[i].text = _resultText;
                            }
                            else {
                                //全てのエンティティがバラバラのSoulの場合は新しいTEXTの新しいSoulでグループのみでSoul共有する
                                this.editTargets[i].text = _resultText;
                                toolBox.addToArrayIfNotExists(this.soulMaster.targetBackGround.garbages, this.soulMaster.dataAccessAction.findSoulById(this.editTargets[i].soulId));
                                this.editTargets[i].soulId = newSoulId;
                                this.editTargets[i].setImageUrl('', true);
                                this.editTargets[i].setHyperLinkUrl('', toolBox.HYPER_LINK_URL_MODE_NORMAL, '0');
                                this.editTargets[i].shapeFormat = this.editTargets[i].parentShape.getMyStandardBodyFormat(this.editTargets[i].entityType);
                            }
                        }
                    }
                }
                this.soulMaster.dataAccessAction.saveToData();
                if (this.editTargets[0].parentShape) {
                    if (this.editTargets[0].parentShape.classType === 'EditView') {
                        this.editTargets[0].parentShape.showBodyData(true);
                    }
                    this.editTargets[0].parentShape.registerDrawBuffer();
                }
                else {
                    this.editTargets[0].registerDrawBuffer();
                }
                this.soulMaster.mainAction.closeAll();
                this.popupSimilarSouls();
            }
            else {
                this.soulMaster.mainAction.closeAll();
            }
        }
    }
,   editTextOfSelectedBodyStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var targetEntity = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (targetEntity.isEntity) {
                if (targetEntity.entityType === toolBox.ENTITY_TYPE_BODY) {
                    this.editTextOfSelectedShapesStart();
                }
                else {
                    var bodyEntity = targetEntity.getPairEntity();
                    if (bodyEntity !== null) {
                        bodyEntity.select(0, 0, false);
                        this.editTextOfSelectedShapesStart();
                    }
                }
            }
        }
    }
,   editTextOfSelectedLinkStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var targetEntity = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (targetEntity.isEntity) {
                if (targetEntity.entityType === toolBox.ENTITY_TYPE_LINK) {
                    this.editTextOfSelectedShapesStart();
                }
                else {
                    var linkEntity = targetEntity.getPairEntity();
                    if (linkEntity !== null) {
                        linkEntity.select(0, 0, false);
                        this.editTextOfSelectedShapesStart();
                    }
                }
            }
        }
    }
,   editImageOfSelectedShapeStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var editTarget = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (editTarget.classType != 'Entity' && 
                editTarget.classType != 'EditView' &&
                editTarget.classType != 'BirdView' &&
                editTarget.classType != 'LinkView' &&
                editTarget.classType != 'MainBackGround'
                ) {
                return;
            }
            if (editTarget.isEntity && editTarget.parentShape && editTarget.parentShape.classType !== 'EditView') {
                return;
            }
            if (editTarget.classType === 'EditView' && editTarget.parentShape.viewImageMode !== toolBox.VIEW_IMAGE_MODE_ORIGINAL) {
                return;
            }
            this.soulMaster.actionInProgress = true;

            var newInputBox = new InputBoxFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                editTarget,
                editTarget.imageUrl,
                'editImageOfSelectedShape'
            );
            newInputBox.shapeFormat.fillStyle = editTarget.shapeFormat.fillStyle;
            newInputBox.shapeFormat.shapeType = editTarget.shapeFormat.shapeType;
            newInputBox.shapeFormat.textFillStyle = editTarget.shapeFormat.textFillStyle;
            newInputBox.visible = false;

            this.soulMaster.mainAction.startShapeTransferAnimation(editTarget.getRect(), newInputBox.getRect(), editTarget.shapeFormat, newInputBox);

        }
    }
,   editHyperLinkUrlofSelectedShapeStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var editTarget = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (!editTarget.isEntity) {
                return;
            }
            if (editTarget.parentShape && editTarget.parentShape.classType !== 'EditView') {
                return;
            }
            this.soulMaster.actionInProgress = true;

            var newInputBox = new HyperLinkUrlBoxFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                editTarget,
                editTarget.hyperLinkUrl,
                editTarget.hyperLinkUrlMode,
                editTarget.hyperLinkJsonpDirectJumpFlag,
                'editHyperLinkOfSelectedShape'
            );
            newInputBox.visible = false;

            this.soulMaster.mainAction.startShapeTransferAnimation(editTarget.getRect(), newInputBox.getRect(), editTarget.shapeFormat, newInputBox);

        }
    }
,   editStyleStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length >= 1) {
            this.soulMaster.mainAction.closeAll();
            var targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (targetShape.isEntity) {
                this.editEntityStyleStart();
            }
            else if (targetShape.isEntityView || targetShape.isBackGroundShape) {
                this.editViewStyleStart();
            }
        }
    }
,   editEntityStyleStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length >= 1 && this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]).parentShape) {
            this.soulMaster.mainAction.closeAll();
            this.editTargets = new Array();
            for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
                if (this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]).isEntity) {
                    toolBox.addToArray(this.editTargets, this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]));
                }
            }
            if (this.editTargets.length > 0) {
                if (this.editTargets[0].parentShape.classType !== 'EditView') {
                    return;
                }
                this.soulMaster.actionInProgress = true;
                var newFormatSettingBox = new EntityFormatSettingViewFrame(
                    this.soulMaster.backGroundShape,
                    this.soulMaster.backGroundShape,
                    this.soulMaster.defaultLayer,
                    this,
                    this.editTargets[0].shapeFormat
                );
                newFormatSettingBox.visible = false;

                this.soulMaster.mainAction.startShapeTransferAnimation(this.editTargets[0].getRect(), newFormatSettingBox.getRect(), this.editTargets[0].shapeFormat, newFormatSettingBox);
            }
        }
    }
,   callBackFromEntityFormatSettingView: function(_sender, _resultShapeFormat, _arg1, _arg2, _arg3, _arg4, _arg4) {
        var editShapeFormat = _resultShapeFormat;
        var bodyFormats = this.editTargets[0].parentShape.bodyFormats;
        if (_sender.isTargetSelectedBodyOrLinkStyle() === true) {
            var newShapeFormat = null;
            var newBodyFormatIds = {};
            for (var i=0;i<this.editTargets.length;i++) {
                newShapeFormat = new EntityFormat();
                newShapeFormat.copyFrom(editShapeFormat);
                newShapeFormat.id = this.soulMaster.dataAccessAction.getNewBodyFormatId();
                newBodyFormatIds[newShapeFormat.id] = true;
                toolBox.addToArray(bodyFormats, newShapeFormat);
                this.editTargets[i].shapeFormat = newShapeFormat;
            }
            for (var i=0;i<this.editTargets.length;i++) {
                for (var j=0;j<this.editTargets[i].parentShape.childShapes.length;j++) {
                    if (this.editTargets[i].parentShape.childShapes[j].soulId === this.editTargets[i].soulId &&
                        this.editTargets[i].parentShape.childShapes[j] !== this.editTargets[i]) {
                        if (!newBodyFormatIds[this.editTargets[i].parentShape.childShapes[j].shapeFormat.id]) {
                            this.editTargets[i].parentShape.childShapes[j].shapeFormat = this.editTargets[i].shapeFormat;
                        }
                    }
                }
            }
        }
        else {
            var isLinkTarget = _sender.isTargetLinkStandardStyle();
            var standardFormatId = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
            if (isLinkTarget === true) {
                standardFormatId = toolBox.BODY_FORMAT_ID_LINK_STANDARD;
            }
            var found = false;
            for (var i=0;i<this.editTargets.length;i++) {
                if ((isLinkTarget === true && this.editTargets[i].entityType === toolBox.ENTITY_TYPE_LINK) ||
                    (isLinkTarget === false && this.editTargets[i].entityType === toolBox.ENTITY_TYPE_BODY)
                   ) {
                    found = true;
                    break;
                }
            }
            if (found === true) {
                var formatFound = false;
                for (var i=0;i<bodyFormats.length;i++) {
                    if (bodyFormats[i].id === standardFormatId) {
                        formatFound = true;
                        bodyFormats[i].copyFrom(editShapeFormat);
                        editShapeFormat = bodyFormats[i];
                        break;
                    }
                }
                if (formatFound === false) {
                    toolBox.addToArray(bodyFormats, editShapeFormat);
                }
                for (var i=0;i<this.editTargets.length;i++) {
                    if ((isLinkTarget === true && this.editTargets[i].entityType === toolBox.ENTITY_TYPE_LINK) ||
                        (isLinkTarget === false && this.editTargets[i].entityType === toolBox.ENTITY_TYPE_BODY)
                       ) {
                        this.editTargets[i].shapeFormat = editShapeFormat;
                    }
                }
            }
        }
        //save
        this.soulMaster.dataAccessAction.saveToData();

        for (var i=0;i<this.editTargets.length;i++) {
            if (this.editTargets[i].parentShape) {
                this.editTargets[i].parentShape.registerDrawBuffer();
            }
            else {
                this.editTargets[i].registerDrawBuffer();
            }
        }

    }
,   editViewStyleStart: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var editTarget = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (editTarget.isEntityView || editTarget.isBackGroundShape) {
                if (editTarget.isEntityView && editTarget.parentShape.viewStyleMode !== toolBox.VIEW_STYLE_MODE_ORIGINAL) {
                    return;
                }
                this.soulMaster.mainAction.closeAll();
                this.targetView = editTarget;

                var isShapeFormatOfBackGround = false;
                if (this.targetView.isBackGroundShape) {
                    isShapeFormatOfBackGround = true;
                }

                this.soulMaster.actionInProgress = true;
                var newFormatSettingBox = new ViewFormatSettingViewFrame(
                    this.soulMaster.backGroundShape,
                    this.soulMaster.backGroundShape,
                    this.soulMaster.defaultLayer,
                    this,
                    this.targetView.shapeFormat,
                    isShapeFormatOfBackGround
                );
                newFormatSettingBox.visible = false;

                this.soulMaster.mainAction.startShapeTransferAnimation(this.targetView.getRect(), newFormatSettingBox.getRect(), this.targetView.shapeFormat, newFormatSettingBox);
            }
        }
    }
,   callBackFromViewFormatSettingView: function(_sender, _resultShapeFormat, _arg1, _arg2, _arg3, _arg4, _arg4) {
        if (this.targetView.isEntityView) {
            this.targetView.parentShape.viewStyleMode = toolBox.VIEW_STYLE_MODE_ORIGINAL;
            this.targetView.parentShape.viewOriginalShapeFormat.fillStyle = _resultShapeFormat.fillStyle;
            this.targetView.parentShape.viewOriginalShapeFormat.textDescription = _resultShapeFormat.textDescription;
            this.targetView.parentShape.viewOriginalShapeFormat.textSize = _resultShapeFormat.textSize;
            this.targetView.parentShape.viewOriginalShapeFormat.textFont = _resultShapeFormat.textFont;
            this.targetView.parentShape.viewOriginalShapeFormat.textFillStyle = _resultShapeFormat.textFillStyle;
            if (_sender.isTargetViewStandardStyle() === true) {
                this.soulMaster.targetBackGround.standardViewFormat.copyFrom(_resultShapeFormat);
            }
        }
        else if (this.targetView.isBackGroundShape) {
            this.targetView.shapeFormat.fillStyle = _resultShapeFormat.fillStyle;
            this.targetView.shapeFormat.textDescription = _resultShapeFormat.textDescription;
            this.targetView.shapeFormat.textSize = _resultShapeFormat.textSize;
            this.targetView.shapeFormat.textFont = _resultShapeFormat.textFont;
            this.targetView.shapeFormat.textFillStyle = _resultShapeFormat.textFillStyle;
        }
        //save
        this.soulMaster.dataAccessAction.saveToData();
        this.soulMaster.targetBackGround.registerDrawBuffer();
    }
,   colorSettingStart: function(_editTarget) {
        this.soulMaster.actionInProgress = true;

        this.editTarget = _editTarget;
        var newColorSettingBox = new ColorSettingBoxFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            this,
            this.editTarget.shapeFormat.fillStyle
        );
        newColorSettingBox.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(this.editTarget.getRect(), newColorSettingBox.getRect(), this.editTarget.shapeFormat, newColorSettingBox);
    }
,   callBackFromColorSettingView: function(_resultColor, _arg1, _arg2, _arg3, _arg4, _arg5) {
        this.editTarget.shapeFormat.fillStyle = _resultColor;
        this.editTarget.select(0, 0, false);
        if (this.editTarget.parentShape) {
            this.editTarget.parentShape.registerDrawBuffer();
        }
        else {
            this.editTarget.registerDrawBuffer();
        }
    }
,   callBackCancelFromColorSettingView: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        if (this.editTarget && this.editTarget.select) {
            this.editTarget.select(0, 0, false);
        }
    }
,   fontSettingStart: function(_editTarget) {
        this.soulMaster.actionInProgress = true;

        this.editTarget = _editTarget;
        var newFontSettingBox = new FontSettingBoxFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            this,
            this.editTarget.shapeFormat.textFont
        );
        newFontSettingBox.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(_editTarget.getRect(), newFontSettingBox.getRect(), _editTarget.shapeFormat, newFontSettingBox);
    }
,   callBackFromFontSettingView: function(_resultTextFont, _arg1, _arg2, _arg3, _arg4, _arg5) {
        this.editTarget.text = _resultTextFont;
        this.editTarget.shapeFormat.textFont = _resultTextFont;
        this.editTarget.select(0, 0, false);
        if (this.editTarget.parentShape) {
            this.editTarget.parentShape.registerDrawBuffer();
        }
        else {
            this.editTarget.registerDrawBuffer();
        }
    }
,   callBackCancelFromFontSettingView: function(_resultTextFont, _arg1, _arg2, _arg3, _arg4, _arg5) {
        this.editTarget.select(0, 0, false);
    }
,   showDetailBirdViewStart: function(_detailButton, _soulId) {
        this.soulMaster.actionInProgress = true;

        var newBirdViewFrame = new BirdViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            _detailButton,
            _soulId
        );
        newBirdViewFrame.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(_detailButton.getRect(), newBirdViewFrame.getRect(), _detailButton.shapeFormat, newBirdViewFrame);
    }
,   syncTopEditViewSoulShareCount: function(_topEditView, _soulId) {
        var soulShareCount = this.soulMaster.dataAccessAction.getCountOfBodiesBySoulId(_soulId);
        for (var i=0;i<_topEditView.childShapes.length;i++) {
            if (_topEditView.childShapes[i].isEntity) {
                if (_topEditView.childShapes[i].soulId === _soulId) {
                    _topEditView.childShapes[i].soulShareCount = soulShareCount;
                }
            }
        }
    }
,   popupSimilarSouls: function() {
        if (this.editTargets.length === 0) {
            return;
        }
        var bodyIdList = new Array();
        for (var i=0;i<this.editTargets.length;i++) {
            toolBox.addToArray(bodyIdList, this.editTargets[i].bodyId);
        }
        var rows = this.soulMaster.dataAccessAction.findSimilarSoulsByBodyId(this.editTargets[0].bodyId, bodyIdList);
        if (rows.length > 0) {
            this.soulMaster.mainAction.closeAll();
            this.soulMaster.actionInProgress = true;

            var view = this.editTargets[0].parentShape;

            var newSimilarSoulsListBox = new SimiarSoulsListViewFrame(
                this.soulMaster.backGroundShape,
                this.soulMaster.backGroundShape,
                this.soulMaster.defaultLayer,
                this,
                rows,
                'selectSimilarSoulsListOfTargetEntities'
            );
            newSimilarSoulsListBox.visible = false;

            this.soulMaster.mainAction.startShapeTransferAnimation(this.editTargets[0].getRect(), newSimilarSoulsListBox.getRect(), this.editTargets[0].shapeFormat, newSimilarSoulsListBox);
        }
    }
,   callBackFromSimilarSoulsListView: function(_resultSoulId, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var selectedSoulId = _resultSoulId;
        var targetEntities = this.editTargets;
        this.shareSoul(targetEntities, selectedSoulId);
        this.soulMaster.dataAccessAction.saveToData();
        this.syncTopEditViewSoulShareCount(targetEntities[0].parentShape, selectedSoulId);
        this.soulMaster.mainAction.closeAll();
        targetEntities[0].parentShape.registerDrawBuffer();
    }
,   callBackCancelFromSimilarSoulsListView: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.soulMaster.actionInProgress = false;
    }
,   popupViewSetting: function() {
        var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
        if (topview === null) {
            return;
        }
        if (!topview.isEntityViewFrame) {
            return;
        }

        this.soulMaster.mainAction.closeAll();
        this.soulMaster.actionInProgress = true;

        var newViewSettingBox = new ViewSettingViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            this,
            topview,
            'popupViewSetting'
        );
        newViewSettingBox.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(topview.getRect(), newViewSettingBox.getRect(), topview.shapeFormat, newViewSettingBox);
    }
,   callBackFromViewSettingView: function(_targetView, _arg1, _arg2, _arg3, _arg4, _arg5) {
        _targetView.view.showBodyData(true);
    }
,   popupBirdViewDirectionSettingStart: function(_birdViewDirection, _callBackTarget) {
        this.soulMaster.actionInProgress = true;

        var newBirdViewDirectionSettingBox = new BirdViewDirectionSettingViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            _callBackTarget,
            _birdViewDirection,
            'popupBirdViewDirectionSetting'
        );

        newBirdViewDirectionSettingBox.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(_callBackTarget.getRect(), newBirdViewDirectionSettingBox.getRect(), _callBackTarget.shapeFormat, newBirdViewDirectionSettingBox);
    }
,   defineLinkFiltersForTopLinkView: function() {
        this.targetView = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
        if (this.targetView === null) {
            return;
        }
        if (!this.targetView.isEntityViewFrame) {
            return;
        }
        if (this.targetView.getViewMode() !== toolBox.VIEW_MODE_LINKVIEW) {
            return;
        }

        this.soulMaster.mainAction.closeAll();
        this.soulMaster.actionInProgress = true;

        var newLinkConditionListBox = new LinkConditionListViewFrame(
            this.soulMaster.backGroundShape,
            this.soulMaster.backGroundShape,
            this.soulMaster.defaultLayer,
            this,
            this.targetView.linkFilters,
            'defineLinkFiltersForTopLinkView'
        );
        newLinkConditionListBox.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimation(this.targetView.getRect(), newLinkConditionListBox.getRect(), this.targetView.shapeFormat, newLinkConditionListBox);
    }
,   callBackFromLinkConditionListView: function(_linkFilters, _arg1, _arg2, _arg3, _arg4, _arg5) {
        this.targetView.linkFilters.length = 0;
        toolBox.addArrayToArray(this.targetView.linkFilters, _linkFilters);
        this.targetView.view.showBodyData(true);
    }
,   slideInTheSameBodies: function(_isForward) {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            var targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview === null) {
                return;
            }
            if (!topview.isEntityViewFrame) {
                return;
            }
            if (topview.getViewMode() !== toolBox.VIEW_MODE_EDITVIEW) {
                return;
            }
            if (targetShape === topview.view) {
                //ビュー選択の場合は、ビューが表示しているBodyをスライド表示
                if (_isForward === true) {
                    topview.view.bodyId = this.soulMaster.dataAccessAction.getNextForwardBodyIdInSameSoulBodies(topview.view.bodyId);
                }
                else {
                    topview.view.bodyId = this.soulMaster.dataAccessAction.getNextBackwardBodyIdInSameSoulBodies(topview.view.bodyId);
                }
                topview.view.setImageUrl(null, true);
                topview.view.saveCurrentDrawingPoints();
                topview.view.showBodyData(true);
            }
            else if (targetShape.isEntity) {
                var bodyId = targetShape.bodyId;
                //Body選択の場合は、選択Bodyをスライドして、スライド後Bodyを含む親Bodyを表示
                var bodyIdAfterSlided = '';
                if (_isForward === true) {
                    bodyIdAfterSlided = this.soulMaster.dataAccessAction.getNextForwardBodyIdInSameSoulBodies(bodyId);
                }
                else {
                    bodyIdAfterSlided = this.soulMaster.dataAccessAction.getNextBackwardBodyIdInSameSoulBodies(bodyId);
                }
                var row = this.soulMaster.dataAccessAction.findBodyById(bodyIdAfterSlided);
                if (row !== null) {
                    if (row['LINK_FLAG'] === '0') {
                        row = this.soulMaster.dataAccessAction.findBodyById(row['PARENT_BODY_ID']);
                    }
                    if (row !== null) {
                        topview.view.bodyId = row['PARENT_BODY_ID'];
                        topview.view.setImageUrl(null, true);
                        topview.view.saveCurrentDrawingPoints();
                        topview.view.showBodyData(true);
                        this.centerizeAndSelectBody(topview.view, bodyIdAfterSlided);
/*
                        for (var i=0;i<topview.view.childShapes.length;i++) {
                            if (topview.view.childShapes[i].isEntity) {
                                var entity = topview.view.childShapes[i];
                                if (entity.bodyId === bodyIdAfterSlided) {
                                    topview.view.innerOffsetY = -(entity.y + (entity.h / 2)) + ((topview.view.h / 2) * (1 / topview.view.innerZoom));
                                    topview.view.innerOffsetX = -(entity.x + (entity.w / 2)) + ((topview.view.w / 2) * (1 / topview.view.innerZoom));
                                    entity.select(0, 0, false);
                                    break;
                                }
                            }
                        }
*/
                    }
                }
            }
        }
    }
,   centerizeAndSelectBody: function(_view, _bodyId) {
        for (var i=0;i<_view.childShapes.length;i++) {
            if (_view.childShapes[i].isEntity) {
                var entity = _view.childShapes[i];
                if (entity.bodyId === _bodyId) {
                    _view.innerOffsetY = -(entity.y + (entity.h / 2)) + ((_view.h / 2) * (1 / _view.innerZoom));
                    _view.innerOffsetX = -(entity.x + (entity.w / 2)) + ((_view.w / 2) * (1 / _view.innerZoom));
                    entity.select(0, 0, false);
                    break;
                }
            }
        }
    }
,   drawLineBetweenSelectedShapes: function() {
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            for (var j=0;j<this.soulMaster.targetBackGround.selectedShapes.length;j++) {
                if (this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]) !== this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[j])) {
                    if (this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]).connectEntity) {
                        this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]).connectEntity(this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[j]));
                    }
                }
            }
        }
        this.soulMaster.targetBackGround.registerDrawBuffer();
    }
,   lockPositionOfSelectedLinkViewEntity: function() {
        if (this.soulMaster.targetBackGround.childShapes.length === 0) {
            return;
        }
        var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
        if (topview.viewMode !== toolBox.VIEW_MODE_LINKVIEW) {
            return;
        }
        if (this.soulMaster.targetBackGround.selectedShapes.length === 0) {
            return;
        }
        if (!this.soulMaster.targetBackGround.selectedShapes[0].isEntity) {
            return;
        }
        this.soulMaster.mainAction.closeAll();
        var selectedSouls = new Array();
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
//            if (this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]).bodyModel.isLinkBody === false) {
                toolBox.addToArray(selectedSouls, this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[i]));
//            }
        }
        var isAllLocked = true;
        for (var i=0;i<selectedSouls.length;i++) {
            if (selectedSouls[i].bodyModel.locked === false) {
                isAllLocked = false;
                break;
            }
        }
        if (isAllLocked === true) {
            for (var i=0;i<selectedSouls.length;i++) {
                selectedSouls[i].unlockPosition();
            }
        }
        else {
            for (var i=0;i<selectedSouls.length;i++) {
                selectedSouls[i].lockPosition();
            }
        }
        topview.reflectToLinkViewLockedSouls();
        topview.view.registerDrawBuffer();
    }
,   selectBodyGroupOfLinkView: function() {
        if (this.soulMaster.targetBackGround.childShapes.length === 0) {
            return;
        }
        var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
        if (topview.viewMode !== toolBox.VIEW_MODE_LINKVIEW) {
            return;
        }
        if (this.soulMaster.targetBackGround.selectedShapes.length === 0) {
            return;
        }
        if (!this.soulMaster.targetBackGround.selectedShapes[0].isEntity) {
            return;
        }
        this.soulMaster.mainAction.closeAll();
        var originalSelectedEntities = new Array();
        for (var i=0;i<this.soulMaster.targetBackGround.selectedShapes.length;i++) {
            if (this.soulMaster.targetBackGround.selectedShapes[i].entityType === toolBox.ENTITY_TYPE_BODY) {
                toolBox.addToArray(originalSelectedEntities, this.soulMaster.targetBackGround.selectedShapes[i]);
            }
        }
        this.soulMaster.targetBackGround.clearSelectedShapes();
        for (var i=0;i<originalSelectedEntities.length;i++) {
            originalSelectedEntities[i].selectGroup();
        }
        this.soulMaster.targetBackGround.registerSelectedShapesToDrawBuffer();
    }
,   diveToSelectedBody: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.soulMaster.mainAction.closeAll();
            var entity = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (entity.isEntity) {
                this.soulMaster.selectedShapesAction.diveToBody(entity.parentShape, entity);
            }
        }
    }
,   surfaceFromCurrentBody: function() {
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            this.soulMaster.mainAction.closeAll();
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            var row = this.soulMaster.dataAccessAction.findParentBodyByBodyId(topview.view.bodyId);
            if (row !== null) {
                topview.view.saveViewInformation();
                topview.view.bodyId = row['BODY_ID'];
                topview.view.saveCurrentDrawingPoints();
//                topview.clearLinkViewLockedSouls();
                topview.view.showBodyData(true);
                topview.view.adjustInnerOffsetToStartPosition();
                if (topview.view.childShapes.length > 0) {
                    topview.view.childShapes[0].select(0, 0, false);
                }
                topview.backGroundShape.clearSelectedShapes();
                topview.view.loadViewInfornation();
                topview.backGroundShape.registerDrawBuffer();
            }
        }
    }
,   diveToBody: function(_view, _targetEntity) {
        _view.saveViewInformation();
        var bodyRow = this.soulMaster.dataAccessAction.findBodyById(_targetEntity.bodyId);
        if (bodyRow === null) {
            return;
        }

        var sourceRect = _targetEntity.getRect();
        var sourceShapeFormat = new EntityFormat();
        sourceShapeFormat.copyFrom(_targetEntity.shapeFormat);

        _view.bodyId = _targetEntity.bodyId;
        _view.saveCurrentDrawingPoints();

        if (_view.classType === 'BirdView') {
            if (_view.beforeBodyId === _view.bodyId) {
                if (_view.birdViewType === toolBox.BIRDVIEW_TYPE_SPLIT) {
                    _view.birdViewType = toolBox.BIRDVIEW_TYPE_UNITE;
                }
                else {
                    _view.birdViewType = toolBox.BIRDVIEW_TYPE_SPLIT;
                }
            }
            else {
                _view.birdViewType = toolBox.BIRDVIEW_TYPE_UNITE;
            }
        }
//        _view.parentShape.clearLinkViewLockedSouls();
        _view.showBodyData(true);
        _view.adjustInnerOffsetToStartPosition();
        _view.loadViewInfornation();
        _view.visible = false;

        this.soulMaster.mainAction.startShapeTransferAnimationWithMaxFrame(sourceRect, _view.getRect(), sourceShapeFormat, _view, 'diveToBody', 15);
        _view.backGroundShape.clearSelectedShapes();
    }
,   createNewViewOfSelectedBody: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length === 1) {
            this.soulMaster.mainAction.closeAll();
            var entity = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (entity.isEntity) {
                if (entity.parentShape.parentShape.isEntityViewFrame) {
                    this.soulMaster.mainAction.createEntityView(toolBox.mouseX, toolBox.mouseY, entity.bodyId, false, entity.parentShape.parentShape.viewMode);
                }
                else {
                    this.soulMaster.mainAction.createEntityView(toolBox.mouseX, toolBox.mouseY, entity.bodyId, false);
                }
            }
        }
    }
,   changeBirdViewLevelToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewLevel(this.soulMaster.selectedShapesAction.getTopBirdView(), 1);
    }
,   changeBirdViewLevelToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewLevel(this.soulMaster.selectedShapesAction.getTopBirdView(), -1);
    }
,   changeBirdViewSpaceBetweenBodiesToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewSpaceBetweenBodies(this.soulMaster.selectedShapesAction.getTopBirdView(), 1);
    }
,   changeBirdViewSpaceBetweenBodiesToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewSpaceBetweenBodies(this.soulMaster.selectedShapesAction.getTopBirdView(), -1);
    }
,   changeBirdViewDirectionToRight: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_RIGHT);
    }
,   changeBirdViewDirectionToLeft: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_LEFT);
    }
,   changeBirdViewDirectionToUp: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_UP);
    }
,   changeBirdViewDirectionToDown: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_DOWN);
    }
,   changeBirdViewDirectionToDeeper: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_DEEPER);
    }
,   changeBirdViewDirectionToHigher: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewDirection(this.soulMaster.selectedShapesAction.getTopBirdView(), toolBox.BIRDVIEW_DIRECTION_HIGHER);
    }
,   changeBirdViewChildStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewChildStepCount(this.soulMaster.selectedShapesAction.getTopBirdView(), 1);
    }
,   changeBirdViewChildStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewChildStepCount(this.soulMaster.selectedShapesAction.getTopBirdView(), -1);
    }
,   changeBirdViewParentStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewParentStepCount(this.soulMaster.selectedShapesAction.getTopBirdView(), 1);
    }
,   changeBirdViewParentStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeBirdViewParentStepCount(this.soulMaster.selectedShapesAction.getTopBirdView(), -1);
    }
,   switchReadonlyOrEditableView: function() {
        var view = this.soulMaster.selectedShapesAction.getTopView();
        if (view !== null && view.isEntityView) {
            if (view.readonlyFlag === '0') {
                this.soulMaster.selectedShapesAction.changeViewToReadonly(view);
            }
            else {
                this.soulMaster.selectedShapesAction.changeViewToEditable(view);
            }
        }
    }
,   getTopView: function() {
        ret = null;
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview.isEntityViewFrame) {
                ret = topview.view;
            }
        }
        return ret;
    }
,   getTopBirdView: function() {
        ret = null;
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview.view.classType === 'BirdView') {
                ret = topview.view;
            }
        }
        return ret;
    }
,   changeBirdViewDirection: function(_view, _birdViewDirection) {
        if (_view !== null && _view.classType === 'BirdView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.parentShape.birdViewDirection = _birdViewDirection;
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeBirdViewLevel: function(_view, _plusMinus) {
        if (_view !== null && _view.classType === 'BirdView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.changeBirdViewLevel(_plusMinus);
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeBirdViewSpaceBetweenBodies: function(_view, _plusMinus) {
        if (_view !== null && _view.classType === 'BirdView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.changeBirdViewSpaceBetweenBodies(_plusMinus);
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeBirdViewChildStepCount: function(_view, _plusMinus) {
        if (_view !== null && _view.classType === 'BirdView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.parentShape.birdViewChildStepCount += _plusMinus;
            if (_view.parentShape.birdViewChildStepCount < 1) {
                _view.parentShape.birdViewChildStepCount = 1;
            }
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeBirdViewParentStepCount: function(_view, _plusMinus) {
        if (_view !== null && _view.classType === 'BirdView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.parentShape.birdViewParentStepCount += _plusMinus;
            if (_view.parentShape.birdViewParentStepCount < 1) {
                _view.parentShape.birdViewParentStepCount = 1;
            }
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeLinkViewStepCountToPlus: function() {
        this.soulMaster.selectedShapesAction.changeLinkViewStepCount(this.soulMaster.selectedShapesAction.getTopLinkView(), 1);
    }
,   changeLinkViewStepCountToMinus: function() {
        this.soulMaster.selectedShapesAction.changeLinkViewStepCount(this.soulMaster.selectedShapesAction.getTopLinkView(), -1);
    }
,   changeLinkViewStepCount: function(_view, _plusMinus) {
        if (_view !== null && _view.classType === 'LinkView') {
            this.soulMaster.mainAction.closeAll();
            _view.setImageUrl(null, true);
            _view.saveCurrentDrawingPoints();
            _view.parentShape.linkViewStepCount += _plusMinus;
            if (_view.parentShape.linkViewStepCount < 1) {
                _view.parentShape.linkViewStepCount = 1;
            }
            this.soulMaster.dataAccessAction.saveToData();
            _view.showBodyData(true);
            _view.backGroundShape.clearSelectedShapes();
        }
    }
,   changeViewToReadonly: function(_view) {
    }
,   changeViewToEditable: function(_view) {
    }
,   calcSpringMovementOfSelectedLinkView: function() {
        var view = this.soulMaster.selectedShapesAction.getTopLinkView();
        if (view !== null) {
            view.startReCalcSpringMovement();
        }
    }
,   getTopLinkView: function() {
        ret = null;
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview.view.classType === 'LinkView') {
                ret = topview.view;
            }
        }
        return ret;
    }
,   changeTopViewMode: function() {
        var topEntityViewFrame = this.getTopViewFrame();
        if (topEntityViewFrame !== null) {
            topEntityViewFrame.changeViewMode();
        }
    }
,   getTopViewFrame: function() {
        ret = null;
        if (this.soulMaster.targetBackGround.childShapes.length > 0) {
            var topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
            if (topview.isEntityViewFrame) {
                ret = topview;
            }
        }
        return ret;
    }
,   zoomIn: function() {
        ioJobController.executeX = this.soulMaster.savedX;
        ioJobController.executeY = this.soulMaster.savedY;
        ioJobController.zoomIn();
        ioJobController.zoomIn();
        ioJobController.virtualDrop(this.soulMaster.savedX, this.soulMaster.savedY);
    }
,   zoomOut: function() {
        ioJobController.executeX = this.soulMaster.savedX;
        ioJobController.executeY = this.soulMaster.savedY;
        ioJobController.zoomOut();
        ioJobController.zoomOut();
        ioJobController.virtualDrop(this.soulMaster.savedX, this.soulMaster.savedY);
    }
,   selectAll: function() {
        if (this.soulMaster.targetBackGround.selectedShapes.length > 0) {
            var targetShape = this.getTargetShape(this.soulMaster.targetBackGround.selectedShapes[0]);
            if (!targetShape.isEntity && !targetShape.isEntityView && targetShape.classType !== 'MainBackGround') {
                return;
            }
            if (targetShape.isEntity) {
                targetShape = targetShape.parentShape;
            }
            this.soulMaster.targetBackGround.clearSelectedShapes();
            if (targetShape.isEntityView) {
                for (var i=0;i<targetShape.childShapes.length;i++) {
                    if (targetShape.childShapes[i].isEntity) {
                        this.soulMaster.targetBackGround.addSelectedShape(targetShape.childShapes[i]);
                    }
                }
            }
            else if (targetShape.classType === 'MainBackGround') {
                for (var i=0;i<targetShape.childShapes.length;i++) {
                    if (targetShape.childShapes[i].isEntityViewFrame) {
                        this.soulMaster.targetBackGround.addSelectedShape(targetShape.childShapes[i]);
                    }
                }
            }
            this.soulMaster.targetBackGround.adjustForMultiSelection();
            this.soulMaster.targetBackGround.registerDrawBufferWithoutChildren();
        }
    }
,   doUp: function() {
        var topview = this.getTopViewFrame();
        if (topview !== null) {
            if (topview.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                this.surfaceFromCurrentBody();
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
//                this.changeBirdViewDirectionToUp();
                topview.view.move(0, 50);
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
                topview.view.move(0, 50);
            }
        }
    }
,   doDown: function() {
        var topview = this.getTopViewFrame();
        if (topview !== null) {
            if (topview.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                this.diveToSelectedBody();
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
//                this.changeBirdViewDirectionToDown();
                topview.view.move(0, -50);
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
                topview.view.move(0, -50);
            }
        }
    }
,   doRight: function() {
        var topview = this.getTopViewFrame();
        if (topview !== null) {
            if (topview.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                this.slideInTheSameBodies(true);
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
                topview.view.move(-50, 0);
//                this.changeBirdViewDirectionToRight();
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
                topview.view.move(-50, 0);
            }
        }
    }
,   doLeft: function() {
        var topview = this.getTopViewFrame();
        if (topview !== null) {
            if (topview.getViewMode() === toolBox.VIEW_MODE_EDITVIEW) {
                this.slideInTheSameBodies(false);
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_BIRDVIEW) {
//                this.changeBirdViewDirectionToLeft();
                topview.view.move(50, 0);
            }
            else if (topview.getViewMode() === toolBox.VIEW_MODE_LINKVIEW) {
                topview.view.move(50, 0);
            }
        }
    }
,   searchNext: function(_view, _searchWord, _currentBodyId) {
        var positionSortedEntities = this.getEntitiesWithXYSorted(_view);
        var startSearching = (_currentBodyId === '');
        var foundBodyId = '';
        for (var i=0;i<positionSortedEntities.length;i++) {
            if (startSearching === true) {
                if (toolBox.val2ContainsVal1(_searchWord, positionSortedEntities[i].text) === true) {
                    foundBodyId = positionSortedEntities[i].bodyId;
                    this.centerizeAndSelectBody(_view, foundBodyId);
                    break;
                }
            }
            if (positionSortedEntities[i].bodyId === _currentBodyId) {
                startSearching = true;
            }
        }
        if (foundBodyId === '') {
            for (var i=0;i<positionSortedEntities.length;i++) {
                if (toolBox.val2ContainsVal1(_searchWord, positionSortedEntities[i].text) === true) {
                    foundBodyId = positionSortedEntities[i].bodyId;
                    this.centerizeAndSelectBody(_view, foundBodyId);
                    break;
                }
            }
        }
        return foundBodyId;
    }
,   searchPrevious: function(_view, _searchWord, _currentBodyId) {
        var positionSortedEntities = this.getEntitiesWithXYSorted(_view);
        var startSearching = (_currentBodyId === '');
        var foundBodyId = '';
        for (var i=positionSortedEntities.length-1;i>=0;i--) {
            if (startSearching === true) {
                if (toolBox.val2ContainsVal1(_searchWord, positionSortedEntities[i].text) === true) {
                    foundBodyId = positionSortedEntities[i].bodyId;
                    this.centerizeAndSelectBody(_view, foundBodyId);
                    break;
                }
            }
            if (positionSortedEntities[i].bodyId === _currentBodyId) {
                startSearching = true;
            }
        }
        if (foundBodyId === '') {
            for (var i=positionSortedEntities.length-1;i>=0;i--) {
                if (toolBox.val2ContainsVal1(_searchWord, positionSortedEntities[i].text) === true) {
                    foundBodyId = positionSortedEntities[i].bodyId;
                    this.centerizeAndSelectBody(_view, foundBodyId);
                    break;
                }
            }
        }
        return foundBodyId;
    }
,   getEntitiesWithXYSorted: function(_view) {
        var sortedArray = new Array();
        for (var i=0;i<_view.childShapes.length;i++) {
            if (_view.childShapes[i].isEntity) {
                toolBox.addToArray(sortedArray, _view.childShapes[i]);
            }
        }
        sortedArray.sort(
            function(a, b) {
                if (a.y < b.y) {
                    return -1;
                }
                else if (a.y > b.y) {
                    return 1;
                }
                else {
                    if (a.x < b.x) {
                        return -1;
                    }
                    else if (a.x >= b.x) {
                        return 1;
                    }
                }
                return 0;
            }
        );
        return sortedArray;
    }
,   getTargetShape: function(_shape) {
        if (_shape.isShapeBorder) {
            return _shape.parentShape;
        }
        else {
            return _shape;
        }
    }
});

var Entity = function(){this.initialize.apply(this, arguments);}
Entity.prototype = toolBox.extend(new ResizableShape(), {
    isEntity            : true
,   bodyId              : ''
,   soulId              : ''
,   soulShareCount      : 1
,   linkChildrenCount   : 0
,   pastedFromBodyId    : ''
,   hyperLinkUrl        : ''
,   hyperLinkUrlMode    : toolBox.HYPER_LINK_URL_MODE_NORMAL
,   hyperLinkJsonpDirectJumpFlag    : '0'
,   connectionLines     : null
,   entityType          : toolBox.ENTITY_TYPE_OTHER
,   changed             : false
,   linkGlobalAlpha     : 0.3
,   initialize: function(_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h, _entityType) {
        ResizableShape.prototype.initialize.apply(this,[_containerShape, _parentShape, _defaultLayer, _x, _y, _w, _h]);
        this.classType = 'Entity';

        this.shapeFormat = new EntityFormat();
        this.connectionLines = new Array();
        if (toolBox.isNullOrUndefined(_entityType) === false) {
            this.entityType = _entityType;
            if (this.entityType === toolBox.ENTITY_TYPE_LINK) {
                this.defaultText = toolBox.DEFAULT_TEXT_LINK;
            }
            else {
                this.defaultText = toolBox.DEFAULT_TEXT_BODY;
            }
        }

        this.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
        this.shapeFormat.strokeStyle = '#F4A460';
        this.shapeFormat.textFillStyle = '#000000';
        this.shapeFormat.textBaseline = 'middle';
        this.shapeFormat.textAlign = toolBox.TEXT_ALIGN_CENTER;
        this.shapeFormat.textVerticalAlign = 'middle';
        this.shapeFormat.strokeStyle = '#fafad2';
        this.shapeFormat.drawShadow = false;

        this.zoomable = true;

        this.alive = true;
        this.registerDrawBuffer();
    }
,   onMoveToTop: function() {
        for (var i=0;i<this.childShapes.length;i++) {
            if (this.childShapes[i].classType === 'ShapeBorder') {
                return;
            }
        }
        var sb = null;
        for (var i=toolBox.BORDER_POSITION_TOP;i<=toolBox.BORDER_POSITION_TOP_LEFT_CORNER;i++) {
            sb = new ShapeBorder(this.containerShape, this, this.defaultLayer, i);
            sb.zoomable = this.zoomable;
        }
        this.showOrHideUrlButton();
        this.syncDockedShapePosition(false);
    }
,   showOrHideUrlButton: function() {
        var urlButton = null;
        if (toolBox.trim(this.hyperLinkUrl) !== '') {
            var urlButton = new Button(
                this.containerShape,
                this,
                this.defaultLayer,
                this.w - 38,
                this.h - 20,
                toolBox.HYPER_LINK_BUTTON_WIDTH,
                toolBox.HYPER_LINK_BUTTON_HEIGHT
            )
            urlButton.r = toolBox.HYPER_LINK_BUTTON_RADIUS;
            urlButton.saveCurrentDrawingPoints();
            urlButton.text = 'URL';
            urlButton.syncPositionWithParentWidth = true; 
            urlButton.syncPositionWithParentHeight = true; 
            urlButton.shapeFormat.shapeType = toolBox.SHAPE_TYPE_RRECT;
            if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
                urlButton.shapeFormat.strokeStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            }
            else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
                urlButton.shapeFormat.strokeStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
            }
            urlButton.shapeFormat.textSize = 10;
            urlButton.shapeFormat.textFont = 'Arial';
            urlButton.shapeFormat.textVerticalAlign = 'middle';
            urlButton.shapeFormat.textBaseline = 'middle';
            
            if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
                urlButton.shapeFormat.fillStyle = toolBox.HYPER_LINK_FILL_COLOR;
                urlButton.shapeFormat.textFillStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            }
            else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
                urlButton.shapeFormat.fillStyle = toolBox.HYPER_LINK_JSONP_FILL_COLOR;
                urlButton.shapeFormat.textFillStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
            }
            urlButton.setClickCommand(this.clickHyperLinkUrl);
        }
        else {
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].classType === 'Button' && this.childShapes[i].text === 'URL') {
                    urlButton = this.childShapes[i];
                    break;
                }
            }
            if (urlButton !== null) {
                urlButton.destroy();
            }
        }
    }
,   onDropFromTop: function() {
        var found = false;
        while (true) {
            found = false;
            for (var i=0;i<this.childShapes.length;i++) {
                if (this.childShapes[i].classType === 'ShapeBorder' || this.childShapes[i].classType === 'Button') {
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
,   clickHyperLinkUrl: function() {
        if (this.parentShape.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
            toolBox.openWindow(this.parentShape.hyperLinkUrl, null);
        }
        else if (this.parentShape.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
            var openurl = toolBox.getAbsoluteLocation() + '?' + toolBox.createQueryParam('map', this.parentShape.hyperLinkUrl);
            if (this.parentShape.hyperLinkJsonpDirectJumpFlag === '1') {
                openurl += '&' + toolBox.createQueryParam('soul', this.parentShape.text);
            }
            toolBox.openWindow(openurl, null);
        }
    }
,   isChanged: function() {
        if (this.changed === true) {
            return true;
        }
        var ret = false;
        //body
        var row = this.soulMaster.dataAccessAction.findBodyById(this.bodyId);
        if (row === null) {
            this.changed = true;
            ret = true;
        }
        else {
            var linkFlag = '0'
            var parentBodyId = '';
            if (this.entityType === toolBox.ENTITY_TYPE_LINK) {
                linkFlag = '1';
                parentBodyId = this.containerShape.bodyId;
            }
            else {
                if (this.getDockedShape() === null) {
                    alert('AAA');
                }
                parentBodyId = this.getDockedShape().bodyId;
            }
            var nextLowerBodyId = '';
            var nextLowerEntity = this.getNextLowerEntity();
            if (nextLowerEntity !== null) {
                nextLowerBodyId = nextLowerEntity.bodyId;
            }
            var nextHigherBodyId = '';
            var nextHigherEntity = this.getNextHigherEntity();
            if (nextHigherEntity !== null) {
                nextHigherBodyId = nextHigherEntity.bodyId;
            }
            if (this.soulId !== row['SOUL_ID'] ||
                linkFlag !== row['LINK_FLAG'] ||
                parentBodyId !== row['PARENT_BODY_ID'] ||
                this.x !== row['X'] ||
                this.y !== row['Y'] ||
                this.w !== row['W'] ||
                this.h !== row['H'] ||
                this.r !== row['R'] ||
                nextLowerBodyId !== row['ZORDER_NEXT_LOWER_BODY_ID'] ||
                nextHigherBodyId !== row['ZORDER_NEXT_HIGHER_BODY_ID']
            ) {
                this.changed = true;
                ret = true;
            }
        }
        //soul
        row = this.soulMaster.dataAccessAction.findSoulById(this.soulId);
        if (row === null) {
            this.changed = true;
            ret = true;
        }
        else {
            if (this.soulId !== row['SOUL_ID'] ||
                this.text !== row['TEXT'] ||
                this.shapeFormat.id !== row['BODY_FORMAT_ID'] ||
                this.imageUrl !== row['IMAGE_URL'] ||
                this.hyperLinkUrl !== row['HYPER_LINK_URL'] ||
                this.hyperLinkUrlMode !== row['HYPER_LINK_URL_MODE'] ||
                this.hyperLinkJsonpDirectJumpFlag !== row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']
            ) {
                this.changed = true;
                ret = true;
            }
        }
        return ret;
    }
,   saveToData: function() {
        //body
        var row = this.soulMaster.dataAccessAction.findBodyById(this.bodyId);
        var linkFlag = '0'
        var parentBodyId = '';
        if (this.entityType === toolBox.ENTITY_TYPE_LINK) {
            linkFlag = '1';
            parentBodyId = this.containerShape.bodyId;
        }
        else {
            parentBodyId = this.getDockedShape().bodyId;
        }
        var nextLowerBodyId = '';
        var nextLowerEntity = this.getNextLowerEntity();
        if (nextLowerEntity !== null) {
            nextLowerBodyId = nextLowerEntity.bodyId;
        }
        var nextHigherBodyId = '';
        var nextHigherEntity = this.getNextHigherEntity();
        if (nextHigherEntity !== null) {
            nextHigherBodyId = nextHigherEntity.bodyId;
        }
        if (row === null) {
            this.soulMaster.dataAccessAction.addBody(
                this.bodyId,
                this.soulId,
                linkFlag,
                parentBodyId,
                this.x,
                this.y,
                this.w,
                this.h,
                this.r,
                nextLowerBodyId,
                nextHigherBodyId
            );
            if (this.pastedFromBodyId !== '') {
                this.soulMaster.dataAccessAction.copyChildrensBodyRecursive(this.pastedFromBodyId, this.bodyId);
                this.soulMaster.dataAccessAction.showBodyLog('ENTITY');
            }
        }
        else {
            //soulIdが変更されている場合は、後ほどdataAccessActionで変更前soulの削除判定実施
            if (this.soulId !== row['SOUL_ID']) {
                toolBox.addToArrayIfNotExists(this.backGroundShape.garbages, this.soulMaster.dataAccessAction.findSoulById(row['SOUL_ID']));
            }
            this.soulMaster.dataAccessAction.updateBody(
                this.bodyId,
                this.soulId,
                linkFlag,
                parentBodyId,
                this.x,
                this.y,
                this.w,
                this.h,
                this.r,
                nextLowerBodyId,
                nextHigherBodyId
            );
        }
        //soul
        var row = this.soulMaster.dataAccessAction.findSoulById(this.soulId);
        if (row === null) {
            this.soulMaster.dataAccessAction.addSoul(
                this.soulId,
                this.text,
                this.shapeFormat.id,
                this.imageUrl,
                this.hyperLinkUrl,
                this.hyperLinkUrlMode,
                this.hyperLinkJsonpDirectJumpFlag
            );
        }
        else {
            this.soulMaster.dataAccessAction.updateSoul(
                this.soulId,
                this.text,
                this.shapeFormat.id,
                this.imageUrl,
                this.hyperLinkUrl,
                this.hyperLinkUrlMode,
                this.hyperLinkJsonpDirectJumpFlag
            );
        }
        this.pastedFromBodyId = '';
        this.changed = false;
    }
,   setEntityFotmat: function(_entityFormat) {
        var found = false;
        for (var i=0;i<this.parentShape.childShapes.length;i++) {
            if (this.parentShape.childShapes[i] !== this) {
                if (this.parentShape.childShapes[i].shapeFormat === this.shapeFormat) {
                    found = true;
                    break;
                }
            }
        }
        if (found === false) {
            this.parentShape.bodyFormats = toolBox.arrayWithout(this.parentShape.bodyFormats, this.shapeFormat);
        }
        this.shapeFormat = _entityFormat;
    }
,   getNextLowerEntity: function() {
        var curShape = this.zOrder.nextLowerShape;
        while (true) {
            if (curShape === null) {
                break;
            }
            else {
                if (curShape.isEntity) {
                    break;
                }
                else {
                    curShape = curShape.zOrder.nextLowerShape;
                }
            }
        }
        return curShape;
    }
,   getNextHigherEntity: function() {
        var curShape = this.zOrder.nextHigherShape;
        while (true) {
            if (curShape === null) {
                break;
            }
            else {
                if (curShape.isEntity) {
                    break;
                }
                else {
                    curShape = curShape.zOrder.nextHigherShape;
                }
            }
        }
        return curShape;
    }
,   commandDoubleHit: function(_x, _y) {
        this.soulMaster.selectedShapesAction.diveToBody(this.parentShape, this);
    }
,   connectEntity: function(_targetEntity, _isInteracting, _strokeStyle) {
        var found = false;
        for (var i=0;i<this.connectionLines.length;i++) {
            if (this.connectionLines[i].connectToShape === _targetEntity) {
                found = true;
                break;
            }
        }
        if (found === false) {
            var con1 = null;
            var con2 = null;
            if (toolBox.isNullOrUndefined(_isInteracting) === false) {
                con1 = new ConnectionLine(this, _targetEntity, null);
                toolBox.addToArray(this.connectionLines, con1);
                con2 = new ConnectionLine(_targetEntity, this, null);
                toolBox.addToArray(_targetEntity.connectionLines, con2);
            }
            else {
                con1 = new ConnectionLine(this, _targetEntity, true);
                toolBox.addToArray(this.connectionLines, con1);
                con2 = new ConnectionLine(_targetEntity, this, false);
                toolBox.addToArray(_targetEntity.connectionLines, con2);
            }
            if (toolBox.isNullOrUndefined(_strokeStyle) === false) {
                con1.shapeFormat.strokeStyle = _strokeStyle;
                con2.shapeFormat.strokeStyle = _strokeStyle;
            }
        }
    }
,   getPairEntity: function() {
        var ret = null;
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            if (this.dockedShapeInfos[i].info1.alive === true) {
                ret = this.dockedShapeInfos[i].info1;
                break;
            }
        }
        return ret;
    }
,   isVisible: function() {
        if (this.visible === false) {
            return false;
        }
        if (this.containerShape.isVisible() === false) {
            return false;
        }
        else {
            if (this.isOutOfSight() === true) {
                var skylights = this.containerShape.parentShape.skylightRects;
                if (skylights === null) {
                    return true;
                }
                if (this.connectionLines.length > 0) {
                    for (var i=0;i<skylights.length;i++) {
                        for (var j=0;j<this.connectionLines.length;j++) {
                            this.connectionLines[j].setPointOfLine(false);
                            if (toolBox.lineHitRect(
                                this.connectionLines[j].line.x,
                                this.connectionLines[j].line.y,
                                this.connectionLines[j].line.x2,
                                this.connectionLines[j].line.y2,
                                skylights[i].x,
                                skylights[i].y,
                                skylights[i].x2,
                                skylights[i].y2
                            ) === true) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
            else {
                var skylights = this.containerShape.parentShape.skylightRects;
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
                    for (var j=0;j<this.connectionLines.length;j++) {
                        this.connectionLines[j].setPointOfLine(false);
                        if (toolBox.lineHitRect(
                            this.connectionLines[j].line.x,
                            this.connectionLines[j].line.y,
                            this.connectionLines[j].line.x2,
                            this.connectionLines[j].line.y2,
                            skylights[i].x,
                            skylights[i].y,
                            skylights[i].x2,
                            skylights[i].y2
                        ) === true) {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }
,   innerFade: function(_ctx, _fadeLastPos) {
        if (this.isVisible() === true) {
            var ctx = this.getCtx(_ctx);
            if (this.entityType === toolBox.ENTITY_TYPE_LINK && this.text === '') {
                ctx.save();
                ctx.globalAlpha = this.linkGlobalAlpha;
            }
            ctx.strokeStyle = toolBox.FADE_STROKE_COLOR;
            ctx.lineWidth = this.shapeFormat.strokeLineWidth;
            toolBox.setTempPos(this, _fadeLastPos);
            if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RECT) {
                ctx.strokeRect(toolBox.tempX-1, toolBox.tempY-1, toolBox.tempW+2, toolBox.tempH+2);
                ctx.fillStyle = toolBox.FADE_FILL_COLOR;
                ctx.fillRect(toolBox.tempX-1, toolBox.tempY-1, toolBox.tempW+2, toolBox.tempH+2);
            }
            else if (this.shapeFormat.shapeType === toolBox.SHAPE_TYPE_RRECT) {
                ctx.strokeRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
                ctx.fillStyle = toolBox.FADE_FILL_COLOR;
                ctx.fillRRect(toolBox.tempX, toolBox.tempY, toolBox.tempW, toolBox.tempH, toolBox.tempR);
            }
            if (this.entityType === toolBox.ENTITY_TYPE_LINK) {
                ctx.restore();
            }
            this.afterInnerFade(_ctx);
        }
        for (var i=0;i<this.connectionLines.length;i++) {
            this.connectionLines[i].fadeConnection(ctx, _fadeLastPos);
        }
    }
,   afterInnerFade: function(_ctx) {
    }
,   innerDraw: function(_ctx, _drawLastPos) {
        var ctx = this.getCtx(_ctx);
        if (this.entityType === toolBox.ENTITY_TYPE_LINK && this.text === '') {
            ctx.save();
            ctx.globalAlpha = this.linkGlobalAlpha;
        }
        toolBox.setTempPos(this, _drawLastPos);
        this.prepareInnerDraw(ctx);
        this.drawRect(ctx);
        this.afterDrawRect(_ctx);
        this.drawSoulShareStatus(ctx);
        this.drawLinkChildrenStatus(ctx);
        this.drawHyperLinkUrlButton(ctx);
        this.drawText(ctx);
        if (this.entityType === toolBox.ENTITY_TYPE_LINK) {
            ctx.restore();
        }
        for (var i=0;i<this.connectionLines.length;i++) {
            this.connectionLines[i].drawConnection(ctx, _drawLastPos);
        }
    }
,   afterDrawRect: function(_ctx) {
    }
,   drawImage: function(_ctx) {
        if (this.hasNoImage() === true) {
            return;
        }
        toolBox.a = this.image.width / this.image.height;
        toolBox.b = toolBox.tempW / toolBox.tempH;
        if (toolBox.a > toolBox.b) {
            toolBox.tempRect1.w = toolBox.tempW;
            toolBox.tempRect1.h = toolBox.tempW / toolBox.a;
            toolBox.tempRect1.x = toolBox.tempX;
            toolBox.tempRect1.y = toolBox.tempY + ((toolBox.tempH - toolBox.tempRect1.h) / 2);
        }
        else {
            toolBox.tempRect1.h = toolBox.tempH;
            toolBox.tempRect1.w = toolBox.tempH * toolBox.a;
            toolBox.tempRect1.y = toolBox.tempY;
            toolBox.tempRect1.x = toolBox.tempX + ((toolBox.tempW - toolBox.tempRect1.w) / 2);;
        }
        try {
            _ctx.drawImage(
                this.image,
                toolBox.tempRect1.x + toolBox.BORDER_SIZE * this.getParentZoom(),
                toolBox.tempRect1.y + toolBox.BORDER_SIZE * this.getParentZoom(),
                toolBox.tempRect1.w - toolBox.BORDER_SIZE * this.getParentZoom() * 2,
                toolBox.tempRect1.h - toolBox.BORDER_SIZE * this.getParentZoom() * 2
            );
        }
        catch (e) {
            
        }
    }
,   drawSoulShareStatus: function(_ctx, _drawLastPos) {
        if (this.soulShareCount > 1) {
            var pz = this.getParentZoom();
            var parentZoom13 = 13 * pz;
            var parentZoom5 = 5 * pz;
            var parentZoom3 = 3 * pz;
            var parentZoom4 = 4 * pz;
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + parentZoom13, toolBox.tempY + toolBox.tempH - parentZoom13, parentZoom5, 0, Math.PI*2, false);
            _ctx.fillStyle = toolBox.SOUL_SHARE_FILL_COLOR;
            _ctx.fill();
            _ctx.strokeStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + parentZoom13, toolBox.tempY + toolBox.tempH - parentZoom13, parentZoom5, 0, Math.PI*2, false);
            _ctx.strokeStyle = '#c0c0c0';
            _ctx.lineWidth = parentZoom4;
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + parentZoom13, toolBox.tempY + toolBox.tempH - parentZoom13, parentZoom3, 0, Math.PI*2, false);
            _ctx.stroke();
        }
    }
,   drawLinkChildrenStatus: function(_ctx, _drawLastPos) {
        if (this.linkChildrenCount > 0) {
            var pz = this.getParentZoom();
            var parentZoom13 = 13 * this.getParentZoom();
            var parentZoom12 = 12 * this.getParentZoom();
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + parentZoom12 + parentZoom13, toolBox.tempY + toolBox.tempH - parentZoom13, 5 * pz, 0, Math.PI*2, false);
            _ctx.fillStyle = toolBox.SOUL_SHARE_FILL_COLOR;
            _ctx.fill();
            _ctx.strokeStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            _ctx.beginPath();
            _ctx.arc(toolBox.tempX + parentZoom12 + parentZoom13, toolBox.tempY + toolBox.tempH - parentZoom13, 5 * pz, 0, Math.PI*2, false);
            _ctx.fill();
            _ctx.strokeStyle = '#c0c0c0';
            _ctx.lineWidth = 1.5 * pz;
            _ctx.beginPath();
            _ctx.moveTo(toolBox.tempX + parentZoom12 + parentZoom13, toolBox.tempY + toolBox.tempH - (17 * pz));
            _ctx.lineTo(toolBox.tempX + parentZoom12 + parentZoom13, toolBox.tempY + toolBox.tempH - (10 * pz));
            _ctx.closePath();
            _ctx.stroke();
            _ctx.beginPath();
            _ctx.moveTo(toolBox.tempX + parentZoom12 + (10 * pz), toolBox.tempY + toolBox.tempH - parentZoom13);
            _ctx.lineTo(toolBox.tempX + parentZoom12 + (13.5 * pz), toolBox.tempY + toolBox.tempH - (9.5 * pz));
            _ctx.closePath();
            _ctx.stroke();
            _ctx.beginPath();
            _ctx.moveTo(toolBox.tempX + parentZoom12 + (16 * pz), toolBox.tempY + toolBox.tempH - parentZoom13);
            _ctx.lineTo(toolBox.tempX + parentZoom12 + (12.5 * pz), toolBox.tempY + toolBox.tempH - (9.5 * pz));
            _ctx.closePath();
            _ctx.stroke();
        }
    }
,   drawHyperLinkUrlButton: function(_ctx, _drawLastPos) {
        if (toolBox.trim(this.hyperLinkUrl) !== '') {
            var pz = this.getParentZoom();
            var parentZoom38 = 38 * pz;
            var parentZoom30 = 30 * pz;
            var parentZoom20 = 20 * pz;
            var parentZoom12 = 12 * pz;
            var parentZoom10 = 10 * pz;
            _ctx.lineWidth = this.shapeFormat.strokeLineWidth;
            if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
                _ctx.fillStyle = toolBox.HYPER_LINK_FILL_COLOR;
            }
            else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
                _ctx.fillStyle = toolBox.HYPER_LINK_JSONP_FILL_COLOR;
            }
            _ctx.fillRRect((toolBox.tempX + toolBox.tempW) - parentZoom38, toolBox.tempY + toolBox.tempH - parentZoom20, parentZoom30, parentZoom12, 3 * pz);
            _ctx.textBaseline = 'middle';
            _ctx.textVerticalAlign = 'middle';
            _ctx.textAlign = toolBox.TEXT_ALIGN_CENTER;
            _ctx.font = parentZoom10 + 'px Arial';
            if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
                _ctx.fillStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            }
            else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
                _ctx.fillStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
            }
            _ctx.fillText2('URL', (toolBox.tempX + toolBox.tempW) - (23 * this.getParentZoom()), toolBox.tempY + toolBox.tempH - (14 * pz), parentZoom30, parentZoom10);
            if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_NORMAL) {
                _ctx.strokeStyle = toolBox.HYPER_LINK_STROKE_COLOR;
            }
            else if (this.hyperLinkUrlMode === toolBox.HYPER_LINK_URL_MODE_JSONP) {
                _ctx.strokeStyle = toolBox.HYPER_LINK_JSONP_STROKE_COLOR;
            }
            _ctx.strokeRRect((toolBox.tempX + toolBox.tempW) - parentZoom38, toolBox.tempY + toolBox.tempH - parentZoom20, parentZoom30, parentZoom12, 3 * pz);
        }
    }
,   getEffectedShapes: function() {
        var ret = new Array();
        for (var i=0;i<this.connectionLines.length;i++) {
            toolBox.addToArray(ret, this.connectionLines[i].connectToShape);
        }
        return ret;
    }
,   innerDestroy: function() {
        for (var i=0;i<this.parentShape.childShapes.length;i++) {
            if (this.parentShape.childShapes[i].isEntity) {
                if (this.parentShape.childShapes[i] !== this) {
                    if (this.parentShape.childShapes[i].soulId === this.soulId) {
                        if (this.parentShape.childShapes[i].soulShareCount > 0) {
                            this.parentShape.childShapes[i].soulShareCount--;
                        }
                    }
                }
            }
        }
        var found = false;
        while (true) {
            if (this.connectionLines.length > 0) {
                var targetEntity = this.connectionLines[0].connectToShape;
                found = false;
                for (var i=0;i<targetEntity.connectionLines.length;i++) {
                    if (targetEntity.connectionLines[i].connectToShape === this) {
                        found = true;
                        targetEntity.connectionLines[i].destroy();
                        break;
                    }
                }
                if (found === false) {
                    this.connectionLines[0].destroy();
                }
            }
            else {
                break;
            }
        }
        for (var i=0;i<this.dockedShapeInfos.length;i++) {
            if (this.dockedShapeInfos[i].info1.alive === true) {
                this.dockedShapeInfos[i].info1.destroy();
                break;
            }
        }
        new ShapeDestructionAnimation(
            this.containerShape,
            this.parentShape,
            this.backGroundShape.selectedShapeLayer,
            this.x,
            this.y,
            this.w,
            this.h
        ).startAnimation();

        this.parentShape.parentShape.registerDrawBuffer();
    }
,   callBackFromInputBox: function(_resultText, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var newUrl = _resultText;
        if (_arg1 === 'editImageOfSelectedShape') {
            this.setImageUrl(newUrl, true);
            for (var i=0;i<this.parentShape.childShapes.length;i++) {
                if (this.parentShape.childShapes[i] !== this &&
                    this.parentShape.childShapes[i].soulId === this.soulId) {
                    this.parentShape.childShapes[i].setImageUrl(newUrl, true);
                }
            }
            this.select(0, 0, false);
            this.soulMaster.dataAccessAction.saveToData();
            this.parentShape.registerDrawBuffer();
        }
    }
,   callBackFromHyperLinkUrlBox: function(_resultText, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag, _arg1, _arg2, _arg3, _arg4, _arg5) {
        var newUrl = _resultText;
        if (_arg1 === 'editHyperLinkOfSelectedShape') {
            this.setHyperLinkUrl(newUrl, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag);
            this.showOrHideUrlButton();
            for (var i=0;i<this.parentShape.childShapes.length;i++) {
                if (this.parentShape.childShapes[i] !== this &&
                    this.parentShape.childShapes[i].soulId === this.soulId) {
                    this.parentShape.childShapes[i].setHyperLinkUrl(newUrl, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag);
                }
            }
            this.select(0, 0, false);
            this.soulMaster.dataAccessAction.saveToData();
            this.parentShape.registerDrawBuffer();
        }
    }
,   setHyperLinkUrl: function(_hyperLinkUrl, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag) {
        this.hyperLinkUrl = _hyperLinkUrl;
        this.hyperLinkUrlMode = _hyperLinkUrlMode;
        this.hyperLinkJsonpDirectJumpFlag = _hyperLinkJsonpDirectJumpFlag;
        this.registerDrawBuffer();
    }
,   callBackCancelFromInputBox: function(_arg1, _arg2, _arg3, _arg4, _arg5) {
        this.select(0, 0, false);
    }
});

var DataAccessAction = function(){this.initialize.apply(this, arguments);}
DataAccessAction.prototype = toolBox.extend(new ActionBase(), {
    db  : null
,   initialize: function(_soulMaster) {
        ActionBase.prototype.initialize.apply(this,[_soulMaster]);
        this.classType = 'DataAccessAction';
        this.initializeDb();
        this.alive = true;
    }
,   initializeDb: function() {
        this.db = new LocalDataBase();
        var row = this.db.tables['APP_CONFIG'].newRow();
        row['BACK_GROUND_TEXT'] = translator.t(toolBox.NEW_MAP_TEXT);
        row['BACK_GROUND_INNER_OFFSET_X'] = 0;
        row['BACK_GROUND_INNER_OFFSET_Y'] = 0;
        row['BACK_GROUND_INNER_ZOOM'] = 1;
        row['BACK_GROUND_IMAGE_URL'] = '';
        row['BACK_GROUND_FORMAT_FILL_STYLE'] = '#f5f5f5';
        row['BACK_GROUND_FORMAT_TEXT_ALIGN'] = toolBox.TEXT_ALIGN_LEFT;
        row['BACK_GROUND_FORMAT_TEXT_VERTICAL_ALIGN'] = 'top';
        row['BACK_GROUND_FORMAT_TEXT_DESCRIPTION'] = '';
        row['BACK_GROUND_FORMAT_TEXT_SIZE'] = 25;
        row['BACK_GROUND_FORMAT_TEXT_FONT'] = 'HG丸ｺﾞｼｯｸM-PRO';
        row['BACK_GROUND_FORMAT_TEXT_FILL_STYLE'] = '#000000';
        row['STANDARD_VIEW_FORMAT_FILL_STYLE'] = '#ffffff';
        row['STANDARD_VIEW_FORMAT_TEXT_ALIGN'] = toolBox.TEXT_ALIGN_LEFT;
        row['STANDARD_VIEW_FORMAT_TEXT_VERTICAL_ALIGN'] = 'top';
        row['STANDARD_VIEW_FORMAT_TEXT_DESCRIPTION'] = '';
        row['STANDARD_VIEW_FORMAT_TEXT_SIZE'] = 14;
        row['STANDARD_VIEW_FORMAT_TEXT_FONT'] = 'Arial';
        row['STANDARD_VIEW_FORMAT_TEXT_FILL_STYLE'] = '#000000';
        row['STANDARD_VIEW_IMAGE_URL'] = '';
        this.db.tables['APP_CONFIG'].addRowWithNoLogging(row);
        this.db.tables['APP_CONFIG'].rebuildKeyIndex();

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_WORLD;
        row['TEXT'] = 'WORLD';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_SAME;
        row['TEXT'] = '同じ';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_INHERITED;
        row['TEXT'] = '継承';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_BELONG;
        row['TEXT'] = '属する';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_SAME_ENG;
        row['TEXT'] = 'Same';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_INHERITED_ENG;
        row['TEXT'] = 'Inherited';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = toolBox.SOUL_ID_BELONG_ENG;
        row['TEXT'] = 'Belong';
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['IMAGE_URL'] = '';
        row['HYPER_LINK_URL'] = '';
        row['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
        this.db.tables['SOUL'].addRowWithNoLogging(row);

        this.db.tables['SOUL'].rebuildKeyIndex();

        row = this.db.tables['BODY'].newRow();
        row['BODY_ID'] = toolBox.BODY_ID_WORLD;
        row['SOUL_ID'] = toolBox.SOUL_ID_WORLD;
        row['LINK_FLAG'] = '0';
        row['PARENT_BODY_ID'] = '';
        row['X'] = 0;
        row['Y'] = 0;
        row['W'] = 162;
        row['H'] = 100;
        row['R'] = 0;
        row['ZORDER_NEXT_LOWER_BODY_ID'] = '';
        row['ZORDER_NEXT_HIGHER_BODY_ID'] = '';
        this.db.tables['BODY'].addRowWithNoLogging(row);
        this.db.tables['BODY'].rebuildKeyIndex();

        row = this.db.tables['BODY_FORMAT'].newRow();
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_BODY_STANDARD;
        row['SHAPE_TYPE'] = toolBox.SHAPE_TYPE_RRECT;
        row['STROKE_STYLE'] = '#fafad2';
        row['STROKE_LINE_WIDTH'] = 1;
        row['SELECTED_STROKE_LINE_WIDTH'] = 3;
        row['SELECTED_STROKE_STYLE'] = toolBox.SELECTED_SHAPE_COLOR;
        row['DRAW_SHADOW_FLAG'] = '0';
        row['SHADOW_STROKE_LINE_WIDTH'] = 1;
        row['SHADOW_STROKE_STYLE'] = toolBox.SHADOW_COLOR;
        row['FILL_STYLE'] = '#e6e6fa';
        row['TEXT_DESCRIPTION'] = '';
        row['TEXT_SIZE'] = 14;
        row['TEXT_FONT'] = 'Arial';
        row['TEXT_BASELINE'] = 'middle';
        row['TEXT_ALIGN'] = toolBox.TEXT_ALIGN_CENTER;
        row['TEXT_VERTICAL_ALIGN'] = 'middle';
        row['TEXT_FILL_STYLE'] = '#000000';
        this.db.tables['BODY_FORMAT'].addRowWithNoLogging(row);

        row = this.db.tables['BODY_FORMAT'].newRow();
        row['BODY_FORMAT_ID'] = toolBox.BODY_FORMAT_ID_LINK_STANDARD;
        row['SHAPE_TYPE'] = toolBox.SHAPE_TYPE_RRECT;
        row['STROKE_STYLE'] = '#fafad2';
        row['STROKE_LINE_WIDTH'] = 1;
        row['SELECTED_STROKE_LINE_WIDTH'] = 3;
        row['SELECTED_STROKE_STYLE'] = toolBox.SELECTED_SHAPE_COLOR;
        row['DRAW_SHADOW_FLAG'] = '0';
        row['SHADOW_STROKE_LINE_WIDTH'] = 1;
        row['SHADOW_STROKE_STYLE'] = toolBox.SHADOW_COLOR;
        row['FILL_STYLE'] = '#e6e6fa';
        row['TEXT_DESCRIPTION'] = '';
        row['TEXT_SIZE'] = 14;
        row['TEXT_FONT'] = 'Arial';
        row['TEXT_BASELINE'] = 'middle';
        row['TEXT_ALIGN'] = toolBox.TEXT_ALIGN_CENTER;
        row['TEXT_VERTICAL_ALIGN'] = 'middle';
        row['TEXT_FILL_STYLE'] = '#000000';
        this.db.tables['BODY_FORMAT'].addRowWithNoLogging(row);
        this.db.tables['BODY_FORMAT'].rebuildKeyIndex();

    }
,   directDeleteBodyDataForCut: function(_bodyIdList) {
        if (_bodyIdList !== null && _bodyIdList.length > 0) {
            this.db.beginTransaction();
            var bodyDeleteRows = new Array();
            var bodyFormatDeleteTryRows = new Array();
            var soulDeleteTryRows = new Array();
            var row = null;
            var parentBodyId = '';
            for (var i=0;i<_bodyIdList.length;i++) {
                row = this.findBodyById(_bodyIdList[i]);
                if (row !== null) {
                    toolBox.addToArray(bodyDeleteRows, row);
                    parentBodyId = row['PARENT_BODY_ID'];
                }
            }
            var childBodyList = this.findLinksAndBodiesByParentBodyId(parentBodyId);
            var bodyZOrderMap = {};
            var topBodyId = '';
            for (var i=0;i<childBodyList.length;i++) {
                bodyZOrderMap[childBodyList[i]['BODY_ID']] = childBodyList[i]['ZORDER_NEXT_LOWER_BODY_ID'];
                if (childBodyList[i]['ZORDER_NEXT_HIGHER_BODY_ID'] === '') {
                    topBodyId = childBodyList[i]['BODY_ID'];
                }
            }
            var sortedBodyIdList = new Array();
            var currentBodyId = topBodyId;
            while (true) {
                toolBox.addToArray(sortedBodyIdList, currentBodyId);
                if (bodyZOrderMap[currentBodyId]) {
                    currentBodyId = bodyZOrderMap[currentBodyId];   //get the next lower bodyId
                }
                else {
                    break;
                }
            }
            
            //delete body
            var deletedBodyIds = {};
            for (var i=0;i<bodyDeleteRows.length;i++) {
                this.deleteBodyRecursive(deletedBodyIds, bodyDeleteRows[i], soulDeleteTryRows);
            }
            this.db.tables['BODY'].rebuildKeyIndex();
            //update body
            childBodyList = this.findLinksAndBodiesByParentBodyId(parentBodyId);
            var childBodyMap = {};
            for (var i=0;i<childBodyList.length;i++) {
                childBodyMap[childBodyList[i]['BODY_ID']] = childBodyList[i];
            }
            var sortedChildBodyRowList = new Array();
            for (var i=0;i<sortedBodyIdList.length;i++) {
                if (childBodyMap[sortedBodyIdList[i]]) {
                    toolBox.addToArray(sortedChildBodyRowList, childBodyMap[sortedBodyIdList[i]]);
                }
            }
            for (var i=0;i<sortedChildBodyRowList.length;i++) {
                var row = this.findBodyById(sortedChildBodyRowList[i]['BODY_ID']);
                this.db.tables['BODY'].editRow(row);
                if (i > 0) {
                    row['ZORDER_NEXT_HIGHER_BODY_ID'] = sortedChildBodyRowList[i-1]['BODY_ID'];
                }
                if (i < sortedChildBodyRowList.length-1) {
                    row['ZORDER_NEXT_LOWER_BODY_ID'] = sortedChildBodyRowList[i+1]['BODY_ID'];
                }
                if (i === 0) {
                    row['ZORDER_NEXT_HIGHER_BODY_ID'] = '';
                }
                if (i === sortedChildBodyRowList.length-1) {
                    row['ZORDER_NEXT_LOWER_BODY_ID'] = '';
                }
                this.db.tables['BODY'].updateRow(row);
            }
            
            //delete soul
            var deleteSouls = new Array();
            for (var i=0;i<soulDeleteTryRows.length;i++) {
                if (this.isDeletableSoul(soulDeleteTryRows[i]['SOUL_ID']) === true) {
                    toolBox.addToArray(deleteSouls, soulDeleteTryRows[i]);
                }
            }
            for (var i=0;i<deleteSouls.length;i++) {
                row = this.db.tables['BODY_FORMAT'].findRowByKey(deleteSouls[i]['BODY_FORMAT_ID']);
                toolBox.addToArray(bodyFormatDeleteTryRows, row);
                this.db.tables['SOUL'].deleteRow(deleteSouls[i]);
            }
            this.db.tables['SOUL'].rebuildKeyIndex();
            //rebuild soullink
            this.rebuildAllSoulLink();
            //delete bodyFormat
            var bodyFormatDeleteRows = new Array();
            for (var i=0;i<bodyFormatDeleteTryRows.length;i++) {
                if (this.isDeletableBodyFormat(bodyFormatDeleteTryRows[i]['BODY_FORMAT_ID']) === true) {
                    toolBox.addToArray(bodyFormatDeleteRows, bodyFormatDeleteTryRows[i]);
                }
            }
            for (var i=0;i<bodyFormatDeleteRows.length;i++) {
                this.db.tables['BODY_FORMAT'].deleteRow(bodyFormatDeleteRows[i]);
            }
            this.db.tables['BODY_FORMAT'].rebuildKeyIndex();

            this.db.commit();
/*
            //保存後のデータを他の読み取り用Viewに表示
            this.soulMaster.targetBackGround.syncReadOnlyViews();
            //保存後のSoulShareCountを更新
            var topview = null;
            if (this.soulMaster.targetBackGround.childShapes.length > 0) {
                topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
                if (topview !== null) {
                    for (var i=0;i<deleteSouls.length;i++) {
                        this.soulMaster.selectedShapesAction.syncTopEditViewSoulShareCount(topview.view, deleteSouls[i]['SOUL_ID']);
                    }
                }
            }
*/
        }
    }
,   saveToData: function() {
        if (this.soulMaster.targetBackGround.isChanged() === true || this.soulMaster.targetBackGround.garbages.length > 0) {
            this.db.beginTransaction();
            //ADD,UPDATE
            this.soulMaster.targetBackGround.saveToData();
            //DELETE
            var viewDeleteRows = new Array();
            var bodyDeleteRows = new Array();
            var bodyFormatDeleteTryRows = new Array();
            var soulDeleteTryRows = new Array();
            var row = null;
            for (var i=0;i<this.soulMaster.targetBackGround.garbages.length;i++) {
                if (this.soulMaster.targetBackGround.garbages[i].isViewFrame) {
                    row = this.db.tables['VIEW_STATUS'].findRowByKey(this.soulMaster.targetBackGround.garbages[i].id);
                    toolBox.addToArray(viewDeleteRows, row);
                }
                else if (this.soulMaster.targetBackGround.garbages[i].isEntity) {
                    row = this.db.tables['BODY'].findRowByKey(this.soulMaster.targetBackGround.garbages[i].bodyId);
                    toolBox.addToArray(bodyDeleteRows, row);
                }
                else if (this.soulMaster.targetBackGround.garbages[i].classType === 'EntityFormat') {
                    row = this.db.tables['BODY_FORMAT'].findRowByKey(this.soulMaster.targetBackGround.garbages[i].id);
                    toolBox.addToArray(bodyFormatDeleteTryRows, row);
                }
                else if (this.soulMaster.targetBackGround.garbages[i]['SOUL_ID']) {
                    toolBox.addToArrayIfNotExists(soulDeleteTryRows, this.soulMaster.targetBackGround.garbages[i]);
                }
            }
            //delete viewstatus
            for (var i=0;i<viewDeleteRows.length;i++) {
                this.deleteLinkViewFilters(viewDeleteRows[i]['VIEW_ID']);
                this.deleteLinkViewLocks(viewDeleteRows[i]['VIEW_ID']);
                this.db.tables['VIEW_STATUS'].deleteRow(viewDeleteRows[i]);
            }
            this.db.tables['LINK_VIEW_FILTERS'].rebuildKeyIndex();
            this.db.tables['LINK_VIEW_LOCKS'].rebuildKeyIndex();
            this.db.tables['VIEW_STATUS'].rebuildKeyIndex();
            //delete body
            var deletedBodyIds = {};
            for (var i=0;i<bodyDeleteRows.length;i++) {
                this.deleteBodyRecursive(deletedBodyIds, bodyDeleteRows[i], soulDeleteTryRows);
            }
            this.db.tables['BODY'].rebuildKeyIndex();
            //delete soul
            var deleteSouls = new Array();
            for (var i=0;i<soulDeleteTryRows.length;i++) {
                if (this.isDeletableSoul(soulDeleteTryRows[i]['SOUL_ID']) === true) {
                    toolBox.addToArray(deleteSouls, soulDeleteTryRows[i]);
                }
            }
            for (var i=0;i<deleteSouls.length;i++) {
                row = this.db.tables['BODY_FORMAT'].findRowByKey(deleteSouls[i]['BODY_FORMAT_ID']);
                toolBox.addToArrayIfNotExists(bodyFormatDeleteTryRows, row);
                this.db.tables['SOUL'].deleteRow(deleteSouls[i]);
            }
            this.db.tables['SOUL'].rebuildKeyIndex();

            //rebuild soullink
            if (this.db.tables['BODY'].rebuildSoulLink === true) {
                this.rebuildAllSoulLink();
                this.db.tables['BODY'].rebuildSoulLink = false;
            }

            //delete bodyFormat
            var bodyFormatDeleteRows = new Array();
            for (var i=0;i<bodyFormatDeleteTryRows.length;i++) {
                if (this.isDeletableBodyFormat(bodyFormatDeleteTryRows[i]['BODY_FORMAT_ID']) === true) {
                    toolBox.addToArray(bodyFormatDeleteRows, bodyFormatDeleteTryRows[i]);
                }
            }
            for (var i=0;i<bodyFormatDeleteRows.length;i++) {
                this.db.tables['BODY_FORMAT'].deleteRow(bodyFormatDeleteRows[i]);
            }
            this.db.tables['BODY_FORMAT'].rebuildKeyIndex();

            this.soulMaster.targetBackGround.garbages.length = 0;
            this.db.commit();

            //保存後のデータを他の読み取り用Viewに表示
            this.soulMaster.targetBackGround.syncReadOnlyViews();
            //保存後のSoulShareCountを更新
            var topview = null;
            if (this.soulMaster.targetBackGround.childShapes.length > 0) {
                topview = this.soulMaster.targetBackGround.childShapes[0].zOrder.getTopShape();
                if (topview !== null) {
                    for (var i=0;i<deleteSouls.length;i++) {
                        this.soulMaster.selectedShapesAction.syncTopEditViewSoulShareCount(topview.view, deleteSouls[i]['SOUL_ID']);
                    }
                }
            }
this.soulMaster.dataAccessAction.showRedoLog('save');
        }
    }
,   deleteBodyRecursive: function(_deletedBodyIds, _bodyRow, _soulDeleteRows) {
        var childBodies = this.findBodiesByParentBodyId(_bodyRow['BODY_ID']);
        for (var i=0;i<childBodies.length;i++) {
            this.deleteBodyRecursive(_deletedBodyIds, childBodies[i], _soulDeleteRows);
        }
        if (!_deletedBodyIds[_bodyRow['BODY_ID']]) {
            this.db.tables['BODY'].deleteRow(_bodyRow);
            toolBox.addToArrayIfNotExists(_soulDeleteRows, this.db.tables['SOUL'].findRowByKey(_bodyRow['SOUL_ID']));
        }
        _deletedBodyIds[_bodyRow['BODY_ID']] = 1;
    }
,   copyChildrensBodyRecursive: function(_copyFromBodyId, _copyToBodyId) {
        var mapObject = new BaseObject();
        mapObject.bodyIdNewOldMapping = {};
        var depth = 0;
        this.createBodyIdNewOldMappingRecursive(_copyFromBodyId, mapObject, depth);
        depth = 0;
        this.innerCopyChildrensBodyRecursive(_copyFromBodyId, _copyToBodyId, mapObject, depth);
    }
,   createBodyIdNewOldMappingRecursive: function(_bodyId, _mapObject, _depth) {
        var bodyRows = this.findBodiesByParentBodyId(_bodyId);
        var bodyRow = null;
        _depth++;
        for (var i=0;i<bodyRows.length;i++) {
            if (_depth === 1) {
                bodyRow = this.findBodyById(bodyRows[i]['BODY_ID']);
                if (bodyRow['LINK_FLAG'] === '0') {
                    continue;
                }
            }
            newBodyId = this.getNewBodyId();
            _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']] = newBodyId;
            this.createBodyIdNewOldMappingRecursive(bodyRows[i]['BODY_ID'], _mapObject, _depth);
        }
        _depth--;
    }
,   innerCopyChildrensBodyRecursive: function(_copyFromBodyId, _copyToBodyId, _mapObject, _depth) {
        var bodyRows = this.findBodiesByParentBodyId(_copyFromBodyId);
        var bodyRow = null;
        var nextLowerBodyId = '';
        var nextHigherBodyId = '';
        _depth++;
        for (var i=0;i<bodyRows.length;i++) {
            if (_depth === 1) {
                bodyRow = this.findBodyById(bodyRows[i]['BODY_ID']);
                if (bodyRow['LINK_FLAG'] === '0') {
                    continue;
                }
            }
            if (bodyRows[i]['ZORDER_NEXT_LOWER_BODY_ID'] === '') {
                nextLowerBodyId = '';
            }
            else {
                nextLowerBodyId = _mapObject.bodyIdNewOldMapping[bodyRows[i]['ZORDER_NEXT_LOWER_BODY_ID']]
            }
            if (bodyRows[i]['ZORDER_NEXT_HIGHER_BODY_ID'] === '') {
                nextHigherBodyId = '';
            }
            else {
                nextHigherBodyId = _mapObject.bodyIdNewOldMapping[bodyRows[i]['ZORDER_NEXT_HIGHER_BODY_ID']]
            }
            var soulRow = this.findSoulById(bodyRows[i]['SOUL_ID']);
            if (soulRow['TEXT'] === '') {
                var bodyFormatRow = this.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']);
                var bodyFormat = new EntityFormat();
                bodyFormat.loadFromBodyFormatRowData(bodyFormatRow);
                bodyFormatRow = this.addBodyFormat(
                    this.getNewBodyFormatId()
                ,   bodyFormat.shapeType
                ,   bodyFormat.strokeStyle
                ,   bodyFormat.strokeLineWidth
                ,   bodyFormat.selectedStrokeLineWidth
                ,   bodyFormat.selectedStrokeStyle
                ,   bodyFormat.drawShadow
                ,   bodyFormat.shadowStrokeLineWidth
                ,   bodyFormat.shadowStrokeStyle
                ,   bodyFormat.fillStyle
                ,   bodyFormat.textDescription
                ,   bodyFormat.textSize
                ,   bodyFormat.textFont
                ,   bodyFormat.textBaseline
                ,   bodyFormat.textAlign
                ,   bodyFormat.textVerticalAlign
                ,   bodyFormat.textFillStyle
                );
                soulRow = this.addSoul(
                    this.getNewSoulId()
                ,   ''
                ,   bodyFormatRow['BODY_FORMAT_ID']
                ,   soulRow['IMAGE_URL']
                ,   soulRow['HYPER_LINK_URL']
                ,   soulRow['HYPER_LINK_URL_MODE']
                ,   soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']
                );
            }
            this.addBody(
                _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']],
                soulRow['SOUL_ID'],
                bodyRows[i]['LINK_FLAG'],
                _copyToBodyId,
                bodyRows[i]['X'],
                bodyRows[i]['Y'],
                bodyRows[i]['W'],
                bodyRows[i]['H'],
                bodyRows[i]['R'],
                nextLowerBodyId,
                nextHigherBodyId
            );
            this.innerCopyChildrensBodyRecursive(bodyRows[i]['BODY_ID'], _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']], _mapObject, _depth);
        }
        _depth--;
    }
,   isDeletableSoul: function(_soulId) {
        if (this.isSpecialSoulId(_soulId) === true) {
            return false;
        }
        var row = this.db.tables['BODY'].findRowByValue('SOUL_ID', _soulId);
        if (row === null) {
            return true;
        }
        else {
            return false;
        }
    }
,   isSpecialSoulId: function(_soulId) {
        return (_soulId === toolBox.SOUL_ID_WORLD || 
                _soulId === toolBox.SOUL_ID_SAME || 
                _soulId === toolBox.SOUL_ID_INHERITED ||
                _soulId === toolBox.SOUL_ID_BELONG ||
                _soulId === toolBox.SOUL_ID_SAME_ENG || 
                _soulId === toolBox.SOUL_ID_INHERITED_ENG ||
                _soulId === toolBox.SOUL_ID_BELONG_ENG
               );
    }
,   isDeletableBodyFormat: function(_bodyFormatId) {
        if (_bodyFormatId === toolBox.BODY_FORMAT_ID_BODY_STANDARD || _bodyFormatId === toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
            return false;
        }
        var row = this.db.tables['SOUL'].findRowByValue('BODY_FORMAT_ID', _bodyFormatId);
        if (row === null) {
            return true;
        }
        else {
            return false;
        }
    }
,   findAppConfig: function() {
        return this.db.tables['APP_CONFIG'].rows[0];
    }
,   updateAppConfig: function(
        _text,
        _backGroundInnerOffsetX,
        _backGroundInnerOffsetY,
        _backGroundInnerZoom,
        _backGroundImageUrl,
        _backGroundFormatFillStyle,
        _backGroundFormatTextAlign,
        _backGroundFormatTextVerticalAlign,
        _backGroundFormatTextDescription,
        _backGroundFormatTextSize,
        _backGroundFormatTextFont,
        _backGroundFormatTextFillStyle,
        _standardViewFormatFillStyle,
        _standardViewFormatTextAlign,
        _standardViewFormatTextVerticalAlign,
        _standardViewFormatTextDescription,
        _standardViewFormatTextSize,
        _standardViewFormatTextFont,
        _standardViewFormatTextFillStyle,
        _standardViewImageUrl
    ) {
        var row = this.db.tables['APP_CONFIG'].rows[0];
        this.db.tables['APP_CONFIG'].editRow(row);
        row['BACK_GROUND_TEXT'] = _text;
        row['BACK_GROUND_INNER_OFFSET_X'] = _backGroundInnerOffsetX;
        row['BACK_GROUND_INNER_OFFSET_Y'] = _backGroundInnerOffsetY;
        row['BACK_GROUND_INNER_ZOOM'] = _backGroundInnerZoom;
        row['BACK_GROUND_IMAGE_URL'] = _backGroundImageUrl;
        row['BACK_GROUND_FORMAT_FILL_STYLE'] = _backGroundFormatFillStyle;
        row['BACK_GROUND_FORMAT_TEXT_ALIGN'] = _backGroundFormatTextAlign;
        row['BACK_GROUND_FORMAT_TEXT_VERTICAL_ALIGN'] = _backGroundFormatTextVerticalAlign;
        row['BACK_GROUND_FORMAT_TEXT_DESCRIPTION'] = _backGroundFormatTextDescription;
        row['BACK_GROUND_FORMAT_TEXT_SIZE'] = _backGroundFormatTextSize;
        row['BACK_GROUND_FORMAT_TEXT_FONT'] = _backGroundFormatTextFont;
        row['BACK_GROUND_FORMAT_TEXT_FILL_STYLE'] = _backGroundFormatTextFillStyle;
        row['STANDARD_VIEW_FORMAT_FILL_STYLE'] = _standardViewFormatFillStyle;
        row['STANDARD_VIEW_FORMAT_TEXT_ALIGN'] = _standardViewFormatTextAlign;
        row['STANDARD_VIEW_FORMAT_TEXT_VERTICAL_ALIGN'] = _standardViewFormatTextVerticalAlign;
        row['STANDARD_VIEW_FORMAT_TEXT_DESCRIPTION'] = _standardViewFormatTextDescription;
        row['STANDARD_VIEW_FORMAT_TEXT_SIZE'] = _standardViewFormatTextSize;
        row['STANDARD_VIEW_FORMAT_TEXT_FONT'] = _standardViewFormatTextFont;
        row['STANDARD_VIEW_FORMAT_TEXT_FILL_STYLE'] = _standardViewFormatTextFillStyle;
        row['STANDARD_VIEW_IMAGE_URL'] = _standardViewImageUrl;
        this.db.tables['APP_CONFIG'].updateRow(row);
    }
,   getAllViewStatuses: function() {
        return this.db.tables['VIEW_STATUS'].rows;
    }
,   findViewStatusById: function(_id) {
        return this.db.tables['VIEW_STATUS'].findRowByKey(_id);
/*
        if (this.db.tables['VIEW_STATUS'].keyIndex[_id] >= 0) {
            return this.db.tables['VIEW_STATUS'].rows[this.db.tables['VIEW_STATUS'].keyIndex[_id]];
        }
        else {
            return null;
        }
*/
    }
,   addViewStatus: function(
        _viewId,
        _viewMode,
        _viewStyleMode,
        _viewImageMode,
        _birdViewParentStepCount,
        _birdViewChildStepCount,
        _birdViewDirection,
        _birdViewHorizontalSpace,
        _birdViewVerticalSpace,
        _birdViewLevel,
        _linkViewStepCount,
        _readonlyFlag,
        _fillStyle,
        _textDescription,
        _textSize,
        _textFont,
        _textFillStyle,
        _bodyId,
        _isMaximized,
        _x,
        _y,
        _w,
        _h,
        _r,
        _resumeX,
        _resumeY,
        _resumeW,
        _resumeH,
        _innerOffsetX,
        _innerOffsetY,
        _innerZoom,
        _imageUrl,
        _zOrderNextLowerViewId,
        _zOrderNextHigherViewId
     ) {
        var row = this.db.tables['VIEW_STATUS'].newRow();
        row['VIEW_ID'] = _viewId;
        row['VIEW_MODE'] = _viewMode;
        row['VIEW_STYLE_MODE'] = _viewStyleMode;
        row['VIEW_IMAGE_MODE'] = _viewImageMode;
        row['BIRDVIEW_PARENT_STEP_COUNT'] = _birdViewParentStepCount;
        row['BIRDVIEW_CHILD_STEP_COUNT'] = _birdViewChildStepCount;
        row['BIRDVIEW_DIRECTION'] = _birdViewDirection;
        row['BIRDVIEW_HORIZONTAL_SPACE'] = _birdViewHorizontalSpace;
        row['BIRDVIEW_VERTICAL_SPACE'] = _birdViewVerticalSpace;
        row['BIRDVIEW_LEVEL'] = _birdViewLevel;
        row['LINKVIEW_STEP_COUNT'] = _linkViewStepCount;
        row['READONLY_FLAG'] = _readonlyFlag
        row['FILL_STYLE'] = _fillStyle;
        row['TEXT_DESCRIPTION'] = _textDescription;
        row['TEXT_SIZE'] = _textSize;
        row['TEXT_FONT'] = _textFont;
        row['TEXT_FILL_STYLE'] = _textFillStyle;
        row['BODY_ID'] = _bodyId;
        row['MAXIMIZED_FLAG'] = _isMaximized === true ? '1':'0';
        row['X'] = _x;
        row['Y'] = _y;
        row['W'] = _w;
        row['H'] = _h;
        row['R'] = _r;
        row['RESUME_X'] = _resumeX;
        row['RESUME_Y'] = _resumeY;
        row['RESUME_W'] = _resumeW;
        row['RESUME_H'] = _resumeH;
        row['INNER_OFFSET_X'] = _innerOffsetX;
        row['INNER_OFFSET_Y'] = _innerOffsetY;
        row['INNER_ZOOM'] = _innerZoom;
        row['IMAGE_URL'] = _imageUrl;
        row['ZORDER_NEXT_LOWER_VIEW_ID'] = _zOrderNextLowerViewId;
        row['ZORDER_NEXT_HIGHER_VIEW_ID'] = _zOrderNextHigherViewId;
        this.db.tables['VIEW_STATUS'].addRow(row);
        return row;
    }
,   updateViewStatus: function(
        _viewId,
        _viewMode,
        _viewStyleMode,
        _viewImageMode,
        _birdViewParentStepCount,
        _birdViewChildStepCount,
        _birdViewDirection,
        _birdViewHorizontalSpace,
        _birdViewVerticalSpace,
        _birdViewLevel,
        _linkViewStepCount,
        _readonlyFlag,
        _fillStyle,
        _textDescription,
        _textSize,
        _textFont,
        _textFillStyle,
        _bodyId,
        _isMaximized,
        _x,
        _y,
        _w,
        _h,
        _r,
        _resumeX,
        _resumeY,
        _resumeW,
        _resumeH,
        _innerOffsetX,
        _innerOffsetY,
        _innerZoom,
        _imageUrl,
        _zOrderNextLowerViewId,
        _zOrderNextHigherViewId
    ) {
//        var row = this.db.tables['VIEW_STATUS'].rows[this.db.tables['VIEW_STATUS'].keyIndex[_viewId]];
        var row = this.db.tables['VIEW_STATUS'].findRowByKey(_viewId);
        this.db.tables['VIEW_STATUS'].editRow(row);
        row['VIEW_MODE'] = _viewMode;
        row['VIEW_STYLE_MODE'] = _viewStyleMode;
        row['VIEW_IMAGE_MODE'] = _viewImageMode;
        row['BIRDVIEW_PARENT_STEP_COUNT'] = _birdViewParentStepCount;
        row['BIRDVIEW_CHILD_STEP_COUNT'] = _birdViewChildStepCount;
        row['BIRDVIEW_DIRECTION'] = _birdViewDirection;
        row['BIRDVIEW_HORIZONTAL_SPACE'] = _birdViewHorizontalSpace;
        row['BIRDVIEW_VERTICAL_SPACE'] = _birdViewVerticalSpace;
        row['BIRDVIEW_LEVEL'] = _birdViewLevel;
        row['LINKVIEW_STEP_COUNT'] = _linkViewStepCount;
        row['READONLY_FLAG'] = _readonlyFlag;
        row['FILL_STYLE'] = _fillStyle;
        row['TEXT_DESCRIPTION'] = _textDescription;
        row['TEXT_SIZE'] = _textSize;
        row['TEXT_FONT'] = _textFont;
        row['TEXT_FILL_STYLE'] = _textFillStyle;
        row['BODY_ID'] = _bodyId;
        row['MAXIMIZED_FLAG'] = _isMaximized === true ? '1':'0';
        row['X'] = _x;
        row['Y'] = _y;
        row['W'] = _w;
        row['H'] = _h;
        row['R'] = _r;
        row['RESUME_X'] = _resumeX;
        row['RESUME_Y'] = _resumeY;
        row['RESUME_W'] = _resumeW;
        row['RESUME_H'] = _resumeH;
        row['INNER_OFFSET_X'] = _innerOffsetX;
        row['INNER_OFFSET_Y'] = _innerOffsetY;
        row['INNER_ZOOM'] = _innerZoom;
        row['IMAGE_URL'] = _imageUrl;
        row['ZORDER_NEXT_LOWER_VIEW_ID'] = _zOrderNextLowerViewId;
        row['ZORDER_NEXT_HIGHER_VIEW_ID'] = _zOrderNextHigherViewId;
        this.db.tables['VIEW_STATUS'].updateRow(row);
    }
,   findBodyById: function(_id) {
        return this.db.tables['BODY'].findRowByKey(_id);
/*
        if (this.db.tables['BODY'].keyIndex[_id] >= 0) {
            return this.db.tables['BODY'].rows[this.db.tables['BODY'].keyIndex[_id]];
        }
        else {
            return null;
        }
*/
    }
,   getNewBodyId: function() {
        return toolBox.createUniqueKey();
    }
,   addBody: function(_bodyId, _soulId, _linkFlag, _parentBodyId, _x, _y, _w, _h, _r, _zOrderNextLowerBodyId, _zOrderNextHigherBodyId) {
        var row = this.db.tables['BODY'].newRow();
        row['BODY_ID'] = _bodyId;
        row['SOUL_ID'] = _soulId;
        row['LINK_FLAG'] = _linkFlag;
        row['PARENT_BODY_ID'] = _parentBodyId;
        row['X'] = _x;
        row['Y'] = _y;
        row['W'] = _w;
        row['H'] = _h;
        row['R'] = _r;
        row['ZORDER_NEXT_LOWER_BODY_ID'] = _zOrderNextLowerBodyId;
        row['ZORDER_NEXT_HIGHER_BODY_ID'] = _zOrderNextHigherBodyId;
        this.db.tables['BODY'].addRow(row);
        return row;
    }
,   updateBody: function(_bodyId, _soulId, _linkFlag, _parentBodyId, _x, _y, _w, _h, _r, _zOrderNextLowerBodyId, _zOrderNextHigherBodyId) {
//        var row = this.db.tables['BODY'].rows[this.db.tables['BODY'].keyIndex[_bodyId]];
        var row = this.db.tables['BODY'].findRowByKey(_bodyId);
        this.db.tables['BODY'].editRow(row);
        row['BODY_ID'] = _bodyId;
        row['SOUL_ID'] = _soulId;
        row['LINK_FLAG'] = _linkFlag;
        row['PARENT_BODY_ID'] = _parentBodyId;
        row['X'] = _x;
        row['Y'] = _y;
        row['W'] = _w;
        row['H'] = _h;
        row['R'] = _r;
        row['ZORDER_NEXT_LOWER_BODY_ID'] = _zOrderNextLowerBodyId;
        row['ZORDER_NEXT_HIGHER_BODY_ID'] = _zOrderNextHigherBodyId;
        this.db.tables['BODY'].updateRow(row);
    }
,   findBodyFormatByBodyFormatId: function(_id) {
        return this.db.tables['BODY_FORMAT'].findRowByKey(_id);
/*
        if (this.db.tables['BODY_FORMAT'].keyIndex[_id] >= 0) {
            return this.db.tables['BODY_FORMAT'].rows[this.db.tables['BODY_FORMAT'].keyIndex[_id]];
        }
        else {
            return null;
        }
*/
    }
,   getNewBodyFormatId: function() {
        return toolBox.createUniqueKey();
    }
,   addBodyFormat: function(
        _bodyFormatId,
        _shapeType,
        _strokeStyle,
        _strokeLineWidth,
        _selectedStrokeLineWidth,
        _selectedStrokeStyle,
        _drawShadow,
        _shadowStrokeLineWidth,
        _shadowStrokeStyle,
        _fillStyle,
        _textDescription,
        _textSize,
        _textFont,
        _textBaseline,
        _textAlign,
        _textVerticalAlign,
        _textFillStyle
    ) {
        var row = this.db.tables['BODY_FORMAT'].newRow();
        row['BODY_FORMAT_ID'] = _bodyFormatId;
        row['SHAPE_TYPE'] = _shapeType;
        row['STROKE_STYLE'] = _strokeStyle;
        row['STROKE_LINE_WIDTH'] = _strokeLineWidth;
        row['SELECTED_STROKE_LINE_WIDTH'] = _selectedStrokeLineWidth;
        row['SELECTED_STROKE_STYLE'] = _selectedStrokeStyle;
        row['DRAW_SHADOW'] = _drawShadow;
        row['SHADOW_STROKE_LINE_WIDTH'] = _shadowStrokeLineWidth;
        row['SHADOW_STROKE_STYLE'] = _shadowStrokeStyle;
        row['FILL_STYLE'] = _fillStyle;
        row['TEXT_DESCRIPTION'] = _textDescription;
        row['TEXT_SIZE'] = _textSize;
        row['TEXT_FONT'] = _textFont;
        row['TEXT_BASELINE'] = _textBaseline;
        row['TEXT_ALIGN'] = _textAlign;
        row['TEXT_VERTICAL_ALIGN'] = _textVerticalAlign;
        row['TEXT_FILL_STYLE'] = _textFillStyle;
        this.db.tables['BODY_FORMAT'].addRow(row);
        return row;
    }
,   updateBodyFormat: function(
        _bodyFormatId,
        _shapeType,
        _strokeStyle,
        _strokeLineWidth,
        _selectedStrokeLineWidth,
        _selectedStrokeStyle,
        _drawShadow,
        _shadowStrokeLineWidth,
        _shadowStrokeStyle,
        _fillStyle,
        _textDescription,
        _textSize,
        _textFont,
        _textBaseline,
        _textAlign,
        _textVerticalAlign,
        _textFillStyle
    ) {
//        var row = this.db.tables['BODY_FORMAT'].rows[this.db.tables['BODY_FORMAT'].keyIndex[_bodyFormatId]];
        var row = this.db.tables['BODY_FORMAT'].findRowByKey(_bodyFormatId);
        this.db.tables['BODY_FORMAT'].editRow(row);
        row['SHAPE_TYPE'] = _shapeType;
        row['STROKE_STYLE'] = _strokeStyle;
        row['STROKE_LINE_WIDTH'] = _strokeLineWidth;
        row['SELECTED_STROKE_LINE_WIDTH'] = _selectedStrokeLineWidth;
        row['SELECTED_STROKE_STYLE'] = _selectedStrokeStyle;
        row['DRAW_SHADOW'] = _drawShadow;
        row['SHADOW_STROKE_LINE_WIDTH'] = _shadowStrokeLineWidth;
        row['SHADOW_STROKE_STYLE'] = _shadowStrokeStyle;
        row['FILL_STYLE'] = _fillStyle;
        row['TEXT_DESCRIPTION'] = _textDescription;
        row['TEXT_SIZE'] = _textSize;
        row['TEXT_FONT'] = _textFont;
        row['TEXT_BASELINE'] = _textBaseline;
        row['TEXT_ALIGN'] = _textAlign;
        row['TEXT_VERTICAL_ALIGN'] = _textVerticalAlign;
        row['TEXT_FILL_STYLE'] = _textFillStyle;
        this.db.tables['BODY_FORMAT'].updateRow(row);
    }
,   findBodiesByParentBodyId: function(_parentBodyId) {
        return this.db.tables['BODY'].findRowsByValue('PARENT_BODY_ID', _parentBodyId);
    }
,   findBodyByParentBodyId: function(_parentBodyId) {
        return this.db.tables['BODY'].findRowByValue('PARENT_BODY_ID', _parentBodyId);
    }
,   findLinksAndBodiesByParentBodyId: function(_parentBodyId) {
        var links = this.db.tables['BODY'].findRowsByValue('PARENT_BODY_ID', _parentBodyId);
        var link = null;
        var bodyFormat = null;
        var soul = null;
        var bodyRows = null;
        var body = null;
        var linksAndBodies = new Array();
        for (var i=0;i<links.length;i++) {
            if (links[i]['LINK_FLAG'] === '1') {
                //link
                link = this.db.tables['BODY'].cloneRow(links[i]);
                soul = this.db.tables['SOUL'].findRowByKey(link['SOUL_ID']);
                if (soul !== null) {
                    link['TEXT'] = soul['TEXT'];
                    link['BODY_FORMAT_ID'] = soul['BODY_FORMAT_ID'];
                    link['IMAGE_URL'] = soul['IMAGE_URL'];
                    link['HYPER_LINK_URL'] = soul['HYPER_LINK_URL'];
                    link['HYPER_LINK_URL_MODE'] = soul['HYPER_LINK_URL_MODE'];
                    link['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = soul['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'];
                }
                else {
                    link['TEXT'] = '';
                    link['BODY_FORMAT_ID'] = '';
                    link['IMAGE_URL'] = '';
                    link['HYPER_LINK_URL'] = '';
                    link['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
                    link['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
                }
                link['SOUL_SHARE_COUNT'] = this.getCountOfBodiesBySoulId(link['SOUL_ID']);
                link['LINK_CHILDREN_COUNT'] = this.getCountOfChildrenLinks(link['BODY_ID']);
                toolBox.addToArray(linksAndBodies, link);
                //body
                bodyRows = this.db.tables['BODY'].findRowsByValue('PARENT_BODY_ID', link['BODY_ID']);
                if (bodyRows !== null) {
                    for (var j=0;j<bodyRows.length;j++) {
                        if (bodyRows[j]['LINK_FLAG'] === '0') {
                            body = this.db.tables['BODY'].cloneRow(bodyRows[j]);
                            soul = this.db.tables['SOUL'].findRowByKey(body['SOUL_ID']);
                            if (soul !== null) {
                                body['TEXT'] = soul['TEXT'];
                                body['BODY_FORMAT_ID'] = soul['BODY_FORMAT_ID'];
                                body['IMAGE_URL'] = soul['IMAGE_URL'];
                                body['HYPER_LINK_URL'] = soul['HYPER_LINK_URL'];
                                body['HYPER_LINK_URL_MODE'] = soul['HYPER_LINK_URL_MODE'];
                                body['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = soul['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'];
                            }
                            else {
                                body['TEXT'] = '';
                                body['BODY_FORMAT_ID'] = '';
                                body['IMAGE_URL'] = '';
                                body['HYPER_LINK_URL'] = '';
                                body['HYPER_LINK_URL_MODE'] = toolBox.HYPER_LINK_URL_MODE_NORMAL;
                                body['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = '0';
                            }
                            body['SOUL_SHARE_COUNT'] = this.getCountOfBodiesBySoulId(body['SOUL_ID']);
                            body['LINK_CHILDREN_COUNT'] = this.getCountOfChildrenLinks(body['BODY_ID']);
                            toolBox.addToArray(linksAndBodies, body);
                            break;
                        }
                    }
                }
            }
        }
        return linksAndBodies;
    }
,   getCountOfBodiesBySoulId: function(_soulId) {
        return this.db.tables['BODY'].findRowsByValue('SOUL_ID', _soulId).length;
    }
,   getCountOfChildrenLinks: function(_bodyId) {
        var bodyRows = this.findBodiesByParentBodyId(_bodyId);
        var count = 0;
        for (var i=0;i<bodyRows.length;i++) {
            if (bodyRows[i]['LINK_FLAG'] === '1') {
                count++;
            }
        }
        return count;
    }
,   findChildBodiesAndLinksByBodyId: function(_bodyId, _maxChildHierarchyCount, _childHierarchyCount, _list) {
        _childHierarchyCount++;
        if (!_list) {
            _list = new Array();
        }
        var children = this.findLinksAndBodiesByParentBodyId(_bodyId);
        toolBox.addToArray(_list, children);
        if (_childHierarchyCount < _maxChildHierarchyCount) {
            for (var i=0;i<children.length;i++) {
                if (_children['LINK_FLAG'] === '0') {
                    this.findChildBodiesAndLinksByBodyId(_children['BODY_ID'], _maxChildHierarchyCount, _childHierarchyCount, _list);
                }
            }
        }
        _childHierarchyCount--;
    }
,   findBodiesBySoulId: function(_soulId) {
        return this.db.tables['BODY'].findRowsByValue('SOUL_ID', _soulId);
    }
,   findParentBodyByBodyId: function(_bodyId) {
        var row = this.findBodyById(_bodyId);
        if (row !== null) {
            if (row['LINK_FLAG'] === '1') {
                return this.findBodyById(row['PARENT_BODY_ID']);
            }
            else {
                row = this.findBodyById(row['PARENT_BODY_ID']);
                if (row !== null) {
                    return this.findBodyById(row['PARENT_BODY_ID']);
                }
                else {
                    return null;
                }
            }
        }
        else {
            return null;
        }
    }
,   findSoulById: function(_id) {
        return this.db.tables['SOUL'].findRowByKey(_id);
/*
        if (this.db.tables['SOUL'].keyIndex[_id] >= 0) {
            return this.db.tables['SOUL'].rows[this.db.tables['SOUL'].keyIndex[_id]];
        }
        else {
            return null;
        }
*/
    }
,   getTextOfSoulById: function(_soulId) {
        var row = this.db.tables['SOUL'].findRowByKey(_soulId);
        if (row !== null) {
            return row['TEXT'];
        }
        else {
            return '';
        }
/*
        if (this.db.tables['SOUL'].keyIndex[_soulId] >= 0) {
            return this.db.tables['SOUL'].rows[this.db.tables['SOUL'].keyIndex[_soulId]]['TEXT'];
        }
        else {
            return '';
        }
*/
    }
,   getTextOfBodyById: function(_bodyId) {
        var row = this.findBodyById(_bodyId);
        if (row !== null) {
            return this.getTextOfSoulById(row['SOUL_ID']);
        }
        else {
            return '';
        }
    }
,   getNextForwardBodyIdInSameSoulBodies: function(_bodyId) {
        var bodyRow = this.findBodyById(_bodyId);
        var bodyRows = this.findBodiesBySoulId(bodyRow['SOUL_ID']);
        var retBodyId = '';
        if (bodyRows.length <= 1) {
            retBodyId = _bodyId;
        }
        else {
            for (var i=0;i<bodyRows.length;i++) {
                if (bodyRows[i]['BODY_ID'] === _bodyId) {
                    if (i === (bodyRows.length - 1)) {
                        retBodyId = bodyRows[0]['BODY_ID'];
                    }
                    else {
                        retBodyId = bodyRows[i+1]['BODY_ID'];
                    }
                    break;
                }
            }
        }
        return retBodyId;
    }
,   getNextBackwardBodyIdInSameSoulBodies: function(_bodyId) {
        var bodyRow = this.findBodyById(_bodyId);
        var bodyRows = this.findBodiesBySoulId(bodyRow['SOUL_ID']);
        var retBodyId = '';
        if (bodyRows.length <= 1) {
            retBodyId = _bodyId;
        }
        else {
            for (var i=0;i<bodyRows.length;i++) {
                if (bodyRows[i]['BODY_ID'] === _bodyId) {
                    if (i === 0) {
                        retBodyId = bodyRows[bodyRows.length - 1]['BODY_ID'];
                    }
                    else {
                        retBodyId = bodyRows[i-1]['BODY_ID'];
                    }
                    break;
                }
            }
        }
        return retBodyId;
    }
,   findSoulByBodyId: function(_bodyId) {
        var rowBody = this.findBodyById(_bodyId);
        if (rowBody !== null) {
            var rowSoul = this.findSoulById(rowBody['SOUL_ID']);
            return rowSoul;
        }
        return null;
    }
,   getNewSoulId: function() {
        return toolBox.createUniqueKey();
    }
,   addSoul: function(_soulId, _text, _bodyFormatId, _imageUrl, _hyperLinkUrl, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag) {
        var row = this.db.tables['SOUL'].newRow();
        row['SOUL_ID'] = _soulId;
        row['TEXT'] = _text;
        row['BODY_FORMAT_ID'] = _bodyFormatId;
        row['IMAGE_URL'] = _imageUrl;
        row['HYPER_LINK_URL'] = _hyperLinkUrl;
        row['HYPER_LINK_URL_MODE'] = _hyperLinkUrlMode;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = _hyperLinkJsonpDirectJumpFlag;
        this.db.tables['SOUL'].addRow(row);
        return row;
    }
,   updateSoul: function(_soulId, _text, _bodyFormatId, _imageUrl, _hyperLinkUrl, _hyperLinkUrlMode, _hyperLinkJsonpDirectJumpFlag) {
//        var row = this.db.tables['SOUL'].rows[this.db.tables['SOUL'].keyIndex[_soulId]];
        var row = this.db.tables['SOUL'].findRowByKey(_soulId);
        this.db.tables['SOUL'].editRow(row);
        row['SOUL_ID'] = _soulId;
        row['TEXT'] = _text;
        row['BODY_FORMAT_ID'] = _bodyFormatId;
        row['IMAGE_URL'] = _imageUrl;
        row['HYPER_LINK_URL'] = _hyperLinkUrl;
        row['HYPER_LINK_URL_MODE'] = _hyperLinkUrlMode;
        row['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG'] = _hyperLinkJsonpDirectJumpFlag;
        this.db.tables['SOUL'].updateRow(row);
    }
,   findSimilarSoulsByBodyId: function(_bodyId, _bodyIdListForException) {
        var retRows = new Array();
        var bodyRow = this.findBodyById(_bodyId);
        if (toolBox.trim(bodyRow['TEXT']) === '') {
            return retRows;
        }
        var soulRow = this.findSoulById(bodyRow['SOUL_ID']);
        var rows = toolBox.arrayWithout(this.findSimilarSoulsByText(soulRow['TEXT']), soulRow);
        var bodyRowForException = null;
        var soulRowForException
        var found = false;
        for (var i=0;i<rows.length;i++) {
            found = false;
            if (toolBox.isNullOrUndefined(_bodyIdListForException) === false) {
                for (var j=0;j<_bodyIdListForException.length;j++) {
                    bodyRowForException = this.findBodyById(_bodyIdListForException[j]);
                    if (rows[i]['SOUL_ID'] === bodyRowForException['SOUL_ID']) {
                        found = true;
                        break;
                    }
                }
            }
            if (found === false) {
                if (toolBox.trim(rows[i]['TEXT']) !== '') {
                    toolBox.addToArray(retRows, rows[i]);
                }
            }
        }
        //TODO:SORT
        return retRows;
    }
,   findSimilarSoulsByText: function(_text) {
        return this.db.tables['SOUL'].findRowsByValueLike2('TEXT', _text);
    }
,   findSoulsByText:  function(_text) {
        return this.db.tables['SOUL'].findRowsByValue('TEXT', _text);
    }
,   findBodyModelsForLinkView: function(_bodyId, _maxLinkSteps, _linkFilters) {
        var bodyModels = new Array();
        var bodyRow = this.findBodyById(_bodyId);
        var currentStep = 0;
        this.loadBodyNetworkModelRecursive(bodyModels, bodyRow, currentStep, _maxLinkSteps, _linkFilters);
        return bodyModels;
    }
,   loadBodyNetworkModelRecursive: function(_bodyModels, _bodyRow, _currentStep, _maxLinkSteps, _linkFilters) {
        _currentStep++;
        //最大ステップ数に達するか、Link絞込み条件対象のLinkでなければnullを返却して戻る
        if (_currentStep > _maxLinkSteps) {
            _currentStep--;
            return null;
        }
        if (_bodyRow['LINK_FLAG'] === '1') {
            if (this.isMatchingLinkFilterCondition(_bodyRow, _linkFilters) === false) {
                _currentStep--;
                return null;
            }
        }
        //Linkなのに既に同じBODY_IDでBodyModel作成済み、あるいはLinkでないのに既に同じSOUL_IDでBodyModel作成済みであれば作成済みBodyModeを返却して戻る
        for (var i=0;i<_bodyModels.length;i++) {
            if (_bodyRow['LINK_FLAG'] === '1') {
                if (_bodyModels[i].bodyId === _bodyRow['BODY_ID'] && _bodyModels[i].isLinkBody === true) {
                    _currentStep--;
                    return _bodyModels[i];
                }
            }
            else {
                if (_bodyModels[i].soulId === _bodyRow['SOUL_ID'] && _bodyModels[i].isLinkBody === false) {
                    _currentStep--;
                    return _bodyModels[i];
                }
            }
        }
        var bodyModel = new BodyNetworkModel(this.soulMaster, _bodyRow);
        toolBox.addToArray(_bodyModels, bodyModel);
        bodyModel.allBodyModels = _bodyModels;
        bodyModel.stepsFromCenter = _currentStep;

        var sameSoulBodies = new Array();
        if (_bodyRow['LINK_FLAG'] === '1') {
            //Linkの場合はSoul共有する他のBodyは見ない
            toolBox.addToArray(sameSoulBodies, _bodyRow);
        }
        else {
            //Bodyの場合はSoul共有する他のBodyも見に行く
            var tempSameSoulBodies = this.findBodiesBySoulId(_bodyRow['SOUL_ID'])
            var linkFound = false;
            for (var i=0;i<tempSameSoulBodies.length;i++) {
                if (tempSameSoulBodies[i]['LINK_FLAG'] === '1') {
                    linkFound = true;
                    break;
                }
            }
            if (linkFound === true) {
                //Linkの場合は、Link自体をBodyとして扱って意味を定義しているような場合のBodyは除く
                for (var i=0;i<tempSameSoulBodies.length;i++) {
                    if (tempSameSoulBodies[i]['LINK_FLAG'] === '0') {
                       toolBox.addToArray(sameSoulBodies, tempSameSoulBodies[i]);
                    }
                }
            }
            else {
                toolBox.addArrayToArray(sameSoulBodies, tempSameSoulBodies);
            }
        }
        var parentBodyRow = null;
        var childBodyRows = null;
        //親Bodyと子Bodyを全て再帰的に検索
        for (var i=0;i<sameSoulBodies.length;i++) {
            var parentBodyModel = null;
            if (sameSoulBodies[i]['PARENT_BODY_ID'] !== '') {
                parentBodyRow = this.findBodyById(sameSoulBodies[i]['PARENT_BODY_ID']);
                if (parentBodyRow !== null) {
                    parentBodyModel = this.loadBodyNetworkModelRecursive(_bodyModels, parentBodyRow, _currentStep, _maxLinkSteps, _linkFilters);
                    if (parentBodyModel !== null) {
                        toolBox.addToArrayIfNotExists(bodyModel.linkedFromBodyModels, parentBodyModel);
                        toolBox.addToArrayIfNotExists(parentBodyModel.linkedToBodyModels, bodyModel);
                    }
                }
            }
            childBodyRows = this.findBodiesByParentBodyId(sameSoulBodies[i]['BODY_ID']);
            var childBodyModel = null;
            for (var j=0;j<childBodyRows.length;j++) {
                childBodyModel = this.loadBodyNetworkModelRecursive(_bodyModels, childBodyRows[j], _currentStep, _maxLinkSteps, _linkFilters);
                if (childBodyModel !== null) {
                    toolBox.addToArrayIfNotExists(bodyModel.linkedToBodyModels, childBodyModel);
                    toolBox.addToArrayIfNotExists(childBodyModel.linkedFromBodyModels, bodyModel);
                }
                if (_bodyRow['LINK_FLAG'] === '1' && parentBodyModel !== null && childBodyModel !== null) {
                    toolBox.addToArrayIfNotExists(parentBodyModel.directLinkBodyModels, childBodyModel);
                    toolBox.addToArrayIfNotExists(childBodyModel.directLinkBodyModels, parentBodyModel);
                }
            }
        }
        _currentStep--;
        return bodyModel;
    }
,   isMatchingLinkFilterCondition: function(_bodyRow, _linkFilters) {
        var filterConditionMatched = false;
        var ret = true;
        var soulId = '';
        for (var i=0;i<_linkFilters.length;i++) {
            filterConditionMatched = false;
            if ((_linkFilters[i].conditionOperator === toolBox.CONDITION_OPERATOR_EQUAL && this.isTheSameSoul(_linkFilters[i].soulId, _bodyRow['SOUL_ID']) === true) ||
                (_linkFilters[i].conditionOperator === toolBox.CONDITION_OPERATOR_NOT_EQUAL && this.isTheSameSoul(_linkFilters[i].soulId, _bodyRow['SOUL_ID']) === false)
               ) {
                filterConditionMatched = true;
            }
            if (i === 0) {
                ret = filterConditionMatched;
            }
            else {
                if (_linkFilters[i].logicalOperator === toolBox.LOGICAL_OPERATOR_AND) {
                    ret = ret && filterConditionMatched;
                }
                else {
                    ret = ret || filterConditionMatched;
                }
            }
        }
        return ret;
    }
,   findBodyModelsForBirdView: function(_bodyId, _maxParentsHierarchy, _maxChildrenHierarchy, _birdViewLevel) {
        var bodyModels = new Array();
        var sameSoulBodies = new Array();
        if (_birdViewLevel >= toolBox.BIRDVIEW_LEVEL_NORMAL) {
            sameSoulBodies = this.findSameSoulBodiesByBodyId(_bodyId);
        }
        else {
            toolBox.addToArray(sameSoulBodies, this.findBodyById(_bodyId));
        }
        var bodyModel = null;
        var currentHierarchy = 0;
        for (var i=0;i<sameSoulBodies.length;i++) {
            bodyModel = new BodyHierarchyModel(this.soulMaster, sameSoulBodies[i]);
            bodyModel.isMainBody = true;
            bodyModel.soulShareCount = this.getCountOfBodiesBySoulId(sameSoulBodies[i]['SOUL_ID'])
            currentHierarchy = 0;
            this.loadChildrenOfBodyModelRecursive(bodyModel, sameSoulBodies[i]['BODY_ID'] ,currentHierarchy, _maxChildrenHierarchy, _birdViewLevel);
            currentHierarchy = 0;
            this.loadParentOfBodyModelRecursive(bodyModel, sameSoulBodies[i]['PARENT_BODY_ID'], currentHierarchy, _maxParentsHierarchy, _birdViewLevel);
            toolBox.addToArray(bodyModels, bodyModel);
        }
        return bodyModels;
    }
,   loadChildrenOfBodyModelRecursive: function(_bodyModel, _bodyId, _currentHierarchy, _maxHierarchy, _birdViewLevel) {
        _currentHierarchy++;
        if (_currentHierarchy > _maxHierarchy) {
            _currentHierarchy--;
            return;
        }
        var bodyRow = this.findBodyById(_bodyId);
        var childBodyRows = new Array();
        if (_birdViewLevel >= toolBox.BIRDVIEW_LEVEL_BOOST && bodyRow['LINK_FLAG'] !== '1') {
            var sameSoulBodies = this.findSameSoulBodiesByBodyId(_bodyId);
            var bodyRows = null;
            for (var i=0;i<sameSoulBodies.length;i++) {
                bodyRows = this.findBodiesByParentBodyId(sameSoulBodies[i]['BODY_ID']);
                for (var j=0;j<bodyRows.length;j++) {
                    toolBox.addToArrayIfNotExists(childBodyRows, bodyRows[j]);
                }
            }
        }
        else {
            childBodyRows = this.findBodiesByParentBodyId(_bodyId);
        }

        var childBodyModel = null;
        for (var i=0;i<childBodyRows.length;i++) {
            if (childBodyRows[i]['LINK_FLAG'] === '1' && this.getTextOfSoulById(childBodyRows[i]['SOUL_ID']) === '') {
                _currentHierarchy--;
                this.loadChildrenOfBodyModelRecursive(_bodyModel, childBodyRows[i]['BODY_ID'], _currentHierarchy, _maxHierarchy, _birdViewLevel);
                _currentHierarchy++;
            }
            else {
                childBodyModel = new BodyHierarchyModel(this.soulMaster, childBodyRows[i]);
                childBodyModel.parentBodyModel = _bodyModel;
                toolBox.addToArray(_bodyModel.childBodyModels, childBodyModel);
                if (this.isSoulExistsInTheSameParentLine(_bodyModel, childBodyRows[i]['SOUL_ID']) === false) {
                    this.loadChildrenOfBodyModelRecursive(childBodyModel, childBodyRows[i]['BODY_ID'], _currentHierarchy, _maxHierarchy, _birdViewLevel);
                }
            }
        }
        _currentHierarchy--;
    }
,   isSoulExistsInTheSameParentLine: function(_bodyModel, _soulId) {
        var ret = false;
        var currentBodyModel = _bodyModel;
        if (currentBodyModel !== null) {
            while (true) {
                if (currentBodyModel.bodyRow['SOUL_ID'] === _soulId && currentBodyModel.bodyRow['LINK_FLAG'] === '0') {
                    ret = true;
                    break;
                }
                if (currentBodyModel.isMainBody === true || currentBodyModel.parentBodyModel === null) {
                    break;
                }
                else {
                    currentBodyModel = currentBodyModel.parentBodyModel;
                }
            }
        }
        return ret;
    }
,   loadParentOfBodyModelRecursive: function(_bodyModel, _parentBodyId, _currentHierarchy, _maxHierarchy, _birdViewLevel) {
        _currentHierarchy++;
        if (_currentHierarchy > _maxHierarchy) {
            _currentHierarchy--;
            return;
        }
        if (_parentBodyId === '') {
            return;
        }
        var parentBodyRow = this.findBodyById(_parentBodyId);
        var parentBodyRows = new Array();
        if (_birdViewLevel >= toolBox.BIRDVIEW_LEVEL_BOOST && parentBodyRow['LINK_FLAG'] !== '1') {
            var sameSoulBodies = this.findSameSoulBodiesByBodyId(_parentBodyId);
            for (var i=0;i<sameSoulBodies.length;i++) {
                toolBox.addToArrayIfNotExists(parentBodyRows, sameSoulBodies[i]);
            }
        }
        else {
            toolBox.addToArray(parentBodyRows, this.findBodyById(_parentBodyId));
        }
        for (var i=0;i<parentBodyRows.length;i++) {
            if (parentBodyRows[i]['LINK_FLAG'] === '1' && this.getTextOfSoulById(parentBodyRows[i]['SOUL_ID']) === '') {
                _currentHierarchy--;
                this.loadParentOfBodyModelRecursive(_bodyModel, parentBodyRows[i]['PARENT_BODY_ID'], _currentHierarchy, _maxHierarchy, _birdViewLevel);
                _currentHierarchy++;
            }
            else {
                var parentBodyModel = new BodyHierarchyModel(this.soulMaster, parentBodyRows[i]);
                _bodyModel.parentBodyModel = parentBodyModel;
                toolBox.addToArray(parentBodyModel.childBodyModels, _bodyModel);
                toolBox.addToArray(_bodyModel.parentBodyModels, parentBodyModel);
                if (this.isSoulExistsInTheSameChildLine(_bodyModel, parentBodyRows[i]['SOUL_ID']) === false) {
                    this.loadParentOfBodyModelRecursive(parentBodyModel, parentBodyRows[i]['PARENT_BODY_ID'], _currentHierarchy, _maxHierarchy, _birdViewLevel);
                }
            }
         }
        _currentHierarchy--;
    }
,   isSoulExistsInTheSameChildLine: function(_bodyModel, _soulId) {
        var ret = false;
        var currentBodyModel = _bodyModel;
        if (currentBodyModel !== null) {
            while (true) {
                if (currentBodyModel.bodyRow['SOUL_ID'] === _soulId && currentBodyModel.bodyRow['LINK_FLAG'] === '0') {
                    ret = true;
                    break;
                }
                if (currentBodyModel.isMainBody === true || currentBodyModel.childBodyModels.length === 0) {
                    break;
                }
                else {
                    currentBodyModel = currentBodyModel.childBodyModels[0];
                }
            }
        }
        return ret;
    }
,   findSameSoulBodiesByBodyId: function(_bodyId) {
        var sameSoulBodies = new Array();
        var bodyRow = this.findBodyById(_bodyId);
        toolBox.addToArray(sameSoulBodies, bodyRow);
        var tempRows = toolBox.arrayWithout(this.findBodiesBySoulId(bodyRow['SOUL_ID']), bodyRow);
        for (var i=0;i<tempRows.length;i++) {
            toolBox.addToArray(sameSoulBodies, tempRows[i]);
        }
        //add bodies with souls which is not exactly the same soul but meaning the same
        var tempRows2 = this.findSoulLinksByBsoulId(bodyRow['SOUL_ID']);
        var tempRows3 = null;
        for (var i=0;i<tempRows2.length;i++) {
            if (tempRows2[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                if (this.isTheSameSoul(tempRows2[i]['A_SOUL_ID'], bodyRow['SOUL_ID']) === true) {
                    tempRows3 = this.findBodiesBySoulId(tempRows2[i]['A_SOUL_ID']);
                    for (var j=0;j<tempRows3.length;j++) {
                        toolBox.addToArray(sameSoulBodies, tempRows3[j]);
                    }
                }
            }
        }
        return sameSoulBodies;
    }
,   addLinkViewFilter: function(_viewId, _seqNo, _soulId, _logicalOperator, _conditionOperator) {
        var row = this.db.tables['LINK_VIEW_FILTERS'].newRow();
        row['VIEW_ID'] = _viewId;
        row['SEQ_NO'] = _seqNo;
        row['SOUL_ID'] = _soulId;
        row['LOGICAL_OPERATOR'] = _logicalOperator;
        row['CONDITION_OPERATOR'] = _conditionOperator;
        this.db.tables['LINK_VIEW_FILTERS'].addRow(row);
    }
,   deleteLinkViewFilters: function(_viewId) {
        var rows = this.db.tables['LINK_VIEW_FILTERS'].findRowsByValue('VIEW_ID', _viewId);
        for (var i=0;i<rows.length;i++) {
            this.db.tables['LINK_VIEW_FILTERS'].deleteRow(rows[i]);
        }
    }
,   findLinkViewFiltersByViewId: function(_viewId) {
        return this.db.tables['LINK_VIEW_FILTERS'].findRowsByValue('VIEW_ID', _viewId);
    }
,   addLinkViewLock: function(_viewId, _soulId, _bodyId, _centerX, _centerY) {
        var row = this.db.tables['LINK_VIEW_LOCKS'].newRow();
        row['VIEW_ID'] = _viewId;
        row['SOUL_ID'] = _soulId;
        row['BODY_ID'] = _bodyId;
        row['CENTER_X'] = _centerX;
        row['CENTER_Y'] = _centerY;
        this.db.tables['LINK_VIEW_LOCKS'].addRow(row);
    }
,   deleteLinkViewLocks: function(_viewId) {
        var rows = this.db.tables['LINK_VIEW_LOCKS'].findRowsByValue('VIEW_ID', _viewId);
        for (var i=0;i<rows.length;i++) {
            this.db.tables['LINK_VIEW_LOCKS'].deleteRow(rows[i]);
        }
    }
,   findLinkViewLocksByViewId: function(_viewId) {
        return this.db.tables['LINK_VIEW_LOCKS'].findRowsByValue('VIEW_ID', _viewId);
    }
,   rebuildAllSoulLink: function() {
        var deleteSoulLinks = new Array();
        for (var i=0;i<this.db.tables['SOUL_LINK'].rows.length;i++) {
            toolBox.addToArray(deleteSoulLinks, this.db.tables['SOUL_LINK'].rows[i]);
        }
        for (var i=0;i<deleteSoulLinks.length;i++) {
            this.db.tables['SOUL_LINK'].deleteRow(deleteSoulLinks[i]);
        }
        this.db.tables['SOUL_LINK'].rebuildKeyIndex();
        var childLinkBodyRows = this.findBodiesByParentBodyId(toolBox.BODY_ID_WORLD);
        for (var i=0;i<childLinkBodyRows.length;i++) {
            this.createSoulLink(childLinkBodyRows[i]);
        }
        for (var i=0;i<childLinkBodyRows.length;i++) {
            this.createSoulLink(childLinkBodyRows[i]);
        }
    }
/*
,   createSoulLink: function(_bodyRow) {
        var bodyIdCollection = this.createBodyIdCollectionUnderTargetBodyId(_bodyRow['BODY_ID']);
        var bodyRow = null;
        for (var key in bodyIdCollection) {
            bodyRow = this.findBodyById(key);
            if (bodyRow['LINK_FLAG'] === '0') {
                var grandParentBodyRow = null;
                var parentLinkBodyRow = null;
                var targetBodyRow = null;
                targetBodyRow = bodyRow;
                parentLinkBodyRow = this.findBodyById(targetBodyRow['PARENT_BODY_ID']);
                if (parentLinkBodyRow === null) {
                    return;
                }
                grandParentBodyRow = this.findBodyById(parentLinkBodyRow['PARENT_BODY_ID']);
                if (grandParentBodyRow === null) {
                    return;
                }
                if (grandParentBodyRow['LINK_FLAG'] === '1') {
                    //TODO:LINKの中にLINKがある場合の子LINK側にぶら下がるBODYの場合
                }

                if (this.isTheSameSoul(toolBox.SOUL_ID_SAME, parentLinkBodyRow['SOUL_ID']) === true) {
                    this.createSameSoulLink(grandParentBodyRow, targetBodyRow);
                }
                else if (this.isTheSameSoul(toolBox.SOUL_ID_INHERITED, parentLinkBodyRow['SOUL_ID']) === true) {
                    this.createInheritSoulLink(grandParentBodyRow, targetBodyRow);
                }
                else if (this.isTheSameSoul(toolBox.SOUL_ID_BELONG, parentLinkBodyRow['SOUL_ID']) === true) {
                    this.createBelongSoulLink(grandParentBodyRow, targetBodyRow);
                }
            }
        }
    }
,   createBodyIdCollectionUnderTargetBodyId: function(_targetBodyId) {
        var bodyIdCollection = {};
        var bodyPath = new Array();
        toolBox.addToArray(bodyPath, _targetBodyId);
        bodyIdCollection[_targetBodyId] = _targetBodyId;
        var bodyRows = null;
        var currentBodyId = _targetBodyId;
        var found = false;
        while (true) {
            bodyRows = this.findBodiesByParentBodyId(currentBodyId);
            found = false;
            if (bodyRows.length > 0) {
                for (var i=0;i<bodyRows.length;i++) {
                    if (bodyIdCollection[bodyRows[i]['BODY_ID']]) {
                        continue;
                    }
                    else {
                        toolBox.addToArray(bodyPath, bodyRows[i]['BODY_ID']);
                        bodyIdCollection[bodyRows[i]['BODY_ID']] = bodyRows[i]['BODY_ID'];
                        currentBodyId = bodyRows[i]['BODY_ID'];
                        found = true;
                        break;
                    }
                }
            }
            if (found === false) {
                if (bodyPath.length > 1) {
                    currentBodyId = bodyPath[bodyPath.length - 2];
                    bodyPath.length = bodyPath.length - 1;
                }
                else {
                    break;
                }
            }
        }
        return bodyIdCollection;
    }
*/
,   createSoulLink: function(_bodyRow) {
        if (_bodyRow['LINK_FLAG'] === '0') {
            var grandParentBodyRow = null;
            var parentLinkBodyRow = null;
            var targetBodyRow = null;
            targetBodyRow = _bodyRow;
            parentLinkBodyRow = this.findBodyById(targetBodyRow['PARENT_BODY_ID']);
            if (parentLinkBodyRow === null) {
                return;
            }
            grandParentBodyRow = this.findBodyById(parentLinkBodyRow['PARENT_BODY_ID']);
            if (grandParentBodyRow === null) {
                return;
            }
            if (grandParentBodyRow['LINK_FLAG'] === '1') {
                //TODO:LINKの中にLINKがある場合の子LINK側にぶら下がるBODYの場合
            }

            if (this.isTheSameSoul(toolBox.SOUL_ID_SAME, parentLinkBodyRow['SOUL_ID']) === true || this.isTheSameSoul(toolBox.SOUL_ID_SAME_ENG, parentLinkBodyRow['SOUL_ID']) === true) {
                this.createSameSoulLink(grandParentBodyRow, targetBodyRow);
            }
            else if (this.isTheSameSoul(toolBox.SOUL_ID_INHERITED, parentLinkBodyRow['SOUL_ID']) === true || this.isTheSameSoul(toolBox.SOUL_ID_INHERITED_ENG, parentLinkBodyRow['SOUL_ID']) === true) {
                this.createInheritSoulLink(grandParentBodyRow, targetBodyRow);
            }
            else if (this.isTheSameSoul(toolBox.SOUL_ID_BELONG, parentLinkBodyRow['SOUL_ID']) === true || this.isTheSameSoul(toolBox.SOUL_ID_BELONG_ENG, parentLinkBodyRow['SOUL_ID']) === true) {
                this.createBelongSoulLink(grandParentBodyRow, targetBodyRow);
            }
        }
        var childBodyRows = this.findBodiesByParentBodyId(_bodyRow['BODY_ID']);
        for (var i=0;i<childBodyRows.length;i++) {
            this.createSoulLink(childBodyRows[i]);
        }
    }
,   isTheSameSoul: function(_targetSoulId, _soulId) {
        if (_soulId === _targetSoulId) {
            return true;
        }
        else {
            var soulLinkRows = this.findSoulLinksByAsoulId(_soulId);
            for (var i=0;i<soulLinkRows.length;i++) {
                if (soulLinkRows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL && soulLinkRows[i]['B_SOUL_ID'] === _targetSoulId) {
                    return true;
                }
            }
            return false;
        }
    }
,   createSameSoulLink: function(_sourceRow, _destinationRow) {
        var sourceRows = new Array();
        toolBox.addToArrayIfNotExists(sourceRows, _sourceRow['SOUL_ID']);
        var rows = this.findSoulLinksByAsoulId(_sourceRow['SOUL_ID']);
        var tempRow = null;
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                tempRow = this.findSoulLinkByKey(rows[i]['B_SOUL_ID'], toolBox.SOUL_RELATION_EQUAL, _sourceRow['SOUL_ID']);
                if (tempRow !== null) {
                    toolBox.addToArrayIfNotExists(sourceRows, rows[i]['B_SOUL_ID']);
                }
            }
        }
        var destinationRows = new Array();
        toolBox.addToArrayIfNotExists(destinationRows, _destinationRow['SOUL_ID']);
        rows = this.findSoulLinksByAsoulId(_destinationRow['SOUL_ID']);
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                tempRow = this.findSoulLinkByKey(rows[i]['B_SOUL_ID'], toolBox.SOUL_RELATION_EQUAL, _destinationRow['SOUL_ID']);
                if (tempRow !== null) {
                    toolBox.addToArrayIfNotExists(destinationRows, rows[i]['B_SOUL_ID']);
                }
            }
        }
        for (var i=0;i<sourceRows.length;i++) {
            for (var j=0;j<destinationRows.length;j++) {
                this.addSoulLinkIfNotExists(destinationRows[j], toolBox.SOUL_RELATION_EQUAL, sourceRows[i]);
                this.addSoulLinkIfNotExists(sourceRows[i], toolBox.SOUL_RELATION_EQUAL, destinationRows[j]);
            }
        }

//        this.db.tables['SOUL_LINK'].rebuildKeyIndex();
    }
,   createInheritSoulLink: function(_sourceRow, _destinationRow) {
        var sourceRows = new Array();
        toolBox.addToArrayIfNotExists(sourceRows, _sourceRow['SOUL_ID']);
        var rows = this.findSoulLinksByAsoulId(_sourceRow['SOUL_ID']);
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                toolBox.addToArrayIfNotExists(sourceRows, rows[i]['B_SOUL_ID']);
            }
        }
        var destinationRows = new Array();
        toolBox.addToArrayIfNotExists(destinationRows, _destinationRow['SOUL_ID']);
        rows = this.findSoulLinksByBsoulId(_destinationRow['SOUL_ID']);
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                toolBox.addToArrayIfNotExists(destinationRows, rows[i]['A_SOUL_ID']);
            }
        }
        for (var i=0;i<sourceRows.length;i++) {
            for (var j=0;j<destinationRows.length;j++) {
                this.addSoulLinkIfNotExists(destinationRows[j], toolBox.SOUL_RELATION_EQUAL, sourceRows[i]);
            }
        }
//        this.db.tables['SOUL_LINK'].rebuildKeyIndex();
    }
,   createBelongSoulLink: function(_sourceRow, _destinationRow) {
        var destinationRows = new Array();
        toolBox.addToArrayIfNotExists(destinationRows, _destinationRow['SOUL_ID']);
        var rows = this.findSoulLinksByAsoulId(_destinationRow['SOUL_ID']);
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                toolBox.addToArrayIfNotExists(destinationRows, rows[i]['B_SOUL_ID']);
            }
        }
        var sourceRows = new Array();
        toolBox.addToArrayIfNotExists(sourceRows, _sourceRow['SOUL_ID']);
        rows = this.findSoulLinksByBsoulId(_sourceRow['SOUL_ID']);
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['RELATION'] === toolBox.SOUL_RELATION_EQUAL) {
                toolBox.addToArrayIfNotExists(sourceRows, rows[i]['A_SOUL_ID']);
            }
        }
        for (var i=0;i<destinationRows.length;i++) {
            for (var j=0;j<sourceRows.length;j++) {
                this.addSoulLinkIfNotExists(sourceRows[j], toolBox.SOUL_RELATION_EQUAL, destinationRows[i]);
            }
        }
//        this.db.tables['SOUL_LINK'].rebuildKeyIndex();
    }
,   addSoulLinkIfNotExists: function(_AsoulId, _relation, _BsoulId) {
        if (_AsoulId === _BsoulId) {
            return;
        }
        var row = this.findSoulLinkByKey(_AsoulId, _relation, _BsoulId);
        if (row === null) {
            this.addSoulLink(_AsoulId, _relation, _BsoulId);
        }
    }
,   findSoulLinksByAsoulId: function(_soulId) {
        return this.db.tables['SOUL_LINK'].findRowsByValue('A_SOUL_ID', _soulId);
    }
,   findSoulLinksByBsoulId: function(_soulId) {
        return this.db.tables['SOUL_LINK'].findRowsByValue('B_SOUL_ID', _soulId);
    }
,   findSoulLinkByKey: function(_AsoulId, _relation, _BsoulId) {
        return this.db.tables['SOUL_LINK'].findRowByKey(_AsoulId + ',' + _relation + ',' + _BsoulId);
    }
,   addSoulLink: function(_AsoulId, _relation, _BsoulId) {
        var row = this.db.tables['SOUL_LINK'].newRow();
        row['A_SOUL_ID'] = _AsoulId;
        row['RELATION'] = _relation;
        row['B_SOUL_ID'] = _BsoulId;
        this.db.tables['SOUL_LINK'].addRow(row);
    }
,   isBodyADecsendantOfBodyB: function(_bodyAId, _bodyBId) {
        var rows = this.findBodiesByParentBodyId(_bodyBId);
        var found = false;
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['BODY_ID'] === _bodyAId) {
                found = true;
                break;
            }
        }
        if (found === false) {
            for (var i=0;i<rows.length;i++) {
                found = this.isBodyADecsendantOfBodyB(_bodyAId, rows[i]['BODY_ID']);
                if (found === true) {
                    break;
                }
            }
            return found;
        }
        else {
            return true;
        }
    }
,   undo: function() {
        this.db.rollBackLastTransaction();
this.soulMaster.dataAccessAction.showRedoLog('undo');
    }
,   redo: function() {
        this.db.redoLastRollbackedTransaction();
this.soulMaster.dataAccessAction.showRedoLog('redo');
    }
,   loadDataFromSerializedText: function(_text) {
        this.db.loadDataFromSerializedText(_text);
    }
,   saveDataToSerializedText: function() {
        return this.db.saveDataToSerializedText();
    }
,   importDataFromSerializedTextAsBody: function(_text) {
        var tempDb = new TempDataBase();
        tempDb.loadDataFromSerializedText(_text);
        var soulIdMap = {};
        var bodyIdMap = {};
        var bodyFormatIdMap = {};
        var dummyWorldSoulIdOfLink = this.getNewSoulId();
        var dummyWorldSoulIdOfBody = this.getNewSoulId();
        var dummyWorldBodyId = this.getNewBodyId();
        var dummyWorldBodyIdOfLink = this.getNewBodyId();
        var dummyBodyFormatIdBodyStandard = this.getNewBodyFormatId();
        var dummyBodyFormatIdLinkStandard = this.getNewBodyFormatId();
        this.createNewOldIdMapFromTempDb(tempDb, soulIdMap, bodyIdMap, bodyFormatIdMap, dummyWorldSoulIdOfBody, dummyWorldBodyId, dummyBodyFormatIdBodyStandard, dummyBodyFormatIdLinkStandard);

        this.db.beginTransaction();
        var bodyRowOfWorld = this.createNewDummyWorldBodyOnTheTopOfTheWorld(tempDb.tables['APP_CONFIG'].rows[0]['BACK_GROUND_TEXT'] + '\n[WORLD]', dummyWorldSoulIdOfLink, dummyWorldSoulIdOfBody , dummyWorldBodyIdOfLink, dummyWorldBodyId);
        //WorldのBody配下に、NewOldMapを元にしてMAPを変換しながら作成
        this.importMapDataToDummyWorld(tempDb, soulIdMap, bodyIdMap, bodyFormatIdMap);
        this.db.commit();
    }
,   importMapDataToDummyWorld: function(_tempDb, _soulIdMap, _bodyIdMap, _bodyFormatIdMap) {
        var rows = _tempDb.tables['SOUL'].rows;
        for (var i=0;i<rows.length;i++) {
            if (this.isSpecialSoulId(rows[i]['SOUL_ID']) === false) {
                this.addSoul(
                    _soulIdMap[rows[i]['SOUL_ID']]
                ,   rows[i]['TEXT']
                ,   _bodyFormatIdMap[rows[i]['BODY_FORMAT_ID']]
                ,   rows[i]['IMAGE_URL']
                ,   rows[i]['HYPER_LINK_URL']
                ,   rows[i]['HYPER_LINK_URL_MODE']
                ,   rows[i]['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']
                );
            }
        }
        this.db.tables['SOUL'].rebuildKeyIndex();

        rows = _tempDb.tables['BODY'].rows;
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['BODY_ID'] !== toolBox.BODY_ID_WORLD) {
                this.addBody(
                    _bodyIdMap[rows[i]['BODY_ID']]
                ,   _soulIdMap[rows[i]['SOUL_ID']]
                ,   rows[i]['LINK_FLAG']
                ,   _bodyIdMap[rows[i]['PARENT_BODY_ID']]
                ,   rows[i]['X']
                ,   rows[i]['Y']
                ,   rows[i]['W']
                ,   rows[i]['H']
                ,   rows[i]['R']
                ,   _bodyIdMap[rows[i]['ZORDER_NEXT_LOWER_BODY_ID']]
                ,   _bodyIdMap[rows[i]['ZORDER_NEXT_HIGHER_BODY_ID']]
                );
            }
        }
        this.db.tables['BODY'].rebuildKeyIndex();

        rows = _tempDb.tables['BODY_FORMAT'].rows;
        for (var i=0;i<rows.length;i++) {
            this.addBodyFormat(
                _bodyFormatIdMap[rows[i]['BODY_FORMAT_ID']]
            ,   rows[i]['SHAPE_TYPE']
            ,   rows[i]['STROKE_STYLE']
            ,   rows[i]['STROKE_LINE_WIDTH']
            ,   rows[i]['SELECTED_STROKE_LINE_WIDTH']
            ,   rows[i]['SELECTED_STROKE_STYLE']
            ,   rows[i]['DRAW_SHADOW_FLAG']
            ,   rows[i]['SHADOW_STROKE_LINE_WIDTH']
            ,   rows[i]['SHADOW_STROKE_STYLE']
            ,   rows[i]['FILL_STYLE']
            ,   rows[i]['TEXT_DESCRIPTION']
            ,   rows[i]['TEXT_SIZE']
            ,   rows[i]['TEXT_FONT']
            ,   rows[i]['TEXT_BASELINE']
            ,   rows[i]['TEXT_ALIGN']
            ,   rows[i]['TEXT_VERTICAL_ALIGN']
            ,   rows[i]['TEXT_FILL_STYLE']
            );
        }
        this.db.tables['BODY_FORMAT'].rebuildKeyIndex();

        rows = _tempDb.tables['SOUL_LINK'].rows;
        for (var i=0;i<rows.length;i++) {
            this.addBodyFormat(
                _soulIdMap[rows[i]['A_SOUL_ID']]
            ,   rows[i]['RELATION']
            ,   _soulIdMap[rows[i]['B_SOUL_ID']]
            );
        }
        this.db.tables['SOUL_LINK'].rebuildKeyIndex();

        //rebuild soullink
        this.rebuildAllSoulLink();
    }
,   createNewDummyWorldBodyOnTheTopOfTheWorld: function(_soulText, _soulIdOfLink, _soulIdOfBody, _bodyIdOfLink, _bodyId) {
        //WORLDのLink用Soul作成
        var soulRowLink = this.addSoul(
            _soulIdOfLink
        ,   ''
        ,   toolBox.BODY_FORMAT_ID_LINK_STANDARD
        ,   ''
        ,   ''
        ,   toolBox.HYPER_LINK_URL_MODE_NORMAL
        ,   '0'
        );
        //WORLDのBody用Soul作成
        var worldSoulText = this.findAvailableTextForNewSoul(_soulText);
        var soulRowWorld = this.addSoul(
            _soulIdOfBody
        ,   worldSoulText
        ,   toolBox.BODY_FORMAT_ID_BODY_STANDARD
        ,   ''
        ,   ''
        ,   toolBox.HYPER_LINK_URL_MODE_NORMAL
        ,   '0'
        );
        //現在のWORLDのzOrderがトップのBodyを取得し、zOrderを更新する
        var topBodyRow = this.getTopBodyInTheSpecifiedParentBody(toolBox.BODY_ID_WORLD);
        var topBodyId = '';
        if (topBodyRow !== null) {
            topBodyId = topBodyRow['BODY_ID'];
            this.updateBody(
                topBodyRow['BODY_ID']
            ,   topBodyRow['SOUL_ID']
            ,   topBodyRow['LINK_FLAG']
            ,   topBodyRow['PARENT_BODY_ID']
            ,   topBodyRow['X']
            ,   topBodyRow['Y']
            ,   topBodyRow['W']
            ,   topBodyRow['H']
            ,   topBodyRow['R']
            ,   topBodyRow['ZORDER_NEXT_LOWER_BODY_ID']
            ,   _bodyIdOfLink
            );
        }
        //WORLDのLink用Body作成
        this.addBody(
            _bodyIdOfLink
        ,   _soulIdOfLink
        ,   '1'
        ,   toolBox.BODY_ID_WORLD
        ,   0
        ,   0
        ,   toolBox.DEFAULT_LINK_WIDTH
        ,   toolBox.DEFAULT_LINK_HEIGHT
        ,   toolBox.RRECT_RADIUS_SIZE
        ,   topBodyId
        ,   _bodyId
        );
        //WORLDのBody作成
        var standardBodyFormatRow = this.findBodyFormatByBodyFormatId(toolBox.BODY_FORMAT_ID_BODY_STANDARD);
        var entityFormat = new EntityFormat();
        entityFormat.loadFromBodyFormatRowData(standardBodyFormatRow);
        var rect = this.soulMaster.mainAction.calcTextWidthAndHeight(entityFormat, worldSoulText);
        rect.w *= 1.1;
        rect.h *= 1.1;
        if (rect.w < toolBox.DEFAULT_BODY_WIDTH) {
            rect.w = toolBox.DEFAULT_BODY_WIDTH;
        }
        if (rect.h < toolBox.DEFAULT_BODY_HEIGHT) {
            rect.h = toolBox.DEFAULT_BODY_HEIGHT;
        }
        var newBodyRow = this.addBody(
            _bodyId
        ,   _soulIdOfBody
        ,   '0'
        ,   _bodyIdOfLink
        ,   0
        ,   toolBox.DEFAULT_LINK_HEIGHT + 1
        ,   rect.w
        ,   rect.h
        ,   toolBox.RRECT_RADIUS_SIZE
        ,   _bodyIdOfLink
        ,   ''
        );
        return newBodyRow;
    }
,   findAvailableTextForNewSoul: function(_baseText) {
        var i = 1;
        var retText = '';
        var rows = null;
        while (true) {
            if (i === 1) {
                retText = _baseText;
            }
            else {
                retText = _text + toolBox.trim(i);
            }
            rows = this.findSoulsByText(_baseText);
            if (rows.length === 0) {
                break;
            }
            i++;
        }
        return retText;
    }
,   getTopBodyInTheSpecifiedParentBody: function(_parentBodyId) {
        var topBodyRow = null;
        var childrenBodyRows = this.findLinksAndBodiesByParentBodyId(_parentBodyId);
        if (childrenBodyRows.length > 0) {
            var topBodyRow = null;
            for (var i=0;i<childrenBodyRows.length;i++) {
                if (childrenBodyRows[i]['ZORDER_NEXT_HIGHER_BODY_ID'] === '') {
                    topBodyRow = childrenBodyRows[i];
                    break;
                }
            }
        }
        return topBodyRow;
    }
,   createNewOldIdMapFromTempDb: function(_tempDb, _soulIdMap, _bodyIdMap, _bodyFormatIdMap, _dummyWorldSoulId, _dummyWorldBodyId, _dummyBodyFormatIdBodyStandard, _dummyBodyFormatIdLinkStandard) {
        var rows = _tempDb.tables['SOUL'].rows;
        for (var i=0;i<rows.length;i++) {
            if (this.isSpecialSoulId(rows[i]['SOUL_ID']) === true) {
                if (rows[i]['SOUL_ID'] === toolBox.SOUL_ID_WORLD) {
                    _soulIdMap[rows[i]['SOUL_ID']] = _dummyWorldSoulId;
                }
                else {
                    _soulIdMap[rows[i]['SOUL_ID']] = rows[i]['SOUL_ID'];
                }
            }
            else {
                _soulIdMap[rows[i]['SOUL_ID']] = this.getNewSoulId();
            }
        }
        rows = _tempDb.tables['BODY'].rows;
        for (var i=0;i<rows.length;i++) {
            if (rows[i]['BODY_ID'] === toolBox.BODY_ID_WORLD) {
                _bodyIdMap[rows[i]['BODY_ID']] = _dummyWorldBodyId;
            }
            else {
                _bodyIdMap[rows[i]['BODY_ID']] = this.getNewBodyId();
            }
        }
        _bodyIdMap[''] = ''; //ZORDER_NEXT_LOWER_BODY_IDやZORDER_NEXT_HIGHER_BODY_IDなど空文字用のMAP要素も追加

        rows = _tempDb.tables['BODY_FORMAT'].rows;
        for (var i=0;i<rows.length;i++) {
             if (rows[i]['BODY_FORMAT_ID'] === toolBox.BODY_FORMAT_ID_BODY_STANDARD) {
                _bodyFormatIdMap[rows[i]['BODY_FORMAT_ID']] = _dummyBodyFormatIdBodyStandard;
             }
             else if (rows[i]['BODY_FORMAT_ID'] === toolBox.BODY_FORMAT_ID_LINK_STANDARD) {
                _bodyFormatIdMap[rows[i]['BODY_FORMAT_ID']] = _dummyBodyFormatIdLinkStandard;
             }
             else {
                _bodyFormatIdMap[rows[i]['BODY_FORMAT_ID']] = this.getNewBodyFormatId();
             }
        }
    }



/* 参考
,   copyChildrensBodyRecursive: function(_copyFromBodyId, _copyToBodyId) {
        var mapObject = new BaseObject();
        mapObject.bodyIdNewOldMapping = {};
        var depth = 0;
        this.createBodyIdNewOldMappingRecursive(_copyFromBodyId, mapObject, depth);
        depth = 0;
        this.innerCopyChildrensBodyRecursive(_copyFromBodyId, _copyToBodyId, mapObject, depth);
    }
,   createBodyIdNewOldMappingRecursive: function(_bodyId, _mapObject, _depth) {
        var bodyRows = this.findBodiesByParentBodyId(_bodyId);
        var bodyRow = null;
        _depth++;
        for (var i=0;i<bodyRows.length;i++) {
            if (_depth === 1) {
                bodyRow = this.findBodyById(bodyRows[i]['BODY_ID']);
                if (bodyRow['LINK_FLAG'] === '0') {
                    continue;
                }
            }
            newBodyId = this.getNewBodyId();
            _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']] = newBodyId;
            this.createBodyIdNewOldMappingRecursive(bodyRows[i]['BODY_ID'], _mapObject, _depth);
        }
        _depth--;
    }
,   innerCopyChildrensBodyRecursive: function(_copyFromBodyId, _copyToBodyId, _mapObject, _depth) {
        var bodyRows = this.findBodiesByParentBodyId(_copyFromBodyId);
        var bodyRow = null;
        var nextLowerBodyId = '';
        var nextHigherBodyId = '';
        _depth++;
        for (var i=0;i<bodyRows.length;i++) {
            if (_depth === 1) {
                bodyRow = this.findBodyById(bodyRows[i]['BODY_ID']);
                if (bodyRow['LINK_FLAG'] === '0') {
                    continue;
                }
            }
            if (bodyRows[i]['ZORDER_NEXT_LOWER_BODY_ID'] === '') {
                nextLowerBodyId = '';
            }
            else {
                nextLowerBodyId = _mapObject.bodyIdNewOldMapping[bodyRows[i]['ZORDER_NEXT_LOWER_BODY_ID']]
            }
            if (bodyRows[i]['ZORDER_NEXT_HIGHER_BODY_ID'] === '') {
                nextHigherBodyId = '';
            }
            else {
                nextHigherBodyId = _mapObject.bodyIdNewOldMapping[bodyRows[i]['ZORDER_NEXT_HIGHER_BODY_ID']]
            }
            var soulRow = this.findSoulById(bodyRows[i]['SOUL_ID']);
            if (soulRow['TEXT'] === '') {
                var bodyFormatRow = this.findBodyFormatByBodyFormatId(soulRow['BODY_FORMAT_ID']);
                var bodyFormat = new EntityFormat();
                bodyFormat.loadFromBodyFormatRowData(bodyFormatRow);
                bodyFormatRow = this.addBodyFormat(
                    this.getNewBodyFormatId()
                ,   bodyFormat.shapeType
                ,   bodyFormat.strokeStyle
                ,   bodyFormat.strokeLineWidth
                ,   bodyFormat.selectedStrokeLineWidth
                ,   bodyFormat.selectedStrokeStyle
                ,   bodyFormat.drawShadow
                ,   bodyFormat.shadowStrokeLineWidth
                ,   bodyFormat.shadowStrokeStyle
                ,   bodyFormat.fillStyle
                ,   bodyFormat.textDescription
                ,   bodyFormat.textSize
                ,   bodyFormat.textFont
                ,   bodyFormat.textBaseline
                ,   bodyFormat.textAlign
                ,   bodyFormat.textVerticalAlign
                ,   bodyFormat.textFillStyle
                );
                soulRow = this.addSoul(
                    this.getNewSoulId()
                ,   ''
                ,   bodyFormatRow['BODY_FORMAT_ID']
                ,   soulRow['IMAGE_URL']
                ,   soulRow['HYPER_LINK_URL']
                ,   soulRow['HYPER_LINK_URL_MODE']
                ,   soulRow['HYPER_LINK_JSONP_DIRECT_JUMP_FLAG']
                );
            }
            this.addBody(
                _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']],
                soulRow['SOUL_ID'],
                bodyRows[i]['LINK_FLAG'],
                _copyToBodyId,
                bodyRows[i]['X'],
                bodyRows[i]['Y'],
                bodyRows[i]['W'],
                bodyRows[i]['H'],
                bodyRows[i]['R'],
                nextLowerBodyId,
                nextHigherBodyId
            );
            this.innerCopyChildrensBodyRecursive(bodyRows[i]['BODY_ID'], _mapObject.bodyIdNewOldMapping[bodyRows[i]['BODY_ID']], _mapObject, _depth);
        }
        _depth--;
    }
*/




,   showRedoLog: function(_msg) {
/*
        logger.put('-------------' + _msg + ' redoLog------------', toolBox.LOG_LEVEL_TEST);
        var logs = this.db.redoLog.logs;
        var trantype = '';
        for (var i=0;i<logs.length;i++) {
            if (logs[i]['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_INSERT) {
                trantype = 'INS';
            }
            else if (logs[i]['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_UPDATE) {
                trantype = 'UPD';
            }
            else if (logs[i]['TRANSACTION_TYPE'] === toolBox.TRANSACTION_TYPE_DELETE) {
                trantype = 'DEL';
            }
            else {
                trantype = '???';
            }
        	logger.put(i + ' TRANID:' + logs[i]['TRANSACTION_ID'] + ' TABLE:' + logs[i]['TABLE_NAME'] + ' TYPE: ' + trantype + ' RBFLG:' + logs[i]['ROLLBACK_FLAG'] + '>>>', toolBox.LOG_LEVEL_TEST);
        	logger.put('    ' + this.db.tables[logs[i]['TABLE_NAME']].saveRowDataToSerializedText(logs[i]['BEFORE_LOG']), toolBox.LOG_LEVEL_TEST);
        	logger.put('    ' + this.db.tables[logs[i]['TABLE_NAME']].saveRowDataToSerializedText(logs[i]['AFTER_LOG']), toolBox.LOG_LEVEL_TEST);
        }
    	logger.put('■BODY■' + this.db.tables['BODY'].saveDataToSerializedText(), toolBox.LOG_LEVEL_TEST);
*/
    }
,   showBodyLog: function(_msg) {
/*
        logger.put('-------------' + _msg + ' BODY------------', toolBox.LOG_LEVEL_TEST);
        var rows = this.db.tables['BODY'].rows;
        for (var i=0;i<rows.length;i++) {
        	logger.put('p:' + rows[i]['PARENT_BODY_ID'] + ' FLG:' + rows[i]['LINK_FLAG'] + ' b:' + rows[i]['BODY_ID'] + ' L:' + rows[i]['ZORDER_NEXT_LOWER_BODY_ID'] + ' H:' + rows[i]['ZORDER_NEXT_HIGHER_BODY_ID'], toolBox.LOG_LEVEL_TEST);
        }
*/
    }
});

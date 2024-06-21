var BackGroundShape = function(){this.initialize.apply(this, arguments);}
BackGroundShape.prototype = toolBox.extend(new ContainerShape(), {
    soulMaster          : null
,   isBackGroundShape   : true
,   selectedShapes      : null
,   layers              : null
,   hiddenLayer         : null
,   bottomLayer         : null
,   middleLayer         : null
,   topLayer            : null
,   selectedShapeLayer  : null
,   initialize: function(_ioJobController, _hiddenLayer, _bottomLayer, _middleLayer, _topLayer, _tempLayer, _defaultLayer, _x, _y, _w, _h) {
        if (!_ioJobController) {
            return;
        }
        ContainerShape.prototype.initialize.apply(this,[null, null, _tempLayer, _defaultLayer, _x, _y, _w, _h]);
        this.hiddenLayer = _hiddenLayer;
        this.bottomLayer = _bottomLayer;
        this.middleLayer = _middleLayer;
        this.topLayer = _topLayer;
        this.selectedShapeLayer = this.topLayer;
        this.layers = new Array();
        this.layers[0] = this.hiddenLayer;
        this.layers[1] = this.bottomLayer;
        this.layers[2] = this.middleLayer;
        this.layers[3] = this.topLayer;
        this.layers[4] = this.selectedShapeLayer;
        this.classType = 'BackGroundShape';
        this.backGroundShape = this;
        this.ioJobController = _ioJobController;
        this.selectedShapes = new Array();
    }
,   addSelectedShape: function(_shape) {
        if (_shape !== this) {
            //BackGroundShapeと子Shapeの同時選択はさせない
            if (this.isSelected() === true) {
                this.selectedShapes = toolBox.arrayWithout(this.selectedShapes, this);
            }
        }
        toolBox.addToArrayIfNotExists(this.selectedShapes,_shape);
        if (_shape.isEntity) {
            $('searchtext').value = _shape.text;
            $('q').value = _shape.text;
        }
    }
,   removeSelectedShape: function(_shape) {
        for (var i=0;i<_shape.childShapes.length;i++) {
            this.removeSelectedShape(_shape.childShapes[i]);
        }
        this.selectedShapes = toolBox.arrayWithout(this.selectedShapes, _shape);
    }
,   adjustForMultiSelection: function() {
        if (this.selectedShapes.length > 1 && this.isSelected() === false) {
            var minChildLevel = 9999999999;
            //①選択Shape中の階層レベルが最も小さいレベルを取得
            for (var i=0;i<this.selectedShapes.length;i++) {
                var childLevel = this.selectedShapes[i].getGenerationLevelFromBackGroundShape();
                if (childLevel < minChildLevel) {
                    minChildLevel = childLevel;
                }
            }
            //②全選択Shapeの階層レベルから最小階層レベルに遡った場合のShapeを取得
            //Ex.A・B・CのShapeが選択されていて、かつ最小階層レベルが3ならば以下のように処理
            //   Aの階層レベル=5ならAの親Shapeの親Shape(階層レベル3）を取得
            //   Bの階層レベル=3ならそのままBを取得
            //   Cの階層レベル4ならCの親Shape(階層レベル3)を取得
            var newSelectedShapes = new Array();
            for (var i=0;i<this.selectedShapes.length;i++) {
                toolBox.addToArrayIfNotExists(newSelectedShapes, this.selectedShapes[i].getMyFamilyLineByGenerationLevel(minChildLevel));
            }
            //③最後に、取得したShapeの共通の親が見つかるまで一階層ずつ親レベルに遡りを行う。
            //  共通の親が見つかった時点で終了。共通の親を持つレベルのShapeを最終的な選択中Shapeとする。
            for (var i=1;i<minChildLevel;i++) {
                var allShapesHaveTheSameParent = true;
                for (var j=1;j<newSelectedShapes.length;j++) {
                    if (newSelectedShapes[j].parentShape !== newSelectedShapes[0].parentShape) {
                        allShapesHaveTheSameParent = false;
                        break
                    }
                }
                if (allShapesHaveTheSameParent === true) {
                    break;
                }
                else {
                    for (var j=0;j<newSelectedShapes.length;j++) {
                        newSelectedShapes[j] = newSelectedShapes[j].parentShape;
                    }
                }
            }
            this.selectedShapes = newSelectedShapes;
        }
    }
,   getTopView: function() {
        if (this.childShapes.length > 0) {
            return this.childShapes[0].zOrder.getTopShape();
        }
        else {
            return null;
        }
    }
,   clearSelectedShapes: function() {
        this.registerSelectedShapesToDrawBuffer();
        this.selectedShapes.length = 0;
    }
,   isSelectedShape: function(_shape) {
        return toolBox.arrayContains(this.selectedShapes, _shape) >= 0;
    }
,   isContainerShapeSelected: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            if (this.selectedShapes[i].isContainerShape) {
                return true;
            }
        }
        return false;
    }
,   isChildContainerShapeSelected: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            if (this.selectedShapes[i].isContainerShape && !this.selectedShapes[i].isBackGroundShape) {
                return true;
            }
        }
        return false;
    }
,   getSelectedChildContainerShape: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            if (this.selectedShapes[i].isContainerShape && !this.selectedShapes[i].isBackGroundShape) {
                return this.selectedShapes[i];
            }
        }
        return false;
    }
,   getSelectedShapesAndDockedShapes: function() {
        var ret = toolBox.copyArray(this.selectedShapes);
        for (var i=0;i<this.selectedShapes.length;i++) {
            if (this.selectedShapes[i].classType === 'ShapeBorder') {
                for (var j=0;j<this.selectedShapes[i].parentShape.dockedShapeInfos.length;j++) {
                    toolBox.addToArrayIfNotExists(ret, this.selectedShapes[i].parentShape.dockedShapeInfos[j].info1);
                }
            }
            else {
                for (var j=0;j<this.selectedShapes[i].dockedShapeInfos.length;j++) {
                    toolBox.addToArrayIfNotExists(ret, this.selectedShapes[i].dockedShapeInfos[j].info1);
                }
            }
        }
        return ret;
    }
,   saveActualPositionOfSelectedShapes: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            this.selectedShapes[i].saveActualPosition();
            var effectedShapes = this.selectedShapes[i].getEffectedShapes();
            for (var j=0;j<effectedShapes.length;j++) {
                effectedShapes[j].saveActualPosition();
            }
      }
    }
,   saveInnerOffsetAndZoomOfSelectedShapes: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            if (this.selectedShapes[i].isContainerShape) {
                this.selectedShapes[i].saveInnerOffsetAndZoom();
            }
            else if (this.selectedShapes[i].isViewFrame) {
                var effectedShapes = this.selectedShapes[i].getEffectedShapes();
                for (var j=0;j<effectedShapes.length;j++) {
                    for (var k=0;k<effectedShapes[j].childShapes.length;k++) {
                        if (effectedShapes[j].childShapes[k].isContainerShape) {
                            effectedShapes[j].childShapes[k].saveActualPosition();
                        }
                    }
                }
            }
        }
    }
,   select: function(_x, _y, _multiSelect) {
        this.clearSelectedShapes();
        this.addSelectedShape(this);
        this.registerDrawBuffer();
    }
,   registerSelectedShapesToDrawBuffer: function() {
        for (var i=0;i<this.selectedShapes.length;i++) {
            this.selectedShapes[i].registerDrawBufferWithoutChildren();
        }
    }
,   draw: function(_ctx, _drawLastPos) {
logger.put('back ' + this.id + ' draw ----> ' + this.classType, toolBox.LOG_LEVEL_DEBUG);
        this.alreadyDrawn = true;
        if (this.alive === false) {
            toolBox.clean(this);
            return;
        }
        var zOrderSortedShapes = new Array();
        this.zOrderSort(this.childShapes, zOrderSortedShapes);
logger.put('skylight create start', toolBox.LOG_LEVEL_DEBUG);
        this.createSkylightRectsForEachShape();
logger.put('skylight create end', toolBox.LOG_LEVEL_DEBUG);
        if (this.isVisible() === true) {
            this.innerDraw(_ctx, _drawLastPos);
        }
        for (var i=0;i<zOrderSortedShapes.length;i++) {
            zOrderSortedShapes[i].draw(_ctx, _drawLastPos);
        }
    }
,   drawContainerWithImage: function(_sourceLayer, _destinationLayer, _drawLastPos) {
        //まずコンテナ描画
        this.innerDraw(_destinationLayer.ctx, _drawLastPos);
        var zoomDiff = this.innerZoom / this.savedInnerZoom;
        var moveImageX = (this.innerOffsetX - this.savedInnerOffsetX);
        var moveImageY = (this.innerOffsetY - this.savedInnerOffsetY);
        _destinationLayer.ctx.drawImage(_sourceLayer, moveImageX * this.innerZoom, moveImageY * this.innerZoom, this.currentActualW * zoomDiff, this.currentActualH * zoomDiff);
    }
,   clearAllLayer: function() {
        for (var i=0;i<this.layers.length;i++) {
            this.layers[i].clear();
        }
    }
,   fitToCanvas: function() {
        this.setActualW(this.topLayer.width);
        this.setActualH(this.topLayer.height);
        this.registerDrawBuffer();
    }
,   createSkylightRectsForEachShape: function() {
        if (this.childShapes.length === 0) {
            return;
        }
        var topToBottomShapes = new Array();
        var curShape = this.childShapes[0].zOrder.getTopShape();
        while (true) {
            //全shapeのskylightRects初期化
            curShape.skylightRects = new Array();
            if (curShape.isOutOfSight() === false) {
                toolBox.addToArray(topToBottomShapes, curShape);
            }
            curShape = curShape.zOrder.nextLowerShape;
            if (curShape === null) {
                break;
            }
        }
        if (topToBottomShapes.length === 0) {
            return;
        }
        //最上位Shapeから順にskylightRects（天窓リスト）を作成していく⇒天窓は上（ユーザー）から見えるエリアのこと
        for (var i=0;i<topToBottomShapes.length;i++) {
            var targetShape = topToBottomShapes[i];
            //自分の枠も含めた縦線と横線を全て収集する準備
            var horizontalLines = new Array();
            toolBox.addToArray(horizontalLines, 0);
            toolBox.addToArray(horizontalLines, this.currentActualH);
            var verticalLines = new Array();
            toolBox.addToArray(verticalLines, 0);
            toolBox.addToArray(verticalLines, this.currentActualW);
            for (var j=0;j<topToBottomShapes.length;j++) {
                //対象Shapeより上位のShapeを対象に天窓を作成していくので対象Shapeが出てきたら抜ける
                if (topToBottomShapes[j] === targetShape) {
                    break;
                }
                //子供Shapeの縦線と横線を収集（自分の枠外の線は不要なので無視）
                if ( topToBottomShapes[j].currentActualY > 0) {
                    toolBox.addToArray(horizontalLines, topToBottomShapes[j].currentActualY);
                }
                if (topToBottomShapes[j].currentActualY2 < this.currentActualH) {
                    toolBox.addToArray(horizontalLines, topToBottomShapes[j].currentActualY2);
                }
                if (topToBottomShapes[j].currentActualX > 0) {
                    toolBox.addToArray(verticalLines, topToBottomShapes[j].currentActualX);
                }
                if (topToBottomShapes[j].currentActualX2 < this.currentActualW) {
                    toolBox.addToArray(verticalLines, topToBottomShapes[j].currentActualX2);
                }
            }
            //収集した縦線・横線を座標順にソート
            toolBox.sortArrayWithNumber(horizontalLines);
            toolBox.sortArrayWithNumber(verticalLines);
            //くるくる回して全ての線の組み合わせの網目毎となる矩形リスト作成
            var allSkylightRect = new Array();
            for (var hor=1;hor<horizontalLines.length;hor++) {
                for (var ver=1;ver<verticalLines.length;ver++) {
                    toolBox.addToArray(allSkylightRect, new Rect(verticalLines[ver-1], horizontalLines[hor-1], verticalLines[ver], horizontalLines[hor]));
                }
            }
            //網目から作った矩形リストを全て回して、天窓（子Shapeと重ならない矩形）を探して現在のShapeの天窓リストに格納
            var skylightClosed = false;
            for (var k=0;k<allSkylightRect.length;k++) {
                skylightClosed = false;
                for (var l=0;l<topToBottomShapes.length;l++) {
                    if (topToBottomShapes[l] === topToBottomShapes[i]) {
                        break;
                    }
                    if (toolBox.rectHitRect(
                        allSkylightRect[k].x,
                        allSkylightRect[k].y,
                        allSkylightRect[k].x2,
                        allSkylightRect[k].y2,
                        topToBottomShapes[l].currentActualX + 1,
                        topToBottomShapes[l].currentActualY + 1,
                        topToBottomShapes[l].currentActualX2 - 1,
                        topToBottomShapes[l].currentActualY2 - 1) === true) {
                        skylightClosed = true;
                        break;
                    }
                }
                if (skylightClosed === false) {
                    toolBox.addToArray(topToBottomShapes[i].skylightRects, allSkylightRect[k]);
                }
            }
        }
    }
});

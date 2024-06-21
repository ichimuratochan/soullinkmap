var Table = function(){this.initialize.apply(this, arguments);}
Table.prototype = toolBox.extend(new TableBase(), {
    beforeUpdateRow : null
,   initialize: function(_dataBase) {
        TableBase.prototype.initialize.apply(this, [_dataBase]);
        this.classType = 'Table';

        this.alive = true;
    }
,   editRow: function(_row) {
        this.beforeUpdateRow = _row;
        this.dataBase.redoLog.addLog(this, toolBox.TRANSACTION_TYPE_UPDATE, _row);
        this.afterEditRow(_row);
    }
,   afterEditRow: function(_row) {
    }
,   updateRow: function(_row) {
        if (this.getKeyValue(_row) !== this.getKeyValue(this.beforeUpdateRow)) {
            this.keyIndexUsable = false;
        }
        this.dataBase.redoLog.updateAfterLog(this, toolBox.TRANSACTION_TYPE_UPDATE, _row);
        this.afterUpdateRow(_row);
    }
,   afterUpdateRow: function(_row) {
    }
,   updateRowWithNoLogging: function(_row) {
        //Do nothing
    }
,   addRow: function(_row) {
        this.dataBase.redoLog.addLog(this, toolBox.TRANSACTION_TYPE_INSERT, _row);
        var newRowId = toolBox.addToArray(this.rows, _row);
        this.afterAddRow(_row);
        //keyとindex追加（追加のみリアルタイムで更新・削除は仕組み上大変なため諦める）
        this.keyIndex[this.getKeyValue(_row)] = newRowId;
        var indexCols = '';
        var indexColValues = '';
        var dlmt = '';
        for (var indexColumns in this.indexes) {
            if (indexColumns.indexOf(',') !== -1) {
                indexCols = indexColumns.split(',');
                for (var i=0;i<indexCols.length;i++) {
                    indexColValues = indexColValues + dlmt + _row[indexCols[i]];
                    dlmt = ',';
                }
                if (!this.indexes[indexColumns][indexColValues]) {
                    this.indexes[indexColumns][indexColValues] = new Array();
                }
                toolBox.addToArray(this.indexes[indexColumns][indexColValues], _row);
            }
            else {
                indexColValues = _row[indexColumns];
                if (!this.indexes[indexColumns][indexColValues]) {
                    this.indexes[indexColumns][indexColValues] = new Array();
                }
                toolBox.addToArray(this.indexes[indexColumns][indexColValues], _row);
            }
        }
    }
,   afterAddRow: function(_row) {
    }
,   addRowWithNoLogging: function(_row) {
        toolBox.addToArray(this.rows, _row);
    }
,   deleteRow: function(_row) {
        this.keyIndexUsable = false;
        this.dataBase.redoLog.addLog(this, toolBox.TRANSACTION_TYPE_DELETE, _row);
        this.rows = toolBox.arrayWithout(this.rows, _row);
        this.afterDeleteRow(_row);
    }
,   afterDeleteRow: function(_row) {
    }
,   deleteRowWithNoLogging: function(_row) {
        this.rows = toolBox.arrayWithout(this.rows, _row);
    }
});

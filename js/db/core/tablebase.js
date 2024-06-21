var TableBase = function(){this.initialize.apply(this, arguments);}
TableBase.prototype = toolBox.extend(new BaseObject(), {
    name            : 'TABLEBASE'
,   columns         : null
,   columnTypes     : null
,   defaultValues   : null
,   key             : null
,   keyIndex        : null
,   indexes         : null
,   keyIndexUsable  : true
,   rows            : null
,   dataBase        : null
,   initialize: function(_dataBase) {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'Table';
        this.dataBase = _dataBase;
        this.columns = new Array();
        this.columnTypes = new Array();
        this.defaultValues = new Array();
        this.rows = new Array();

        this.indexes = {};

        this.keyIndex = {};
        this.alive = true;
    }
,   destroy: function() {
        this.alive = false;
    }
,   addColumn: function(_colName, _colType, _defaultValue) {
        toolBox.addToArray(this.columns, _colName);
        toolBox.addToArray(this.columnTypes, _colType);
        if (toolBox.isNullOrUndefined(_defaultValue) === false) {
            toolBox.addToArray(this.defaultValues, _defaultValue);
        }
        else {
            if (_colType === toolBox.COLUMN_TYPE_STRING) {
                toolBox.addToArray(this.defaultValues, '');
            }
            else if (_colType === toolBox.COLUMN_TYPE_NUMBER) {
                toolBox.addToArray(this.defaultValues, 0);
            }
        }
    }
,   addIndex: function(_indexColumns) {
        this.indexes[_indexColumns] = {};
    }
,   newRow: function() {
        var r = {};
        for (var i=0;i<this.columns.length;i++) {
            r[this.columns[i]] = null;
        }
        return r;
    }
,   getKeyValue: function(_row) {
        if (this.key.indexOf(',') !== -1) {
            var keys = this.key.split(',');
            var keyValues = '';
            var dlmt = '';
            for (var i=0;i<keys.length;i++) {
                keyValues = keyValues + dlmt + _row[keys[i]];
                dlmt = ',';
            }
            return keyValues;
        }
        else {
            return _row[this.key];
        }
    }
,   getMaxValue: function(_colName) {
        var maxVal = '';
        for (var i=0;i<this.rows.length;i++) {
            if (maxVal < this.rows[i][_colName]) {
                maxVal = this.rows[i][_colName];
            }
        }
        return maxVal;
    }
,   cloneRow: function(_row) {
        var r = {};
        for (var i=0;i<this.columns.length;i++) {
            r[this.columns[i]] = _row[this.columns[i]];
        }
        return r;
    }
,   findRowByKey: function(_key) {
        if (this.keyIndexUsable === true) {
            if (this.keyIndex[_key] >= 0) {
                return this.rows[this.keyIndex[_key]];
            }
            else {
                return null;
            }
        }
        else {
            for (var i=0;i<this.rows.length;i++) {
                if (this.getKeyValue(this.rows[i]) === _key) {
                    return this.rows[i];
                }
            }
            return null;
        }
    }
,   findRowByValue: function(_colName, _value) {
        var ret = null;
        var found = false;
        for (var indexColumns in this.indexes) {
            if (indexColumns === _colName) {
                found = true;
                if (this.indexes[_colName][_value]) {
                    for (var rowkey in this.indexes[_colName][_value]) {
                        ret = this.indexes[_colName][_value][rowkey];
                        break;
                    }
                }
                break;
            }
        }
        if (found === false) {
            for (var i=0;i<this.rows.length;i++) {
                if (this.rows[i][_colName] === _value) {
                    ret = this.rows[i];
                    break;
                }
            }
        }
        return ret;
    }
,   findRowsByValue: function(_colName, _value) {
        var ret = new Array();
        var found = false;
        for (var indexColumns in this.indexes) {
            if (indexColumns === _colName) {
                found = true;
                if (this.indexes[_colName][_value]) {
                    ret = this.indexes[_colName][_value];
                }
                break;
            }
        }
        if (found === false) {
            for (var i=0;i<this.rows.length;i++) {
                if (this.rows[i][_colName] === _value) {
                    toolBox.addToArray(ret, this.rows[i]);
                }
            }
        }
        return ret;
    }
,   findRowsByValueLike: function(_colName, _value) {
        var ret = new Array();
        if (_value !== '') {
            for (var i=0;i<this.rows.length;i++) {
                if (this.rows[i][_colName].indexOf(_value) !== -1) {
                    toolBox.addToArray(ret, this.rows[i]);
                }
            }
        }
        return ret;
    }
,   findRowsByValueLike2: function(_colName, _value) {
        var ret = new Array();
        var val = toolBox.trim(toolBox.convertStringToHankaku(_value.replace(/\n/g, "").toUpperCase()));
        var val2 = '';
        if (val !== '') {
            for (var i=0;i<this.rows.length;i++) {
                val2 = toolBox.trim(toolBox.convertStringToHankaku(this.rows[i][_colName].replace(/\n/g, "").toUpperCase()));
                if (val2.indexOf(val) !== -1) {
                    toolBox.addToArray(ret, this.rows[i]);
                }
                else if (val2 !== '' && val.indexOf(val2) !== -1) {
                    toolBox.addToArray(ret, this.rows[i]);
                }
            }
        }
        return ret;
    }
,   rebuildKeyIndex: function() {
        //key
//        toolBox.clean(this.keyIndex);
        this.keyIndex = {};
        for (var i=0;i<this.rows.length;i++) {
            this.keyIndex[this.getKeyValue(this.rows[i])] = i;
        }
        //index
        var indexCols = '';
        var indexColValues = '';
        var dlmt = '';
        for (var indexColumns in this.indexes) {
//            toolBox.clean(this.indexes[indexColumns]);
            this.indexes[indexColumns] = {};
            if (indexColumns.indexOf(',') !== -1) {
                indexCols = indexColumns.split(',');
                for (var i=0;i<this.rows.length;i++) {
                    indexColValues = '';
                    dlmt = '';
                    for (var j=0;j<indexCols.length;j++) {
                        indexColValues = indexColValues + dlmt + this.rows[i][indexCols[j]];
                        dlmt = ',';
                    }
                    if (!this.indexes[indexColumns][indexColValues]) {
                        this.indexes[indexColumns][indexColValues] = new Array();
                    }
                    toolBox.addToArray(this.indexes[indexColumns][indexColValues], this.rows[i]);
                }
            }
            else {
                for (var i=0;i<this.rows.length;i++) {
                    indexColValues = this.rows[i][indexColumns];
                    if (!this.indexes[indexColumns][indexColValues]) {
                        this.indexes[indexColumns][indexColValues] = new Array();
                    }
                    toolBox.addToArray(this.indexes[indexColumns][indexColValues], this.rows[i]);
                }
            }
        }
        this.keyIndexUsable = true;
    }
,   truncate: function() {
        this.rows.length = 0;
        this.rebuildKeyIndex();
    }
,   loadDataFromSerializedText: function(_text) {
        var text = toolBox.substringTextBetweenStartAndEnd(_text, toolBox.SERIALIZE_TAG_ROWS, toolBox.SERIALIZE_TAG_ROWS_END);
        var rowText = '';
        var row = null;
        var value = '';
        while (true) {
            if (text.indexOf(toolBox.SERIALIZE_TAG_ROW) === -1) {
                 break;
            }
            rowText = toolBox.substringTextBetweenStartAndEnd(text, toolBox.SERIALIZE_TAG_ROW, toolBox.SERIALIZE_TAG_ROW_END);
            row = this.newRow();
            for (var i=0;i<this.columns.length;i++) {
                if (rowText.indexOf('<' + this.columns[i] + '>') === -1) {
                    value = this.defaultValues[i];
                }
                else {
                    value = toolBox.substringTextBetweenStartAndEnd(rowText, '<' + this.columns[i] + '>', '</' + this.columns[i] + '>');
                }
                if (this.columnTypes[i] === toolBox.COLUMN_TYPE_NUMBER) {
                    row[this.columns[i]] = Number(value);
                }
                else {
                    row[this.columns[i]] = value;
                }
            }
            toolBox.addToArray(this.rows, row);
            text = toolBox.sliceTextByKeyword(text, toolBox.SERIALIZE_TAG_ROW_END);
        }
    }
,   saveDataToSerializedText: function() {
        var serializedText = toolBox.SERIALIZE_TAG_TABLE;
        serializedText += toolBox.SERIALIZE_TAG_TABLE_NAME + this.name + toolBox.SERIALIZE_TAG_TABLE_NAME_END;
        serializedText += toolBox.SERIALIZE_TAG_ROWS + "\n";
        for (var i=0;i<this.rows.length;i++) {
            serializedText += this.saveRowDataToSerializedText(this.rows[i]) + "\n";
        }
        serializedText += toolBox.SERIALIZE_TAG_ROWS_END + "\n";
        serializedText += toolBox.SERIALIZE_TAG_TABLE_END + "\n";
        return serializedText;
    }
,   saveRowDataToSerializedText: function(_row) {
        var serializedText = toolBox.SERIALIZE_TAG_ROW;
        if (_row !== null) {
            for (var i=0;i<this.columns.length;i++) {
                serializedText += '<' + this.columns[i] + '>';
                serializedText += toolBox.escapeText(_row[this.columns[i]]);
                serializedText += '</' + this.columns[i] + '>';
            }
        }
        serializedText += toolBox.SERIALIZE_TAG_ROW_END;
        return serializedText;
    }
});

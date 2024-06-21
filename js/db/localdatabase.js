var LocalDataBase = function(){this.initialize.apply(this, arguments);}
LocalDataBase.prototype = toolBox.extend(new DataBase(), {
    loadedText: ''
,   initialize: function() {
        DataBase.prototype.initialize.apply(this);
        this.classType = 'LocalDataBase';

        this.addTable(new AppConfig(this));
        this.addTable(new ViewStatus(this));
        this.addTable(new LinkViewFilters(this));
        this.addTable(new LinkViewLocks(this));
        this.addTable(new Soul(this));
        this.addTable(new SoulLink(this));
        this.addTable(new Body(this));
        this.addTable(new BodyFormat(this));

        this.alive = true;
    }
,   resetAll: function() {
        for (var key in this.tables) {
            this.tables[key].truncate();
        }
        this.redoLog.truncate();
    }
,   loadDataFromSerializedText: function(_text) {
        this.loadedText = '';
        this.resetAll();
        var text = _text
        var tableText = '';
        var rowsText = '';
        var tableName = '';
        while (true) {
            tableText = toolBox.substringTextBetweenStartAndEnd(text, toolBox.SERIALIZE_TAG_TABLE, toolBox.SERIALIZE_TAG_TABLE_END);
            if (tableText === '') {
                break;
            }
            tableName = toolBox.substringTextBetweenStartAndEnd(tableText, toolBox.SERIALIZE_TAG_TABLE_NAME, toolBox.SERIALIZE_TAG_TABLE_NAME_END);
            this.tables[tableName].loadDataFromSerializedText(tableText);
            this.tables[tableName].rebuildKeyIndex();
            text = toolBox.sliceTextByKeyword(text, toolBox.SERIALIZE_TAG_TABLE_END);
        }
        this.loadedText = _text;
    }
,   saveDataToSerializedText: function() {
        var serializedText = '';
        for (var key in this.tables) {
            serializedText += this.tables[key].saveDataToSerializedText();
        }
        serializedText = serializedText.substr(0, serializedText.length-1);
        return serializedText;
    }
});

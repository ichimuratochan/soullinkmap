var FilterDefinition = function(){this.initialize.apply(this, arguments);}
FilterDefinition.prototype = toolBox.extend(new BaseObject(), {
    filterType          : toolBox.FILTER_TYPE_SOUL
,   soulId              : ''
,   text                : ''
,   logicalOperator     : toolBox.LOGICAL_OPERATOR_AND
,   conditionOperator   : toolBox.CONDITION_OPERATOR_EQUAL
,   initialize: function() {
        BaseObject.prototype.initialize.apply(this);
        this.classType = 'FilterDefinition';
    }
,   clone : function() {
        ret = new FilterDefinition();
        ret.filterType = this.filterType;
        ret.soulId = this.soulId;
        ret.text = this.text;
        ret.logicalOperator = this.logicalOperator;
        ret.conditionOperator = this.conditionOperator;
        return ret;
    }
});

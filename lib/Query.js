var util = require('util')
  , rules = require('./rules')
  , apis_names = Object.keys(rules.api)
;

var Query = (function(){
  function Query(from) {
    if (apis_names.indexOf(from) < 0) throw new Error('Unknown api name ' + from)
    this.from = from
    this.definition = rules.api[from];
    this.params = {}
  }

  Query.prototype.accessId = function(id){
    return this.setParam('AccessID', id);
  }

  Query.prototype.expires = function(timestamp){
    return this.setParam('Expires', timestamp);
  }

  Query.prototype.signature = function(signature){
    return this.setParam('Signature', signature);
  }

  Query.prototype.accessId = function(id){
    return this.setParam('AccessID', id);
  }

  Query.prototype.limit = function(sorter) {
    return this.setParam('Limit', sorter)
  }

  Query.prototype.offset = function(offset) {
    return this.setParam('Offset', offset)
  }

  Query.prototype.sort = function(sorter) {
    return this.setParam('Sort', sorter)
  }

  Query.prototype.filter = function(filter) {
    return this.setParam('Filter', filter);
  }

  Query.prototype.scope = function(scope) {
    return this.setParam('Scope', scope);
  }

  Query.prototype.scope = function(scope) {
    return this.setParam('Scope', scope);
  }

  Query.prototype.sourceDomain = function(domain) {
    return this.setParam('SourceDomain', domain);
  }

  Query.prototype.cols = function(cols) {
    return this.setParam('Cols', cols);
  }

  Query.prototype.sourceCols = function(cols) {
    return this.setParam('SourceCols', cols);
  }

  Query.prototype.targetCols = function(cols) {
    return this.setParam('TargetCols', cols);
  }

  Query.prototype.linkCols = function(cols) {
    return this.setParam('LinkCols', cols);
  }

  Query.prototype.setParam = function(param, value) {
    this.params[param] = this.validate(param, value);
    return this;
  }

  Query.prototype.validate = function(param, value) {
    var def = this.definition.parameters[param] || rules.parameters[param]
    if (!def) throw new Error('This api doesn\'t accept the param : ' + param)

    if (!value) throw new Error('Value cannot be empty for param `'+param+'`')

    if (util.isArray(def) && def.indexOf(value) < 0) {
      throw new Error('Invalid ' + param + '. Expected one of : ' + def.join(', '))
    }

    if ('string' === typeof def) {
      switch (def) {
        case 'string':
          if ((value+'').length === 0) throw new Error('Expect parameter `'+param+'` not to be empty');
          break;
        case 'int':
          if(!(!isNaN(parseInt(value+'')) && isFinite(value))) throw new Error('Expected parameter `'+param+'` to be an integer');
          break;
        case 'bitflags':
          if (!util.isArray(value)) throw new Error('Expect parameter `'+param+'` to be an array')
          if (0 === value.length) throw new Error('Expect parameter `'+param+'` not to be empty')
          var bits = 0
          for (var k in value) {
            var col = value[k];
            if (!this.definition.flags[col]) throw new Error('Unknown column ' + col + ' for parameter ' + param);
            bits += this.definition.flags[col];
          }
          value = bits;
          break;
        default: throw new Error('Unsupported type `' + def + '` for parameter `'+param+'`');
      }
    }
    return value;
  }

  return Query
})();

module.exports = exports = Query;

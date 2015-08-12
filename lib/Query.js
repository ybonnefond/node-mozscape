var util = require('util')
  , rules = require('./rules')
  , flags = require('./flags')
  , apis_names = Object.keys(rules.api)
;

var Query = (function(){

  /**
   * Query builder
   * @constructor
   */
  function Query(api) {
    if (apis_names.indexOf(api) < 0) throw new Error('Unknown api name ' + api)

    this.api = api
    this.definition = rules.api[api]
    this.flags = flags[api]
    this.params = {}
    this.targets = null;
  }

  /**
   * targets can either be a string or an array
   * passing and array will send the query in batch mode
   */
  Query.prototype.target = function(targets) {
    if ('string' !== typeof targets && !util.isArray(targets)) throw new Error('Invalid typeof targets');
    this.targets = targets;
    return this;
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

  /**
   * @param {(String[]|integer[])}
   */
  Query.prototype.cols = function(cols) {
    return this.setParam('Cols', cols);
  }

  /**
   * @param {(String[]|integer[])}
   */
  Query.prototype.sourceCols = function(cols) {
    return this.setParam('SourceCols', cols);
  }

  /**
   * @param {(String[]|integer[])}
   */
  Query.prototype.targetCols = function(cols) {
    return this.setParam('TargetCols', cols);
  }

  /**
   * @param {(String[]|integer[])}
   */
  Query.prototype.linkCols = function(cols) {
    return this.setParam('LinkCols', cols);
  }

  Query.prototype.setParam = function(param, value) {
    this.params[param] = this.validate(param, value);
    return this;
  }

  Query.prototype.reset = function() {
    this.target = null;
    return this;
  }

  Query.prototype.validate = function(param, value) {
    var def = this.definition.parameters[param] || rules.parameters[param]

    if (!def) throw new Error('This api doesn\'t accept the param : ' + param)
    if (!value) throw new Error('Value cannot be empty for param `'+param+'`')

    if (util.isArray(def))  def = { type: 'string', enum: def }

    if ('string' === typeof def) def = { type: def };

    switch (def.type) {
      case 'array':
        if ('string' === typeof value) value = [value];
        if (def.enum) {
          value.forEach(function(v){
            if (def.enum.indexOf(v) < 0) throw new Error('Invalid value `'+v+'` for parameter `'+param+'`, expected one of :' + def.enum.join(', '));
          });
        }
        value = value.join('+');
        break;
      case 'string':
        if ('string' !== typeof value) throw new Error('Expected value to be a string');
        if ((value+'').length === 0) throw new Error('Expect parameter `'+param+'` not to be empty');
        if (def.enum && def.enum.indexOf(value) < 0)  throw new Error('Invalid ' + param + '. Expected one of : ' + def.join(', '));
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
          if ('string' === typeof col) {
            if (!this.flags[col]) throw new Error('Unknown column ' + col + ' for parameter ' + param);
            col = this.flags[col];
          };
          bits += col;
        }
        value = bits;
        break;
      default: throw new Error('Unsupported type `' + def + '` for parameter `'+param+'`');
    }

    return value;
  }

  return Query
})();

module.exports = exports = Query;

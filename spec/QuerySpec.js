describe('Query', function () {
  var Query = require('../lib/Query');
  var query;

  beforeEach(function(){ query = new Query('links'); });

  it('should throw Error if no api name is set', function () {
    expect(function(){
      new Query();
    }).toThrow();
  });

  it('should throw Error if unknown api', function () {
    expect(function(){
      new Query('test');
    }).toThrow();
  });

  it('should not throw Error if created with an existing api name', function () {
    expect(function(){
      new Query('url-metrics');
    }).not.toThrow();
  });

  it('should imitialize the Query', function () {
    expect(query.api).toEqual('links')
    expect(query.definition).toBeDefined()
    expect(query.params).toEqual({});
  });

  it('should set a string target', function () {
    query.target('http://moz.com');
    expect(query.targets).toEqual('http://moz.com')
  });

  it('should set an array of targets', function () {
    query.target(['http://moz.com', 'http://optimiz.me']);
    expect(query.targets.length).toEqual(2)
  });

  it('should set a parameter', function () {
    query.setParam('Limit', 1);
    expect(query.params.Limit).toEqual(1);
  });

  describe('Simple parameters', function(){

    it('should set an accessId parameter', function () {
      query.accessId("1sasd0");
      expect(query.params.AccessID).toEqual("1sasd0");
    });

    it('should set an expires parameter', function () {
      query.expires(10);
      expect(query.params.Expires).toEqual(10);
    });

    it('should set an signature parameter', function () {
      query.signature("123456");
      expect(query.params.Signature).toEqual("123456");
    });

      it('should set a limit parameter', function () {
        query.limit(10);
        expect(query.params.Limit).toEqual(10);
      });

      it('should set an offset parameter', function () {
        query.offset(10);
        expect(query.params.Offset).toEqual(10);
      });
  });

  describe('validate', function () {
    it('should throw an exception if key not in definition', function () {
      expect(function(){
        return query.validate('test')
      }).toThrow()
    });
    it('should throw an exception if value is empty', function () {
      expect(function(){
        return query.validate('Filter')
      }).toThrow()
    });

    it('should throw an exception if def is an enum and value not there', function () {
      expect(function(){
        return query.validate('Filter', 'test')
      }).toThrow()
    });

    it('should not throw an exception if def is an enum and value is there', function () {
      expect(query.validate('Filter', 'internal')).toEqual('internal')
    });

    it('should not throw an exception if def is an enum and value is there', function () {
      expect(query.validate('Filter', ['internal', '301'])).toEqual('internal+301')
    });

    it('should throw an exception if value of type string is an empty string', function () {
      expect(function(){
        return query.validate('SourceDomain', '')
      }).toThrow()
    });

    it('should not throw an exception if value of type string is an empty string', function () {
      expect(query.validate('SourceDomain', 'test')).toEqual('test')
    });

    it('should throw an exception if value of type int is not an it', function () {
      expect(function(){
        return query.validate('Limit', 'test')
      }).toThrow()
    });

    it('should not throw an exception if of type int value is an int', function () {
      expect(query.validate('Limit', 10)).toEqual(10)
    });

    it('should throw an exception if value of type bitflag is not an array', function () {
      expect(function(){
        return query.validate('TargetCols', 'test')
      }).toThrow()
    });

    it('should throw an exception if value of type bitflag is an empty array', function () {
      expect(function(){
        return query.validate('TargetCols', [])
      }).toThrow()
    });

    it('should throw an exception if value of type bitflag contain an invalid column', function () {
      expect(function(){
        return query.validate('TargetCols', ['test'])
      }).toThrow()
    });

    it('should return the sum of the bit flags', function () {
      expect(query.validate('TargetCols', ['flags', 'anchor_text'])).toEqual(6)
    });

  });



  it('should chain', function () {
    expect(function(){
      query
        .limit(10)
        .offset(5)
        .scope('page_to_page')
        .sort('page_authority')
        .filter('internal')
        .targetCols(['flags', 'anchor_text'])
        .sourceCols(['flags', 'anchor_text'])
        .linkCols(['flags', 'anchor_text'])
    }).not.toThrow()
  });

});

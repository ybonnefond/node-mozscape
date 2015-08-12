describe('Query', function () {
  var conf = require('./support/conf')
  var Moz = require('../lib/Moz')
  var Query = require('../lib/Query');

  var moz;

  beforeEach(function(){ moz = new Moz({ accessId: conf.accessId, secret: conf.secret })})

  it('should throw Error if no accessId', function () {
    expect(function(){
      new Moz();
    }).toThrow();
  });

  it('should throw Error if no secret', function () {
    expect(function(){
      new Moz({ accessId: conf.accessId});
    }).toThrow();
  });

  it('should create a new Query', function () {
    expect(moz.newQuery('links') instanceof Query).toBeTruthy();
  });

  it('should return a timestamp in the future', function () {
    expect(moz._expires() > new Date().getTime() / 1000).toBeTruthy();
  });

  it('should create a signature', function () {
    expect('string' === typeof moz._signature(moz._expires())).toBeTruthy();
  });

  it('should _buildQueryString', function () {
    expect(moz._buildQueryString({
      params: {
        batman: 'Bruce Wayne',
        superman: 'Clark Kent'
      }
    })).toEqual('batman=Bruce%20Wayne&superman=Clark%20Kent');
  });

  it('should return true if query is batched', function () {
    expect(moz._isBatch({
      targets: []
    })).toBeTruthy();
  });

  it('should return false if query is batched', function () {
    expect(moz._isBatch({
      targets: 'test'
    })).toBeFalsy();
  });

  it('should build a request URL a single target', function () {
    var query = moz.newQuery('links')
      .target(conf.target)
      .limit(10)
    expect(moz._buildUrl(query)).toEqual(moz.options.url + '/links/' + conf.target + '?Limit=10');
  });

  it('should build a URL for a batch request', function () {
    var query = moz.newQuery('links')
      .target([conf.target])
      .limit(10)
    expect(moz._buildUrl(query)).toEqual(moz.options.url + '/links' + '?Limit=10');
  });

  it('should add auth parameters', function () {
    var query = moz.newQuery('links');
    moz._addAuthParameters(query);
    expect(query.params.AccessID).toBeDefined();
    expect(query.params.Expires).toBeDefined();
    expect(query.params.Signature).toBeDefined();
  });

  it('should create request options', function () {
    var query = moz.newQuery('links')
      .target(conf.target)
      .limit(10)
    options = moz._getRequestOptions(query);
    expect(options.url).toEqual(moz.options.url + '/links/' + conf.target + '?Limit=10');
    expect(options.method).toEqual('GET');
    expect(options.body).not.toBeDefined();
    expect(options.json).toBeTruthy();
  });
  it('should create request options', function () {
    var query = moz.newQuery('links')
      .target([conf.target])
      .limit(10)
    options = moz._getRequestOptions(query);
    expect(options.url).toEqual(moz.options.url + '/links' + '?Limit=10');
    expect(options.method).toEqual('POST');
    expect(options.body).toEqual([conf.target]);
    expect(options.json).toBeTruthy();
  });

  describe('Requests', function () {

    it('should send a simple request', function(done){
      var query = moz.newQuery('url-metrics')
        .target(conf.target)
        .cols(['title', 'url', 'moz_rank', 'page_authority']);
      moz.exec(query, function(err, result){
        expect(err).toBeNull();
        expect(result).toBeDefined();
        done();
      })
    })

  });

  it('should send a metadata command', function (done) {
    var query = moz.newQuery('metadata')
      .target('last_update');
    moz.exec(query, function(err, result){
      expect(err).toBeNull();
      expect(result).toBeDefined();
      done();
    });
  });

});

if (!process.env.ACCESSID) throw new Error('Set your ACCESSID as an environment variable before running tests: ACCESSID=<YOUR ACCESS ID> SECRET=<YOUR SECRET> npm test')
if (!process.env.SECRET) throw new Error('Set your SECRET as an environment variable before running tests:  npm test')
module.exports = exports = {
  accessId: process.env.ACCESSID,
  secret: process.env.SECRET,
  target: process.env.TARGET || 'http://moz.com'
};

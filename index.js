
const server = require('./server');
const lxc = require('./lxc');
const style = require('./style')(server.app);

style.reg('bootstrap', './node_modules/bootstrap/dist/css/bootstrap.css');

server.regGlobal('tree', require('./tree.js'));
server.regGlobal('style', style.get);

server.path('/', null, null, (req, res) => {
  res.redirect('/containers');
});

server.path('/containers', 'containers/index.ejs', {
  lxc
});

server.path('/containers/new', 'containers/new.ejs', {
  lxc
}, async (req, res, next) => {
  if (req.body.new_container != undefined) {
    try {
      await lxc.launch(req.body.image, req.body.name);
      res.redirect('/containers');
      return;
    } catch (e) {
      req.error = e;
    }
  }
  next();
});

server.path('/containers/stop/:name', null, null, async (req, res) => {
  await lxc.stop(req.params.name);
  res.redirect('/containers');
});

server.path('/containers/delete/:name', null, null, async (req, res) => {
  await lxc.del(req.params.name);
  res.redirect('/containers');
});


server.path('/containers/start/:name', null, null, async (req, res) => {
  await lxc.start(req.params.name);
  res.redirect('/containers');
});

server.path('/images', 'images/index.ejs', {
  lxc
}, async (req, res, next) => {
  if (req.body.import != undefined) {
    try {
      await lxc.image.import(req.body.name);
    } catch (e) {
      req.error = e;
    }
  }
  next();
});

server.path('/images/delete/:fingerprint', null, null, async (req, res) => {
  await lxc.image.delete(req.params.fingerprint);
  res.redirect('/images');
});


server.start();


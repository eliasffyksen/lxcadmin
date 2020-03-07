const ejs = require('ejs');
const app = require('express')();
const bodyParser = require('body-parser');
const globals = {};

app.use(bodyParser.urlencoded({extended: false}));


function path(path, templateFile, data, ...midleware) {
  app.all(path, ...midleware, (req, res) => {
    ejs.renderFile(
      `templates/${templateFile}`,
      {
        req,
        res,
        ...data,
        ...globals
      },
      {async: true},
      (err, html) => {
        if (err) {
          res.status(500).send('Internal server error');
          console.error(err);
          return;
        }

        html
          .then(html => res.send(html))
          .catch(err => { 
            res.status(500).send('Internal server error');
            console.error(err);
          });
      }
    );
  });
}

function regGlobal(name, value) {
  globals[name] = value;
}

function start(port) {
  port = port || 8080;
  app.listen(port, () => {
    console.log(`LXC Admin listening on port ${port}`);
  });
}

module.exports = {
  start,
  path,
  regGlobal,
  app
};

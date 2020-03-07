
const styles = {};

function reg(str, path) {
  styles[str] = path;
}

function get(str) {
  if (!Object.keys(styles).includes(str)) {
    return `<script>console.error('undefined style ${str}');</script>`;
  }
  return `<link rel="stylesheet" type="text/css" href="/styles/${str}">`;
}

module.exports = (app) => {

  app.get('/styles/:style', (req, res) => {
    if (!Object.keys(styles).includes(req.params.style)) {
      res.status(404).send('File not found');
    }
    res.set('Content-Type', 'text/css');
    res.sendFile(styles[req.params.style], {
      root: './'
    });
  });

  return {
    get,
    reg
  }
}

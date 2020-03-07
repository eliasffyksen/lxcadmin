
function parseObj(obj) {
  var html = 'object:<br><ul>';
  for(const key in obj) {
    html += `<li>${key}: ${val(obj[key])}</li>`;
  }
  html += '</ul>';
  return html;
}

function parseArr(obj) {
  var html = 'array:<br><ol>';
  for(const e of obj) {
    html += `<li>${val(e)}</li>`;
  }
  html += '</ol>';
  return html;
}

function val(obj) {

  if (obj instanceof Array) {
    return parseArr(obj);
  }

  switch (typeof obj) {
    case 'object':
      return parseObj(obj);
    case 'string':
      return `string: ${obj}`;
    case 'number':
      return `number: ${obj}`;
    default:
      return `${obj}`;
  }
};

module.exports = val;

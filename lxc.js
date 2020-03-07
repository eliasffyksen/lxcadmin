
const { exec, spawn } = require('child_process');


function run(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        rej(stderr);
        return;
      }
      res(stdout);
    })
  });
}

async function list() {
  return JSON.parse(await run('lxc list --format json'));
}

async function stop(name) {
  await run(`lxc stop ${name}`);
}

async function start(name) {
  await run(`lxc start ${name}`);
}

async function del(name) {
  await run(`lxc delete ${name}`);
}

function launch(image, name) {
  return run(`echo "" | lxc launch ${image} "${name}"`); 
}

async function listImages(remote) {
  
  return JSON.parse(await run(`lxc image list ${remote || 'local'}: --format json`));
}

function importImage(name) {
  return run(`lxc image copy images:${name} local:`);
}

function deleteImage(fingerprint) {
  return run(`lxc image delete ${fingerprint}`);
}


module.exports = {
  list,
  stop,
  start,
  del,
  launch,
  image: {
    list: listImages,
    import: importImage,
    delete: deleteImage
  }
};

/**
 * Pre-parses page content. This script is intended to be part of the build process, to be run before ng build.
 * The assets themselves are to be included in the angular.json. This mainly avoids the loading of each page
 * individually at runtime.
 */
console.info('Running page content parser');

const fs = require('fs');
const path = require('path');

const srcDir = __dirname + '/src/assets/pages'
const targetDir = __dirname + '/target/assets/pages';

const walk = function (dir, done) {
  let results = new Map();
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = new Map([...results].concat([...res]));
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.html')) {
            results.set(file.substring(srcDir.length + 1, file.length), fs.readFileSync(file, {encoding: 'utf-8'}));
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
const write = function (dir, content, done) {
  console.log('Writing file ' + dir);
  const dstPath = targetDir + '/' + dir;

  fs.promises.mkdir(path.dirname(dstPath), {recursive: true}).then(() => {
    fs.promises.writeFile(dstPath, content, (err) => {
      if (err) return done(err);
    });
    done(null, dstPath);
  });
}

// --------------------------------------------------

walk(srcDir, function (err, results) {
  if (err) throw err
  results.forEach((value, key) => {
    write(key, value, function (err, done) {
      if (err) throw err;
      console.log('Successfully written ' + done);
    });
  })
});

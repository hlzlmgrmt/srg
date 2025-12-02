/**
 * Pre-parses page content. This script is intended to be part of the build process, to be run before ng build.
 * The assets themselves are to be includes in the angular.json. This mainly avoids the loading of each page
 * individually at runtime.
 */

console.info('Running page content pre-parser');

const fs = require('fs');
const path = require('path');
const walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const destDir = './target/assets/pages';
const createdDir = fs.mkdirSync(destDir, {recursive: true});
createdDir && console.log('Created dir', createdDir);

walk(__dirname + '/src/assets/pages', function (err, results) {
  if (err) throw err;
  console.log('Found ' + results.length + ' pages:', results);
});

console.info('Successfully parsed page content');

/**
 * Pre-parses page content. This script is intended to be part of the build process, to be run before ng build.
 * The assets themselves are to be includes in the angular.json. This mainly avoids the loading of each page
 * individually at runtime.
 */

console.info('Running page content pre-parser');

const fs = require('fs');

const destDir = './target/assets/pages';
const createdDir = fs.mkdirSync(destDir, {recursive: true});
createdDir && console.log('Created dir', createdDir);

console.info('Successfully parsed page content');

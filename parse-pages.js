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

// Regex for determining content <ins></ins>-Tags
const insSelector = '<ins.*id=".+".*>.*</ins>';

// Content map for parsing dice symbols
const diceSymbolsMap = new Map([
  ['p', '<span class="glyph proficiency" title="Proficiency">l</span>'],
  ['a', '<span class="glyph ability" title="Ability">k</span>'],
  ['b', '<span class="glyph boost" title="Boost">j</span>'],
  ['w', '<span class="glyph power" title="Power">l</span>'],
  ['c', '<span class="glyph challenge" title="Challenge">l</span>'],
  ['d', '<span class="glyph difficulty" title="Difficulty">k</span>'],
  ['s', '<span class="glyph setback" title="Setback">j</span>']
]);
const diceSymbolsSelector = '\\[('
  + Array.from(diceSymbolsMap.keys()).join('|')
  + ')+\\]';

// Content map for parsing dice face symbols
const faceSymbolsMap = new Map([
  ['s', '<span class="glyph" title="Success">s</span>'],
  ['a', '<span class="glyph" title="Advantage">a</span>'],
  ['t', '<span class="glyph" title="Triumph">t</span>'],
  ['f', '<span class="glyph" title="Failure">f</span>'],
  ['h', '<span class="glyph" title="Threat">h</span>'],
  ['d', '<span class="glyph" title="Despair">d</span>'],
  ['w', '<span class="glyph dot-light" title="Light Point"></span>'],
  ['b', '<span class="glyph dot-dark" title="Dark Point"></span>']
]);
const faceSymbolsSelector = '\\(('
  + Array.from(faceSymbolsMap.keys()).join('|')
  + ')+\\)';

// Selector for glyph (dice symbols and dice faces) parsers
const glyphSelector = '\\[('
  + diceSymbolsSelector + '|' + faceSymbolsSelector
  + ')+\\]'

/**
 * Recursively iterates through all files from the source directory
 *
 * @param dir   input directory
 * @param done  callback function (error, result (map of file paths and their content))
 */
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

/**
 * Recursively parses a file
 *
 * @param content content map to be consumed (key = path, value = content)
 * @param done    callback function (error, result content map)
 */
const parse = function (content, done) {
  let result = new Map();
  console.log("Parsing", content.size, "pages")

  new Map([...content]).forEach(function(value, key) {
    const glyphMatches = value.match(new RegExp(glyphSelector, 'g'));
    if (glyphMatches) {
      glyphMatches.forEach((glyphMatch) => {
        let replace = glyphMatch.toString().substring(1, glyphMatch.toString().length - 1);
        const diceMatches = replace.match(new RegExp(diceSymbolsSelector, 'g'));
        if (diceMatches) {
          diceMatches.forEach((diceMatch) => {
            let innerReplace = diceMatch.toString().substring(1, diceMatch.toString().length - 1);
            innerReplace = innerReplace.split('').map((char) => diceSymbolsMap.get(char)).join('');
            replace = replace.replace(diceMatch, innerReplace);
          })
        }

        const faceMatches = replace.match(new RegExp(faceSymbolsSelector, 'g'));
        if (faceMatches) {
          faceMatches.forEach((faceMatch) => {
            let innerReplace = faceMatch.toString().substring(1, faceMatch.toString().length - 1);
            innerReplace = innerReplace.split('').map((char) => faceSymbolsMap.get(char)).join('');
            replace = replace.replace(faceMatch, innerReplace);
          })
        }

        value = value.replace(glyphMatch, replace);
      })
    }
    result.set(key, value);
  });

  return done(null, result);
}

/**
 * Recursively parses and inserts pages references by <ins>-Tags in a file. This is a seperate step from all parsing
 * actions since any page content must be parsed *before* inserting pages into each other.
 *
 * @param content content map to be consumed (key = path, value = content)
 * @param done    callback function (error, result content map)
 */
const insertPages = function (content, done) {
  let result = new Map([...content].filter(([k, v]) => !v.match(new RegExp(insSelector, 'g'))));
  console.log("Inserting", content.size, "pages")

  let remaining = content.size - result.size;
  while (remaining > 0) {
    let remainingContent = new Map([...content].filter(([k, v]) => !Array.from(result.keys()).includes(k)));
    // console.log("Remaining content:", remainingContent.size, Array.from(remainingContent.keys()))

    new Map([...remainingContent].filter(([key, value]) => {
      const insertPaths = value.match(new RegExp(insSelector, 'g')).map((ins) =>
        ins.match(/id="[^"]+"/).map((match) =>
          match.substring('id=\"'.length, match.length - 1))).flat();

      return insertPaths.every(key => Array.from(result.keys()).includes(key));
    })).forEach(function (value, key) {
      value.match(new RegExp(insSelector, 'g')).forEach((ins) => {
        const insKey = ins.match(/id="[^"]+"/)?.map(match =>
          match.substring('id=\"'.length, match.length - 1))[0] ?? '';
        const insHeading = ins.match(/>.+<\/ins>/)?.map(match =>
          match.substring(match.indexOf('>') + 1, match.indexOf('<')))[0] ?? '';
        const insDepth = ins.match(/data-depth="[0-9]+"/)?.map(match =>
          Number.parseInt(match.substring('data-depth=\"'.length, match.length - 1)))[0] ?? (insKey.match(/\//g) || []).length + 1

        const insData = '<h' + insDepth + ' id=' + insKey.substring(0, insKey.length - '.html'.length) + '>' + insHeading + '</h' + insDepth + '>\n' + result.get(insKey);
        value = value.replace(ins, insData ?? '');
      });
      result.set(key, value);
      remaining--;
    })
  }

  done(null, result);
}


const write = function (dir, content, done) {
  const dstPath = targetDir + '/' + dir;

  // Only write main paths
  if (!dir.includes('/')) {
    fs.promises.mkdir(path.dirname(dstPath), {recursive: true}).then(() => {
      fs.promises.writeFile(dstPath, content, (err) => {
        if (err) return done(err);
      });
      done(null, dstPath);
    });
  }
}

// --------------------------------------------------

walk(srcDir, function (err, results) {
  if (err) throw err;
  parse(results, function (err, results) {
    if (err) throw err;
    insertPages(results, function (err, results) {
      if (err) throw err;
      results.forEach((value, key) => {
        write(key, value, function (err, done) {
          if (err) throw err;
        });
      })
    })
  })
});

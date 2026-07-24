/**
 * Pre-parses page content. This script is intended to be part of the build process, to be run before ng build.
 * The assets themselves are to be included in the angular.json. This mainly avoids the loading of each page
 * individually at runtime.
 */
console.info('Running page content parser');

const fs = require('fs');
const path = require('path');
const {parse: domParse} = require('node-html-parser');
const {elementAt} = require("rxjs");

const {platform} = process;
const locale = path[platform == 'win32' ? 'win32' : 'posix']

console.log('Detected platform', platform);
const srcDir = __dirname + '/src/assets';
const pagesSrcDir = srcDir + '/pages';
const templatesSrcDir = srcDir + '/templates';
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
            results.set(file.substring(pagesSrcDir.length + 1, file.length), fs.readFileSync(file, {encoding: 'utf-8'}));
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

/**
 * Parses a file
 *
 * @param content content map to be consumed (key = path, value = content)
 * @param done    callback function (error, result content map)
 */
const parse = function (content, done) {
  let result = new Map();
  console.log("Parsing", content.size, "pages")

  new Map([...content]).forEach(function (value, key) {
    value = parseTemplates(value, key);
    value = parseGlyphs(value);

    result.set(key, value);
  });

  return done(null, result);
}

function parseTemplates(value, key) {
  // Parse root templates first
  domParse(value).getElementsByTagName('template').forEach((templateElement) => {
    const id = templateElement.getAttribute('id');
    if (id) {
      const templateAttributes = getAttributes(templateElement);
      let innerTemplate = fs.readFileSync(templatesSrcDir + '/' + id, {encoding: 'utf-8'});

      domParse(innerTemplate).getElementsByTagName('template').forEach((innerTemplateElement) => {
        const innerTemplateOrig = innerTemplateElement.toString();
        setAttributes(innerTemplateElement, templateAttributes);
        innerTemplate = innerTemplate.replaceAll(new RegExp(escapeRegExp(innerTemplateOrig), 'gm'), innerTemplateElement.toString());
      })
      value = value.replaceAll(new RegExp(escapeRegExp(templateElement.toString()), 'gm'), innerTemplate);
    }
  });

  domParse(value).getElementsByTagName('template').forEach((templateElement) => {
    let replace = '';
    const templateValues = templateElement.outerHTML.match(new RegExp("\\${{[^\${}]+}}", 'g'));
    const templateAttributes = getAttributes(templateElement);
    if (!templateAttributes.dataSource) done('Cannot find required attribute data-source',
      templateAttributes.dataSource, 'in file', key);
    console.log('Building template', templateAttributes.dataSource, 'in', key);

    JSON.parse(fs.readFileSync(pagesSrcDir + '/' + templateAttributes.dataSource, {encoding: 'utf-8'}))
      .sort((a, b) => templateAttributes.sortedBy ? a[templateAttributes.sortedBy].localeCompare(b[templateAttributes.sortedBy]) : 1)
      .filter((data) => templateAttributes.filteredByKey && templateAttributes.filteredByValue
        ? data[templateAttributes.filteredByKey] == templateAttributes.filteredByValue : true)
      .forEach((data => {
        let innerReplace = templateElement.innerHTML;
        if (templateValues && templateValues.length > 0) templateValues.forEach((valueTag) => {
          const templateValue = valueTag.substring(3, valueTag.indexOf('}')).trim();
          if (templateValue == 'key' && !data['key']) {
            data['key'] = data['name'].toString().toLowerCase().replace(/[.*+?^\-$&{}()|[\]\\\/\s]+/g, '_');
          }

          const hiddenElementsOnNullValue = templateElement.querySelectorAll('[data-hideonnullvalueforkey="' + templateValue + '"]');
          if (hiddenElementsOnNullValue && !data[templateValue]) {
            hiddenElementsOnNullValue.forEach((elem) =>
              innerReplace = innerReplace.replace(new RegExp(escapeRegExp(elem.toString()), 'gm'), ''));
          }

          if (Array.isArray(data[templateValue])) {
            const containingTags = Array.from(templateElement.querySelectorAll('*'))
              .filter(el => el.innerText.includes(valueTag));

            let delimiter = ', ';
            if (containingTags && containingTags.length > 0) {
              delimiter = containingTags[0].getAttribute('data-delimiter') ?? delimiter;
            }
            innerReplace = innerReplace.replaceAll(valueTag, data[templateValue].join(delimiter));
          } else {
            innerReplace = innerReplace.replaceAll(valueTag, data[templateValue]);
          }
        })
        replace = replace + innerReplace;
      }));

    value = value.replaceAll(new RegExp(escapeRegExp(templateElement.toString()), 'gm'), replace);
  });
  return value;
}

function getAttributes(template) {
  return {
    dataSource: template.getAttribute('data-source'),
    sortedBy: template.getAttribute('data-sortby'),
    filteredByKey: template.getAttribute('data-filterbykey'),
    filteredByValue: template.getAttribute('data-filterbyvalue')
  }
}
function setAttributes(template, attributes) {
  if (attributes.dataSource) template.setAttribute('data-source', attributes.dataSource)
  if (attributes.sortedBy) template.setAttribute('data-sortby', attributes.sortedBy)
  if (attributes.filteredByKey) template.setAttribute('data-filterbykey', attributes.filteredByKey)
  if (attributes.filteredByValue) template.setAttribute('data-filterbyvalue', attributes.filteredByValue)
}

function parseGlyphs(value) {
  // Parse glyphs
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
  return value;
}

function escapeRegExp(string) {
  // Escape all special regex characters with a backslash
  return string.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
}

/**
 * Recursively parses and inserts pages references by <ins>-Tags in a file. This is a seperate step from all parsing
 * actions since any page content must be parsed *before* inserting pages into each other.
 *
 * @param content content map to be consumed (key = path, value = content)
 * @param done    callback function (error, result content map)
 */
const insertPages = function (content, done) {
  console.log("Inserting", content.size, "pages");

  // Init result map with content that does not have insert tags
  let result = new Map();
  new Map([...content]).forEach(function (v, k) {
    if (!v.match(new RegExp(insSelector, 'g'))) {
      result.set(k.replaceAll(locale.sep, '/'), v);
    }
  })

  let remaining = content.size - result.size;
  let oldRemaining = -1;
  while (remaining > 0) {
    let remainingContent = new Map();
    new Map([...content]).forEach(function (v, k) {
      if (!Array.from(result.keys()).includes(k.replaceAll(locale.sep, '/'))) {
        remainingContent.set(k.replaceAll(locale.sep, '/'), v);
      }
    });
    console.log('Inserting pages:', content.size - remainingContent.size, ' / ', content.size);

    if (remaining === oldRemaining) {
      done('Unable to parse pages: ' + Array.from(remainingContent.keys()).join(','))
    }
    oldRemaining = remaining;

    // Filter all remaining content with ins tags that are already in result map
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
          Number.parseInt(match.substring('data-depth=\"'.length, match.length - 1)))[0] ?? (insKey.match(new RegExp('/', 'g')) || []).length + 1

        const insData = '<h' + insDepth + ' id=' + insKey.substring(0, insKey.length - '.html'.length) + '>' + insHeading + '</h' + insDepth + '>\n' + result.get(insKey);
        value = value.replace(ins, insData ?? '');
      });
      result.set(key.replaceAll(locale.sep, '/'), value);
      remaining--;
    })
  }

  done(null, result);
}

const write = function (dir, content, done) {
  const dstPath = targetDir + locale.sep + dir;

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
walk(pagesSrcDir, function (err, results) {
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

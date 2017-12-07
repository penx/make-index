#!/usr/bin/env node

// get all modules from subdirs matching regex

var path = require("path");
var fs = require("fs");
var glob = require("glob");
var sprintf = require("sprintf-js").sprintf;

var linePattern = "export { %1$s } from './%2$s';\n";
var fromDir = 'src/components';
var indexFileName = 'index.js';
var subModuleGlob = '**/index.js';

var options = {
  cwd: path.join(process.cwd(),fromDir )
}

glob(subModuleGlob, options, function (er, paths) {
  var modules = paths.reduce((acc, p) => {

    var moduleName = path.basename(path.parse(p).dir);

    return {
      ...acc,
      [moduleName]: p
    }
  }, {})

  var indexFile = Object.keys(modules).reduce((acc, module) => {
    if(!module) {
      return acc
    }
    return `${acc}${sprintf(linePattern, module, modules[module])}`}, '')
  fs.writeFile(path.join(fromDir, indexFileName), indexFile, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

})

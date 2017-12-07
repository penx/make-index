# make-index

Create an index file containing exports for modules in sub folders.

## Usage

```
npm install make-index -g
cd src/components
make-index
```

Or add as an npm script, or as a step in your build script.

## Why?

This is useful in React when you

 - have a lot of components split in to types (components/containers or atoms/molecules)
 - want to make them all available from a single `import { ComponentName, AnotherComponent } from '../components'`
 - don't want to manually maintain a components index file.

## Example

Given a folder structure:

```
 src
   - components
     - AComponent
       - index.js
     - AnotherComponent
       - index.js
```

Running `make-index --d src/components`, will create a file at `src/components/index.js` with the contents:

```
// DO NOT EDIT - this file was generated by [make-index](https://github.com/penx/make-index)
export AComponent from './AComponent';
export AnotherComponent from './AnotherComponent';
```

## Assumptions

Usage assumes leaf folders are uniquely named throughout the tree (e.g. AComponent and AnotherComponent component in the example above).

# CLI

```
Usage: make-index [options]

  -d, --directory <directory>  The source directory to index, relative to the current working directory.
  -s, --source <source>        Glob for finding modules in the given directory.
                               (default: **/index.js)
  -t, --target <target>        The file to write to, relative to <source>.
                               (default: index.js)
  -h, --header <header>        String to prepend to top of generated file.
                               (default: // DO NOT EDIT - this file was generated by [make-index](https://github.com/penx/make-index))
  -l --line <line>             String template for each line, following sprintf format
                               (default: export %1$s from './%2$s';)
  -h, --help                   output usage information
```

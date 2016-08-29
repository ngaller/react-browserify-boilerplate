Sample React application using Redux, Browserify, Less and Mocha.

Use npm build to compile it, npm watch to run it, npm test to run the tests.

NPM Modules Used
----------------

 * babel: used for compilation
 * babelify: browserify for babel (used to package the app)
 * watchify, browser-sync: for live reload when developing
 * enzyme: for unit testing React components
 * expect.js: assertion library
 * furtive: simple CSS micro-framework (could replace with bootstrap)
 * gulp-stylus: used for SCSS compilation (could use gulp-less or gulp-sass instead, if desired)
 * gulp-autoprefixer: CSS auto prefix
 * gulp-sourcemaps: to generate source maps
 * react, react-dom: React base
 * react-redux, redux: For Redux
 * react-router: For React Router, if needed
 * mocha: for unit testing, note that "npm run test" will run the tests in node, 
    so functions that are only available in browsers won't be available.
    If we needed that, we could either create an HTML fixture file, or use a test
    runner such as Karma to generate it for us.



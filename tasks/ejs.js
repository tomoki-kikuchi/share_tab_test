import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import ejs from 'gulp-ejs';
import htmlbeautify from 'gulp-html-beautify';
import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
// import changedInPlace from 'gulp-changed-in-place';

import { isProduction, PATHS, GA_ACCOUNT, DOMAIN_URL, STG_DOMAIN_URL } from './config';

const fs = require('fs');
const jsonFilePath = './src/assets/json/pickup.json';

/**
 * EJSのビルドを実行する
 * @returns {*}
 */
export function ejsTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.docRoot;
  const domainUrl = isProduction ? STG_DOMAIN_URL : STG_DOMAIN_URL;
  const date = new Date().getTime();
  const pickupData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

  return (
    src([`${PATHS.src}/**/*.ejs`, `!${PATHS.src}/**/_*.ejs`])
      // .pipe(changedInPlace({ firstPass: true }))
      .pipe(
        plumber({
          errorHandler: notify.onError('<%- error.message %>'),
        })
      )
      .pipe(
        ejs({
          gaAccount: GA_ACCOUNT,
          domainUrl,
          date,
          pickupData,
        })
      )
      .pipe(
        htmlbeautify({
          /* eslint-disable camelcase */
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: 0,
          indent_inner_html: false,
        })
      )
      // プロダクション版はjsファイルとCSSファイルのパスを.minをつけたファイルに変更する
      .pipe(gulpIf(isProduction, replace('.css', '.min.css')))
      // .pipe(gulpif(isProduction, replace('.js', '.min.js')))
      .pipe(rename({ extname: '.html' }))
      .pipe(dest(outDir))
  );
  // .pipe(notify({ message: 'EJS task complete' }));
}

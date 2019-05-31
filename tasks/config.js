export const isProduction = process.env.NODE_ENV === 'production';

// 入出力パス
export const PATHS = {
  src: './src/',
  docRoot: './docRoot/',
  dest: './build/',
};

export const scripts = {
  srcRoot: `${PATHS.src}`,
  src: `${PATHS.src}js/**/*.js`,
  dest: `${PATHS.dest}`,
};

export const GA_ACCOUNT = 'UA-140420473-1';

// 本番用ドメイン
export const DOMAIN_URL = '/';
// ステージング用ドメイン
export const STG_DOMAIN_URL = '/';

// export const sass = {
//   src: `${PATHS.src}/scss/**/*.scss`,
//   dest: `${PATHS.src}/css`,
// };

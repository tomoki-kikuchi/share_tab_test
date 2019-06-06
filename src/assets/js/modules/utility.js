import $ from 'jquery';

/**
 * jsonのデータを取得する
 * @param _url
 * @returns {*}
 */
export function getJsonData(_url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: _url,
      dataType: 'json',
      cache: false,
      timeout: 15000,
    })
      .done(function(_data) {
        // console.log('json取得成功：' + _url);
        resolve(_data);
      })
      .fail(function(_data) {
        // console.log('json取得error：' + _url);
        reject(_data);
      })
      .always(function(_data) {
        // console.log('getJsonData()終了：' + _url);
      });
  });
}

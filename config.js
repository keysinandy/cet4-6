var apiUrl = "https://sanleisen.cn/1/index.php/Api"
var Url = "https://sanleisen.cn/API/index.php/API"
var appid = "wx18047a8e2fdde5ac"
var config = {
  Url,
  apiUrl,
  appid,
  wxUrl: `${Url}/Weixin/`,
  userUrl: `${Url}/User/`,
  rankUrl: `${Url}/User/rank`,
  collectUrl: `${Url}/Collectionlibrary/get_collectlist`,
  dorecordlistUrl: `${Url}/Dorecord/get_dorecordlist`,
  collectdetailUrl: `${Url}/Collectionlibrary/get_collectdetail`,
  dorecorddetailUrl: `${Url}/Dorecord/get_dorecorddetail`
};
module.exports = config
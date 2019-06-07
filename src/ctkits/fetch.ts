import wepy from 'wepy';
import config from '../config/index';

interface IFetch {
  url: string;
  method?: string;
  data?: Object;
  contentType?: string;
}

async function Common(params: IFetch) {
  let { url, data, method } = params;
  let methodUrl = config.my_host + url;
  let contentType = 'application/json; charset=utf-8';

  let loginInfo = wepy.getStorageSync('loginInfo');
  let session = loginInfo.session;
  let Charset = 'utf8';
  const header = {
    platform: 'wechat',
    Charset,
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'X-IM-Token': session,
    'X-IM-UserType': 122,
    Authorization: session
  };
  url = methodUrl;
  var result = null;

  return new Promise(resolve => {
    wx.request({
      url, //仅为示例，并非真实的接口地址
      header,
      method,
      data,
      success: (res) => {
        resolve(res)
      }
  })
  })
}

function fetch(params: IFetch) {
  return Common(params);
}

export default { fetch };

import wepy from 'wepy';
import config from '../config/index';

let hasShowToast = false;
interface AsyncResult<T> {
  res: T;
  err: Error;
  status: any;
  message: any;
}


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
  try {
    let result = await wepy.request({
      url,
      data,
      header,
      method,
      mode: 'cors',
      credentials: 'include'
    });
    let {
      data: { msg, data: responseData, status, message },
      statusCode
    } = result;

    if (statusCode >= 200 && statusCode < 300) {
      let ret: AsyncResult<T> = {
        res: responseData,
        err: status != '1' ? (msg ? new Error(msg) : null) : null,
        status,
        message
      };
      return ret;
    } else if (statusCode == 400) {
      let msgtext: string = message;
      //全局消息通知
      return { res: null, err: new Error(msgtext) };
    } else if (statusCode == 500) {
      return { res: null, err: new Error(msg) };
    } else if (statusCode == 401) {
      return { res: 401, err: new Error('401') };
    } else {
      let msgtext: string = '网络请求失败,请检查网络';
      //全局消息通知
      // msg.emit('app:toast', msgtext);
      return { res: null, err: new Error(msgtext) };
    }
  } catch (e) {
    if (!hasShowToast) {
      wepy.showToast({
        title: '网络繁忙，请稍后再试！',
        icon: 'none',
        duration: 2000
      });
      hasShowToast = true;
      setTimeout(() => {
        hasShowToast = false;
      }, 2000);
    }
  }
}

function fetch(params: IFetch) {
  return Common(params);
}

export default { fetch };

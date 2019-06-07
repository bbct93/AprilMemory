let device_platform = null;
let windowHeight = null;
let windowWidth = null;
let system_version = null;
let statusBarHeight = null;
let systemInfo = null;
let model = null;
// false--本地测试  true---腾讯云服务
let prod = false;

wx.getSystemInfo({
    success: function(res) {
      systemInfo = res;
      model = res.model;
      device_platform = res.platform;
      windowHeight = res.windowHeight;
      windowWidth = res.windowWidth;
      system_version = res.system.split(' ')[1];
      statusBarHeight = res.statusBarHeight;
    }
  });
const config = {
  my_host: prod ? 'http://www.ahbbct.cn' : 'http://ahbbct.cn:8080',
    // 当前设备名称
  device: model,
  // 当前设备系统
  device_platform,
  // 当前系统的版本号
  system_version,
  systemInfo,
  // 可使用窗口高度
  windowHeight,
  windowWidth,
  statusBarHeight,
  // 状态栏的高度加上小程序右上角icon的高度
  navigationHeight: statusBarHeight + 46
}

export default config;

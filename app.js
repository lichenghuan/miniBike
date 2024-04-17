import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // 这里请填入环境 ID, 环境 ID 可打开云控制台查看  
        // 如不填则使用默认环境（第一个创建的环境）  
        env: 'cloud1-5gadhcpyecc20c29',
        traceUser: true,
      });
    }

  },
  onShow: function () {
    updateManager();
  },
});
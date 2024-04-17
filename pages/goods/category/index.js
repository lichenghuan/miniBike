import {
  getCategoryList
} from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
  },
  async init() {

    console.log(666);
    wx.cloud.callFunction({
      name: 'bikeDataFunc',
    }).then(res => {
      console.log(res.result)
    }).catch(err => {})


    // try {
    //   const result = await getCategoryList();
    //   this.setData({
    //     list: result,
    //   });
    // } catch (error) {
    //   console.error('err:', error);
    // }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange() {
    wx.navigateTo({
      url: '/pages/goods/list/index',
    });
  },
  onLoad() {
    this.init(true);
  },
});
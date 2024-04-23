import {
  getCategoryList
} from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(e) {
    const {
      item
    } = e.detail;
    console.log(item._id);
    wx.navigateTo({
      url: `/pages/goods/details/index?bikeId=${item._id}`,
    });
    // wx.navigateTo({
    //   url: '/pages/goods/list/index',
    // });
  },
  onLoad() {
    this.init(true);
  },
});
Component({
  externalClasses: ['custom-class'],

  properties: {
    category: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        if (newVal[0] !== oldVal[0]) {
          this.initList(newVal)
        }
      },
    },
    initActive: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        if (newVal[0] !== oldVal[0]) {
          this.setActiveKey(newVal[0], 0);
        }
      },
    },
    isSlotRight: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    activeKey: 0,
    subActiveKey: 0,
    bikeInfoList: []
  },
  attached() {
    if (this.properties.initActive && this.properties.initActive.length > 0) {
      this.setData({
        activeKey: this.properties.initActive[0],
        subActiveKey: this.properties.initActive[1] || 0,
      });
    }
  },
  methods: {
    initList(arr, index = 0) {
      const getBikeInfoList = wx.cloud.callFunction({
        name: 'getBikeInfoListByBrandId',
        data: {
          brandId: arr[index]._id
        }
      }).then(res => {
        console.log(res.result);
        this.setData({
          bikeInfoList: res.result,
        });
      })
    },
    onParentChange(event) {
      this.setActiveKey(event.detail.index, 0).then(() => {
        this.triggerEvent('change', [
          this.data.activeKey,
          this.data.subActiveKey,
        ]);
      });
    },
    onChildChange(event) {
      console.log('onChildChange');
      this.setActiveKey(this.data.activeKey, event.detail.index).then(() => {
        this.triggerEvent('change', [
          this.data.activeKey,
          this.data.subActiveKey,
        ]);
      });
    },
    changCategory(event) {
      const {
        item
      } = event.currentTarget.dataset;
      this.triggerEvent('changeCategory', {
        item,
      });
    },
    setActiveKey(key, subKey) {
      console.log('setActiveKey');
      console.log(key);

      this.initList(this.properties.category, key)


      return new Promise((resolve) => {
        this.setData({
            activeKey: key,
            subActiveKey: subKey,
          },
          () => {
            resolve();
          },
        );
      });
    },
  },
});
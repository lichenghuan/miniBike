// 云函数入口文件
const cloud = require('cloudfunctions/getBikeInfoListByBrandId/node_modules/wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      _id,
      brandName,
      brandAlias,
      country
    } = event // 从event中获取查询参数 
    const db = cloud.database()
    await db.collection('bikeBrands').doc(_id).update({
      data: {
        brandName: brandName,
        brandAlias: brandAlias,
        country: country
      }
    })
    return {
      success: true,
      msg: '操作成功'
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      msg: '操作失败',
      info: error
    }
  }
}
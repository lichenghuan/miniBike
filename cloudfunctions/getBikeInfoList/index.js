// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数   根据公司id获取该公司下的所有自行车信息
exports.main = async (event, context) => {
  try {
    const {
      brandId,
      classify = ''
    } = event // 从event中获取查询参数 
    const db = cloud.database()
    const bikeInfo = await db.collection('bikeInfo').where({
      brandId: brandId
    }).get()
    return bikeInfo.data
  } catch (error) {
    console.error(err)
    return err
  }
}
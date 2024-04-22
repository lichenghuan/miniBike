// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {

    const {
      companyId,
      classify = ''
    } = event // 从event中获取查询参数 

    const db = cloud.database()
    const bikeInfo = await db.collection('bikeInfo').where({
      companyId: companyId
    }).get()

    return bikeInfo.data

  } catch (error) {
    console.error(err)
    return err
  }
}
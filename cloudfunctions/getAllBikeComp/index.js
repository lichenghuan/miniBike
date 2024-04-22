// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const db = cloud.database()
    const bikeCompanies = await db.collection('bikeCompanies').get()
    return bikeCompanies.data
  } catch (error) {
    console.error(err)
    return err
  }
}
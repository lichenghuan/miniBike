// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {

  try {
    const db = cloud.database()
    // Step 2: 查询categories集合找到分类名称对应的分类信息  
    const bikeCompanies = await db.collection('bikeCompanies').get()
    const bikeCompaniesData = bikeCompanies.data

    const bikeInfo = await db.collection('bikeInfo').where({
      companyId: bikeCompaniesData[0]._id
    }).get()
    const bikeInfoData = bikeInfo.data

    return {
      bikeCompanies: bikeCompaniesData,
      bikeInfo: bikeInfoData,
    }

  } catch (error) {
    console.error(err)
    return err
  }

  // try {
  //   const db = cloud.database()
  //   const collection = db.collection('bikeCompanies') // 替换为你的集合名称  
  //   const res = await collection.get()
  //   return res.data
  // } catch (err) {
  //   console.error(err)
  //   return err
  // }
}
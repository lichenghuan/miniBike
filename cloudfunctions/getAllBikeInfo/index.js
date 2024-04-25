// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      pageIndex = 1,
        pageSize = 10,
        name
    } = event

    const db = cloud.database()
    const collection = db.collection('bikeInfo') // 替换为你的集合名 
    const skip = (pageIndex - 1) * pageSize // 计算需要跳过的记录数  
    let where = {}; // 查询条件

    if (name) {
      where.name = db.RegExp({
        regexp: name,
        options: 'i', // 不区分大小写
      });
    }

    // 分页查询数据  
    const bikeInfo = await collection.where(where).skip(skip).limit(pageSize).get()

    // 获取集合中所有数据的条数  
    const totalCountRes = await collection.count()
    const totalCount = totalCountRes.total

    return {
      data: bikeInfo.data,
      totalCount: totalCount,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  } catch (error) {
    console.error(error)
    return error
  }
}
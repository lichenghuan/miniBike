// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境


// 云函数入口函数  获取所有自行车公司信息
exports.main = async (event, context) => {
  try {
    const {
      pageIndex = 1,
        pageSize = 10,
        brandName,
        brandAlias
    } = event

    const db = cloud.database()
    const collection = db.collection('bikeBrands') // 替换为你的集合名 
    const skip = (pageIndex - 1) * pageSize // 计算需要跳过的记录数  
    let where = {}; // 查询条件

    // 如果传入了品牌名，则构造品牌名模糊查询条件
    if (brandName) {
      where.brandName = db.RegExp({
        regexp: brandName,
        options: 'i', // 不区分大小写
      });
    }

    // 如果传入了品牌别名，则构造品牌别名模糊查询条件
    if (brandAlias) {
      where.brandAlias = db.RegExp({
        regexp: brandAlias,
        options: 'i', // 不区分大小写
      });
    }

    // 分页查询数据  
    const bikeBrands = await collection.where(where).skip(skip).limit(pageSize).get()

    // 获取集合中所有数据的条数  
    const totalCountRes = await collection.count()
    const totalCount = totalCountRes.total

    return {
      data: bikeBrands.data,
      totalCount: totalCount,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  } catch (err) {
    console.error(err)
    return err
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      brandId: brandId,
      name: name,
      classify,
      bikeFrame,
      price,
      wheelset,
      overallColor,
      size,
      speedClassify,
      weight,
      frontFork,
      handlebars,
      wheelMaterial,
      remark,
      frontDerailleur,
      rearDerailleur,
      shifter,
      bottomBracket,
      freewheel,
      crankset,
      chain,
      brakeType,
      hub,
      mainImglist,
      otherImglist,
    } = event // 从event中获取查询参数 
    const db = cloud.database()
    await db.collection('bikeInfo').add({
      data: {
        brandId: brandId,
        name: name,
        classify: classify,
        bikeFrame: bikeFrame,
        price: price,
        wheelset: wheelset,
        overallColor: overallColor,
        size: size,
        speedClassify: speedClassify,
        weight: weight,
        frontFork: frontFork,
        handlebars: handlebars,
        wheelMaterial: wheelMaterial,
        remark: remark,
        frontDerailleur: frontDerailleur,
        rearDerailleur: rearDerailleur,
        shifter: shifter,
        bottomBracket: bottomBracket,
        freewheel: freewheel,
        crankset: crankset,
        chain: chain,
        brakeType: brakeType,
        hub: hub,
        mainImglist: mainImglist,
        otherImglist: otherImglist,
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
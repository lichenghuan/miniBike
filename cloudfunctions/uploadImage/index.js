// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      imageBase64,
      cloudPath
    } = event;

    // 提取 Base64 编码部分（去掉 data:image/png;base64,）  
    let base64Data = imageBase64.split(',')[1];
    // 将 base64 转换为 buffer  
    const buffer = Buffer.from(base64Data, 'base64');

    // 上传到云存储  
    const result = await cloud.uploadFile({
      cloudPath, // 上传至云存储的路径  
      fileContent: buffer, // 文件内容，Buffer 类型  
    });
    // 返回 File ID  
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};
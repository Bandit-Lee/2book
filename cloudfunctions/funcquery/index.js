// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid
  try{
    return await db.collection('fabujilu').get()
  }catch(e){
    console.log(e)
  }
}
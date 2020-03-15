const http = require("request");
const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
let router = express.Router(); //路由组件,用于设置接口

const static = __dirname+"/../src/static";
module.exports = function (db) {
  router.post("/login",(req,res) => {   //登陆接口
    let serve = {req:req,res:res};
    /**
     * code
     */
    let code = req.body.code;
    http(
      "https://api.weixin.qq.com/sns/jscode2session?appid=wx884f2eefc5a7dbb1&secret=5757cb86ff90d7fb4a6bd1877a3eb063&js_code="+code+"&grant_type=authorization_code",
      (error, response , body) => {
        let userId = JSON.parse(body);
        if(!error && response.statusCode === 200) {
          // let sqlSql = "SELECT * from house_user WHERE openid = ?";
          let sqlSql = "update house_user set session_key = ? where openid = ?;"
          db.query(
            sqlSql,
            [userId.session_key,userId.openid],
            (err, res) => {
              if(err) throw err;
              if(res.affectedRows !== 0) {
                serve.res.send({
                  status: 200,
                  message: "恭喜,登陆成功",
                  data: userId
                })
              }else {
                registered(userId,function (data) {
                  serve.res.send({
                    status: 200,
                    message: "恭喜,注册成功",
                    data: userId
                  })
                })
              }
            }
          )
        }
      }
    )
  });
  router.post("/verification", (req, res) => {  //验证openid和会话秘钥
    let serve = {req: req, res: res};
    verification(req.body.openid,function (res) {
      serve.res.send({
        islogin: res.islogin
      });
    })
  });
  router.post("/releaseNew",(req, res) => {
    let that = this;
    releaseNew(req.body, (res)=> {
      that.send(res);
    })
  });
  router.post("/image",(req,res) => {
    var form = new formidable.IncomingForm();
    var data = new Date();
    form.encoding = 'utf-8';
    let month = (data.getMonth()+1) < 10 ? "0" + (data.getMonth()+1):(data.getMonth()+1);
    form.uploadDir = path.join(static + "/uploads/");
    // console.log(static + "/" + data.getFullYear() + month + data.getDate() + "/");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2*1024*1024;
    form.parse(req,function (err, fields, files) {
      let oldpath = files.image.path;
      let newpath = path.join(path.dirname(oldpath),files.image.name);
      // console.log(oldpath);
      // console.log(newpath);
      let downUrl = "http://localhost:3030/"
      // var filename = files.the_file.name;
      var filename =oldpath.split("\\")[oldpath.split("\\").length-1];
      res.send({
        status_code: 200,
        path: "../../static/uploads/"+filename
      })
      // var nameArray = filename.split('.');
      // var type = nameArray[nameArray.length - 1];
      })
  });
  return router;
  function registered(userId,success) {
    /**
     * 进行验证
     * userId: 验证的数据
     * success: 成功的回调 res.islogin 验证是否正确
     */
    let sqlSql = "INSERT into house_user (openid,session_key) VALUES (?,?);";
    db.query(
      sqlSql,
      [userId.openid,userId.session_key],
      function (err, res) {
        if(err) throw err;
        if(res.affectedRows > 0) {
          success(res);
        }
      }
    )
  }
  function verification(data,fn) {   //查找session_key获取openid
    let sqlSql = "select * from house_user where session_key = ? and openid = ?;";
    db.query(
      sqlSql,
      [data.session_key,data.openid],
      (err, res) => {
        if(err) throw err;
        if(res.length > 0) {
          fn({
            islogin: true,
            message: "用户存在"
          })
        }else {
          fn({
            islogin: false,
            message: "用户不存在"
          })
        }
      }
    )
  }
  function releaseNew(data,success) {     //发布公告
    let sqlSql = "INSERT into news(title,content,suctionID) VALUES (?,?,?);";
    db.query(
      sqlSql,
      [data.title,data.content,data.suctionID],
      (err, res) => {
        if(err) throw err;
        if(res.length > 0) {
          success({
            status_code: 200,
            message: "成功"
          })
        }
      }
    )
  }
};


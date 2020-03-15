const express = require("express");
let router = express.Router(); //路由组件,用于设置接口

module.exports = function(db) {
  router.post("/login", (req, res) => {
    login(req.params,data => res.send(data));
  });
  router.post("/registered", (req, res) => {
    registered(req.params, data => res.send(data));
  });
  router.post("/modify", (req, res) => {
    modify(req.params, data => res.send(data));
  });
  router.get("/news", (req,res) => {
    news(req.query.id, (data) => {
      res.send(data);
    })
  });
  return router;
  function login(data, fn) {
    let sqlSql= "SELECT into from house where `master` = ? AND `password` = ?";
    db.query(
      sqlSql,
      [data.user,data.password],
      (err,res) => {
        if(err) throw err;
        if(res.affectedRows > 0) {
          fn({ status: 200, message: "登录成功", data: data })
        } else {
          fn({ status: 201, message: "登陆失败"})
        }
      }
    )
  }
  function registered(data,fn) {
    selecUser(data.user, (res) => {
      if(res) {
        fn({ status: 202, message: "已被注册"})
      }else {
        fn2();
      }
    });
    function fn2() {
      let sqlSql= "insert into house (master,password,name,address) values (?,?,?,?);";
      db.query(
        sqlSql,
        [data.user,data.password,data.name,data.address],
        (err,res) => {
          if(err) throw err;
          else {
            if (res.affectedRows > 0) {
              fn.send({
                status: 200,
                message: "恭喜,注册成功",
                data: res
              });
            } else {
              fn.send({
                status: 201,
                message: "注册失败,请再试一遍",
                data: res
              });
            }
          }
        }
      )
    }
  }
  function modify(data, fn) {
    login(data,(res) => {
      if(res === 200) {
        console.log(data);
      }
    })
  }
  function selecUser(user,fn) {
    let sqlSql = "SELECT into from house where `master` = ?";
    db.query(
      sqlSql,
      user,
      (err, res) => {
        if(err) throw err;
        if(res.affectedRows > 0) {
          fn(true);
        } else {
          fn(false);
        }
      }
    )
  }
  function news(id, success) {
    let sqlSql = "SELECT * from news where news.`id` = ?;";
    db.query(sqlSql,id,(err, res) => {
      if(err) throw err;
      if(res.length > 0) {
        news_read(id);
        let info = res[0];
        selectUser(info.suctionID, user => {
          let user_info = user[0];
          let data = {
            status_code: 200,
            message: "成功",
            title: info.title,
            like: info.like,
            extras: [{
              content_type: "base",
              content: info.content,
              created_at: info.created_at
            }],
            created_at: info.created_at,
            reading: info.clickedTimeint,
            user: {
              openId: info.suctionID,
              expired_time: user_info.openid,
              name: user_info.name,
              type: "manager",
              created_at: info.created_at,
              avatar: user_info.head_portrait
            }
          };
          success({
            data: data
          })
        })
      }
    })
  }
  function selectUser(id, success) {
    let sqlSql = "SELECT * from house_user WHERE openid = ?;";
    db.query(
      sqlSql,
      id,
      (err, res) => {
        if(err) throw err;
        if(res.length > 0) {
          success(res);
        }
      }
    )
  }
  function news_read(id) { //阅读添加
    let sqlSql = "UPDATE news set clickedTimeint = clickedTimeint+1 where news.`id` = ?;";
    db.query(
      sqlSql,
      id,
      (err, res) => {
        if(err) throw err;
      }
    )
  }
};

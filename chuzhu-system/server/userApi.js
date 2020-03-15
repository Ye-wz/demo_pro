const express = require("express");
let router = express.Router(); //路由组件,用于设置接口
module.exports = function(db) {
  router.post("/login", (req, res) => {
    let selSql =
      "select * from user where user= ?";
    db.query(
      selSql,
      req.body.user,
      (err, data) => {
        if (err) {
          res.send({ status: 401, message: "系统出错,请稍后尝试", data: err });
        } else {
          if (data.length === 1) {
            res.send({ status: 200, message: "登录成功", data: data });
          } else {    //查询为新手机号,进行注册
            let selSql =
              "insert into user (user,userName) values (?,?)";
            db.query(
              selSql,
              [req.body.user,req.body.user],
              (err,result) => {
                if (err) throw err;
                else {
                  if (result.affectedRows > 0) {
                    res.send({
                      status: 200,
                      message: "恭喜,注册成功",
                      data: result
                    });
                  } else {
                    res.send({
                      status: 201,
                      message: "注册失败,请再试一遍",
                      data: result
                    });
                  }
                }
              }
            )
          }
        }
      }
    );
  });
  return router;
};

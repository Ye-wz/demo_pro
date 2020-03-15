const connec = require("./connec");

const userApi = require("./userApi");
const goodsApi = require("./goodsApi");
const administrator = require("./administrator");
const userRoute = userApi(connec);
const goodsRoute = goodsApi(connec);
const adminRoute = administrator(connec);

const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
const static =  path.join(__dirname, "../src/static");
app.use(express.static(static));
//设置静态资源
app.all("*",function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin","*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers","content-type");
	//跨域允许的请求方式
	res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == 'options')
		res.send(200);  //让options尝试请求快速结束
	else
		next();
});

// app.all("/image/*",function (req, res) {
//   var filename = req.url.split('/')[req.url.split('/').length-1];
//   var suffix = req.url.split('.')[req.url.split('.').length-1];
//   console.log(suffix)
//   if(req.url === '/image/'){
//   }
// });
//静态资源设置
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/user", userRoute);
app.use("/goods", goodsRoute);
app.use("/administrator", adminRoute);
app.get("*", (req, res) => {
	res.send({status: 200,message: "未知请求"});
});
app.listen(3030, () => {
  console.log("启动成功");
	console.log("快速访问-> http://localhost:3030");
});

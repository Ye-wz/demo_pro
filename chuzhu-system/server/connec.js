const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  port: "3306",
  database: "shouzhu"
});
connection.connect(function(error) {
  if (error) throw error;
  // eslint-disable-next-line no-console
  console.log("数据库连接成功");
});
module.exports = connection;

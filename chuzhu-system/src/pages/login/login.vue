<template>
  <view class="content">
    <text>输入手机号</text>
    <br/>
    <input placeholder="请输入手机号" class="login-input" v-model="phoneNum"><br>
    <text v-if="!isPhone" class="isPhone">不正确的手机号</text>
    <button type="primary" size="mini" @click="logSub">确定</button>
  </view>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        phoneNum: "",
        isPhone: true,
      }
    },
    methods: {
      logSub() {
        let that = this;
        if (!(that.isPhone && this.phoneNum)) {
          return;
        }
        uni.request({
          url: "http://localhost:3030/user/login",
          method: "POST",
          data: {user: that.phoneNum},
          success(res) {
            console.log(res);
            uni.setStorage({
              key: "user",
              data: that.phoneNum,
              success: function () {
                uni.switchTab({
                    url: "/pages/my-user/my-user"
                })
              }
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    },
    watch: {
      phoneNum(val) {
        this.isPhone = /^1[0-9]{10}$/.test(val);
      }
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    background: #2ec7ff;
    text-align: center;
    padding-top: 60%;
  }

  .login-input {
    border: 1px solid black;
    display: inline-block;
    width: 60%;
    background: white;
  }

  .isPhone {
    color: #ff4000;
    font-size: 14px;
    font-weight: 600;
    display: block;
  }
</style>

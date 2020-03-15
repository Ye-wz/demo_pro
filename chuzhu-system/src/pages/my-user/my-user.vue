<template>
  <view class="content">
    <view class="user-head">
      <image src="../../static/userbj.png" class="user-head-bj"/>
      <view class="user-info-X">
        <view class="user-port-X"><image src="../../static/tx.jpg" class="user-port"/></view>
        <text class="user-info-name">{{user}}</text>
      </view>
    </view>
    <view class="user-main">
      <view class="user-main-li">测试</view>
      <view class="user-main-li">测试</view>
      <navigator class="user-main-li" url="../calendar/calendar">日历</navigator>
      <view class="user-main-li" @click="logout">注销</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-user",
    data() {
      return {
        user: "用户名"
      }
    },
    onShow() {
      let that = this;
      uni.getStorage({
        key: "user",
        success(res) {
          that.user = res.data;
        },
        fail() {
          uni.redirectTo({
            url: "/pages/login/login",
            fail(res) {
              console.log(res);
            }
          })
        }
      })
    },
    methods: {
      logout() {
        uni.removeStorage({
          key: "user",
          success(res) {
            uni.switchTab({
              url: "/pages/index/index"
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .user-head {
    text-align: center;
  }
  .user-head-bj {
    width: 100%;
    max-height: 350rpx;
    background-size: 100%;
    margin-bottom: -120rpx;
    position: relative;
    z-index: -50;
  }
  .uni-color-title {
    background: black;
  }
  .user-info-X {
    padding-top: 1px;
    border-radius: 5px;
    width: 70%;
    background: #ffffff;
    margin: 0 auto;
  }
  .user-port-X {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: auto;
    margin-top: -50rpx;
  }
  .user-port {
    width: 100%;
    height: 100%;
  }
  .user-info-name {
    font-size: 14px;
  }
  page {
    background: #f7f7f7;
    z-index: -100;
    position: relative;
  }
  .user-main {
    margin-top: 60rpx;
    font-size: 14px;
    border-bottom: 1px solid #999;
    color: #666;
  }
  .user-main-li {
    background: #ffffff;
    border-top: 1px solid #999;
    padding: 20rpx 20rpx;
  }
</style>

<template>
    <view class="content">
      <view class="bill-head">
        <uni-search-bar
          placeholder="订单编号/时间"
          cancelButton="none"
          class="bill-head-search"
          maxlength=70
        />
        <view class="bill-head-tab">
          <view class="bill-head-tab-li" :class="{select:tabs_select === index}" v-for="(item,index) in tabs" @click="tab(index)">{{item}}</view>
        </view>
      </view>
      <view class="bill-main">
        <view class="bill-main-li" v-for="item in 2">
          <view class="bill-main-li-title">
            <text class="bill-main-li-title-left">账单</text>
            <text class="bill-main-li-status">待付款</text>
          </view>
          <view class="bill-main-li-info">
            <view class="bill-main-li-info-p">
              <text class="bill-mian-li-info-p-left">名称:</text>
              <text class="bill-mian-li-info-p-right">叶先生</text>
            </view>
            <view class="bill-main-li-info-p">
              <text class="bill-mian-li-info-p-left">时间:</text>
              <text class="bill-mian-li-info-p-right">2020/2/19</text>
            </view>
          </view>
          <view class="bill-main-li-oper-X">
            <text class="bill-main-li-price">
              199.00
            </text>
            <view class="bill-main-li-oper-right">
              <view class="cs-button">取消订单</view>
              <view class="cs-button cs-theme-cyan-blue">付款</view>
            </view>
          </view>
          <view class="bill-dividing"></view>
        </view>
      </view>
    </view>
</template>

<script>
  import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
    export default {
      name: "bill",
      components : {
          uniSearchBar
      },
      data() {
        return {
          tabs: ["全部账单","待付款","未出账","已完成"],
          tabs_select: 0
        }
      },
      methods: {
        tab(index) {
          this.tabs_select = index;
          console.log(this.tabs_select)
        }
      }
    }
</script>

<style scoped>
  page {
    background: #f7f7f7;
  }
  .bill-head {
    background: white;
  }
  .bill-head-tab {
    display: flex;
    justify-content: space-around;
    font-size: 30rpx;
    color: #666;
    font-weight: 500;
  }
  .bill-head-tab-li {
    padding: 10rpx 0;
    margin-top: 2px;
  }
  .bill-head-tab-li.select {
    color: rgb(40, 109, 226);
  }
  .bill-main-li-status {
    float: right;
    color: goldenrod;
    font-weight:500;
  }
  .bill-main-li-title {
    padding: 10rpx 30rpx;
    font-weight: 600;
    font-size: 16px;
  }
  .bill-main {
    background: white;
    margin-top: 20rpx;
  }
  .bill-main-li-info {
    background: #f8f8f8;
    padding: 10rpx 30rpx;
    font-size: 14px;
    color: #999;
  }
  .bill-main-li-info-p {
    padding: 5rpx 0;
  }
  .bill-mian-li-info-p-left {
    display: flex;
    float: left;
    width: 100rpx;
    justify-content: space-around;
  }
  .bill-main-li-price:before {
    content: "￥";
    font-size: 28rpx;
  }
  .bill-main-li-oper-X {
    padding: 0 30rpx;
    line-height: 2.3;
  }
  .bill-main-li-oper-right {
    float: right;
    line-height: 2;
  }
  .bill-main-li-oper-right .cs-button {
    margin-left: 30rpx;
    font-size: 26rpx;
  }
  .bill-dividing {
    height: 2px;
    background: #f7f7f7;
  }
</style>

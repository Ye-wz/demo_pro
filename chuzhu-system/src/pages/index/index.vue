<template>
	<view class="content">
		<view class="index-head">
			<view class="index-head-search">title</view>
			<view class="index-head-right">
				<navigator>
					<text class="iconfont">&#xe60d;</text>
				</navigator>
				<navigator>
					<text class="iconfont icon-xiaoxi"></text>
				</navigator>
			</view>
		</view>
		<view class="index-swiper">
			<indexSwiper />
		</view>
		<view class="index-bulletin">
			<view class="index-bulletin-title">
				<text class="index-bulletin-title-text">公告</text>
				<text class="index-bulletin-main-title-move">更多<text class="iconfont">></text></text>
			</view>
			<navigator class="index-bulletin-main" url="../articleDetail/articleDetail">
				<view class="index-bulletin-main-left">
					<view class="index-bulletin-main-title">
						家装触网是馅饼还是大坑 四万亿家装赛道谁能笑到最后
					</view>
					<view class="index-bulletin-main-info">
						<text class="index-bulletin-main-info-read">1872</text>
						<text class="index-bulletin-main-info-date">2017/09/12</text>
					</view>
				</view>
				<view class="index-bulletin-main-img">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582520088289&di=84d19671a87215c766448d7bd643c323&imgtype=0&src=http%3A%2F%2Ffiles.xubei.com%2FsafeguardRights-img%2Fa9feddeb8c8c466e85d16c469c860c98.jpg" />
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import indexSwiper from '../../components/index-swiper-tab/index-swiper-tab';
	export default {
		data() {
			return {

			}
		},
		components: {indexSwiper},
		onLoad() {

		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style scoped>
	image {
		width: 100%;
		height: 100%;
	}
	.content {
		text-align: center;
		height: 400upx;
		padding: 0 20rpx;
	}
	.index-head {
		display: flex;
	}
	.index-head-search {
		width: 80%
	}
	.index-head-right {
		width: 20%;
		display: flex;
		justify-content: space-evenly;
	}
	.index-head-right .iconfont {
		font-size: 40rpx;
	}
	.index-bulletin {
		border-top: 1px solid #ddd;
	}
	.index-bulletin-title {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.index-bulletin-title-text {
		font-weight: 600;
	}
	.index-bulletin-main-title-move {
		color: #999999;
		line-height: 1.8;
		font-size: 26rpx;
	}
	.index-bulletin-main-title-move .iconfont {
		font-size: 24rpx;
	}
	.index-bulletin-main {
		padding: 20rpx 0;
		display: flex;
		height: 140rpx;
		justify-content: space-between;
	}
	.index-bulletin-main-left {
		font-size: 15px;
		text-align: left;
		position: relative;
	}
	.index-bulletin-main-info {
		width: 100%;
		position: absolute;
		bottom: 0;
		font-size: 20rpx;
		color: #999;
	}
	.index-bulletin-main-info-date {
		float: right;
	}
	.index-bulletin-main-info-read {

	}
	.index-bulletin-main-info-read:after {
		margin-left: 0.5em;
		content: "阅读";
	}
	.index-bulletin-main-img {
		margin-left: 20rpx;
		width: 40%;
		border-radius: 10px;
		overflow: hidden;
	}
	.index-swiper {
		margin: 0 -20rpx;
	}
</style>

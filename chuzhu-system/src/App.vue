<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
    @import "./static/iconfont/iconfont.css";
	/*每个页面公共css */
    .cs-button {
        line-height: 2.3;
        display: inline-block;
        font-size: 28rpx;
        border: 1px solid #999;
        padding: 0 20rpx;
        border-radius: 3px;
    }
    .cs-theme-cyan-blue {
        color: #16a8c3;
        border-color: #16a8c3;
    }
</style>

<template>
    <view class="content">
        <uni-swiper-dot :info="infos" mode="round" :current="swiper_index">
            <swiper @animationfinish="changeIndex">
                <swiper-item><view class="swiper-slide">1</view></swiper-item>
                <swiper-item><view class="swiper-slide">2</view></swiper-item>
                <swiper-item><view class="swiper-slide">3</view></swiper-item>
            </swiper>
        </uni-swiper-dot>
    </view>
</template>

<script>
    import uniSwiperDot from '@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue';
    export default {
        name: "index-swiper-tab",
        components: {uniSwiperDot},
        data() {
            return {
                infos: [
                    {content: 1},
                    {content: 2},
                    {content: 3}
                ],
                swiper_index: 0
            }
        },
        methods: {
            changeIndex(s) {
                this.swiper_index=s.detail.current;
            }
        }
    }
</script>

<style scoped>
    view.content {
        padding: 0 ;
    }
    .swiper-slide {
        width: 90%;
        height: 100rpx;
        background: green;
        margin: auto;
    }
</style>
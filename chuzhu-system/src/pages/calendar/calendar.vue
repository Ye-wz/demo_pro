<template>
    <view class="content">
        <Calendar />
    </view>
</template>

<script>
    import Calendar from "../../components/mobile-calendar-simple/Calendar"
    export default {
        name: "Clendar",
        components: {
            Calendar
        },
        data() {
            return {
                selectInfo: [{
                    date: "2020/2/25",
                    info: "测试",
                    data : {
                        custom: "自定义信息",
                        name: "自定义消息头"
                    }
                }]
            }
        },
        methods: {
            changeData(e) {
                console.log(1,e)
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <!-- 头文件 -->
        <head-top></head-top>
        <!-- 中间文字信息 -->
        <section class="data_section">
            <header class="home-header" style="padding-bottom: 2%">数据统计</header>
            <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="4" style="margin-left: 2%;" class="home-el-one"><span
                        class="home-el-one-span-one">当日数据</span></el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 2%">
                <el-col :span="4" style="margin-left: 2%;" class="home-el-two"><span
                        class="home-el-one-span-one">总数据</span></el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="home-el"> 新增用户:<span class="home-el-three">11</span></div>
                </el-col>
            </el-row>
        </section>
        <!-- 图形显示 -->
        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>

        <div class="home-div">
            <p class="home-p">我得测试学习项目</p>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import tendency from '../components/tendency'

    export default {
        data() {
            return {
                sevenDay: [],
                sevenDate: [[], [], []],
            }
        },
        components: {
            headTop,
            tendency
        }
    }
</script>

<style scoped lang="less">
    .home-div {
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 30px;
        background-color: seashell;
        z-index: 9999;

        .home-p {
            padding-top: 5px;
            padding-left: 40%;
            font-size: 10px;
            color: slategray;
            font-family: 微软雅黑;
        }
    }

    .data_section {
        padding-top: 10px;

        .home-header {
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            font-family: 微软雅黑;
            color: coral;
            margin-bottom: 10px;
        }
    }

    .home-el {
        text-align: center;
        font-size: 22px;
        border-radius: 6px;
        background: cornsilk;
        color: burlywood;
    }

    .home-el-three {
        border-radius: 6px;
        font-size: 22px;
        padding: 4px 0;
        color: red;
        display: inline-block;
    }

    .home-el-two {
        text-align: center;
        font-size: 14px;
        border-radius: 6px;
        background: coral;
    }

    .home-el-one {
        text-align: center;
        font-size: 14px;
        border-radius: 6px;
        background: skyblue;
    }

    .home-el-one-span-one {
        border-radius: 6px;
        font-size: 22px;
        padding: 4px 0;
        color: #fff;
        display: inline-block;
    }
</style>
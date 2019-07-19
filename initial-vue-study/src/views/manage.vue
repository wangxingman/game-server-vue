<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color:darkgray;">
                <el-menu style="min-height: 100%;" background-color="silver"
                         text-color="navy" theme="dark" router>
                    <el-menu-item><i class="el-icon-menu"></i><span
                            style="color: black;font-weight: bold;font-size: 18px">首页</span></el-menu-item>
                    <template v-for="menu in menus">

                        <el-menu-item  :index="menu.id.toString()"  @click="goRouter(menu.path)" v-if="menu.length==0"   v-bind:key="menu.id">
                            <template slot="title"><i class="el-icon-document"></i><span
                                    style="color: black;font-weight: bold;font-size: 15px">{{menu.label}}</span>
                            </template>
                        </el-menu-item>

                        <el-submenu :index="menu.id.toString()"  @click="goRouter(menu.path)" v-bind:key="menu.id" v-else >
                            <template slot="title">
                                 <span><i class="el-icon-document"></i><span
                                         style="color: black;font-weight: bold;font-size: 15px">{{menu.label}}</span></span>
                            </template>
                            <!--下面的子菜单 -->
                            <el-menu-item v-for="menu1 in menu.children" @click="goRouter(menu1.path)" :index="menu.id.toString()" v-bind:key="menu1.id" >
                                <span style="color: black;font-size: 15px">{{menu1.label}}</span>
                            </el-menu-item>
                        </el-submenu>

                    </template>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "manage",
        computed: {
            menus() {
                return this.$store.state.main.menus;
            },
        },
        methods: {
            ...mapActions([]),
            goRouter(path) {
                window.console.log("-0-------------------");
                this.$router.push(path)
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {
    }
</style>

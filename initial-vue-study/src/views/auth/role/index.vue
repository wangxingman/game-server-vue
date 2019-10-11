<template>

    <div>
        <headTop></headTop>
        <!-- 搜索框 -->
        <top></top>
        <!-- 栅格间隔 -->
        <el-row :gutter="15" style="margin:30px 0px 0px 25px ">
            <!--角色管理-->
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17">
                <!-- el-card里面存放 -->
                <el-card shadow="never">
                    <!-- 按钮 列表 slot="header"头 画了一条分界线-->
                    <div slot="header">
                        <span class="role-span">角色列表</span>
                        <div id="opt" style="float: right">
                            <el-radio-group v-model="opt" size="mini">
                                <el-radio-button label="菜单分配"/>
                                <el-radio-button label="权限分配"/>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 表单页面  highlight-current-row 单选属性-->
                    <el-table v-loading="loading" :data="roleData" highlight-current-row size="small"
                              style="width: 100%;" @current-change="handleCurrentChangeRow">
                        <el-table-column prop="name" label="名称"/>
                        <el-table-column prop="dataScope" label="数据权限"/>
                        <el-table-column prop="level" label="角色级别"/>
                        <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>
                        <el-table-column prop="createTime" label="创建日期">
                            <template slot-scope="scope">
                                <span>{{ parseTime(scope.row.createTime) }}</span>
                            </template>
                        </el-table-column>

                        <!--查找权限 显示修改 添加菜单-->
                        <el-table-column label="操作" align="center">
                            <template style="margin-right: 30px " slot-scope="scope">
                                <edit :data="scope.row"/>
                                <!-- 弹出框 placement出现位置-->
                                <el-popover
                                        :ref="scope.row.id"
                                        placement="top"
                                        width="180">
                                    <p>确定删除本条数据吗？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消
                                        </el-button>
                                        <el-button :loading="delLoading" type="primary" size="mini"
                                                   @click="subDelete(scope.row.id)">确定
                                        </el-button>
                                    </div>
                                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                                </el-popover>
                            </template>
                        </el-table-column>

                    </el-table>
                    <!--分页组件-->
                    <el-pagination style="margin: 30px 0px 0px 0px "
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[5, 10]"
                                   :page-size="PageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount">
                    </el-pagination>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">

                <!-- 菜单分配 -->
                <el-card v-show="opt === '菜单分配'" shadow="never">
                    <div slot="header">
                        <!-- 选择按钮提示 -->
                        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                            <span class="role-span">菜单分配</span>
                        </el-tooltip>
                        <!--点击后显示按钮-->
                        <el-button :disabled="!showButton"
                                   :loading="menuLoading"
                                   icon="el-icon-check"
                                   size="mini"
                                   style="float: right; padding: 6px 9px"
                                   type="primary"
                                   @click="saveMenu">保存
                        </el-button>
                    </div>
                    <!-- show-checkbox 节点是否可被选择-->
                    <!-- accordion 是否每次只打开一个同级树节点展开-->
                    <!--node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的-->
                    <el-tree
                            ref="menu"
                            :data="menus"
                            :default-checked-keys="menuIds"
                            :props="defaultProps"
                            accordion
                            show-checkbox
                            node-key="id"
                    />
                </el-card>

                <!-- 权限分配 -->
                <el-card v-show="opt === '权限分配'" shadow="never">
                    <div slot="header">
                        <el-tooltip effect="dark" content="选择指定角色分配权限" placement="top">
                            <span class="role-span">权限分配</span>
                        </el-tooltip>
                        <el-button
                                :disabled="!showButton"
                                :loading="permissionLoading"
                                icon="el-icon-check"
                                size="mini"
                                style="float: right; padding: 6px 9px"
                                type="primary"
                                @click="savePermission">保存
                        </el-button>
                    </div>
                    <el-tree
                            ref="permission"
                            :data="permissions"
                            :default-checked-keys="permissionIds"
                            :props="defaultProps"
                            show-checkbox
                            accordion
                            node-key="id"/>
                </el-card>
            </el-col>
        </el-row>
        <end></end>
    </div>

</template>

<script>
    import headTop from '../../../components/headTop'
    import end from '../../../components/end'
    import edit from './module/edit'
    import top from './module/top'
    import RoleApi from '../../../api/roleApi'
    import {parseTime} from '../../../utils/index'
    import menuApi from '../../../api/menuApi'
    import permissionApi from '../../../api/permissionApi'

    export default {
        name: "index",
        created() {
            this.initData();
            this.getPermissions()
            this.getMenus()
        },
        data() {
            return {
                currentId: 0,
                delLoading: false,
                loading: false,
                roleData: [], //角色数据
                opt: '菜单分配',
                showButton: false,
                menuLoading: false,
                permissionLoading: false,
                menus: [],
                menuIds: [],
                permissions: [],
                permissionIds: [],
                // 默认显示第几页
                currentPage: 0,
                // 默认每页显示的条数（可修改）
                PageSize: 5,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [1, 2, 3, 4],
                defaultProps: {
                    children: 'children', // 指定子树为节点对象的某个属性值
                    label: 'label'        //指定节点标签为节点对象的某个属性值
                },
            }
        },
        components: {
            headTop,
            end,
            edit,
            top
        },
        methods: {
            parseTime,
            initData() {
                RoleApi.findBySearchAll(this.currentPage, this.PageSize).then(({data}) => {
                    if (data.success) {
                        this.roleData = data.data.roles;
                    }
                    // 将数据的长度赋值给totalCount
                    this.totalCount = data.data.count
                })
            },
            getMenus() {
                menuApi.findAllMenu().then(({data}) => {
                    if (data.success) {
                        this.menus = data.data
                    }
                });
            },
            getPermissions() {
                permissionApi.findAllPermission().then(({data}) => {
                    if (data.success) {
                        this.permissions = data.data
                    }
                });
            },
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 点击每页显示的条数时，显示第一页
                this.initData(val, 1)
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage = val - 1
                // 切换页码时，要获取每页显示的条数
                this.initData(this.currentPage, 5)
            },
            subDelete(id) {
                this.delLoading = true
                RoleApi.delByrole(id).then(res => {
                    this.delLoading = false
                    if (res.data.success) {
                        this.$refs[id].doClose()
                        this.$notify({
                            title: '删除成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.initData();
                    } else {
                        this.$refs[id].doClose()
                        this.$notify({
                            title: '删除失败',
                            type: 'ware',
                            duration: 2500
                        })
                    }
                })
            },
            handleCurrentChangeRow(val) {
                if (val) {
                    const _this = this
                    //通过key设置结点选中
                    this.$refs.permission.setCheckedKeys([])
                    this.$refs.menu.setCheckedKeys([])
                    // 点击后显示按钮
                    this.showButton = true
                    // 保存当前的角色id
                    this.currentId = val.id
                    // 初始化
                    this.menuIds = []
                    this.permissionIds = []
                    // 菜单数据需要特殊处理
                    val.menus.forEach(function (data) {
                        let add = true
                        for (let i = 0; i < val.menus.length; i++) {
                            if (data.id === val.menus[i].pid) {
                                add = false
                                break
                            }
                        }
                        if (add) {
                            window.console.info("--menuIds--sss"+data.id);
                            _this.menuIds.push(data.id)
                        }
                    })
                    // 处理权限数据
                    val.permissions.forEach(function (data, index) {
                        window.console.info(index);
                        _this.permissionIds.push(data.id)
                    })
                }
            },
            update() {
                // 无刷新更新 表格数据
                RoleApi.findByOne(this.currentId).then(res => {
                    for (let i = 0; i < this.roleData.length; i++) {
                        if (res.id === this.roleData[i].id) {
                            this.roleData[i] = res
                            break
                        }
                    }
                })
            },
            savePermission() {
                window.console.info("又走这个方法吗？");
                this.permissionLoading = true;
                const role = {
                    id: this.currentId
                    , permissions: []
                };
                //获取选中的值
                this.$refs.permission.getCheckedKeys().forEach((data) => {
                    const permission = {id: data};
                    role.permissions.push(permission);
                })
                RoleApi.updateByRolePermission(role).then(res => {
                    if (res.data.success) {
                        this.$notify({
                            title: '保存成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.permissionLoading = false
                        this.update()
                    }
                }).catch(err => {
                    this.permissionLoading = false
                    window.console.log(err.response.data.message)
                })
            },
            saveMenu() {
                this.menuLoading = true
                const role = {
                    id: this.currentId,
                    menus: []
                }
                // 得到半选的父节点数据，保存起来
                this.$refs.menu.getHalfCheckedNodes().forEach(function (data) {
                    const menu = {id: data.id}
                    role.menus.push(menu)
                })
                // 得到已选中的 key 值
                this.$refs.menu.getCheckedKeys().forEach(function (data) {
                    const permission = {id: data}
                    role.menus.push(permission)
                })
                RoleApi.updateByRoleMenu(role).then(res => {
                    if (res.data.success) {
                        this.$notify({
                            title: '保存成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.menuLoading = false
                        this.update()
                    }
                }).catch(err => {
                    this.menuLoading = false
                    window.console.log(err.response.data.message)
                })
            },
        }
    }
</script>

<style scoped>
    .role-span {
        font-weight: bold;
        color: #303133;
        font-size: 15px;
    }
</style>

<template>
    <el-dialog :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" append-to-body width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;"/>
            </el-form-item>
            <el-form-item label="角色级别" prop="sort">
                <el-input-number v-model.number="form.level" :min="1" controls-position="left" style="width: 370px;"/>
            </el-form-item>

            <el-form-item label="数据范围">
                <el-select v-model="form.dataScope" style="width: 370px" placeholder="请选择数据范围" @change="changeScope">
                    <el-option
                            v-for="item in dateScopes"
                            :key="item"
                            :label="item"
                            :value="item"/>
                </el-select>
            </el-form-item>

            <!--有该条件显示-->
            <el-form-item v-if="form.dataScope === '自定义'" label="数据权限">
                <treeselect v-model="deptIds" :options="depts" multiple style="width: 370px" placeholder="请选择"/>
            </el-form-item>


            <el-form-item label="描述信息">
                <el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea"/>
            </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import RoleApi from "../../../../api/roleApi"
    import deptApi from "../../../../api/deptApi"
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        name: "form",
        components: { Treeselect },
        data() {
            return {
                deptIds: [],
                dateScopes: ['全部', '本级', '自定义'],
                loading: false,
                dialog: false,
                depts:[],
                form: {
                    name: '',
                    depts: [],
                    remark: '',
                    dataScope: '本级',
                    level: 3
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ]
                },
            }
        },
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
        },
        methods: {
            getDepts() {
                deptApi.findAllDept().then(res=>{
                    this.depts = res.data.data;
                    window.console.log(this.depts)
                })
            },
            changeScope() {
                if (this.form.dataScope === '自定义') {
                    this.getDepts();
                }
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
                this.form = {name: '', depts: [], remark: '', dataScope: '本级', level: 3}
            },
            cancel() {
                this.dialog = false;
                this.resetForm()
            },
            doSubmit() {
                if (this.form.dataScope === '自定义' && this.deptIds.length === 0) {
                    this.$message({
                        message: '自定义数据权限不能为空',
                        type: 'warning'
                    })
                } else {
                    this.form.depts = []
                    if (this.form.dataScope === '自定义') {
                        for (let i = 0; i < this.deptIds.length; i++) {
                            this.form.depts.push({
                                id: this.deptIds[i]
                            })
                        }
                    }
                }
                this.$refs['form'].validate((valid) => {
                    if (valid)
                        this.loading = true
                    if (this.isAdd) {
                        this.doAdd()
                    } else this.doEdit()
                })
            },
            doAdd() {
                RoleApi.addByrole(this.form).then(res => {
                    this.resetForm();
                    if (res.data.success) {
                        this.$notify({
                            title: '添加成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.$parent.$parent.initData();
                        this.loading = false
                        this.dialog = false;
                    }
                }).catch(err => {
                    this.loading = false
                    window.console.log(err.data.message)
                })
            },
            doEdit() {
                RoleApi.updateByrole(this.form).then(res => {
                    this.resetForm();
                    if (res.data.success) {
                        this.$notify({
                            title: '修改成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.dialog = false;
                        this.loading = false
                        location.reload();
                    }
                }).catch(err => {
                    this.loading = false
                    window.console.log(err.data.message)
                })
            },
        }

    }
</script>

<style scoped>

</style>

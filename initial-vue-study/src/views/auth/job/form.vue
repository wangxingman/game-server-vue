<template>
    <div>
        <!--对话框 属性1 嵌套元素 是否显示dialog-->
        <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增岗位' : '编辑岗位'"
                   width="500px">
            <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width: 370px;"/>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model.number="form.sort" :min="0" :max="999" controls-position="right"
                                     style="width: 370px;"/>
                </el-form-item>


                <el-form-item v-if="form.pid !== 0" label="状态" prop="enabled">
                    <el-radio class="radio" v-model="form.enabled " label="true">正常</el-radio>
                    <el-radio class="radio" v-model="form.enabled " label="false">停用</el-radio>
                    <!--                    <el-radio v-for="item in dicts" :key="item.id" v-model="" :label="item.value">{{ item.label }}</el-radio>-->
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="deptId" placeholder="请选择">
                        <el-option
                                v-for="item in depts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import DeptApi from "../../../api/deptApi"
    import JobApi from "../../../api/jobApi"

    export default {
        name: "add",
        data() {
            return {
                loading: false,
                dialog: false,
                depts: [],
                deptId: 1,
                form: {
                    id: '',
                    name: '',
                    sort: 999,
                    enabled: 'true',
                    createTime: '',
                    dept: {id: ''}
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, message: '请输入序号', trigger: 'blur', type: 'number'}
                    ]
                },
            }
        },
        created() {
            this.initData();
            window.console.log(11111)
        },
        methods: {
            doSubmit() {
                this.form.dept.id = this.deptId
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.deptId === null || this.deptId === undefined) {
                            this.$message({
                                message: '所属部门不能为空',
                                type: 'warning'
                            })
                        } else {
                            this.loading = true
                            if (this.isAdd) {
                                this.doAdd()
                            } else this.doEdit()
                        }
                    }
                })
            },
            doAdd() {
                window.console.log("-------sedfsafds-------");
                JobApi.addByJob(this.form).then(res => {
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
                JobApi.updateByJob(this.form).then(res => {
                    this.resetForm();
                    if (res.data.success) {
                        this.$notify({
                            title: '添加成功',
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
            resetForm() {
                this.$refs['form'].resetFields()
                this.deptId = null
                this.form = {
                    id: '',
                    name: '',
                    sort: 999,
                    enabled: 'true',
                    createTime: '',
                    dept: {id: ''}
                }
            },
            initData() {
                DeptApi.findAllDept().then(({data}) => {
                    if (data.success) {
                        this.depts = data.data;
                    }
                });
            },
            cancel() {
                this.dialog = false;
                this.resetForm()
            }
        },
        props: {
            isAdd: {
                type: Boolean,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>
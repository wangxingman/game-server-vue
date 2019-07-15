<template>
    <div>
        <!--对话框 属性1 嵌套元素-->
        <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增岗位' : '编辑岗位'"
                   width="500px"></el-dialog>
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;"/>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model.number="form.sort" :min="0" :max="999" controls-position="right" style="width: 370px;"/>
            </el-form-item>
            <el-form-item v-if="form.pid !== 0" label="状态" prop="enabled">
                <el-radio v-for="item in dicts" :key="item.id" v-model="form.enabled" :label="item.value">{{ item.label }}</el-radio>
            </el-form-item>
            <el-form-item label="所属部门">
                <treeselect v-model="deptId" :options="depts" style="width: 370px" placeholder="选择部门" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                dialog: false,
            }
        },
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
            sup_this: {
                type: Object,
                default: null
            },
            dicts: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style scoped>

</style>
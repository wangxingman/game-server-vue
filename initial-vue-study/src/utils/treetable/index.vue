<template>
    <div>
        <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
            <el-table-column v-if="columns.length===0" width="150">
                <template slot-scope="scope">
                    <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
                    <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                            <i v-if="!scope.row._expanded" class="el-icon-plus"/>
                            <i v-else class="el-icon-minus"/>
                    </span>
                    {{ scope.$index }}
                </template>
            </el-table-column>

            <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text"
                             :width="column.width">
                <template slot-scope="scope">
                    <!-- Todo -->
                    <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
                    <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
                    <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                      <i v-if="!scope.row._expanded" class="el-icon-plus"/>
                      <i v-else class="el-icon-minus"/>
                    </span>
                    {{ scope.row[column.value] }}
                </template>
            </el-table-column>

            <slot/>
        </el-table>

    </div>
</template>

<script>
    import treeToArray from './eval'

    export default {
        name: "index",
        props: {
            data: {
                type: [Array, Object],
                required: true,
            },
            columns: {
                type: Array,
                default: () => []
            },
            evalFunc: Function,
            evalArgs: Array,
            expandAll: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            formatData: () => {
                let tmp;
                if (!Array.isArray(this.data)) {
                    tmp = [this.data]
                } else {
                    tmp = this.data
                }
                const func = this.evalFunc || treeToArray
                const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
                return func.apply(null, args)
            }
        },
        methods: {
            showRow: function(row) {
                const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
                row.row._show = show
                return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
            },
            //切换下级是否显示
            toggleExpanded: function(trIndex) {
                const record = this.formatData[trIndex]
                record._expanded = !record._expanded
            },
            //图标显示
            iconShow(index, record) {
                return (index === 0 && record.children && record.children.length > 0)
            }
        }
    }
</script>

<style scoped>

</style>

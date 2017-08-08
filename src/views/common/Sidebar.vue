<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'fa fa-home',
                        index: 'first',
                        title: '首页'
                    },    
                    {
                        icon: 'fa fa-bar-chart',
                        index: 'statistics',
                        title: '统计'
                    },
                    {
                        icon: 'fa fa-object-ungroup',
                        index: 'ipcheck',
                        title: 'IP查询'
                    },
                    {
                        icon: 'fa fa-cubes',
                        index: 'diyreport',
                        title: '定制报表'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'setValue',
                        title: '阈值设置'
                    },
                    {
                        icon: 'fa fa fa-folder-open',
                        index: 'reloadData',
                        title: '数据重刷',
                        // subs: [
                        //     {
                        //         index: 'reloadData',
                        //         title: '考试发布'
                        //     },
                        //     {
                        //         index: 'reloadData',
                        //         title: '未结束考试管理'
                        //     }
                        // ]

                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 60px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
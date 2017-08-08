<template>
	<div>
		<div class="header">
			<el-row>
				<el-col :span="4" class='home-title'>
					<span class="system-Name">{{ sysName }}</span>
				</el-col>
				<el-col :span="16">
					<span>&nbsp</span>
				</el-col>
				<el-col :span="3" class="home-title">
					<span class="userInfo">11105319-管理员</span>
				</el-col>
				<el-col :span="1" class="home-title">
					<router-link to="login"><span class="userInfo"><i class="fa fa-sign-out"></i></span></router-link>
				</el-col>
			</el-row>
		</div>
	</div>

</template>

<script >
	export default {
        data() {
            return {
                sysName: '报警系统自助统计'
            }
        },
        computed:{

        },
        methods:{

        }
    }

</script>

<style scoped>
	
	 .header {
        height: 60px;
        background: #324057;
        margin: auto;
    }
    .home-title{
    	height: 60px;
    	line-height: 60px;


    }
    .system-Name {
    	margin-left: 10px;
        font-size:18px;
        text-align: center;
        color: #fff;
    }
    .userInfo{
        font-size:16px;
        color: #fff;
        margin: auto 5px;
    }
</style>
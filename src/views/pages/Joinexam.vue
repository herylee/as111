<template>
    <div>
    	<el-form ref="form" :model="joinform" >
			<el-form-item label="考试名称">
				<el-input v-model="joinform.examname" ></el-input>
				<el-button type="primary" @click="showParams">主要按钮</el-button>
			</el-form-item>
    	</el-form>
    </div>
</template>

<script>

	export default{
		data() {
			return {
				joinform:{
					examname:""
				},

				msg:'我是JoinExam'
			}
		},
		methods:{
			showParams(){
				console.log(this.$route.query)	
				this.$axios.get('/static/test.json')
				  .then(function (response) {
				  	alert(response.data.test);
				    console.log(response);
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			}

		}
	}

</script>

<style scoped>
	.el-input{
		width: 200px;
	}

</style>

import Login from '@/views/Login.vue'

// import Index from '@/views/Index.vue'
import Hello from '@/components/Hello.vue'
import Home from '@/views/common/Home.vue'
import Page from '@/views/pages/Page.vue'
import Joinexam from '@/views/pages/Joinexam.vue'
import Statistics from '@/views/pages/Statistics.vue'
import Ipcheck from '@/views/pages/Ipcheck.vue'
import Diyreport from '@/views/pages/Diyreport.vue'
import SetValue from '@/views/pages/SetValue.vue'
import First from '@/views/pages/First.vue'
// import ReloadData from '@/views/pages/ReloadData.vue'


//模块分割例子,可作为异步加载程序
// var components = new Array();
// for(var k=0; k<length; k++){
//     components[k] = function()
// }

var ReloadData = function(resolve, reject) {
    require.ensure(['@/views/pages/ReloadData.vue'], function() {
        resolve(require('@/views/pages/ReloadData.vue'));
    });
};


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',

        // hidden: true

    }, {
        path: '/hello',
        component: Hello,
        name: '',
        hidden: true
    }, {

        path: '/',
        component: Home,
        name: '首页',
        redirect: '/first',
        hidden: true,
        children:[
            { path:'/page',component:Page,name:'page' },
            { path:'/first',component:First,name:'每日报表' },
            { path:'/statistics',component:Statistics,name:'统计' },
            { path:'/ipcheck',component:Ipcheck,name:'IP查询' },
            { path:'/diyreport',component:Diyreport,name:'定制报表' },
            { path:'/setValue',component:SetValue,name:'阈值设置' },
            { path:'/reloadData',component:ReloadData,name:'数据重刷' },
            { path:'/joinexam/abc',component:Joinexam,name:'Joinexamabc' }        
        ]
    }
];

export default routes;
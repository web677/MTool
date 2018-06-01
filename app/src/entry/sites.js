import Vue  from 'vue/dist/vue.esm.js'

var app = new Vue({
    el: '#J_sites',
    data: {
        current: 'hot',
        keys: {
            'hot': '常用',
            'collect': '收藏',
            'library': '优秀库',
            'community': '技术社区'
        },
        sites: {
            'hot': [
                {
                    name: 'Github',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'https://github.com/',
                    description: '优秀的代码托管平台'
                },{
                    name: 'w3cSchool',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'http://www.w3school.com.cn/',
                    description: '优秀的API查询平台'
                },{
                    name: 'Github',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'https://github.com/',
                    description: '优秀的代码托管平台'
                },{
                    name: 'w3cSchool',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'http://www.w3school.com.cn/',
                    description: '优秀的API查询平台'
                },{
                    name: 'Github',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'https://github.com/',
                    description: '优秀的代码托管平台'
                },{
                    name: 'w3cSchool',
                    logo: 'http://www.fenav.com/src/images/index/group3/11.jpg',
                    link: 'http://www.w3school.com.cn/',
                    description: '优秀的API查询平台'
                }
            ]
        },
    },
    methods: {
        
    }
})




import $  from 'jquery'
import Vue  from 'vue/dist/vue.esm.js'
import Toast from '../assets/js/toast'

const getSitesUrl = 'https://api.eshengeshu.com/mock/8e6c3cf647973776.json'

const app = new Vue({
    el: '#J_sites',
    data: {
        current: 'hot',
        keys: {
            'hot': '常用',
            'collect': '收藏',
            'library': '优秀库',
            'community': '技术社区'
        },
        sites: { },
    },
    methods: {
        loadSites(item){
            this.current = item
        }
    },
    created(){
        this.$watch('current', (key) => {
            if(!this.sites[key]){
                $.getJSON(getSitesUrl, {key: key})
                    .then(res => {
                        if(res.status == 1){
                            this.sites[key] = res.data.sites
                            this.$forceUpdate()
                        }else{
                            Toast.open(res.info)
                        }
                    })
            }
        }, {
            immediate: true
        })
    }
})




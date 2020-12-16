<template>
  <div>
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <router-link to='/'>首页</router-link>&gt;
          <router-link to="/news">公司动态</router-link>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="news">
      <div class="news">
        <ul>
          <!--<li><span>2016-02-21</span><a href="">空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a></li>-->
          <li v-for="(item, index) in news.data" :key="index" >
              <span>{{item.pubTime | date }}</span>
              <router-link :to="`/news_detail/${item.nid}`">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <!--<a href="" class="">上一页</a>-->
        <a  @click="loadMore(-1)" v-if="news.pageNum>1">上一页</a>
        <a class="default" v-else>上一页</a>
        <!--<a href="" class="cur">1</a>-->
        <a v-for="i in news.pageCount" :key="i" :class="i==news.pageNum?'cur':''" @click="getnews(i)">{{i}}</a>
        <!--<a href="">下一页</a>-->
        <a  @click="loadMore(+1)" v-if="news.pageNum<news.pageCount"  >下一页</a> 
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            news:null,
        }
    },
    methods: {
        getnews(pno){
            let url='http://101.96.128.94:9999/mfresh/data/news_select.php?pageNum='+pno
            this.axios.get(url)
            .then(res => {
                console.log(res)
                this.news=res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        loadMore(n){
            let pno=this.news.pageNum+n
            let url='http://101.96.128.94:9999/mfresh/data/news_select.php?pageNum='+pno
            this.axios.get(url)
            .then(res => {
                console.log(res)
                this.news=res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        
    },
    mounted() {
        this.getnews(1)
    },
    filters:{
     date(timestamp){
         let ts=parseInt(timestamp);
         let date = new Date(ts)
         let year = date.getFullYear();
         let month = date.getMonth()+1;
         let day = date.getDate();
         return `${year}-${month}-${day}`
         
     },
    }
};
</script>

<style>
</style>
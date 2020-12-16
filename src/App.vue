<template>
  <div>
    <Header class="header_box" />
    <router-view v-wechat-title='$route.meta.title'></router-view>
    <Footer class="footer" />
  </div>
</template>

<script>
// 引入
import Header from "./components/Header";
import Footer from "./components/Footer"
export default {
  components:{
    //vue官方代码规范要求：组件必须大驼峰，因为HTML默认的标签都是全小写
    Header,
    Footer,
  }
}
</script>

<style>
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>
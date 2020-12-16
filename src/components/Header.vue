<template>
  <div>
    <!-- 组件内容只能有唯一的父 -->
    <!-- 复制 header.html 内容到此处 -->
    <header class="header container">
      <h1 class="logo"><router-link to="/" class="link"></router-link></h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li><a href="#" class="weixin"></a></li>
          <li><a href="#" class="weibo"></a></li>
          <li v-if="!uid">
            <router-link to="/login" class="h_login">登录</router-link>
          </li>
          <li v-if="!uid"><em>|</em></li>
          <li v-if="!uid">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>
          <li v-if="uid" class="top_user">
            <a href="">{{ uname }}</a>
          </li>
          <li v-if="uid" class="top_quit"><a @click="logout">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text" />
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li>
              <router-link to="/">
                <span class="icon_home"></span>首页
              </router-link>
            </li>
            <li><router-link to="/about">关于净美仕</router-link></li>
            <li>
              <!-- 特殊指定: router-link-exact-active 样式类 在 详情页的时候 也是生效的 -->
              <!-- 路由中组件的名字 需要在 router/index.js 中配置 -->
              <router-link
                to="/news"
                :class="{
                  'router-link-exact-active': this.$route.name == 'news_detail',
                }"
                >公司动态</router-link
              >
            </li>
            <li class="nav_pd">
              <router-link
                to="/product/1"
                :class="{
                  'router-link-exact-active': this.$route.name == 'product',
                }"
                >产品中心 <span class="icon_pd"> </span
              ></router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">净美仕净化器</router-link>
                <router-link to="/product/2">净美仕滤网</router-link>
              </div>
            </li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
        <div class="s_cart" v-if="uid">
          <router-link :to="`/cart/${uid}`">
            <span class="icon_cart"></span>购物车(<strong id="cart_sum"
              >0</strong
            >)<span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <!--<h3>您的购物车为空~</h3>-->
            <ul>
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
              <!--<li>-->
              <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
              <!--<div>-->
              <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
              <!--</div>-->
              <!--<strong>¥1599.00</strong>-->
              <!--<em></em>-->
              <!--</li>-->
            </ul>
            <div class="cd_js clearfloat">
              <span>共计：<strong>0.00</strong></span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
// 在组件中使用 state 中的值有两种用法
// 1. this.$store.state.xxx
// 2. mapState辅助函数
import { mapState } from "vuex";

export default {
  computed: {
    // 固定写法: 相当于  this.uid = this.$store.state.uid;
    ...mapState(["uid", "uname", "phone"]),
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$store.commit("updateUser");
    },
  },
};
</script>

<style scoped>
/* 通过路由的官方网站: 可以查看很多api */
/* https://router.vuejs.org/zh/api/ */

/* 通过 router-link-exact-active 可以设置 router-link 在激活状态下的样式 */
/* 
.router-link-exact-active: 严格匹配   例如 / 只能匹配 /
.router-link-active: 非严格匹配 例如 / 可以匹配所有带有/的,  /  /about /news...

*/
nav .router-link-exact-active {
  background-color: orange;
}

nav .router-link-exact-active:hover {
  background-color: orange;
}
</style>

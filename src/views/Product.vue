<template>
  <div>
    <!-- product.html 12 ~ 98 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pl_header">
        <router-link to="/product/1" :class="{ cur: type == 1 }"
          >净美仕净化器</router-link
        >
        <router-link to="/product/2" :class="{ cur: type == 2 }"
          >净美仕滤网</router-link
        >
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in data.data" :key="index">
          <router-link :to="`/product_detail/${item.pid}`">
            <img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt="" />
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <router-link :to="`/product_detail/${item.pid}`"
              >查看详情</router-link
            >
          </div>
        </li>
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器的空气净化器的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a class="default" v-if="data.pageNum <= 1">上一页</a>
        <a @click="getData(data.pageNum - 1)" v-else>上一页</a>
        <!--<a href="">1</a>-->
        <a
          v-for="(item, index) in data.pageCount"
          :key="index"
          :class="{ cur: item == data.pageNum }"
          @click="getData(item)"
        >
          {{ item }}
        </a>
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
        <a
          @click="getData(data.pageNum + 1)"
          v-if="data.pageNum < data.pageCount"
          >下一页</a
        >
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      type: this.$route.params.type,
    };
  },
  // 挂载时:  页面从不显示 -> 显示 时触发
  mounted() {
    this.getData(1);
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    //https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#组件内的守卫
    // console.log("将要状态to: ", to);
    // console.log("当前状态from: ", from);
    this.type = to.params.type;

    this.getData(1);

    // next() 代表继续向下执行, 不中断生命周期
    next();
  },
  methods: {
    getData(pno) {
      let url = `product_select.php?pageNum=${pno}&type=${this.type}`;

      this.axios
        .get(url)
        .then((res) => {
          console.log(res);

          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.pages a {
  user-select: none;
  cursor: pointer;
}
</style>
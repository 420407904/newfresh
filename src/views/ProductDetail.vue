<template>
  <div>
    <!-- product_details.html 12 - 53 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href=""
            >净美仕净化器</a
          >
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="'http://101.96.128.94:9999/mfresh/' + data.pic" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2>{{ data.title1 }}</h2>
          <ul>
            <li>型号：{{ data.model }}</li>
            <li>功能：{{ data.func }}</li>
            <li>噪音：{{ data.noise }}</li>
            <li>风量：{{ data.wind }}</li>
            <li>适用对象：{{ data.applyTo }}</li>
            <li>适用面积：{{ data.size }}</li>
            <li>空气净化能效等级：{{ data.level }}</li>
          </ul>
          <p>
            价格：<span>¥</span><strong id="price">{{ data.price }}</strong>
          </p>
          <a @click="addToCart" id="addCart"
            ><span class="icon_cart"></span>加入购物车</a
          >
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="detail">
          <!--<p>家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。</p>-->
          <!--<img src="product-imgs/m8088a/01.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/02.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/03.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/04.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/05.jpg" alt=""/>-->
          <!--<img src="product-imgs/m8088a/06.jpg" alt=""/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pid"],
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    addToCart() {
      if (sessionStorage.getItem("uid")) {
        // 添加
        this.axios
          .post(
            "cart_detail_add.php",
            `uid=${sessionStorage.getItem("uid")}&pid=${this.pid}`
          )
          .then((res) => {
            console.log(res);

            let { code, msg } = res.data;

            if (code == 1) {
              alert("添加成功!");
            } else {
              alert("添加失败!");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        alert("登录之后才能进行添加购物车操作, 即将为您自动跳转到登录页");
        this.$router.push("/login");
      }
    },
    getData() {
      this.axios
        .get("product_detail.php?pid=" + this.pid)
        .then((res) => {
          console.log(res);
          this.data = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    detail() {
      return this.data.detail.replace(
        /src="product-imgs/g,
        'src="http://101.96.128.94:9999/mfresh/product-imgs'
      );
    },
  },
};
</script>

<style></style>
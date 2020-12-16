<template>
  <div>
    <!-- 复制 index.html 中 12 ~ 56 -->
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item, index) in banners" :key="index">
        <img :src="item" alt />
      </swiper-slide>
      <!-- 页数指示 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>净美仕产品</h2>
        <ul class="clearfloat">
          <li>
            <a href="#" class="link">
              <img src="../assets/images/01.jpg" alt />
            </a>
          </li>
          <li>
            <a href="#" class="link">
              <img src="../assets/images/02.jpg" alt />
            </a>
          </li>
          <li>
            <a href="#" class="link">
              <img src="../assets/images/03.jpg" alt />
            </a>
          </li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于净美仕</h2>
          <p>
            北京净美仕环境科技有限公司自诞生起一直关注人类呼吸健康的问题，并专注于室内空气质量的研究与改善。2003年，非典来袭，环境安全威胁到了每个人的生命，全国陷入一片恐慌。净美仕肩负着为人类创造健康安全生活环境的使命应运而生。2012年7月，亿朗以“净美仕(Mfresh)”为品牌重塑，以崭新的面貌屹立在净化行业。
            <a href="#">查看更多</a>
          </p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li>
              <span>2016-02-21</span>
              <a href>空气净化器要逆天？ “玫瑰金”“土豪金”齐上阵</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>净美仕新风净化系统 助力校园新风行动</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>全国新风行动全面启动 助推净美仕战略升级</a>
            </li>
            <li>
              <span>2016-02-21</span>
              <a href>智能空气净化器翻盘：净美仕能否领衔?</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        autoplay: {
          // 手动滚动后是否要禁用自动滚动: false
          disableOnInteraction: false,
          // 滚动的间隔时长
          delay: 3000,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      // 此处要通过循环遍历来显示图片: 循环代码会在项目运行时才执行;
      // 项目在运行前需要打包:  打包操作需要识别项目中用到了哪些资源图 然后进行打包操作
      // require放循环里写, 打包阶段不执行, 则不会打包图片, 那就会无法使用
      banners: [
        require("../assets/images/banner_01.jpg"),
        require("../assets/images/banner_02.jpg"),
        require("../assets/images/banner_03.jpg"),
        require("../assets/images/banner_04.jpg"),
      ],
      banner_cur: 0, //当前序号
    };
  },
  // 组件挂载时
  mounted() {
    // 定时器保存为 属性, 然后才能跨方法使用:  定时器是加载在window中的, 需要记得在组件卸载时关闭
    this.timer = setInterval(() => {
      this.banner_cur = (this.banner_cur + 1) % this.banners.length;
    }, 2500);
  },
  // 组件将要销毁
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style></style>

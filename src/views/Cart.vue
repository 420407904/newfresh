<template>
  <div>
    <!-- cart.html 12 ~ 69 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="cart">
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkedCount }}</em
            >件</span
          >
          <span
            >总金额：<strong>¥{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span
              ><input type="checkbox" v-model="checkAll" @change="doCheckAll" />
              全选</span
            >
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="data.products.length == 0">购物车中没有任何商品！</h2>
            <li v-else v-for="(item, index) in data.products" :key="index">
              <input
                type="checkbox"
                class="cart_checkbox"
                v-model="item.checked"
                @change="doCheckOne"
              />
              <a href="" class="cart_img"
                ><img
                  :src="'http://101.96.128.94:9999/mfresh/' + item.pic"
                  alt=""
              /></a>
              <a href="" class="cart_title">{{ item.title1 }}</a>
              <i>¥{{ item.price }}</i>
              <div>
                <span @click="doMinuse(index)">-</span>
                <input type="text" v-model="item.count" />
                <span @click="doAdd(index)">+</span>
              </div>
              <strong>¥{{ item.price * item.count }}</strong>
              <em @click="doDel(index)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkedCount }}</em
            >件</span
          >
          <span
            >总金额：<strong>¥{{ totalPrice }}</strong></span
          >
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      checkAll: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    doMinuse(index) {
      let { pid, did, count } = this.data.products[index];

      if (count == 1) {
        alert("商品数量不能小于1");
        return;
      }

      let url = `cart_detail_update.php?did=${did}&pid=${pid}&count=${parseInt(
        count
      ) - 1}`;

      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          let { code } = res.data;
          if (code == 1) {
            this.data.products[index].count =
              parseInt(this.data.products[index].count) - 1;
          } else {
            alert("减少失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    doAdd(index) {
      let { pid, did, count } = this.data.products[index];

      let url = `cart_detail_update.php?did=${did}&pid=${pid}&count=${parseInt(
        count
      ) + 1}`;

      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          let { code } = res.data;
          if (code == 1) {
            this.data.products[index].count =
              parseInt(this.data.products[index].count) + 1;
          } else {
            alert("添加失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    doDel(index) {
      // index: 删除项目的序号
      let url = "cart_detail_delete.php?did=" + this.data.products[index].did;

      this.axios
        .get(url)
        .then((res) => {
          console.log(res);
          let { code } = res.data;

          if (code == 1) {
            alert("删除成功");
            this.data.products.splice(index, 1);
          } else {
            alert("删除失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 每一个单选
    doCheckOne() {
      let count = this.data.products.length;

      let num = 0;
      this.data.products.forEach((item) => {
        num += item.checked;
      });

      // 勾选的数量 和 总数量 一致时, 就是全选;
      this.checkAll = num == count;
    },
    // 全选
    doCheckAll() {
      console.log(this.checkAll);

      this.data.products.forEach((item) => {
        item.checked = this.checkAll;
      });
    },
    getData() {
      let url = "cart_detail_select.php?uid=" + this.$store.state.uid;

      this.axios
        .get(url)
        .then((res) => {
          // console.log(res);
          // 响应式编程: UI 的变化 与 数据有关
          // 每一项数据中添加一个属性, 来调用是否勾选
          res.data.products.forEach((item) => {
            // 每一项添加 checked 属性, 代表是否选中
            item.checked = false;
          });

          this.data = res.data;

          console.log(this.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    // 计算属性: 值是实时计算的
    checkedCount() {
      let num = 0;
      this.data.products.forEach((item) => {
        // 在数学运算中: true 1  false 0
        num += item.checked;
      });

      return num;
    },
    totalPrice() {
      let total = 0;

      this.data.products.forEach((item) => {
        total += item.price * item.count * item.checked;
      });

      return total;
    },
  },
};
</script>

<style scoped>
.cart_con * {
  user-select: none;
}
</style>

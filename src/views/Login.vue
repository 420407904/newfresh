<template>
  <div>
    <!-- login.html 12~40 -->
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span
                class="tips"
                id="uname_prompt_text"
                style="display: inline;"
                v-show="showErr"
              >
                用户名或密码不正确</span
              >用户名：
            </dt>
            <dd>
              <input
                type="text"
                id="uname"
                placeholder="邮箱/手机号"
                v-model="uname"
              />
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input
                type="password"
                id="pwd"
                placeholder="密码"
                v-model="upwd"
              />
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="login">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      showErr: false, //显示失败
    };
  },
  methods: {
    login() {
      console.log(this.uname, this.upwd);

      // POST
      let url = "user_login.php";
      let params = `unameOrPhone=${this.uname}&upwd=${this.upwd}`;
      // doudou  123456
      this.axios
        .post(url, params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            // 成功
            this.showErr = false;

            // 保持登录状态
            // sessionStorage: 标签关闭则销毁
            // localStorage: 必须手动清空, 否则一直存在, 适合 自动登录 选项
            let { uname, uid, phone } = res.data;

            sessionStorage.setItem("uname", uname);
            sessionStorage.setItem("uid", uid);
            sessionStorage.setItem("phone", phone);
            this.$store.commit("updateUser")

            // 跳转到之前的页面
            // route :保存路由信息
            // router:控制路由跳转操作
            this.$router.go(-1);
          } else {
            // 失败
            this.showErr = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>

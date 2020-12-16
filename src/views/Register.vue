<template>
  <div>
    <!-- register.html 12-55 -->
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="uname"
            @blur="checkName"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="uname_state == 1 || uname_state == 2 || uname_state == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="uname_state == 4"
          ></em>
          <i style="display: block;" v-if="uname_state == 3">
            此邮箱已被其他用户注册
          </i>
          <i style="display: block;" v-if="uname_state == 1">
            请输入您的注册邮箱
          </i>
          <i style="display: block;" v-if="uname_state == 2">
            请输入正确的邮箱格式
          </i>
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="upwd1"
            @blur="checkPwd1"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="upwd1_state == 1 || upwd1_state == 2"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="upwd1_state == 3"
          ></em>
          <i style="display: block;" v-if="upwd1_state == 1">
            请输入您的密码
          </i>
          <i style="display: block;" v-if="upwd1_state == 2">
            密码长度应为6~12个字符之间
          </i>
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="upwd2"
            @blur="checkPwd2"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="upwd2_state == 1"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="upwd2_state == 2"
          ></em>
          <i style="display: block;" v-if="upwd2_state == 1">
            两次输入的密码不一致
          </i>
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="phone_state == 1 || phone_state == 2 || phone_state == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="phone_state == 4"
          ></em>
          <i style="display: block;" v-if="phone_state == 3">
            此手机号已被其他用户注册
          </i>
          <i style="display: block;" v-if="phone_state == 1">
            请输入您的手机号
          </i>
          <i style="display: block;" v-if="phone_state == 2">
            请输入正确的手机号格式
          </i>
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="code"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="checked" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" v-if="checked" @click="regist">提交注册</button>
          <button v-else type="button" class="disabled" disabled="">
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd1: "",
      upwd2: "",
      phone: "",
      code: "",
      checked: true, //是否同意条款
      uname_state: 0, //人为规定: 0普通 1空 2格式错误 3已存在 4正确
      upwd1_state: 0, //0普通 1空 2长度错误 3正确
      upwd2_state: 0, //0普通 1不一致 2正确
      phone_state: 0, //0普通 1空 2格式错误 3已存在 4正确
    };
  },
  methods: {
    regist(){
        if(
            !(
                this.uname_state==4&&
                this.upwd1_state==3&&
                this.upwd2_state==2&&
                this.phone_state==4
            )
        ){
            alert('请确保所有内容正确')
            return;
        }

        let params = `uname=${this.uname}&upwd=${this.upwd1}&phone=${this.phone}`;
        this.axios.post("user_register.php",params)
        .then(res => {
            console.log(res);
            let {code,uid,uname}=res.data;
            if(code==1){
                alert("恭喜您,注册成功!即将为您跳转到刚才的页面")
                this.$router.go(-1);
                sessionStorage.setItem("uname",uname);
                sessionStorage.setItem("uid",uid);
                sessionStorage.setItem("phone",this.phone);
                this.$store.commit("updateUser");
            }else{
                alert("很遗憾,注册失败,请稍后重试!")
            }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    checkPwd1() {
      let pwd = this.upwd1.trim();
      if (pwd == "") {
        this.upwd1_state = 1;
        return;
      }

      if (!(pwd.length >= 6 && pwd.length <= 12)) {
        this.upwd1_state = 2;
        return;
      }

      this.upwd1_state = 3;
    },
    checkPwd2() {
      if(this.upwd1_state !=3){
          this.upwd2_state=0;
          return;
      }
      if (this.upwd1.trim() != this.upwd2.trim()) {
        this.upwd2_state = 1;
      } else {
        this.upwd2_state = 2;
      }
    },
    checkPhone() {
      let phone = this.phone.trim();

      if (phone == "") {
        this.phone_state = 1;
        return;
      }

      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.phone_state = 2;
        return;
      }

      //已注册: 18112345678
      this.axios
        .post("user_check_phone.php", "phone=" + phone)
        .then((res) => {
          console.log(res);
          let { code } = res.data;

          this.phone_state = code == 1 ? 3 : 4;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    checkName() {
      console.log(this.uname);

      // 检测是否为邮箱格式 -- 正则
      var reg = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      // 去掉两侧空格
      var email = this.uname.trim();

      //1. 空
      if (email == "") {
        this.uname_state = 1;
        return; //终止执行
      }

      //2. 格式错误
      if (!reg.test(email)) {
        this.uname_state = 2;
        return; //终止执行
      }

      //3. 是否已经注册过
      this.axios
        .post("user_check_uname.php", "uname=" + email)
        .then((res) => {
          console.log(res);
          // code 1  已存在
          // code 2  不存在
          let { code } = res.data;
          this.uname_state = code == 1 ? 3 : 4;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style></style>

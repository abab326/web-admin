<script setup lang="ts">
import { ElMessage } from "element-plus";

const router = useRouter();
const activeName = ref("account");
const accountForm = reactive({
  username: "",
  password: ""
});

const phoneForm = reactive({
  phone: "",
  code: ""
});

const handleAccountLogin = () => {
  // 处理账号密码登录逻辑
  ElMessage.success("登录成功");
  router.push("/main/designer");
};

const handlePhoneLogin = () => {
  // 处理短信验证码登录逻辑
  ElMessage.success("短信验证码登录成功");
};

const getSmsCode = () => {
  // 处理获取验证码逻辑
  ElMessage.success("验证码已发送");
};
</script>

<template>
  <div class="login-container flex h-full">
    <div class="left-container p-8 bg-blue-50 flex-[4]">
      <div class="flex items-center">
        <svg-icon name="logo" type="local" size="40" color="var(--colors-blue-500)" />
        <span class="text-4xl text-blue-500">千牛</span>
      </div>
      <div class="mt-5 flex justify-center">
        <span class="text-4xl font-bold">全新发布</span>
        <div class="ml-2">
          <span class="text-base text-white px-3 py-1 rounded-full bg-blue-500">v1.0.0</span>
        </div>
      </div>
      <div class="mt-4 flex justify-center">
        <span class="text-base">回归核心经营链路，聚焦体验与服务升级</span>
      </div>
    </div>
    <div class="right-container bg-white flex flex-[6] items-center justify-center">
      <div class="login-form-container w-[410px]">
        <div class="title">
          <span class="text-2xl font-bold">欢迎登录</span>
          <span class="text-base ml-2">后台管理系统</span>
        </div>
        <el-card class="mt-6">
          <el-tabs v-model="activeName">
            <el-tab-pane label="密码登录" name="account">
              <el-form class="pt-4" :model="accountForm" size="large">
                <el-form-item>
                  <el-input
                    v-model="accountForm.username"
                    prefix-icon="user"
                    placeholder="请输入账号"
                  />
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="accountForm.password"
                    type="password"
                    prefix-icon="Lock"
                    placeholder="请输入密码"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button class="w-full" type="primary" @click="handleAccountLogin">
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="短信登录" name="phone">
              <el-form class="pt-4" :model="phoneForm" size="large">
                <el-form-item>
                  <el-input
                    v-model="phoneForm.phone"
                    prefix-icon="Iphone"
                    placeholder="请输入手机号"
                  />
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="phoneForm.code"
                    prefix-icon="Message"
                    placeholder="请输入验证码"
                  >
                    <template #append>
                      <el-button type="primary" @click="getSmsCode">获取验证码</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="w-full" type="primary" @click="handlePhoneLogin">
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-form-container {
  :deep(.el-tabs) {
    --el-tabs-header-height: auto;
    .el-tabs__item {
      padding: 0 8px;
      font-size: var(--el-font-size-medium);
    }
  }
  :deep(.el-tabs__nav-wrap:after) {
    --el-border-color-light: transparent;
  }
}
</style>

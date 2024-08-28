<template>
  <div class="main">
    <el-card class="content" style="max-width: 600px; height: 700px">
      <h1>{{ msg }}</h1>
      <h3>输入金额</h3>
      <p class="tip">
        供应商收到的金额（此金额从未扣除的中间行以及付款行费用）
      </p>
      <el-card>
        <div class="user-money-input">
          <!-- 国家下拉框 -->
          <countrySelect></countrySelect>
          <!-- 金额输入框组件 -->
          <moneyInput @changeInput="changeAmountInput"></moneyInput>
        </div>
      </el-card>
      <div>
        <p class="tip">汇率xx秒后更新</p>
      </div>
      <p class="tip">你付款的金额</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PaymentIndex"
};
</script>
<script setup>
import { ref } from "vue";
import moneyInput from "@/components/moneyInput.vue";
import countrySelect from "@/components/countrySelect.vue";
const msg = ref("付款");

// 付款金额
const amountInput = ref("");
function changeAmountInput(val) {
  amountInput.value = val;
}
</script>
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
.main {
  width: 100%;
  .content {
    margin: 0 auto;
  }
  .tip {
    color: #606266;
  }
  .user-money-input {
    position: relative;
    display: flex;
    height: 70px;
    align-items: center;

    .user-money-country {
      flex: 1;
      .user-money-country-content {
        height: 50px;
        display: flex;
        align-items: center;
      }
      .user-money-country-text {
        color: black;
        font-size: 30px;
        font-weight: 500;
      }
    }
    .user-money-count {
      flex: 1;
    }
  }
}
</style>


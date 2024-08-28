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
          <countrySelect @changeInput="changeCountry"></countrySelect>
          <!-- 金额输入框组件 -->
          <moneyInput @changeInput="changeAmountInput"></moneyInput>
        </div>
      </el-card>
      <div>
        <p class="tip">汇率xx秒后更新</p>
      </div>
      <p class="tip">你付款的金额</p>
      <el-card>
        <div class="user-money-input">
          <!-- 国家下拉框 -->
          <countryShow :outCountry="outCountry"></countryShow>
          <!-- 金额输入框组件 -->
          <moneyShow :amount="outAmount"></moneyShow>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PaymentIndex"
};
</script>
<script setup>
import { reactive, ref } from "vue";
import moneyInput from "@/components/moneyInput.vue";
import countrySelect from "@/components/countrySelect.vue";
import countryShow from "@/components/countryShow.vue";
import moneyShow from "@/components/moneyShow.vue";
const msg = ref("付款");

// 付款金额
const amountInput = ref("");
function changeAmountInput(val) {
  amountInput.value = val;
}
// 付款账户国家
const countryInput = ref("");
function changeCountry(val) {
  countryInput.value = val;
}
// 监听国家变化,变化就更新汇率
let exchangeRate = ref(0);
console.log(exchangeRate);

// 虚拟数据
let outCountry = reactive({
  src: "https://www.xe.com/svgs/flags/usd.static.svg",
  EnglishLabel: "USD",
  ChineseLabel: "美元",
  value: "USD"
});
let outAmount = ref(1562.2);
console.log(outAmount);
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
  }
}
</style>


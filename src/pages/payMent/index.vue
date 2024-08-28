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
      <div style="display: flex; justify-content: space-between">
        <div>
          <p class="tip">
            汇率
            <el-tag type="danger">{{ time }}</el-tag>
            秒后更新
          </p>
        </div>
        <div>
          <p class="tip" v-if="countryInput && outCountry.value">
            1 {{ countryInput }} = {{ exchangeRate }} {{ outCountry.value }}
          </p>
        </div>
      </div>
      <p class="tip">你付款的金额</p>
      <el-card>
        <div class="user-money-input">
          <!-- 国家展示框 -->
          <countryShow :outCountry="outCountry"></countryShow>
          <!-- 金额展示框组件 -->
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
import { reactive, ref, watch } from "vue";
import moneyInput from "@/components/moneyInput.vue";
import countrySelect from "@/components/countrySelect.vue";
import countryShow from "@/components/countryShow.vue";
import moneyShow from "@/components/moneyShow.vue";
import { updateExchangeRate } from "@/utils/exchangeRate";
// 倒计时
const time = ref(15);
// const countdownTime = 15000; // 15秒的倒计时（以毫秒为单位）
let timeoutId;
function startCountdown() {
  let remainingTime = time.value + 1;

  // 清除已有的定时器
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // 更新倒计时
  function updateCountdown() {
    remainingTime -= 1; // 每次减少1秒
    time.value = remainingTime;
    if (remainingTime <= 0) {
      //   更新汇率
    } else {
      timeoutId = setTimeout(updateCountdown, 1000); // 每秒更新一次
    }
  }

  // 启动倒计时
  updateCountdown();
}

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

// 虚拟数据
let outCountry = reactive({
  src: "https://www.xe.com/svgs/flags/usd.static.svg",
  EnglishLabel: "USD",
  ChineseLabel: "美元",
  value: "USD"
});
let outAmount = ref(0);

// 监听国家变化,变化就更新汇率
let exchangeRate = ref(0);
watch([countryInput, outCountry], (newValue) => {
  let [firstCountry, secondCountry] = newValue;
  exchangeRate.value = updateExchangeRate(firstCountry, secondCountry.value);
});
// 输入金额变化,汇率变化 都要重新计算输出的金额
watch([exchangeRate, amountInput], (newValue) => {
  let [rate, amount] = newValue;
  outAmount.value = rate * Number(amount);
  if (rate && amount) {
    time.value = 15;
    startCountdown(time.value);
  }
});
watch(time, (newValue) => {
  if (newValue == 0) {
    exchangeRate.value = updateExchangeRate(
      countryInput.value,
      outCountry.value
    );
  }
});
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


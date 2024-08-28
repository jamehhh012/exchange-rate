<template>
  <div class="user-money-count">
    <el-tag class="tagUnit" v-if="unit" type="info">{{ unit }}</el-tag>
    <div class="countText">{{ showAmount }}</div>
  </div>
</template>
<script setup>
import { ref, defineProps, toRefs } from "vue";
import { formatterAmount } from "@/utils/exchangeRate";
const props = defineProps({
  amount: Number
});
let { amount } = toRefs(props);
// 单位
const unit = ref("");
const showAmount = ref("");
showAmount.value = formatterAmount(String(amount.value));
// 改变单位函数;
function changeUnit(numericValue) {
  if (numericValue >= 10000000) {
    unit.value = "千万";
  } else if (numericValue >= 1000000) {
    unit.value = "百万";
  } else if (numericValue >= 100000) {
    unit.value = "十万";
  } else if (numericValue >= 10000) {
    unit.value = "万";
  } else if (numericValue >= 1000) {
    unit.value = "千";
  } else if (numericValue >= 100) {
    unit.value = "百";
  } else if (numericValue >= 10) {
    unit.value = "十";
  } else {
    unit.value = "个";
  }
}
changeUnit(amount.value);
</script>

<style lang="scss" scoped>
.tagUnit {
  position: absolute;
  top: -10px;
}
.user-money-count {
  flex: 1;
}
.countText {
  color: black;
  font-size: 25px;
  font-weight: 500;
  height: 100%;
}
</style>
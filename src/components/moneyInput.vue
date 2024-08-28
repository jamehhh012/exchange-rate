<template>
  <div class="user-money-count">
    <el-tag class="tagUnit" v-if="unit" type="info">{{ unit }}</el-tag>
    <el-input
      class="inputDeep"
      v-model="amountInput"
      style="width: 240px"
      placeholder="输入金额"
      :formatter="formatterAmount"
      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
    />
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
const amountInput = ref("");
const emit = defineEmits(["changeInput"]);
// 单位
const unit = ref("");
// 改变单位函数
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
const oldAmount = ref("");
const changeInput = (val) => {
  emit("changeInput", val);
};
watch(amountInput, (newValue, oldValue) => {
  newValue = newValue.replace(/(\.\d{2})\d+/, "$1");
  oldValue = oldValue.replace(/(\.\d{2})\d+/, "$1");
  if (newValue < 100000000 && newValue !== oldValue) {
    oldAmount.value = newValue;
    changeInput(newValue);
    changeUnit(newValue);
  }
});
function formatterAmount(value) {
  let num = value.replace(/\$\s?|(,*)/g, "");
  if (num >= 100000000) value = oldAmount.value;
  // 限制只能填入数字
  value = value.replace(/[^0-9.]/g, "");

  // 如果以小数点开头，补充0
  if (/^\.$/.test(value)) {
    value = "0" + value;
  }
  // 移除前导零（对于整数部分），确保结果符合要求
  value = value.replace(/^0+(?=\d)/, "");
  // 对数字进行千分位分割
  value = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //多个小数点只取第一个
  value = value.replace(/\.{2,}/g, ".");
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  // 限制小数点后最多两位
  value = value.replace(/(\.\d{2})\d+/, "$1");
  return value;
}
</script>

<style lang="scss" scoped>
.user-money-count {
  flex: 1;
}
.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
      inset;
    cursor: default;
    .el-input__inner {
      color: black;
      font-size: 25px;
      font-weight: 500;
      height: 100%;
    }
  }
}
.tagUnit {
  position: absolute;
  top: -10px;
}
</style>
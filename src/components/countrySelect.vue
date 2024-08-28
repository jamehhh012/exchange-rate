<template>
  <div class="user-money-country">
    <el-select
      popper-class="user-money-country-option"
      class="selectDeep"
      v-model="chooseCountry.value"
      placeholder="搜索/选择货币"
      @change="changeCountry"
    >
      <template #label>
        <countryShow :outCountry="chooseCountry"></countryShow>
      </template>
      <template #header>全部账户 </template>
      <el-option
        v-for="item in accountArr"
        :key="item.value"
        :label="item.EnglishLabel"
        :value="item"
        :disabled="!item.availableBalance"
      >
        <div class="user-money-country-item">
          <el-image
            style="width: 50px; height: 50px; margin-right: 15px"
            :src="item.src"
            fit="fill"
          />
          <div style="display: flex; flex-wrap: wrap">
            <div style="font-weight: 600; line-height: normal">
              {{ item.EnglishLabel }} - {{ item.ChineseLabel }}
            </div>

            <div style="line-height: normal; width: 100%">
              可用余额: {{ item.availableBalance }} {{ item.EnglishLabel }}
            </div>
          </div>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from "vue";
import countryShow from "@/components/countryShow.vue";
// 国家选择
const chooseCountry = reactive({});
const accountArr = [
  {
    src: "https://www.xe.com/svgs/flags/cny.static.svg",
    EnglishLabel: "CNY",
    ChineseLabel: "人民币",
    value: "CNY",
    availableBalance: 0.0
  },
  {
    src: "https://www.xe.com/svgs/flags/cad.static.svg",
    EnglishLabel: "CAD",
    ChineseLabel: "加拿大元",
    value: "CAD",
    availableBalance: 1200
  },
  {
    src: "https://www.xe.com/svgs/flags/gbp.static.svg",
    EnglishLabel: "GBP",
    ChineseLabel: "英镑",
    value: "GBP",
    availableBalance: 6090.34
  },

  {
    src: "https://www.xe.com/svgs/flags/usd.static.svg",
    EnglishLabel: "USD",
    ChineseLabel: "美元",
    value: "USD",
    availableBalance: 1200.0
  }
];

function changeCountry(item) {
  chooseCountry.src = item.src;
  chooseCountry.EnglishLabel = item.EnglishLabel;
  emit("changeInput", item.value);
}

const emit = defineEmits(["changeInput"]);
</script>
<style lang="scss" scoped>
.user-money-country {
  flex: 1;
  .user-money-country-content {
    height: 50px;
    display: flex;
    align-items: center;
  }
  .user-money-country-text {
    color: black;
    font-size: 25px;
    font-weight: 500;
  }
}
.user-money-country-item {
  display: flex;
  align-items: center;
  height: 100%;
}

// 选择框
.selectDeep {
  :deep(.el-select__wrapper) {
    width: 240px;
    height: 50px;
    box-shadow: 0 0 0 0px var(--el-select-border-color, var(--el-select-color))
      inset;
    .el-select__placeholder {
      color: #606266;
      font-size: 25px;
    }
  }
}
.user-money-country-option .el-select-dropdown__item {
  height: 60px;
  line-height: 60px;
}
</style>

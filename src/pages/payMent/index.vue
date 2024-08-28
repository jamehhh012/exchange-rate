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
          <div class="user-money-country">
            <el-select
              popper-class="user-money-country-option"
              class="selectDeep"
              v-model="chooseCountry.value"
              placeholder="Select"
              @change="changeCountry"
            >
              <template #label="item">
                <div class="user-money-country-content">
                  <el-image
                    style="width: 50px; height: 50px; margin-right: 15px"
                    :src="chooseCountry.src"
                    fit="fill"
                  />
                  <span class="user-money-country-text"> {{ item.label }}</span>
                </div>
              </template>
              <el-option
                v-for="item in colors"
                :key="item.value"
                :label="item.label"
                :value="item"
              >
                <div class="user-money-country-item">
                  <el-image
                    style="width: 50px; height: 50px; margin-right: 15px"
                    :src="item.src"
                    fit="fill"
                  />
                  <span>{{ item.label }}</span>
                </div>
              </el-option>
              <template #tag>
                <el-tag v-for="color in value" :key="color" :color="color" />
              </template>
            </el-select>
          </div>
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
          <div class="user-money-country">
            <el-select
              class="selectDeep"
              style="hright: 60px"
              v-model="chooseCountry.value"
              placeholder="Select"
            >
              <template #label="item">
                <div class="user-money-country-content">
                  <el-image
                    style="width: 50px; height: 50px; margin-right: 15px"
                    :src="item.src"
                    fit="fill"
                  />
                  <span class="user-money-country-text">{{ item.label }}</span>
                </div>
              </template>
              <el-option
                v-for="item in colors"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div class="flex items-center">
                  <el-tag
                    :color="item.value"
                    style="margin-right: 8px"
                    size="small"
                  />
                  <span :style="{ color: item.value }">{{ item.label }}</span>
                </div>
              </el-option>
              <template #tag>
                <el-tag v-for="color in value" :key="color" :color="color" />
              </template>
            </el-select>
          </div>
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
const msg = ref("付款");

// 付款金额
const amountInput = ref("");
function changeAmountInput(val) {
  console.log("222", val);
  amountInput.value = val;
}
// 颜色相关
const chooseCountry = reactive({});
const colors = [
  {
    src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    label: "red",
    value: "1"
  },
  {
    src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    label: "orange",
    value: "2"
  },
  {
    src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    label: "yellow",
    value: "3"
  }
];

function changeCountry(value) {
  chooseCountry.src = value.src;
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
.user-money-country-item {
  display: flex;
  align-items: center;
}

// 选择框
.selectDeep {
  :deep(.el-select__wrapper) {
    width: 240px;
    height: 50px;
    box-shadow: 0 0 0 0px var(--el-select-border-color, var(--el-select-color))
      inset;
  }
}

.user-money-country-option .el-select-dropdown__item {
  height: 60px !important;
  line-height: 60px !important;
}
</style>


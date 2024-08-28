<template>
  <div class="user-money-country">
    <div class="user-money-country-content">
      <el-image
        style="width: 50px; height: 50px; margin-right: 15px"
        :src="outCountry.src"
        fit="fill"
      />
      <span class="user-money-country-text">
        {{ outCountry.EnglishLabel }}</span
      >
    </div>
  </div>
</template>
<script setup>
import { defineProps, toRefs } from "vue";
const props = defineProps({
  outCountry: Object
});
const { outCountry } = toRefs(props);
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
</style>

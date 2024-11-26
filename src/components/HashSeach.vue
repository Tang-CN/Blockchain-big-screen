<template lang="">
  <div class="seach">
    <div class="container">
      <input id="input" type="text" placeholder="请输入交易hash" v-model="content" />
      <button id="btn" @click="goToURL">查询</button>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const content = ref(null)
const params = ref('')

const goToURL = () => {
  let count = 0
  for (let key in proxy.$ChainName) {
    if (count == 1) {
      break
    }
    params.value = `${key}=${proxy.$ChainName[key]}`
    count++
  }
  if (content.value !== null) {
    window.open(`https://www.btsi.org.cn/?${params.value}&content=${content.value}`)
  }
}
</script>
<style lang="scss" scoped>
.seach {
  height: pxToVh(52);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #122741;
}

.container {
  width: pxToVw(718);
  height: pxToVh(52);
  position: relative;
  background-color: #122741;
}
#input {
  width: pxToVw(718);
  height: pxToVh(52);
  padding-left: 20px;
  border-radius: 0px;
  opacity: 1;
  border: 1px solid #24b377;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #122741;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}

@media screen and (max-width: 1920px) {
  #input {
    font-size: 12px;
  }
}

#input:focus {
  outline: none;
}
#btn {
  width: pxToVw(80);
  height: pxToVh(33);
  background: #24b377;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1920px) {
  #input {
    font-size: 12px;
  }

  #btn {
    font-size: 12px;
  }
}
</style>

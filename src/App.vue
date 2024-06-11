<script setup>
  import { ref, computed, watch } from "vue";
  import { useFetchStore } from "./stores/fetchStore.js";
  const fetchStore = useFetchStore();
  const search = ref(null);
  const cities = computed(() => {
    return fetchStore.cities.filter(city => {
      return city.city.toLowerCase().includes(search.value.toLowerCase()) || city.state.includes(search.value);
    })
  })
  const showList = ref(false);
  const emptyMessage = ref(false);
  watch(search, (newValue) => {
    if(newValue.length === 0){
      emptyMessage.value = false;
      showList.value = false;
      return;
    }
    if(newValue.trim() !== ""){
      showList.value = true;
      emptyMessage.value = false;
    }else{
      showList.value = false;
      emptyMessage.value = true;
    }
  })
  
</script>

<template>
  <main>
    <h1>城市搜尋</h1>
    <form class="search">
      <input type="text" v-model="search" placeholder="請輸入想搜尋的City or State">
      <span v-if="emptyMessage">請勿輸入空白</span>
    </form>
    <ul class="city-list" v-if="showList">
      <li v-for="city in cities">
        <div class="search-target">
          <p>{{ city.city }},</p>
          <p>{{ city.state }}</p>
        </div>
        <p class="population">{{ city.population }}</p>
      </li>
    </ul>
  </main>
</template>

<style>
  *{
    box-sizing: border-box;
  }
  body{
    background-color: #f37c2cc2;
    overflow-y: scroll;
  }
  main{
    max-width: 992px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }
  main h1{
    font-family: "Noto Sans TC", sans-serif;
  }
  form{
    max-width: 576px;
    width: 100%;
    border-radius: 16px;
    border: 10px solid #f3f2f2;
    padding: 15px;
    background-color: #fff;
    position: relative;
  }
  form input[type=text]{
    width: 100%;
    outline: none;
    border: none;
    text-align: center;
    font-size: 1.25rem;
    font-family: "Noto Sans TC", sans-serif;
  }
  form span{
    position: absolute;
    bottom: -40px;
    right: 0;
    color: #f00;
    font-size: 1.25rem;
    font-family: "Noto Sans TC", sans-serif;
  }
  .city-list{
    max-width: 576px;
    width: 100%;
    padding: 10px 15px;
    font-family: "Rubik", sans-serif;
  }
  .city-list li{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    background-color: #fff;
    padding: 0 15px;
    border-radius: 16px;
  }
  .search-target{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .population{
    font-size: 1rem;
    color: #8d8989;
    align-self: center;
  }
</style>

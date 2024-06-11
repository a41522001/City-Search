import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
export const useFetchStore = defineStore("fetch", () => {
  const cities = ref([]);
  // async function loadFetch(){
  //   const res = await fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json");
  //   const data = await res.json();
  //   cities.value = data;
  //   // console.log(cities.value);
  // }
  async function loadFetch(){
    try{
      const querySnapshot = await getDocs(collection(db, 'cities'));
      let data;
        data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data().data
        }));
        cities.value = JSON.parse(data[0].data);
        console.log(cities.value);
    }catch(err){
      console.log(err);
    }
  }
  onMounted(() => {
    loadFetch();
  })
  return { cities };
});

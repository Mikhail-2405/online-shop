<template>
  <!-- категории товара -->
  <div class="text-center">
    <v-menu
      open-on-hover
        v-for="item in category" 
        :key="item.id"
    >
      <template v-slot:activator="{ props }">
        <!-- кнопки в которых будут отображаться категории -->
        <v-btn
          color="black"
          v-bind="props"
          @click="getCategoryData(item.id)"
        >
          {{ item.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
        v-for="(el,  index) in category[item.id - 1].podcat"
          :key="index"
        >
          <v-list-item-title>{{ el }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
          color="black"
          id="10"
          @click="getCategoryData(id)"
        >
          Все
        </v-btn>
  </div>

</template>

<script>
import { useProductStore } from '../stores/ProductStore.js';
import { mapActions } from 'pinia';
    export default {
        props: {
            modelValue:{ 
                type: String
            },
            category: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            ...mapActions(useProductStore, ['getCategoryData']),
        },
    }
</script>

<style scoped>
.text-center {
    width: 70%;
    padding: 0px;
    display: flex;
    justify-content: space-around;
}
.categ__product-li {
    width: auto;
    height: 34px;
    margin: 5px;
    padding: 0px 15px 0px 15px;
    background: #e0dcdc;
    border-radius: 30px;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.podcateg__product {
    display: none;
    padding: 0;
    background: #e0dcdc;
}
.podcateg__product:hover {
    border-radius: 10px;
    box-shadow: 0 14px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    transition: all 0.5s;
}
.podcateg__product-li {
    width: auto;
    height: 34px;
    padding: 0px 10px 0px 10px;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

</style>
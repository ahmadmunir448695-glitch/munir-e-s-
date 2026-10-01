<script setup>
import { computed } from "vue";
import Icon from "./Icon.vue";
import ProductImage from "./ProductImage.vue";
import { productsInCategory } from "../data/products.js";

const props = defineProps({
  category: { type: Object, required: true },
  detailed: { type: Boolean, default: false }, // bigger card with description and sample products
});
const items = computed(() => productsInCategory(props.category.slug));
</script>

<template>
  <RouterLink :to="{ name: 'products', query: { category: category.slug } }"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
    <div :class="['relative overflow-hidden bg-gradient-to-br from-gray-50 to-brand-50/60', detailed ? 'aspect-[16/10]' : 'aspect-[4/3]']">
      <ProductImage :src="category.image" :alt="category.name" class="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105" />
      <span class="absolute right-3 top-3 rounded-full bg-charcoal-900/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">{{ items.length }} products</span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-display text-lg font-semibold text-charcoal-900">{{ category.name }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ detailed ? category.description : category.short }}</p>
      <ul v-if="detailed" class="mt-3 flex flex-wrap gap-1.5">
        <li v-for="p in items.slice(0, 4)" :key="p.id" class="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-charcoal-700">{{ p.name.replace(/^(GM|Indus|Pak Light|Opal)\s/, "") }}</li>
      </ul>
      <span class="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600">
        Browse {{ detailed ? category.name : "" }} <Icon name="arrow" class="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </div>
  </RouterLink>
</template>

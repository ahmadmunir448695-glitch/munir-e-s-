<script setup>
import { computed } from "vue";
import ProductImage from "./ProductImage.vue";
import WhatsAppButton from "./WhatsAppButton.vue";
import { categoryBySlug } from "../data/categories.js";
import { formatPrice, productMessage } from "../utils/whatsapp.js";

const props = defineProps({ product: { type: Object, required: true } });
const category = computed(() => categoryBySlug(props.product.category));
const hasRange = computed(() => (props.product.variants?.length ?? 0) > 1 && new Set(props.product.variants.map((v) => v.price)).size > 1);
</script>

<template>
  <article class="@container group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
    <RouterLink :to="`/products/${product.id}`" class="relative block aspect-square overflow-hidden bg-gray-50" :aria-label="product.name">
      <ProductImage :src="product.image" :alt="product.name" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <span class="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/90 px-2.5 py-1 text-[10px] @[15rem]:left-3 @[15rem]:top-3 @[15rem]:text-[11px] font-semibold text-charcoal-800 shadow-sm backdrop-blur">{{ category?.name }}</span>
    </RouterLink>
    <div class="flex flex-1 flex-col p-3 @[15rem]:p-4 @[17rem]:p-5">
      <p class="text-xs font-semibold uppercase tracking-wider text-brand-600">{{ product.brand }}</p>
      <h3 class="mt-1 line-clamp-2 font-display text-sm font-semibold leading-snug text-charcoal-900 @[15rem]:text-base">
        <RouterLink :to="`/products/${product.id}`" class="hover:text-brand-600">{{ product.name }}</RouterLink>
      </h3>
      <p class="mt-1.5 line-clamp-2 text-xs text-gray-500 @[15rem]:text-sm">{{ product.short }}</p>
      <div class="mt-auto pt-4">
        <p class="flex flex-wrap items-baseline gap-x-1.5">
          <span v-if="hasRange" class="text-xs text-gray-500">From</span>
          <span class="font-display text-lg font-bold text-charcoal-900 @[15rem]:text-xl">{{ formatPrice(product.price) }}</span>
          <span class="text-xs text-gray-500">{{ product.unit }}</span>
        </p>
        <div class="mt-3 grid gap-2 @[15rem]:grid-cols-2">
          <RouterLink :to="`/products/${product.id}`" class="btn btn-outline px-2 py-2.5 text-[13px]">View Details</RouterLink>
          <WhatsAppButton :message="productMessage(product.name)" label="Inquiry" size="sm" class="px-2 py-2.5 text-[13px]" :aria-label="`WhatsApp inquiry about ${product.name}`" />
        </div>
      </div>
    </div>
  </article>
</template>

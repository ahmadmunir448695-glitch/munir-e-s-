<script setup>
import CategoryCard from "../components/CategoryCard.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import { categories } from "../data/categories.js";
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-charcoal-950 text-white">
      <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-[90px]" />
      <div class="container-x relative py-12 sm:py-16">
        <p class="eyebrow text-brand-400">Categories</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Shop by category</h1>
        <p class="mt-2 max-w-2xl text-white/70">From the cable in your walls to the light on your ceiling, choose a category to see all its products.</p>
      </div>
    </section>
    <section class="container-x py-10 sm:py-14">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CategoryCard v-for="c in categories" :key="c.slug" :category="c" detailed />
      </div>
      <div class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center sm:flex-row sm:text-left">
        <div>
          <h2 class="font-display text-lg font-semibold text-charcoal-900">Can't find what you need?</h2>
          <p class="text-sm text-gray-500">We stock more items than shown here. Send us the product name and we'll check for you.</p>
        </div>
        <WhatsAppButton label="Ask on WhatsApp" />
      </div>
    </section>
  </div>
</template>

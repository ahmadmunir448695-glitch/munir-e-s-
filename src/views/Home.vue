<script setup>
import Hero from "../components/Hero.vue";
import Icon from "../components/Icon.vue";
import CategoryCard from "../components/CategoryCard.vue";
import ProductCard from "../components/ProductCard.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import { categories } from "../data/categories.js";
import { featuredProducts } from "../data/products.js";
import { store } from "../data/store.js";

const featured = featuredProducts().slice(0, 8);
const brands = [
  { name: "GM Cable", what: "Copper wiring cables", slug: "gm-cable" },
  { name: "Indus", what: "Ceiling, bracket & exhaust fans", slug: "indus-fans" },
  { name: "Pak Light", what: "LED bulbs & SMD lights", slug: "pak-light-led" },
  { name: "Opal", what: "Switches & sockets", slug: "opal-switch-boards" },
];
const reasons = [
  { icon: "shield", title: "Genuine products", text: "Original branded electrical items, so your wiring and fittings last." },
  { icon: "grid", title: "Wide range in one shop", text: "Cables, fans, lights, switch boards and accessories under one roof." },
  { icon: "users", title: "Homes & businesses", text: "Supplies for house wiring, shops, offices and commercial projects." },
  { icon: "chat", title: "Help on phone & WhatsApp", text: "Ask about prices, sizes and availability before you visit." },
];
</script>

<template>
  <div>
    <Hero />

    <!-- Featured categories -->
    <section class="section">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div><p class="eyebrow">Shop by category</p><h2 class="section-title">Everything for your electrical work</h2></div>
          <RouterLink to="/categories" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">All categories <Icon name="arrow" class="h-4 w-4" /></RouterLink>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
          <CategoryCard v-for="c in categories" :key="c.slug" :category="c" />
        </div>
      </div>
    </section>

    <!-- Featured products -->
    <section class="section bg-gray-50">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div><p class="eyebrow">Featured</p><h2 class="section-title">Popular products</h2></div>
          <RouterLink to="/products" class="btn btn-dark">View all products <Icon name="arrow" class="h-4 w-4" /></RouterLink>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="p in featured" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Brands -->
    <section class="section">
      <div class="container-x">
        <div class="text-center"><p class="eyebrow">Brands we stock</p><h2 class="section-title">Popular brands</h2></div>
        <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <RouterLink v-for="b in brands" :key="b.name" :to="{ name: 'products', query: { category: b.slug } }"
            class="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card">
            <p class="font-display text-2xl font-extrabold tracking-tight text-charcoal-900 transition group-hover:text-brand-600 sm:text-3xl">{{ b.name }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ b.what }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="section relative overflow-hidden bg-charcoal-900 text-white">
      <div class="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
      <div class="container-x relative">
        <div class="max-w-2xl"><p class="eyebrow text-brand-400">Why choose us</p><h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your local store for reliable electrical supplies</h2></div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="r in reasons" :key="r.title" class="glass rounded-2xl p-6 transition hover:bg-white/15">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white shadow-lg"><Icon :name="r.icon" class="h-6 w-6" /></span>
            <h3 class="mt-4 text-lg font-semibold">{{ r.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-white/70">{{ r.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WhatsApp CTA -->
    <section class="section">
      <div class="container-x">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-12 text-white shadow-lift sm:px-12">
          <svg class="absolute -right-10 -top-10 h-64 w-64 text-white/10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
          <div class="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Need a price or product advice?</h2>
              <p class="mt-3 max-w-xl text-white/85">Send us the product name, size or wattage on WhatsApp and we'll reply with price and availability. You can also call us directly.</p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <WhatsAppButton size="lg" label="Chat on WhatsApp" class="bg-white! text-charcoal-900! hover:bg-gray-100!" />
              <a :href="`tel:${store.phoneTel}`" class="btn btn-ghost-light px-6 py-3.5 text-base"><Icon name="phone" class="h-5 w-5" />{{ store.phoneDisplay }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

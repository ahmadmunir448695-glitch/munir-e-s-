<script setup>
import Icon from "./Icon.vue";
import WhatsAppButton from "./WhatsAppButton.vue";
import { store } from "../data/store.js";
import { categories } from "../data/categories.js";

const year = new Date().getFullYear();
const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "All Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];
</script>

<template>
  <footer class="bg-charcoal-950 text-white/70">
    <div class="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
      <div>
        <RouterLink to="/" class="flex items-center gap-2.5">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white"><Icon name="bolt" class="h-5 w-5" /></span>
          <span class="font-display text-lg font-bold text-white">{{ store.name }}</span>
        </RouterLink>
        <p class="mt-4 max-w-xs text-sm leading-relaxed">Genuine electrical products for homes, shops and offices: cables, fans, lights, switch boards and accessories.</p>
        <div class="mt-5 flex gap-2">
          <a :href="`tel:${store.phoneTel}`" class="btn bg-white/10 px-4 py-2.5 text-white hover:bg-white/20"><Icon name="phone" class="h-4 w-4" />Call</a>
          <WhatsAppButton size="sm" class="px-4 py-2.5" />
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Quick links</h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="l in links" :key="l.to"><RouterLink :to="l.to" class="hover:text-brand-400">{{ l.label }}</RouterLink></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Categories</h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="c in categories" :key="c.slug"><RouterLink :to="{ name: 'products', query: { category: c.slug } }" class="hover:text-brand-400">{{ c.name }}</RouterLink></li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
        <ul class="mt-4 space-y-3 text-sm">
          <li class="flex gap-3"><Icon name="phone" class="mt-0.5 h-4 w-4 text-brand-400" /><a :href="`tel:${store.phoneTel}`" class="hover:text-brand-400">{{ store.phoneDisplay }} (Call / WhatsApp)</a></li>
          <li class="flex gap-3"><Icon name="pin" class="mt-0.5 h-4 w-4 text-brand-400" /><span>{{ store.address }}</span></li>
          <li class="flex gap-3"><Icon name="clock" class="mt-0.5 h-4 w-4 text-brand-400" /><span><span v-for="h in store.hours" :key="h.days" class="block">{{ h.days }}: {{ h.time }}</span></span></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="container-x flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ store.name }}. All rights reserved.</p>
        <p>Prices are for reference. Please confirm price and availability on call or WhatsApp.</p>
      </div>
    </div>
  </footer>
</template>

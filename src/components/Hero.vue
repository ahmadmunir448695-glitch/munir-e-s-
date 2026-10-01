<script setup>
import Icon from "./Icon.vue";
import WhatsAppButton from "./WhatsAppButton.vue";
import ProductImage from "./ProductImage.vue";
import { store } from "../data/store.js";

const tiles = [
  { img: "/images/products/bulb-warm.svg", label: "LED Bulbs", cls: "float" },
  { img: "/images/products/fan-ceiling-brown.svg", label: "Ceiling Fans", cls: "float-slow" },
  { img: "/images/products/cable-red.svg", label: "Copper Cable", cls: "float-slow" },
  { img: "/images/products/switch-2-socket.svg", label: "Switch Boards", cls: "float" },
];
const points = ["Genuine electrical products", "For homes, shops & offices", "Quick help on phone & WhatsApp"];
</script>

<template>
  <section class="relative isolate overflow-hidden bg-charcoal-950 text-white">
    <!-- Background: glow, circuit lines and light beams -->
    <div class="absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-500/30 blur-[120px] glow" />
    <div class="absolute -bottom-48 -left-24 -z-10 h-96 w-96 rounded-full bg-brand-600/15 blur-[100px]" />
    <svg class="absolute inset-0 -z-10 h-full w-full opacity-[.07]" aria-hidden="true">
      <defs>
        <pattern id="circuit" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M0 60h40l10-10h30l10 10h30M60 0v30l10 10v40l-10 10v30" fill="none" stroke="#fff" stroke-width="1.5" />
          <circle cx="50" cy="50" r="3" fill="#fff" /><circle cx="70" cy="80" r="3" fill="#fff" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
    <div class="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

    <div class="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-200">
          <Icon name="bolt" class="h-3.5 w-3.5 text-brand-400" /> GM Cable · Indus · Pak Light · Opal
        </p>
        <h1 class="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          Quality Electrical Products for Every
          <span class="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">Home &amp; Business</span>
        </h1>
        <p class="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Trusted cables, fans, LED and SMD lights, switch boards and electrical accessories, all at {{ store.name }}.
          Ask for prices and availability on a call or WhatsApp.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink to="/products" class="btn btn-primary px-7 py-3.5 text-base">Shop Products <Icon name="arrow" class="h-5 w-5" /></RouterLink>
          <WhatsAppButton size="lg" label="Contact on WhatsApp" />
        </div>
        <ul class="mt-8 grid gap-2 text-sm text-white/75 sm:grid-cols-3 sm:gap-4">
          <li v-for="p in points" :key="p" class="flex items-center gap-2">
            <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-400"><Icon name="check" class="h-3.5 w-3.5" /></span>{{ p }}
          </li>
        </ul>
      </div>

      <!-- Store visual: floating product tiles in a glass panel -->
      <div class="relative mx-auto w-full max-w-lg">
        <div class="absolute inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/40 to-transparent blur-2xl" />
        <div class="glass rounded-[2rem] p-4 shadow-2xl sm:p-5">
          <div class="mb-4 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
            <div class="flex items-center gap-2 text-sm font-semibold"><span class="h-2.5 w-2.5 rounded-full bg-whatsapp glow" />Available at the store</div>
            <a :href="`tel:${store.phoneTel}`" class="text-xs font-semibold text-brand-300 hover:text-brand-200">{{ store.phoneDisplay }}</a>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <div v-for="(t, i) in tiles" :key="t.label" :class="['overflow-hidden rounded-2xl bg-white shadow-lg', t.cls]" :style="{ animationDelay: `${i * 0.6}s` }">
              <ProductImage :src="t.img" :alt="t.label" eager class="aspect-square w-full object-cover" />
              <p class="bg-white px-3 pb-3 text-center text-xs font-semibold text-charcoal-800 sm:text-sm">{{ t.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

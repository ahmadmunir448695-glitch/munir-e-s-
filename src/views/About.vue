<script setup>
import Icon from "../components/Icon.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import ProductImage from "../components/ProductImage.vue";
import { store } from "../data/store.js";

const values = [
  { icon: "shield", title: "Quality products", text: "We keep products from well-known brands such as GM Cable, Indus, Pak Light and Opal, chosen for safe and lasting electrical work." },
  { icon: "check", title: "Genuine electrical products", text: "Original items from the brands you ask for, so wiring, fittings and fans work as they should." },
  { icon: "users", title: "Homes and businesses", text: "We serve families wiring or renovating a house, as well as shops, offices, contractors and commercial projects." },
  { icon: "bolt", title: "Reliable service", text: "Honest advice on the right cable size, fan or light for your need, and help finding what you are looking for." },
  { icon: "chat", title: "Support on phone & WhatsApp", text: `Call or WhatsApp ${store.phoneDisplay} to ask about prices, availability and the right product for your work.` },
];
const range = ["Copper house-wiring cables", "Ceiling, bracket & exhaust fans", "LED bulbs in many wattages", "SMD panel lights", "Switches, sockets & combinations", "Breakers, DB boxes & accessories"];
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-charcoal-950 text-white">
      <div class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/25 blur-[100px]" />
      <div class="container-x relative py-14 sm:py-20">
        <p class="eyebrow text-brand-400">About us</p>
        <h1 class="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">About {{ store.name }}</h1>
        <p class="mt-4 max-w-2xl text-lg text-white/70">A local electrical store for quality, genuine electrical products, for your home, your shop and your business.</p>
      </div>
    </section>

    <section class="section">
      <div class="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p class="eyebrow">Who we are</p>
          <h2 class="section-title">Electrical supplies you can rely on</h2>
          <div class="mt-5 space-y-4 leading-relaxed text-gray-600">
            <p>{{ store.name }} supplies everyday electrical products for residential and commercial customers: cables for new wiring, fans for every room, energy-saving lighting, switch boards and the accessories that complete the job.</p>
            <p>Our aim is simple: give customers genuine products, fair guidance and quick answers. Whether you are wiring a new house, replacing a fan, or buying in quantity for a project, we're happy to help you choose the right item.</p>
            <p>You can reach us any time on call or WhatsApp at <a :href="`tel:${store.phoneTel}`" class="font-semibold text-brand-600 hover:underline">{{ store.phoneDisplay }}</a> for prices, availability and advice.</p>
          </div>
          <ul class="mt-6 grid gap-2 sm:grid-cols-2">
            <li v-for="r in range" :key="r" class="flex items-center gap-2 text-sm text-charcoal-800"><Icon name="check" class="h-4 w-4 text-brand-500" />{{ r }}</li>
          </ul>
        </div>
        <div class="relative">
          <div class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-200/60 to-transparent blur-2xl" />
          <div class="grid grid-cols-2 gap-4">
            <ProductImage src="/images/products/smd-round-warm.svg" alt="SMD light" class="rounded-2xl border border-gray-200 shadow-card" />
            <ProductImage src="/images/products/fan-royal.svg" alt="Ceiling fan" class="mt-8 rounded-2xl border border-gray-200 shadow-card" />
            <ProductImage src="/images/products/cable-blue.svg" alt="Copper cable" class="rounded-2xl border border-gray-200 shadow-card" />
            <ProductImage src="/images/products/switch-4.svg" alt="Switch board" class="mt-8 rounded-2xl border border-gray-200 shadow-card" />
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-gray-50">
      <div class="container-x">
        <div class="text-center"><p class="eyebrow">What we offer</p><h2 class="section-title">Why customers choose us</h2></div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="v in values" :key="v.title" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon :name="v.icon" class="h-6 w-6" /></span>
            <h3 class="mt-4 text-lg font-semibold text-charcoal-900">{{ v.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-gray-600">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-x flex flex-col items-center gap-5 text-center">
        <h2 class="section-title">Have a question about a product?</h2>
        <p class="max-w-xl text-gray-600">Message us on WhatsApp or call, and we'll guide you to the right product.</p>
        <div class="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton size="lg" label="Chat on WhatsApp" />
          <a :href="`tel:${store.phoneTel}`" class="btn btn-dark px-6 py-3.5 text-base"><Icon name="phone" class="h-5 w-5" />Call {{ store.phoneDisplay }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

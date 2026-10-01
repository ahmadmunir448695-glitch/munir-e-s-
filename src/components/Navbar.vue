<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Icon from "./Icon.vue";
import SearchBar from "./SearchBar.vue";
import WhatsAppButton from "./WhatsAppButton.vue";
import { store } from "../data/store.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
const route = useRoute();
const menuOpen = ref(false);
const searchOpen = ref(false);
const scrolled = ref(false);
const isActive = (to) => (to === "/" ? route.path === "/" : route.path.startsWith(to));

// Close the mobile menu and search when the page changes.
watch(() => route.fullPath, () => ((menuOpen.value = false), (searchOpen.value = false)));
const onScroll = () => (scrolled.value = window.scrollY > 8);
const onKey = (e) => e.key === "Escape" && ((menuOpen.value = false), (searchOpen.value = false));
onMounted(() => (window.addEventListener("scroll", onScroll, { passive: true }), window.addEventListener("keydown", onKey)));
onBeforeUnmount(() => (window.removeEventListener("scroll", onScroll), window.removeEventListener("keydown", onKey)));
</script>

<template>
  <!-- Announcement bar -->
  <div class="bg-charcoal-950 text-white">
    <div class="container-x flex items-center justify-center gap-2 py-2 text-center text-[11px] min-[400px]:text-xs sm:text-sm">
      <Icon name="bolt" class="hidden h-4 w-4 text-brand-400 min-[400px]:block" />
      <p>
        <span class="font-medium">{{ store.tagline }}</span><span class="text-white/40"> | </span>Contact: <a :href="`tel:${store.phoneTel}`" class="whitespace-nowrap font-semibold text-brand-400 hover:underline">{{ store.phoneDisplay }}</a>
      </p>
    </div>
  </div>

  <header :class="['sticky top-0 z-40 border-b transition duration-300', scrolled ? 'border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-lg' : 'border-transparent bg-white']">
    <div class="container-x flex h-16 items-center gap-4 lg:h-20">
      <!-- Logo -->
      <RouterLink to="/" class="flex shrink-0 items-center gap-2.5" aria-label="Munir Electric Store home">
        <span class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(249_115_22/.8)]">
          <Icon name="bolt" class="h-5 w-5" />
        </span>
        <span class="leading-tight">
          <span class="block font-display text-lg font-bold text-charcoal-900">Munir Electric</span>
          <span class="block text-[10px] font-semibold uppercase tracking-[.22em] text-brand-600">Store</span>
        </span>
      </RouterLink>

      <!-- Desktop links -->
      <nav class="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to"
          :class="['relative rounded-lg px-3.5 py-2 text-sm font-medium transition', isActive(l.to) ? 'text-brand-600' : 'text-charcoal-700 hover:text-charcoal-900']"
          :aria-current="isActive(l.to) ? 'page' : undefined">
          {{ l.label }}
          <span v-if="isActive(l.to)" class="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
        </RouterLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <div class="hidden w-64 xl:block"><SearchBar /></div>
        <button type="button" class="grid h-10 w-10 place-items-center rounded-xl text-charcoal-700 hover:bg-gray-100 xl:hidden" :aria-expanded="searchOpen" aria-label="Search" @click="(searchOpen = !searchOpen), (menuOpen = false)">
          <Icon name="search" class="h-5 w-5" />
        </button>
        <!-- Wrapped so "hidden" isn't overridden by the button's own display class -->
        <div class="hidden sm:block"><WhatsAppButton size="sm" label="WhatsApp" /></div>
        <div class="sm:hidden"><WhatsAppButton variant="icon" label="Chat on WhatsApp" /></div>
        <button type="button" class="grid h-10 w-10 place-items-center rounded-xl text-charcoal-900 hover:bg-gray-100 lg:hidden" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="(menuOpen = !menuOpen), (searchOpen = false)">
          <Icon :name="menuOpen ? 'close' : 'menu'" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Search row (tablet & mobile) -->
    <Transition name="fade">
      <div v-if="searchOpen" class="border-t border-gray-100 bg-white xl:hidden">
        <div class="container-x py-3"><SearchBar autofocus @submitted="searchOpen = false" /></div>
      </div>
    </Transition>

    <!-- Mobile menu -->
    <Transition name="fade">
      <nav v-if="menuOpen" id="mobile-menu" class="border-t border-gray-100 bg-white shadow-lg lg:hidden" aria-label="Mobile">
        <div class="container-x space-y-1 py-4">
          <RouterLink v-for="l in links" :key="l.to" :to="l.to"
            :class="['flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium', isActive(l.to) ? 'bg-brand-50 text-brand-700' : 'text-charcoal-900 hover:bg-gray-50']">
            {{ l.label }} <Icon name="arrow" class="h-4 w-4 opacity-40" />
          </RouterLink>
          <div class="grid grid-cols-2 gap-2 pt-3">
            <a :href="`tel:${store.phoneTel}`" class="btn btn-outline"><Icon name="phone" class="h-4 w-4" />Call</a>
            <WhatsAppButton label="WhatsApp" />
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>

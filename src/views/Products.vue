<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "../components/Icon.vue";
import SearchBar from "../components/SearchBar.vue";
import ProductCard from "../components/ProductCard.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import { products } from "../data/products.js";
import { categories, categoryBySlug } from "../data/categories.js";

const route = useRoute();
const router = useRouter();

// Search, category and sort live in the address (?q=…&category=…&sort=…) so results can be shared and survive refresh.
const setQuery = (patch) => {
  const next = { ...route.query, ...patch };
  for (const k of Object.keys(next)) if (!next[k]) delete next[k];
  router.replace({ query: next });
};
const q = computed({ get: () => String(route.query.q || ""), set: (v) => setQuery({ q: v.trim() ? v : "" }) });
const category = computed(() => (categoryBySlug(route.query.category) ? String(route.query.category) : ""));
const sort = computed({ get: () => String(route.query.sort || "featured"), set: (v) => setQuery({ sort: v === "featured" ? "" : v }) });

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

// Every word must appear somewhere (any order). Results are ranked: words in the product name count most,
// then brand/category/variant, then the descriptions — so "fan" lists fans before cables that mention fans.
const normalise = (s) => String(s || "").toLowerCase().replace(/["”]/g, "");
const relevance = (p, words) => {
  const name = normalise(p.name);
  const meta = normalise([p.brand, categoryBySlug(p.category)?.name, ...(p.variants || []).map((v) => v.label), ...(p.options || []).flatMap((o) => o.values)].join(" "));
  const text = normalise([p.short, p.description].join(" "));
  let score = 0;
  for (const w of words) {
    if (name.includes(w)) score += 10;
    else if (meta.includes(w)) score += 5;
    else if (text.includes(w)) score += 1;
    else return 0; // a word that isn't anywhere: not a match
  }
  return score;
};
const results = computed(() => {
  const words = normalise(q.value).split(/\s+/).filter(Boolean);
  let list = products
    .filter((p) => !category.value || p.category === category.value)
    .map((p) => ({ p, score: words.length ? relevance(p, words) : 1 }))
    .filter((x) => x.score > 0);
  const by = {
    "price-asc": (a, b) => a.p.price - b.p.price,
    "price-desc": (a, b) => b.p.price - a.p.price,
    name: (a, b) => a.p.name.localeCompare(b.p.name),
    featured: (a, b) => b.score - a.score || Number(!!b.p.featured) - Number(!!a.p.featured),
  };
  return list.sort(by[sort.value] || by.featured).map((x) => x.p);
});
const count = (slug) => products.filter((p) => p.category === slug).length;
const activeName = computed(() => categoryBySlug(category.value)?.name);
const clearAll = () => router.replace({ query: {} });
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-charcoal-950 text-white">
      <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-[90px]" />
      <div class="container-x relative py-12 sm:py-14">
        <p class="eyebrow text-brand-400">Catalogue</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{{ activeName || "All Products" }}</h1>
        <p class="mt-2 max-w-2xl text-white/70">Browse cables, fans, LED and SMD lights, switch boards and accessories. Tap WhatsApp Inquiry on any product to ask about the price and stock.</p>
        <div class="mt-6 max-w-xl"><SearchBar v-model="q" live dark /></div>
      </div>
    </section>

    <section class="container-x py-8 sm:py-10">
      <!-- Category filter + sort -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filter by category">
          <button type="button" :aria-pressed="!category" @click="setQuery({ category: '' })"
            :class="['shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition', !category ? 'border-charcoal-900 bg-charcoal-900 text-white' : 'border-gray-200 bg-white text-charcoal-700 hover:border-gray-300']">
            All <span class="opacity-60">({{ products.length }})</span>
          </button>
          <button v-for="c in categories" :key="c.slug" type="button" :aria-pressed="category === c.slug" @click="setQuery({ category: c.slug })"
            :class="['shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition', category === c.slug ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 bg-white text-charcoal-700 hover:border-brand-300']">
            {{ c.name }} <span class="opacity-60">({{ count(c.slug) }})</span>
          </button>
        </div>
        <div class="flex items-center justify-between gap-3 lg:justify-end">
          <p class="text-sm text-gray-500" aria-live="polite">{{ results.length }} product{{ results.length === 1 ? "" : "s" }}</p>
          <label class="flex items-center gap-2 text-sm">
            <Icon name="sort" class="h-4 w-4 text-gray-400" />
            <span class="sr-only">Sort by</span>
            <select v-model="sort" class="rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15">
              <option v-for="s in SORTS" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </label>
        </div>
      </div>

      <p v-if="q || category" class="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
        Showing results<template v-if="q.trim()"> for <strong class="text-charcoal-900">“{{ q.trim() }}”</strong></template><template v-if="activeName"> in <strong class="text-charcoal-900">{{ activeName }}</strong></template>
        <button type="button" class="font-semibold text-brand-600 hover:underline" @click="clearAll">Clear filters</button>
      </p>

      <TransitionGroup v-if="results.length" tag="div" name="fade" class="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard v-for="p in results" :key="p.id" :product="p" />
      </TransitionGroup>

      <!-- Empty state -->
      <div v-else class="mt-8 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
        <span class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Icon name="search" class="h-8 w-8" /></span>
        <h2 class="mt-5 text-xl font-semibold text-charcoal-900">No products found</h2>
        <p class="mx-auto mt-2 max-w-md text-gray-500">We couldn't find “{{ q.trim() }}”{{ activeName ? ` in ${activeName}` : "" }}. Try a shorter word like “fan”, “7/29” or “12W”, or ask us directly.</p>
        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" class="btn btn-dark" @click="clearAll">Show all products</button>
          <WhatsAppButton :message="`Assalam o Alaikum, do you have ${q || 'this item'}? Please share price and availability.`" label="Ask on WhatsApp" />
        </div>
      </div>
    </section>
  </div>
</template>

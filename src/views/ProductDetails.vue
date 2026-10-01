<script setup>
import { computed, ref, watchEffect } from "vue";
import Icon from "../components/Icon.vue";
import ProductImage from "../components/ProductImage.vue";
import ProductCard from "../components/ProductCard.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import { productById, products } from "../data/products.js";
import { categoryBySlug } from "../data/categories.js";
import { store } from "../data/store.js";
import { formatPrice, productMessage } from "../utils/whatsapp.js";

const props = defineProps({ id: { type: String, required: true } });
const product = computed(() => productById(props.id));
const category = computed(() => product.value && categoryBySlug(product.value.category));

const variantIndex = ref(0);
const choices = ref({}); // option name → chosen value
const quantity = ref(1);
const variant = computed(() => product.value?.variants?.[variantIndex.value]);
const price = computed(() => variant.value?.price ?? product.value?.price);

watchEffect(() => {
  if (!product.value) return (document.title = "Product not found | Munir Electric Store");
  document.title = `${product.value.name} | Munir Electric Store`;
  choices.value = Object.fromEntries((product.value.options || []).map((o) => [o.name, o.values[0]]));
});

const setQty = (n) => (quantity.value = Math.min(999, Math.max(1, Math.round(Number(n) || 1))));
const selection = computed(() => [variant.value?.label, ...Object.values(choices.value)].filter(Boolean).join(", "));
const message = computed(() => product.value && productMessage(product.value.name, { variant: selection.value, quantity: quantity.value }));

// Same category first, then same brand, to fill four slots.
const related = computed(() => {
  if (!product.value) return [];
  const p = product.value;
  const same = products.filter((x) => x.id !== p.id && x.category === p.category);
  const brand = products.filter((x) => x.id !== p.id && x.category !== p.category && x.brand === p.brand);
  return [...same, ...brand].slice(0, 4);
});
</script>

<template>
  <div v-if="product">
    <!-- Breadcrumb -->
    <nav class="border-b border-gray-100 bg-gray-50" aria-label="Breadcrumb">
      <ol class="container-x flex flex-wrap items-center gap-1.5 py-3 text-sm text-gray-500">
        <li><RouterLink to="/" class="hover:text-brand-600">Home</RouterLink></li>
        <li aria-hidden="true">/</li>
        <li><RouterLink to="/products" class="hover:text-brand-600">Products</RouterLink></li>
        <li aria-hidden="true">/</li>
        <li><RouterLink :to="{ name: 'products', query: { category: product.category } }" class="hover:text-brand-600">{{ category?.name }}</RouterLink></li>
        <li aria-hidden="true">/</li>
        <li class="line-clamp-1 font-medium text-charcoal-900" aria-current="page">{{ product.name }}</li>
      </ol>
    </nav>

    <section class="container-x grid gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-14">
      <!-- Image -->
      <div class="lg:sticky lg:top-28 lg:self-start">
        <div class="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-brand-50/50 shadow-card">
          <ProductImage :src="product.image" :alt="product.name" eager class="aspect-square w-full object-cover" />
          <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal-800 shadow-sm backdrop-blur">{{ category?.name }}</span>
        </div>
      </div>

      <!-- Info -->
      <div>
        <p class="text-sm font-semibold uppercase tracking-wider text-brand-600">{{ product.brand }}</p>
        <h1 class="mt-2 text-3xl font-bold leading-tight tracking-tight text-charcoal-900 sm:text-4xl">{{ product.name }}</h1>
        <p class="mt-4 flex flex-wrap items-baseline gap-2">
          <span class="font-display text-3xl font-extrabold text-charcoal-900">{{ formatPrice(price) }}</span>
          <span class="text-sm text-gray-500">{{ product.unit }}</span>
        </p>
        <p class="mt-1 text-xs text-gray-500">Reference price. Confirm the latest price and stock on WhatsApp or call.</p>
        <p class="mt-5 leading-relaxed text-gray-600">{{ product.description }}</p>

        <!-- Variants -->
        <fieldset v-if="product.variants?.length" class="mt-6">
          <legend class="text-sm font-semibold text-charcoal-900">Available variants</legend>
          <div class="mt-2.5 flex flex-wrap gap-2">
            <button v-for="(v, i) in product.variants" :key="v.label" type="button" :aria-pressed="variantIndex === i" @click="variantIndex = i"
              :class="['rounded-xl border px-4 py-2.5 text-sm font-medium transition', variantIndex === i ? 'border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/20' : 'border-gray-200 bg-white text-charcoal-700 hover:border-gray-300']">
              {{ v.label }} <span class="ml-1 text-xs text-gray-500">{{ formatPrice(v.price) }}</span>
            </button>
          </div>
        </fieldset>

        <!-- Options (colour, base type…) -->
        <fieldset v-for="o in product.options || []" :key="o.name" class="mt-5">
          <legend class="text-sm font-semibold text-charcoal-900">{{ o.name }}: <span class="font-normal text-gray-600">{{ choices[o.name] }}</span></legend>
          <div class="mt-2.5 flex flex-wrap gap-2">
            <button v-for="val in o.values" :key="val" type="button" :aria-pressed="choices[o.name] === val" @click="choices[o.name] = val"
              :class="['rounded-full border px-4 py-2 text-sm transition', choices[o.name] === val ? 'border-charcoal-900 bg-charcoal-900 text-white' : 'border-gray-200 bg-white text-charcoal-700 hover:border-gray-300']">
              {{ val }}
            </button>
          </div>
        </fieldset>

        <!-- Quantity + actions -->
        <div class="mt-6 flex flex-wrap items-end gap-4">
          <div>
            <label for="qty" class="text-sm font-semibold text-charcoal-900">Quantity</label>
            <div class="mt-2.5 flex items-center rounded-xl border border-gray-200 bg-white">
              <button type="button" class="grid h-11 w-11 place-items-center text-charcoal-700 hover:text-brand-600 disabled:opacity-40" :disabled="quantity <= 1" aria-label="Decrease quantity" @click="setQty(quantity - 1)"><Icon name="minus" class="h-4 w-4" /></button>
              <input id="qty" :value="quantity" type="number" inputmode="numeric" min="1" max="999" class="h-11 w-14 border-x border-gray-200 text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" @change="setQty($event.target.value)" />
              <button type="button" class="grid h-11 w-11 place-items-center text-charcoal-700 hover:text-brand-600" aria-label="Increase quantity" @click="setQty(quantity + 1)"><Icon name="plus" class="h-4 w-4" /></button>
            </div>
          </div>
          <p v-if="quantity > 1" class="pb-3 text-sm text-gray-600">Estimated: <strong class="text-charcoal-900">{{ formatPrice(price * quantity) }}</strong></p>
        </div>
        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <WhatsAppButton :message="message" label="Contact on WhatsApp" size="lg" block />
          <a :href="`tel:${store.phoneTel}`" class="btn btn-outline px-6 py-3.5 text-base"><Icon name="phone" class="h-5 w-5" />Call {{ store.phoneDisplay }}</a>
        </div>
        <p class="mt-3 text-xs text-gray-500">Your WhatsApp message will include: <span class="text-charcoal-700">{{ product.name }}{{ selection ? ` (${selection})` : "" }}{{ quantity > 1 ? `, quantity ${quantity}` : "" }}</span></p>

        <!-- Features & specifications -->
        <div class="mt-8 grid gap-6 sm:grid-cols-2">
          <div v-if="product.features?.length">
            <h2 class="text-base font-semibold text-charcoal-900">Features</h2>
            <ul class="mt-3 space-y-2">
              <li v-for="f in product.features" :key="f" class="flex gap-2.5 text-sm text-gray-600">
                <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600"><Icon name="check" class="h-3.5 w-3.5" /></span>{{ f }}
              </li>
            </ul>
          </div>
          <div v-if="product.specs">
            <h2 class="text-base font-semibold text-charcoal-900">Specifications</h2>
            <dl class="mt-3 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 text-sm">
              <div class="grid grid-cols-2 gap-3 bg-gray-50/60 px-4 py-2.5"><dt class="text-gray-500">Brand</dt><dd class="font-medium text-charcoal-900">{{ product.brand }}</dd></div>
              <div v-for="(val, key) in product.specs" :key="key" class="grid grid-cols-2 gap-3 px-4 py-2.5 odd:bg-gray-50/60"><dt class="text-gray-500">{{ key }}</dt><dd class="font-medium text-charcoal-900">{{ val }}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="border-t border-gray-100 bg-gray-50 py-14">
      <div class="container-x">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div><p class="eyebrow">You may also need</p><h2 class="section-title text-2xl sm:text-3xl">Related products</h2></div>
          <RouterLink :to="{ name: 'products', query: { category: product.category } }" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">More in {{ category?.name }} <Icon name="arrow" class="h-4 w-4" /></RouterLink>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </section>
  </div>

  <!-- Unknown product -->
  <section v-else class="container-x py-24 text-center">
    <span class="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Icon name="box" class="h-8 w-8" /></span>
    <h1 class="mt-5 text-2xl font-bold text-charcoal-900">Product not found</h1>
    <p class="mt-2 text-gray-500">This product may have been removed or the link is incorrect.</p>
    <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <RouterLink to="/products" class="btn btn-primary">Browse all products</RouterLink>
      <WhatsAppButton label="Ask on WhatsApp" variant="outline" />
    </div>
  </section>
</template>

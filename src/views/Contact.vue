<script setup>
// Contact page. The form has no backend: "Send" opens WhatsApp with the message filled in.
import { reactive, ref } from "vue";
import Icon from "../components/Icon.vue";
import WhatsAppButton from "../components/WhatsAppButton.vue";
import { store } from "../data/store.js";
import { categories } from "../data/categories.js";
import { whatsappLink } from "../utils/whatsapp.js";

const form = reactive({ name: "", phone: "", topic: "", message: "" });
const errors = reactive({});
const sent = ref(false);

function submit() {
  errors.name = form.name.trim() ? "" : "Please enter your name.";
  errors.message = form.message.trim() ? "" : "Please write your message.";
  errors.phone = !form.phone.trim() || /^[+\d][\d\s-]{6,}$/.test(form.phone.trim()) ? "" : "Please enter a valid phone number.";
  if (errors.name || errors.message || errors.phone) return;
  const lines = [
    "Assalam o Alaikum,",
    `My name is ${form.name.trim()}.`,
    form.topic && `I'm asking about: ${form.topic}.`,
    form.message.trim(),
    form.phone.trim() && `My number: ${form.phone.trim()}`,
  ].filter(Boolean);
  window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  sent.value = true;
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-charcoal-950 text-white">
      <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/25 blur-[90px]" />
      <div class="container-x relative py-12 sm:py-16">
        <p class="eyebrow text-brand-400">Contact</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Get in touch</h1>
        <p class="mt-2 max-w-2xl text-white/70">Call or WhatsApp us for prices, availability and product advice. We're happy to help.</p>
      </div>
    </section>

    <section class="container-x grid gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_1.15fr]">
      <!-- Details -->
      <div class="space-y-5">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <h2 class="font-display text-xl font-bold text-charcoal-900">{{ store.name }}</h2>
          <p class="mt-1 text-sm text-gray-500">Phone / WhatsApp</p>
          <a :href="`tel:${store.phoneTel}`" class="mt-1 block font-display text-3xl font-extrabold text-brand-600 hover:text-brand-700">{{ store.phoneDisplay }}</a>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <a :href="`tel:${store.phoneTel}`" class="btn btn-dark"><Icon name="phone" class="h-5 w-5" />Call now</a>
            <WhatsAppButton label="WhatsApp" />
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <h3 class="flex items-center gap-2 font-semibold text-charcoal-900"><Icon name="pin" class="h-5 w-5 text-brand-500" />Store location</h3>
          <p class="mt-2 text-gray-600">{{ store.address }}</p>
          <div class="mt-4 grid h-44 place-items-center rounded-xl border border-dashed border-gray-300 bg-[repeating-linear-gradient(45deg,#f9fafb,#f9fafb_12px,#f3f4f6_12px,#f3f4f6_24px)] text-center text-sm text-gray-500">
            <div>
              <Icon name="pin" class="mx-auto h-8 w-8 text-brand-500" />
              <p class="mt-2">Map placeholder: add your Google Maps link in <code class="rounded bg-white px-1">src/data/store.js</code></p>
            </div>
          </div>
          <a v-if="store.mapUrl" :href="store.mapUrl" target="_blank" rel="noopener" class="btn btn-outline mt-4 w-full">Open in Google Maps</a>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <h3 class="flex items-center gap-2 font-semibold text-charcoal-900"><Icon name="clock" class="h-5 w-5 text-brand-500" />Business hours</h3>
          <dl class="mt-3 divide-y divide-gray-100 text-sm">
            <div v-for="h in store.hours" :key="h.days" class="flex justify-between gap-4 py-2.5"><dt class="text-gray-600">{{ h.days }}</dt><dd class="font-semibold text-charcoal-900">{{ h.time }}</dd></div>
          </dl>
        </div>
      </div>

      <!-- Form -->
      <form class="rounded-2xl border border-gray-200 bg-white p-6 shadow-card sm:p-8" novalidate @submit.prevent="submit">
        <h2 class="font-display text-xl font-bold text-charcoal-900">Send us a message</h2>
        <p class="mt-1 text-sm text-gray-500">Your message opens in WhatsApp, ready to send.</p>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label for="c-name" class="mb-1.5 block text-sm font-medium text-charcoal-800">Your name *</label>
            <input id="c-name" v-model="form.name" class="input" autocomplete="name" :aria-invalid="!!errors.name" />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600" role="alert">{{ errors.name }}</p>
          </div>
          <div>
            <label for="c-phone" class="mb-1.5 block text-sm font-medium text-charcoal-800">Phone (optional)</label>
            <input id="c-phone" v-model="form.phone" class="input" type="tel" inputmode="tel" autocomplete="tel" placeholder="03xx-xxxxxxx" :aria-invalid="!!errors.phone" />
            <p v-if="errors.phone" class="mt-1 text-xs text-red-600" role="alert">{{ errors.phone }}</p>
          </div>
          <div class="sm:col-span-2">
            <label for="c-topic" class="mb-1.5 block text-sm font-medium text-charcoal-800">Product category</label>
            <select id="c-topic" v-model="form.topic" class="input">
              <option value="">General question</option>
              <option v-for="c in categories" :key="c.slug" :value="c.name">{{ c.name }}</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="c-message" class="mb-1.5 block text-sm font-medium text-charcoal-800">Message *</label>
            <textarea id="c-message" v-model="form.message" rows="5" class="input resize-y" placeholder="e.g. I need 2 coils of 7/29 cable and 3 ceiling fans. Please share prices." :aria-invalid="!!errors.message" />
            <p v-if="errors.message" class="mt-1 text-xs text-red-600" role="alert">{{ errors.message }}</p>
          </div>
        </div>
        <button type="submit" class="btn mt-6 w-full bg-whatsapp py-3.5 text-base text-white hover:bg-whatsapp-dark"><Icon name="whatsapp" class="h-5 w-5" />Send via WhatsApp</button>
        <p v-if="sent" class="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800" role="status">WhatsApp opened with your message. Press send there to reach us.</p>
      </form>
    </section>
  </div>
</template>

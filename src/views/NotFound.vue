<script setup>
import Icon from "../components/Icon.vue";
</script>

<template>
  <section class="container-x py-24 text-center">
    <p class="font-display text-7xl font-extrabold text-brand-500">404</p>
    <h1 class="mt-3 text-2xl font-bold text-charcoal-900">Page not found</h1>
    <p class="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
    <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <RouterLink to="/" class="btn btn-primary"><Icon name="home" class="h-4 w-4" />Go home</RouterLink>
      <RouterLink to="/products" class="btn btn-outline">Browse products</RouterLink>
    </div>
  </section>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import FloatingActions from "./components/FloatingActions.vue";
</script>

<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">Skip to content</a>
  <Navbar />
  <main id="main" class="min-h-[60vh]">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.name === 'product' ? route.fullPath : route.name" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
  <FloatingActions />
</template>

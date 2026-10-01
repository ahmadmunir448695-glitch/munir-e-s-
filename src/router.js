import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "Quality Electrical Products" } },
  { path: "/products", name: "products", component: () => import("./views/Products.vue"), meta: { title: "Products" } },
  { path: "/products/:id", name: "product", component: () => import("./views/ProductDetails.vue"), props: true },
  { path: "/categories", name: "categories", component: () => import("./views/Categories.vue"), meta: { title: "Categories" } },
  { path: "/about", name: "about", component: () => import("./views/About.vue"), meta: { title: "About Us" } },
  { path: "/contact", name: "contact", component: () => import("./views/Contact.vue"), meta: { title: "Contact" } },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("./views/NotFound.vue"), meta: { title: "Page not found" } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.path === from.path) return false; // filters changing the query keep the scroll position
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta.title) document.title = `${to.meta.title} | Munir Electric Store`;
});

export default router;

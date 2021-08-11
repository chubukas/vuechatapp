import { createWebHistory, createRouter } from "vue-router";

import Chat from "@/components/Chat.vue";
import Register from "@/components/Register.vue";
import Login from "@/components/LogIn.vue";
// import NotFound from "@/components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/:catchAll(.*)",
    // component: NotFound,
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["Login", "Register"];
  const authRequired = !publicPages.includes(to.name);
  const loggesIn = localStorage.getItem("token");

  if (authRequired && !loggesIn) return next({ name: "Login" });

  next();
});

export default router;

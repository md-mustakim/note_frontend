import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Notfound from "@/views/Notfound";
import createCategory from "@/views/Category/Create";
import viewCategory from "@/views/Category/View";
import createNote from "@/views/Note/Create";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: Notfound,
    meta: {
      title: "Not found"
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Not found"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Not found"
    }
  },

  {
    path: "/Category/create",
    name: "categoryCreate",
    component: createCategory,
    meta: {
      title: "Not found"
    }
  },
  {
    path: "/Category/view",
    name: "viewCreate",
    component: viewCategory,
    meta: {
      title: "Not found"
    }
  },
  {
    path: "/Note/create/:category_id",
    name: "createNote",
    component: createNote,
    meta: {
      title: "Not found"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

const guestRoute = ["Login"];

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " | BD TAX CARE";
  let token = localStorage.getItem("userDataNote");

  if (guestRoute.includes(to.name)) {
    // can go to login page
    next();
  } else if (token !== null) {
    // if token is available
    if (guestRoute.includes(to.name)) {
      next("/");
    } else {
      next();
    }
  } else {
    next("/login");
  }
});

export default router;

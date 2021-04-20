import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Notfound from "@/views/Notfound";
import createCategory from "@/views/Category/Create";
import viewCategory from "@/views/Category/View";
import createNote from "@/views/Note/Create";
import Setting from "@/views/Setting";
import NoInternet from "@/views/NoInternet";
import Edit from "@/views/Note/Edit";
import ChangePassword from "@/views/ChangePassword";

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
    name: "Register",
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
      title: "Login"
    }
  },
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      title: "Change Password"
    }
  },

  {
    path: "/Category/create",
    name: "categoryCreate",
    component: createCategory,
    meta: {
      title: "Create Note"
    }
  },
  {
    path: "/Category/view",
    name: "viewCreate",
    component: viewCategory,
    meta: {
      title: "View Category"
    }
  },
  {
    path: "/Note/create/:category_id",
    name: "createNote",
    component: createNote,
    meta: {
      title: "Create Note"
    }
  },
  {
    path: "/Note/Edit/:id",
    name: "Edit",
    component: Edit,
    meta: {
      title: "Edit Note"
    }
  },
  {
    path: "/Setting",
    name: "Setting",
    component: Setting,
    meta: {
      title: "Setting"
    }
  },
  {
    path: "/NoInternet",
    name: "NoInternet",
    component: NoInternet,
    meta: {
      title: "NoInternet"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

const guestRoute = ["Login", "Register"];

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

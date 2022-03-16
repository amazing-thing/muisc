import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/index.vue"),
  },
  {
    path: "/login/detail",
    name: "loginDetail",
    component: () => import("@/page/login/view/LoginDetail/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/page/home/index.vue"),
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("@/page/mine/view/index.vue"),
  },
  {
    //喜欢的歌
    path: "/like",
    name: "like",
    component: () => import("@/page/mine/view/like.vue"),
  },
  {
    //听过的歌
    path: "/record",
    name: "record",
    component: () => import("@/page/mine/view/record.vue"),
  },
  {
    //听过的歌
    path: "/set",
    name: "set",
    component: () => import("@/page/mine/view/set.vue"),
  },
  {
    //每日推荐
    path: "/recommend",
    name: "recommend",
    component: () => import("@/page/home/view/list/recommend/index.vue"),
  },
  {
    //搜索
    path: "/search",
    name: "search",
    component: () => import("@/page/home/view/header/search/index.vue"),
  },
  {
    //歌单详情
    path: "/playlist/:id",
    name: "playlistDetail",
    component: () => import("@/page/home/view/playlist/detail/index.vue"),
  },
  {
    //歌单评论
    path: "/playlist/comment/:id",
    name: "playlistComment",
    component: () => import("@/page/home/view/playlist/comment/index.vue"),
  },
  // {
  //   //歌单广场
  //   path: "/playlist/ground",
  //   name: "playlistGround",
  //   component: () => import("@/page/plground/view/index.vue"),
  // },
  {
    //歌单广场
    path: "/music/:id",
    name: "music",
    component: () => import("@/page/music/view/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

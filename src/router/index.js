import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from "./routes";

Vue.use(VueRouter)

/**
 * 以工厂模式创建一个 router 实例
 */
export function craeteRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}
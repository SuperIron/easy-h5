import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Toast } from "vant";
import config from "./config";
import "@/utils/wx/share";

document.title = config.title;

Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

import { createApp } from 'vue'
import { router } from './utils/router.js'
import i18n from './utils/i18n.js'
import './style.css'
import App from './App.vue'

var app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as labs from 'vuetify/labs/components'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import componentss from '@/Components/UI'
import router from './router/router.js'

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
    labs
});
const pinia = createPinia();

componentss.forEach(component => {
    app.component(component.name, component)
});

app
    .use(router)
    .use(pinia)
    .use(vuetify)
    .mount('#app')
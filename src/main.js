import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ScSuspension from 'sc-suspension'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ScSuspension)

app.mount('#app')

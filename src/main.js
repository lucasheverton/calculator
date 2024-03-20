import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Definindo Variaveis globais
app.config.globalProperties.$calcPrimaryColor = '#2E2F38'
app.config.globalProperties.$calcSecondaryColor = '#4E505F'
app.config.globalProperties.$calcTertiaryColor = '#4B5EFC'

app.mount('#calc')

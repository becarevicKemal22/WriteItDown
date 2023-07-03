import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faBook, faCirclePlus, faTags, faArrowLeft, faFile} from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faTags);
library.add(faCirclePlus);
library.add(faArrowLeft);
library.add(faFile)

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

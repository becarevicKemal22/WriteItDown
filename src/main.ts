import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faBook, faCirclePlus, faTags, faArrowLeft, faFile, faStar} from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faTags);
library.add(faCirclePlus);
library.add(faArrowLeft);
library.add(faFile)
library.add(faStar);
library.add(faClock);

import App from './App.vue'
import router from './router'

import './index.css'
import {faClock} from "@fortawesome/free-regular-svg-icons";

const app = createApp(App)

const pinia = createPinia();
app.use(pinia)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

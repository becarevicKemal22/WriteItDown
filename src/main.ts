import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {
    faBook,
    faCirclePlus,
    faTags,
    faArrowLeft,
    faFile,
    faStar,
    faBold,
    faParagraph,
    faHeading,
    faListUl,
    faListOl,
    faItalic,
    faUnderline,
    faQuoteLeft,
    faAlignLeft,
    faAlignRight,
    faAlignCenter,
    faAlignJustify,
    faCode,
    faArrowTurnUp,
    faArrowTurnDown,
    faFileCircleCheck,
    faFileArrowUp,
} from '@fortawesome/free-solid-svg-icons';

library.add(faBook);
library.add(faTags);
library.add(faCirclePlus);
library.add(faArrowLeft);
library.add(faFile)
library.add(faStar);
library.add(faClock);
library.add(faBold);
library.add(faParagraph);
library.add(faHeading);
library.add(faListUl);
library.add(faListOl);
library.add(faItalic);
library.add(faUnderline);
library.add(faQuoteLeft);
library.add(faAlignLeft);
library.add(faAlignRight);
library.add(faAlignCenter);
library.add(faAlignJustify);
library.add(faCode)
library.add(faArrowTurnUp);
library.add(faArrowTurnDown);
library.add(faFileArrowUp);
library.add(faFileCircleCheck);

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

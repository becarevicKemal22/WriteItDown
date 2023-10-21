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
    faCaretDown,
    faArrowRightFromBracket,
    faEye,
    faEyeSlash,
    faTrash,
    faX,
    faPen,
    faBars,
    faFileCircleExclamation,
    faCircleUser
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
library.add(faGithub);
library.add(faGoogle);
library.add(faCaretDown);
library.add(faArrowRightFromBracket);
library.add(faEye);
library.add(faEyeSlash);
library.add(faTrash);
library.add(faX);
library.add(faPen);
library.add(faBars);
library.add(faFileCircleExclamation);
library.add(faCircleUser)

import App from './App.vue'
import router from './router'

import './index.css'
import {faClock} from "@fortawesome/free-regular-svg-icons";

const app = createApp(App)


import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxYZyED5aS8QJO0JRhn4AecfyZmyhhg3Y",
    authDomain: "write-it-down-10672.firebaseapp.com",
    projectId: "write-it-down-10672",
    storageBucket: "write-it-down-10672.appspot.com",
    messagingSenderId: "887846499086",
    appId: "1:887846499086:web:1904cc55ae487d8a279d5f"
};

const firebaseApp = initializeApp(firebaseConfig);
getFirestore(firebaseApp);

const pinia = createPinia();
app.use(pinia)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

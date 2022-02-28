/*
 * @Author: Neo Huang
 * @Date: 2022-02-18 15:52:59
 * @LastEditTime: 2022-02-20 17:35:30
 * @LastEditors: Neo Huang
 * @Description: 
 * @FilePath: /vueSampleDemo/src/main.js
 */
import {
    createApp
} from 'vue'
import axios from 'axios'
import './main.css'
console.log('axios: ', axios);
import App from './App.vue'
import WebIM from 'easemob-websdk';
console.log('WebIM: ', WebIM);
const app = createApp(App)
app.mount('#app')
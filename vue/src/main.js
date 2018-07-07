
import Vue from 'vue';

// store (Vuex)
import store from './store/store'

import router from './router'

// components
import Links from './components/Links.vue';
import Nav from './components/Nav.vue';
import Result from './components/Result.vue';
import QueryVue from './components/QueryInput.vue'
import WordList from './components/WordsList.vue'

// mixins
import getWordFromHashMixin from './mixins/getWordFromHash.js'

window.$ = window.jQuery = require('jquery');

$.ajax({
    url: '/s/index.json',
    success: (data) => {
        console.log(data);
        store.dispatch('query/importWordIndexFile', {
            data: data.sort()
        })
    },
    error: () => {

    }
})
// Public functions of components through mixin.

const links = new Vue({
    el: '#links',
    store,
    render: h => h(Links)
});
const nav = new Vue({
    el: '#nav',
    store,
    render: h => h(Nav)
});
const queryVue = new Vue({
  el: '#query',
  store,
  render: h => h(QueryVue)
});
const wordList = new Vue({
    el: '#wordList',
    store,
    render: h => h(WordList)
});


const result = new Vue({
    el: '#result',
    store,
    router,
    render: h => h(Result)
});
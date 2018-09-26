import Vue from 'vue';
import VueResource from 'vue-resource';

// components
import Links from './components/Links.vue';
import Nav from './components/Nav.vue';
import Result from './components/Result.vue';
import QueryVue from './components/QueryInput.vue'

// constant
import * as DICT from './const/dictionary';

// css
import './style.scss'

// store (Vuex)
import store from './store/store'

// Make Vue can send ajax
Vue.use(VueResource);

// init 
(function () {
    // add hashchange listener ( 'coz there isn't vue router )
    window.onhashchange = (hashEvent) => {
        const hash = window.location.hash;
        
        let dict = null;
        let word = '';
        switch (hash.charAt(1)) {
            // 潘世光阿法
            case DICT.PAN_SHI_GUANG.HASH_FLAG:
                dict = DICT.PAN_SHI_GUANG;
                word = hash.substr(2, hash.length);
                break;
    
            // 蔡漢中大辭典
            case DICT.CAI_ZHONG_HAN.HASH_FLAG:
                dict = DICT.CAI_ZHONG_HAN;
                word = hash.substr(2, hash.length);
                break;
    
            // 方敏英字典
            default:
                dict = DICT.FANG_MIN_YING;
                word = hash.substr(1, hash.length);
        };
    
        if (store.state.CONFIG.currentDict !== dict) {
            // 如果字典有變化的話，觸發改變字典。
            // 此流程最後會，使用該字典的第一個詞表作為新找查結果，
            // ⋯⋯流程要再修正。
            store.dispatch('CONFIG/changeDict', dict)
        } else if (word) {
            // 如果字典沒有變化，觸發改變找查的字詞
            store.dispatch('CONFIG/changeWord', word)
        }
    }

    window.dispatchEvent(new Event('hashchange'));
    
    // 字詞查詢結果顯示區域
    const result = new Vue({
        el: '#result',
        store,
        render: h => h(Result)
    });

    // Web 時， 右下角 FB, Twitter, google 連結
    const links = new Vue({
        el: '#links',
        store,
        render: h => h(Links)
    });

    // 最上面的 nav bar
    const nav = new Vue({
        el: '#nav',
        store,
        render: h => h(Nav)
    });

    // 查詢 Input
    const queryVue = new Vue({
        el: '#query',
        store,
        render: h => h(QueryVue)
    });

})()




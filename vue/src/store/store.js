import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const CONFIG = {
    /**
     * Vuex will add module namespace prefix on actions / mutations / getters:
     * new store instance like this.
     *  new Vuex.Store({
     *      modules: {
     *          a,
     *      }
     *  })
     * And in component:
     *  this.$store.dispatch('a/ActionOfModuleA')
     */
    namespaced: true,

    state: {
        Lang: 's',
        MAX_RESULT_SHOW: 1024
    }


}

const jQuery = {
    
    namespaced: true,

    /** 
     * This is the functions can invoke in components
     * If the component has used store when new instance.
     *  new Vue({
     *      // other setting... 
     *      store,
     *  });
     * 
     * The store will inject to the component and,
     * develop can trigger actions by as follows:
     *  in template: 
     *      $store.dispatch('action-name')
     *
     *  in script:
     *      this.store.dispatch('action-name') 
     */
    actions: {
        fadeInFacebookPanel: ( {} ) => {
            // fade facebook panel.
            $('iframe').fadeOut('fast');
        },
        test: ({}) => {
            console.log('test')
        }

    }
}

const query = {
    namespaced: true,
    state: {
        inputWord: '',
        wordHistory: [],
        wordList: []
    },
    mutations: {
        changeIndexData: (state, data) => {
            state.wordList = data
        },
        changeWord: (state, word) => {
            state.inputWord = word;
        },
        searchWord: (state, word) => {
            if (!word) 
            {
                word = state.inputWord
            }
        }
    },
    actions: {
        importWordIndexFile: ({commit}, { data }) => {
            commit('changeIndexData', data)
        },
        inputWord: ({commit, state}, { word }) => {
            commit('changeWord', word)
            const isWordInDict = state.wordList.indexOf(word)
            if ( isWordInDict > -1 ) {
                document.title = word
                location.hash = `:${word}`
            } 
        }
    }

}

export default new Vuex.Store({
    modules: {
        CONFIG,
        jQuery,
        query
    }
})
import Vuex from 'vuex'
import Vue from 'vue'
import { Howl } from 'howler'

// class
import Word from '../class/Word.js';

// constant
import * as DICT from '../const/dictionary';
import { LOCAL_STORAGE } from '../const/local-storage';
import * as MEDIA from '../const/player';
import { ROUTE } from '../const/route-path';

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
        /**
         * 目前參照的字典。
         */
        currentDict: null,

        /**
         * 目前查詢的字
         */
        currentWord: null,

        /**
         * 查詢 filter 後，能顯示的最多詞量
         */
        MAX_RESULT_SHOW: 1024,

        /**
         * 該字典所包含的 詞彙。
         */
        wordList: []
    },

    actions: {
        /**
         * 改變目前的 Dict。
         * 包涵異步操作，使用 actions
         */
        changeDict: ({state, commit, dispatch}, dict) => {

            // 如果變更的字典，與現在的字典檔不同 才 asign， 否則不 re-asign
            if (state.currentDict !== dict) {
                // 更新字典
                commit('changeDict', dict)
                
                // 從 json 取得新的詞表
                Vue
                    .http
                    .get(`/${dict.FILE_PATH}/index.json`)
                    .then((res) => {
                        // 重新排列 json 內容
                        res.body.sort();
                        
                        // 更新詞表
                        commit('changeWordList', res.body)

                        // 更新字典時，也會更換/初始化目前查詢的字。
                        dispatch('changeWord', res.body[0]);

                    })
            }
        },

        /**
         * 改變目前的查詢的 字詞
         */
        changeWord: ({state, commit}, word) => {
            
            // 字詞記錄簿
            if (word === ROUTE.WORD_HISTORY) {
                commit('changeWord', new Word(word))
            } else { // 從 json 取得新的詞表
                Vue
                    .http
                    .get(`/${state.currentDict.FILE_PATH}/${word}.json`)
                    .then((res) => {
                        // 更新查詢的詞
                        commit('changeWord', new Word(res.body))
                    })
            }

        } 
    },

    mutations: {
        /**
         * 儲存 字典 變更
         */
        changeDict: (state, dict) => {
            state.currentDict = dict;
        },

        /**
         * 儲存 字詞查詢結果 變更
         * 並變更網頁 title
         * 並變更 hash
         */
        changeWord: (state, word) => {
            state.currentWord = word;
            document.title = `${word.word} -  ${state.currentDict.NAME}`
            window.location.hash = `#${state.currentDict.HASH_FLAG}${word.word}`
        },

        /**
         * 儲存 詞表 變更
         */
        changeWordList: (state, wordList) => {
            state.wordList = wordList;
        },
    }
}

const AudioPlayer = {
    
    namespaced: true,

    state: {
        
        /**
         * 播放器 howler 實體 
         */
        instance: null,

        /** 
         * 播放器狀態。 
         */
        status: MEDIA.STATUS.STOP
    },

    actions: {

        play({state, commit, dispatch}, word) {
            // 馬上變更狀態為讀取中
            commit('changeStatus', MEDIA.STATUS.LOADING);

            // 播放 結束/error 時觸發的 function.
            const done = () => {
                dispatch('stop', MEDIA.STATUS.STOP);
            }
            
            const howl = new Howl({
                buffer: true,
                src: `https://服務.意傳.台灣/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=Pangcah&%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=${word}`,
                onend: done,
                format: ['wav'],
                onloaderror: done,
                onplay: function(){
                    commit('changeStatus', MEDIA.STATUS.PLAYING);
                    commit('chagneInstance', howl);
                }
            });

            // 播放
            howl.play()
        },

        stop({state, commit, dispatch}, word) {
            state.instance.stop();
            commit('changeStatus', MEDIA.STATUS.STOP);
            commit('chagneInstance', null);
        }

    },

    mutations: {

        chagneInstance(state, instance) {
            state.instance = instance;
        },

        /**
         * 儲存 playerStatus 狀態的改變
         *  
         * @param {*} state 
         * @param {*} status 
         */
        changeStatus(state, status) {
            state.status = status;
        },

    }

    

}

/**
 * 包裝 Browser 的 localStorage
 */
const getItem = (key) => {
    return JSON.parse(
        localStorage.getItem(key)
    ) || {}
};

const Storage = {

    namespaced: true,  

    modules: {

        Local: {

            namespaced: true,

            actions: {
                removeRecorded({state, commit, dispatch, rootState}, word) {
                    const currentDictName = rootState.CONFIG.currentDict.NAME;
                    commit('removeRecorded', {
                        currentDictName,
                        word
                    });
                },
                setRecorded({state, commit, dispatch, rootState}, word) {
                    const currentDictName = rootState.CONFIG.currentDict.NAME;
                    commit('setRecorded', {
                        currentDictName,
                        word
                    });
                },
            },
            state: {
                [DICT.CAI_ZHONG_HAN.NAME]: {
                    [LOCAL_STORAGE.KEY.WORD_RECORDED]: getItem(DICT.CAI_ZHONG_HAN.NAME + LOCAL_STORAGE.KEY.WORD_RECORDED),
                    [LOCAL_STORAGE.KEY.WORD_RECENT]: getItem(DICT.CAI_ZHONG_HAN.NAME + LOCAL_STORAGE.WORD_RECENT),
                },
                [DICT.FANG_MIN_YING.NAME]: {
                    [LOCAL_STORAGE.KEY.WORD_RECORDED]: getItem(DICT.FANG_MIN_YING.NAME + LOCAL_STORAGE.KEY.WORD_RECORDED),
                    [LOCAL_STORAGE.KEY.WORD_RECENT]: getItem(DICT.FANG_MIN_YING.NAME + LOCAL_STORAGE.KEY.WORD_RECENT),
                },
                [DICT.PAN_SHI_GUANG.NAME]: {
                    [LOCAL_STORAGE.KEY.WORD_RECORDED]: getItem(DICT.PAN_SHI_GUANG.NAME + LOCAL_STORAGE.KEY.WORD_RECORDED),
                    [LOCAL_STORAGE.KEY.WORD_RECENT]: getItem(DICT.PAN_SHI_GUANG.NAME + LOCAL_STORAGE.KEY.WORD_RECENT),
                },    
            },

            getters: {
                get(state, getters, rootState) {
                    return (type) => {
                        return state[rootState.CONFIG.currentDict.NAME][type];
                    }
                }
            },

            mutations: {
                removeRecorded(state,  {currentDictName, word}) {
                    const temp = state[currentDictName][LOCAL_STORAGE.KEY.WORD_RECORDED];
                    Vue.delete(temp, word)
                    localStorage.setItem(currentDictName + LOCAL_STORAGE.KEY.WORD_RECORDED , JSON.stringify(temp));
                },
                setRecorded(state,  {currentDictName, word}) {
                    const temp = state[currentDictName][LOCAL_STORAGE.KEY.WORD_RECORDED];
                    delete temp[word];
                    Vue.set(temp, word, word)
                    localStorage.setItem(currentDictName + LOCAL_STORAGE.KEY.WORD_RECORDED , JSON.stringify(temp));
                },
            }
        }
    }

}

export default new Vuex.Store({
    namespaced: true,
    modules: {
        CONFIG,
        AudioPlayer,
        Storage
    },
    // 嚴格模式，禁止直接修改 state
    strict: true
})
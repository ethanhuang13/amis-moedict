## 
    字詞記錄簿
##
<template>
    <div
        style="display:inline;">
        <h1 itemprop="name" style="visibility: visible;">字詞紀錄簿</h1>
        
        <template v-if="wordRecorded.length">
            <span
                v-for="word in wordRecorded" 
                :key="word"
                style="clear:both;display:block;"
                >
                <span>·</span>
                <a :href="`./#${$store.state.CONFIG.currentDict.HASH_FLAG}${word}`">{{word}}</a>
            </span>
        </template>

        <!-- 字詞記錄簿為空時的提示字樣 Start -->
        <p 
            v-else
            class="bg-info">
            <span>（請按詞條右方的 </span>
            <i class="icon-bookmark-empty"></i>
            <span> 按鈕，即可將字詞加到這裡。）</span>
        </p>
        <!-- 字詞記錄簿為空時的提示字樣 End -->

        <h3 
            v-if="recentlySearch.length"
            id="lru">
            <span>最近查閱過的字詞</span>
            <input 
                id="btn-clear-lru" 
                type="button" 
                class="btn-default btn btn-tiny" 
                value="清除" 
                style="margin-left:10px;" >
        </h3>
        <span 
            v-for="word in recentlySearch"
            :key="word"
            style="clear:both;display:block;">
            <span>·</span>
            <a :href="`./#${$store.state.CONFIG.currentDict.HASH_FLAG}${word}`">{{word}}</a>
        </span>
    </div>
</template>

<script>
// constant
import { LOCAL_STORAGE } from '../const/local-storage';

export default {

    computed: {
        
        /**
         * 字詞記錄簿
         */
        wordRecorded() {
            const {Storage, CONFIG} = this.$store.state;
           return Object.keys(
                    Storage
                    .Local
                    [CONFIG.currentDict.NAME]
                    [LOCAL_STORAGE.KEY.WORD_RECORDED]
                ).reverse();
        },

        /**
         * 最近搜尋的單字
         */
        recentlySearch() {
            const {Storage, CONFIG} = this.$store.state;
            return Object.keys(
                    Storage
                    .Local
                    [CONFIG.currentDict.NAME]
                    [LOCAL_STORAGE.KEY.WORD_RECENT]
                ).reverse();
        }
    }
}
</script>

<style scoped>
</style>

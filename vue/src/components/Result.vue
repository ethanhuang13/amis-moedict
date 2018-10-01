## 搜尋結果
<template>
    <div id="result" class="result prefer-pinyin-true">
        <!-- 字詞記錄簿 Start -->
        <WordHistory
            v-if="word.word === ROUTE.WORD_HISTORY" 
        ></WordHistory>
        <!-- 字詞記錄簿 End -->

        <!-- 非字詞記錄簿 Start -->
        <div
            v-else-if="word" 
            style="display:inline;" >
            <div style="display:inline;" data-reactid=".0.$0">
                <meta itemprop="image" content="''ayaman.png" data-reactid=".0.$0.0">
                <meta itemprop="name" content="''ayaman" data-reactid=".0.$0.1">
                
                <!-- 加入字詞記錄簿 Start -->
                <i 
                    @click="clickRecordWord(word.word)"
                    :style="{ color: $store.state.CONFIG.currentDict.THEME.COLOR.FONT }"
                    :class="{'icon-bookmark-empty': !isInRecorded}"
                    class="star iconic-color icon-bookmark" 
                    title="加入字詞記錄簿"
                ></i>
                <!-- 加入字詞記錄簿 Icon End -->
                
                <div 
                    v-if="word.tag"
                    class="radical" 
                >
                    <span class="part-of-speech">
                        {{word.tag}}
                    </span>
                </div>
                
                <h1 class="title" data-title="''ayaman" style="visibility: visible;">
                    <span data-reactid=".0.$0.4.0">
                        <div 
                            class="stroke" 
                            title="筆順動畫"
                        >
                            {{ word.word }}
                        </div>
                    </span>
                    <small
                        v-if="word.stem"
                        class="youyin" 
                    >
                        <a 
                            class="xref" 
                            :href="'./#:' + word.stem" 
                        >
                            (詞幹:{{ word.stem }})
                        </a>
                    </small>

                    <!-- 播放音檔 icon -->
                    <i 
                        @click="clickAudioIcon()"
                        itemtype="http://schema.org/AudioObject" 
                        class="playAudio" 
                        :class="getPlayIcon"
                    >
                        <meta 
                            itemprop="name" 
                            content="''ayaman.wav" 
                        >
                        <meta 
                            itemprop="contentURL" 
                            content="https://服務.意傳.台灣/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=Pangcah&amp;%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=''ayaman" 
                        >
                    </i>
                    <!-- 播放音檔 icon -->

                </h1>
                <div class="entry" itemprop="articleBody">
                    <div class="entry-item" >
                        <ol>
                            <li 
                                v-for="(def, index) in word.definitions"
                                :key="index"
                            >
                                <p class="definition">
                                    <span class="def">
                                        {{def.meaning}}
                                    </span>
                                    <span 
                                        v-for="(example, index) in def.exampleStatements"
                                        :key="index"
                                        class="example" 
                                    >
                                        <span class="amisnative">
                                            <template
                                                v-for="(amitWord, index) in example.amitWordsArray"
                                                v-if="!amitWord.match(/[ .!?,]/g)"
                                            >
                                                <a
                                                    :href="'#:' + amitWord"
                                                    :key="index"
                                                >{{amitWord}}</a>
                                            </template>
                                            <template v-else>
                                                {{ amitWord }}
                                            </template>
                                        </span>
                                        <br>
                                        <span class="amismandarin">{{example.chinese}}</span>
                                    </span>
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 非字詞記錄簿 End -->
    </div>
</template>

<script>
// class 
import Word from '../class/Word.js';

// Component
import WordHistory from './WordHistory.vue';

// constant
import * as MEDIA from '../const/player';
import { LOCAL_STORAGE } from '../const/local-storage';
import { ROUTE } from '../const/route-path';

export default {
    components: {
        WordHistory
    },
    computed: {
        
        /**
         * 按照播放器的狀態，顯示適合的 Icon class
         */
        getPlayIcon() {
            let output = 'icon-play';
            switch (this.$store.state.AudioPlayer.status) {
                // 播放器讀取狀態時， icon 要顯示「讀取」
                case MEDIA.STATUS.LOADING:
                    output = 'icon-spinner'
                    break;

                // 播放器播放狀態時， icon 要顯示「停止」
                case MEDIA.STATUS.PLAYING:
                    output = 'icon-stop'
                    break;
                    
            }
            return output;
        },

        isInRecorded() {
            const currentDictName = this.$store.state.CONFIG.currentDict.NAME;
            return this
                .$store
                .state
                .Storage
                .Local
                [currentDictName]
                [LOCAL_STORAGE.KEY.WORD_RECORDED]
                [this.word.word]
        },
        
        /**
         * 當前查詢的詞。
         * 因為從 $store 取太長了，用 computed 取 align。
         */
        word() {
            return this.$store.state.CONFIG.currentWord || {};
        }


    },
    methods: {
        /**
         * 點擊 文字旁邊的 Icon 會觸發的 method
         */
        clickAudioIcon() {
            switch (this.$store.state.AudioPlayer.status) {
                // 播放器停止時， Icon 為播放。點擊時要觸發「播放」事件。
                case MEDIA.STATUS.STOP:
                    this
                        .$store
                        .dispatch(
                            'AudioPlayer/play', 
                            this.$store.state.CONFIG.currentWord.word
                        )
                    break;

                // 播放器播放時， Icon 為停止。點擊時要觸發「停止」事件。
                case MEDIA.STATUS.PLAYING:
                    this.$store.dispatch('AudioPlayer/stop')
                    break;
                    
            }
        },
        clickRecordWord(word) {
            if (this.isInRecorded) {
                // 已經加入字詞簿，被點擊要從字詞簿移除
                this
                    .$store
                    .dispatch('Storage/Local/removeRecorded', word);
            } else { 
                // 未加入字詞簿，被點擊要加入字詞簿
                this
                    .$store
                    .dispatch('Storage/Local/setRecorded', word);
            }
        },
    },
    data() {
        return {
            isPlaying: false,
            ROUTE: ROUTE
        }
    },
}
</script>

<style scoped>
.example {
    font-size: 100%;
    display: inline-block;
    clear: both;
    width: auto;
    border: 1px solid #ddd;
    padding: 3px;
    background: #eee;
    margin-right: 10px;
    margin-bottom: 2px;
    vertical-align: top;
}
.part-of-speech {
    color: white;
    background-color: #6b0000;
    border-radius: 4px;
    padding: 2px;
    font-size: 100%;
    line-height: 1;
}
</style>

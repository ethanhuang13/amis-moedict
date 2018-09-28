## 
    字詞記錄簿
##
<template>
    <div
        style="display:inline;" 
        data-reactid=".0">
        <h1 itemprop="name" data-reactid=".0.0" style="visibility: visible;">字詞紀錄簿</h1>
        <p class="bg-info" data-reactid=".0.1">
            <span data-reactid=".0.1.0">（請按詞條右方的 </span>
            <i class="icon-bookmark-empty" data-reactid=".0.1.1"></i>
            <span data-reactid=".0.1.2"> 按鈕，即可將字詞加到這裡。）</span>
        </p>
        <h3 id="lru" data-reactid=".0.2">
            <span data-reactid=".0.2.0">最近查閱過的字詞</span>
            <input id="btn-clear-lru" type="button" class="btn-default btn btn-tiny" value="清除" style="margin-left:10px;" data-reactid=".0.2.1">
        </h3>
    </div>
</template>

<script>
// // class 
// import Word from '../class/Word.js';

// // constant
// import * as MEDIA from '../const/player';
// import { ROUTE } from '../const/route-path';

export default {
    // computed: {
        
    //     /**
    //      * 按照播放器的狀態，顯示適合的 Icon class
    //      */
    //     getPlayIcon() {
    //        console.log(this.$store.getters);
    //     },
    // }
    
    // methods: {
    //     /**
    //      * 點擊 文字旁邊的 Icon 會觸發的 method
    //      */
    //     clickAudioIcon() {
    //         switch (this.$store.state.AudioPlayer.status) {
    //             // 播放器停止時， Icon 為播放。點擊時要觸發「播放」事件。
    //             case MEDIA.STATUS.STOP:
    //                 this
    //                     .$store
    //                     .dispatch(
    //                         'AudioPlayer/play', 
    //                         this.$store.state.CONFIG.currentWord.word
    //                     )
    //                 break;

    //             // 播放器播放時， Icon 為停止。點擊時要觸發「停止」事件。
    //             case MEDIA.STATUS.PLAYING:
    //                 this.$store.dispatch('AudioPlayer/stop')
    //                 break;
                    
    //         }
    //     }
    // },
    // data() {
    //     return {
    //         isPlaying: false,
    //         ROUTE: ROUTE
    //     }
    // },
}
</script>

<style scoped>
/* .example {
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
} */
</style>

<template lang="html">
<div>
    <!-- 查詢 Input -->
    <input 
        @click.once="fadeInFacebookPanel"
        v-model="inputedString"
        
        autofocus="" 
        autocomplete="off" 
        class="query"
        id="query" 
        placeholder="請輸入欲查詢的字詞" 
        type="search" 
    />
    <!-- 查詢 Input -->

    <div v-if="false">
        <a 
            class="back-box app-only"
            href="#" 
            onclick="pressBack();" 
        >
            <i 
                class="icon-chevron-left"
                style="color: #6B0000" 
            ></i>
        </a>
        <a 
            href="#" 
            onclick="pressErase();" 
            class="erase-box mobile-only"
        >
            <i 
                class="icon-remove-sign"
                style="color: #c0c0c0" 
                title="清除搜尋框" 
            ></i>
        </a>
    </div>

    <div id="timeline" class="hidden-xs">
        
        <!-- 按照 input 的內容顯示的字詞列表 -->
        <div v-if="inputedString">
            <ul 
                class="
                    invisible
                    ui-autocomplete 
                    ui-front 
                    ui-menu 
                    ui-widget 
                    ui-widget-content 
                    ui-corner-all 
                " 
                id="ui-id-1" 
                style="top: 106px; left: 20px; width: 222px;"
            >
                <li 
                    v-for="(item, index) in wordList"
                    class="ui-menu-item" 
                    role="presentation"
                >
                    <a 
                        class="ui-corner-all" 
                        :href="`#${$store.state.CONFIG.currentDict.HASH_FLAG}${item}`"
                    >
                        {{ item }}
                    </a>
                </li>
                <li 
                    v-if="worldList.length === $store.state.CONFIG.MAX_RESULT_SHOW"
                    class="ui-menu-item" 
                    role="presentation"
                >
                    <a 
                        class="ui-corner-all" 
                    >
                        (僅顯示前 {{$store.state.CONFIG.MAX_RESULT_SHOW}} 筆)
                    </a>
                </li>
            </ul>
        </div>
        <!-- 按照 input 的內容顯示的字詞列表 -->

        <!-- Facebook 粉絲頁 -->
        <div 
            data-href="https://www.facebook.com/amis.moedict" 
            data-width="240" 
            data-height="768" 
            data-small-header="true" 
            data-adapt-container-width="false" 
            data-hide-cover="false" 
            data-show-facepile="true" 
            data-show-posts="true" 
            style="height: 100%; width: 100%" 
            class="fb-page"
        >
            <div class="fb-xfbml-parse-ignore">
                <blockquote cite="https://www.facebook.com/amis.moedict">
                    <a 
                        href="https://www.facebook.com/amis.moedict" 
                        style="visibility: hidden"
                    >
                        阿美語萌典 FB 專頁
                    </a>
                </blockquote>
            </div>
        </div>
        <!-- Facebook 粉絲頁 -->

    </div>
</div>    
</template>

<script>
export default {
    data() {
        return {
            /**
             * inputed String
             * two-way binding by v-model
             */
            inputedString : '',

            /**
             * 沒有這個的話，初始化 render template 會有報錯。
             */
            worldList: []
        }    
    },
    computed: {
        /**
         * 是否顯示清除 icon (在 input 裡面)
         */
        isShowErase() {
            return false;
        },

        /**
         * 模糊比對 input 內容之查詢結果。
         */
        wordList() {
            const output = []
            
            const totalWordList = this.$store.state.CONFIG.wordList;
            const currentInput = this.inputedString;
            const isContinue = (i) => {
                return (output.length <= this.$store.state.CONFIG.MAX_RESULT_SHOW && 
                        i < totalWordList.length)
            }
            
            for ( let i = 0; isContinue(i) ; i++) {
                let word = totalWordList[i];

                // 目前 input 和字典裡的詞完全匹配，加到 output Array 最前方。
                if (word === currentInput) {
                    output.unshift(word);
                    continue;
                }

                // 字典裡的詞包含目前 input，加到 output Array 最後方。
                let tempWord = word.replace(/\W/g, '');
                if (tempWord.indexOf(currentInput) === 0) {
                    output.push(word);
                }
            }
            
            return output;
        }
    },
    methods: {
        /**
         * 隱藏 Facebook 區域
         */
        fadeInFacebookPanel() {
            document.getElementsByTagName('iframe')[0].style.display = 'none';
        },
    }
}
</script>

<style lang="scss" scoped>
#timeline {
    bottom: 20px;
    left: 10px; 
    position: absolute; 
    right: 5px; 
    top: 70px; 
}
</style>
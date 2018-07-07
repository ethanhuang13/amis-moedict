<template>
    <div id="result" class="result prefer-pinyin-true">
        <div style="display:inline;" data-reactid=".0">
            <div style="display:inline;" data-reactid=".0.$0">
                <meta itemprop="image" content="''ayaman.png" data-reactid=".0.$0.0">
                <meta itemprop="name" content="''ayaman" data-reactid=".0.$0.1">
                <i class="star iconic-color icon-bookmark-empty" title="加入字詞記錄簿" data-reactid=".0.$0.2"></i>
                
                <div 
                    v-if="word.tag"
                    class="radical" 
                >
                    <span class="part-of-speech">
                        {{word.tag}}
                    </span>
                </div>
                
                <h1 class="title" data-title="''ayaman" data-reactid=".0.$0.4" style="visibility: visible;">
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
                        data-reactid=".0.$0.4.1"
                    >
                        <a 
                            class="xref" 
                            :href="'./#:' + word.stem" 
                            data-reactid=".0.$0.4.1.$'ayam"
                        >
                            (詞幹:{{ word.stem }})
                        </a>
                    </small>
                    <i itemtype="http://schema.org/AudioObject" class="icon-play playAudio" data-reactid=".0.$0.4.2">
                        <meta itemprop="name" content="''ayaman.wav" data-reactid=".0.$0.4.2.0">
                        <meta itemprop="contentURL" content="https://服務.意傳.台灣/%E6%96%87%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%90%88%E6%88%90?%E6%9F%A5%E8%A9%A2%E8%85%94%E5%8F%A3=Pangcah&amp;%E6%9F%A5%E8%A9%A2%E8%AA%9E%E5%8F%A5=''ayaman" data-reactid=".0.$0.4.2.1">
                    </i>
                </h1>
                <div class="entry" itemprop="articleBody" data-reactid=".0.$0.6">
                    <div class="entry-item" data-reactid=".0.$0.6.$0">
                        <ol data-reactid=".0.$0.6.$0.0">
                            <li 
                                v-for="(def, index) in word.definitions"
                                :key="index"
                                data-reactid=".0.$0.6.$0.0.$0"
                            >
                                <p class="definition" data-reactid=".0.$0.6.$0.0.$0.0">
                                    <span class="def" data-reactid=".0.$0.6.$0.0.$0.0.$0">
                                        {{def.meaning}}
                                    </span>
                                    <span 
                                        v-for="(example, index) in def.exampleStatements"
                                        :key="index"
                                        class="example" 
                                        data-reactid=".0.$0.6.$0.0.$0.0.$example=10"
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
    </div>
</template>

<script>
import getWordFromHashMixin from '../mixins/getWordFromHash.js'

// class 
import Word from '../class/Word.js';
export default {
    mixins: [getWordFromHashMixin],
    watch: {
        '$route' (to, from) {
            const currentWord = this.getWordFromHash();
            $.ajax({
                url: `/s/${currentWord}.json`,
                success: (data) => {
                    console.log(JSON.stringify(data))
                    this.word = new Word(data)
                },
                error: () => {

                }
            })

            
        // react to route changes...
        }
    },
    data() {   
        return {
            word: new Word({"h":[{"d":[{"f":"阿美語的輔音之一。屬舌面後清擦音，音值 [ x ]。x 在阿美語中出現頻率不多，在詞尾位置時有輕微送氣現象。"}]}],"t":"x"})
        }
    },
    mounted() {
    }
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

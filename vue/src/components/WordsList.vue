<template lang="html">
<div v-if="$store.state.query.inputWord">
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
        tabindex="0" 
    >
        <li 
            v-for="(item, index) in worldList"
            class="ui-menu-item" 
            role="presentation"
        >
            <a 
                class="ui-corner-all" 
                :href="'#:' + item"
                tabindex="-1"
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
                tabindex="-1"
            >
                (僅顯示前 {{$store.state.CONFIG.MAX_RESULT_SHOW}} 筆)
            </a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
        }    
    },
    computed: {
        worldList() {
            const output = []
            const wordIndexArray = this.$store.state.query.wordList;
            const currentWord = this.$store.state.query.inputWord;
            const isContinue = (i) => {
                return (output.length <= this.$store.state.CONFIG.MAX_RESULT_SHOW && 
                        i < wordIndexArray.length)
            }
            
            for ( let i = 0; isContinue(i) ; i++) {
                let word = wordIndexArray[i];
                if(word === currentWord) {
                    output.unshift(word);
                    continue;
                }

                let tempWord = word.replace(/\W/g, '');
                if (tempWord.indexOf(currentWord) === 0) {
                    output.push(word);
                }
            }
            return output;
        }
    },
    methods: {
        
    }
}
</script>

<style lang="css">

</style>
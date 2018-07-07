<template lang="html">
<div>
    <!-- 
        @change="lookup"
        @keydown="lookup"
        @keypress="lookup"
        @keyup="lookup" 
    -->
    <input 
        @click.once="()=>$store.dispatch('jQuery/fadeInFacebookPanel')"
        @input="lookup"
        v-model="queryString"
        autofocus="" 
        autocomplete="off" 
        class="query"
        id="query" 
        placeholder="請輸入欲查詢的字詞" 
        type="search" 
    />
    <div v-if="isShowErase">
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
</div>    
</template>

<script>
export default {
    data() {
        return {
            queryString : '',
        }    
    },
    computed: {
        isShowErase() {
            return !(this.queryString === '');
        }
    },
    methods: {
        lookup(e) {
            this.$store.dispatch('query/inputWord', {
                word: this.queryString
            })
        }
    }
}
</script>

<style lang="css">

</style>
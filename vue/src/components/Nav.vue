<template lang="html">
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    
    <!-- 左上角 Logo, width < 768px 會消失 -->
    <div class="navbar-header">
        <a class="navbar-brand brand ebas" href="./">阿美語萌典</a>
    </div>
    <!-- 左上角 Logo, width < 768px 會消失 -->

    <!-- 字典列表 -->
    <ul class="nav navbar-nav">

        <li 
            v-bind:class="{ open: isDictionariesShowed}"
            class="dropdown"
        >
            <!-- 目前的辭典 -->
            <a 
                @focus="isDictionariesShowed = true"
                @blur="isDictionariesShowed = false"
                class="dropdown-toggle" 
                data-toggle="dropdown"
                href="javascript:void(0)"
            >
                <i class="icon-book">&nbsp;</i>
                <span 
                    class="lang-active" 
                    style="margin:0;padding:0"
                    itemProp="articleSection"
                >
                  {{ $store.state.CONFIG.currentDict.NAME }}
                </span>
                <b class="caret"></b>
            </a>
            <!-- 目前的辭典 -->

            <!-- 所有辭典列表 -->
            <ul class="dropdown-menu" role="navigation">
                <li 
                    v-for="(dictionary, index) in dictionaries"
                    role="presentation"
                >
                    <a  
                        @focus="changeHash(`#${dictionary.HASH_FLAG}`)"
                        class="p lang-option false" 
                        role="false" 
                        href="javascript:void(0)"
                    >
                        {{dictionary.NAME}}
                    </a>
                </li>
            </ul>
            <!-- 所有辭典列表 -->

        </li>

        <li 
            id="btn-starred" 
            title="字詞紀錄簿"
        >
            <a 
                href="#=*" 
                class="anchor-padding"
            >
              <i 
                  class="icon-bookmark" 
                  style="display: inline;"
              />
              <span class="hidden-xs">字詞紀錄簿</span>
            </a>
        </li>

        <!-- 
            下載擴充套件 不確定什麼時候會顯示， 
            也許是手機版⋯⋯？
            都先註解掉
         -->
        <!-- <li id="btn-moedict-desktop-addons">
            <a 
                href="https://racklin.github.io/moedict-desktop/addon.html" 
                class="anchor-padding" 
                alt="下載擴充套件"
            >
                <i class="icon-download-alt" />
            </a>
        </li>
        
            { 
                window.isMoedictDesktop && 
                <li id="btn-moedict-desktop-addons">
                    <a 
                        href="https://racklin.github.io/moedict-desktop/addon.html" 
                        class="anchor-padding" 
                        alt="下載擴充套件"
                    >
                        <i class="icon-download-alt" />
                    </a>
                </li> 
            }
        -->
        <!-- 下載擴充套件 -->

        <li 
            class="resize-btn app-only" 
            style="
                position: absolute; 
                top: 2px;
                left: 8em;
                padding: 3px
            "
        >
            <a 
                class="anchor-padding"
                style="margin-right:30px;"
                href="#" 
            >
                <!-- a > onClick={()=> window.adjustFontSize(-1)} -->
                <i class="icon-resize-small" />
            </a>
        </li>

        <li 
            class="resize-btn app-only" 
            style="
                position: absolute;
                top: 2px;
                left:8em;
                padding:3px;
                marginLeft:30px;
            "
        >
            <a 
                class="anchor-padding" 
                href="#" 
            >
                <!-- a > onClick={()=> window.adjustFontSize(+1)} -->
                <i class="icon-resize-full" />
            </a>
        </li>
    </ul>
    <!-- 字典列表 -->

    <ul class="nav pull-right hidden-xs">
        <li id="btn-pref" title="偏好設定">
            <a 
                href="#=*"
                class="anchor-padding"
            >
                <i class="icon-cogs" />
            </a>
        </li>
    </ul>

    <!-- 關於本站 -->
    <ul class="nav pull-right hidden-xs">
        <li>
            <a 
                href="about.html" 
                title="關於本站" 
            >
                <span class="iconic-circle">
                    <i class="icon-info" />
                </span>
            </a>
        </li>
    </ul>
    <!-- 關於本站 -->

    <!-- 幫校對 -->
    <ul class="nav pull-right hidden-xs">
        <li>
            <a 
                href="http://ckhis.ck.tp.edu.tw/~ljm/amis-mp/" 
                target="_blank" 
                title="「阿美語萌典」校對活動"
            >
                <img src="https://www.moedict.tw/dodo/icon.png" width="32" height="32" /> 
                幫校對
            </a>
        </li>
    </ul>
    <!-- 幫校對 -->

    <!-- App ToolBox -->
    <ul class="nav pull-right hidden-xs">
        <li 
            class="web-inline-only"
        >
            <a 
                href="https://racklin.github.io/moedict-desktop/download.html"
                class="font-color-gray"
                target="_blank"
                title="桌面版下載（可離線使用）" 
            >
                <i class="icon-download-alt" />
            </a>
        </li>
        <li 
            class="web-inline-only"
        >
            <a 
                href="https://play.google.com/store/apps/details?id=org.audreyt.dict.moe" 
                class="font-color-gray"
                target="_blank" 
                title="Google Play 下載" 
            >
                <i class="icon-android" />
            </a>
        </li>
        <li 
            class="web-inline-only"
        >
            <a 
                href="https://itunes.apple.com/tw/app/meng-dian/id599429224" 
                class="font-color-gray"
                target="_blank" 
                title="App Store 下載" 
            >
                <i class="icon-apple" />
            </a>
        </li>
    </ul> 
    <!-- App ToolBox -->

</nav>
</template>

<script>
import * as DICT from '../const/dictionary';

export default {
    data () {
        return {
            dictionaries: [
                DICT.FANG_MIN_YING,
                DICT.PAN_SHI_GUANG,
                DICT.CAI_ZHONG_HAN
            ],
            isDictionariesShowed: false
        }
    },
    methods: {
        changeHash(hash) {
            window.location.hash = hash
        },
    }

}
</script>

<style lang='scss' scoped>

// 右上角各個 icon 的間距離
.anchor-padding {
    padding-left: 5px;
    padding-right: 5px;
}

// 設定灰色的字
.font-color-gray {
    color: #ccc;
}

// 關於本站按鈕的 icon
.iconic-circle {
    background: #474;
}

@media only screen and (min-width: 768px){
    .nav .web-inline-only {
        display: inline-block !important;
        
        a {
            padding-left: 6px;
            padding-right: 6px;
        }
    }
}
</style>
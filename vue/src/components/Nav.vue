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
            <a 
                @focus="isDictionariesShowed = true"
                @blur="isDictionariesShowed = false"
                class="dropdown-toggle" 
                data-toggle="dropdown"
                href="#" 
            >
                <i class="icon-book">&nbsp;</i>
                <span 
                    class="lang-active" 
                    style="margin:0;padding:0"
                    itemProp="articleSection"
                >
                  {{ dictionaries[dictionaryIndex] }}
                </span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu" role="navigation">
                <li 
                    v-for="(dictionary, index) in dictionaries"
                    role="presentation"
                >
                    <a 
                        @focus="dictionaryIndex = index"
                        class="p lang-option false" 
                        role="false" 
                        href="##">{{dictionary}}</a>
                </li>
            </ul>
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

    <ul class="nav pull-right hidden-xs">
        <li>
            <a 
                href="about.html" 
                title="關於本站" 
            >
                <!-- onClick={()=> window.pressAbout()} -->
                <span class="iconic-circle">
                    <i class="icon-info" />
                </span>
            </a>
        </li>
    </ul>

    <ul class="nav pull-right hidden-xs hidden-sm web-only">
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


    <ul class="nav pull-right hidden-xs">
        <li 
            class="web-inline-only" 
            style="display: inline-block;"
        >
            <a 
                href="https://racklin.github.io/moedict-desktop/download.html"
                target="_blank"
                title="桌面版下載（可離線使用）" 
                style="color: #ccc"
            >
                <i class="icon-download-alt" />
            </a>
        </li>
        <li 
            class="web-inline-only" 
            style="display: inline-block"
        >
            <a 
                href="https://play.google.com/store/apps/details?id=org.audreyt.dict.moe" 
                target="_blank" 
                title="Google Play 下載" 
                style="color: #ccc"
            >
                <i class="icon-android" />
            </a>
        </li>
        <li 
            class="web-inline-only" 
            style="display: inline-block"
        >
            <a 
                href="https://itunes.apple.com/tw/app/meng-dian/id599429224" 
                target="_blank" 
                title="App Store 下載" 
                style="color: #ccc"
            >
                <i class="icon-apple" />
            </a>
        </li>
    </ul> 

</nav>
</template>

<script>
export default {
    data () {
        return {
            dictionaries: [
                '方敏英字典',
                '潘世光阿法',
                '蔡中涵大辭典'
            ],
            dictionaryIndex: 0,
            isDictionariesShowed: false
        }
    }

}
</script>

<style lang='scss' scoped>

.anchor-padding{
    padding-left: 5px;
    padding-right: 5px;
}
</style>
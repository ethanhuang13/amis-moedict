<template lang="html">
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  
    <div class="navbar-header">
        <a class="navbar-brand brand ebas" href="./">阿美語萌典</a>
    </div>

    <ul class="nav navbar-nav">

        <li class="dropdown">
            <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                <i class="icon-book">&nbsp;</i>
                <span 
                    class="lang-active" 
                    style="margin:0;padding:0"
                    itemProp="articleSection"
                >
                  方敏英字典
                </span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu" role="navigation" data-reactid=".3.1.0.1">
                <li role="presentation" data-reactid=".3.1.0.1.$##">
                    <a class="p lang-option false" role="false" href="##" data-reactid=".3.1.0.1.$##.0">方敏英字典</a>
                </li>
                <li role="presentation" data-reactid=".3.1.0.1.$#!">
                    <a class="m lang-option false" role="false" href="#!" data-reactid=".3.1.0.1.$#!.0">潘世光阿法</a>
                </li>
                <li role="presentation" data-reactid=".3.1.0.1.$#=2">
                    <a class="s lang-option false" role="false" href="#:" data-reactid=".3.1.0.1.$#=2.0">蔡中涵大辭典</a>
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

        <li id="btn-moedict-desktop-addons">
            <a 
                href="https://racklin.github.io/moedict-desktop/addon.html" 
                class="anchor-padding" 
                alt="下載擴充套件"
            >
                <i class="icon-download-alt" />
            </a>
        </li>
        <!-- 
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
      // message: 'Helo, Vue.js 2.0'
    }
  }
}
</script>

<style lang='css'>

.anchor-padding{
    padding-left: 5px;
    padding-right: 5px;
}
</style>
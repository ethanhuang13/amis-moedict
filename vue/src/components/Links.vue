<template lang="html">
<div>
    <!-- 關於本站，width < 768px 時才會顯示 -->
    <a 
        title="關於本站" 
        href="/about.html"
        class="visible-xs pull-left ebas btn btn-default about"
    >
    <!-- onClick={ ()=>window.pressAbout() }  -->
        <span class="iconic-circle">
            <i class="icon-info" />
            </span>
        <span>
            &nbsp;萌典
        </span>
    </a>
    <!-- 關於本站，width < 768px 時才會顯示 -->

    <!-- Fb, Twitter, Google Button -->
    <div class="share-btn-list">
        <a 
            v-for="(item) in shareButtons"
            :key="item.id"
            :id="'share-' + item.id"
            :title="item.label + '分享' "
            :href="item.href"
            :style="{
                background: item.background,
                color: 'white'
            }"
            class="btn btn-default small not-ios"
            target="_blank"
        >
            <i class="icon-share">&nbsp;</i>
            <i :class="'icon-'+item.icon" />
        </a>
    </div>
    <!-- Fb, Twitter, Google Button -->
</div>
</template>

<script>
export default {
    data() {
        return {
            shareButtons : [
                { 
                    id: "f", 
                    icon: "facebook", 
                    label: "Facebook", 
                    background: "#3B579D", 
                    href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.moedict.tw%2F" 
                },
                { 
                    id: "t", 
                    icon: "twitter", 
                    label: "Twitter", 
                    background: "#00ACED", 
                    href: "https://twitter.com/share?text=__TEXT__&url=https%3A%2F%2Fwww.moedict.tw%2F" 
                },
                { 
                    id: "g", 
                    icon: "google-plus", 
                    label: "Google+", 
                    background: "#D95C5C", 
                    href: "https://plus.google.com/share?url=https%3A%2F%2Fwww.moedict.tw%2F" 
                }
            ]
        }    
    }
}
</script>

<style lang="scss" scoped>

// 關於本站 
.about {
    float: left;
    margin-top: -10px;
    margin-left: 5px;
    margin-bottom: 5px;

    // 關於本站按鈕的 icon
    .iconic-circle {
        background: #474;
    }
}

// 分享按鈕
.share-btn-list {
    float: right;
    margin-bottom: 15px;
    margin-right: 5px;
    margin-top: -10px;
}

</style>
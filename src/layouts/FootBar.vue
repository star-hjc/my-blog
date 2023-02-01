<template>
    <footer class="footer-bar">
        <span>©2021 - {{ new Date().getFullYear() }} By Star</span>
        <span>框架 Hexo|主题 Butterfly</span>
        <span>萌ICP备20210720号</span>
    </footer>
</template>

<style lang='scss' scoped>
.footer-bar {
    width: 100vw;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:40px 0;
    background: rgba(0,0,0,0.4);
}
</style>
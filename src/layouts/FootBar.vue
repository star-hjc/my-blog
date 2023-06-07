<template>
    <footer class="footer-bar">
        <span>©2021 - {{ new Date().getFullYear() }} By Star</span>
        <span>框架 Hexo|主题 Butterfly</span>
        <span><a href="https://beian.miit.gov.cn">渝ICP备2022014387号-1</a></span>
    </footer>
</template>

<style lang='scss' scoped>
.footer-bar {
    position: absolute;
    bottom: 0;
    width: 100vw;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background: rgba(0, 0, 0, 0.4);

    a:hover {
        color: var(--float-color);
    }
}
</style>

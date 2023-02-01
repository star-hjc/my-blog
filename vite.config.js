import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/** build 视图分析 */
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            emitFile: false,
            file: 'build.html',
            open: true
        }),
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
        })
    ],
    resolve: {
        /** 配置别名 */
        alias: {
            '@': `${path.resolve(__dirname, './src')}/`
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element-puls.scss" as *;`
            }
        }
    },
    server: {
        /** 启动打开网页 */
        open: true,
        /** 开启热更新 */
        hmr: true,
        // host:'0.0.0.0',
        /** 跨域配置 */
        proxy: {
            '/api': {
                target: 'http://120.77.79.68:8888/',
                changeOrigin: true,
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(buildFilePath) {
                    // if (nodeModules) {
                    //     // console.log(buildFilePath.split('node_modules/')[1].split('/')[0]);
                    //     return buildFilePath.split('node_modules/')[1].split('/')[0];
                    // }
                    if (buildFilePath.indexOf('node_modules') === -1 && buildFilePath.includes('components/card/')) {
                        console.log(String(buildFilePath));
                        return buildFilePath.split('components/card/')[1].split('.')[0]
                    }
                    // if ( nodeModules && buildFilePath.includes('element-plus/')) {
                    //     console.log(buildFilePath.split('element-plus/')[1].split('/')[0]);
                    // }

                    function pathIsExist(name) {
                        return buildFilePath.indexOf(name) !== -1
                    }
                }
            }
        }
    }
})

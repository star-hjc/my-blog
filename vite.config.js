import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
/** build 视图分析 */
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            visualizer({
                emitFile: false,
                file: 'build.html',
                open: true
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: command === 'serve',
                watchFiles: true
            }),
            AutoImport({
                imports: ['vue', 'pinia'],
                resolvers: [ElementPlusResolver()],
                eslintrc: {
                    /** 生成变量白名单,手动改true保存再改false */
                    enabled: false,
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true
                }
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
            // hmr: true,
            // host:'0.0.0.0',
            /** 跨域配置 */
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:6666/',
                    changeOrigin: true
                }
            }
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks (buildFilePath) {
                        // if (nodeModules) {
                        //     // console.log(buildFilePath.split('node_modules/')[1].split('/')[0]);
                        //     return buildFilePath.split('node_modules/')[1].split('/')[0];
                        // }
                        // if (buildFilePath.indexOf('node_modules') === -1 && buildFilePath.includes('components/card/')) {
                        //     return buildFilePath.split('components/card/')[1].split('.')[0]
                        // }
                        // if ( nodeModules && buildFilePath.includes('element-plus/')) {
                        //     console.log(buildFilePath.split('element-plus/')[1].split('/')[0]);
                        // }

                        // function pathIsExist(name) {
                        //     return buildFilePath.indexOf(name) !== -1
                        // }
                    }
                }
            }
        }
    }
})

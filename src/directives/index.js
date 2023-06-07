import scoped from './modules/scoped'
const directives = { scoped }
export default {
    install (app) {
        for (const [key, val] of Object.entries(directives)) {
            app.directive(key, val)
        }
    }
}

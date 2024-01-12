import toolComponents from './tool'
import cardComponents from './card'

const components = Object.entries({ ...cardComponents, ...toolComponents })

export default {
    install (app) {
        for (const [key, component] of components) {
            app.component(key, component)
        }
    }
}

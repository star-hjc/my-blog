import toolComponents from './tool'
import cardComponents from './card'

const components = [cardComponents, toolComponents]

export default {
    install (app) {
        components.forEach(item => {
            app.use(item)
        })
    }
}

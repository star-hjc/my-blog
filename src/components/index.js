import cardComponents from './cardComponents'

const components = [cardComponents]

export default {
    install(app) {
        components.forEach(item => {
            app.use(item)
        })
    }
}

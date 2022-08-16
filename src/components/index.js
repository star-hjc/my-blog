import baseComponents from './testBaseComponents'

const components = [baseComponents]

export default {
    install(app) {
        components.forEach(item => {
            app.use(item)
        })
    }
}

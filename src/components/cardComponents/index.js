import GlassCard from './GlassCard/index.vue'
import TimeCard from './TimeCard/index.vue'
import WeatherCard from './WeatherCard/index.vue'

export default {
    install(app) {
        app.component({
            GlassCard,
            TimeCard,
            WeatherCard
        })
        // app.component('TimeCard', TimeCard)
    }
}

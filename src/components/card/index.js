import GlassCard from './GlassCard/index.vue'
import TimeCard from './TimeCard/index.vue'
import WeatherCard from './WeatherCard/index.vue'
import PostCard from './PostCard/index.vue'
import DefCard from './DefCard/index.vue'
import RunLogCard from './RunLogCard/index.vue'
import UserCard from './UserCard/index.vue'

export default {
    install(app) {
        app.component({
            GlassCard,
            TimeCard,
            WeatherCard,
            PostCard,
            DefCard,
            UserCard,
            RunLogCard
        })
    }
}

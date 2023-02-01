import TextSubtitle from './TextSubtitle/index.vue'
import NumFlop from './NumFlop/index.vue'
import RigthSide from './RigthSide/index.vue'
import IconLayout from './IconLayout/index.vue'
import NoticeScrol from './NoticeScrol/index.vue'

export default {
    install(app) {
        app.component({ TextSubtitle, NumFlop, RigthSide, IconLayout, NoticeScrol })
    }
}
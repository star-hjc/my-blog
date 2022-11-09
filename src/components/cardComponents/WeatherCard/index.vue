<template>
    <div class="weather-card">
        <div class="card-top">
            <span class="address">
                <el-icon class="iconfont icon-address" size="1.5rem" />
                <span>{{ address || '待更新...' }}</span>
            </span>
            <span class="weather">
                <el-icon class="iconfont icon-humidity" size="1.5rem" />
                <span>{{ vData.weatherData.humidity || 0 }}%</span>
                <span> | </span>
                <span v-if="vData.weatherData.weather">{{ vData.weatherData.weather }}</span>
                <span v-else class="dot"></span>
            </span>
        </div>
        <div class="content">
            <div class="weather-icon">
                <el-icon :class="[
                    'iconfont', { 'action': vData.weatherData.weather, 'is-loading': !vData.weatherData.weather },
                    weathersIcon[vData.weatherData.weather] || 'icon-refresh'
                ]" size="8rem" />
            </div>
            <div class="centigrade-box">
                <span class="centigrade">{{ vData.weatherData.degree.padStart(2, 0) || '00' }}</span>
                <el-icon class="iconfont icon-centigrade" size="2rem" />
            </div>
        </div>
        <!-- <p>{{ `${direction[vData.weatherData.wind_direction]} ${vData.weatherData.wind_power && vData.weatherData.wind_power + '级'}` }}</p> -->
    </div>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getIPInfo, getWeatherByCounty, getWeatherAddress } from '@/api/public/index.js'
import { weathersIcon, direction } from './weathersStaticData.js'

let address = ref('')


const vData = reactive({
    weatherData: {
        /** 湿度 */
        humidity: '',
        /** 地址 */
        address: '',
        /** 天气 */
        weather: '',
        /** 温度 */
        degree: '',
        /** 风向 1：东北 */
        wind_direction: '',
        /** 风速等级 */
        wind_power: '',

    }
})

onMounted(() => {
    getIPInfo().then(async ({ data: { data: { province, city, districts } } }) => {
        if (districts === '未知' || !districts) {
            const { data } = await getWeatherAddress(city)
            city = data[1] || undefined
            districts = data[2] || ''
        }
        address.value = `${city} ${districts}`
        getWeatherByCounty(province, city, districts).then(({ data: { data }, status }) => {
            if (status !== 200) return
            vData.weatherData = data.observe
        })
    })
})

</script>

<style lang="scss" scoped>
.weather-card {
    font-size: 1rem;

    .card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;

        .address {
            display: flex;
            white-space: nowrap;
        }

        .weather {
            margin-right: 0.5rem;
        }
    }

    .content {
        border-top: 1px solid #FFF;
        display: flex;
        justify-content: space-around;


        .weather-icon {
            position: relative;
        }

        .centigrade-box {
            white-space: nowrap;

            .centigrade {
                font-size: 5rem;
                line-height: 8rem;
            }

            .icon-centigrade {
                vertical-align: top;
            }
        }
    }

    .action {
        position: relative;
        animation-name: icon-action;
        /* 持续时间 */
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
    }

    @keyframes icon-action {
        0% {
            bottom: 0px;
            left: 0px;
        }

        25% {
            bottom: 4px;
            left: 2px;
        }

        50% {
            bottom: 1px;
            left: -1px;
        }

        75% {
            bottom: -2px;
            left: -4px;
        }

        100% {
            bottom: 0px;
            left: 0px;
        }
    }

}
</style>

import requst from '../request.js'

/**
 *
 * @param {*} ip
 * @returns 获取IP信息
 */
export const getIPInfo = (ip = '') => {
    return requst({
        method: 'get',
        url: `https://www.cz88.net/api/cz88/ip/base?ip=${ip}`
    })
}

/**
 *
 * @param {String} province 省份
 * @param {String} city 市
 * @param {String} county 区/县
 * @returns 获取地区天气
 */
export const getWeatherByCounty = (province, city, county) => {
    console.log(province, city, county)
    return requst({
        method: 'get',
        url: `/api/weather`,
        params: { province, city, county }
    })
}

/**
 *
 * @param {String} province 省份
 * @param {String} city 市
 * @returns 获取地区空气质量
 */
export const getAirQualityByCity = (province, city) => {
    return requst({
        method: 'get',
        url: `/api/airQuality`,
        params: { province, city }
    })
}


/**
 *
 * @param {String} province 省份
 * @param {String} city 市
 * @returns 获取地区空气质量
 */
export const getWeatherAddress = (address) => {
    return requst({
        method: 'get',
        url: `/api/weatherAddress`,
        params: { address }
    })
}


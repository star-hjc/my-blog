export default [
    {
        url: '/api/123',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: { success: 123 }
            }
        }
    },
    {
        url: '/api/321',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: { success: 321 }
            }
        }
    },
    {
        url: '/api/567',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: { success: 567 }
            }
        }
    }
]

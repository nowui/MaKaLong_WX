const constant = {
    // host: 'http://172.31.16.209:8080',
    host: 'https://api.makalong.nowui.com:9443',
    platform: 'WX',
    version: '1.0.0',
    color: '#c81623',
    duration: 2000,
    category_list: [{
        category_id: '',
        category_name: '全部',
        category_color: '#fd666b',
        category_image: '/image/apps.png'
    }, {
        category_id: '9ed6cb3551fb4bfaabfeee89cc63f9b4',
        category_name: '蛋糕',
        category_color: '#73b4ef',
        category_image: '/image/category_0.png'
    }, {
        category_id: 'fb402be460434f439fabd5961999ff8e',
        category_name: '饼干',
        category_color: '#e78ab0',
        category_image: '/image/category_1.png'
    }, {
        category_id: 'f9cfb3128d1b4156b800dd630e3da469',
        category_name: '点心',
        category_color: '#7acfa6',
        category_image: '/image/category_2.png'
    }, {
        category_id: 'a14caba7ee234d428c572735e6578422',
        category_name: '甜点',
        category_color: '#ffcb63',
        category_image: '/image/category_3.png'
    }],
    order_status_list: [{
        order_status_value: '',
        order_status_name: '全部订单',
        order_status_image: ''
    }, {
        order_status_value: 'WAIT_PAY',
        order_status_name: '代付款',
        order_status_image: '/image/pay.png'
    }, {
        order_status_value: 'WAIT_SEND',
        order_status_name: '代发货',
        order_status_image: '/image/deliver.png'
    }, {
        order_status_value: 'WAIT_RECEIVE',
        order_status_name: '代收货',
        order_status_image: '/image/deliver.png'
    }, {
        order_status_value: 'FINISH',
        order_status_name: '已完成',
        order_status_image: '/image/comment.png'
    }]
}

module.exports = constant;
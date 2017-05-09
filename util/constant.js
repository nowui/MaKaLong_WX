const constant = {
  app_id: 'wx224da4055b88e860',
  aes_key: '!aes!0123456789!',
  // host: 'http://172.31.16.209:8080',
  host: 'http://api.makalong.nowui.com',
  // api: 'http://localhost:8080',
  api: 'https://api.nowui.com',
  platform: 'WX',
  version: '1.0.0',
  color: '#c81623',
  duration: 2000,
  category_list: [{
    category_id: '',
    category_name: '全部',
    category_color: '#fd666b',
    category_image: '/image/apps.svg'
  }, {
    category_id: '146474b15ba545d9b9717cf8b5a6c3f5',
    category_name: '蛋糕',
    category_color: '#73b4ef',
    category_image: '/image/discover.svg'
  }, {
    category_id: '9ed6cb3551fb4bfaabfeee89cc63f9b4',
    category_name: '饼干',
    category_color: '#e78ab0',
    category_image: '/image/ticket.svg'
  }, {
    category_id: '34fb354194e0409e8a80a4382a7fa18d',
    category_name: '点心',
    category_color: '#7acfa6',
    category_image: '/image/present.svg'
  }, {
    category_id: '26ef74aa1bb242479df5305478f31b08',
    category_name: '甜点',
    category_color: '#ffcb63',
    category_image: '/image/punch.svg'
  }],
  order_status_list: [{
    order_status_value: 'ALL',
    order_status_name: '全部订单',
    order_status_image: ''
  }, {
    order_status_value: 'WAIT_PAY',
    order_status_name: '待付款',
    order_status_image: '/image/pay.svg'
  }, {
    order_status_value: 'WAIT_SEND',
    order_status_name: '已完成',
    order_status_image: '/image/send.svg'
  }]
}

module.exports = constant;
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Background= {
  // 存放数据
  state: {
    backgroundcolor: [
      "background-image:url(static/sitebackimg/flower.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, rgb(252, 54, 253) 0%, rgb(93, 63, 218) 100%)",
      "background-image:url(static/sitebackimg/blue.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, #FFFF00 0%, #DAA520 100%)",
      "background-image:url(static/sitebackimg/sky.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, #DCDCDC 0%, #696969 100%)",
      "background-image:url(static/sitebackimg/hand.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, rgb(248, 240, 35) 0%, rgb(5, 174, 53) 100%)",
      "background-image:linear-gradient(45deg, #B0E0E6 0%, #40E0D0 100%)",
      "background-image:url(static/sitebackimg/cute.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, rgb(255, 0, 71) 0%, rgb(44, 52, 199) 100%)",
      "background-image:linear-gradient(45deg, rgb(102, 244, 133) 0%, rgb(23, 172, 255) 100%)",
      "background-image:url(static/sitebackimg/red.jpg);background-size: 100% 100%",
      "background-image:linear-gradient(45deg, #98F898 0%, #7FFF00 100%)",
    ]
  },
  getters: {
      getMenus(state) {
        return state.backgroundcolor
      }
  },
  mutations: {

  },
  actions: {

  }
}

export default new Vuex.Store({
    modules: {
      background: Background
    }
})

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const scanner = require.context(
  './',
  true,
  /^\.\/((?!\/)[\s\S])+\/index\.vue$/
)

export default {
  install:(app)=>{
    scanner.keys().map(key => {
      let name = scanner(key).default.name
      if (name) {
        app.component(name, scanner(key).default)
      }
    })
    Object.keys(ElementPlusIconsVue).map(key => {
      let name = ElementPlusIconsVue[key].name
      if (name) {
        app.component(name, ElementPlusIconsVue[key])
      }
    })
  }
}

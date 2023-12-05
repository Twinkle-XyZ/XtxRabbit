import ImageView from '@/components/imageView/index.vue'
import XtxSku from '@/components/XtxSku/index.vue'
// 将components中的所有组件进行全局化注册
export const componentPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}

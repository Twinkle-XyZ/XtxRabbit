import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载
export const lazyPlugin = {
  install(app) {
    // 定义全局指令
    app.directive('img-lazy', {
      mounted(el, binging) {
        // console.log(binging.value)
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting)
          if (isIntersecting) {
            el.src = binging.value
            // 在第一次加载完成后，结束监听，避免资源浪费
            stop()
          }
        })
      }
    })
  }
}

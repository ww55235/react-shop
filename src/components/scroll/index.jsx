import {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react'
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import ObserveDOM from '@better-scroll/observe-dom'
import { debounce } from '@/utils'

BScroll.use(PullUp)
BScroll.use(PullDown)
BScroll.use(ObserveDOM)

const Scroll = forwardRef((props, ref) => {
  const wrapperRef = useRef()
  const [bScroll, setBScroll] = useState(null)

  const {
    click = true,
    probeType = 3,
    observeDOM = true,
    pullUpLoad = false,
    pullDownRefresh = false,
    onPullUp = () => {},
    onPullDown = () => {},
    onScroll = () => {},
    onScrollEnd = () => {},
    onEnterThreshold = () => {},
    onLeaveThreshold = () => {},
    style,
    className,
  } = props

  useEffect(() => {
    const bScroll = new BScroll(wrapperRef.current, {
      click,
      probeType,
      observeDOM,
      pullUpLoad,
      pullDownRefresh,
    })
    setBScroll(bScroll)

    return () => {
      bScroll.destroy()
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  const handlePullUp = useMemo(() => {
    return onPullUp
  }, [onPullUp])

  const handlePullDown = useMemo(() => {
    return debounce(onPullDown, 300)
  }, [onPullDown])

  const handleEnterThreshold = useMemo(() => {
    return debounce(onEnterThreshold, 300)
  }, [onEnterThreshold])

  const handleLeaveThreshold = useMemo(() => {
    return debounce(onLeaveThreshold, 300)
  }, [onLeaveThreshold])

  // 上拉加载
  useEffect(() => {
    if (!bScroll?.finishPullUp) return

    bScroll.on('pullingUp', () => {
      handlePullUp()
      setTimeout(() => {
        bScroll.finishPullUp()
        bScroll.refresh()
      }, 20)
    })

    return () => {
      bScroll.off('pullingUp')
    }
  }, [bScroll, onPullUp])

  //下拉刷新
  useEffect(() => {
    if (!bScroll?.finishPullDown) return
    bScroll.on('pullingDown', () => {
      handlePullDown()
      bScroll.finishPullDown()
      // BScroll 配置项bounceTime默认为800, 等待bounceAnimation然后刷新
      setTimeout(() => {
        bScroll.refresh()
      }, 850)
    })

    //https://better-scroll.github.io/docs/zh-CN/plugins/pulldown.html#%E4%BA%8B%E4%BB%B6
    bScroll.on('enterThreshold', handleEnterThreshold)
    bScroll.on('leaveThreshold', handleLeaveThreshold)

    return () => {
      bScroll.off('pullingDown')
      bScroll.off('enterThreshold')
      bScroll.off('leaveThreshold')
    }
  }, [bScroll, handlePullDown, handleEnterThreshold, handleLeaveThreshold])

  useEffect(() => {
    if (!bScroll) return
    bScroll.on('scroll', onScroll)
    bScroll.on('scrollEnd', onScrollEnd)

    return () => {
      bScroll.off('scroll')
      bScroll.off('scrollEnd')
    }
  }, [bScroll, onScroll, onScrollEnd])

  useImperativeHandle(ref, () => ({
    refresh: () => {
      bScroll?.refresh()
    },
    scrollTo: (x, y, time) => {
      bScroll?.scrollTo(x, y, time)
    },
    scrollToElement: (ele, time) => {
      bScroll?.scrollToElement(ele, time)
    },
  }))

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ height: '100%', overflow: 'hidden', ...style }}
    >
      <div className="content">{props.children}</div>
    </div>
  )
})

Scroll.displayName = 'Scroll'

export default Scroll

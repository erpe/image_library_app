import React, {useRef} from 'react'
import {bool, node} from 'prop-types'
import {useTransition, animated} from 'react-spring'
import styled from "styled-components"

const Inner = styled.div`
  &:before,
  &:after {
    content: "";
    display: inline-block;
  }
`;

const getElementHeight = (ref) => {
  return ref.current ? ref.current.getBoundingClientRect().height : 0
}

const visibleStyle = {height: "auto", opacitiy: 1, overflow: "visible"}
const hiddenStyle = {height: 0, opacitiy: 0, overflow: "hidden"}

const SlideToggleContent = ({isVisible, children, forceSlideIn}) => {

  const isVisibleOnMount = useRef(isVisible && !forceSlideIn)
  const containerRef = useRef(null)
  const innerRef = useRef(null)

  const transitions = useTransition(isVisible, null, {
    enter: () => async (next, cancel) => {
      const height = getElementHeight(innerRef)
      cancel()

      await next({height, opacity: 1, overflow: "hidden"})
      await next(visibleStyle)
    },
    leave: () => async (next, cancel) =>  {
      const height = getElementHeight(containerRef)
      cancel()

      await next({height, overflow: "hidden"})
      await next(hiddenStyle)

      isVisibleOnMount.current = false
    },
    from: isVisibleOnMount.current ? visibleStyle : hiddenStyle,
    unique: true,
  })

  return transitions.map(({item: show, props: springProps, key}) => {
    if (show) {
      return (
        <animated.div ref={containerRef} key={key} style={springProps}>
          <Inner ref={innerRef}>{children}</Inner>
        </animated.div>
      )
    }

    return null
  })
}

SlideToggleContent.propTypes = {
  isVisible: bool.isRequired,
  foceSlideIn: bool,
  children: node.isRequired,
}

export default SlideToggleContent

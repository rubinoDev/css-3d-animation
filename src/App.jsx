import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Inner } from './styles';

const UPDATE_RATE = 10;
const INITIAL_POSITION = {
  x: 0,
  y: 0
}

const App = ({ children,  }) => {
  const [mouse, setMouse] = useState(INITIAL_POSITION)
  const [origin, setOrigin] = useState(INITIAL_POSITION)
  const [counter, setCounter] = useState(0);

  const [transformStyles, setTransformStyles] = useState(INITIAL_POSITION)

  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    setTransformStyles({
         x: (mouse.y / innerRef?.current?.offsetHeight / 2).toFixed(2),
         y: (mouse.x / innerRef?.current?.offsetWidth / 2).toFixed(2)
       })
  }, [mouse, innerRef])

  const isTimeToUpdate = useMemo(() => {
    return counter % UPDATE_RATE === 0;
  }, [ counter, UPDATE_RATE ])

  useEffect(() => {
    setOrigin({
      x: containerRef.current.offsetLeft + Math.floor(containerRef.current.offsetWidth / 2),
      y: containerRef.current.offsetTop + Math.floor(containerRef.current.offsetHeight / 2)
    })
  }, [])

  const updatePosition = useCallback((event) => {
    setMouse({
      x: event.clientX - origin.x,
      y: (event.clientY - origin.y) * -1
    })
  }, [origin])

  const handleMouseMove = useCallback((event) => {
    setCounter(value => value + 1);

    if (isTimeToUpdate) {
      updatePosition(event);
    }
  }, [isTimeToUpdate, updatePosition, setCounter])

  const handleMouseLeave = useCallback(() => {
    setTransformStyles(INITIAL_POSITION)
  }, [isTimeToUpdate, updatePosition, setCounter])

 return ( 
    <Container ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={updatePosition} onMouseLeave={handleMouseLeave}>
      <Inner ref={innerRef} x={transformStyles.x} y={transformStyles.y}>
        {children}
      </Inner>
    </Container>
  )
}

export default App

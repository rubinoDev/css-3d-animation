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

// (function() {
//   // Init
//   var container = document.getElementById("container"),
//     inner = document.getElementById("inner");

//   // Mouse
//   var mouse = {
//     _x: 0,
//     _y: 0,
//     x: 0,
//     y: 0,
//     updatePosition: function(event) {
//       var e = event || window.event;
//       this.x = e.clientX - this._x;
//       this.y = (e.clientY - this._y) * -1;
//     },
//     setOrigin: function(e) {
//       this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
//       this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
//     },
//     show: function() {
//       return "(" + this.x + ", " + this.y + ")";
//     }
//   };

//   // Track the mouse position relative to the center of the container.
//   mouse.setOrigin(container);

//   //-----------------------------------------

//   var counter = 0;
//   var updateRate = 10;
//   var isTimeToUpdate = function() {
//     return counter++ % updateRate === 0;
//   };

//   //-----------------------------------------

//   var onMouseEnterHandler = function(event) {
//     update(event);
//   };

//   var onMouseLeaveHandler = function() {
//     inner.style = "";
//   };

//   var onMouseMoveHandler = function(event) {
//     if (isTimeToUpdate()) {
//       update(event);
//     }
//   };

//   //-----------------------------------------

//   var update = function(event) {
//     mouse.updatePosition(event);
//     updateTransformStyle(
//       (mouse.y / inner.offsetHeight / 2).toFixed(2),
//       (mouse.x / inner.offsetWidth / 2).toFixed(2)
//     );
//   };

//   var updateTransformStyle = function(x, y) {
//     var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
//     inner.style.transform = style;
//     inner.style.webkitTransform = style;
//     inner.style.mozTransform = style;
//     inner.style.msTransform = style;
//     inner.style.oTransform = style;
//   };

//   //-----------------------------------------

//   container.onmouseenter = onMouseEnterHandler;
//   container.onmouseleave = onMouseLeaveHandler;
//   container.onmousemove = onMouseMoveHandler;
// })();

export default App

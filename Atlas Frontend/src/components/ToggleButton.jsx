import React from 'react'

const ToggleButton = (props) => {
     const [isVisible, setIsVisible] = React.useState(false);
  return (
   
    <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <h1>{props.hide}</h1> :  props.show} 
    </button>
  )
}

ToggleButton.defaultProps = {
    show: "Show Details",
    hide: "Hide Details"
}

export default ToggleButton
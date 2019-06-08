import React from 'react';
import {connect} from 'react-redux';
import {handleColorChange, handleDynamicComponentRemove} from '../actions';

const dynamicComponent = props => {
  return (
    <div
      className="dynamic-component"
      style={{backgroundColor: props.bgColor}}
    >
      <div>
        {props.component.reducerName}
      </div>
      <button
        onClick={handleColorChange}
      >
        Blue
      </button>
      <button
        onClick={handleColorChange}
      >
        Red
      </button>
      <button
        onClick={handleDynamicComponentRemove}
      >
        Remove
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => state[ownProps.component.reducerName];

export default connect(
  mapStateToProps,
  {

  }
)(dynamicComponent)

import React from 'react';
import {connect} from 'react-redux';
import DynamicComponent from './DynamicReducer/component';
import './App.css';

import {handleColorChange} from './StaticReducer/actions';

import {handleDynamicComponentAdd} from './DynamicReducer/actions';

const App = props => {
  return (
    <div className="App">
      <div className="static-action-buttons">
        <button
          onClick={props.handleColorChange}
        >
          Blue
        </button>
        <button
          onClick={props.handleColorChange}
        >
          Red
        </button>
      </div>
      <div
        className='color-box'
        style={{backgroundColor: props.boxColor}}
      />
      <div className="dynamic-components">
        {
          [1, 2, 3].map((number, index) =>
            <button
              key={index}
              onClick={handleDynamicComponentAdd}
            >
              {`dynamicReducer${number}`}
            </button>  
          )
        }
        {
          props.dynamicComponents.map((component, index) =>
            <DynamicComponent component={component} key={index} />
          )
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const dynamicComponents = Object.keys(state)
    .filter(key => (/^dynamicReducer([0-9]+)$/).test(key))
    .map(dynamicReducer => (
      {
        reducerName: dynamicReducer
      }
    ))
  return {
    dynamicComponents,
    boxColor: state.main.boxColor
  }
}

export default connect(
  mapStateToProps,
  {
    handleColorChange,
    handleDynamicComponentAdd
  }
)(App)

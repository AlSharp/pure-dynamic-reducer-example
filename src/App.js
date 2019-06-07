import React from 'react';
import {connect} from 'react-redux';
import reducer from './DynamicReducer';
import './App.css';

import {handleColorChange} from './actions/mainActions';

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
              onClick={e => {
                props.store.reducerManager.add(e.target.textContent, reducer);
                props.store.dispatch({type: '@@DYNAMIC_REDUCER_ADD'});
              }}
            >
              {`dynamicReducer${number}`}
            </button>  
          )
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    boxColor: state.main.boxColor
  }
}

export default connect(
  mapStateToProps,
  {
    handleColorChange
  }
)(App)

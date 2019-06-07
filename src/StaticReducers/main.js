export default (state = {
  boxColor: 'black'
}, action) => {
  
  switch(action.type) {
    case 'HANDLE_COLOR_CHANGE': {
      return {
        ...state,
        boxColor: action.payload
      }
    }

    default:
      return state;
  }
}
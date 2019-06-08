export default (state = {
  bgColor: 'green'
}, action) => {

  switch(action.type) {
    case 'HANDLE_COLOR_CHANGE': {
      return {
        ...state,
        bgColor: action.payload
      }
    }

    default:
      return state;
  }
}
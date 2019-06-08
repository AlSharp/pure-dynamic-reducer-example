export const handleColorChange = event => dispatch => {
  dispatch(
    {
      type: 'HANDLE_COLOR_CHANGE',
      payload: event.target.textContent.toLowerCase()
    }
  )
}
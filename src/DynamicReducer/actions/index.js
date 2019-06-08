import reducer from '../../DynamicReducer';
import {reducerManager, dynamicReducers} from '../../store';

export const handleColorChange = event => {
  const reducerName = event.target.parentElement.firstChild.textContent;
  dynamicReducers[reducerName].dispatch(
    {
      type: 'HANDLE_COLOR_CHANGE',
      payload: event.target.textContent.toLowerCase()
    }
  )
}

export const handleDynamicComponentRemove = event => {
  const reducerName = event.target.parentElement.firstChild.textContent;
  reducerManager.remove(reducerName);
}

export const handleDynamicComponentAdd = event => {
  reducerManager.add(event.target.textContent, reducer);
}
import { nanoid } from 'nanoid';
import { ADD_SERVICE, REMOVE_SERVICE, EDIT_SERVICE, UPDATE_FILTER } from '../actions/actionTypes';

const initialState = [
  { id: nanoid(), name: 'Замена стекла', price: 21000 },
  { id: nanoid(), name: 'Замена дисплея', price: 25000 },
];

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVICE:
      const { name, price } = action.payload;
      return [...state, { id: nanoid(), name, price: Number(price) }];
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return state.filter(service => service.id !== id);
    case EDIT_SERVICE:
      const { id: editId, name: editName, price: editPrice } = action.payload;
      return state.map(service => {
        if (service.id === editId) {
          return { ...service, name: editName, price: Number(editPrice) };
        }
        return service;
      });
    case UPDATE_FILTER:
      const { filter } = action.payload;
      if (filter === '') {
        return initialState;
      }
      return state.filter(service => service.name.toLowerCase().includes(filter.toLowerCase()));
    default:
      return state;
  }
}

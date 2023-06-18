import { useSelector, useDispatch } from 'react-redux';
import { removeService, changeServiceField, updateFilter } from '../actions/actionCreators';

export default function ServiceList() {
  const items = useSelector(state => state.serviceList);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeService(id));
  };

  const handleEdit = id => {
    const item = items.find(service => service.id === id);
    dispatch(changeServiceField('name', item.name));
    dispatch(changeServiceField('price', item.price));
    dispatch(changeServiceField('editingId', id));
  };

  const handleFilterChange = evt => {
    const { value } = evt.target;
    dispatch(updateFilter(value));
  };

  const filteredItems = filter
    ? items.filter(service => service.name.toLowerCase().includes(filter.toLowerCase()))
    : items;

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter by name"
      />
      <ul>
        {filteredItems.map(o => (
          <li key={o.id}>
            {o.name} {o.price}
            <button onClick={() => handleEdit(o.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M8,1.9L0,15l6.9-8L15,0L8,1.9z M7.6,3.6L1.2,14l4.7-5.5L14.8,2L7.6,3.6z" />
              </svg>
            </button>
            <button onClick={() => handleRemove(o.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

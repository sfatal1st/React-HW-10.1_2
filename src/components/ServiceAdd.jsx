import {useSelector, useDispatch} from 'react-redux';
import {changeServiceField, addService, editService} from '../actions/actionCreators';

export default function ServiceAdd() {
    const item = useSelector(state => state.serviceAdd);
    const dispatch = useDispatch();
    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changeServiceField(name, value));
    }
    const handleSubmit = evt => {
        evt.preventDefault();
        if (item.editingId) {
            dispatch(editService(item.editingId, item.name, item.price));
          } else {
            dispatch(addService(item.name, item.price));
          }
          dispatch(changeServiceField('name', ''));
          dispatch(changeServiceField('price', ''));
          dispatch(changeServiceField('editingId', null));
    }

    const handleCancel = () => {
        dispatch(changeServiceField('name', ''));
        dispatch(changeServiceField('price', ''));
        dispatch(changeServiceField('editingId', null));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='name' onChange={handleChange} value={item.name} />
            <input name='price' onChange={handleChange} value={item.price} />
            <button type="submit">{item.editingId ? 'Save' : 'Add'}</button>
            {item.editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
}
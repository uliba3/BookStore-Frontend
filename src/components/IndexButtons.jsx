import { useDispatch, useSelector } from 'react-redux';
import { changeIndex, searchGoogleBooks } from '../reducers/googleBooksReducer';

function IndexButtons() {
    const dispatch = useDispatch();
    const googleBooksIndex = useSelector(state => state.googleBooks.index);
    const handleClick = async (index) => {
        dispatch(changeIndex(index));
    }

    return(
        <div>
            {googleBooksIndex!=0&&<button onClick={() => handleClick(googleBooksIndex-1)}>←</button>}
            <button onClick={() => handleClick(googleBooksIndex+1)}>→</button>
        </div>
    )
}

export default IndexButtons;
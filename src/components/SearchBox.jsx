import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { searchGoogleBooks } from '../reducers/googleBooksReducer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SearchBox () {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(''); // state for search term
    const keyPress = (e) => {
      if (e.key === 'Enter') handleSubmit(e);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(searchGoogleBooks(searchTerm));
    }
    return (
            <>
              <Form>
                <Container>
                  <Row>
                    <Col className='p-0' md={{ span: 4, offset: 4 }}>
                      <Form.Control
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={keyPress}
                            placeholder="search"
                      />
                    </Col>
                    <Col className='d-flex flex-row p-0' md={4}>
                      <Button variant="success" onClick={handleSubmit}>Search</Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </>
    )
}

export default SearchBox;
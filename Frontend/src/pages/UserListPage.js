import React, {useEffect, useState} from "react";
import { Container, Nav, Navbar, Table, Button, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';

import Api from '../helper/api';
import UserProfile from '../models/UserProfile';
import UserModal from '../components/UserModal';
import { UserRow, Loading } from "../components/table/TableComponents";
import Paginator from "../components/table/Paginator";
 
/**
 * Main user home page
 */
export default  function UserListPage() {
    // constants
    const ageRange = ['Todos', ' Mayor de edad', 'Menor de edad']
    // states
    const [responseState, setResponseState] = useState(null);
    const [selectedUserState, setSelectedUserState] = useState(null);
    const [filtersState, setFiltersState] = useState({
        page: 1,
        name: "",
        range: 0
    });

    // check logged
    if (!UserProfile.get()) {
        document.location.href = "login";
    }

    /**
     * Update filter values
     * 
     * @param {number} page  Page number 
     * @param {string} name  Name to search
     * @param {number} range Age filter
     */
    const updateFilters = (page, name, range) => {
        setFiltersState({
            page: page ?? filtersState.page,
            name: name ?? filtersState.name,
            range: range ?? filtersState.range,
        });
    }

    /**
     * Update users list data
     */
    const updateList = () => {
        setResponseState(null);
        getList( setResponseState, filtersState );
    }
    
    // handlers
    const handleRowClick = (user) => setSelectedUserState(user);
    const handleModalClose = () => setSelectedUserState(null);
    const handleChangePage = (p) => updateFilters(p);

    /**
     * Check list loaded on first time
     */
    useEffect(() => {
        if (!responseState) {
            updateList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Listen filters changes to update users list
     */
    useEffect(() => {
        updateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filtersState ]);

    /**
     * Check if current page is greater tan response last page
     */
    useEffect(() => {
        if ( responseState?.current_page > responseState?.last_page ){
            updateFilters(responseState.last_page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ responseState ]);

        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand >{ UserProfile.get().email }</Navbar.Brand>
                    <Nav className="me-0 text-end">
                    <Button variant="dark" onClick={UserProfile.del}>Salir</Button>
                    </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <h1 className="my-5">Usuarios registrados</h1>
                    <InputGroup className="my-2">
                        <FormControl placeholder="Filtrar por..." aria-label="Filtra por nombres o apellidos" onChange={ (el) => updateFilters(null, el.target.value, null) } value={ filtersState.name } />
                        <DropdownButton variant="outline-secondary" title={ageRange[filtersState.range]} id="input-group-dropdown-2" align="end" >
                            {ageRange.map( (a, i) => <Dropdown.Item key={i} onClick={ () => updateFilters(null, null, i) } >{a}</Dropdown.Item> )}
                        </DropdownButton>
                    </InputGroup>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Fecha de Nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (responseState == null)
                                    ? <Loading />
                                    : responseState.data?.map(user => (<UserRow user={user} onClick={() => handleRowClick(user)} key={user.id} />))
                            }
                        </tbody>
                    </Table>
                    <Paginator currentPage={responseState?.current_page} lastPage={responseState?.last_page} callback={ handleChangePage } from={responseState?.from} to={responseState?.to} total={responseState?.total} busy={responseState == null} />
                </Container>
                <UserModal user={selectedUserState} onClose={handleModalClose} />
            </>
        );
}

/**
 * Call Api to update users list in base of the filtering data
 * 
 * @param {object} callback Function callback to call in success api call
 * @param {object} param    Filter data containing page, name and age range
 */
const getList = async (callback, {page, name, range}) => {
    const api = new Api();

    api.getUserList(page, name, [null, "M", "m"][range])
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            alert(error);
            callback([]);
        });
}


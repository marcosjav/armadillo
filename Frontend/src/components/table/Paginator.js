import React from "react";
import { Pagination } from "react-bootstrap";

/**
 * Simple bootstrap paginator
 * 
 * @param {*} param Containing api response pagination data
 */
const Paginator = ({currentPage, lastPage, from, to, total, busy, callback}) => {
    let items = [];
    
    for (let number = 1; number <= lastPage; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => callback(number) }>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            {
                items.length > 1
                    ? <Pagination size="sm" className="justify-content-end">{items}</Pagination>
                    : <></>
            }
            <p className="text-end text-muted" hidden={busy}>mostrando del {from} al {to} de {total} </p>
         </>
    );

}

export default  Paginator;
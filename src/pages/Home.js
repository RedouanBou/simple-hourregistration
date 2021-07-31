import React from 'react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const Home = () => {
    const [data, setData] = useState();

    const getData = async () => {
        try {
            const res = await fetch("https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d");

            const data = await res.json();
            setData(Object.keys(data).map((key) => data[key]));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (rowIndex) => {
        try {
            const res = await fetch(`https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d/${rowIndex}`, {method: "DELETE"});

            if (res.ok) {
                const updatedData = data.filter((_, i) => i !== rowIndex);
                setData(updatedData);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="accordion" id="accordionExample">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Datum</th>
                        <th>Dag</th>
                        <th>Begin - Eindtijd</th>
                        <th>Aantal Km's</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, i) => (
                        <tr>
                            <td>{item.periode}</td>
                            <td>{item.datum}</td>
                            <td>{item.dag}</td>
                            <td>{item.begintijd} - {item.eindtijd}</td>
                            <td>{item.totaalkm}</td>
                            <td>
                                <Link className="btn btn-md btn-primary ms-1" to={`/simple-hourregistration/edit/${i}`} style={{ textDecoration: "none" }}><FaPencilAlt /></Link> | 
                                <Button className="btn btn-md btn-danger ms-1" onClick={() => handleDelete(i)}><FaTrashAlt /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Home;
import React, { useState } from 'react';
//import { CSVLink } from "react-csv";

import { Container, Form, Button } from 'react-bootstrap';

const Export = () => {
    const [filterData, setFilterData] = useState({
        startDatum: new Date(),
        eindDatum: new Date()
    });

    const handleChange = (e) => setFilterData({ ...filterData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d")
                .then((result) => {
                    const data = result.json();
                    const newData = data.filter(row => { row.datum > filterData.startDatum && row.datum < filterData.eindDatum });
                    setFilterData(Object.keys(newData).map((key) => newData[key]));
                });
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <Container>
        <div className="body">
            <Form style={{ maxWidth: 720, margin: "35px auto" }} onSubmit={handleSubmit}>
                <h1>Export</h1>

                <hr />

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Start datum</Form.Label>
                    <Form.Control type="date" name="beginDatum" value={filterData.startDatum.toString("dd-MM-yyyy")} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Eind datum</Form.Label>
                    <Form.Control type="date" name="eindDatum" value={filterData.eindDatum.toString("dd-MM-yyyy")} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Export data
                </Button>
            </Form>
        </div>
    </Container>
  )
}

export default Export;
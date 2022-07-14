import React, { useState } from 'react';
import { CSVLink } from "react-csv";

import { Container, Form, Button } from 'react-bootstrap';

const Export = () => {
    const [data, setData] = useState({
        startDatum: new Date(),
        eindDatum: new Date()
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {

    }

  return (
    <Container>
        <div class="body">
            <Form style={{ maxWidth: 720, margin: "35px auto" }} onSubmit={handleSubmit}>
                <h1>Export</h1>

                <hr />

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Start datum</Form.Label>
                    <Form.Control type="date" name="beginDatum" placeholder="Enter Date" value={data.startDatum} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the start date of the data you want to start with.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Eind datum</Form.Label>
                    <Form.Control type="date" name="eindDatum" placeholder="Enter Date" value={data.eindDatum} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the end date of the data you want to end with.
                    </Form.Text>
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
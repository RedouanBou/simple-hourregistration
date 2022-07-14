import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container, Form, Button } from 'react-bootstrap';


const Edit = () => {

    const { rowIndex } = useParams();
    const [data, setData] = useState({
        periode: 0,
        datum: new Date().toDateString(),
        dag: "",
        begintijd: "",
        eindtijd: "",
        totaalkm: 0,
    });

    const getData = async () => {
        try {
            const res = await fetch(`https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d/${rowIndex}`);
            const data = await res.json();
            setData(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d/${rowIndex}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert("Updated successfully");
            } 

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Form style={{ maxWidth: 500, margin: "35px auto" }} onSubmit={handleSubmit}>
                <h1 style={{ alignContent: "center" }}>Edit existing rule</h1>

                <hr />

                <Form.Group className="mb-3" controlId="formBasicPeriod">
                    <Form.Label>Periode</Form.Label>
                    <Form.Control type="number" name="periode" placeholder="Enter period" value={data.periode} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        The period you are now in.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="text" name="datum" placeholder="Enter Date" value={data.datum} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the date of the current day.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDay">
                    <Form.Label>Dag</Form.Label>
                    <Form.Control type="text" name="dag" placeholder="Enter Day" value={data.dag} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the current day.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStartTime">
                    <Form.Label>Gestart om</Form.Label>
                    <Form.Control type="text" name="begintijd" placeholder="Enter start time" value={data.begintijd} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the start time.
                    </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEndTime">
                    <Form.Label>Gestopt om</Form.Label>
                    <Form.Control type="text" name="eindtijd" placeholder="Enter start time" value={data.eindtijd} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the end time.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEndTime">
                    <Form.Label>Aantal km's gereden</Form.Label>
                    <Form.Control type="number" name="totaalkm" value={data.totaalkm} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        This is the amount of the km's.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Container>
    );
}

export default Edit;
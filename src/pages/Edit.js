import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Edit = () => {
    const history = useHistory();
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
            console.log(data);
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

            if (res.ok) 
                history.replace("/");
        
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
            <h1 className="text-muted text-center">Edit</h1>
            <hr />
            <div className="mb-3">
                <label htmlFor="periode" className="form-label">Periode</label>
                <input type="text" className="form-control" name="periode" value={data.periode} onChange={handleChange} required="required" />
            </div>
            <div className="mb-3">
                <label htmlFor="datum" className="form-label">Datum</label>
                <input type="text" className="form-control" name="datum" value={data.datum} onChange={handleChange} required="required" />
            </div>
            <div className="mb-3">
                <label htmlFor="dag" className="form-label">Dag</label>
                <input type="text" className="form-control" name="dag" value={data.dag} onChange={handleChange} required="required" />
            </div>
            <div className="mb-3">
                <label htmlFor="begintijd" className="form-label">Begin tijd</label>
                <input type="text" className="form-control" name="begintijd" value={data.begintijd} onChange={handleChange} required="required" />
            </div>
            <div className="mb-3">
                <label htmlFor="eindtijd" className="form-label">Eind tijd</label>
                <input type="text" className="form-control" name="eindtijd" value={data.eindtijd} onChange={handleChange} required="required" />
            </div>
            <div className="mb-3">
                <label htmlFor="km" className="form-label">Aantal km's</label>
                <input type="text" className="form-control" name="totaalkm" value={data.totaalkm} onChange={handleChange} required="required" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Edit</button>
        </form>
    )
}

export default Edit;
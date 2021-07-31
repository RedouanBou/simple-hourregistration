import { useState } from "react";
import { useHistory } from "react-router-dom";

const Add = () => {
    const history = useHistory();
    
    const [data, setData] = useState({
        periode: 0,
        datum: new Date(),
        dag: "",
        begintijd: "",
        eindtijd: "",
        totaalkm: 0,
    });

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("https://sheet.best/api/sheets/9dd5c7ac-a6b0-4df5-9053-67f37650687d", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            
            if (res.ok)
                history.replace("/simple-hourregistration/");
            
        } catch (error) {
            console.log(error);
        }
            
    };

    return (
        <form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSubmit}>
            <h1 className="text-muted text-center">Add</h1>
            <hr />
            <div className="mb-3">
                <label htmlFor="periode" className="form-label">Periode</label>
                <input type="text" className="form-control" name="periode" value={data.periode} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="datum" className="form-label">Datum</label>
                <input type="date" className="form-control" name="datum" value={data.datum} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="dag" className="form-label">Dag</label>
                <input type="text" className="form-control" name="dag" value={data.dag} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="begintijd" className="form-label">Begin tijd</label>
                <input type="time" className="form-control" name="begintijd" value={data.begintijd} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="eindtijd" className="form-label">Eind tijd</label>
                <input type="time" className="form-control" name="eindtijd" value={data.eindtijd} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="km" className="form-label">Aantal km's</label>
                <input type="text" className="form-control" name="totaalkm" value={data.totaalkm} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Toevoegen</button>
        </form>
    )
};

export default Add;
import { useNavigate } from "react-router-dom";

export const ItmpCreatePage=()=>{
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új ITMP bejegyzés</h2>
            <form
            onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            fetch(`http://itmp.sulla.hu/users`, {
                method: "POST",
               
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    name: event.target.elements.name.value,
                    email: event.target.elements.email.value,
                   
                }),
            })
            
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">ITMP bejegyzés</label>
                <div className="col-sm-9">
                <input type="text" name="name" className="form-control" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Email cím: </label>
                <div className="col-sm-9">
                <input type="email" name="email" className="form-control" />
                </div>
            </div>           
            
            <button type="submit" className="btn btn-success">
                Küldés
            </button>
            </form>
        </div>
    );
};
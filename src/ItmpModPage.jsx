import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const ItmpModPage =()=> {
    const params = useParams();
    const id = params.ItmpId;
    const navigate = useNavigate();
    const [itmp, setItmp] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchChessData = async () => {
            try {
                const response = await axios.get(`https://itmp.sulla.hu/users/${id}`);
                setItmp(response.data);
            } catch (error) {
                console.log('Error fetching itmp data:', error);
            }
        };

        fetchChessData();
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setItmp(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://itmp.sulla.hu/users/${id}`, itmp)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log('Error updating itmp data:', error);
        });
};

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy ITMP bejegyzés módosítása</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">ITMP név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={itmp.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <NavLink to='/'><i className='bi bi-backspace btn btn-danger'>Vissza</i></NavLink>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">E-mail</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={itmp.email} onChange={handleInputChange}/>
                    </div>
                </div>
                
                
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
};
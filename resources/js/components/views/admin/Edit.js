import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {

    let { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        showBook();
    }, [])

    function showBook() {
        axios.get("/api/users/" + id + "/edit", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('_token'),
            }
        }).then(res => {
            const result = res.data.data;
            setName(result.name);
            setEmail(result.email);
        }).catch(err => {
            console.log(err);
        })
    }

    function updateBook(e){
        e.preventDefault();
        axios.put("/api/users/" + id, {
            name: name,
            email: email,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('_token'),
            }
        }).then(() => {
            history.goBack();
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }
    
    return (
        <div className="container my-2">
            <form onSubmit={updateBook}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Update'}</button>
            </form>
        </div>
    )
}

export default Edit
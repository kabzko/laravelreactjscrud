import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Add() {

    const history = useHistory();
    const [loading, setLoading] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function newBook(e) {
        e.preventDefault();
        axios.post("/api/users", {
            name: name,
            email: email,
            password: password,
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
            <form onSubmit={newBook}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Save'}</button>
            </form>
        </div>
    )
}

export default Add
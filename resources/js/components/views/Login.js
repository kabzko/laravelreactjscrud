import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(null);

    function login(e) {
        e.preventDefault();
        axios.post("/login", {
            email: email,
            password: password,
        }).then(res => {
            if (res.data.message) {
                console.log(res.data.message);
            } else {
                localStorage.setItem('_token', res.data.token);
                location.reload();
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="container my-2">
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login;

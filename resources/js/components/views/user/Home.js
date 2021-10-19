import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        loadUsers();
    }, [])
   
    function loadUsers() {
        axios.get("/api/users", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('_token'),
            }
        }).then(res => {
            const result = res.data.data;
            setUsers(result);
        }).catch(err => {
            console.log(err);
        })
    }

    function renderUsers() {
        if (!users) {
            return (
                <tr>
                    <td colSpan="4">
                        Loading...
                    </td>
                </tr>
            )
        }
        if (users.length === 0) {
            return (
                <tr>
                    <td colSpan="4">
                        No user yet, Add one.
                    </td>
                </tr>
            )
        }

        return users.map((x, i) => {
            return (
                <tr key={i}>
                    <th>{x.id}</th>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                </tr>
            )
        })
    }
    
    function logout() {
        axios.post("/logout").then(() => {
            localStorage.clear();
            location.reload();
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="container-fluid my-2">
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={() => {window.location.href = "/"}}>Dashboard</button>
                    <button type="button" className="btn btn-success" onClick={() => {window.location.href = "/admin"}}>Admin</button>
                </div>
                <div className="col text-right">
                    <button type="button" className="btn btn-secondary" onClick={() => {logout()}}>Logout</button>
                </div>
            </div>
            <table className="table table-bordered my-2">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers()}
                </tbody>
            </table>
        </div>
    )
}

export default Home;

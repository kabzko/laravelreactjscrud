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

    function changeRoles(id, role) {
        axios.post("/changeRole", {
            id: id,
            role: role,
        }).then(() => {
            loadUsers();
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
                    <td>
                        <input type="checkbox" name={'admincheckbox' + i} checked={x.role_id === 1 ? 'checked' : ''} onChange={() => {changeRoles(x.id, 1)}} />
                    </td>
                    <td>
                        <input type="checkbox" name={'usercheckbox' + i} checked={x.role_id === 2 ? 'checked' : ''}  onChange={() => {changeRoles(x.id, 2)}} />
                    </td>
                    <td>
                        <Link to={`/edit/${x.id}`}>
                            <button type="button" className="btn btn-warning">Edit</button>
                        </Link>
                        <button type="button" className="btn btn-danger" onClick={() => {deleteUser(x.id, x.role_id)}}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    function deleteUser(id, role) {
        if (role == 1) {
            alert("Admin cannot be delete");
        } else {
            axios.delete("/api/users/" + id, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('_token'),
                }
            }).then(() => {
                loadUsers();
            }).catch(err => {
                console.log(err);
            })
        }
    }
    
    function logout() {
        axios.post("/logout").then(() => {
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
                    <Link to="/add">
                        <button type="button" className="btn btn-primary">Add</button>
                    </Link>
                    <button type="button" className="btn btn-secondary" onClick={() => {logout()}}>Logout</button>
                </div>
            </div>
            <table className="table table-bordered my-2">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">User</th>
                        <th scope="col">Action</th>
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

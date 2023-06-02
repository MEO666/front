
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function User(){

    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPrenom, setUserPrenom] = useState('');
    const [userMpd, setUserMdp] = useState('');

    const getUserById = async(id) =>{
        try{
            const response = await axios.get(`http://localhost:8080/users/findById/${id}`);
            setUserId(response.data.id);
            setUserName(response.data.nom);
            setUserEmail(response.data.email);
            setUserPrenom(response.data.prenom);
            setUserMdp(response.data.mdp);
        }catch(error){console.error(error);}
    }

    const fetchUsers = async() => {
        try{
            const response = await axios.get('http://localhost:8080/users/api/users');
            setUsers(response.data);
        }catch(error){console.error(error);}
    }
    useEffect(() => { fetchUsers(); }, []);

    const deleteUser = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/users/delete/${id}`);
            setUsers(users.filter(user => user.id !== id))
        }catch(error){console.error(error);}
    }

    




    return(
        <div>
            <h5 className='mt-5 ms-5'>Users Management</h5>    
        <Table striped bordered hover className='mt-3 w-75 ms-5'>
         <thead> 
            <tr>
                <th>Id</th>
                 <th>Prenom</th> 
                 <th>Nom</th> 
                 <th>Email</th>
                 <th>Mot de passe</th> 
                 <th>Action</th>
                 </tr> 
                 </thead> 
                 <tbody> {users.map((user, index) => ( 
                    <tr key={user.id}> 
                        <td>{index + 1}</td> 
                        <td>{user.prenom}</td> 
                        <td>{user.nom}</td> 
                        <td>{user.email}</td> 
                        <td>{user.mdp}</td>
                        <td><button onClick={() => deleteUser(user.id)} className='btn btn-danger'>Delete</button>
                        </td>
                        
                        </tr> ))}
                  </tbody> 
    </Table> 
        </div>
    );
}
export default User;
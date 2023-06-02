import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Specialites(){

    const [specialites, setSpecialites] = useState([]);
    const [specialiteName, setSpecialiteName] = useState('');
    const [specialiteId, setSpecialiteId] = useState('');

    const getSpecialiteId = async (id) => {
        try { 
           const response = await axios.get(`http://localhost:8080/specialites/findById/${id}`); 
           setSpecialiteId(response.data.id); 
           setSpecialiteName(response.data.nom); } 
       catch (error) { console.error(error); } };

    const fetchSpecialites = async() => {
        try{
            const response = await axios.get('http://localhost:8080/specialites/api/specialites');
            setSpecialites(response.data);
            console.log(response.data);
        }catch(error){console.error(error);}
    }

    const deleteSpecialite = async(id)=>{
        try{
        await axios.delete(`http://localhost:8080/specialites/delete/${id}`);
        setSpecialites(specialites.filter(specialite => specialite.id !== id))
    }catch(error){console.error(error);}
    }

    const handleSpecialiteNameChange = (event) => {
        setSpecialiteName(event.target.value);
      }
    const addSpecialite = async(event) => {
        try{
            const response = await axios.post('http://localhost:8080/specialites/save', { nom : specialiteName });
            setSpecialites([...specialites, response.data]);
            setSpecialiteName(''); 
        }catch(error){console.error(error);}
    }

    const updateSpecialite = async(id)=>{
        try{
            const response = await axios.put(`http://localhost:8080/specialites/update/${specialiteId}`, { nom: specialiteName });
            const updatedSpecialites = specialites.map((specialite) => {
              if (specialite.id === response.data.id) {
                return response.data;
              }
              return specialite;
            });
            setSpecialites(updatedSpecialites);
            setSpecialiteId('');
            setSpecialiteName('');}
            catch(error){console.error(error);}
    }
    useEffect(() => { fetchSpecialites(); }, []);

    return(
        <div>
            <h5 className='mt-5 ms-5'>Specialites Management</h5>   
            <Table striped bordered hover className='mt-3 w-75 ms-5'>
         <thead> 
            <tr> 
                <th>Id</th>
                 <th>Specialites</th> 
                 <th>Action</th>
                </tr> 
                 </thead> 
                 <tbody> {specialites.map((specialite, index) => ( 
                    <tr key={specialite.id}> 
                        <td>{index + 1}</td> 
                        <td>{specialite.nom}</td> 
                        <td><button onClick={() => deleteSpecialite(specialite.id)} className='btn btn-danger'>Delete</button>
                        <button  onClick={() => getSpecialiteId(specialite.id)} className="btn btn-secondary ms-2">Edit</button></td>  
                        </tr> ))}
                  </tbody> 
    </Table>
    <div className="mt-3 ms-5 w-75"> 
    <input type="text" placeholder='Serie name' className="form-control mr-2 d-inline-block" value={specialiteName} onChange={(e) => setSpecialiteName(e.target.value)} />
         {specialiteId ? ( <button className="btn btn-success mt-3" onClick={updateSpecialite}> Update City </button> ) : ( <button className="btn btn-primary mt-3" onClick={addSpecialite}> Add Serie </button> )} 
    </div>
        </div>
    );
}

export default Specialites;
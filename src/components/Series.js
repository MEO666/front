import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function Series(){

    const [series , setSeries] = useState([]);
    const [serieName, setSerieName] = useState('');
    const [serieId, setSerieId] = useState('');

    // get Serie by id
    const getSerieById = async(id) => {
        try{
            const response = await axios.get(`http://localhost:8080/series/findById/${id}`);
            setSerieId(response.data.id);
            setSerieName(response.data.nom);
        }catch(error){console.error(error);}
    }

    //Afficher Series
    const fetchSeries = async() => {
        try{
            const response = await axios.get('http://localhost:8080/series/api/series');
            setSeries(response.data);
        }catch(error){console.error(error);}
    }

    const deleteSerie = async(id)=>{
        try{
            await axios.delete(`http://localhost:8080/series/delete/${id}`);
            setSeries(series.filter(serie => serie.id !== id))
        }catch(error){console.error(error);}
    }
    const handleSerieNameChange = (event) => {
        setSerieName(event.target.value);
      }
    const addSerie = async(event) =>{
        try{
            const response = await axios.post('http://localhost:8080/series/save' , { nom : serieName });
            console.error(serieName);
            setSeries([...series, response.data]);
            setSerieName(''); 
        }catch(error) {console.error(error);}
    }

    
    


    const updateSerie = async(id) => {
        try{
            const response = await axios.put(`http://localhost:8080/series/update/${serieId}`, { nom: serieName });
            const updatedSeries = series.map((serie) => {
              if (serie.id === response.data.id) {
                return response.data;
              }
              return serie;
            });
            setSeries(updatedSeries);
            setSerieId('');
            setSerieName('');
        }catch(error){console.error(error);}
    }

    useEffect(() => { fetchSeries(); }, []);
    return(
        <div>

        <h5 className='mt-5 ms-5'>Series Management</h5>    
        <Table striped bordered hover className='mt-3 w-75 ms-5'>
         <thead> 
            <tr> 
                <th>Id</th>
                 <th>Serie</th> 
                 <th>Action</th>
                 </tr> 
                 </thead> 
                 <tbody> {series.map((serie, index) => ( 
                    <tr key={serie.id}> 
                        <td>{index + 1}</td> 
                        <td>{serie.nom}</td> 
                        <td><button onClick={() => deleteSerie(serie.id)} className='btn btn-danger'>Delete</button>
                        <button onClick={() => getSerieById(serie.id)} className="btn btn-secondary ms-2">Edit</button></td>
                        
                        </tr> ))}
                  </tbody> 
    </Table> 
    <div className="mt-3 ms-5 w-75"> 
    <input type="text" placeholder='Serie name' className="form-control mr-2 d-inline-block" value={serieName} onChange={(e) => setSerieName(e.target.value)} />
         {serieId ? ( <button className="btn btn-success mt-3" onClick={updateSerie}> Update Serie </button> ) : ( <button className="btn btn-primary mt-3" onClick={addSerie}> Add Serie </button> )} 
    </div>
    </div>
    );







}

export default Series;
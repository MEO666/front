import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function City(){
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState(''); 
    const [cityId, setCityId] = useState('');
    // get city by Id
    const getCityById = async (id) => {
         try { 
            const response = await axios.get(`http://localhost:8080/villes/findById/${id}`); 
            setCityId(response.data.id); 
            setCityName(response.data.nom); } 
        catch (error) { console.error(error); } };

    // Afficher Cities
    const fetchCities = async () => { 
        try {   
            const response = await axios.get('http://localhost:8080/villes/api/villes');
            setCities(response.data); }
        catch (error) { console.error(error); } };
   // Delete 
   const deleteCity = async(id) => {
    try{
        await axios.delete(`http://localhost:8080/villes/delete/${id}`);
        setCities(cities.filter(city => city.id !== id));
    }catch (error) {console.error(error);}
   };
   const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  }
  
    // Ajouter City
    const addCity = async (event) => { 
        //event.preventDefault(); 
        try { 
          const response = await axios.post('http://localhost:8080/villes/save', { nom: cityName }); 
          setCities([...cities, response.data]); 
          setCityName(''); 
        } 
        catch (error) { 
          console.error(error); 
        } 
      };
    
      // Update
      const updateCity = async (e) => {
        //e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:8080/villes/update/${cityId}`, { nom: cityName });
          const updatedCities = cities.map((city) => {
            if (city.id === response.data.id) {
              return response.data;
            }
            return city;
          });
          setCities(updatedCities);
          setCityId('');
          setCityName('');
        } catch (error) {
          console.error(error);
        }
      };
    
    useEffect(() => { fetchCities(); }, []);
    return ( 
        <div>
            <h5 className='mt-5 ms-5'>Cities Management</h5>
    <Table striped bordered hover className='mt-3 w-75 ms-5'>
         <thead> 
            <tr> 
                <th>Id</th>
                 <th>City</th> 
                 <th>Action</th>
                 </tr> 
                 </thead> 
                 <tbody> {cities.map((city, index) => ( 
                    <tr key={city.id}> 
                        <td>{index + 1}</td> 
                        <td>{city.nom}</td> 
                        <td><button onClick={() => deleteCity(city.id)} className='btn btn-danger'>Delete</button>
                        <button onClick={() => getCityById(city.id)} className="btn btn-secondary ms-2">Edit</button></td></tr> ))}
                  </tbody> 
    </Table> 
    <div className="mt-3 ms-5 w-75"> 
    <input type="text" placeholder='City name' className="form-control mr-2 d-inline-block" value={cityName} onChange={(e) => setCityName(e.target.value)} />
         {cityId ? ( <button className="btn btn-success mt-3" onClick={updateCity}> Update City </button> ) : ( <button className="btn btn-primary mt-3" onClick={addCity}> Add City </button> )} 
    </div>
</div>
    
    );
}

export default City;
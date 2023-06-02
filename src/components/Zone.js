import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function Zone(){
  const [zones, setZones] = useState([]); 
  const [zoneName, setZoneName] = useState(''); 
  const [zoneCity, setZoneCity] = useState(''); 
  const [zoneId, setZoneId] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [cities, setCities] = useState([]);
  

  useEffect(() => { fetchZones(); }, []);
   
  const fetchZones = async () => { 
    try { 
      const response = await axios.get(`http://localhost:8080/zones/api/zones`); 
      setZones(response.data); } 
    catch (error) { console.error(error); } };
    
    /*const handleInputChange = (event) => { 
      const { name, value } = event.target; 
      if (name === 'zoneName') { 
        setZoneName(value); } 
      else if (name === 'zoneCity') { 
        setZoneCity(value); } };*/


    const deleteZone = async(id) => {
            try{
                await axios.delete(`http://localhost:8080/zones/delete/${id}`);
                setZones(zones.filter(zone => zone.id !== id));
            }catch (error) {console.error(error);}
           };

           const handleAddZone = async (event) => { 
            try { 
              const response = await axios.post('http://localhost:8080/zones/save', { nom: zoneName, ville : {id:zoneCity} }); 
              setZones([...zones, response.data]); 
              setZoneName('');
              setZoneCity('');
              setShowModal(false);
            } 
            catch (error) { console.error(error);}};  
           
            
           
            
            
            const handleEditZone = async (id) => { 
              try { 
                const response = await axios.put(`http://localhost:8080/zones/update/${id}`, { nom: zoneName, ville: zoneCity }); 
                const updatedZones = zones.map((zone) => { 
                  if (zone.id === id) { 
                    return response.data; } 
                    return zone; }); 
                    setZones(updatedZones); 
                    setShowModal(false); } 
                  catch (error) { 
                    console.error(error); } };


                    const handleOpenModal = (zone) => { 
                      if (zone) { 
                        setZoneId(zone.id); 
                        setZoneName(zone.nom); 
                        setZoneCity(zone.ville); } 
                      else { setZoneId(''); 
                              setZoneName('');
                              setZoneCity(''); } 
                            setShowModal(true); };
        
                
           
           useEffect(() => {
            const fetchCities = async () => {
              try {
                const response = await axios.get('http://localhost:8080/villes/api/villes');
                setCities(response.data);
              } catch (error) {
                console.error(error);
              }
              
            };
            fetchCities();
  }, []);
  
   return(
    <div>
       <h5 className='ms-5'>Zones Management</h5>
       <Table striped bordered hover className="table ms-5 w-75"> 
        <thead> 
            <tr>
              <th>Id</th>
                <th>Name</th>
                 <th>City</th>
                  <th>Actions</th>
            </tr> 
        </thead>
        <tbody> {zones.map((zone, index) => ( 
                <tr key={zone.id}>
                    <td>{index+1}</td>
                    <td>{zone.nom}</td> 
                    <td>{zone.ville.nom}</td>
                     <td> 
                        <button className="btn btn-secondary me-2" onClick={() => handleOpenModal(zone)}> Edit </button>
                         <button className="btn btn-danger" onClick={() => deleteZone(zone.id)}> Delete </button> </td> </tr> ))} 
        </tbody>
    
        </Table>
        
        <div className="mt-3 ms-5 w-75">
        <select id="city-select" className="form-control mt-3" value={zoneCity} onChange={(e) => setZoneCity(e.target.value)}>
        <option value="" disabled selected>-- Choose a city --</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>{city.id} - {city.nom} </option>
        ))}
      </select>      
      <input type="text" placeholder='Zone name' className="form-control mr-2 mt-2 d-inline-block" value={zoneName} onChange={(e) => setZoneName(e.target.value)}/>
      {zoneId ? (
        <button onClick={handleEditZone} className="btn btn-success mt-3 ms-2">Update Zone</button>
      ) : (
        <button onClick={handleAddZone} className="btn btn-primary mt-3">Add Zone</button>
      )}
    </div>
  </div>
);
  
}
export default Zone;
import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'

function App() {

const[ticket, setticket] = useState('')
const[description, setdescription] = useState('')
const[date, setDate] = useState('')
const[duree, setDuree] = useState('')
const[action, setAction] = useState('')

const [descriptionList, setdescriptionList] = useState([])
const [newReview, setNewReview] = useState('')


useEffect(()=>{
  Axios.get('http://localhost:3001/api/get').then((response)=>{
setdescriptionList(response.data)
  })
}, [])

const submitReview= () => {
 Axios.post('http://localhost:3001/api/insert', {
   ticket: ticket, 
   description:description,
   date:date,
   duree:duree,
   action:action
  });
  setdescriptionList([...descriptionList, {ticket:ticket, description:description}]);
}
 
const deleteReview = (movie) =>{
  Axios.delete(`http://localhost:3001/api/delete/${movie}`)
}
const updateReview = (movie) =>{
  Axios.put(`http://localhost:3001/api/update/`, {
    ticket:movie,
    description:newReview
  })
  setNewReview('')
}

  return (
    <div className="App">
      <h1>CRUD APPLI</h1>
      <div className="form">
      <label>Ticket</label>
      <input type='text' name="ticket" onChange={(e)=>{
        setticket(e.target.value)
      }}/>
      <label>Description</label>
      <input type='text' name="description" onChange={(e)=>{
        setdescription(e.target.value)
      }}/>
      <label>Date</label>
      <input type='text' name="date" onChange={(e)=>{
        setDate(e.target.value)
      }}/>
      <label>Durée</label>
            <input type='text' name="duree" onChange={(e)=>{
        setDuree(e.target.value)
      }}/>
      <label>Action</label>

            <input type='text' name="action" onChange={(e)=>{
        setAction(e.target.value)
      }}/>
      <button onClick={submitReview}>Submit</button>
      {descriptionList.map((val)=>{
        return (
        <div className="card">
          <h1>{val.Numero_de_ticket}</h1>
          <p>{val.Descritpif_du_ticket}</p>

          </div>
        )
        
      })}
      </div>
    </div>
  );
}

export default App;

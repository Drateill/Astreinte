import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './component/Modal';

import "./component/modal.css"

function App() {

const[ticket, setticket] = useState('')
const[description, setdescription] = useState('')
const[date, setDate] = useState('')
const[duree, setDuree] = useState('')
const[action, setAction] = useState('')
const [descriptionList, setdescriptionList] = useState([])
const [handleModal, setHandleModal] = useState(false)


let sum = descriptionList.reduce(function(prev, current) {
  return prev + +current.Duree_en_heure
}, 0);

useEffect(()=>{
  Axios.get('http://192.168.0.186:3001/api/get')
  .then(res => {
    setdescriptionList(res.data)
    
  })
  .catch(err => {
    console.log(err)
  })


  
}, [])

const submitTicket= () => {
 Axios.post('http://192.168.0.186:3001/api/insert', {
   ticket: ticket, 
   description:description,
   date:date,
   duree:duree,
   action:action
  });
  setdescriptionList([...descriptionList, {Numero_de_ticket:ticket, Descritpif_du_ticket:description, Date_appel:date, Duree_en_heure:duree, Action:action}]);
  setticket('')
  setdescription('')
  setDate('')
  setDuree('')
  setAction('')
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
}

const deleteTicket = (tickt) =>{
  Axios.delete(`http://192.168.0.186:3001/api/delete/${tickt}`)
  // setdescriptionList(descriptionList.filter(ticket => ticket.Numero_de_ticket !== tickt))
}

const openModal = () => {
  setHandleModal(!handleModal)
}

  return (
    <div className="App">
      {handleModal && <Modal className="modal" id="myModal" handleModal={openModal}/>}
      <h1>Astreinte</h1>
      <div id="form">
      <label>Ticket</label>
      <input type='text' name="ticket" onChange={(e)=>{
        setticket(e.target.value)
      }}/>
      <label>Description</label>
      <input type='textarea' rows="3" cols="33" name="description" onChange={(e)=>{
        setdescription(e.target.value)
      }}/>
      <label>Date</label>
      <input type='date' name="date" onChange={(e)=>{
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
      <button onClick={submitTicket}>Submit</button>
      <div>
      <button onClick={openModal}>Add check Loreal</button>
      Totale heures supp : {sum}
      </div>

      <div className="container py-5">
    <div className="row">
        <div className="col-lg-12 mx-auto">
            <div className="card rounded-0 border-0 shadow">
                <div className="card-body">      
                
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ticket</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Duree</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                              descriptionList.sort((a, b) => (a.Date_appel > b.Date_appel) ? 1 : -1).map((val, index)=> {
                                var date = new Date(val.Date_appel)
                                return (
                                  
                                    <tr key={index}>
                                    <th scope="row">{val.Numero_de_ticket}</th>
                                    <td>{date.toLocaleDateString()}</td>
                                    <td className='Description'>{val.Descritpif_du_ticket}</td>
                                    <td>{val.Action}</td>
                                    <td>{val.Duree_en_heure}h</td>
                                    <td><button onClick={()=>{deleteTicket(val.Numero_de_ticket)}}>Delete</button></td>
                                    <td></td>
                                </tr>
                                )
                              })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      </div>
    </div>
  );
}

export default App;

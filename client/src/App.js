import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'
import Datatable from './datatable/datatable';

function App() {

const[ticket, setticket] = useState('')
const[description, setdescription] = useState('')
const[date, setDate] = useState('')
const[duree, setDuree] = useState('')
const[action, setAction] = useState('')
const[data, setData] = useState([])
const[q, setQ] = useState('')
const[searchColumns, setsearchColumns] = useState(['Descritpif_du_ticket', 'Numero_de_ticket'])


const [newReview, setNewReview] = useState('')


useEffect(()=>{
  Axios.get('http://192.168.0.186:3001/api/get').then((response)=>{
setData(response.data)
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

function search(rows){
  return rows.filter((row)=> 
  searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1));
}

function hideTable(){
  const isDisplayed = document.getElementById("fl-table").style.display
  if (isDisplayed=="none"){
  document.getElementById("fl-table").style.display = "inherit"
}else{
  document.getElementById("fl-table").style.display = "none"
}
}

const columns = data[0] && Object.keys(data[0])

  return (
    <div className="App">
      <label>Search : </label>
      <input type="text" value={q} onChange={(e)=>setQ(e.target.value)}/>
      <button onClick={hideTable}>Hide/Display</button>
      {
        columns && columns.map((column) => <label>
          <input type="checkbox" checked={searchColumns.includes(column)} onChange={(e)=>{
            const checked = searchColumns.includes(column)
            setsearchColumns(prev => checked
              ? prev.filter(sc=> sc !== column)
              : [...prev, column])
          }
          
          }/>
          {column}
        </label>)
      }
      <div>Nombre de lignes trouvées : {search(data).length}</div>
      <Datatable data={search(data)}/>
      <div className="form" id='formulaire'>
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
      </div> 
    </div>
  );
}

export default App;

import Axios from 'axios';
const  modal= (props) => {
    const closeModal = props.handleModal;

    const submitCheckLoreal= () => {

var date =document.getElementById("date").value;
var result = new Date(date);
var result1 = new Date(date);
var result2 = new Date(date);
var result3 = new Date(date);
var result4 = new Date(date);
  result.setDate(result.getDate())
  result1.setDate(result.getDate()+1)
  result2.setDate(result.getDate()+2)
  result3.setDate(result.getDate()+3)
  result4.setDate(result.getDate()+4)
  console.log(result.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'));

        Axios.post('http://192.168.0.186:3001/api/insert', {
          ticket: "CheckLorealdu" + result.toLocaleDateString().replace(/\//g, '-').split('-').join('-'), 
          description:"Check Loreal",
          date:result.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'),
          duree:"1",
          action:"Check Loreal"
         })
         Axios.post('http://192.168.0.186:3001/api/insert', {
          ticket: "CheckLorealdu" + result1.toLocaleDateString().replace(/\//g, '-').split('-').join('-'), 
          description:"Check Loreal",
          date:result1.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'),
          duree:"1",
          action:"Check Loreal"
         })
         Axios.post('http://192.168.0.186:3001/api/insert', {
          ticket: "CheckLorealdu" + result2.toLocaleDateString().replace(/\//g, '-').split('-').join('-'), 
          description:"Check Loreal",
          date:result2.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'),
          duree:"1",
          action:"Check Loreal"
         })
         Axios.post('http://192.168.0.186:3001/api/insert', {
          ticket: "CheckLorealdu" + result3.toLocaleDateString().replace(/\//g, '-').split('-').join('-'), 
          description:"Check Loreal",
          date:result3.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'),
          duree:"1",
          action:"Check Loreal"
         })
         Axios.post('http://192.168.0.186:3001/api/insert', {
          ticket: "CheckLorealdu" + result4.toLocaleDateString().replace(/\//g, '-').split('-').join('-'), 
          description:"Check Loreal",
          date:result4.toLocaleDateString().replace(/\//g, '-').split('-').reverse().join('-'),
          duree:"1",
          action:"Check Loreal"
         })

}
        
    return (
        <div className="modal">
        <div className="modal-content">
  <button id="close" onClick={closeModal}>&times;</button>
  <input type='date' name="date" id="date"/>
  <button onClick={submitCheckLoreal}>Submit</button>
</div>
        </div>
    )
}

export default modal



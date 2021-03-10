const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "Astreinte"
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get("/api/get", (req,res)=>{
    const sqlSelect="SELECT * FROM merged"
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})




app.post("/api/insert", (req, res)=> {

    const ticket = req.body.ticket
    const description = req.body.description
    const duree = req.body.duree
    const action = req.body.action
    const date = req.body.date

    const sqlInsert="INSERT INTO merged (Date_appel, Duree_en_heure, Numero_de_ticket, Descritpif_du_ticket, Action) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [date, duree ,ticket, description, action], (err, result)=>{
        console.log(err)

    })
})

app.delete("/api/delete/:ticket", (req,res)=>{
    const name= req.params.ticket
    const sqlDelete="DELETE FROM movie_reviews WHERE ticket = ?";
    db.query(sqlDelete, name, (err,result)=>{
       if (err) console.log(err);
    })
})

app.put("/api/update/", (req,res)=>{

    const name= req.body.ticket
    const review= req.body.description

    const sqlUpdate="UPDATE movie_reviews SET description = ? WHERE ticket = ?";
    db.query(sqlUpdate, [review, name], (err,result)=>{
       if (err) console.log(err);
    })
})

app.listen(3001, () => {
        console.log("running on port 3001");
    }

)
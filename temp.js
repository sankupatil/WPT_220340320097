
const express =require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());


const bodyParser = require('body-parser');

let dbparams={
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'newdatabase',
	port:3306
}
const mysql = require('mysql2');
let con=mysql.createConnection(dbparams);

app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
app.get('/bookdata',(req,res)=>{
	let input1=req.query.bookid;
	let input2=req.query.bookname;
	let input3=req.query.price;
	let output={status:false,bookdtl:{}}
	
		con.query('insert into book(bookid,bookname, price) values (?,?,?)'[input1,input2,input3],
		(err,rows)=>{
			if(err){
				console.log(err);
				output.status=false;
				output.bookdtl={}
			}
			else{
				if(rows.affectedRows>0){
					output.status=true;
					output.bookdtl={}
					console.log(rows,affectedRows);
				}
			}
		}
		)
	

})

app.get('/showbooks',(req,res)=>{

	connection.query("select * from book", [], (err, row) => {
        if (err) {
			console.log("error");
        } else {
            // result = res1;
			let arr=[];
			let books={id:0,name:" ",cost:0};
			if(row.length>0){
				for (let i = 0; i < row.length; i++) {
					
					// console.log(row[i]);
					books.id=row[i].bookid;
					books.name=row[i].bookname;
					books.cost=row[i].price;

					arr[i]={id:books.id,name:books.name,cost:books.cost};
				}
			}
			console.log(arr);
			res.send(arr); 
			
        }
		
    });
})


// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.input);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});
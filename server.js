
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const SimpleGoodreads = require('simple-goodreads');

const bodyParser = require('body-parser');
var goodreads = new SimpleGoodreads();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});



express()

  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/test', (req, res) => res.render('pages/index'))
  
 
  .get('/', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM wishlist');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/wishlist', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error" + err);
    }
  })

   .post('/', function (req, res) {
  console.log("The post is working")
  let title = req.body.title;
  if(title == undefined){
        res.render('index', {book: null, error: 'Error, please try again'});
      }

  goodreads.searchBook(title, function (err, book) {
     
    try{
            
        let bookTitle = book.title;
        let bookAuthor = book.author;
        let bookRate = book.rating;
        let bookPic = book.image_url;

        console.log(bookTitle); 
        console.log(bookAuthor); 
        console.log(bookRate); 
        console.log(bookPic);


       res.render('pages/display', {
        bookTitle,
        bookAuthor,
        bookRate,
        bookPic,
        error: null});
       

     console.log ("The post is complted");
   }
     catch (err) {
      console.error(err);
      res.render('pages/error', {book: null, error: 'Error, please try again'})
    }
})
})

.post('/add', async (req, res) => {

  let title = req.body.addTitle;
    let author = req.body.addAuthor;
    let rate = req.body.addRate;
    let pic = req.body.addPic;
    console.log("The Button is working");
    console.log(title);
    console.log(author);
    console.log(rate);
    console.log(pic);
    

    try {
      const client = await pool.connect()
      const result = await client.query("INSERT INTO wishList(title, author, rate, pic) VALUES ('" + title  +"', '" + author + "', " + rate + ", '" + pic + "');");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/add', results );
      client.release();

    } catch (err) {
      console.error(err);
      res.send("Error" + err);
    }
    
  })

.post('/delete', async (req, res) => {

    let bookID = req.body.remove;

    console.log("The Button is working");
    deleteRows(bookID);
    res.render('pages/delete');
  

    
  })


   


  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function deleteRows(rows){

  
rows.forEach(function(element) {
  console.log("DELETE FROM wishlist WHERE bookid =" + element + ";");
}
};


  




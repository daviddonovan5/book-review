
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
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test', (req, res) => res.render('pages/db'))
 
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
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
     }
     catch (err) {
      console.error(err);
      res.render('pages/error', {book: null, error: 'Error, please try again'})
    }
})
})

  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  




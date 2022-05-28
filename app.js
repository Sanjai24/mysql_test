const mysql = require('mysql');
const express = require('express');

const db = mysql.createConnection({
    host   :  'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
});

db.connect((err)=>{
    if(err){
        throw err;
    
    }
    else{
        console.log('MySQL connection established');
    }
})

const app = express();

app.get('/createdb', (req, res) => {
   let sql = 'CREATE DATABASE nodemysql';
   db.query(sql, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('Database created');

   });

});

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('posts table created');
    });
});

app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'Post number 1 this one'};
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('added posts 1');
    });
} );

app.get('/addpost2', (req, res) => {
    let post = {title: 'Post Two', body: 'Post number 2 this one'};
    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('added posts 2');
    });
} );

app.get('/getposts', (req, res)=> {
    let sql = 'Select * from posts';
    db.query(sql, (err, results)=>{
        if(err) throw err;
        console.log(results);
        res.send('posts fetched...');
    });
});

app.get('/getpost/:id', (req, res)=> {
    let sql = `Select * from posts where id= ${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched...');
    });
});

app.get('/updateP/:id', (req, res)=> {
    let newTitle = 'Updated T';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(`${req.params.id} updated... `);
    });
});

app.get('/delete/:id', (req, res)=> {
    let sql = `DELETE from posts where id = ${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post deleted...');
    });
});

app.listen('3001', ()=> {
   console.log('The server is running in port 3001');
});
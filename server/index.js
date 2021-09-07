const express = require('express')
app = express()
app.use(express.json())
const fs = require('fs');
const csv = require('csv-parser');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
 
function sortByYear(array,filterOption){
  var firstСomparison = 1;
  var secondComparison = -1;
  if (filterOption === 'up') {
    [firstСomparison,secondComparison] = [secondComparison,firstСomparison]
  }
  array.sort(function compare(a, b) {
    if (a.year > b.year) {
      return secondComparison;
    }
    if (a.year < b.year) {
      return firstСomparison;
    }
    return 0;
  });
}



app.get('/movies/:moviesCount/:page', (req,res)=>{
  const pageNumber = req.params.page;
  const moviesCount = req.params.moviesCount; 
  const results = [];
  fs.createReadStream('../myFile0.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    var movies = results.splice((pageNumber*moviesCount),moviesCount)
    res.send({movies:movies,pages:Math.floor(results.length/movies.length+1)});
  });
})

app.get('/movies/byYear/:filter/:moviesCount/:page',(req,res)=>{
  const pageNumber = req.params.page;
  const moviesCount = req.params.moviesCount; 
  const filter = req.params.filter;
  const results = [];
  fs.createReadStream('../myFile0.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    sortByYear(results,filter)
    var movies = results.splice((pageNumber*moviesCount),moviesCount)
    res.send({movies:movies,pages:Math.floor(results.length/movies.length+1)});
  });
})
app.get('/movies/byGenre/:filter/:moviesCount/:page',(req,res)=>{
  const pageNumber = req.params.page;
  const moviesCount = req.params.moviesCount; 
  const filter = req.params.filter;
  const results = [];
  fs.createReadStream('../myFile0.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
  var sortedResults = results.filter(element =>  element.genre1 === filter || element.genre2 === filter )
    var movies = sortedResults.splice((pageNumber*moviesCount),moviesCount)
    res.send({movies:movies,pages:Math.floor(sortedResults.length/movies.length+1)});
  });
})

app.listen(3000)



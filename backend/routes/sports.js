const router=require('express').Router();
const rp=require('request-promise');
require('dotenv').config();


router.get('/cricket',(req,res)=> {
    const options = {
        url: 'https://hs-consumer-api.espncricinfo.com/v1/pages/matches/current?lang=en&latest=true',
        json: true
    }
    rp(options)
   .then((data)=> { res.send(data)})
.catch((err)=> {
    console.log(err);
});
})
router.get('/football',(req,res)=> {
  const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports/1/events/live',
    qs: {page: '1'},
    headers: {
      'x-rapidapi-host': process.env.SPORTSCOREHOST,
      'x-rapidapi-key': process.env.SPORTSCOREKEY
    },
    json: true,

}
         rp(options)
         .then((data)=> res.send(data));
})
router.get('/tennis',(req,res)=> {
  const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports/2/events/live',
    qs: {page: '1'},
    headers: {
      'x-rapidapi-host': process.env.SPORTSCOREHOST,
      'x-rapidapi-key': process.env.SPORTSCOREKEY
    },
    json: true,

}
         rp(options)
         .then((data)=> res.send(data));
})
router.get('/basketball',(req,res)=> {
  const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports/3/events/live',
    qs: {page: '1'},
    headers: {
      'x-rapidapi-host': process.env.SPORTSCOREHOST,
      'x-rapidapi-key': process.env.SPORTSCOREKEY
    },
    json: true,

}
         rp(options)
         .then((data)=> res.send(data));
})
router.get('/hockey',(req,res)=> {
  const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports/4/events/live',
    qs: {page: '1'},
    headers: {
      'x-rapidapi-host': process.env.SPORTSCOREHOST,
      'x-rapidapi-key': process.env.SPORTSCOREKEY
    },
    json: true,

}
         rp(options)
         .then((data)=> res.send(data));
})

module.exports=router
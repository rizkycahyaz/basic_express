var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function (req, res, next) {
  connection.query('select * from produk order by id_kategori desc', function(err, rows){
    if(err){
        req.flash('error',err);

    }else{
        res.render('kategori/index',{
            data: rows
        })
    }
  })  
})

router.get ('/create', function (req, res, next){
  res.render ('kategori/create',{
      nama_kategori : ''
  })
})

router.post ('/store', function (req, res, next){
  try {
      let {nama_kategori} = req.body;
      let data = {
          nama_kategori
      }
      connection.query('insert into produk set ?',data, function(err, result){
          if (err){
              req.flash('error', 'gagal menyimpan data!!');
          }else{
              req.flash('success', 'berhasil mneyimpan data');
          }
          res.redirect('/kategori');
      })
  } catch {
      req.flash ('error','terjadi kesalahan pada fungsi');
      res.redirect ('/kategori'); 
  }
})

module.exports = router;
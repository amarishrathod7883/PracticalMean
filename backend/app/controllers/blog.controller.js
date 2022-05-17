const express = require('express');
var router = express.Router();

const Blog = require('../models/blog.model');

router.post('/getAllBlog', function(req, res)
{
  var searchCondition = {};
  const resultperpage = parseInt(req.body.pageSize)
  const pageNumber = req.body.pages > 0 ? ((req.body.pages-1) * resultperpage) : 0;
  console.log("req.body", req.body);

  if(req.body.id != undefined)
  {
    searchCondition._id = req.body._id;
  }


  Blog
  .countDocuments(searchCondition)
  .then(fetchedBlogCount => 
  {
    Blog
    .find(searchCondition)
    .skip(pageNumber)
    .limit(resultperpage)
    .sort({_id: 1})
    .then(fetchedBlog => 
    {
      res.status(200).send({ data: fetchedBlog, fetchedBlogCount: fetchedBlogCount})
    })
    .catch(error =>
    {
      res.status(500).send({ message: error})
      return;
    })
  })
  .catch(error =>
    {
      res.status(500).send({ message: error})
      return;
    })
})

router.get('/getSingleBlog/:id', function (req, res) 
{
  Blog
  .findById(req.params.id)
  .then(fetchedBlog => {
    res.status(200).send({ data: fetchedBlog, message: "Blog fetched successfully!" });
  })
  .catch(error => {
    res.status(500).send({ message: error });
    return;
  });
});

router.post('/createBlog/:id', function (req, res) 
{
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  if(req.params.id == 'new')
  {
    var blogDataObj = {
      Title: req.body.Title,
      Description: req.body.Description,
      ModifyDate: req.body.ModifyDate,
      Status: req.body.Status,
      Category: req.body.Category,
      Author: req.body.Author,
    };
  
    new Blog(blogDataObj)
    .save()
    .then(savedBlog => 
    {
      res.send({ data: savedBlog, message: "Blog was updated successfully!" });
    })
    .catch(error => {
      res.status(500).send({ message: error });
      return;
    });
  }
  else
  {
    var blogDataObj = {
      Title: req.body.Title,
      Description: req.body.Description,
      ModifyDate: req.body.ModifyDate,
      Status: req.body.Status,
      Category: req.body.Category,
      Author: req.body.Author,
    };
  
    Blog
    .findOneAndUpdate(req.params.id, blogDataObj)
    .then(savedBlog => 
    {
      res.send({ data: savedBlog, message: "Blog was updated successfully!" });
    })
    .catch(error => {
      res.status(500).send({ message: error });
      return;
    });
  }
});

router.get('/removeBlog/:id', function (req, res) 
{
  console.log("req.params.id", req.params.id);
  Blog
  .findOneAndRemove({'_id': req.params.id})
  .then(fetchedBlog => {
    res.status(200).send({ data: fetchedBlog, message: "Blog deleted successfully!" });
  })
  .catch(error => {
    res.status(500).send({ message: error });
    return;
  });
});


module.exports = router;
const router = require('express').Router();
module.exports = router;
const models = require('../db').models;
const Region = models.Region;
const SalesPerson = models.SalesPerson;
const SalesPersonRegion = models.SalesPersonRegion;
const Promise = require("bluebird"); 


router.get("/",function(req,res,next){
  Promise.all([
      SalesPerson.findAll({ include: [ SalesPersonRegion ]}),
      Region.findAll()
  ])
  .spread(function(salesPeople, regions){
    res.render('salesPeople', {
      salesPeople: salesPeople,
      regions: regions
    });
  })
  .catch(next);
});

router.post("/",function(req, res, next){
	SalesPerson.create({ name: req.body.salesPerson })
	.then(function(salesPerson){
		res.redirect("/salesPeople");
	})
	.catch(next);
});

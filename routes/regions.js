const router = require('express').Router();
module.exports = router;
const models = require('../db').models;
const Region = models.Region;
const SalesPerson = models.SalesPerson;
const SalesPersonRegion = models.SalesPersonRegion;
const Promise = require("bluebird");

// all you need are the regions (with SalesPersonRegion) and the salesPeople
router.get("/",function(req,res,next){
	Promise.all([
      Region.findAll({ include: [ SalesPersonRegion ] }),
      SalesPerson.findAll()
  ])
	.spread(function(regions, salesPeople){
		res.render("regions", {
      regions: regions,
      salesPeople: salesPeople
    });
	})
	.catch(next);
});

router.post("/",function(req, res, next){
	Region.create({ zip: req.body.zipcode })
	.then(function(region){
		res.redirect("/regions");
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
  SalesPersonRegion.destroy({
    where: { regionId: req.params.id }
  })
  .then(function(){
    return Region.destroy({
      where: { id: req.params.id }
    });
  })
  .then(function(){
    res.redirect('/regions');
  });
});


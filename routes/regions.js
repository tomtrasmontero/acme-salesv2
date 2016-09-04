const router = require('express').Router();
module.exports = router;
const models = require('../db').models;
const Regions = models.Region;
const SalesPerson = models.SalesPerson;
const Promise = require("bluebird");

router.get("/",function(req,res,next){
	Promise.all([Regions.listRegions(),SalesPerson.listSalesPerson(),models.SalesPersonRegion.listSalesPersonRegion()])
	.spread(function(regionList,salesPersonList,array){
		// console.log(array);
		res.render("regions",{
		regions: regionList,
		salesPeople: salesPersonList, 
		matched: models.SalesPersonRegion.findSalesPersonRegion,
		arraySPR: array});	
	})
	.catch(next);
});

router.post("/",function(req,res,next){
	Regions.addRegion(req.body.zipcode)
	.then(function(newRegion){
		res.redirect("/regions")
	})
	.catch(next);
});

// router.delete('/:regionId', function(req,res,next{
	
// }))


router.use(function(err,req,res,next){
	console.log(err, err.stack);
}); 



const router = require('express').Router();
module.exports = router;
const models = require('../db').models;
const Regions = models.Region;
const SalesPerson = models.SalesPerson;
const SalesPersonRegion = models.SalesPersonRegion; 
const Promise = require("bluebird");

router.post('/:salesId/:regionId',function(req,res,next){
	models.SalesPersonRegion.addSalesPersonRegion(req.params.salesId,req.params.regionId)
	.then(function(){
		res.redirect(req.body.name);
	})
	.catch(next);
});

router.delete('/:salesId/:regionId', function(req,res,next){
	SalesPersonRegion.remove(req.params.salesId, req.params.regionId)
	.then(function(){
		res.redirect(req.body.name); 
	})
	.catch(next);
})


router.use(function(err,req,res,next){
	console.log(err, err.stack);
});
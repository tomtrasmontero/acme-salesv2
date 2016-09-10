const router = require('express').Router();
module.exports = router;
const models = require('../db').models;
const SalesPersonRegion = models.SalesPersonRegion; 

router.post('/:salesPersonId/:regionId',function(req, res, next){
	SalesPersonRegion.create({
    salesPersonId: req.params.salesPersonId,
    regionId: req.params.regionId})
	.then(function(){
		res.redirect(req.query.backTo);//add this
	})
	.catch(next);
});

router.delete('/:salesPersonId/:regionId', function(req, res, next){
	SalesPersonRegion.destroy({
      where: {
        salesPersonId: req.params.salesPersonId,
        regionId: req.params.regionId
      }
  })
	.then(function(){
		res.redirect(req.query.backTo);//add this
	})
	.catch(next);
});


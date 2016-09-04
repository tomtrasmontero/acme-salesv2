const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

db.authenticate().then(function(result){
	console.log('db connection succesful!');
})
.catch(function(err){ throw err});


const SalesPerson = db.define("salesPerson",{
	name: Sequelize.STRING
},{
	classMethods:{
		addSalesPerson: function(name){
			return SalesPerson.findOrCreate({
				where: {
					name: name
				}
			})
		},
		listSalesPerson: function(){
			return SalesPerson.findAll({});
		}
	}

});

const Region = db.define("region",{
	zipCode: {
		type: Sequelize.INTEGER,
		validate: {
			is: /^[0-9]{5}(?:-[0-9]{4})?$/
		}
	}
},{
	classMethods:{
		addRegion: function(zip){
			return Region.findOrCreate({
				where: {
					zipCode: zip
				}
			})
		},
		listRegions: function(){
			return Region.findAll({});
		}
	}
});

const SalesPersonRegion = db.define("salesPersonRegion",{	
},{
	classMethods:{
		addSalesPersonRegion: function(salesId,regionId){
			return SalesPersonRegion.findOrCreate({
				where: {
					salesPersonId: salesId,
					regionId: regionId
				}
			})
		},
		listSalesPersonRegion: function(){
			return SalesPersonRegion.findAll({

			});
		},
		findSalesPersonRegion: function(arr,salesId,regionId){
			let test = false;
			// console.log(arr);
			arr.filter(function(array){
				if(array.get().salesPersonId === salesId && array.get().regionId === regionId){
					test = true;
				}
			})

			return test;
		}, 
		remove: function(salesId, regionId){
				return SalesPersonRegion.destroy({where: {salesPersonId: salesId, regionId: regionId}});
		}
	}
});

function sync(){
	return db.sync({});
}

SalesPersonRegion.belongsTo(SalesPerson);
SalesPersonRegion.belongsTo(Region);
SalesPerson.hasMany(SalesPersonRegion);
Region.hasMany(SalesPersonRegion);


module.exports = {
	sync: sync,
	models:{
		SalesPerson: SalesPerson,
		Region: Region,
		SalesPersonRegion: SalesPersonRegion
	}
}


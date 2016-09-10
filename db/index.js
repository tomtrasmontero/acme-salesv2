//these models can be much simpler... 
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});



const SalesPerson = db.define("salesPerson",{
	name: Sequelize.STRING
});

const Region = db.define("region",{
	zipCode: {
		type: Sequelize.INTEGER,
		validate: {
			is: /^[0-9]{5}(?:-[0-9]{4})?$/
		}
	}
});

const SalesPersonRegion = db.define("salesPersonRegion",{	
},{
	classMethods: {
    /*
     * I think you want instance method on SalesPerson and Region
     * plus I think you would probably want reduce
		findSalesPersonRegion: function(arr, salesPersonId, regionId){
			let test = false;
			// console.log(arr);
			arr.filter(function(array){
				if(array.get().salesPersonId === salesId && array.get().regionId === regionId){
					test = true;
				}
			})

			return test;
		}, 
    */
	}
});

function sync(){
	return db.sync({ force: true });
}

SalesPersonRegion.belongsTo(SalesPerson);
SalesPersonRegion.belongsTo(Region);

SalesPerson.hasMany(SalesPersonRegion);
Region.hasMany(SalesPersonRegion);


module.exports = {
	sync: sync,
  authenticate: function(){
    return db.authenticate();
  },
	models:{
		SalesPerson: SalesPerson,
		Region: Region,
		SalesPersonRegion: SalesPersonRegion
	}
};

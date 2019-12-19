'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Shirt extends Model{

    static priceComma(uang){
      var num = new Number(uang).toLocaleString("id-ID");
      return num
    }
  }
  Shirt.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    url: DataTypes.STRING,
    
  }, { sequelize });
  Shirt.associate = function(models) {
    // associations can be defined here
    Shirt.belongsToMany(models.User, {through: models.UserShirt, foreignKey: 'ShirtId'})
  };
  return Shirt;
};
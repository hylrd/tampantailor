'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Shirt extends Model{
    static toCurrencyFormat(value){
      for(let i = 0; i < value.length; i++) {
        let change = 'Rp ' + (value[i].price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        value[i].price = change
      }
      return value
    }

    firstLetter(value){
      for(let i = 0; i < value.lengh; i++){
        let change = value[i].name[0].toUppercase()
        value[i].name = change
      }
      return value
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
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shirt = sequelize.define('Shirt', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Shirt.associate = function(models) {
    // associations can be defined here
    Shirt.belongsToMany(models.User, {through: models.UserShirt, foreignKey: 'ShirtId'})
  };
  return Shirt;
};
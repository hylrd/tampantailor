'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model =sequelize.Sequelize.Model
  class UserShirt extends Model {}

  UserShirt.init({
    UserId: DataTypes.INTEGER,
    ShirtId: DataTypes.INTEGER
  }, {
    sequelize
  })
  UserShirt.associate = function(models) {
    // associations can be defined here
  };
  return UserShirt;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserShirt = sequelize.define('UserShirt', {
    UserId: DataTypes.INTEGER,
    ShirtId: DataTypes.INTEGER
  }, {});
  UserShirt.associate = function(models) {
    // associations can be defined here
  };
  return UserShirt;
};
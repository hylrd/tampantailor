'use strict';
var bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    sequelize,
    hooks: {
      beforeCreate: function(user){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        // console.log(user)
      }
    
    } 
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Shirt, {through: models.UserShirt, foreignKey: 'UserId'})
  };
  return User;
};
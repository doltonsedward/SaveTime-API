'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    static associate(models) {
      todo.belongsTo(models.user, {
        foreignKey: {
          name: "idUser"
        }
      })
    }
  };
  todo.init({
    name: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};
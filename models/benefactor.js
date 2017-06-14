
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tarea = sequelize.define('Tarea', {
    id_responsable: {
      type : DataTypes.INTEGER,
      unique : true,
      allowNull : false
    }, {
    classMethods: {
			associate: function(models) {
        Tarea.belongsTo(models.Persona)
        // associations can be defined here
      }
    }

  });
  return Tarea;
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  //me genera automaticamente un UUIDV4
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    height: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    weight: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    health: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    attack: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    defense: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    speed: {
      type: DataTypes.INTEGER,
      defaultValue: "50",
    },

    obs:{
      type: DataTypes.STRING,
      defaultValue:"desctiption",
    },

    img: {
      type: DataTypes.STRING,
      defaultValue:"No image",
    },

    fromDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },

  {
    timestamps: false,
    freezeTableName: true,
  }
);;
};

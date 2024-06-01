const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('material', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "material_nome"
    },
    quantid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    preco_compra: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ultima_compra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'material',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "material_nome",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nome" },
        ]
      },
    ]
  });
};

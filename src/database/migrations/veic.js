const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('veic', {
    placa_frota: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true
    },
    prop: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'prop',
        key: 'cpf_cnpj'
      }
    },
    modelo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cor: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'veic',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "placa_frota" },
        ]
      },
      {
        name: "veic_prop_FK",
        using: "BTREE",
        fields: [
          { name: "prop" },
        ]
      },
    ]
  });
};

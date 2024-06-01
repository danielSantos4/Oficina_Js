const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('serv', {
    id_serv: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    func: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'func',
        key: 'cpf_cnpj'
      }
    },
    veic: {
      type: DataTypes.STRING(7),
      allowNull: true,
      references: {
        model: 'veic',
        key: 'placa_frota'
      }
    },
    data_in: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    data_out: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    desc_serv: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'serv',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_serv" },
        ]
      },
      {
        name: "serv_func_FK",
        using: "BTREE",
        fields: [
          { name: "func" },
        ]
      },
      {
        name: "serv_veic_FK",
        using: "BTREE",
        fields: [
          { name: "veic" },
        ]
      },
    ]
  });
};

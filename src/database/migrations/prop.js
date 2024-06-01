const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prop', {
    cpf_cnpj: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "prop_nome"
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'prop',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cpf_cnpj" },
        ]
      },
      {
        name: "prop_nome",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nome" },
        ]
      },
    ]
  });
};

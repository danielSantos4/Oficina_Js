const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('func', {
    cpf_cnpj: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "func_nome"
    },
    opcao_pag: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    num_conta: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "func_conta"
    },
    chave_pix: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "func_pix"
    }
  }, {
    sequelize,
    tableName: 'func',
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
        name: "func_nome",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "func_conta",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num_conta" },
        ]
      },
      {
        name: "func_pix",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chave_pix" },
        ]
      },
    ]
  });
};

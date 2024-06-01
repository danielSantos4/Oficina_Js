const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Func extends Model {
    static init(sequelize) {
        super.init ({
            cpf_cnpj: {primaryKey: true, type: DataTypes.STRING(15)},
            nome: DataTypes.STRING(30),
            opcao_pag: DataTypes.STRING(1),
            num_conta: DataTypes.STRING(20),
            chave_pix: DataTypes.STRING(50),
        },
        {
            sequelize,
        }
        );
        return this;
    }
}

module.exports = Func;
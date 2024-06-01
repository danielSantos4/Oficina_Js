const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Prop extends Model {
    static init(sequelize) {
        super.init({
            cpf_cnpj: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            nome:DataTypes.STRING(30),
            telefone: DataTypes.STRING(11),
        },
        {
            sequelize,
        });
        return this;
    }
}

module.exports = Prop
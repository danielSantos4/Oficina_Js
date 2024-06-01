const DataTypes = require('sequelize').DataTypes
const { Model } = require('sequelize')

class Material extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true
            },
            nome: DataTypes.STRING(15),
            quantid: DataTypes.INTEGER.UNSIGNED,
            preco_compra: DataTypes.FLOAT,
            ultima_compra: DataTypes.DATEONLY,
        },
        {
            sequelize,
        });
        return this;
    }
}

module.exports = Material
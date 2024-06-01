const Sequelize = require('sequelize');
const databaseConfig = require('../configs/db');

const Func = require('../apps/models/func');
const Prop = require('../apps/models/prop');
const Veic = require('../apps/models/veic');
const Serv = require('../apps/models/serv');
const Mater = require('../apps/models/material');
const Mat_serv = require('../apps/models/mat_serv');

const models = [Func, Prop, Veic, Serv, Mater, Mat_serv];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.connection));
    }
}

module.exports = new Database();
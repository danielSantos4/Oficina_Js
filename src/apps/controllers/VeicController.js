const Veic = require("../models/veic");

class VeicController {
    async create( req, res ) {
        console.log("Crete veic ... ")
        const veicVerify = await Veic.getOne({
            where: {
                placa_frota: req.body.placa_frota,
            },
        });

        if (veicVerify) { return res.status(400).json({message: "Veic already exist ..."}); }
        const veic = await Veic.create(req.body);

        if (!veic) { return res.status(400).json({message: "Error in create new veic ..."});}
        return res.send({ message: veic });
    }

    async delete( req, res ) {
        res.send({ message: "not implemented yet" });
    }

    async update( req, res ) {
        console.log("Updating Veic ... ");
        const validateVeic = await Veic.findOne({
            where: {
                placa_frota: req.body.old_placa_frota,
            }
        })
        if(validateVeic) {
            if("placa_frota" in req.body) {
                if(req.body.placa_frota != req.body.old_placa_frota) {
                    const second_validation = await Veic.findOne({
                        where: { placa_frota: req.body.placa_frota, }
                    })
                    if(second_validation) { return res.status(406).json({ message: "Error: not possible to update to this new sign ... "});}
                    validateVeic.placa_frota = req.body.placa_frota;
                }
            }

            if("prop" in req.body) {
                if(req.body.prop != req.body.old_prop) {
                    const PropCont = require("./PropController");
                    const verifyProp = await PropCont.veic_getOne(req, res);
                    console.log(verifyProp);
                    if(!verifyProp) { return res.status(406).json({message: "Error: not possible to update to this new employee ..."}); }
                    validateVeic.prop = req.body.prop;
                }
            }
            if("modelo" in req.body) { validateVeic.modelo = req.body.modelo; }
            if("cor" in req.body) { validateVeic.cor = req.body.cor; }
            validateVeic.save();
            return res.send({message: "Vehicle update with success ... "});
        }
        return res.status(406).json({message: "Veihicle not finded ..."});
    }

    async getOne( req, res ) {
        console.log("Getting one vehicle ... ");
        let queryString = "SELECT * FROM Veic WHERE";
        if ("placa_frota" in req.body) { queryString += ` placa_frota='${req.body.placa_frota}' AND`; }
        if ("prop" in req.body) { queryString += ` prop='${req.body.prop}' AND`; }
        if ("modelo" in req.body) { queryString += ` modelo='${req.body.modelo}' AND`; }
        if ("cor" in req.body) { queryString += ` cor='${req.body.cor}' AND`; }
        queryString += ` 1;`;
        console.log("Printing query message ... \n ${queryString}")

        const veic = await Veic.sequelize.query(queryString);
        return res.send({ message: veic });
    }
    async getAll( req, res ) {
        console.log("Getting all Vehicles ... ");
        const veic = await Veic.findAll();
        console.log(veic);
        return res.send({ message: "Successfully recovered ... "});
    }

    async serv_getOne( req, res ) {
        console.log("Getting Vehicle for service creation ... ");
        const veic = await Veic.findOne({
            where: {cpf_cnpj: req.body.cpf_cnpj, }
        });
        if(!veic) { return res.send({message: "Vehicle not find with this name ..."});}
        return veic;
    }
};

module.exports = new VeicController()
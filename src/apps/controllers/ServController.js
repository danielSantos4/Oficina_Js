const Serv = require('../models/serv');
const Veic = require('../controllers/VeicController');
const Func = require('../controllers/FuncController');

class ServController {
    async create( req, res ) {
        console.log("Creating service ... ");
        const verifyVeic = await Veic.serv_getOne( req, res );
        const verifyFunc = await Func.serv_getOne( req, res );
        if(verifyFunc && verifyVeic) {
            const dateServIn = new Date(req.body.data_in);
            let dateServOut = new Date(req.body.data_out);
            const today = new Date();

            if(req.body.data_out == "null") { dateServOut = today; req.body.data_out = null;}
            if(dateServIn <= today && dateServIn <= dateServOut) {
                req.body.id_serv = null;
                const serv = await Serv.create(req.body);
                if (serv) { return res.send({message: "Created with success ... "});}
                return res.status(400).json({message: "Service not created ... "});
            }
        }
        return res.send({message: "Not possible to create for this vehicle or employee ... "});
    }

    async update( req, res ) {
        console.log("Updating service ...");
        const serv = await Serv.findOne({
            where: {
                func: req.body.old_func,
                veic: req.body.old_veic,
            }
        })
        if("func" in req.body) { 
            req.body.cpf_cnpj = req.body.func;
            const func = await Func.serv_getOne( req, res );
            if(!func) { res.status(400).json({message: "Employee not found ... "});}
            serv.func = req.body.func;
        } 
        if("veic" in req.body) {
            req.body.placa_frota = req.body.veic;
            const veic = await Veic.serv_getOne( req, res );
            if(!veic) { res.status(400).json({message: "Vehicle not found"});}
            serv.veic = req.body.veic;
        }
        const today = new Date()
        if("data_in" in req.body && "data_out" in req.body) {
            const dataIn = new Date(req.body.data_in);
            const dataOut = new Date(req.body.data_out);
            if(dataIn <= dataOut && dataOut <= today) { 
                serv.data_in = req.body.data_in;
                serv.data_out = req.body.data_out;
            }
        }
        else if("data_in" in req.body) {
            const dataIn = new Date(req.body.data_in);
            const dataOut = new Date(serv.data_out);
            if(dataIn <= dataOut) {
                serv.data_in = req.body.data_in;
            }
        }
        else if("data_out" in req.body) {
            const dataIn = new Date(serv.data_in);
            const dataOut = new Date(req.body.data_out);
            if(dataIn <= dataOut && dataOut <= today) {
                serv.data_out = req.body.data_out;
            }
        }

        if("desc_serv" in req.body) {
            serv.desc_serv = req.body.desc_serv;
        }

        if("preco" in req.body) {
            serv.preco = req.body.preco;
        }
        serv.save();

        res.send({ message: "Service update with success ... "})
    }

    async getOne( req, res ){
        console.log("Getting a service ... ");
        const serv = await Serv.findOne({
            where: req.body,
        })
        if(!serv){ return res.status(400).json({message: "Service not finded with this entry ... "});}
        return res.send(serv)
    }

    async mat_serv_getOne( req, res ){
        console.log("Getting a Service for Mat_Serv ... ");
        const serv = await Serv.getOne({
            where: {id: req.body.id_serv,}
        })
        if(!serv) { res.status(400).json({message: "Service not finded with this entry ... "});}
        return serv;
    }
}

module.exports = new ServController();
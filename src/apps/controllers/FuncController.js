const Func  = require('../models/func')

class FuncController {
    async create(req, res) {
        console.log("Creating Func ...")
        const verifyFunc = await Func.findOne({ 
            where: { 
                cpf_cnpj: req.body.cpf_cnpj, 
                nome: req.body.nome,
            },
        });

        if (verifyFunc) {
            return res.status(400).json({message: "Func already exist ..."});
        }
        if (!(req.body.num_conta || req.body.chave_pix)) {
            return res.status(400).json({message: "Missing fields ..."})
        }

        const func = await Func.create(req.body);

        if (!func) {
            return res.status(400).json({message: "Error in creation ... "});
        }
        return res.send({ message: "Sucefully created"});
    }

    async update(req, res) {
        console.log("Updating func ...")
        const _func = await Func.findOne({ 
            where: { 
                cpf_cnpj: req.body.old_cpf_cnpj, 
                nome: req.body.old_nome,
            },
        });

        if (_func) {
            const body = req.body;
            if ("cpf_cnpj" in body) { _func.cpf_cnpj = body.cpf_cnpj; }
            if ("nome" in body) { _func.nome = body.nome; }
            if ("opcao_pag" in body) { _func.opcao_pag = body.opcao_pag; }
            if ("num_conta" in body) { _func.num_conta = body.num_conta; }
            if ("chave_pix" in body) { _func.chave_pix = body.chave_pix; }
            
            const response = await _func.save();
            if (!response) { return res.status(400).json({message: "Error in update ... "}); }
            return res.send({ message: "Register updated with success ..." });
        }
        res.send({ message: "Register not found ..." });
    }

    async delete(req, res) {
        console.log("Deleting func ...")
        res.send({ message: "not yet implemented" })
    }

    async getOne(req, res) {
        console.log("Getting one employee ... ");
        let queryString = "SELECT * FROM Func WHERE";
        if ("cpf_cnpj" in req.body) { queryString += ` cpf_cnpj='${req.body.cpf_cnpj}' AND`; }
        if ("nome" in req.body) { queryString += ` nome='${req.body.nome}' AND` }
        queryString += ` 1;`;
        console.log(`Printing query message ... \n ${queryString}`)

        const func = await Func.sequelize.query(queryString);
        return res.send({ message: func });
    }

    async getAllFunc( req, res ) {
        console.log("Getting all employees ...");
        const func = await Func.findAll();
        const resp = func.map(obj => obj.dataValues)
        console.log(resp);
        res.send({ message: "Successfully recoverd ... "}); 
    }

    async serv_getOne( req, res ){
        console.log("Getting employee for service ... ");
        const func = await Func.findOne({
            where: { cpf_cnpj: req.body.func, }
        })
        if(!func) { res.send({message: "Employee not finded with this cpf_cpnj .. ."});}
        return func;
    }
}

module.exports = new FuncController()
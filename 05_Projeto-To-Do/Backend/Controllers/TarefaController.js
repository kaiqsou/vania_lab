import Tarefa from "../Models/Tarefa.js";
import { Types } from "mongoose"; // verifica se o parâmetro recebido está no tipo correto

export default class tarefaController{
    static async create(req, res)  // requisição e resposta
    { 
        const {titulo, descricao, dataLimite, situacao} = req.body;

        if (!titulo)
        {
            return res.status(422).json({message: "Preencha o Título"}); // 422 é algo invalido
        }

        if (!descricao)
        {
            return res.status(422).json({message: "Preencha a Descrição"});
        }

        if (!dataLimite)
        {
            return res.status(422).json({message: "Preencha a Data Limite"});
        }

        if (!situacao)
        {
            return res.status(422).json({message: "Preencha a Situação"});
        }

        // criando objeto para o banco inserir
        const tarefa = new Tarefa({
            // titulo: valor - caso esteja de nomes diferentes no req.body
            titulo, 
            descricao,
            dataLimite,
            situacao
        });

        try 
        {
            // inserir tarefa no mongo
            const novaTarefa = await tarefa.save();
            res.status(200).json({message: "Tarefa inserida com sucesso!", novaTarefa});   
        } 
        catch (error) 
        {
            res.status(422).json({message: "Erro ao inserir a tarefa"});
        }
    }
}
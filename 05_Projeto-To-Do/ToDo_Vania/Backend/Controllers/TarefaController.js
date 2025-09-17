import Tarefa from "../Models/Tarefa.js";
import {Types} from "mongoose";

export default class tarefaController{
    static async create(req, res){
        const {titulo, descricao, dataLimite, situacao} = req.body;

        if(!titulo)
        {
            return res.status(422).json({message:"Preencha o Título"});
        
        }
        if(!descricao)
        {
            return res.status(422).json({message:"Preencha a Descrição"});
        
        }
        if(!dataLimite)
        {
            return res.status(422).json({message:"Preencha a data limite"});
        
        }
        if(!situacao)
        {
            return res.status(422).json({message:"Situação é obrigatória"});
        
        }
        const tarefa = new Tarefa({
            titulo,
            descricao,
            dataLimite,
            situacao
        });
        try{
            const novatarefa = await tarefa.save();
            res.status(200).json({message:"Tarefa inserida com sucesso!", novatarefa});
        }
        catch(error){
            res.status(500).json({message:"Problema ao inserir a tarefa",error});
        }
    }//create
    static async remove(req, res){
        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if(!ObjectId.isValid(id))
        {
            return res.status(422).json({message:"Id inválido"});
        }
        try
        {
            const tarefa = await Tarefa.findOne({_id:id});
            if(!tarefa){
                return res.status(404).json({message:"Tarefa não encontrada"});
            }
            await Tarefa.findByIdAndDelete(id);
            res.status(200).json({message:"Tarefa removida com sucesso!!"});
        }
        catch(error){

            res.status(500).json({message:"Problema ao remover a tarefa",error});
        }

    }//fim remove
    static async getAll(req, res){
        try {
            const tarefas = await Tarefa.find({}).sort("-createdAt");
            res.status(200).json({tarefas});
        } catch (error) {
            res.status(500).json({message:"Erro ao buscar todas as tarefas", error});
        }
    }
}//class
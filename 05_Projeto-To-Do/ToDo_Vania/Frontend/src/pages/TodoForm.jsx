import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTodo } from "../api/todoapi";
import Style from "./TodoForm.module.css";

export default function TodoForm()
{
    // criando os Estados [nome - setNome] = useState('tipo')
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataLimite, setDataLimite] = useState("");
    const [situacao, setSituacao] = useState("Pendente");
    const [saving, setSaving] = useState(false);

    // Instância do Navigate
    const navigate = useNavigate();

    // se houver submit, o return será dos valores a seguir, atualizados
    const handleSubmit = async(e) => {
        e.preventDefault(); // previne que recarregue a página ao ter submit
        setSaving(true);

        try 
        {
            // passando os dados do objeto do createTodo (payload)
            await createTodo({titulo, descricao, dataLimite, situacao})
            navigate("/");
        } 
        catch (error) 
        {
            alert("Erro ao criar ToDo: " + (error.Message || "Erro"));
        }
        finally // é executado sempre, independente se o resultado final se deu no try ou no catch 
        {
            setSaving(false);
        }
    } // no onChange, os valores retornados do evento, são usados para dar set como novo valor usando o 'e.target.value'
    return(
        <form onSubmit={handleSubmit} className={Style.formContainer}>
            <div>
                <label className={Style.formLabel}>Título</label>
                <input required value={titulo} className={Style.formInput} onChange={e => setTitulo(e.target.value)}></input>
            </div>

            <div>
                <label className={Style.formLabel}>Descrição</label>
                <textarea required value={descricao} className={Style.formInput} onChange={e => setDescricao(e.target.value)}></textarea>
            </div>

            <div>
                <label className={Style.formLabel}>Data Limite</label>
                <input type="date" required value={dataLimite} className={Style.formInput} onChange={e => setDataLimite(e.target.value)}></input>
            </div>

            <div className="Style.buttonGroup">
                <button disabled={saving} className={Style.buttonPrimary}>
                    {saving ? "Salvando..." : "Salvar"}
                </button>

                <button type="button" className={Style.buttonSecondary} onClick={() => navigate(-1)}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}
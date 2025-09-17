import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"; // por não poder usar <a>, é importado o Link
import {getTodos, deleteTodo} from "../api/todoapi";
import TodoItem from "../components/TodoItem";

export default function TodoList(){
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async()=>{
        try {
            setLoading(true);   
            const res = await getTodos();
            setTodos(res);     
        } catch (error) {
            setError(error.Message || "Erro");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {fetch()}, [])

    const handleDelete = async(id) => {

    }
    return(
        <div>
            <div>
                <h2>Tarefas</h2>
                <Link to="/new">Nova Tarefa</Link>
            </div>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <div>
                {todos?.length === 0 && !loading?(
                    <p>Nenhuma tarefa encontrada</p>) : (todos?.map(todo => ( 
                        <TodoItem key={todo._id} todo={todo} onDelete={() => handleDelete(todo._id)}></TodoItem>
                    )))
                }
            </div>
        </div>
    )
}
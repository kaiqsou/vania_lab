import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000/ToDo",
    headers:{
        "Content-Type":"application/json"
    }
})
export const getTodos = ()=>api.get("/getAll");
export const createTodo = (payload)=>api.post("/Create", payload);
export const deleteTodo = (id)=>api.delete(`/${id}`);

export default api;
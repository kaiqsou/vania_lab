import { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import TodoList from './pages/TodoList';
import TodoForm from './pages/TodoForm';

function App() {
  
  // Será renderizado de acordo com o que é chamado no main, usando as rotas

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-3x1 mx-auto mb-6">
        <nav className="flex items-center justify-between">
          <h1 className="text-2x1 font-semibold">ToDo</h1>
        </nav>
      </header>

      <main className="max-w-3x1 mx-auto bg-white rounded-lg shadow p-6">

      <Routes>
        
        <Route path="/" element={<TodoList/>}></Route>
        <Route path="/new" element={<TodoForm/>}></Route>
      
      </Routes>
      
      </main>

    </div>
  )
}

export default App
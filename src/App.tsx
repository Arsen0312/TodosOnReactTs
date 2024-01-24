import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TodoListPages } from './pages';
import ThemeButton from "./Theme/ThemeFn/ThemeButton";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/todo-list" element={<TodoListPages/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { Route, Routes } from 'react-router-dom';

import { Todo } from './components/Todo'

export const TodoRoutes = () => {
    return (
        <Routes>
            <Route path='/todoApp' element={<Todo/>}/>
        </Routes>
    );
};
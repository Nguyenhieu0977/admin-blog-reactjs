import './App.css';
import './css/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoutes from './layouts/PrivateRoutes';
import PublicRoutes from './layouts/PublicRoutes';
import Layout from './layouts/Layout';
import UserList from './components/user/UserList';
import UserAdd from './components/user/UserAdd';
import UserUpdate from './components/user/UserUpdate';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import PostList from './components/post/PostList';
import PostAdd from './components/post/PostAdd';
import PostUpdate from './components/post/PostUpdate';
import CategoryList from './components/category/CategoryList';
import CategoryAdd from './components/category/CategoryAdd';
import CategoryUpdate from './components/category/CategoryUpdate';



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      
        <Route element={<Main />}>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/users/add' element={<UserAdd/>} />
            <Route path='/users/edit/:id' element={<UserUpdate/>}/>
            <Route path='/posts' element={<PostList />} />
            <Route path='/posts/add' element={<PostAdd/>} />
            <Route path='/post/edit/:id' element={<PostUpdate/>}/>
            <Route path='/categories' element={<CategoryList />} />
            <Route path='/categories/add' element={<CategoryAdd />} />
            <Route path='/categories/edit/:id' element={<CategoryUpdate/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Route>
        
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

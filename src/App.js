import './App.sass';
import React from "react";
import {Login} from "./pages/Auth/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Wrapper} from "./components/Wrapper";
import {Blog} from "./pages/Blog/Blog";
import {Page404} from "./pages/Page404/Page404";
import {Favorites} from "./pages/Favorites/Favorites";
import {PostPage} from "./pages/Blog/PostPage/PostPage";
import {Home} from "./pages/Home/Home";
import {EditPost} from "./pages/MyPosts/EditPost/EditPost";
import {CreatePost} from "./pages/MyPosts/CreatePost/CreatePost";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "./store/slices/auth";
import {Search} from "./pages/Searсh/Search";
import {Account} from "./pages/Account/Account";
import {MyPosts} from "./pages/MyPosts/MyPosts";
import {Registration} from "./pages/Auth/Registration/Registration";

function App() {
  let isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="App">
      <Routes>
        {/* Публичные страницы c Сайдбаром */}
        <Route path="/" element={
          <Wrapper />
        }>
          <Route index path="/" element={<Home />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/blog" /> : <Login />
          } />
          <Route path="/registration" element={
            isLoggedIn ? <Navigate to="/blog" /> : <Registration />
          } />
          <Route path="/search" element={<Search />}/>
          <Route path="blog" element={<Blog />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="favorites" element={<Favorites /> }/>
        </Route>


        {/* Приватные страницы c Сайдбаром */}
        <Route path="/" element={
          isLoggedIn ?
            <Wrapper /> :
            <Navigate to="/login" />
        }>
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="post/:id/edit" element={<EditPost />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="account" element={<Account /> }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
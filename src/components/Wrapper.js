import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

export const Wrapper = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <Outlet/>
      </Main>
    </>
  )
}
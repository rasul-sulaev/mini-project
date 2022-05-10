import logo from "../../logo.svg";

export const Preloader = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <div className="preloader">
          <img src={logo} alt=""/>
          <p className="title">Loading...</p>
        </div>
      ) : children }
    </>
  )
}
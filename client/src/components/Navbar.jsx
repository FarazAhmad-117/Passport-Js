import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  useEffect(() => {
    console.log("Here is user", user);
  }, []);

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Lama App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src={user.avatar} alt="" className="avatar" />
          </li>
          <li className="listItem">{user.username}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;

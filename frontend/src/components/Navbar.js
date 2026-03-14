import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div style={{
      background: "#222",
      padding: "15px",
      display: "flex",
      justifyContent: "center",
      gap: "40px"
    }}>

      <Link style={{color:"white", textDecoration:"none"}} to="/">
        Write Journal
      </Link>

      <Link style={{color:"white", textDecoration:"none"}} to="/history">
        History
      </Link>

      <Link style={{color:"white", textDecoration:"none"}} to="/insights">
        Insights
      </Link>

    </div>

  );

}

export default Navbar;
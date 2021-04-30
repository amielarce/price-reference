import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Price Reference</h1>
    </header>
  );
}

const headerStyle = {
  background: "#3f51b5",
  color: "#fff",
  textAlign: "center",
  padding: "3px",
  fontSize: "10px",
  marginBottom: "2px"
};

export default Header;

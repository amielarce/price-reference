import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Price Reference</h1>
    </header>
  );
}

const headerStyle = {
  background: "#fff",
  color: "#333",
  textAlign: "center",
  padding: "3px",
  fontSize: "10px",
};

export default Header;

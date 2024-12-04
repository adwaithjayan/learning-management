import React from "react";

const Header = ({ title, subtitle, rightElement }: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </header>
  );
};
export default Header;

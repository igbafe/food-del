import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favotites food here</h2>
        <p>
          Choose from diverse menu featuring a delectable array of dishes to
          crafted with the finest of ingredents and culinary expertise. Our
          mission is to staisfy your cravings and elevate your dining experince,
          one delicious meal at a time
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;

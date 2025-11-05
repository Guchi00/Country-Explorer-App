import "./CountryDetails.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const CountryDetails = () => {
  return (
    <div className="container">
      <Link to={`/`} className="header">
        <ArrowLeftOutlined />
        <h4>back to home page</h4>
      </Link>
      <div className="flag_and_countryname">
        <img />
        <h1>Name Example: France</h1>
      </div>
      <div className="country_details">
        <h5>Region</h5>
        <h5>Europe</h5>
      </div>
      <div className="borders">
        <h1>Borders</h1>
        <div className="borders_name">
          <Link to="country" className="country">
            germanu
          </Link>
          <Link to="" className="country">
            mali
          </Link>
          <Link to="" className="country">
            nigerias
          </Link>
        </div>
      </div>
    </div>
  );
};

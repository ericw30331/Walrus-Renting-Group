import "./navbar.css";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/usercontext";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import ListProperty from "./ListProperty";
import { useFormData } from "../Context/formdatacontext";
import { state, useFilter } from "../Context/filtercontext";

function Nav() {
  const [locationFilter, setLocationFilter] = useState("");
  const [bathFilter, setBathFilter] = useState();
  const [bedFilter, setBedFilter] = useState();
  const { user, setUser } = useContext(UserContext);
  const { dispatch } = useFormData();
  const { dispatchFilter } = useFilter();
  const userEmail = user?.email;

  //MinMax Popup
  const [isMinMaxPopupOpen, setMinMaxPopupOpen] = useState(false);
  const [minPriceFilter, setMinPriceFilter] = useState();
  const [maxPriceFilter, setMaxPriceFilter] = useState();
  const maxDigits = 5;

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    setUser(null);
  }

  const handleFilterChange = (filterName, value) => {
    dispatchFilter({ type: "SET_FILTER", payload: { filterName, value } });
    closeMinMaxPopup();
  };

  const handleButtonClick = () => {
    handleFilterChange("location", locationFilter);
    handleFilterChange("bath", bathFilter);
    handleFilterChange("bed", bedFilter);
    handleFilterChange("minPrice", minPriceFilter);
    handleFilterChange("maxPrice", maxPriceFilter);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  const openMinMaxPopup = () => {
    setMinMaxPopupOpen(true);
  };

  const closeMinMaxPopup = () => {
    setMinMaxPopupOpen(false);
  };

  return (
    <div className="div">
      <div className="div-2">
        <div className="div-3">
          <div className="div-4">
            <Link to="/">
              <img
                class="group-6-T94"
                src={logo}
                alt={logo}
                id="I141:2772;1:110"
              />
            </Link>
          </div>
          <div className="div-100">
            <div className="div-8">
              <div className="div-9">
                <div className="div-10">
                  <div className="div-11">Where</div>
                  <input
                    className="div-12"
                    type="text"
                    placeholder="Find your new home..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    onKeyDown={handleEnterPress}
                  />
                </div>
                <div className="div-13">
                  <div className="div-14" />
                  <div className="div-15">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/af350dc6-a591-468c-baa3-e3642d76bc54?"
                      className="img-2"
                    />
                    <input
                      type="number"
                      placeholder="Baths..."
                      value={bathFilter}
                      onChange={(e) => setBathFilter(e.target.value)}
                      onKeyDown={handleEnterPress}
                      className="number-input"
                    />
                  </div>
                </div>
                <div className="div-17">
                  <div className="div-18">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c2377dc-9136-4549-84c6-158a8f299819?"
                      className="img-3"
                    />
                    <input
                      type="number"
                      placeholder="Beds..."
                      value={bedFilter}
                      onChange={(e) => setBedFilter(e.target.value)}
                      onKeyDown={handleEnterPress}
                      className="number-input"
                    />
                  </div>
                  <div className="div-20" />
                  <button className="div-21" onMouseEnter={openMinMaxPopup}>
                    <div className="div-22">Price Range</div>
                    <div className="div-23">
                      {minPriceFilter ? "$" + minPriceFilter : "Min"} -{" "}
                      {maxPriceFilter ? "$" + maxPriceFilter : "Max"}
                    </div>
                  </button>
                </div>
              </div>
              <button onClick={handleButtonClick}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c1d4bb4-e80e-4e78-8391-79dc5e262a64?"
                  className="img-4"
                />
              </button>
            </div>
            <div className="div-108">
              {isMinMaxPopupOpen && (
                <div className="div-101" onMouseLeave={closeMinMaxPopup}>
                  <div className="div-102">
                    <div className="div-103">Min Price</div>
                    <label className="label-style">
                      $
                      <input
                        className="number-input"
                        placeholder="10"
                        type="number"
                        value={minPriceFilter}
                        onChange={(e) =>
                          setMinPriceFilter(e.target.value.slice(0, maxDigits))
                        }
                        onKeyDown={handleEnterPress}
                      />
                    </label>
                  </div>
                  <div className="div-105">
                    <div className="div-106">Max Price</div>
                    <label className="label-style">
                      $
                      <input
                        className="number-input"
                        placeholder="4000"
                        type="number"
                        value={maxPriceFilter}
                        onChange={(e) =>
                          setMaxPriceFilter(e.target.value.slice(0, maxDigits))
                        }
                        onKeyDown={handleEnterPress}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="div-24">
            {userEmail && (
              <>
                <Link to={`/UserProfile/${userEmail}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef4d5567-e4d6-40e8-9039-f16f190f3684?"
                    className="img-5"
                  />
                </Link>
                <Link to={`/UserProfile/${userEmail}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/248ce8f4-51d8-4320-a68c-8957a496b0bd?"
                    className="img-6"
                  />
                </Link>
                <Link to={`/UserProfile/${userEmail}`}>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/97d36e33-6f9a-4165-916f-a11683446465?"
                    className="img-7"
                  />
                </Link>
              </>
            )}
            <div className="div-25">
              {userEmail && (
                <Link to="/">
                  <div onClick={handleLogout}>Logout</div>
                </Link>
              )}
              {!userEmail && (
                <Link to="/Login">
                  <div>Login</div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="div-26">Additional Filters</div>
      </div>
    </div>
  );
}
export default Nav;
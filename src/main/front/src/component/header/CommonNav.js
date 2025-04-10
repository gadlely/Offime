import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/common.css";
import "../../css/layout.css";
import useCount from "../notification/hooks/useCount";
import useSelectTitle from "./utils/useSelectTitle";
import { useEffect } from "react";
import BackButton from "./BackButton";
import NotificationIcon from "./NotificationIcon";
import homeImage from "./image/home.png";
import listImage from "./image/list.png";
const CommonNav = (messages) => {
  const location = useLocation();
  const navigate = useNavigate();
  const count = useCount(messages);
  const isMainPage = location.pathname === "/" || location.pathname === "/home";
  const isVacationPage = location.pathname === "/vacation";
  const title = useSelectTitle(location);
  const handleListPage = () => {
    navigate("/vacationList");
  };
  useEffect(() => {}, [count]);

  return (
      <header>
        <nav
          className="bg_wt item mt_md"
        >
            <div className="back-area">
              {!isMainPage && <BackButton />}
              <h4>
                {title}
              </h4>
            </div>
            <div className="btn-box">
              {isVacationPage && (
                <button
                  className="home-icon"
                  onClick={handleListPage}
                >
                  <img
                    src={listImage}
                    alt="목록"
                  />
                </button>
              )}
              <button
                className="home-icon"
                onClick={() => navigate("/")}
              >
                <img
                  src={homeImage}
                  alt="홈"
                />
              </button>
              <NotificationIcon count={count} />
            </div>
        </nav>
      </header>
  );
};

export default CommonNav;

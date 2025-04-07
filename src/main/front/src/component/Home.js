import {Link} from "react-router-dom";
import ExpensesCount from "./expense/ExpensesCount ";
import "../css/main.css";
import Menu from "./member/pages/Menu";
import {useState} from "react";
import AttendanceBanner from "./attendance/AttendanceBanner";



function Home() {

    const [selected, setSelected] = useState("home");

    return (
        <>
            {selected == "menu" ? <Menu/> : (
                <div className={"item mlr-a"}>
                    <Link to={"/templates/list"}>
                        <button className={" main-btn"}>
                            <img src={"/image/main/template.png"} className={"main-img"}/>
                            템플릿
                        </button>
                    </Link>
                    <Link to={"/reports/read"}>
                        <button className={"main-btn"}>
                            <img src={"/image/main/report.png"} className={"main-img"}/>
                            보고서
                        </button>
                    </Link>
                    {/*<Link to={"/attendance/manager"}>*/}
                    {/*    <button className={"main-btn"}>*/}
                    {/*        <img src={"/image/report/backArrow.png"} className={"main-img"}/>*/}
                    {/*        출퇴근*/}
                    {/*    </button>*/}
                    {/*</Link>*/}
                    <Link to={"/vacation"}>
                        <button className={"main-btn"}>
                            <img src={"/image/main/vacation.png"} className={"main-img"}/>
                            휴가
                        </button>
                    </Link>
                    <Link to={"/attendanceManagerForEmployee"}>

                        <button className={"main-btn"}>
                            <img src={"/image/report/backArrow.png"} className={"main-img"}/>
                            내 근태이력
                        </button>
                    </Link>
                    <Link to={"/attendanceManagerForLeader"}>
                        <button className={"main-btn"}>
                            <img src={"/image/report/backArrow.png"} className={"main-img"}/>
                            출퇴근 현황
                        </button>
                    </Link>
                    <div className="mb_md">
                        <AttendanceBanner/>
                    </div>
                    <ExpensesCount/>
                </div>
            )}

                <div className={"bottom-menu"}>
                    <div onClick={() => setSelected("home")} className={`${selected === "home" && "active"}`}>
                        <img src={"/image/main/home.png"}/>
                        <span>홈</span>
                    </div>
                    <div>
                    <img src={"/image/icon_write.svg"}/>
                    <span>홈</span>
                </div>
                <div onClick={() => setSelected("menu")} className={`${selected === "menu" && "active"}`}>
                    <img src={"/image/main/menu.png"}/>
                    <span>메뉴</span>
                </div>
            </div>
        </>
    )
        ;
}

export default Home;


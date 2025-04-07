import { Link } from "react-router-dom";
import ExpensesCount from "./expense/ExpensesCount ";
import AttendanceBanner from "./attendance/AttendanceBanner";

function Home() {
  return (
    <>
      <h1>Check</h1>
      <AttendanceBanner />
      <div className={"item mlr-a"}>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/templates/create"}>템플릿 만들기</Link>
        </button>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/templates/list"}>템플릿 리스트</Link>
        </button>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/reports/templateList"}>보고서 만들기</Link>
        </button>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/reports/read"}>보고서 리스트</Link>
        </button>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/attendanceManagerForEmployee"}>내 근태이력</Link>
        </button>
                <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/attendanceManagerForLeader"}>출퇴근 현황</Link>
        </button>
        <button className={"btn btn-lg btn-pm mb_md mlr-a"}>
          <Link to={"/vacation"}>휴가</Link>
        </button>
        <div className="mb_md">
          <AttendanceBanner />
        </div>
        <ExpensesCount />
      </div>
    </>
  );
}
export default Home;

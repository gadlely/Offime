import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/common.css";
import "../../css/reset.css";
import "../../css/expense.css";

const ExpensesCount = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState("");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("CL_access_token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/");
      return;
    }

    if (role !== "ADMIN") {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(true);

    const fetchCounts = async () => {
      try {
        const pendingResponse = await fetch(
          "http://localhost:8080/api/expenses/pending/count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();
          setPendingCount(pendingData.count);
        } else {
          setError("대기중인 경비 수를 가져오는 데 실패했습니다.");
        }

        const rejectedResponse = await fetch(
          "http://localhost:8080/api/expenses/rejected/count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (rejectedResponse.ok) {
          const rejectedData = await rejectedResponse.json();
          setRejectedCount(rejectedData.count);
        } else {
          setError("거절된 경비 수를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        setError("오류 발생: " + error.message);
      }
    };

    fetchCounts();
  }, [navigate]);

  const handleContainerClick = () => {
    navigate("/expenseList");
  };

  if (!isAdmin) return null;

  return (
      <div id="expense" style={{cursor:"pointer"}}>
        <div className="item bg_wt flex " onClick={handleContainerClick}>
          <h3 className="ml_xlg mr_lg">경비 관리</h3>
          <h3 className="tc-pm ml_xlg pl_xlg ">{pendingCount}</h3>
          <h3 className="tc-p5 pl_xlg">{rejectedCount}</h3>
        </div>
      </div>
  );
};

export default ExpensesCount;

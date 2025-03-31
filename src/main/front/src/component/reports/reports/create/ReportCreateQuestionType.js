import ReportCreateOptionBlock from "./ReportCreateOptionBlock";
import {useEffect, useState} from "react";

function ReportCreateQuestionType({type, questionId, setResponseData}) {

    const [timeRange, setTimeRange] = useState({startTime: "", endTime: ""});
    const [dateRange, setDateRange] = useState({startDate: "", endDate: ""});

    useEffect(() => {
        if (!timeRange) return

        console.log(timeRange);

        updateAnswer(questionId, "TIME_RANGE", timeRange);
    }, [timeRange]);

    useEffect(() => {
        if (!dateRange) return
        console.log(dateRange);

        updateAnswer(questionId, "DATE_RANGE", dateRange);
    }, [dateRange]);

    const updateAnswer = (questionId, type, value) => {
        setResponseData((prev) => {
            const exists = prev.find((r) => r.questionId === questionId);
            if(type === "TEXT" || type === "CHOICE") {
                if (exists) {
                    // 이미 있으면 수정
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, answerText: value} : r
                    );
                } else {
                    // 없으면 추가
                    return [...prev, {questionId, answerText: value}];
                }
            } else if (type === "TIME") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startTime: value} : r
                    );
                } else {
                    return [...prev, {questionId, startTime: value}];
                }
            } else if(type === "DATETIME") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startDate: value} : r
                    );
                } else {
                    return [...prev, {questionId, startDate: value}];
                }
            } else if(type === "TIME_RANGE") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startTime: value.startTime, endTime: value.endTime} : r
                    );
                } else {
                    return [...prev, {questionId, startTime: value.startTime, endTime: value.endTime}];
                }
            } else if(type === "DATE_RANGE") {
                if (exists) {
                    return prev.map((r) =>
                        r.questionId === questionId ? {...r, startDate: value.startDate, endDate: value.endDate} : r
                    );
                } else {
                    return [...prev, {questionId, startDate: value.startDate, endDate: value.endDate}];
                }
            }
        });
    };

    switch (type) {
        case "TEXT" :
            return <input className={"mlr-a input-txt mt_md input-max"} type={"text"} placeholder={"입력"}
                          onChange={(e) => updateAnswer(questionId, type, e.target.value)}/>
        case "CHOICE" :
            return (
                <div>
                    <ReportCreateOptionBlock type={"radio"} questionId={questionId} updateAnswer={updateAnswer}/>
                </div>
            )
        case "TIME" :
            return <input type={"time"} onChange={(e) => updateAnswer(questionId, type, e.target.value)}/>
        case "TIME_RANGE" :
            return <>
                <input type={"time"} onChange={(e) => setTimeRange({...timeRange, startTime: e.target.value})}/>
                ~
                <input type={"time"} onChange={(e) => setTimeRange({...timeRange, endTime: e.target.value})}/>
            </>
        case "DATETIME" :
            return <input type={"date"} onChange={(e) => updateAnswer(questionId, type, e.target.value)}/>
        case "DATE_RANGE" :
            return <>
                <input type={"date"} onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}/>
                ~
                <input type={"date"} onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}/>
            </>
        case "EMPLOYEE_SELECT" :
            return
        case "IMAGE" :
            return <input type={"file"} />
        case "FILE" :
            return <input type={"file"}/>
        case "SECTION" :
            return <hr className={"mt_lg mb_lg"}/>
    }


}

export default ReportCreateQuestionType
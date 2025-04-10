const useSelectTitle = (location) => {
  const locationPath = location.pathname;

  switch (true) {
    // case locationPath.startsWith("/profile"):
    //   return "프로필";
    // case locationPath.startsWith("/settings"):
    //   return "설정";
    case locationPath.startsWith("/member/signUpStatus"):
      return "가입승인";
    case locationPath.startsWith("/member/"):
      return "프로필";
    case locationPath.startsWith("/member"):
      return "구성원";
    case locationPath.startsWith("/menu"):
      return "메뉴";

    case locationPath.startsWith("/templates/list"):
      return "템플릿 목록";
    case locationPath.startsWith("/templates/create"):
      return "템플릿 작성";
    case locationPath.startsWith("/reports/templateList"):
      return "보고서 목록";
    case locationPath.startsWith("/reports/create/:templateId"):
      return "보고서 상세";
    case locationPath.startsWith("/replies/:reportId"):
      return "";
    case locationPath.startsWith("/reports/update/:reportId"):
      return "";
    case locationPath.startsWith("/templates/detail/"):
      return "보고서 상세";

    case locationPath.startsWith("/schedule/"):
      return "스케줄";

    case locationPath.startsWith("/expenseDetail/"):
      return "경비관리 상세";
    case locationPath.startsWith("/expenseList"):
      return "경비관리 목록";
    case locationPath.startsWith("/expenseWrite"):
      return "경비관리 작성";
    case locationPath.startsWith("/expenseUpdate/"):
      return "경비관리 수정";
    case locationPath.startsWith("/approved-expenses"):
      return "승인 경비내역";
    case locationPath.startsWith("/chatbot"):
      return "AI";

    case locationPath.startsWith("/attendanceManagerForEmployee"):
      return "메인 페이지";
    case locationPath.startsWith("/attendanceManagerForLeader"):
      return "메인 페이지";

    case locationPath.startsWith("/notification"):
      return "알림 메시지";
    case locationPath.startsWith("/vacation"):
      return "휴가";
    default:
      return "메인 페이지";
  }
};

export default useSelectTitle;

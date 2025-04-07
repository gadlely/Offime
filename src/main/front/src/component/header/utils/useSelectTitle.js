const useSelectTitle = (location) => {
  const locationPath = location.pathname;

  switch (true) {
    case locationPath.startsWith("/notification"):
      return "알림 메시지";
    case locationPath.startsWith("/vacation"):
      return "휴가";
    // case locationPath.startsWith("/profile"):
    //   return "프로필";
    // case locationPath.startsWith("/settings"):
    //   return "설정";
    case locationPath.startsWith("/expenseDetail/"):
      return "경비관리 상세";
    case locationPath.startsWith("/expenseList"):
      return "경비관리 목록";
    case locationPath.startsWith("/expenseWrite"):
      return "경비관리 작성";
    case locationPath.startsWith("/expenseUpdate/"):
      return "경비관리 수정";
    case locationPath.startsWith("/chatbot"):
      return "AI";
    default:
      return "메인 페이지";
  }
};

export default useSelectTitle;

const vi = {
  header: {
    dashboard: "Trang chủ",
    eventRegister: "Tạo sự kiện",
    eventList: "Danh sách sự kiện",
    index: "Tham gia sự kiện",
    setting: "Cài đặt tài khoản",
    logout: "Đăng xuất",
  },
  index: {
    title: "Mã pin sự kiện",
    inputHolder: "Mã pin",
    buttonContent: "Tham gia",
    lineContent: "hoặc",
    titleReturn: "Quay lại trang chủ?",
    waylogLogin: {
      action: "Đăng nhập",
      title: "để quản lý sự kiện?",
    },
    waylogRegister: {
      action: "Đăng ký",
      title: "để tạo tài khoản?",
    },
    QrButton: "Quét mã QR",
  },
  login: {
    heading: "Đăng nhập",
    username: "Tên đăng nhập/email",
    password: "Mật khẩu",
    rememberLogin: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    google: "Đăng nhập bằng",
    or: "hoặc",
    noAccount: "Chưa có tài khoản?",
    register: "Đăng kí ngay",
  },
  register: {
    heading: "Đăng kí",
    username: "Tên đăng nhập",
    password: "Mật khẩu",
    confirmPassword: "Nhập lại mật khẩu",
    policy: {
      read: "Tôi đã đọc và đồng ý với các",
      rules: "điều khoản và điều kiện",
    },
    or: "hoặc",
    google: "Đăng kí với",
    hasAccount: "Đã có tài khoản?",
    login: "Đăng nhập luôn!",
    belowPassword: "Mật khẩu phía trên"

  },
  dashboard: {
    welcome: {
      title: "Chào mừng đến AIT Lucky App!",
      content: "hãy bắt đầu chơi các sự kiện ngay nào!",
    },
    joinEvent: {
      title: "Tham gia sự kiện",
      description: "Tham gia vào các sự kiện được tổ chức bằng mã pin.",
      buttonContent: "CHƠI VỚI MÃ PIN",
    },
    showCurrentEvent: {
      title: "Các sự kiện đang diễn ra",
      description: "Hiển thị các sự kiện đang diễn ra của tôi.",
      checklength: "Không có dữ liệu",
    },
    createEvent: {
      title: "Tạo sự kiện",
      description:
        "Tạo một sự kiện quay thưởng mới, bạn có thể thiết lập các giải thưởng, mỗi giải thưởng gồm tên, khái quát, hình ảnh giải thưởng, số lượng giải.",
      buttonContent: "TẠO SỰ KIỆN NGAY",
    },
    showCreateEvent: {
      title: "Danh sách sự kiện",
      description: "Hiển thị các sự kiện gần đây của tôi đã tạo",
      checklength: "Không có dữ liệu",
      buttonContent: "Tất cả sự kiện",
    },
  },
  eventRegister: {
    heading: "Đăng ký",
    subHeading: "thông tin sự kiện",
    eventName: "Tên sự kiện",
    eventDescription: "Mô tả sự kiện",
    maxTicket: "Giới hạn người tham gia",
    publicFlag: "Cho phép người tham gia không cần đăng nhập",
    buttonContent: "Tiếp tục",
    event: "sự kiện"
  },
  rewardRegister: {
    addGift: "Thêm phần quà",
    registerEvent: "Đăng ký sự kiện",
    nameGift: "Tên giải thưởng",
    gift: "Phần thưởng"
  },
  reward: {
    rewardName: "Tên giải thưởng",
    quantity: "Số lượng",
    addImages: "Thêm hình ảnh",
    awardImages: "Hình ảnh giải thưởng",
  },
  editEventRewardRegister: {
    rewardName: "Tên giải thưởng",
    eventName: "Tên sự kiện",
    eventDescription: "Mô tả sự kiện",
    maxTicket: "Giới hạn người tham gia",
    publicFlag: "Cho phép người tham gia không cần đăng nhập",
    addReward: "Thêm giải thưởng",
    addGift: "Thêm phần quà",
    adjust: "Điều chỉnh",
  },
  eventResult: {
    prizeInfo: "Thông tin giải thưởng",
    participantList: "Danh sách người chơi",
    participant: "Số người tham gia: ",
    exit: "Thoát"
  },
  playerDetail: {
    cancelReward: "Hủy giải thưởng",
    givenTo: "đã được trao cho",
    confirmedCancel: "Xác nhận hủy giải?",
    yes: "Có",
    no: "Không",
    inviteAttendees: "Mời người tham dự",
    leavingEvent: "rời khỏi sự kiện?",
    confirm: "Xác nhận?",
    allowAttendees: "Cho phép người tham dự",
    returnEvent: "trở lại sự kiện?",
    banned: "Cấm tham gia",
    allowed: "Cho phép tham gia",
    reward: "Giải thưởng",
    none: "Không có"
  },
  eventList: {
    heading: "danh sách sự kiện",
    searchContent: {
      title: "Tên sự kiện",
      checklength: "Danh sách trống",
    },
    eventButton: {
      participant: "người tham gia: ",
    },
  },
  countdown: {
    pincode: "mã pin sự kiện",
    participant: "Số người tham gia",
    player: "người chơi",
    createQR: "TẠO MÃ QR",
    startButton: "BẮT ĐẦU",
    startAfter: "bắt đầu sau ...",
    prizeInfo: "thông tin giải thưởng",
    participantList: "danh sách người chơi",
  },
  eventDetail: {
    id: "Mã sự kiện",
    eventInfo: "thông tin giải thưởng",
    timeCheckin: "thời gian check in",
    min: "phút",
    startButton: "BẮT ĐẦU",
  },
  rewardList: {
    arlert: "Có lỗi trong mở khung hiển thị hình ảnh!",
    amountRemain: "Số lượng còn lại: ",
    amount: "Số lượng: ",
    winner: "Người trúng thưởng",
  },
  setting: {
    heading: "Thông tin cá nhân",
    title: "Tên đăng nhập",
    buttonSave: "Lưu",
    buttonChangePW: "Đổi mật khẩu",
    title2: "tên đăng nhập",
  },
  loading: {
    loading: "đang tải",
  },
  forgotPassword: {
    heading: "quên mật khẩu",
    username: "Tên đăng nhập",
    send: "gửi",
    backLogin: "Quay lại trang Đăng nhập",
    newPassword: "Mật khẩu mới",
    confirmPassword: "Xác nhận mật khẩu",
    againPassword:"Nhập lại mật khẩu"
    
  },
  changePassword: {
    heading: "đổi mật khẩu",
    username: "Tên đăng nhập",
    currPass: "Mật khẩu hiện tại",
    save: "lưu",
    newPassword: "Mật khẩu mới",
    confirmPassword: "Xác nhận mật khẩu",
    currPass2: "mật khẩu hiện tại",
    newPassword2: "mật khẩu mới",
    rePassword: "nhập lại mật khẩu"
  },

  luckySpin: {
    title: "VÒNG QUAY MAY MẮN",
    onlPlayer: "Số người trực tuyến",
    player: "Số người quay thưởng",
    curentReward: "giải thưởng hiện tại",
    none: "KHÔNG CÓ",
    remain: "Còn lại",
    min: "Giây",
    numberRemain: "Số lượng còn lại: ",
    timeAnimation: "Thời gian animation:",
    spinButton: "QUAY THƯỞNG",
    endButton: "KẾT THÚC SỰ KIỆN",
    notiEnd1: "Bạn có chắc chắn muốn",
    notiEnd2: "kết thúc",
    notiEnd3: "sự kiện?",
    yesButton: "CÓ",
    noButton: "KHÔNG",
    confirmButton: "XÁC NHẬN",
    cancelButton:"HỦY",
    rewardReceive1: "sẽ nhận được giải:",
    rewardReceive2: "Xác nhận trao giải?",
    exitButton: "THOÁT",
    ban1:"Bạn đã bị cấm khỏi sự kiện",
    ban2: "bởi người điều hành",
    exit1:"Bạn có chắc chắn muốn ",
    exit2: "thoát",
    waitingSpin: "Đang chờ quay thưởng ...",
    waitingReward: "Đang chờ xác nhận trao giải ...",
    adminConfirm:"Chủ sự kiện đã xác nhận trao giải!",
    adminCancel:"Chủ sự kiện đã hủy trao giải",
  },
  curentEventDetail: {
    title: "THÔNG TIN SỰ KIỆN",
    reward: "THÔNG TIN GIẢI THƯỞNG",
    player: "THÔNG TIN NGƯỜI CHƠI",

  }

};

export default vi;

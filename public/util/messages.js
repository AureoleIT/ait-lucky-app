
//Message thông tin cảnh báo
export const messagesSuccess = {
    I0001: "Đăng ký dữ liệu thành công",
    I0002: "Cập nhật dữ liệu thành công",
    I0003: "Xóa dữ liệu thành công",
    I0004: "Tải file thành công",
    I0005: "Thêm dữ liệu thành công",
    I0006: (a) => { return "Tạo " + a + " thành công " },
}

//Message lỗi
export const messagesError = {
    E0001: (a) => { return "Hạng mục " + a + "bắt buộc nhập" },
    E0002: (a, b) => { return "Vui lòng nhập hạng mục " + a + "có độ dài lớn hơn hoặc bằng " + b },
    E0003: (a) => { return "Hạng mục " + a + "nhập sai định dạng" },
    E0021: (a, b) => { return "Vui lòng nhập hạng mục " + a + "giống với hạng mục " + b },
    E0022: "Tải file thất bại",
    E1001: "Đăng ký dữ liệu thất bại",
    E1002: "Cập nhật dữ liệu thất bại",
    E1003: "Xóa dữ liệu thất bại",
    E2004: "Mã pin sai, vui lòng nhập lại mã pin",
    E2021: "Không thể quét được mã, vui lòng quét lại mã QR",
}
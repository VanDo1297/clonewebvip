export const validations = (name, value) => {
  if (name === "fullName") {
    if(!value){
      return "(*) Họ và tên không được để trống";
    }if(/^[ \s]+|[ \s]+$/.test(value)){
      return "Vui xóa khoảng trắng thừa!"
    }
    
  }
  if (name === "identity_card_number") {
    if (!value) {
      return "(*) Chứng minh nhân dân không được để trống";
    }
    if (!/^[0-9]+$/.test(value)) {
      return "(*) Định dạng chứng minh không đúng! Vui lòng nhập lại";
    }
    if(Object.entries(value).length < 9 || Object.entries(value).length > 13){
      return "(*) Số CMND phải có ít nhất 9 chữ số"
    }
  }
  // if (name === "phoneNumber") {
  //   if (!/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(value)) {
  //     return "(*) Định dạng số điện thoại không đúng! Vui lòng nhập lại";
  //   }
  // }
  if(name === "code"){
    if(!value){
      return "Vui lòng nhập mã thẻ hoặc mã bệnh nhân"
    }
    if(!/^[0-9]+$/.test(value)){
      return "Vui lòng chỉ nhập số"
    }
    if(Object.entries(value).length < 9){
      return "Mã bệnh nhân hoặc mã thẻ có ít nhất 9 chữ số"
    }
  }
}
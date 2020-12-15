export const valiadationVCB = (name, value) => {
  if (name === "patient_code") {
    return value ? "" : "Mã bệnh nhân không được để trống!";
  }
  if (name === "hospital_code") {
    return value ? "" : "Vui lòng chọn bệnh viện";
  }
};

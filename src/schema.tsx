import * as yup from "yup";

export const passwordCheckSchema = yup.object({
  newPassword: yup
    .string()
    .required("새로운 비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8~12자리여야 합니다.")
    .max(12, "비밀번호는 8~12자리여야 합니다."),
  newPasswordCheck: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "새로 입력하신 비밀번호와 일치하지 않습니다."
    ),
});

export const reauthenticateSchema = yup.object({
  password: yup.string().required("현재 비밀번호를 입력해주세요."),
});

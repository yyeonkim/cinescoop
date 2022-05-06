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

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const joinSchema = yup.object({
  username: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .min(2, "두 글자 이상 입력해주세요."),
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .matches(emailRegex, "이메일 형식이 옳지 않습니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8~12자리여야 합니다.")
    .max(12, "비밀번호는 8~12자리여야 합니다."),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "입력하신 비밀번호와 일치하지 않습니다."),
});

export const emailScehma = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .matches(emailRegex, "이메일 형식이 옳지 않습니다."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

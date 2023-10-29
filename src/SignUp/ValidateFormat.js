function UserNNicknameTest(str) {
  const regexp = new RegExp(/^[ 가-힣a-zA-Z-]+$/);
  return regexp.test(str);
} //이름 형식 체크

export const BirthdateTest = str => {
  //?나중에 완성 단계에서 현실적인 생일 날짜를 고려하여 검증하기?
  // const regex0 = /20[0-2][0-9]0[1-9]0[1-9]/;
  // const regex1 = /20[0-2][0-9]0[1-9][1-2][1-9]/;
  // const regex3 = /20[0-2][0-9]0[1-9]3[0-1]/;
  // const regex4 = /20[0-2][0-9]1[0-2]0[1-9]/;
  // const regex5 = /20[0-2][0-9]1[0-2][1-2][1-9]/;
  // const regex6 = /20[0-2][0-9]1[0-2]3[0-1]/;
  // const regex7 = /19[0-9][0-9]0[1-9]0[1-9]/;
  // const regex8 = /19[0-9][0-9]0[1-9][1-2][1-9]/;
  // const regex9 = /19[0-9][0-9]0[1-9]3[0-1]/;
  // const regex10 = /19[0-9][0-9]+-1[0-2]0[1-9]/;
  // const regex11 = /19[0-9][0-9]+-1[0-2][1-2][1-9]/;
  // const regex12 = /19[0-9][0-9]+-1[0-2]3[0-1]/;
  const regex = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;

  if (!str.test(regex)) return '';
  else if (str.test(regex)) return str;
}; //생년월일 형식 체크

export const EmailTest = str => {
  const regex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (!str.test(regex)) return '';
  else if (str.test(regex)) return str;
}; //이메일 형식 체크

export const IdTest = str => {
  const regex = /[a-z0-9]{4,7}$/;
  if (!str.test(regex)) return '';
  else if (str.test(regex)) return str;
}; //아이디 형식 체크

export const PswText = str => {
  const regex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  if (!str.test(regex)) return '';
  else if (str.test(regex)) return str;
}; //비밀번호 형식 체크

export const PswCheck = (psw1, psw2) => {
  if (psw1 === psw2) return true;
  else return false;
}; //비밀번호 2번 입력시 일치하는가

export default UserNNicknameTest;

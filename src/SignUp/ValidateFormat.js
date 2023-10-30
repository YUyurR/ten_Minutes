function ValidateFormat() {
  function UserNNicknameTest(str) {
    const regexp = new RegExp(/^[ 가-힣a-zA-Z-]+$/);
    return regexp.test(str);
  } //이름 형식 체크

  const BirthdateTest = str => {
    const regex = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/;

    if (!str.test(regex)) return '';
    else if (str.test(regex)) return str;
  }; //생년월일 형식 체크

  const EmailTest = str => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])+@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!str.test(regex)) return '';
    else if (str.test(regex)) return str;
  }; //이메일 형식 체크

  const IdTest = str => {
    const regex = /[a-z0-9]{4,7}$/;
    if (!str.test(regex)) return '';
    else if (str.test(regex)) return str;
  }; //아이디 형식 체크

  const PswText = str => {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!str.test(regex)) return '';
    else if (str.test(regex)) return str;
  }; //비밀번호 형식 체크

  const PswCheck = (psw1, psw2) => {
    if (psw1 === psw2) return true;
    else return false;
  }; //비밀번호 2번 입력시 일치하는가
}
export default ValidateFormat;

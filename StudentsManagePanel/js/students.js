const getFullName = function (student) {
  const fullName = `${student.surname} ${student.name} ${student.lastname}`;
  return fullName;
};

const getYearsOfStudy = function (student) {
  const educationPeriod = 4;
  const start = parseInt(student.studyStart, 10);
  const end = parseInt(student.studyStart, 10) + educationPeriod;
  const now = new Date();
  const curYear = now.getFullYear() - parseInt(student.studyStart, 10);
  const isStudent = function () {
    if (end > now.getFullYear()) {
      return `(${curYear} курс)`;
    } if (end >= now.getFullYear() && now.getMonth() <= 8) {
      return `(${curYear} курс)`;
    } return '(закончил)';
  };
  return `${start}-${end} ${isStudent()}`;
};

const getFaculty = (student) => student.faculty;

const getBirthDate = function (student) {
  const msUTC = Date.parse(student.birthday);
  const now = new Date();
  const birthday = new Date(msUTC);

  const yyyy = birthday.getFullYear();
  let mm = birthday.getMonth() + 1;
  let dd = birthday.getDate();

  mm < 10 ? mm = '0' + mm : mm;
  dd < 10 ? dd = '0' + dd : dd;

  const age = now.getFullYear() - yyyy;

  return `${dd}.${mm}.${yyyy} (${age} лет)`;
};

export { getFullName, getYearsOfStudy, getFaculty, getBirthDate };

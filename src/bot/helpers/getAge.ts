export const getAge = (birthday: Date) => {
  let today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  let dm = today.getMonth() - birthday.getMonth();

  if (dm < 0 || (dm === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}
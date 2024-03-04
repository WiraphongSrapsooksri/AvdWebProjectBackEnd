function getrankimage() {
  return `SELECT * FROM images_avdweb ORDER BY votes DESC`;
}

function getListuser() {
  return `
    SELECT      id,username,email,image_profile,textBio,aka 
    FROM        users_avdweb
`;
}

module.exports = {
  getrankimage,
  getListuser,
};

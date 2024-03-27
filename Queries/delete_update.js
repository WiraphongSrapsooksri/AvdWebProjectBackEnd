function updateimage(image_id, image_url, user_id) {
  return `
  UPDATE  images_avdweb
  SET     image_url = '${image_url}'
  WHERE   user_id = ${user_id}
  AND     id = ${image_id}
  `;
}

function deleteimageByuser(image_id, user_id) {
  return `
    DELETE FROM images_avdweb
    WHERE   user_id = ${user_id}
    AND     id = ${image_id}
    `;
}

function updateimageprofile(image_url, user_id) {
  return `
  UPDATE  users_avdweb
  SET     image_profile = '${image_url}'
  WHERE   id = ${user_id}

  `;
}

function updatedataprofile(user_id, username, aka, email) {
  return `
  UPDATE  users_avdweb
  SET     username = '${username}',    
          aka = '${aka}',
          email = '${email}'
  WHERE   id = ${user_id}
  `
}
module.exports = {
  updateimage,
  deleteimageByuser,
  updateimageprofile,
  updatedataprofile
};

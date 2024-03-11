function insertimageByuser(image_url, userid) {
  return `
        INSERT INTO images_avdweb (user_id, image_url) 
        VALUES 
        ('${userid}', '${image_url}')
  `;
}

function updatevoteImage(user_id, image_id, vote_value) {
  return `
    INSERT INTO votes_avdweb (user_id, image_id, vote_value) 
    VALUES ('${user_id}','${image_id}','${vote_value}')
    `;
}

module.exports = {
  insertimageByuser,
  updatevoteImage,
};

function getrankimage() {
  // return `SELECT * FROM images_avdweb ORDER BY votes DESC`;
  return `
  SELECT images_avdweb.* ,users_avdweb.username
  FROM images_avdweb , users_avdweb
  WHERE   images_avdweb.user_id = users_avdweb.id
  ORDER BY votes DESC
  `;
}

function getListuser() {
  return `
    SELECT      id,username,email,image_profile,textBio,aka 
    FROM        users_avdweb
`;
}

function getusernamebyid(id) {
  return `
    SELECT      username
    FROM        users_avdweb
    WHERE       id = '${id}'
`;
}

function getListimagebyid(id) {
  return `
  SELECT  users_avdweb.id as userid,users_avdweb.username,images_avdweb.id as imgid,images_avdweb.image_url,rank,votes,images_avdweb.created_at,images_avdweb.updated_at
  FROM    images_avdweb,users_avdweb
  WHERE   users_avdweb.id = images_avdweb.user_id
  AND     users_avdweb.id = '${id}' 
`;
}

function getdaily_statsByIdImage(id) {
  return `
  SELECT  * 
  FROM    daily_stats_avdweb
  WHERE   image_id = '${id}'
  ORDER BY date
  `;
}

function getListDaily_statsByIduser(id) {
  return `
    SELECT  
    i.user_id,
    ds.*
    FROM    
    daily_stats_avdweb AS ds
    INNER JOIN
    images_avdweb AS i ON ds.image_id = i.id
    WHERE   
    i.user_id = '${id}'
    ORDER BY 
    ds.date;
  `;
}

function getRandomImage() {
  return `
  SELECT TOP 2 id, user_id, image_url, votes, rank
  FROM images_avdweb
  ORDER BY NEWID();

  `;
}
module.exports = {
  getrankimage,
  getListuser,
  getListimagebyid,
  getdaily_statsByIdImage,
  getListDaily_statsByIduser,
  getRandomImage
};

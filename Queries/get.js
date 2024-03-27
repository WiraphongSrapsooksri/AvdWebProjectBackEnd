function getrankimage() {
  // return `SELECT * FROM images_avdweb ORDER BY votes DESC`;
  return `
  SELECT images_avdweb.* ,users_avdweb.username
  FROM images_avdweb , users_avdweb
  WHERE   images_avdweb.user_id = users_avdweb.id
  ORDER BY votes DESC
  `;
}

function getrankimageandchangeRank() {
  return `
  WITH CurrentAndPrevious AS (
    SELECT
        i.id AS image_id,
        i.image_url,
        i.votes,
        i.user_id,
        u.username,
        ds.date,
        ds.rank,
        LAG(ds.rank) OVER (PARTITION BY ds.image_id ORDER BY ds.date) AS prev_rank
    FROM
        daily_stats_avdweb ds
    INNER JOIN
        images_avdweb i ON ds.image_id = i.id
    INNER JOIN
        users_avdweb u ON i.user_id = u.id
),
RankChanges AS (
    SELECT
        *,
        prev_rank - rank AS rank_change
    FROM
        CurrentAndPrevious
    WHERE
        date = CAST(GETDATE() AS DATE) 
)
SELECT
    i.*,
    u.username,
    rc.rank_change
FROM
    images_avdweb i
LEFT JOIN
    users_avdweb u ON i.user_id = u.id
LEFT JOIN
    RankChanges rc ON i.id = rc.image_id
ORDER BY
    i.votes DESC;
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

function getListDailyByday_statsByIduser(id) {
  return `
  
WITH CurrentAndPrevious AS (
  SELECT
      i.user_id,
      ds.image_id,
      ds.date,
      ds.votes_gained,
      ds.rank,
      LAG(ds.date) OVER (PARTITION BY ds.image_id ORDER BY ds.date) AS prev_date,
      LAG(ds.votes_gained) OVER (PARTITION BY ds.image_id ORDER BY ds.date) AS prev_votes_gained,
      LAG(ds.rank) OVER (PARTITION BY ds.image_id ORDER BY ds.date) AS prev_rank
  FROM
      daily_stats_avdweb ds
  INNER JOIN
      images_avdweb i ON ds.image_id = i.id
  WHERE
      i.user_id = '${id}'
)
SELECT
  image_id,
  date,
  votes_gained,
  rank,
  prev_date,
  prev_votes_gained,
  prev_rank
FROM
  CurrentAndPrevious
WHERE
  date = CAST(GETDATE() AS DATE) AND (prev_date = DATEADD(day,-1, CAST(GETDATE() AS DATE)) OR prev_date IS NOT NULL)
  AND (votes_gained != prev_votes_gained OR rank != prev_rank);

  `;
}

function getrank_daily_stats_GETDATE_dif1() {
  return `
  SELECT  images_avdweb.* , users_avdweb.username,
  daily_stats_avdweb.date as yesterday,
  daily_stats_avdweb.rank as rank_yesterday,
  daily_stats_avdweb.votes_gained as vote_yesterday
FROM    images_avdweb , users_avdweb,daily_stats_avdweb
WHERE   images_avdweb.user_id = users_avdweb.id
AND     images_avdweb.id = daily_stats_avdweb.image_id
AND     date = CAST(GETDATE()-1 AS DATE)
ORDER BY votes DESC
  `;
}

function getuserById(id) {
  return `
  select  * 
from    users_avdweb
WHERE   id = '${id}'
  `;
}
module.exports = {
  getrankimage,
  getListuser,
  getListimagebyid,
  getdaily_statsByIdImage,
  getListDaily_statsByIduser,
  getRandomImage,
  getListDailyByday_statsByIduser,
  getrankimageandchangeRank,
  getrank_daily_stats_GETDATE_dif1,
  getuserById
};

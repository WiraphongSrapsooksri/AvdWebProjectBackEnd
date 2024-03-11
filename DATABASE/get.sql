-- Language: sql



--getrankimage
SELECT images_avdweb.* , users_avdweb.username
FROM images_avdweb , users_avdweb
WHERE   images_avdweb.user_id = users_avdweb.id
ORDER BY votes DESC





--getListuser
SELECT id, username, email, image_profile, textBio, aka
FROM users_avdweb





--getusernamebyid
SELECT username
FROM users_avdweb
WHERE       id = '${id}'





--getListimagebyid
SELECT users_avdweb.id as userid,
    users_avdweb.username,
    images_avdweb.id as imgid,
    images_avdweb.image_url,
    rank,
    votes,
    images_avdweb.created_at,
    images_avdweb.updated_at
FROM images_avdweb, users_avdweb
WHERE   users_avdweb.id = images_avdweb.user_id
    AND users_avdweb.id = 12





--getdaily_statsByIdImage
SELECT *
FROM daily_stats_avdweb
WHERE   image_id = 19
ORDER BY date





--getListDaily_statsByIduser
SELECT
    i.user_id,
    ds.*
FROM
    daily_stats_avdweb AS ds
    INNER JOIN
    images_avdweb AS i ON ds.image_id = i.id
WHERE   
    i.user_id = 1
ORDER BY 
    ds.date;




SELECT * FROM images_avdweb


DELETE FROM images_avdweb
WHERE   user_id = 1
AND     id = 6



--randomimage
SELECT TOP 2 id, user_id, image_url, votes, rank
FROM images_avdweb
ORDER BY NEWID();

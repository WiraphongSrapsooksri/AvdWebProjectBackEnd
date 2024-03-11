/*

DROP TABLE users_avdweb
DROP TABLE images_avdweb
DROP TABLE votes_avdweb
DROP TABLE daily_stats_avdweb

*/


CREATE TABLE users_avdweb (
  id            INT PRIMARY KEY IDENTITY(1,1),
  username      VARCHAR(255) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  image_profile VARCHAR(255),
  textBio       VARCHAR(30),
  aka           VARCHAR(30),
  created_at    DATETIME DEFAULT GETDATE(),
  updated_at    DATETIME DEFAULT GETDATE()
);

-- ตารางรูปภาพ
CREATE TABLE images_avdweb (
  id            INT PRIMARY KEY IDENTITY(1,1),
  user_id       INT NOT NULL,
  image_url     VARCHAR(255) NOT NULL,
  votes         INT DEFAULT 0,
  rank          INT,
  created_at    DATETIME DEFAULT GETDATE(),
  updated_at    DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users_avdweb(id) 
)
-- ตารางคะแนนโหวต
CREATE TABLE votes_avdweb (
  id            INT PRIMARY KEY IDENTITY(1,1),
  user_id       INT NOT NULL,
  image_id      INT NOT NULL,
  vote_value    INT NOT NULL,                       -- คะแนนที่ Votes
  created_at    DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users_avdweb(id),
  FOREIGN KEY (image_id) REFERENCES images_avdweb(id) ON DELETE CASCADE
);

-- ตารางสถิติรายวัน
CREATE TABLE daily_stats_avdweb (
  id            INT PRIMARY KEY IDENTITY(1,1),
  image_id      INT NOT NULL,
  date          DATE NOT NULL,
  votes_gained  INT,
  rank          INT,
  FOREIGN KEY (image_id) REFERENCES images_avdweb(id) ON DELETE CASCADE
);

-- =====================================TRIGGER==========================================
DROP TRIGGER tr_update_votes
DROP TRIGGER tr_update_rank_on_image_change
DROP TRIGGER tr_reset_votes_on_image_update


DROP PROCEDURE SaveDailyStats
/*

CREATE TRIGGER tr_update_votes
ON votes_avdweb
AFTER INSERT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @image_id INT;
  DECLARE @vote_value INT;

  -- Get the image_id and vote_value from the inserted rows
  SELECT @image_id = image_id, @vote_value = vote_value
  FROM inserted;

  -- Update the votes in images_avdweb based on the vote_value
  UPDATE images_avdweb
  SET votes = votes + @vote_value,
      updated_at = GETDATE()  -- Update the updated_at field
  WHERE id = @image_id;

  -- Update the rank in images_avdweb based on the new votes
  -- Use DENSE_RANK() to avoid gaps in ranking sequence when there are ties
  WITH RankedImages AS (
    SELECT
      id AS image_id,
      DENSE_RANK() OVER (ORDER BY votes DESC) AS new_rank
    FROM
      images_avdweb
  )

  UPDATE images_avdweb
  SET rank = new_rank
  FROM RankedImages
  WHERE images_avdweb.id = RankedImages.image_id;
END;

*/
-- ===========================TRIGGER==========================================


/*
CREATE TRIGGER tr_update_rank_on_image_change
ON images_avdweb
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update the rank in images_avdweb based on the new data
    -- Use DENSE_RANK() to avoid gaps in ranking sequence when there are ties
    WITH RankedImages AS (
        SELECT
            id AS image_id,
            DENSE_RANK() OVER (ORDER BY votes DESC) AS new_rank
        FROM
            images_avdweb
    )

    UPDATE images_avdweb
    SET rank = new_rank
    FROM RankedImages
    WHERE images_avdweb.id = RankedImages.image_id;
END;
*/



/*

drop procedure SaveDailyStats



CREATE PROCEDURE dbo.SaveDailyStats
AS
BEGIN
    SET NOCOUNT ON;

    -- ลบข้อมูลในวันนี้ออกก่อน (ถ้ามี)
    DELETE FROM daily_stats_avdweb
    WHERE date = CAST(GETDATE() AS DATE);

    -- เก็บข้อมูลใหม่ลงในตาราง
    INSERT INTO daily_stats_avdweb (image_id, date, votes_gained, rank)
    SELECT i.id, CAST(GETDATE() AS DATE), i.votes, 
           ROW_NUMBER() OVER (ORDER BY i.votes DESC) AS rank
    FROM images_avdweb i;
END

*/


/*

CREATE TRIGGER tr_reset_votes_on_image_update
ON images_avdweb
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Reset votes to 0 for updated images
    UPDATE images_avdweb
    SET votes = 0
    WHERE id IN (SELECT id FROM inserted WHERE image_url <> isnull((SELECT image_url FROM deleted d WHERE d.id = inserted.id), ''));

    -- Re-rank images based on the updated votes
    WITH RankedImages AS (
        SELECT
            id AS image_id,
            DENSE_RANK() OVER (ORDER BY votes DESC) AS new_rank
        FROM
            images_avdweb
    )

    UPDATE images_avdweb
    SET rank = new_rank
    FROM RankedImages
    WHERE images_avdweb.id = RankedImages.image_id;
END;

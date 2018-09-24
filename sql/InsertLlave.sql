INSERT INTO
  Llaves
SELECT
  @id
  ,id
  ,Datetime('now')
FROM
  Users
WHERE
  googleId = @googleId
  AND permissions >= 2;

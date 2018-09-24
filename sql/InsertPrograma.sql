INSERT INTO
  Programas
SELECT
  @id
  ,@nombre
  ,id
FROM
  Users
WHERE
  googleId = @googleId
  AND permissions >= 3;

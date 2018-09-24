INSERT INTO
  Escuelas
SELECT
  @id
  ,@nombre
  ,id
FROM
  Users
WHERE
  googleId = @googleId
  AND permissions >= 3;

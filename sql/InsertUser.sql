INSERT OR IGNORE INTO
  Users
VALUES (
  @id
  ,@googleId
  ,@email
  ,@nombres
  ,@apellidos
  ,@permissions
  ,Datetime('now')
);

INSERT INTO
  Estudiantes
SELECT
  @id
  ,@edad
  ,@sexo
  ,@programa
  ,@escuela
  ,@ocupacionFutura
  ,@nivelEstudiosFuturoId
  ,@admiracion
  ,@juegoFavorito
  ,@comunidadSegura
  ,@significadoViolencia
  ,@victimaViolencia
  ,@personaViolenta
  ,@personaCreativa
  ,@crearRobot
  ,@disminuirViolencia
  ,@comoDisminuirViolencia
  ,@location
  ,Datetime('now')
  ,id
FROM
  (
    SELECT
      Users.id
    FROM
      Llaves
      INNER JOIN Users
        ON Users.id = Llaves.createdById
    WHERE
      Llaves.id = @llave
      AND Datetime(llaves.timestamp, '+2 hours') > Datetime('now')
    LIMIT 1
  );

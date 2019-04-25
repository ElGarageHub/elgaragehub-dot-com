SELECT
  CASE
    WHEN Coalesce(crearRobot, 0) = 1 THEN 'Sí'
    ELSE 'No'
  END crearRobot
  ,Count(*) c
FROM
  Estudiantes
  LEFT JOIN Programas
    ON Estudiantes.programa = Programas.id
  LEFT JOIN Escuelas
    ON Escuelas.id = Estudiantes.escuela
WHERE
  Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(Estudiantes.edad, 0) >= @edadMin
  AND Coalesce(Estudiantes.edad, 0) <= @edadMax
GROUP BY
  Coalesce(crearRobot, 0);
ORDER BY
  crearRobot

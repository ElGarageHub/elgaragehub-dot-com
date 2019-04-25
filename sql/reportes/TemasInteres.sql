SELECT
  TI.tema tema
  ,Count(*) c
FROM
  EstudianteTemasInteres ETI
  LEFT JOIN TemasInteres TI
    ON TI.id = ETI.temaInteresId
  LEFT JOIN Estudiantes
    ON ETI.estudianteId = Estudiantes.id
  LEFT JOIN Escuelas
    ON Escuelas.id = Estudiantes.escuela
  LEFT JOIN Programas
    ON Programas.id = Estudiantes.programa
WHERE
  Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(Estudiantes.edad, 0) >= @edadMin
  AND Coalesce(Estudiantes.edad, 0) <= @edadMax
GROUP BY
  TI.tema
ORDER BY
  c DESC

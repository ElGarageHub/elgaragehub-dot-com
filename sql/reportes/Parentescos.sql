SELECT
  Coalesce(Parentesco.nombre, 'Otro') parentesco
  ,Count(*) c
FROM
  Estudiantes
  LEFT JOIN Familiares
    ON Familiares.estudianteId = Estudiantes.id
  LEFT JOIN Parentesco
    ON Parentesco.id = Familiares.parentescoId
  LEFT JOIN Programas
    ON Programas.id = Estudiantes.programa
  LEFT JOIN Escuelas
    ON Escuelas.id = Estudiantes.escuela
WHERE
  Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(Estudiantes.edad, 0) >= @edadMin
  AND Coalesce(Estudiantes.edad, 0) <= @edadMax
GROUP BY
  parentesco
ORDER BY
  c DESC;

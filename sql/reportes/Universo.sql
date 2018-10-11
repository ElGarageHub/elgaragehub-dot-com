SELECT
  Count(*) c
FROM
  Estudiantes
WHERE
    Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax;

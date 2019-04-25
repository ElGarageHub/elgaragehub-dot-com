SELECT
  CASE
    WHEN Coalesce(comunidadSegura, 0) = 1 THEN 'Sí'
    ELSE 'No'
  END comunidadSegura
  ,Count(*) c
FROM
  Estudiantes
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
  Coalesce(comunidadSegura, 0);

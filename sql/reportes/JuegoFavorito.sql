SELECT
  juegoFavorito word
  ,Count(*) c
FROM
  Estudiantes
WHERE
  juegoFavorito IS NOT NULL
  AND Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(edad, 0) >= @edadMin
  AND Coalesce(edad, 0) <= @edadMax
GROUP BY
  juegoFavorito
ORDER BY
  c DESC

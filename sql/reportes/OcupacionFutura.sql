SELECT
  ocupacionFutura word
  ,Count(*) c
FROM
  Estudiantes
WHERE
  ocupacionFutura IS NOT NULL
  AND Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(edad, 0) >= @edadMin
  AND Coalesce(edad, 0) <= @edadMax
GROUP BY
  ocupacionFutura
ORDER BY
  c DESC

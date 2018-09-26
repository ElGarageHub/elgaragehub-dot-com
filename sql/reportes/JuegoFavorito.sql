SELECT
  *
FROM (
  SELECT
    juegoFavorito word
    ,Count(*) c
  FROM
    Estudiantes
  WHERE
    juegoFavorito IS NOT NULL
  GROUP BY
    juegoFavorito
  ORDER BY
    c DESC
  LIMIT 100)
WHERE
  c > 2;

SELECT
  *
FROM (
  SELECT
    admiracion word
    ,Count(*) c
  FROM
    Estudiantes
  WHERE
    admiracion IS NOT NULL
  GROUP BY
    admiracion
  ORDER BY
    c DESC
  LIMIT 100)
WHERE
  c > 2;

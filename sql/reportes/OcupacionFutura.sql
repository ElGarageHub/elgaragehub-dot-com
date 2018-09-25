SELECT
  *
FROM (
  SELECT
    ocupacionFutura word
    ,Count(*) c
  FROM
    Estudiantes
  WHERE
    ocupacionFutura IS NOT NULL
  GROUP BY
    ocupacionFutura
  ORDER BY
    c DESC
  LIMIT 100)
WHERE
  c > 2;

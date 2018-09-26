SELECT E.edad, m, f, o FROM
(
  (
    SELECT DISTINCT
    edad
    FROM
    Estudiantes
    WHERE
    edad IS NOT NULL) E
  LEFT JOIN
  (
    SELECT
    edad
    ,Count(*) f
    FROM
    Estudiantes
    WHERE
    sexo = 0
    GROUP BY
    edad) F
  ON
  E.edad = F.edad
  LEFT JOIN
  (
    SELECT
    edad
    ,Count(*) m
    FROM
    Estudiantes
    WHERE
    sexo = 1
    GROUP BY
    edad) M
  ON
  E.edad = M.edad
  LEFT JOIN
  (
    SELECT
    edad
    ,Count(*) o
    FROM
    Estudiantes
    WHERE
    sexo = 2 OR sexo IS NULL
    GROUP BY
    edad) O
  ON
  E.edad = O.edad)
ORDER BY
  E.edad;

SELECT
  E.edad
  ,m
  ,f ,o
FROM
  ((SELECT DISTINCT
    edad
  FROM
    Estudiantes
  WHERE
    edad IS NOT NULL
    AND Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax) E
  LEFT JOIN
  (SELECT
    edad
    ,Count(*) f
  FROM
    Estudiantes
  WHERE
    sexo = 0
    AND Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax
  GROUP BY
    edad) F
  ON
    E.edad = F.edad
  LEFT JOIN
  (SELECT
    edad
    ,Count(*) m
  FROM
    Estudiantes
  WHERE
    sexo = 1
    AND Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax
  GROUP BY
    edad) M
  ON
    E.edad = M.edad
  LEFT JOIN
  (SELECT
    edad
    ,Count(*) o
  FROM
    Estudiantes
  WHERE
    (sexo = 2 OR sexo IS NULL)
    AND Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax
  GROUP BY
    edad) O
  ON
    E.edad = O.edad)
ORDER BY
  E.edad;

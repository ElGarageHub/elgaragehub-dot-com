SELECT 
  N.nivel
  ,m
  ,f
  ,o 
FROM
  ((SELECT DISTINCT
    id
    ,nivel
    FROM
    NivelesEstudios) N
  LEFT JOIN
  (SELECT
    nivelEstudiosFuturoId
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
    nivelEstudiosFuturoId) F
  ON
    N.id = F.nivelEstudiosFuturoId
  LEFT JOIN
  (SELECT
    nivelEstudiosFuturoId
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
    nivelEstudiosFuturoId) M
  ON
    N.id = M.nivelEstudiosFuturoId
  LEFT JOIN
  (SELECT
    nivelEstudiosFuturoId
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
    nivelEstudiosFuturoId) O
  ON
    N.id = O.nivelEstudiosFuturoId)
WHERE
  o > 0 OR m > 0 OR f > 0;

SELECT
  numeroFamiliares
  ,Count(*) c
FROM
  (SELECT
    Estudiantes.id id
    ,Coalesce(F.nf, 1) numeroFamiliares
    ,Coalesce(P.id, '') programa
    ,Coalesce(E.id, '') escuela
    ,Coalesce(Estudiantes.sexo, '') sexo
    ,Coalesce(Estudiantes.edad, 0) edad
  FROM
    Estudiantes
  LEFT JOIN
    (SELECT
      estudianteId
      ,Count(*) + 1 nf
    FROM
      Familiares
    GROUP BY
      estudianteId
    ORDER BY
      Count(*) + 1) F
    ON F.estudianteId = Estudiantes.id
  LEFT JOIN
    Programas P
    ON P.id = Estudiantes.programa
  LEFT JOIN
    Escuelas E
    ON E.id = Estudiantes.escuela
  WHERE
    Coalesce(programa, '') LIKE @programa
    AND Coalesce(escuela, '') LIKE @escuela
    AND Coalesce(sexo, '') LIKE @sexo
    AND Coalesce(edad, 0) >= @edadMin
    AND Coalesce(edad, 0) <= @edadMax)
GROUP BY
  numeroFamiliares
ORDER BY
  numeroFamiliares

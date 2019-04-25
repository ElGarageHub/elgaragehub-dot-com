SELECT
  TP.problema problema
  ,Count(*) c
FROM
  EstudianteTiposProblema ETP
  LEFT JOIN TiposProblemaFamilia TP
    ON TP.id = ETP.tipoProblemaFamiliaId
  LEFT JOIN Estudiantes
    ON ETP.estudianteId = Estudiantes.id
  LEFT JOIN Escuelas
    ON Escuelas.id = Estudiantes.escuela
  LEFT JOIN Programas
    ON Programas.id = Estudiantes.programa
WHERE
  Coalesce(programa, '') LIKE @programa
  AND Coalesce(escuela, '') LIKE @escuela
  AND Coalesce(sexo, '') LIKE @sexo
  AND Coalesce(Estudiantes.edad, 0) >= @edadMin
  AND Coalesce(Estudiantes.edad, 0) <= @edadMax
GROUP BY
  TP.problema
ORDER BY
  c DESC

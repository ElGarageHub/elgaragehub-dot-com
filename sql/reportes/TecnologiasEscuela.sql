SELECT
  TTE.tecnologia tecnologia
  ,Count(*) c
FROM
  EstudianteTiposTecnologiaEscuela ETTE
  LEFT JOIN TiposTecnologiaEscuela TTE
    ON TTE.id = ETTE.tipoTecnologiaId
  LEFT JOIN Estudiantes
    ON ETTE.estudianteId = Estudiantes.id
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
  TTE.tecnologia
ORDER BY
  c DESC

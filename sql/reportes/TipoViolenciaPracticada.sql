SELECT
  TV.tipo tipoViolencia
  ,Count(*) c
FROM
  EstudianteTiposViolenciaPracticados ETVV
  LEFT JOIN TiposViolencia TV
    ON TV.id = ETVV.tipoViolenciaId
  LEFT JOIN Estudiantes
    ON ETVV.estudianteId = Estudiantes.id
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
  TV.tipo
ORDER BY
  c DESC

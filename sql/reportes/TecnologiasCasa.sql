SELECT
  TTC.tecnologia tecnologia
  ,Count(*) c
FROM
  EstudianteTiposTecnologiaCasa ETTC
  LEFT JOIN TiposTecnologiaCasa TTC
    ON TTC.id = ETTC.tipoTecnologiaId
  LEFT JOIN Estudiantes
    ON ETTC.estudianteId = Estudiantes.id
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
  TTC.tecnologia
ORDER BY
  c DESC

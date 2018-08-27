DELETE FROM
  EstudianteTemasInteres
WHERE
  estudianteId = @id;

DELETE FROM
  EstudianteTiposTecnologiaEscuela
WHERE
  estudianteId = @id;

DELETE FROM
  EstudianteTiposTecnologiaCasa
WHERE
  estudianteId = @id;

DELETE FROM
  EstudianteTiposProblema
WHERE
  estudianteId = @id;

DELETE FROM
  EstudianteTiposViolenciaVictima
WHERE
  estudianteId = @id;

DELETE FROM
  EstudianteTiposViolenciaPracticados
WHERE
  estudianteId = @id;

DELETE FROM
  Familiares
WHERE
  estudianteId = @id;

DELETE FROM
  Estudiantes
WHERE
  id = @id;


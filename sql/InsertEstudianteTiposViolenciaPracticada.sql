INSERT INTO
  EstudianteTiposViolenciaPracticados
VALUES (
  @id
  ,@estudianteId
  ,@tipoViolenciaId
  ,Datetime('now')
  ,@createdBy
);

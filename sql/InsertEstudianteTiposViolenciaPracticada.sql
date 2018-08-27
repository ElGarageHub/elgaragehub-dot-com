INSERT INTO
  EstudianteTiposViolenciaPracticados
VALUES (
  @id
  ,@estudiante
  ,@tipoViolencia
  ,Datetime('now')
  ,@createdBy
);

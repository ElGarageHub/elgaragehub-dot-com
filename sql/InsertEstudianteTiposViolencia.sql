INSERT INTO
  EstudianteTiposViolenciaVictima
VALUES (
  @id
  ,@estudiante
  ,@tipoViolencia
  ,Datetime('now')
  ,@createdBy
);

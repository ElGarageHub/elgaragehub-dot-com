INSERT INTO
  EstudianteTiposViolenciaVictima
VALUES (
  @id
  ,@estudianteId
  ,@tipoViolenciaId
  ,Datetime('now')
  ,@createdBy
);

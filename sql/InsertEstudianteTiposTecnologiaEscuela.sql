INSERT INTO
  EstudianteTiposTecnologiaEscuela
VALUES (
  @id
  ,@estudianteId
  ,@tipoTecnologiaId
  ,Datetime('now')
  ,@createdBy
);

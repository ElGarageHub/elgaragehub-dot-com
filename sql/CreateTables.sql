CREATE TABLE Estudiantes (
  id INTEGER NOT NULL
  ,edad INTEGER
  ,sexo INTEGER
  ,escuela INTEGER
  ,ocupacionFutura TEXT
  ,nivelEstudiosFuturoId INTEGER
  ,admiracion TEXT
  ,juegoFavorito TEXT
  ,comunidadSegura INTEGER
  ,significadoViolencia TEXT
  ,victimaViolencia INTEGER
  ,personaViolenta INTEGER
  ,personaCreativa INTEGER
  ,crearRobot INTEGER
  ,disminuirViolencia INTEGER
  ,comoDisminuirViolencia TEXT
  ,location TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(escuela) REFERENCES Escuelas(id)
  ,FOREIGN KEY(nivelEstudiosFuturoId) REFERENCES NivelesEstudios(id)
);

CREATE TABLE Escuelas (
  id INTEGER NOT NULL
  ,nombre TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  Escuelas
VALUES
  (0, 'El Garage Project Hub', Datetime('now'), 'root');

CREATE TABLE TemasInteres (
  id INTEGER NOT NULL
  ,tema TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  TemasInteres
VALUES
  (0, 'Política', Datetime('now'), 'root')
  ,(1, 'Nuevos inventos', Datetime('now'), 'root')
  ,(2, 'Nuevos descubrimientos científicos', Datetime('now'), 'root')
  ,(3, 'Contaminación ambiental', Datetime('now'), 'root')
  ,(4, 'Sociales y espectáculos', Datetime('now'), 'root')
  ,(5, 'Arte', Datetime('now'), 'root')
  ,(6, 'Otro', Datetime('now'), 'root');

CREATE TABLE EstudianteTemasInteres (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,temaInteresId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(temaInteresId) REFERENCES TemasInteres(id)
);

CREATE TABLE TiposTecnologiaEscuela (
  id INTEGER NOT NULL
  ,tecnologia TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  TiposTecnologiaEscuela
VALUES
  (0, 'Computadora', Datetime('now'), 'root')
  ,(1, 'Internet', Datetime('now'), 'root')
  ,(2, 'Cañón/Proyector', Datetime('now'), 'root')
  ,(3, 'Celular', Datetime('now'), 'root')
  ,(4, 'Televisión', Datetime('now'), 'root');

CREATE TABLE EstudianteTiposTecnologiaEscuela (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoTecnologiaId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoTecnologiaId) REFERENCES TiposTecnologiaEscuela(Id)
);

CREATE TABLE TiposTecnologiaCasa (
  id INTEGER NOT NULL
  ,tecnologia TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  TiposTecnologiaCasa
VALUES
  (0, 'Televisión', Datetime('now'), 'root')
  ,(1, 'Carro', Datetime('now'), 'root')
  ,(2, 'Celular', Datetime('now'), 'root')
  ,(3, 'Internet', Datetime('now'), 'root')
  ,(4, 'Tablet', Datetime('now'), 'root')
  ,(5, 'Laptop', Datetime('now'), 'root')
  ,(6, 'Consola de videojuegos', Datetime('now'), 'root');

CREATE TABLE EstudianteTiposTecnologiaCasa (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoTecnologiaId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoTecnologiaId) REFERENCES TiposTecnologiaCasa(id)
);

CREATE TABLE TiposProblemaFamilia (
  id INTEGER NOT NULL
  ,problema TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  TiposProblemaFamilia
VALUES
  (0, 'Violencia', Datetime('now'), 'root')
  ,(1, 'Alcoholismo', Datetime('now'), 'root')
  ,(2, 'Bullying', Datetime('now'), 'root')
  ,(3, 'Drogas', Datetime('now'), 'root')
  ,(4, 'Enfermedades', Datetime('now'), 'root')
  ,(5, 'Desempleo', Datetime('now'), 'root')
  ,(6, 'Ninguno', Datetime('now'), 'root')
  ,(7, 'Otro', Datetime('now'), 'root');

CREATE TABLE EstudianteTiposProblema (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoProblemaFamiliaId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoProblemaFamiliaId) REFERENCES TiposProblemaFamilia(id)
);

CREATE TABLE TiposViolencia (
  id INTEGER NOT NULL
  ,tipo TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  TiposViolencia
VALUES
  (0, 'Física', Datetime('now'), 'root')
  ,(1, 'Psicológica', Datetime('now'), 'root')
  ,(2, 'Sexual', Datetime('now'), 'root')
  ,(3, 'Verbal', Datetime('now'), 'root')
  ,(4, 'Otra', Datetime('now'), 'root');

CREATE TABLE EstudianteTiposViolenciaVictima (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoViolenciaId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoViolenciaId) REFERENCES TiposViolencia(id)
);

CREATE TABLE EstudianteTiposViolenciaPracticados (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoViolenciaId INTEGER
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoViolenciaId) REFERENCES TiposViolencia(id)
);

CREATE TABLE NivelesEstudios (
  id INTEGER NOT NULL
  ,nivel TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  NivelesEstudios
VALUES
  (0, 'Secundaria', Datetime('now'), 'root')
  ,(1, 'Preparatoria', Datetime('now'), 'root')
  ,(2, 'Estudios técnicos', Datetime('now'), 'root')
  ,(3, 'Universidad', Datetime('now'), 'root')
  ,(4, 'Maestría', Datetime('now'), 'root')
  ,(5, 'Doctorado', Datetime('now'), 'root')
  ,(6, 'No sé', Datetime('now'), 'root');

CREATE TABLE Familiares (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,parentescoId INTEGER
  ,edad INTEGER
  ,ocupacion TEXT
  ,timestamp TEXT
  ,createdBy TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(parentescoId) REFERENCES Parentesco(id)
);

CREATE TABLE Parentesco (
  id INTEGER NOT NULL
  ,nombre TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  Parentesco
VALUES
  (0, 'Padre')
  ,(1, 'Madre')
  ,(2, 'Hermano(a)')
  ,(3, 'Abuelo(a)')
  ,(4, 'Tio(a)')
  ,(5, 'Primo(a)')
  ,(6, 'Otro');

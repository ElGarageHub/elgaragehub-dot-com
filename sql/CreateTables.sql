CREATE TABLE Users (
  id INTEGER NOT NULL
  ,googleId TEXT UNIQUE
  ,email TEXT
  ,nombres TEXT
  ,apellidos TEXT
  ,permissions INTEGER
  ,timestamp TEXT
  ,PRIMARY KEY(id)
);

INSERT INTO
  Users
VALUES
  (0, '100778134186629482578', 'javier.rizzo@ceu16.edu.mx', 'Javier', 'Rizzo Aguirre', 10, Datetime('now'));

CREATE TABLE Llaves (
  id TEXT NOT NULL
  ,createdById INTEGER
  ,timestamp TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

CREATE TABLE Estudiantes (
  id INTEGER NOT NULL
  ,edad INTEGER CHECK(edad >= 0 AND edad <= 99)
  ,sexo INTEGER CHECK(sexo >= 0 AND sexo <= 2)
  ,programa INTEGER
  ,escuela INTEGER
  ,ocupacionFutura TEXT CHECK(ocupacionFutura <> '')
  ,nivelEstudiosFuturoId INTEGER
  ,admiracion TEXT CHECK(admiracion <> '')
  ,juegoFavorito TEXT CHECK(juegoFavorito <> '')
  ,comunidadSegura INTEGER CHECK(comunidadSegura = 1 OR comunidadSegura = 0)
  ,significadoViolencia TEXT CHECK(significadoViolencia <> '')
  ,victimaViolencia INTEGER CHECK(victimaViolencia = 1 OR victimaViolencia = 0)
  ,personaViolenta INTEGER CHECK(personaViolenta = 1 OR personaViolenta = 0)
  ,personaCreativa INTEGER CHECK(personaCreativa = 1 OR personaCreativa = 0)
  ,crearRobot INTEGER CHECK(crearRobot = 1 OR crearRobot = 0)
  ,disminuirViolencia INTEGER CHECK(disminuirViolencia = 0 OR disminuirViolencia = 1)
  ,comoDisminuirViolencia TEXT CHECK(comoDisminuirViolencia <> '')
  ,location TEXT
  ,timestamp TEXT
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(programa) REFERENCES Programas(id)
  ,FOREIGN KEY(escuela) REFERENCES Escuelas(id)
  ,FOREIGN KEY(nivelEstudiosFuturoId) REFERENCES NivelesEstudios(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

CREATE TABLE Escuelas (
  id INTEGER NOT NULL
  ,nombre TEXT UNIQUE CHECK(nombre <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  Escuelas
VALUES
  (0, '16 de Septiembre', 0);

CREATE TABLE Programas (
  id INTEGER NOT NULL
  ,nombre TEXT UNIQUE CHECK(nombre <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  Programas
VALUES
  (0, 'El Garage Project Hub', 0);

CREATE TABLE TemasInteres (
  id INTEGER NOT NULL
  ,tema TEXT CHECK(tema <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  TemasInteres
VALUES
  (0, 'Política', 0)
  ,(1, 'Nuevos inventos', 0)
  ,(2, 'Nuevos descubrimientos científicos', 0)
  ,(3, 'Contaminación ambiental', 0)
  ,(4, 'Sociales y espectáculos', 0)
  ,(5, 'Arte', 0)
  ,(6, 'Otro', 0);

CREATE TABLE EstudianteTemasInteres (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,temaInteresId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(temaInteresId) REFERENCES TemasInteres(id)
);

CREATE TABLE TiposTecnologiaEscuela (
  id INTEGER NOT NULL
  ,tecnologia TEXT CHECK(tecnologia <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  TiposTecnologiaEscuela
VALUES
  (0, 'Computadora', 0)
  ,(1, 'Internet', 0)
  ,(2, 'Cañón/Proyector', 0)
  ,(3, 'Celular', 0)
  ,(4, 'Televisión', 0);

CREATE TABLE EstudianteTiposTecnologiaEscuela (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoTecnologiaId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoTecnologiaId) REFERENCES TiposTecnologiaEscuela(Id)
);

CREATE TABLE TiposTecnologiaCasa (
  id INTEGER NOT NULL
  ,tecnologia TEXT CHECK(tecnologia <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  TiposTecnologiaCasa
VALUES
  (0, 'Televisión', 0)
  ,(1, 'Carro', 0)
  ,(2, 'Celular', 0)
  ,(3, 'Internet', 0)
  ,(4, 'Tablet', 0)
  ,(5, 'Laptop', 0)
  ,(6, 'Consola de videojuegos', 0);

CREATE TABLE EstudianteTiposTecnologiaCasa (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoTecnologiaId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoTecnologiaId) REFERENCES TiposTecnologiaCasa(id)
);

CREATE TABLE TiposProblemaFamilia (
  id INTEGER NOT NULL
  ,problema TEXT CHECK(problema <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  TiposProblemaFamilia
VALUES
  (0, 'Violencia', 0)
  ,(1, 'Alcoholismo', 0)
  ,(2, 'Bullying', 0)
  ,(3, 'Drogas', 0)
  ,(4, 'Enfermedades', 0)
  ,(5, 'Desempleo', 0)
  ,(6, 'Ninguno', 0)
  ,(7, 'Otro', 0);

CREATE TABLE EstudianteTiposProblema (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoProblemaFamiliaId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoProblemaFamiliaId) REFERENCES TiposProblemaFamilia(id)
);

CREATE TABLE TiposViolencia (
  id INTEGER NOT NULL
  ,tipo TEXT CHECK(tipo <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  TiposViolencia
VALUES
  (0, 'Física', 0)
  ,(1, 'Psicológica', 0)
  ,(2, 'Sexual', 0)
  ,(3, 'Verbal', 0)
  ,(4, 'Otra', 0);

CREATE TABLE EstudianteTiposViolenciaVictima (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoViolenciaId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoViolenciaId) REFERENCES TiposViolencia(id)
);

CREATE TABLE EstudianteTiposViolenciaPracticados (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,tipoViolenciaId INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(tipoViolenciaId) REFERENCES TiposViolencia(id)
);

CREATE TABLE NivelesEstudios (
  id INTEGER NOT NULL
  ,nivel TEXT CHECK(nivel <> '')
  ,createdById INTEGER
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(id)
);

INSERT INTO
  NivelesEstudios
VALUES
  (0, 'Secundaria', 0)
  ,(1, 'Preparatoria', 0)
  ,(2, 'Estudios técnicos', 0)
  ,(3, 'Universidad', 0)
  ,(4, 'Maestría', 0)
  ,(5, 'Doctorado', 0)
  ,(6, 'No sé', 0);

CREATE TABLE Familiares (
  id INTEGER NOT NULL
  ,estudianteId INTEGER
  ,parentescoId INTEGER
  ,edad INTEGER CHECK(edad >= 0 AND edad <= 99)
  ,ocupacion TEXT CHECK(ocupacion <> '')
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(estudianteId) REFERENCES Estudiantes(id)
  ,FOREIGN KEY(parentescoId) REFERENCES Parentesco(id)
);

CREATE TABLE Parentesco (
  id INTEGER NOT NULL
  ,nombre TEXT CHECK(nombre <> '')
  ,createdById TEXT
  ,PRIMARY KEY(id)
  ,FOREIGN KEY(createdById) REFERENCES Users(Id)
);

INSERT INTO
  Parentesco
VALUES
  (0, 'Padre', 0)
  ,(1, 'Madre', 0)
  ,(2, 'Hermano(a)', 0)
  ,(3, 'Abuelo(a)', 0)
  ,(4, 'Tio(a)', 0)
  ,(5, 'Primo(a)', 0)
  ,(6, 'Otro', 0);

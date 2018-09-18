const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(path.join(__dirname, '../'), 'database.db');
const SQL_CREATE_TABLES = path.join(
  path.join(__dirname, '../'), 'sql/CreateTables.sql');


let db = new sqlite3.Database(DB_FILE, null, function() {
  db.exec('PRAGMA foreign_keys = ON;');
});

let sqlQueries = [];

function generateRandomID() {
  return Math.random() * Math.pow(10, 17);
}

function getData(data, callback) {
  switch(data) {
    case 'escuelas':
      db.all('SELECT id, nombre FROM Escuelas', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla Escuelas');
        else callback(null, rows);
      });
      break;
    case 'parentescos':
      db.all('SELECT id, nombre FROM Parentesco', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla Parentesco');
        else callback(null, rows);
      });
      break;
    case 'niveles-estudios':
      db.all('SELECT id, nivel FROM NivelesEstudios', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla NivelesEstudios');
        else callback(null, rows);
      });
      break;
    case 'tipos-violencia':
      db.all('SELECT id, tipo FROM TiposViolencia', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla TiposViolencia');
        else callback(null, rows);
      });
      break;
    case 'problemas-familia':
      db.all('SELECT id, problema FROM TiposProblemaFamilia',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposProblemaFamilia');
          else callback(null, rows);
        });
      break;
    case 'tecnologia-casa':
      db.all('SELECT id, tecnologia FROM TiposTecnologiaCasa',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposTecnologiaCasa');
          else callback(null, rows);
        });
      break;
    case 'tecnologia-escuela':
      db.all('SELECT id, tecnologia FROM TiposTecnologiaEscuela',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposTecnologiaEscuela');
          else callback(null, rows);
        });
      break;
    case 'temas-interes':
      db.all('SELECT id, tema FROM TemasInteres', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla TemasInteres');
        else callback(null, rows);
      });
      break;
  }
}

function insertEstudiante(id, data, callback) {
  db.run(sqlQueries['InsertEstudiante'], {
    '@id': id,
    '@edad': data.edad,
    '@sexo': data.sexo,
    '@escuela': data.escuela,
    '@ocupacionFutura': data['ocupacion-futura'],
    '@nivelEstudiosFuturo': data['nivel-estudios'],
    '@admiracion': data.admiracion,
    '@juegoFavorito': data['juego-favorito'],
    '@comunidadSegura': data['comunidad-segura'],
    '@significadoViolencia': data['significado-violencia'],
    '@victimaViolencia': data['victima-violencia'],
    '@personaViolenta': data['persona-violenta'],
    '@personaCreativa': data['persona-creativa'],
    '@crearRobot': data['crear-robot'],
    '@disminuirViolencia': data['disminuir-violencia'],
    '@comoDisminuirViolencia': data['como-disminuir-violencia'],
    '@location': null,
    '@createdBy': null
  }, function(err) {
    if(err) {
      insertEstudianteError();
      callback('ERROR al correr InsertEstudiante: ' + err);
    } else {
      let callbacks = [
        insertEstudianteTemasInteres,
        insertEstudianteTiposProblema,
        insertEstudianteTiposTecnologiaCasa,
        insertEstudianteTiposTecnologiaEscuela,
        insertEstudianteTiposViolencia,
        insertEstudianteTiposViolenciaPracticada,
        insertFamiliares,
        callback
      ];
      let cb = callbacks.shift();
      cb(id, data, callbacks);
    }
  });
}

function insertEstudianteTemasInteres(id, data, callbacks) {
  let insertedTemas = 0;
  data['temas-interes'].forEach(function(tema, index, array) {
    db.run(sqlQueries['InsertEstudianteTemasInteres'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@temaInteres': tema,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTemasInteres: ' + err);
      } else {
        insertedTemas++;
        if(insertedTemas == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertEstudianteTiposProblema(id, data, callbacks) {
  let insertedProblemas = 0;
  data['problemas-familia'].forEach(function(problema, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposProblema'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoProblemaId': problema,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTiposProblema: ' + err);
      } else {
        insertedProblemas++;
        if(insertedProblemas == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertEstudianteTiposTecnologiaCasa(id, data, callbacks) {
  let insertedTipos = 0;
  data['tecnologias-casa'].forEach(function(tecnologia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposTecnologiaCasa'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoTecnologiaId': tecnologia,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTiposTecnologiaCasa: ' + err);
      } else {
        insertedTipos++;
        if(insertedTipos == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertEstudianteTiposTecnologiaEscuela(id, data, callbacks) {
  let insertedTipos = 0;
  data['tecnologias-escuela'].forEach(function(tecnologia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposTecnologiaEscuela'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoTecnologiaId': tecnologia,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTiposTecnologiaEscuela: ' + err);
      } else {
        insertedTipos++;
        if(insertedTipos == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertEstudianteTiposViolencia(id, data, callbacks) {
  let insertedViolencia = 0;
  data['tipos-violencia'].forEach(function(violencia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposViolencia'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoViolenciaId': violencia,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTiposViolencia: ' + err);
      } else {
        insertedViolencia++;
        if(insertedViolencia == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertEstudianteTiposViolenciaPracticada(id, data, callbacks) {
  let insertedViolencia = 0;
  data['violencia-practicada'].forEach(function(violencia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposViolenciaPracticada'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoViolenciaId': violencia,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertEstudianteTiposViolenciaPracticada: ' + err);
      } else {
        insertedViolencia++;
        if(insertedViolencia == array.length) {
          let cb = callbacks.shift();
          cb(id, data, callbacks);
        }
      }
    });
  });
}

function insertFamiliares(id, data, callbacks) {
  let insertedFamiliar = 0;
  data.familiares.forEach(function(familiar, index, array) {
    db.run(sqlQueries['InsertFamiliar'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@parentescoId': familiar.parentesco,
      '@edad': familiar.edad,
      '@ocupacion': familiar.ocupacion,
      '@createdBy': null
    }, function(err) {
      if(err) {
        let cb = callbacks.pop();
        insertEstudianteError();
        cb('ERROR al correr InsertFamiliar: ' + err);
      } else {
        insertedFamiliar++;
        if(insertedFamiliar == array.length) {
          let cb = callbacks.shift();
          cb(null);
        }
      }
    });
  });
}

function insertEstudianteError(id) {
  db.run(sqlQueries['DeleteEstudiante'], {
    '@id': id
  }, function(err) {});
}

function readQueries(callback) {
  let queriesRead = 0;
  [
    'DeleteEstudiante',
    'InsertEstudiante',
    'InsertEstudianteTemasInteres',
    'InsertEstudianteTiposProblema',
    'InsertEstudianteTiposTecnologiaCasa',
    'InsertEstudianteTiposTecnologiaEscuela',
    'InsertEstudianteTiposViolenciaPracticada',
    'InsertEstudianteTiposViolencia',
    'InsertFamiliar'
  ].forEach(function(query, index, array) {
    fs.readFile('sql/' + query + '.sql', 'utf8', function(err, data) {
      if(err) {
        callback('ERROR al leer el archivo sql/' + query + '.sql');
      } else {
        sqlQueries[query] = data;
        queriesRead++;
        if(queriesRead == array.length) {
          callback(null);
        }
      }
    });
  });
}

exports.getData = getData;
exports.readQueries = readQueries;
exports.insertEstudiante = insertEstudiante;
exports.generateRandomID = generateRandomID;

"use strict";

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname, '../', 'database.db');
const SQL_CREATE_TABLES = path.join(__dirname, '../', 'sql/CreateTables.sql');

let db = new sqlite3.Database(DB_FILE);
db.get('PRAGMA foreign_keys = ON');

let sqlQueries = [];

function generateRandomID() {
  return Math.round(Math.random() * Math.pow(10, 18));
}

function getStat(data, callback) {
  switch(data) {
    case 'edades':
      db.all(sqlQueries['reportes/Edades'], function(err, rows) {
        if(err) callback('ERROR al correr reportes/Edades.sql: ' + err);
        else callback(null, rows);
      });
      break;
    case 'estudios':
      db.all(sqlQueries['reportes/Estudios'], function(err, rows) {
        if(err) callback('ERROR al correr reportes/Estudios.sql: ' + err);
        else callback(null, rows);
      });
      break;
    case 'ocupacion-futura':
      db.all(sqlQueries['reportes/OcupacionFutura'], function(err, rows) {
        if(err) callback('ERROR al correr reportes/OcupacionFutura.sql: ' + err);
        else callback(null, rows);
      });
      break;
    case 'admiracion':
      db.all(sqlQueries['reportes/Admiracion'], function(err, rows) {
        if(err) callback('ERROR al correr reportes/Admiracion.sql: ' + err);
        else callback(null, rows);
      });
      break;
    case 'juego-favorito':
      db.all(sqlQueries['reportes/JuegoFavorito'], function(err, rows) {
        if(err) callback('ERROR al correr reportes/JuegoFavorito.sql: ' + err);
        else callback(null, rows);
      });
      break;
  }
}

function getData(data, callback) {
  switch(data) {
    case 'escuelas':
      db.all('SELECT id, nombre FROM Escuelas ORDER BY nombre', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla Escuelas: ' + err);
        else callback(null, rows);
      });
      break;
    case 'programas':
      db.all('SELECT id, nombre FROM Programas ORDER BY nombre', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla Programas: ' + err);
        else callback(null, rows);
      });
      break;
    case 'parentescos':
      db.all('SELECT id, nombre FROM Parentesco', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla Parentesco: ' + err);
        else callback(null, rows);
      });
      break;
    case 'niveles-estudios':
      db.all('SELECT id, nivel FROM NivelesEstudios', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla NivelesEstudios: ' + err);
        else callback(null, rows);
      });
      break;
    case 'tipos-violencia':
      db.all('SELECT id, tipo FROM TiposViolencia', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla TiposViolencia: ' + err);
        else callback(null, rows);
      });
      break;
    case 'problemas-familia':
      db.all('SELECT id, problema FROM TiposProblemaFamilia',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposProblemaFamilia: ' + err);
          else callback(null, rows);
        });
      break;
    case 'tecnologia-casa':
      db.all('SELECT id, tecnologia FROM TiposTecnologiaCasa',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposTecnologiaCasa: ' + err);
          else callback(null, rows);
        });
      break;
    case 'tecnologia-escuela':
      db.all('SELECT id, tecnologia FROM TiposTecnologiaEscuela',
        function(err, rows) {
          if(err) callback('ERROR al consultar la tabla TiposTecnologiaEscuela: ' + err);
          else callback(null, rows);
        });
      break;
    case 'temas-interes':
      db.all('SELECT id, tema FROM TemasInteres', function(err, rows) {
        if(err) callback('ERROR al consultar la tabla TemasInteres: ' + err);
        else callback(null, rows);
      });
      break;
  }
}

function insertUser(id, data, callback) {
  db.run(sqlQueries['InsertUser'], {
    '@id': id,
    '@googleId': data.googleId,
    '@email': data.email,
    '@nombres': data.nombres,
    '@apellidos': data.apellidos,
    '@permissions': 1
  }, function(err) {
    if(err) {
      callback('ERROR al correr InsertUser: ' + err);
    } else if(this.changes == 0) {
      callback('User already exists.');
    } else {
      callback(null);
    }
  });
}

function insertPrograma(id, data, callback) {
  db.run(sqlQueries['InsertPrograma'], {
    '@id': id,
    '@nombre': data.nombre,
    '@googleId': data.googleId
  }, function(err) {
    if(err) {
      callback('ERROR al correr InsertPrograma: ' + err);
    } else if(this.changes == 0) {
      callback('ERROR de permisos');
    } else {
      callback(null);
    }
  });
}

function insertEscuela(id, data, callback) {
  db.run(sqlQueries['InsertEscuela'], {
    '@id': id,
    '@nombre': data.nombre,
    '@googleId': data.googleId
  }, function(err) {
    if(err) {
      callback('ERROR al correr InsertEscuela: ' + err);
    } else if(this.changes == 0) {
      callback('ERROR de permisos');
    } else {
      callback(null);
    }
  });
}

function insertLlave(id, googleId, callback) {
  db.run(sqlQueries['InsertLlave'], {
    '@id': id,
    '@googleId': googleId
  }, function(err) {
    if(err) {
      callback('ERROR al correr InsertEscuela: ' + err);
    } else if(this.changes == 0) {
      callback('ERROR de permisos');
    } else {
      callback(null);
    }
  });
}

function insertEstudiante(id, data, callback) {
  db.run(sqlQueries['InsertEstudiante'], {
    '@id': id,
    '@edad': data.edad,
    '@sexo': data.sexo,
    '@programa': data.programa,
    '@escuela': data.escuela,
    '@ocupacionFutura': data['ocupacion-futura'],
    '@nivelEstudiosFuturoId': data['nivel-estudios'],
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
    '@location': ' ',
    '@llave': data.llave.toUpperCase()
  }, function(err) {
    if(err) {
      insertEstudianteError();
      callback('ERROR al correr InsertEstudiante: ' + err);
    } else if(this.changes == 0) {
      callback('ERROR de llave');
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
  if(data['temas-interes'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['temas-interes'].forEach(function(tema, index, array) {
    db.run(sqlQueries['InsertEstudianteTemasInteres'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@temaInteres': tema
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
  if(data['problemas-familia'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['problemas-familia'].forEach(function(problema, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposProblema'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoProblemaId': problema
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
  if(data['tecnologias-casa'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['tecnologias-casa'].forEach(function(tecnologia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposTecnologiaCasa'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoTecnologiaId': tecnologia
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
  if(data['tecnologias-escuela'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['tecnologias-escuela'].forEach(function(tecnologia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposTecnologiaEscuela'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoTecnologiaId': tecnologia
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
  if(data['tipos-violencia'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['tipos-violencia'].forEach(function(violencia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposViolencia'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoViolenciaId': violencia
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
  if(data['violencia-practicada'].length == 0) {
    let cb = callbacks.shift();
    cb(id, data, callbacks);
  }
  data['violencia-practicada'].forEach(function(violencia, index, array) {
    db.run(sqlQueries['InsertEstudianteTiposViolenciaPracticada'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@tipoViolenciaId': violencia
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
  if(data.familiares.length == 0) {
    let cb = callbacks.shift();
    cb(null);
  }
  data.familiares.forEach(function(familiar, index, array) {
    db.run(sqlQueries['InsertFamiliar'], {
      '@id': generateRandomID(),
      '@estudianteId': id,
      '@parentescoId': familiar.parentesco,
      '@edad': familiar.edad,
      '@ocupacion': familiar.ocupacion
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
    'InsertFamiliar',
    'InsertUser',
    'InsertPrograma',
    'InsertEscuela',
    'InsertLlave',
    'reportes/Edades',
    'reportes/Estudios',
    'reportes/OcupacionFutura',
    'reportes/Admiracion',
    'reportes/JuegoFavorito'
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
exports.insertUser = insertUser;
exports.insertPrograma = insertPrograma;
exports.insertEscuela = insertEscuela;
exports.insertLlave = insertLlave;
exports.generateRandomID = generateRandomID;
exports.getStat = getStat;

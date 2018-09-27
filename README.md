# elgarage-dot-com

El Garage Project Hub Website, deployed to https://elgaragehub.com/

## Requirements

* node ~v8.11.1
* npm
* sqlite3

## Installation

Clone the repo and do

```
npm install
```

Then, create the database by running

```
sqlite3 database.db
```

and reading the `sql/CreateTables.sql` file:

```
.read sql/CreateTables.sql
```

## Running

```
node main.js
```

## License

### The MIT License

Copyright (c) 2017-2018 El Garage Project Hub, Javier Rizzo Aguirre, Luis Felipe
Martínez Grijalva.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

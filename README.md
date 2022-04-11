# Práctica X. Testing Project
**Nombre:** Leonardo Alfonso Cruz Rodríguez  
**Correo:** alu0101233093@ull.edu.es  
**Asignatura:** Desarrollo de sistemas informáticos  

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0101233093/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0101233093?branch=master)
[![Tests](https://github.com/alu0101233093/Testing_Project/actions/workflows/node.js.yml/badge.svg)](https://github.com/alu0101233093/Testing_Project/actions/workflows/node.js.yml)

## Índice
- [Creación del directorio de trabajo y tareas previas](#id0)
- [Debugger TypeScript en VSC](#id0.1)
- [Mocha y Chai - Programación TDD](#id0.2)
- [Documentación con TypeDoc](#id0.3)
- [Cubrimiento de código utilizando Instanbul y Coveralls](#id0.4)
- [Integración continua de código fuente TypeScript a través de GitHub Action](#id0.5)
- [Calidad y seguridad del código fuente mediante Sonar Cloud](#id0.6)

## Creación del directorio de trabajo y tareas previas<a name="id0"></a>
Antes de empezar el proyecto es necesario instalar diversos paquetes para tener una estructura de directorios adecuada. Para ello el primer paso es crear el directorio principal:
```bash
$mkdir P6
$cd P6/
```
Una vez dentro, ejecutaremos los siguientes comandos:
```bash
$npm init --yes
$npm install -D eslint eslint-config-google @typescript-eslint/eslint-plugin @typescript-eslint/parser
$tsc --init
$mkdir src
$touch README.md
```

Tras ejecutarlos habremos inicializado el Node Project Manager con la herramienta Eslint y el compilador de TypeScript. Además de crear el directorio donde estará almacenado el código y el fichero `README.md`.  
  
El siguiente paso es configurar el fichero `tsconfig.json` descomentando las siguientes lineas dentro del fichero:
- `rootDirs` se debe indicar el directorio `src` para almacenar el código principal, la carpeta `tests` será para almacenar las pruebas a la hora de programar en TDD.  
```json
"rootDirs": ["./src","./tests"]
```
- `declaration` se requerirá para usar el debugger.  
```json
"declaration": true
```  
- `sourceMap` se necesita cuando se exportan funciones.  
```json
"sourceMap": true
```
- `outDir` para almacenar los archivos compilados en un directorio concreto.  
```json
"outDir": "./dist"
```

Por último, faltaría iniciar el directorio git. Pero antes, crearemos el fichero `.gitignore` para evitar que git tenga en seguimiento lo que introduzcamos en dicho archivo.
```bash
$touch .gitignore
$cat .gitignore
node_modules/
dist/
package-lock.json
.vscode/
/coverage
/.nyc_output
```
Ahora si, y para finalizar, iniciaremos el repositorio git y añadiremos el remoto:
```bash
$git init
$git remote add origin git@github.com:ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct06-generics-solid-alu0101233093.git
```

## Debugger TypeScript en VSC<a name="id0.1"></a>
Para utilizar el debugger en nuestro proyecto pincharemos en el icono de la barra situada a la izquierda:  
  
![image](https://user-images.githubusercontent.com/72469549/156930570-8ada3bf7-a9b6-4ff4-acb3-77925e9298d6.png)
  
A continuación pinchamos en `cree un archivo launch.json` y se abrirá el siguiente menu desplegable:
  
![image](https://user-images.githubusercontent.com/72469549/156930748-8ce798ba-fa91-4f74-a026-1cb969c18514.png)

Seleccionaremos `Node.js` y se abrirá el fichero `launch.json`. En él solo habrá que cambiar la dirección de `outFiles`, quedaría de la siguiente manera:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/ejercicio1.ts",
            "outFiles": [
                "${workspaceFolder}/dist/**/*.js"
            ]
        }
    ]
}
```

Para debuggear un archivo, debe compilarse previamente y darle al botón verde en la parte superior.  
  
![image](https://user-images.githubusercontent.com/72469549/156931099-b62aecbb-80c9-441f-96dd-493d35cf9052.png)

## Mocha y Chai - Programación TDD<a name="id0.2"></a>

Para seguir el paradigma de programación dirigido por pruebas (TDD) instalaremos los paquetes Mocha y Chai, además de crear el directorio `tests` para almacenar las pruebas.  
```bash
$npm install -D mocha chai @types/mocha @types/chai ts-node
$mkdir tests
```
A continuación crearemos el fichero `.mocharc.json` para configurar Mocha con el siguiente contenido.
```json
{
	"extension": [
		"ts"
	],
	"spec": "tests/*.spec.ts",
	"require": "ts-node/register"
}
```
Por último, dentro del archivo `package.json`, cambiaremos la opción de test por Mocha. Quedaría de la siguiente manera:  
```json
{
  "name": "testingproyect",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0"
  }
}
```
Ahora solo faltaría crear los tests con la extensión `.spec.ts` dentro de la carpeta `tests`, y ejecutarlos con el siguiente comando:
```bash
$npm test
```

## Documentación con TypeDoc<a name="id0.3"></a>
El primer paso para realizar la documentación con la herramienta `TypeDoc` sería instalar la librería correspondiente:
```bash
$npm install -D typedoc
```
A continuación se debe crear el archivo `typedoc.json` para escribir la configuración con los parámetros necesarios, el contenido del fichero quedaría como se ve a continuación:
```json
{
    "entryPoints": [
        "./src/ejercicio-1",
        "./src/ejercicio-2"
    ],
    "out": "./docs"
}
```
Cabe destacar que en el parámetro `entryPoints` deben ir los ficheros que se van a documentar uno por uno.  
El paso siguiente sería escribir la documentación en nuestro código. Para ello debemos escribir `/**` encima de una función y nos aparecerá lo siguiente:  
  
![image_2022-03-08_19-23-34](https://user-images.githubusercontent.com/72469549/157311335-0db0a914-62f8-4cd4-b4da-18b6d01a6f03.png)

Teclearemos enter y se nos generará automáticamente una plantilla por defecto para escribir la documentación a cerca de la función.

![image](https://user-images.githubusercontent.com/72469549/157311857-05a84b71-e88b-4816-adb3-f05ca75f08fb.png)

El siguiente paso sería rellenarla, por ejemplo de la siguiente manera:

```typescript
/**
 * Saluda al mundo un número de veces determinado
 * @param veces Almacena el número de veces que se saludará
 * @returns La cadena con los saludos concatenados
 */
function hello(veces: number): string {
    let hi = "";
    for(let i = 0; i < veces; i++)
        hi += "¡Hello world! ";
    return hi;
}
```

Por último, debemos añadir al fichero `package.json` un parámetro que nos permitirá ejecutar la documentación con el comando `npm run doc` y se guardaría en `./docs`.  
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0",
    "typedoc": "^0.22.13"
  }
}
```

## Cubrimiento de código utilizando Instanbul y Coveralls<a name="id0.4"></a>

Primero instalaremos los paquetes y dependencias necesarios para usar la herramientas:

```bash
$npm install -D nyc coveralls
```

A continuación, añadiremos en el fichero `package.json` un script para realizar el cubrimiento de código. `"coverage": "nyc npm test"`.
El fichero quedaría de la siguiente manera:

```json
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha",
    "doc": "typedoc",
    "coverage": "nyc npm test"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/chai": "^4.3.0",
    "@types/mocha": "^9.1.0",
    "chai": "^4.3.6",
    "mocha": "^9.2.1",
    "ts-node": "^10.7.0",
    "typedoc": "^0.22.13"
  }
}
```

Para ejecutar este script simplemente introducimos por consola:
```bash
$npm run coverage
```

A continuación debemos entrar a la página web <a href = "http://www.coveralls.io/">coveralls.io</a> y habilitaremos el cubrimiento de código en nuestro proyecto.
(El proyecto debe estar en público para el uso de coveralls.io gratuito).

**Imagen de la página con el repositorio**

El siguiente paso sería añadir al script `coverage` en el fichero `package.json` el comando `nyc report --reporter=lcov`.
El script quedaría de la siguiente manera:

```json
"coverage": "nyc npm test && nyc report --reporter=lcov"
```

Ahora cuando ejecutemos por consola `npm run coverage` en la página del repositorio en `Coveralls` se nos mostrará la información del cubrimiento del código.
Para añadir el `Batch` del cubrimiento al `README.md` se copiará directamente de la página y se pegará en el fichero.

## Integración continua de código fuente TypeScript a través de GitHub Action<a name="id0.5"></a>

El primer paso es instalar el paquete TypeScript:

```
$npm install -D typescript
```

Una vez instalado, entraremos a la página del repositorio y nos dirigiremos a Actions, y dentro de dicho apartado bajaremos hasta Continuous integration.
![image](https://user-images.githubusercontent.com/72469549/160702017-d769658d-cfc4-4ecc-a0d5-ca4caa187c8f.png)  

Buscaremos `Node.js` y le daremos a `Set up this workflow`.

![image](https://user-images.githubusercontent.com/72469549/160702039-bf36ceec-f903-4155-8450-32a70b19f276.png)  

Una vez dentro es importante cambiar el final del fichero por el siguiente contenido:

```
steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
```

Y realizamos un commit para guardar el fichero generado. Opcionalmente se puede añadir un `badge` en al informe en las siguientes opciones:

![image](https://user-images.githubusercontent.com/72469549/160701932-68d8d9b2-d347-49eb-90c7-76736f17073f.png)

![image](https://user-images.githubusercontent.com/72469549/160701954-2845ea6d-4a1e-4aaf-88c6-31a35a0ee546.png)

A continuación crearemos el fichero `coveralls.yml` y le pondremos el siguiente contenido:

```yml
name: Coveralls

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Cloning repo
      uses: actions/checkout@v2
    - name: Use Node.js 16.x
      uses: actions/setup-node@v2
      with:
        node-version: 16.x
    - name: Installing dependencies
      run: npm install
    - name: Generating coverage information
      run: npm run coverage
    - name: Coveralls GitHub Action
      uses: coverallsapp/github-action@master
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}

```

Ahora con cada push se comprobarán los tests y el recubrimiento de código automáticamente y se podrá revisar en Github Actions.

## Integración continua de código fuente TypeScript a través de GitHub Action<a name="id0.6"></a>

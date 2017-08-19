<a href='https://coveralls.io/github/javiteri95/procareWebApp?branch=master'><img src='https://coveralls.io/repos/github/javiteri95/procareWebApp/badge.svg?branch=master' alt='Coverage Status' /></a>

## Para correr el proyecto
1) npm install
2) npm run build
3) npm start

## Analizador de codigo

Para el analisis de codigo usaremos JsHint

## Para pruebas

Para las pruebas usaremos mocha.js

## Links importantes
Entre los links de interes,

### Explicacion breve de la infraestructura del proyecto

https://groundberry.github.io/development/2016/11/04/build-your-node-app-with-express-and-sequelize.html 

### Joins como hacerlos en sequelize

http://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/ 

### Uso de mocha

http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WS9s9mg19Eb 

## Version

La version del proyecto actual es : 0.1.2
(Terminado el modulo procarianos y dos bugs resueltos)


## Documentacion

Cada clase y archivo del proyecto debe tener cuatro cosas:

* Una descripcion de lo que la clase o archivo hace
* Autor
* La fecha de creacion del documento
* La ultima modificacion del documento y quien lo hizo

EJ 

```

/*
@Descripcion: esta es una clase poligono
@Autor: jose viteri
@FechaCreacion: 19/05/2017
@UltimaFechaModificacion: 25/05/2017 @EdisonMora

*/
class Poligono {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
}
```

Esto tambien debe aplicarse a las funciones cuya funcionalidad no queda clara con su nombre

## Estandar de codificacion para el proyecto de procare

### Identacion

Dos espacios para la identacion

```
if (condicion){
  identacion
}
```

### Strings

Comillas dobles para strings con strings interiores, vease ejemplo :

```
$("<div class='hola'>")
```

comillas simples para strings sencillos
```
var a = 'hola mundo'
```

### Variables 

sin espacio despues de las keywords ( if , while, etc )

Se deben usar parentesis

```
if( condicion )
```

### Operadores infix

Debe haber espacio entre variable y operador
```

x = 2 

```

### Else statements

el else debe estar en la misma linea que la llave

```
if(condicion){

}else {

}
```

### Errores

SIEMPRE mandar el through error en las funciones y callbacks

```
if(err) throw error
```

### declaracion de variables

cada variable declarada en lineas separadas
```
var a = 34
var b = 54
```

### notacion de variables

Uso de notacion camello
```
variableCamello = 87 good

variable_camello = 87 bad 
```

### key spacing

Uso de espacios despues del dos puntos 
```
var obj = { 'key' : 'value' }    // ✗ avoid 
var obj = { 'key' :'value' }     // ✗ avoid 
var obj = { 'key':'value' }      // ✗ avoid 
var obj = { 'key': 'value' }     // ✓ ok 
```

### Los contructores de objetos con mayuscula 

```
function animal () {}
var dog = new animal()    // ✗ avoid 
 
function Animal () {}
var dog = new Animal()    // ✓ ok 

```

### Idioma

Las variables, funciones, y etc, deberan ser llamadas en español, PERO NO USAR caracteres especiales en su declaracion:

```
var variable = 5 OK

var niño = 'pepito' MAL

var ninno = 'pepito' OK

```

### Funciones

Comienzan en minuscula

```
function estoEsUnaFuncion(){

}

```

# Importante

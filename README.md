## Analizador de codigo

Para el analisis de codigo usaremos JsHint

## Documentacion

Cada clase y archivo del proyecto debe tener tres cosas:

* Una descripcion de lo que la clase o archivo hace
* La fecha de creacion del docuemnto
* La ultima modificacion del documento

EJ 

```

/*
@Descripcion: esta es una clase poligono
@Autor: jose viteri
@FechaCreacion: 19/05/2017
@UltimaFechaModificacion: 25/05/2017

*/
class Poligono {
  constructor(alto, ancho) {
    this.alto = alto;
    this.ancho = ancho;
  }
}
```

Esto tambien debe aplicarse a las funciones cuya fuincionalidad no queda clara con su nombre

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




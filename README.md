## Analizador de codigo

Para el analisis de codigo usaremos JsHint

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
### funciones

Comienzan en minucula




# Importante




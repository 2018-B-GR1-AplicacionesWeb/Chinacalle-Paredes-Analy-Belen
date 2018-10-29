const gestion = require('./ingresarCancion');

console.log('ingreso', gestion.guardarCancion('nombre7','autor7',2017));
gestion.imprimirListaCanciones();
gestion.buscarCancionPorNombre("nombre1");
gestion.buscarCancionPorNombre("corazones");
gestion.buscarCancionesPorAutor("autor6");


/*
{
  "ListaCanciones": [
    {
      "nombre": "nombre1",
      "autor": "autor1",
      "anio": "anio1"
    },
    {
      "nombre": "nombre4",
      "autor": "autor4",
      "anio": 2014
    }
  ]
}
 */

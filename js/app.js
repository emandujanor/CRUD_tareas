var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var crearTarea = function (tarea) {
  //console.log(tarea);
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id = tarea._id;
  // creamos la fila
  var $tr = $("<tr  />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);

  // creamos la celda del acciones
  var $accionesTd = $("<td />");
  var $spanDetalle= $("<span class='glyphicon-zoom-in'></span>");
  var $spanEditar= $("<span class='glyphicon-pencil'></span>");
  var $spanEliminar= $("<span class='glyphicon-remove-circle'></span>");
  $accionesTd.append($spanDetalle);
  $accionesTd.append($spanEditar);
  $accionesTd.append($spanEliminar);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($accionesTd);
  // agregamos filas a la tabla
  $tasksList.append($tr);

};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
  //var $botonesDetalle= $(".glyphicon-zoom-in");
  //var $botonesEditar= $(".glyphicon-pencil");
  //var $botonesEliminar= $(".glyphicon-remove-circle");	

 /* $($botonesDetalle).click(function(){var $this= this.name;
	alert("este es mi detalle" + $this);} );*/

}



var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });

};


$(document).ready(cargarPagina);

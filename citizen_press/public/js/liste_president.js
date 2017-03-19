$(document).ready(function() {
    $('#table_benevoles').DataTable( {
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         false,
        "language": {
          "info":           "_TOTAL_ bénévoles affichés au total",
          "search":         "Rechercher:"
      }
    } );
} );

//Requete Ajax
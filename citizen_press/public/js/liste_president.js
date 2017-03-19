/*$(document).ready(function() {
    $('#table_benevoles').DataTable( {
        "language": {
            "lengthMenu": "Afficher _MENU_ bénévoles par page",
            "zeroRecords": "Nous n'avons trouvé aucune demande de bénévoles, désolé",
            "info": "Page _PAGE_ sur _PAGES_",
            "infoEmpty": "Pas de bénévoles disponibles",
            "infoFiltered": "(Afficher _MAX_ bénévoles par pages)"
        }
    } );
} );
*/

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

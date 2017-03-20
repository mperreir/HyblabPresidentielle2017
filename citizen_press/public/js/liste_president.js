$(document).ready(function() {



    $(".assesseur_valide").hide();
    $(".scrutateur_valide").hide();
    $(".scrutateur_non_valide").hide();

    $('input[type=radio]').change(function(){
        isAssesseur = document.getElementById('assesseurs_filtre').checked;
        isScrutateur = document.getElementById('scrutateurs_filtre').checked;
        isEnCours = document.getElementById('en_cours_filtre').checked;
        isValide = document.getElementById('valide_filtre').checked;

        //Code optimisable via les paramètre de toggle et hide (pas le temps d'y réflechir)
        if(isAssesseur && isEnCours){
            $(".assesseur_valide").hide();
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").toggle();
        }else if (isAssesseur && isValide){
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").toggle();
        }else if(isScrutateur && isEnCours){
            $(".scrutateur_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").toggle();
        }else if (isScrutateur && isValide){
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".scrutateur_valide").toggle();
        }            
    });



    //Mise en forme de la table et du tri
    $('#table_benevoles').DataTable( {
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         false,
        "language": {
          "info":           "",//On affiche rien au lieu de "_TOTAL_ bénévoles affichés au total"
          "search":         "Rechercher:"
      }
    } );
} );

//Requete Ajax
$(document).ready(function() {



    $(".assesseur_valide").hide();
    $(".scrutateur_valide").hide();
    $(".scrutateur_non_valide").hide();
    $(".assesseur_non_valide").toggle(true);

    $('input[type=radio]').change(function(){
        isAssesseur = document.getElementById('assesseurs_filtre').checked;
        isScrutateur = document.getElementById('scrutateurs_filtre').checked;
        isEnCours = document.getElementById('en_cours_filtre').checked;
        isValide = document.getElementById('valide_filtre').checked;

        //En plus de cacher les lignes ou non en fonction de ce qui est demandé
        // Il faut modifier la case décision en fonction des diiférents cas, (2 demandes, 1 seule validée)
        // cf. Tableau "Liste président : Que afficher dans la case décision en fonction des différents cas et du filtrage demandé" sur le Google Drive des Dépouilleurs
        // 
        //Code optimisable via les paramètre de toggle et hide (pas le temps d'y réflechir)

        if(isAssesseur && isEnCours){
            $(".assesseur_valide").hide();
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").toggle(true);
            //cf.Tableau
            $(".assesseur_non_valide .decision").replaceWith('<td class="decision"><input type="button" id="ValiderAss" value="Valider"><input type="button" id="RefuserAss" value="Refuser"></td>');

        }else if (isAssesseur && isValide){
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").toggle(true);
            //cf. Tableau
            $(".assesseur_valide .decision").replaceWith("<td class=\"decision\">Validé</td>");

        }else if(isScrutateur && isEnCours){
            $(".scrutateur_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").toggle(true);
            //cf. Tableau
            $(".scrutateur_non_valide .decision").replaceWith('<td class="decision"><input type="button" id="ValiderScrut" value="Valider"><input type="button" id="RefuserScrut" value="Refuser"></td>');

        }else if (isScrutateur && isValide){
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".scrutateur_valide").toggle(true);
            //cf. Tableau
            $(".scrutateur_valide .decision").replaceWith('<td class="decision">Validé</td>');
        }            
    });

    miseEnFormeTable();


    //Mise en forme de la table et du tri
    function miseEnFormeTable(){
        $('#table_benevoles').DataTable( {
            "scrollY":        "200px",
            "scrollCollapse": true,
            "paging":         false,
            "language": {
              "info":           "",//On affiche rien au lieu de "_TOTAL_ bénévoles affichés au total"
              "search":         "Rechercher:"
          }
        } );
    }

} );

//Requete Ajax
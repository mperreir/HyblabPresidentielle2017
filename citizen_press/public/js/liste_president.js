$(document).ready(function() {

    //Clic sur les boutons valider    
    
    attribuerClics();

    function attribuerClics(){
        var idBureau = $('.idBureau').attr('id');
        console.log

        $('.boutonValider').click(function(event){
            valider(event.target.id,idBureau,event.target.name);
        });
    }

    function valider(idAssesseur,idBureau,typeBenevole){

        $.ajax({
            url: "/citizen_press/valider/"+idBureau+"/"+idAssesseur+"/"+typeBenevole,
            type: "GET",
            cache: false,
            timeout: 5000,

            success: function(data) {
            },
             error: function(xhr, status, error) {
                console.log(error);

             },
        });

        if (typeBenevole=="ValiderAss"){
            var tableRowToChange = $('#'+idAssesseur).closest('tr');
            tableRowToChange.removeClass('assesseur_non_valide');
            tableRowToChange.addClass('assesseur_valide');
            affichageLigne(true,false,true,false);                        
        }
        if (typeBenevole=="ValiderScrut"){
            var tableRowToChange = $('#'+idAssesseur).closest('tr');
            tableRowToChange.removeClass('scrutateur_non_valide');
            tableRowToChange.addClass('scrutateur_valide');
            affichageLigne(false,true,true,false);
        }
    }


    //Initialisation des lignes
    $(".assesseur_valide").hide();
    $(".scrutateur_valide").hide();
    $(".scrutateur_non_valide").hide();
    $(".assesseur_non_valide").toggle(true);


    //Changement du filtre
    $('input[type=radio]').change(function(){

        //En plus de cacher les lignes ou non en fonction de ce qui est demandé
        // Il faut modifier la case décision en fonction des diiférents cas, (2 demandes, 1 seule validée)
        // cf. Tableau "Liste président : Que afficher dans la case décision en fonction des différents cas et du filtrage demandé" sur le Google Drive des Dépouilleurs
        // 
        //Code optimisable via les paramètre de toggle et hide (pas le temps d'y réflechir)
        isAssesseur = document.getElementById('assesseurs_filtre').checked;
        isScrutateur = document.getElementById('scrutateurs_filtre').checked;
        isEnCours = document.getElementById('en_cours_filtre').checked;
        isValide = document.getElementById('valide_filtre').checked;

        affichageLigne(isAssesseur,isScrutateur,isEnCours,isValide);       
    });

    miseEnFormeTable();

    function affichageLigne(isAssesseur,isScrutateur,isEnCours,isValide){
        if(isAssesseur && isEnCours){
            $(".assesseur_valide").hide();
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").toggle(true);

            //cf.Tableau
            var classname = $(".assesseur_non_valide .decision .boutonValider");
            var classname2 = $(".assesseur_non_valide .decision");

            for (var i = 0; i < classname.length; i++) {
                idAsse = classname[i].id;
                classname2[i].innerHTML = ('<td class=\"decision\"><input type="button" class="boutonValider" id="'+ idAsse +'" name="ValiderAss" value="Valider"></td>');
            }
            attribuerClics();


        }else if (isAssesseur && isValide){
            $(".scrutateur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").toggle(true);
            //cf. Tableau

            var classname = $(".assesseur_valide .decision .boutonValider");
            var classname2 = $(".assesseur_valide .decision");

            for (var i = 0; i < classname.length; i++) {
                idAsse = classname[i].id;
                classname2[i].innerHTML = ('<td class="decision"><input type="hidden" class="boutonValider" id="'+ idAsse +'">Validé</td>');
            }
            attribuerClics();

        }else if(isScrutateur && isEnCours){
            $(".scrutateur_valide").hide();
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").toggle(true);
            //cf. Tableau

            var classname = $(".scrutateur_non_valide .decision .boutonValider");
            var classname2 = $(".scrutateur_non_valide .decision");

            for (var i = 0; i < classname.length; i++) {
                idAsse = classname[i].id;
                classname2[i].innerHTML = ('<td class=\"decision\"><input type="button" class="boutonValider" id="'+ idAsse +'" name="ValiderScrut" value="Valider"></td>');
            }
            attribuerClics();

        }else if (isScrutateur && isValide){
            $(".assesseur_non_valide").hide();
            $(".assesseur_valide").hide();
            $(".scrutateur_non_valide").hide();
            $(".scrutateur_valide").toggle(true);
            //cf. Tableau

            var classname = $(".scrutateur_valide .decision .boutonValider");
            var classname2 = $(".scrutateur_valide .decision");

            for (var i = 0; i < classname.length; i++) {
                idAsse = classname[i].id;
                classname2[i].innerHTML = ('<td class="decision"><input type="hidden" class="boutonValider" id="'+ idAsse +'">Validé</td>');
            }
            attribuerClics();
        }     
    }

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


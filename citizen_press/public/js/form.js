$( document ).ready(function() {
  $('#idBureau').hide();
  $('#scrutateur').hide();
  $('#assesseur').hide();

  $("#valider").click(function() {
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    var civilite = $("#civilite").val();
    var jour = $("#jour").val();
    var mois = $("#mois").val();
    var annee = $("#annee").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();

    var idBureau = $("#idBureau").val();
    var assesseur = $("#assesseur").val();
    var scrutateur = $("#scrutateur").val();

    var stringDate = annee + "-" + mois + '-' + jour;

    var naissance = getAge(stringDate);

    $.getJSON('/citizen_press/data/data2.json', function (data) {
        var idAsse = data.assesseurs[data.assesseurs.length-1];
        obj = {
          "id": idBureau,
          "nom": nom,
          "prenom": prenom,
          "age": naissance,
          "mail": email,
          "tel": mobile,
          "sexe": civilite,
          "potentiel_assesseur": assesseur,
          "potentiel_scrutateur": scrutateur
        }

    });
  });

  // Pour que les checkbox se comporte comme des radiobutton
  $("#check").change(function(){
		if (this.checked) {
			$("#check-bis").prop("checked", false);
		}
	});

	$("#check-bis").change(function(){
		if (this.checked) {
			$("#check").prop("checked", false);
		}
	});

  function addDays(selector){
    var i;
    selector.options[0] = new Option();
    for (i=1;i<=31;i++){
      selector.options[i] = new Option(i,i);
    }
  }
  function addYears(selector){
    var i;
    var j=2017;
    selector.options[0] = new Option();
    for (i=1;i<=108;i++){
      selector.options[i] = new Option(j,j);
      j--;
    }
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  //usage:
  addDays(document.getElementById("jour"));
  addYears(document.getElementById("annee"));
});

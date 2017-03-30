$( document ).ready(function() {
  //on cache les input pré rempli (informations des pages précédentes)
  $('#idBureau').hide();
  $('#scrutateur').hide();
  $('#assesseur').hide();

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

  //On ajoute les jours du select dynamiquement
  function addDays(selector){
    var i;
    selector.options[0] = new Option();
    for (i=1;i<=31;i++){
      selector.options[i] = new Option(i,i);
    }
  }
  //On ajoute les années du select dynamiquement
  function addYears(selector){
    var i;
    var j=2017;
    selector.options[0] = new Option();
    for (i=1;i<=108;i++){
      selector.options[i] = new Option(j,j);
      j--;
    }
  }
  //usage:
  addDays(document.getElementById("jour"));
  addYears(document.getElementById("annee"));
});

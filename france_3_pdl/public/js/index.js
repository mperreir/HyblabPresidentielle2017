
$(function(){
    $(window).bind('beforeunload',function($event){
        return 'Vous voulez vraiment actualiser ce page?'
    });
    window.app = new Vue({
      el: '#app',
      data: {
        title: 'TekiDepute',
        current_page_id: 'victory',
        deputes_list:[],
        current_depute: {},
        question_list:[],
        idx_question:0,
        depute_en_jeu:[],
        stack_depute_pop:[],
        depute_ideal:{},
        number:0,
        departement_compa:'',
        nb_circonscription_compa : "",
        depute_compa:{},
        depute_recherche:'',
        mini:99,
        dejaVu1:0,
        dejaVu2:0,
        dejaVu3:0
        },

        created : function(){
            var self = this;
            $(window).on('hashchange',function(){
                var page = location.href.match(/(?:#)(\w*)/);
                if(page){
                    self.current_page_id = page[1];

                    if(page[1] == 'jeu'){
                        self.idx_question = 0;
                    }

                }else{
                    self.current_page_id = "accueil";
                    self.goto_page('accueil');
                }

            })
            var page = location.href.match(/(?:#)(\w*)/);


            if(page){
                self.current_page_id = page[1];

                if(page[1] == 'jeu'){
                    self.idx_question = 0;
                }
                else if(page[1] == 'victory' || page[1] == 'comparaison' || page[1]=='fiche_depute'){
                    self.goto_page('jeu');
                }

            }else{
                self.current_page_id = "accueil";
                self.goto_page('accueil');
            }

            $.ajax({
                type:'get',
                dataType: 'json',
                url: "data/data.json?nocache="+new Date().getTime()
            }).then(function(data){
                self.deputes_list = data.deputes.depute;
                self.deputes_jeu =  data.deputes.depute;
                $('.depute_img').dimmer({on: 'hover'});
            }).fail(function(err){
                alert("error loading data");
                console.log(err);
            });
            //charger les questions
            $.ajax({
                type:'get',
                dataType: 'json',
                url: "data/questionflow.json?nocache="+new Date().getTime()
            }).then(function(data){
                self.question_list = data.questionflow.noeud;
            }).fail(function(err){
                alert("error loading question");
                console.log(err);
            });

        },
        updated:function(){
            $('.image').dimmer({
                on: 'hover'
            });
            var self = this;
            console.log(self.deputes_list);
            $('.ui.search').search({
                source: self.deputes_list,
                searchFields   : [
                  'slug'
                ],
                fields:{
                    title:'nom',
                    description:'sites_web'
                },
                searchFullText: true,
                maxResults:4,

                onSelect:function(result, response){
                    self.depute_compa = result;

                    document.querySelector("#container_comp_right").style.display="none";
                    document.querySelector("#depute_right").style.display="block";
                    return true;
                }
            });
        },
        methods:{
                goto_page:function(etape){
                    this.current_page_id = etape;
                    location.href = location.href.split('#')[0]+'#'+etape;

                },

                rejouer:function(){
                    this.number=0;
                    this.suivantLoader();
                    this.dejaVu = 0;
                },

                suivantLoader:function() {
                    var self = this;
                    this.goto_page('loader');
                    setTimeout(function(){
                        self.goto_page('jeu');
                    }, 1400);
                },


                ouvrir_info:function(depute, ele){
                    console.log(ele);
                },
                set_depute:function(depute){
                    this.current_depute = depute;
                },
                repondre:function(rep){

                    /*
                    if(!document.getElementById('retour_qestion').firstChild){
                        chevron = document.createTextNode('<');
                        document.getElementById('retour_qestion').appendChild(chevron);
                    }*/
                    //0 pour oui \ 1 pour non
                    var depute_a_rester = this.question_list[this.idx_question].question.reponses.reponse[rep].individus.individu;
                    //Pop depute
                    //
                    // for(depute in depute_en_jeu){
                    //     if(!depute in depute_a_rester){
                    //         depute_to_pop.push(depute);
                    //     }
                    // }

                    var depute_to_pop = _.filter(this.deputes_jeu,function(depute){
                        for(var i = 0;i< depute_a_rester.length;++i){
                            if(depute.slug === depute_a_rester[i]){
                                return false;
                            }
                        }
                        return true;
                    })


                    var popped_depute = [];
                    _.forEach(depute_to_pop,function(depute){
                        var ele = $('#'+depute.slug);
                        if(ele.data('fait') == 'oui'){

                        }else{
                            popped_depute.push(depute);
                            $('#'+depute.slug).transition('slide up', 300);
                            ele.data('fait','oui')
                        }

                        // $('#'+depute.slug).find('depute_img').attr('src', 'img/');
                    })
                    this.stack_depute_pop.push(popped_depute);


                    //Nouvelle question
                    if(this.get_next_question_id(rep) == 0 || this.get_next_question_id(rep) == -1){
                        if(typeof(depute_a_rester) == "string"){
                            for(var depute in this.deputes_list){
                                if(this.deputes_list[depute].slug == depute_a_rester){
                                    this.depute_ideal = this.deputes_list[depute];
                                }
                            }
                            this.goto_page('victory');
                        }else{
                            alert('erreur');
                        }
                    }else{
                        this.idx_question = this.get_next_question_id(rep);
                    }
                },
                get_next_question_id:function(rep){
                    return this.idtoindex(this.question_list[this.idx_question].question.reponses.reponse[rep]['next-noeud']['-id']);
                },
                retour:function(){
                    var retour = this.stack_depute_pop.pop();
                    _.forEach(retour,function(depute){
                        var ele = $('#'+depute.slug);
                        ele.transition('slide up', 300);
                        ele.data('fait','non');
                    })
                    this.idx_question = this.idtoindex((this.indextoid(this.idx_question) - this.indextoid(this.idx_question)%2)/2);
                },

                changerCarte:function(carte){


                            var carteRegion;

                            carteRegion = "#map_image_"+carte;
                            this.departement_compa = carte;

                            document.querySelector(carteRegion).style.display="block";
                            document.querySelector("#map_image_PDL").style.display="none";
                },
                typedownTip: function (e) {
                    console.log(_.filter(this.deputes_list,function(depute){
                        return depute.slug.match(e.target.value.toLowerCase());
                    }));
                },

                choixCircon:function(carte){


                    var departement;
                    departement = "#map_image_"+carte.substr(0,(carte.length)-1);
                    this.nb_circonscription_compa = carte.substr(-1);
                    if (this.nb_circonscription_compa == "0"){
                        this.nb_circonscription_compa ="10";
                    }
                    if (this.departement_compa == "Vendee" ){
                        this.departement_compa = "Vendée";
                    }

                    document.querySelector(departement).style.display="none";

                    document.querySelector("#container_comp_right").style.display="none";

                    for(var depute in this.deputes_list){
                        if((this.deputes_list[depute].num_circo == this.nb_circonscription_compa) && (this.deputes_list[depute].nom_circo == this.departement_compa)){
                            this.depute_compa = this.deputes_list[depute];
                        }
                    }
                    document.querySelector("#depute_right").style.display="block";

                    },

                retourCarte:function(){
                    document.querySelector("#depute_right").style.display="none";
                    document.querySelector("#map_image_Vendee").style.display="none";
                    document.querySelector("#map_image_Loire-Atlantique").style.display="none";
                    document.querySelector("#map_image_Maine-et-Loire").style.display="none";
                    document.querySelector("#map_image_Sarthe").style.display="none";
                    document.querySelector("#map_image_Mayenne").style.display="none";

                    
                    document.querySelector("#container_comp_right").style.display="block";
                    document.querySelector("#map_image_PDL").style.display="block";
                    
                },

                fermerAide:function(number){

                    if(number == 1){
                        document.querySelector("#aide1").style.display="none";
                        document.querySelector("#black1").style.display="none";
                        this.dejaVu1 = 1;
                    }else if(number == 2){
                        document.querySelector("#aide2").style.display="none";
                        document.querySelector("#black2").style.display="none";
                        this.dejaVu2 = 1;
                    }else {
                        document.querySelector("#aide3").style.display="none";
                        document.querySelector("#black3").style.display="none";
                        this.dejaVu3 = 1;
                        console.log(this.dejaVu);
                    }
                    
                },


                idtoindex:function(id){
                    var find = -1;
                    _.forEach(this.question_list, function(question, index){
                        if(question['-id'] == id)
                            find = index;
                    })
                    return find;
                },

                indextoid:function(idx){
                    return this.question_list[idx]['-id'];
                },


                open_fiche_depute:function(depute_fiche){
                    for(var depute in this.deputes_list){
                        if(this.deputes_list[depute].slug == depute_fiche){
                            this.current_depute = this.deputes_list[depute];
                        }
                    }
                    this.goto_page('fiche_depute');
                },
                useSlider:function(idx){
                    var list = [8,10,11,12,13,15,18];
                    for(var i = 0;i<list.length;++i){
                        if(list[i] == this.indextoid(idx)){
                            return true;
                        }

                    }
                    return false;

                },
                repondre_range:function(range){
                    var minIdx = 0;
                    var minNext = 0;
                    var minValue = 1000;
                    _.forEach(this.question_list[this.idx_question].question.reponses.reponse, function(reponse, index){
                        var decale =Math.abs(range - reponse['-rep']);
                        if(minValue > decale){
                            minValue = decale;
                            minIdx = index;
                            minNext = reponse['next-noeud']['-id'];
                        }
                    })
                    var depute_a_rester = this.question_list[this.idx_question].question.reponses.reponse[minIdx].individus.individu;
                    if(_.isArray(depute_a_rester)){
                        var depute_to_pop = _.filter(this.deputes_jeu,function(depute){
                            for(var i = 0;i< depute_a_rester.length;++i){
                                if(depute.slug === depute_a_rester[i]){
                                    return false;
                                }
                            }
                            return true;
                        })

                        var popped_depute = [];
                        _.forEach(depute_to_pop,function(depute){
                            var ele = $('#'+depute.slug);
                            if(ele.data('fait')){

                            }else{
                                popped_depute.push(depute);
                                $('#'+depute.slug).transition('slide up', 300);
                                ele.data('fait','oui');
                            }
                            // $('#'+depute.slug).find('depute_img').attr('src', 'img/');
                        })
                        this.stack_depute_pop.push(popped_depute);
                        this.idx_question = this.idtoindex(minNext);
                    }else if(_.isString(depute_a_rester)){
                        for(var depute in this.deputes_list){
                            if(this.deputes_list[depute].slug == depute_a_rester){
                                this.depute_ideal = this.deputes_list[depute];
                            }
                        }
                        this.goto_page('victory');
                    }else{
                        alert('type probleme');
                    }
                },

                previous_depute:function(slug){
                    for(var depute in this.deputes_list){
                        if(this.deputes_list[depute].slug == slug){
                            if(depute != 0){
                                this.open_fiche_depute(this.deputes_list[parseInt(depute)-1].slug);
                            }else{
                                this.open_fiche_depute(this.deputes_list[this.deputes_list.length-1].slug);
                            }
                        }
                    }
                },

                next_depute:function(slug){
                    for(var depute in this.deputes_list){
                        if(this.deputes_list[depute].slug == slug){
                            if(depute != this.deputes_list.length-1){
                                this.open_fiche_depute(this.deputes_list[parseInt(depute)+1].slug);
                            }else{
                                this.open_fiche_depute(this.deputes_list[0].slug);
                            }
                        }
                    }
                },

                hideNom:function(nom){
                    document.querySelector(nom).style.display="none";

                },

                afficheNom:function(nom){
                    document.querySelector(nom).style.display="block";
                },



                hideMandat:function(){
                    $( ".info_bulle_mandat" ).each(function() {
                        $( this ).hide();
                    });

                    $( ".cercle1").each(function(){
                        $(this).css("background-color","#c4d4e2");
                    });
                    $( ".cercle2").each(function(){
                        $(this).css("background-color","#8fb1c9");
                    });
                    $( ".cercle3").each(function(){
                        $(this).css("background-color","#7aa9c7");
                    });
                    $( ".cercle4").each(function(){
                        $(this).css("background-color","#4295c2");
                    });
                    this.mini=this.mini+1;
                },

                showMandat:function(number){
                    if(number == 1){
                        $( ".mandat1" ).each(function() {
                            $( this ).show();
                        });

                        $( ".mandat2" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat3" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat4" ).each(function() {
                            $( this ).hide();
                        });


                    $( ".cercle1").each(function(){
                        $(this).css("background-color","#c4d4e2");
                    });
                    $( ".cercle2").each(function(){
                        $(this).css("background-color","#8fb1c9");
                    });
                    $( ".cercle3").each(function(){
                        $(this).css("background-color","#7aa9c7");
                    });
                    $( ".cercle4").each(function(){
                        $(this).css("background-color","white");
                    });



                    }else if(number == 2){
                        $( ".mandat1" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat2" ).each(function() {
                            $( this ).show();
                        });

                        $( ".mandat3" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat4" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".cercle1").each(function(){
                            $(this).css("background-color","#c4d4e2");
                        });
                        $( ".cercle2").each(function(){
                            $(this).css("background-color","#8fb1c9");
                        });
                        $( ".cercle3").each(function(){
                            $(this).css("background-color","white");
                        });
                        $( ".cercle4").each(function(){
                            $(this).css("background-color","#4295c2");
                        });




                    }else if(number == 3){
                        $( ".mandat1" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat2" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat3" ).each(function() {
                            $( this ).show();
                        });

                        $( ".mandat4" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".cercle1").each(function(){
                            $(this).css("background-color","#c4d4e2");
                        });
                        $( ".cercle2").each(function(){
                            $(this).css("background-color","white");
                        });
                        $( ".cercle3").each(function(){
                            $(this).css("background-color","#7aa9c7");
                        });
                        $( ".cercle4").each(function(){
                            $(this).css("background-color","#4295c2");
                        });


                    }else{
                        $( ".mandat1" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat2" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat3" ).each(function() {
                            $( this ).hide();
                        });

                        $( ".mandat4" ).each(function() {
                            $( this ).show();
                        });


                        $( ".cercle1").each(function(){
                            $(this).css("background-color","white");
                        });
                        $( ".cercle2").each(function(){
                            $(this).css("background-color","#8fb1c9");
                        });
                        $( ".cercle3").each(function(){
                            $(this).css("background-color","#7aa9c7");
                        });
                        $( ".cercle4").each(function(){
                            $(this).css("background-color","#4295c2");
                        });

                    }

                    if (number>this.mini){
                            this.showMandat(this.mini);
                        }else{
                            this.mini = number;
                        }
                }

        }
    });
})

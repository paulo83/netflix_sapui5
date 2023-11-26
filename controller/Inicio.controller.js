sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],  
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {

                var menu = {
                    primeiro : "BEGIN",
                    segundo : "MOVIES",
                };
                var menuModel = new JSONModel();

                menuModel.setData(menu);

                var tela = this.getView();
                tela.setModel(menuModel , "ModeloMenu");

                var resultados = {
                    tltles : []
                };
                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel , "APIFilmes");

            },
            onPressLinkInicio: function(){
                alert("Você clicou em Início");
            },
            onPressLinkSeries: function() {
                alert("Você clicou em Séries");
            },
            onBuscar: function(){
                var query = this.byId("inputBuscar").getValue();
                //alert(query);
                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='+ query +'&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'da6307a46dmshda986b148bec4f4p1e2af6jsn4d2e8db7a9c5',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    var view = this.getView();
                    var model = view.getModel("APIFilmes");
                    var dados = model.getData();

                    dados.tltles = [];
                    dados.titles = response.titles;
                    model.refresh();
                }.bind(this) );
            }
        });
    });

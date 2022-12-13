sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/BusyIndicator","sap/m/Token","marathon/pp/princingui/utils/constants","sap/m/SearchField"],function(e,t,o,a,i,n,r,s,l,d){"use strict";return e.extend("marathon.pp.princingui.controller.createCust",{onInit:function(){this.oBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle();this.oDataModel=this.getOwnerComponent().getModel();var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("RoutecreateView").attachPatternMatched(this.onRouteCustomer,this);var t=new o;var a=[];t.setData(a);this.getView().setModel(t,"oCustModel")},onRouteCustomer:function(){var e=this.getOwnerComponent().getModel("oModel");console.log(e);this.getView().getModel("oCustModel").setProperty("/CustValHelp",e.oData.CustValHelp);this.getView().getModel("oCustModel").setProperty("/ProductData",e.oData.ProductData);this.getView().byId("idInputCustomerIDAdd").setValue(""),this.getView().byId("idInputCustomerNameAdd").setValue(""),this.getView().byId("idInputSHAdd").setValue(""),this.getView().byId("idInputSHNameAdd").setValue(""),this.getView().byId("idMultiComboBoxProductsAdd").removeAllTokens(),this.getView().byId("idInputEmailAdd").removeAllTokens(),this.getView().byId("daily_distribution").setSelected(false),this.getView().byId("on_demand_distribution").setSelected(false)},handleSearch:function(e){var t=e.getParameter("value");var o=[],a=[];if(t&&t.length>l.INTZERO){o.push(new i({filters:[new i({path:l.pathCus,operator:n.Contains,value1:t}),new i({path:l.pathCName,operator:n.Contains,value1:t}),new i({path:l.pathSH2,operator:n.Contains,value1:t}),new i({path:l.pathSHName2,operator:n.Contains,value1:t})],and:false}));a.push(new i({filters:o,and:true}))}var r=e.getSource().getBinding("items");r.filter([a])},handleConfirm:function(e){var t=e.getSource().getBinding("items");t.filter([]);var o=e.getParameter("selectedContexts");if(o&&o.length){this.getView().byId("idInputCustomerIDAdd").setValue(o.map(function(e){return e.getObject().Customer}));this.getView().byId("idInputCustomerNameAdd").setValue(o.map(function(e){return e.getObject().CustomerName}));this.getView().byId("idInputSHAdd").setValue(o.map(function(e){return e.getObject().Shipto}));this.getView().byId("idInputSHNameAdd").setValue(o.map(function(e){return e.getObject().ShiptoName}))}},onValueHelpRequestedcust:function(){var e=this.getView();if(!this.byId("openDialog")){a.load({id:e.getId(),name:l.fargmentCusF4,controller:this}).then(function(t){e.addDependent(t);t.open()})}else{this.byId("openDialog").open()}},onValueHelpCancelPress:function(){this.byId("openDialog").close()},onBack:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("RoutecontrolView")},onSaveCustomer:function(){r.show();var e=this.getView().byId("idInputCustomerIDAdd").getValue(),o=this.getView().byId("idInputCustomerNameAdd").getValue(),a=this.getView().byId("idInputSHAdd").getValue(),i=this.getView().byId("idInputSHNameAdd").getValue(),n=this.getView().byId("idMultiComboBoxProductsAdd").getTokens(),s=this.getView().byId("idInputEmailAdd").getTokens(),d=this,u=this.getView().byId("daily_distribution").getSelected(),c=[],h=this.getView().byId("on_demand_distribution").getSelected(),g="";if(e!==""&&o!==""&&a!==""&&i!==""&&n.length!==l.INTZERO&&s.length!==l.INTZERO){for(var p=l.INTZERO;p<n.length;p++){var m={Customer:e,ShipTo:a,Product:n[p].getKey()};c.push(m)}for(var V=l.INTZERO;V<s.length;V++){var f=s[V].getKey();if(V===l.INTZERO){g=f}else{g=g+l.spliter+f}}var w={Customer:e,ShipTo:a,CustomerName:o,ShipToName:i,DailyJob:u,OnDemandJob:h,EmailTo:g,ProductList:c};var C=JSON.stringify(w);this.oDataModel.callFunction("/createCustomer",{method:l.httpPost,urlParameters:{createData:C},success:function(e){r.hide();if(e.createCustomer.data){t.success(d.oBundle.getText("customerCreated",[e.createCustomer.data.Customer,e.createCustomer.data.ShipTo]),{onClose:function(e){if(e===t.Action.OK){d.onBack()}}})}else{t.error(d.oBundle.getText("techError"))}},error:function(e){r.hide();t.error(d.oBundle.getText("techError"),{details:e})}})}else{t.error(d.oBundle.getText("errormsgrequired"))}},onProductsValueHelpRequestedAdd:function(){this._oBasicSearchField=new d;this.oColModel=new o;var e={cols:[{label:"Product ID",template:"Product"},{label:"Product Name",template:"ProductName"}]};this.oProductsModel=this.getView().getModel("oCustModel");this.oColModel.setData(e);this._oValueHelpDialog=sap.ui.xmlfragment(l.fragmentProdVH,this);this.getView().addDependent(this._oValueHelpDialog);var t=this._oValueHelpDialog.getFilterBar();t.setFilterBarExpanded(false);t.setBasicSearch(this._oBasicSearchField);this._oBasicSearchField.attachSearch(function(){t.search()});this._oValueHelpDialog.getTableAsync().then(function(t){t.setModel(this.oProductsModel);t.setModel(this.oColModel,"columns");if(t.bindRows){t.bindAggregation("rows","/ProductData")}if(t.bindItems){t.bindAggregation("items","/ProductData",function(){return new ColumnListItem({cells:e.map(function(e){return new Label({text:"{"+e.template+"}"})})})})}this._oValueHelpDialog.update()}.bind(this));this._oValueHelpDialog.open()},onFilterBarSearchProd:function(e){var t=this._oBasicSearchField.getValue(),o=e.getParameter("selectionSet");var a=o.reduce(function(e,t){if(t.getValue()){if(t.getName()===l.prodID){e.push(new i({path:l.pathProd,operator:n.Contains,value1:t.getValue()}))}else if(t.getName()===l.prodName){e.push(new i({path:l.pathProdName,operator:n.Contains,value1:t.getValue()}))}}return e},[]);a.push(new i({filters:[new i({path:l.pathProd,operator:n.Contains,value1:t}),new i({path:l.pathProdName,operator:n.Contains,value1:t})],and:false}));this._filterTable(new i({filters:a,and:true}))},_filterTable:function(e){var t=this._oValueHelpDialog;t.getTableAsync().then(function(o){if(o.bindRows){o.getBinding("rows").filter(e)}if(o.bindItems){o.getBinding("items").filter(e)}t.update()})},onValueHelpOkPressProd:function(e){var t=e.getParameter("tokens");this.getView().byId("idMultiComboBoxProductsAdd").setTokens(t);this._oValueHelpDialog.close()},onValueHelpCancelPressProd:function(){this._oValueHelpDialog.close();this._oValueHelpDialog.destroy()},onEmailChangeAddCust:function(e){var t=this.getView().byId("idInputEmailAdd");var o=e.getParameters().value;var a=function(e){var o=e.text;var a=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!a.test(o)){t.setValueState(sap.ui.core.ValueState.Error)}else{t.setValueState(sap.ui.core.ValueState.None);return new s({key:o,text:o})}};if(o===""){t.setValueState(sap.ui.core.ValueState.None)}t.addValidator(a)},onEmailEnter:function(e){if(e.getSource().getValue().includes("\n")){this.onEmailChangeAddCust(e)}}})});
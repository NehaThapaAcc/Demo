sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/BusyIndicator","sap/ui/core/routing/Route","sap/m/Token","marathon/pp/princingui/utils/constants","sap/m/SearchField"],function(e,t,o,a,i,r,n,s,u,d,l){"use strict";var c;return e.extend("marathon.pp.princingui.controller.createCust",{onInit:function(){this.oBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle();this.oDataModel=this.getOwnerComponent().getModel();var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("RoutecreateView").attachPatternMatched(this.onRouteCustomer,this);var t=new o;var a={ProductValHelp:[{Customer:"4725",ShipTo:"4726",Product:"200000001",ProductName:"Product1",Selected:"X"},{Customer:"4725",ShipTo:"4726",Product:"200000001",ProductName:"Product1",Selected:"X"}]};t.setData(a);debugger;this.getView().setModel(t,"oCustModel");this.getCustomerDetails2();this.getF4Product2()},getCustomerDetails2:function(){var e=this;debugger;this.oDataModel.callFunction("/getOnPremCustomerF4",{method:"GET",success:function(t){e.getView().getModel("oCustModel").setProperty("/CustValHelp",t.getOnPremCustomerF4.data);n.hide()},error:function(e){n.hide();t.error("errorTechnical",{details:e})}})},getF4Product2:function(){var e=this;this.oDataModel.callFunction("/getOnPremProductF4",{method:"GET",success:function(t){debugger;e.getView().getModel("oCustModel").setProperty("/ProductValHelp",t.getOnPremProductF4.data);n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},onRouteCustomer:function(){this.getView().byId("idInputCustomerIDAdd").setValue(""),this.getView().byId("idInputCustomerNameAdd").setValue(""),this.getView().byId("idInputSHAdd").setValue(""),this.getView().byId("idInputSHNameAdd").setValue(""),this.getView().byId("idMultiComboBoxProductsAdd").removeAllTokens(),this.getView().byId("idInputEmailAdd").removeAllTokens(),this.getView().byId("daily_distribution").setSelected(false),this.getView().byId("on_demand_distribution").setSelected(false)},handleSearch:function(e){var t=e.getParameter("value");var o=[],a=[];if(t&&t.length>d.INTZERO){o.push(new i({filters:[new i({path:"Customer",operator:r.Contains,value1:t}),new i({path:"CustomerName",operator:r.Contains,value1:t}),new i({path:"Shipto",operator:r.Contains,value1:t}),new i({path:"ShiptoName",operator:r.Contains,value1:t})],and:false}));a.push(new i({filters:o,and:true}))}var n=e.getSource().getBinding("items");n.filter([a])},handleConfirm:function(e){var t=e.getSource().getBinding("items");t.filter([]);var o=e.getParameter("selectedContexts");if(o&&o.length){this.getView().byId("idInputCustomerIDAdd").setValue(o.map(function(e){return e.getObject().Customer}));this.getView().byId("idInputCustomerNameAdd").setValue(o.map(function(e){return e.getObject().CustomerName}));this.getView().byId("idInputSHAdd").setValue(o.map(function(e){return e.getObject().Shipto}));this.getView().byId("idInputSHNameAdd").setValue(o.map(function(e){return e.getObject().ShiptoName}))}},handleClose:function(){},onValueHelpRequestedcust:function(e){var t=this.getView();if(!this.byId("openDialog")){a.load({id:t.getId(),name:"marathon.pp.princingui.fragments.customerF4",controller:this}).then(function(e){t.addDependent(e);e.open()})}else{this.byId("openDialog").open()}},onValueHelpCancelPress:function(){this.byId("openDialog").close()},onBack:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("RoutecontrolView")},onSaveCustomer:function(){n.show();var e=this.getView().byId("idInputCustomerIDAdd").getValue(),o=this.getView().byId("idInputCustomerNameAdd").getValue(),a=this.getView().byId("idInputSHAdd").getValue(),i=this.getView().byId("idInputSHNameAdd").getValue(),r=this.getView().byId("idMultiComboBoxProductsAdd").getTokens(),s=this.getView().byId("idInputEmailAdd").getTokens(),u=this,l=this.getView().byId("daily_distribution").getSelected(),c=[],h=this.getView().byId("on_demand_distribution").getSelected(),g="";if(e!==""&&o!==""&&a!==""&&i!==""&&r.length!==d.INTZERO&&s.length!==d.INTZERO){for(var p=d.INTZERO;p<r.length;p++){var m={Customer:e,ShipTo:a,Product:r[p].getKey(),ProductName:r[p].getText()};c.push(m)}for(var f=d.INTZERO;f<s.length;f++){var V=s[f].getKey();if(f===d.INTZERO){g=V}else{g=g+";"+V}}var w={Customer:e,ShipTo:a,CustomerName:o,ShipToName:i,DailyJob:l,OnDemandJob:h,EmailTo:g,ProductList:c};var C=JSON.stringify(w);this.oDataModel.callFunction("/createCustomer",{method:d.httpPost,urlParameters:{createData:C},success:function(e){debugger;n.hide();if(e.createCustomer.data[d.INTZERO]){t.success(u.oBundle.getText("customerCreated",[e.createCustomer.data[d.INTZERO].data.Customer]),{onClose:function(e){if(e===t.Action.OK){u.onBack()}}})}else{t.error(e.createCustomer.data.message)}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}});var I=sap.ui.core.UIComponent.getRouterFor(this);I.navTo("RoutecontrolView");t.success("Saved Successfully")}else{t.error("Kindly fill the mandatory fields")}},onProductsValueHelpRequestedAdd:function(){this._oBasicSearchField=new l;this.oColModel=new o;var e={cols:[{label:"Product ID",template:"Product"},{label:"Product Name",template:"ProductName"}]};this.oProductsModel=this.getView().getModel("oCustModel");this.oColModel.setData(e);this._oValueHelpDialog=sap.ui.xmlfragment("marathon.pp.princingui.fragments.productListVH",this);this.getView().addDependent(this._oValueHelpDialog);var t=this._oValueHelpDialog.getFilterBar();t.setFilterBarExpanded(false);t.setBasicSearch(this._oBasicSearchField);this._oBasicSearchField.attachSearch(function(){t.search()});this._oValueHelpDialog.getTableAsync().then(function(t){t.setModel(this.oProductsModel);t.setModel(this.oColModel,"columns");if(t.bindRows){t.bindAggregation("rows","/ProductValHelp")}if(t.bindItems){t.bindAggregation("items","/ProductValHelp",function(){return new ColumnListItem({cells:e.map(function(e){return new Label({text:"{"+e.template+"}"})})})})}this._oValueHelpDialog.update()}.bind(this));this._oValueHelpDialog.open()},onFilterBarSearchProd:function(e){var t=this._oBasicSearchField.getValue(),o=e.getParameter("selectionSet");var a=o.reduce(function(e,t){if(t.getValue()){if(t.getName()==="Product ID"){e.push(new i({path:"Product",operator:r.Contains,value1:t.getValue()}))}else if(t.getName()==="Product Name"){e.push(new i({path:"ProductName",operator:r.Contains,value1:t.getValue()}))}}return e},[]);a.push(new i({filters:[new i({path:"Product",operator:r.Contains,value1:t}),new i({path:"ProductName",operator:r.Contains,value1:t})],and:false}));this._filterTable(new i({filters:a,and:true}))},_filterTable:function(e){var t=this._oValueHelpDialog;t.getTableAsync().then(function(o){if(o.bindRows){o.getBinding("rows").filter(e)}if(o.bindItems){o.getBinding("items").filter(e)}t.update()})},onValueHelpOkPressProd:function(e){var t=e.getParameter("tokens");this.getView().byId("idMultiComboBoxProductsAdd").setTokens(t);this._oValueHelpDialog.close()},onValueHelpCancelPressProd:function(){this._oValueHelpDialog.close();this._oValueHelpDialog.destroy()},onEmailChangeAddCust:function(){var e=this.getView().byId("idInputEmailAdd");var t=function(t){var o=t.text;var a=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!a.test(o)){e.setValueState(sap.ui.core.ValueState.Error)}else{e.setValueState(sap.ui.core.ValueState.None);return new u({key:o,text:o})}};e.addValidator(t)},onEmailChangeAddCust:function(){var e=this.getView().byId("idInputEmailAdd");var t=function(t){var o=t.text;var a=o.split("@");var i=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!i.test(o)||a[1]!=="marathonpetroleum.com"){e.setValueState(sap.ui.core.ValueState.Error)}else{e.setValueState(sap.ui.core.ValueState.None);return new u({key:o,text:o})}};e.addValidator(t)}})});
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/BusyIndicator","sap/ui/core/routing/Route","marathon/pp/princingui/utils/constants","sap/m/SearchField"],function(e,t,o,i,a,r,s,n,l,u){"use strict";return e.extend("marathon.pp.princingui.controller.editCust",{onInit:function(){this.oBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle();this.oDataModelE=this.getOwnerComponent().getModel();var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("RouteEditView").attachPatternMatched(this.onRouteEditCustomer,this)},onRouteEditCustomer:function(e){var t=new o;var i=JSON.parse(e.getParameter("arguments").Data);this.getView().byId("idInputCustomerID").setValue(i[l.INTZERO].Customer);this.getView().byId("idInputCustomerName").setValue(i[l.INTZERO].CustomerName);this.getView().byId("idInputShipToID").setValue(i[l.INTZERO].ShipTo);this.getView().byId("idInputShipToName").setValue(i[l.INTZERO].ShipToName);var a=[];if(i[l.INTZERO].ProductList.length!=l.INTZERO){for(var r=l.INTZERO;r<i[l.INTZERO].ProductList.length;r++){var s=new sap.m.Token({key:i[l.INTZERO].ProductList[r].Product,text:i[l.INTZERO].ProductList[r].ProductName});a=[s]}this.getView().byId("idMultiComboBoxProducts").setTokens(a)}t.setData({items:i[l.INTZERO].EmailArray});this.getView().setModel(t,"detailModel");this.getView().byId("idInputEmail").setModel(t,"detailModel");this.getView().byId("idCheckBoxDaily").setSelected(i[l.INTZERO].DailyJob);this.getView().byId("idCheckBoxOnDemand").setSelected(i[l.INTZERO].OnDemandJob);this.getF4Product2()},getF4Product2:function(){var e=this;this.oDataModelE.callFunction("/getOnPremProductF4",{method:"GET",success:function(t){debugger;e.getView().getModel("detailModel").setProperty("/ProductValHelp",t.getOnPremProductF4.data);s.hide()},error:function(e){s.hide();t.error("Technical error has occurred ",{details:e})}})},handleSearch:function(e){var t=e.getParameter("value");var o=[],i=[];if(t&&t.length>l.INTZERO){o.push(new a({filters:[new a({path:"Customer",operator:r.Contains,value1:t}),new a({path:"CustomerName",operator:r.Contains,value1:t}),new a({path:"Shipto",operator:r.Contains,value1:t}),new a({path:"ShiptoName",operator:r.Contains,value1:t})],and:false}));i.push(new a({filters:o,and:true}))}var s=e.getSource().getBinding("items");s.filter([i])},onPressSaveEditCust:function(){var e=this.getView().byId("idInputCustomerID").getValue(),o=this.getView().byId("idInputCustomerName").getValue(),i=this.getView().byId("idInputShipToID").getValue(),a=this.getView().byId("idInputShipToName").getValue(),r=this.getView().byId("idMultiComboBoxProducts").getTokens(),n=this.getView().byId("idInputEmail").getTokens(),u=this,d=this.getView().byId("idCheckBoxDaily").getSelected(),c=[],h=this.getView().byId("idCheckBoxOnDemand").getSelected(),g="";if(e!==""&&o!==""&&i!==""&&a!==""&&r.length!==l.INTZERO&&n.length!==l.INTZERO){s.show();for(var p=l.INTZERO;p<r.length;p++){var m={Customer:e,ShipTo:i,Product:r[p].getKey(),ProductName:r[p].getText()};c.push(m)}for(var I=l.INTZERO;I<n.length;I++){var V=n[I].getKey();if(I===l.INTZERO){g=V}else{g=g+";"+V}}var f={Customer:e,ShipTo:i,CustomerName:o,ShipToName:a,DailyJob:d,OnDemandJob:h,EmailTo:g,ProductList:c};var u=this;var w=JSON.stringify(f);this.oDataModelE.callFunction("/updateCustomer",{method:l.httpPost,urlParameters:{createData:w},success:function(e){if(e.createCustomer.data[l.INTZERO]){t.success(u.oBundle.getText("savedSucc"),{onClose:function(e){if(e===t.Action.OK){u.onBack();s.hide()}}})}else{t.error(e.createCustomer.data.message)}}})}else{t.error("Kindly fill the mandatory fields")}},onBack:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("RoutecontrolView")},onEmailChangeEditCust:function(){var e=this.getView().byId("idInputEmail");var t=function(t){var o=t.text;var i=o.split("@");var a=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!a.test(o)||i[1]!=="marathonpetroleum.com"){e.setValueState(sap.ui.core.ValueState.Error)}else{e.setValueState(sap.ui.core.ValueState.None);return new Token({key:o,text:o})}};e.addValidator(t)},onProductsValueHelpRequested:function(){this._oBasicSearchField=new u;this.oColModel=new o;var e={cols:[{label:"Product ID",template:"Product"},{label:"Product Name",template:"ProductName"}]};this.oProductsModel=this.getView().getModel("detailModel");this.oColModel.setData(e);this._oValueHelpDialog=sap.ui.xmlfragment("marathon.pp.princingui.fragments.productListVH",this);this.getView().addDependent(this._oValueHelpDialog);var t=this._oValueHelpDialog.getFilterBar();t.setFilterBarExpanded(false);t.setBasicSearch(this._oBasicSearchField);this._oBasicSearchField.attachSearch(function(){t.search()});this._oValueHelpDialog.getTableAsync().then(function(t){t.setModel(this.oProductsModel);t.setModel(this.oColModel,"columns");if(t.bindRows){t.bindAggregation("rows","/ProductValHelp")}if(t.bindItems){t.bindAggregation("items","/ProductValHelp",function(){return new ColumnListItem({cells:e.map(function(e){return new Label({text:"{"+e.template+"}"})})})})}this._oValueHelpDialog.update()}.bind(this));this._oValueHelpDialog.setTokens(this.getView().byId("idMultiComboBoxProducts").getTokens());this._oValueHelpDialog.open()},onFilterBarSearchProd:function(e){var t=this._oBasicSearchField.getValue(),o=e.getParameter("selectionSet");var i=o.reduce(function(e,t){if(t.getValue()){if(t.getName()==="Product ID"){e.push(new a({path:"Product",operator:r.Contains,value1:t.getValue()}))}else if(t.getName()==="Product Name"){e.push(new a({path:"ProductName",operator:r.Contains,value1:t.getValue()}))}}return e},[]);i.push(new a({filters:[new a({path:"Product",operator:r.Contains,value1:t}),new a({path:"ProductName",operator:r.Contains,value1:t})],and:false}));this._filterTable(new a({filters:i,and:true}))},_filterTable:function(e){var t=this._oValueHelpDialog;t.getTableAsync().then(function(o){if(o.bindRows){o.getBinding("rows").filter(e)}if(o.bindItems){o.getBinding("items").filter(e)}t.update()})},onValueHelpOkPressProd:function(e){var t=e.getParameter("tokens");this.getView().byId("idMultiComboBoxProducts").setTokens(t);this._oValueHelpDialog.close()},onValueHelpCancelPressProd:function(){this._oValueHelpDialog.close();this._oValueHelpDialog.destroy()},onValueHelpAfterClose:function(){this._oValueHelpDialog.destroy()}})});
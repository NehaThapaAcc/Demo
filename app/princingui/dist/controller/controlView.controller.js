sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/core/BusyIndicator","sap/base/Log","sap/ui/table/library","sap/m/MessageToast","sap/ui/core/format/DateFormat","sap/ui/thirdparty/jquery","sap/m/Token","marathon/pp/princingui/utils/formatter","marathon/pp/princingui/utils/constants","sap/m/SearchField"],function(e,t,i,a,o,r,n,s,d,l,u,c,h,g,m,p){"use strict";var f;return e.extend("marathon.pp.princingui.controller.controlView",{formatter:g,onInit:function(){this.oBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle();this.oDataModelT=this.getOwnerComponent().getModel();n.show();var e=new i;var t=[];e.setData(t);this.getView().setModel(e,"oModel");this.getOwnerComponent().setModel(e,"oModel");this.getView().byId("idMultiInputTerminal").setModel(e,"oModel");this.getView().byId("idDatePickerOnDemand").setMinDate(new Date);this.getView().byId("idDatePickerSuspend").setMinDate(new Date);this.getView().byId("idDatePicker2Suspend").setMinDate(new Date);var a=sap.ui.core.UIComponent.getRouterFor(this);a.getRoute("RoutecontrolView").attachPatternMatched(this.onRouteControl,this);this.getTerminalDetails();this.getProductDetails();this.getF4Customer();this.getF4Terminal();this.getF4Product();this.getCCEmails()},onRouteControl:function(e){this.getCustomerDetails()},getCCEmails:function(){var e=this;this.oDataModelT.callFunction("/getOnCCEmail",{method:"GET",success:function(t){var i=t.getOnCCEmail.data,a;if(i!=undefined){if(i.length!=m.INTZERO){a=i[m.INTZERO].Value.split(";")}}e.getView().getModel("oModel").setProperty("/emailsCC",a);n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getTerminalDetails:function(){var e=this;this.oDataModelT.callFunction("/getTerminalDetails",{method:"GET",success:function(t){if(t.getTerminalDetails.data){e.getView().getModel("oModel").setProperty("/TerminalData",t.getTerminalDetails.data);e.getView().byId("idTitleTerminal").setText(e.oBundle.getText("comTerText",[t.getTerminalDetails.data.length]))}n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getProductDetails:function(){var e=this;this.oDataModelT.callFunction("/getOnPremProductDetails",{method:"GET",success:function(t){if(t.getOnPremProductDetails.data){e.getView().getModel("oModel").setProperty("/ProductData",t.getOnPremProductDetails.data);e.getView().byId("idTitleProduct").setText(e.oBundle.getText("comProText",[t.getOnPremProductDetails.data.length]))}n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getCustomerDetails:function(){var e=this;this.oDataModelT.callFunction("/getCustomerDetails",{method:"GET",success:function(t){debugger;var i=[];var a=t.getCustomerDetails.data;if(a){e.getView().byId("idTitleCustomer").setText(e.oBundle.getText("comCusText",[t.getCustomerDetails.data.length]));for(var o=m.INTZERO;o<a.length;o++){var r=a[o].EmailTo.split(";"),s=[],d;for(var l=m.INTZERO;l<r.length;l++){var u={};u.email=r[l];s.push(u)}if(a[o].ProductList.results.length!=m.INTZERO){d=a[o].ProductList.results[m.INTZERO].Product}var c={};c={CountEmail:a[o].CountEmail,CountProduct:a[o].CountProduct,Customer:a[o].Customer,CustomerName:a[o].CustomerName,DailyJob:a[o].DailyJob,EmailTo:a[o].EmailTo,OnDemandJob:a[o].OnDemandJob,ProductList:a[o].ProductList,ProductFirst:d,ShipTo:a[o].ShipTo,ShipToName:a[o].ShipToName,EmailArray:s};i.push(c)}e.getView().getModel("oModel").setProperty("/CustomerData",i);n.hide()}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getF4Customer:function(){var e=this;this.oDataModelT.callFunction("/getOnPremCustomerF4",{method:"GET",success:function(t){e.getView().getModel("oModel").setProperty("/CustValHelp",t.getOnPremCustomerF4.data);n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getF4Terminal:function(){var e=this;this.oDataModelT.callFunction("/getOnPremTerminalF4",{method:"GET",success:function(t){e.getView().getModel("oModel").setProperty("/TerminalValHelp",t.getOnPremTerminalF4.data);n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},getF4Product:function(){var e=this;this.oDataModelT.callFunction("/getOnPremProductF4",{method:"GET",success:function(t){e.getView().getModel("oModel").setProperty("/ProductValHelp",t.getOnPremProductF4.data);n.hide()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})},handleSelectionChangeTerF4:function(){},handleSelectionFinishTerF4:function(){},onDeleteCustomer:function(){var e=this.getView().byId("idProductsTable"),i=this;var a=e.indexOfItem(e.getSelectedItem());var o=this.getView().getModel("oModel").getProperty("/CustomerData");if(a!==-1){var r=o[a];t.confirm(i.oBundle.getText("customerDeleted",[r.Customer]),{onClose:function(e){if(e==="OK"){n.show();i.oDataModelT.callFunction("/deleteCustomer",{method:"POST",urlParameters:{customer:r.Customer,shipTo:r.ShipTo},success:function(e){n.hide();l.show(i.oBundle.getText("delSucc"));i.getCustomerDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(i.oBundle.getText("delCheck"))}},onDeleteCustomerPopout:function(){var e=this.getView().byId("idTablePopout"),i=this;var a=e.indexOfItem(e.getSelectedItem());var o=this.getView().getModel("oModel").getProperty("/CustomerData");if(a!==-1){var r=o[a];t.confirm(i.oBundle.getText("customerDeleted",[r.Customer]),{onClose:function(e){if(e==="OK"){n.show();i.oDataModelT.callFunction("/deleteCustomer",{method:"POST",urlParameters:{customer:r.Customer,shipTo:r.ShipTo},success:function(e){n.hide();l.show(i.oBundle.getText("delSucc"));i.getCustomerDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(i.oBundle.getText("delCheck"))}},onSwtichChange:function(e){var i=e.getSource().getState(),a=this.getView().byId("idTimePickerInput").getValue();debugger;if(i===false){this.getView().byId("idTimePickerInput").setEnabled(true);this.getView().byId("idInfoLabel").setText("InActive");this.getView().byId("idInfoLabel").setColorScheme(1)}else{n.show();this.getView().byId("idTimePickerInput").setEnabled(false);this.getView().byId("idInfoLabel").setColorScheme(7);this.getView().byId("idInfoLabel").setText("Active");this.getView().byId("idTextDailyST").setText(a);this.oDataModelT.callFunction("/createSchedule",{method:"GET",urlParameters:{time:"8:00pm"},success:function(e){n.hide();t.success(e.createSchedule);debugger},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}},onValueHelpRequested:function(){this._oBasicSearchField=new p;this.oColModel=new i;var e={cols:[{label:"Customer ID",template:"Customer"},{label:"Customer Name",template:"CustomerName"},{label:"Ship-To",template:"Shipto"},{label:"Ship-To Name",template:"ShiptoName"}]};this.oColModel.setData(e);this._oValueHelpDialogCust=sap.ui.xmlfragment("marathon.pp.princingui.fragments.CustomerListVH",this);this.getView().addDependent(this._oValueHelpDialogCust);var t=this._oValueHelpDialogCust.getFilterBar();t.setFilterBarExpanded(false);t.setBasicSearch(this._oBasicSearchField);this._oBasicSearchField.attachSearch(function(){t.search()});this.valueHelpModel=this.getView().getModel("oModel");this._oValueHelpDialogCust.getTableAsync().then(function(t){t.setModel(this.valueHelpModel);t.setModel(this.oColModel,"columns");if(t.bindRows){t.bindAggregation("rows","/CustValHelp")}if(t.bindItems){t.bindAggregation("items","/CustValHelp",function(){return new ColumnListItem({cells:e.map(function(e){return new Label({text:"{"+e.template+"}"})})})})}this._oValueHelpDialogCust.update()}.bind(this));this._oValueHelpDialogCust.setTokens(this.getView().byId("idMultiInputCustomer").getTokens());this._oValueHelpDialogCust.open()},onValueHelpOkPress:function(e){var t=e.getParameter("tokens");this.getView().byId("idMultiInputCustomer").setTokens(t);this._oValueHelpDialogCust.close()},onValueHelpCancelPress:function(){this._oValueHelpDialogCust.close()},onValueHelpAfterClose:function(){this._oValueHelpDialogCust.destroy()},handleTableSelectDialogPress:function(e){var t=e.getSource(),i=this.getView();if(!this.byId("custTable")){a.load({id:i.getId(),name:"marathon.pp.princingui.fragments.tablePopout",controller:this}).then(function(e){i.addDependent(e);e.open()})}else{this.byId("custTable").open()}},handleProductTableSelectDialogPress:function(e){var t=e.getSource(),i=this.getView();if(!this.byId("prodTable")){a.load({id:i.getId(),name:"marathon.pp.princingui.fragments.tableProdPopout",controller:this}).then(function(e){i.addDependent(e);e.open()})}else{this.byId("prodTable").open()}},handleTerminalTableSelectDialogPress:function(e){var t=this.getView();if(!this.byId("terTable")){a.load({id:t.getId(),name:"marathon.pp.princingui.fragments.tableTerPopout",controller:this}).then(function(e){t.addDependent(e);e.open()})}else{this.byId("terTable").open()}},handleEmailPopoverPress:function(e){var t=e.getSource(),o=this.getView(),r=e.getSource().getParent().getParent().getBindingContextPath(),n=r.length,s=n-1,d=r.slice(s),l=this.getView().getModel("oModel").getProperty("/CustomerData")[d],u=new i;u.setData(l.EmailArray);if(!this._pPopoverEmail){this._pPopoverEmail=a.load({id:o.getId(),name:"marathon.pp.princingui.fragments.emailPopover",controller:this}).then(function(e){o.addDependent(e);return e})}this._pPopoverEmail.then(function(e){e.openBy(t);e.setModel(u)})},handlePopoverPress:function(e){var t=e.getSource(),o=this.getView(),r=e.getSource().getParent().getParent().getBindingContextPath(),n=r.length,s=n-1,d=r.slice(s),l=this.getView().getModel("oModel").getProperty("/CustomerData")[d],u=new i;u.setData(l.ProductList);if(!this._pPopover){this._pPopover=a.load({id:o.getId(),name:"marathon.pp.princingui.fragments.productPopover",controller:this}).then(function(e){o.addDependent(e);return e})}this._pPopover.then(function(e){e.openBy(t);e.setModel(u)})},handleTerminalSelectDialogPress:function(){var e=this.getView();if(!this.byId("addTerminal")){a.load({id:e.getId(),name:"marathon.pp.princingui.fragments.addTerminal",controller:this}).then(function(t){e.addDependent(t);t.open();t.setTitle("Add Terminal")})}else{this.byId("addTerminal").open();oDialog.setTitle("Add Terminal")}},onTerminalClose:function(e){this.byId("addTerminal").close();this.byId("addTerminal").destroy()},handleEditTerminalSelectDialogPress:function(){var e=this.getView().byId("idTableTerminal");var i=this.getView().getModel("oModel").getProperty("/TerminalData");var o=e.indexOfItem(e.getSelectedItem());if(o!==-1){var r=i[o];var n=this.getView();if(!this.byId("addTerminal")){a.load({id:n.getId(),name:"marathon.pp.princingui.fragments.addTerminal",controller:this}).then(function(e){n.addDependent(e);e.open();e.setTitle("Edit Terminal");var t=sap.ui.core.Fragment.byId(n.getId(),"idInputTerminalID");t.setEnabled(false);sap.ui.core.Fragment.byId(n.getId(),"idInputTerminalID").setValue(r.Terminal);sap.ui.core.Fragment.byId(n.getId(),"idInputTerminalName").setValue(r.TerminalName);sap.ui.core.Fragment.byId(n.getId(),"idCheckBoxDaily").setSelected(r.DailyJob);sap.ui.core.Fragment.byId(n.getId(),"idCheckBoxOnDemand").setSelected(r.OnDemandJob)})}}else{t.error("Select a Terminal to proceed")}},handleEditTerminalPopout:function(){var e=this.getView().byId("idTerTablePopout"),i=this;var o=this.getView().getModel("oModel").getProperty("/TerminalData");var r=e.indexOfItem(e.getSelectedItem());if(r!==-1){var n=o[r];var s=this.getView();if(!this.byId("addTerminal")){a.load({id:s.getId(),name:"marathon.pp.princingui.fragments.addTerminal",controller:this}).then(function(e){s.addDependent(e);e.open();e.setTitle("Edit Terminal");var t=sap.ui.core.Fragment.byId(s.getId(),"idInputTerminalID");t.setEnabled(false);sap.ui.core.Fragment.byId(s.getId(),"idInputTerminalID").setValue(n.Terminal);sap.ui.core.Fragment.byId(s.getId(),"idInputTerminalName").setValue(n.TerminalName);sap.ui.core.Fragment.byId(s.getId(),"idCheckBoxDaily").setSelected(n.DailyJob);sap.ui.core.Fragment.byId(s.getId(),"idCheckBoxOnDemand").setSelected(n.OnDemandJob)})}}else{t.error("Select a Terminal to proceed")}},handleProductSelectDialogPress:function(){var e=this.getView();if(!this.byId("addProduct")){a.load({id:e.getId(),name:"marathon.pp.princingui.fragments.addProduct",controller:this}).then(function(t){e.addDependent(t);t.open();t.setTitle("Add Product")})}else{this.byId("addProduct").open();oDialog.setTitle("Add Product")}},handleEditProductSelectDialogPress:function(){var e=this.getView().byId("producttbl");var i=this.getView().getModel("oModel").getProperty("/ProductData");var o=e.indexOfItem(e.getSelectedItem());if(o!==-1){var r=i[o];var n=this.getView();if(!this.byId("addProduct")){a.load({id:n.getId(),name:"marathon.pp.princingui.fragments.addProduct",controller:this}).then(function(e){n.addDependent(e);e.open();e.setTitle("Edit Product");var t=sap.ui.core.Fragment.byId(n.getId(),"idInputProductID");var i=sap.ui.core.Fragment.byId(n.getId(),"idInputProductName");t.setValue(r.Product);t.setEnabled(false);i.setValue(r.ProductName)})}else{this.byId("addProduct").open();oDialog.setTitle("Edit Product")}}else{t.error("Select a Product to proceed")}},handleEditProductPopout:function(){var e=this.getView().byId("idProdTablePopout");var i=this.getView().getModel("oModel").getProperty("/ProductData");var o=e.indexOfItem(e.getSelectedItem());if(o!==-1){var r=i[o];var n=this.getView();if(!this.byId("addProduct")){a.load({id:n.getId(),name:"marathon.pp.princingui.fragments.addProduct",controller:this}).then(function(e){n.addDependent(e);e.open();e.setTitle("Edit Product");var t=sap.ui.core.Fragment.byId(n.getId(),"idInputProductID");var i=sap.ui.core.Fragment.byId(n.getId(),"idInputProductName");t.setValue(r.Product);t.setEnabled(false);i.setValue(r.ProductName)})}else{this.byId("addProduct").open();oDialog.setTitle("Edit Product")}}else{t.error("Select a Product to proceed")}},onProductClose:function(){this.byId("addProduct").close();this.byId("addProduct").destroy()},onValueHelpOkEmail:function(e){var t=oView.byId("multiInput1");t.setTokens([new h({text:{email:email},key:{key:key}})])},onClose:function(){this.byId("custTable").close()},onCloseProd:function(){this.byId("prodTable").close()},onCloseTer:function(){this.byId("terTable").close()},onCreateCustomer:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.navTo("RoutecreateView")},onSearchCustomerPop:function(e){var t=[],i=[];var a=e.getSource().getValue();if(a&&a.length>m.INTZERO){t.push(new o({filters:[new o({path:"Customer",operator:r.Contains,value1:a}),new o({path:"CustomerName",operator:r.Contains,value1:a}),new o({path:"ShipTo",operator:r.Contains,value1:a}),new o({path:"ShipToName",operator:r.Contains,value1:a})],and:false}));i.push(new o({filters:t,and:true}))}var n=this.byId("idTablePopout");var s=n.getBinding("items");s.filter(i,"Application")},_filterTableC:function(e){var t=this.byId("custTable");t.getTableAsync().then(function(i){if(i.bindRows){i.getBinding("rows").filter(e)}if(i.bindItems){i.getBinding("items").filter(e)}t.update()})},onSearchTerminalPop:function(e){var t=[],i=[];var a=e.getSource().getValue();if(a&&a.length>m.INTZERO){t.push(new o({filters:[new o({path:"Terminal",operator:r.Contains,value1:a}),new o({path:"TerminalName",operator:r.Contains,value1:a})],and:false}));i.push(new o({filters:t,and:true}))}var n=this.byId("idTerTablePopout");var s=n.getBinding("items");s.filter(i,"Application")},onSearchProductPop:function(e){var t=[],i=[];var a=e.getSource().getValue();if(a&&a.length>m.INTZERO){t.push(new o({filters:[new o({path:"Product",operator:r.Contains,value1:a}),new o({path:"ProductName",operator:r.Contains,value1:a})],and:false}));i.push(new o({filters:t,and:true}))}var n=this.byId("idProdTablePopout");var s=n.getBinding("items");s.filter(i,"Application")},onEditCustomer:function(){var e=this.getView().byId("idProductsTable"),i=[];var a=e.indexOfItem(e.getSelectedItem());if(a!==-1){var o=this.getView().getModel("oModel").getProperty("/CustomerData")[a];var r=[];for(var n=m.INTZERO;n<o.ProductList.results.length;n++){r.push({Product:o.ProductList.results[n].Product,ProductName:o.ProductList.results[n].ProductName})}i.push({Customer:o.Customer,CustomerName:o.CustomerName,ShipTo:o.ShipTo,ShipToName:o.ShipToName,ProductList:r,EmailTo:o.EmailTo,EmailArray:o.EmailArray,DailyJob:o.DailyJob,OnDemandJob:o.OnDemandJob});this.getView().getModel("oModel").setProperty("/selectedRow",i);var s=sap.ui.core.UIComponent.getRouterFor(this);s.navTo("RouteEditView",{Data:"1"})}else{t.error("Select a Customer to proceed")}},onEditCustomerPopout:function(e){var i=this.getView().byId("idTablePopout"),a=[];var o=i.indexOfItem(i.getSelectedItem());if(o!==-1){var r=this.getView().getModel("oModel").getProperty("/CustomerData")[o];var n=[];for(var s=m.INTZERO;s<r.ProductList.results.length;s++){n.push({Product:r.ProductList.results[s].Product,ProductName:r.ProductList.results[s].ProductName})}a.push({Customer:r.Customer,CustomerName:r.CustomerName,ShipTo:r.ShipTo,ShipToName:r.ShipToName,ProductList:n,EmailTo:r.EmailTo,EmailArray:r.EmailArray,DailyJob:r.DailyJob,OnDemandJob:r.OnDemandJob});var d=sap.ui.core.UIComponent.getRouterFor(this);d.navTo("RouteEditView",{Data:JSON.stringify(a)})}else{t.error("Select a Customer to proceed")}},onValueProductAfterClose:function(){this.byId("addProduct").destroy()},onDeleteTerminal:function(){var e=this.getView().byId("idTableTerminal"),i=this;var a=e.indexOfItem(e.getSelectedItem());var o=this.getView().getModel("oModel").getProperty("/TerminalData");if(a!==-1){var r=o[a];t.confirm(i.oBundle.getText("terminalDeleted",[r.Terminal]),{onClose:function(e){if(e==="OK"){n.show();i.oDataModelT.callFunction("/deleteTerminal",{method:"POST",urlParameters:{terminal:r.Terminal},success:function(e){n.hide();l.show(i.oBundle.getText("delSucc"));i.getTerminalDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(i.oBundle.getText("delCheck"))}},onDeleteProduct:function(e){var i=this.getView().byId("producttbl"),a=this;var o=i.indexOfItem(i.getSelectedItem());var r=this.getView().getModel("oModel").getProperty("/ProductData");if(o!==-1){var s=r[o];t.confirm(a.oBundle.getText("productDeleted",[s.Product]),{onClose:function(e){if(e==="OK"){n.show();a.oDataModelT.callFunction("/deleteProduct",{method:"POST",urlParameters:{product:s.Product},success:function(e){n.hide();l.show(a.oBundle.getText("delSucc"));a.getProductDetails();a.getCustomerDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(a.oBundle.getText("delCheck"))}},onDeleteTerminalPopout:function(){var e=this.getView().byId("idTerTablePopout"),i=this;var a=e.indexOfItem(e.getSelectedItem());var o=this.getView().getModel("oModel").getProperty("/TerminalData");if(a!==-1){var r=o[a];t.confirm(i.oBundle.getText("terminalDeleted",[r.Terminal]),{onClose:function(e){if(e==="OK"){n.show();i.oDataModelT.callFunction("/deleteTerminal",{method:"POST",urlParameters:{terminal:r.Terminal},success:function(e){n.hide();l.show(i.oBundle.getText("delSucc"));i.getTerminalDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(i.oBundle.getText("delCheck"))}},onDeleteProductPopout:function(e){var i=this.getView().byId("idProdTablePopout"),a=this;var o=i.indexOfItem(i.getSelectedItem());var r=this.getView().getModel("oModel").getProperty("/ProductData");if(o!==-1){var s=r[o];t.confirm(a.oBundle.getText("productDeleted",[s.Product]),{onClose:function(e){if(e==="OK"){n.show();a.oDataModelT.callFunction("/deleteProduct",{method:"POST",urlParameters:{product:s.Product},success:function(e){n.hide();l.show(a.oBundle.getText("delSucc"));a.getProductDetails()},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}})}else{t.error(a.oBundle.getText("delCheck"))}},onEmailCCSelectDialogPress:function(e){var t=this.getView(),i=[],o=t.getModel("oModel").getProperty("/emailsCC");if(o){for(var r=m.INTZERO;r<o.length;r++){var n=new sap.m.Token({key:o[r],text:o[r]});i.push(n)}}if(!this.byId("addEmail")){a.load({id:t.getId(),name:"marathon.pp.princingui.fragments.addEmailCc",controller:this}).then(function(e){t.addDependent(e);var a=sap.ui.core.Fragment.byId(t.getId(),"multiInputemail");a.setTokens(i);var o=function(e){var t=e.text;var i=t.split("@");var o=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!o.test(t)||i[1]!=="marathonpetroleum.com"){a.setValueState(sap.ui.core.ValueState.Error)}else{a.setValueState(sap.ui.core.ValueState.None);return new h({key:t,text:t})}};a.addValidator(o);e.open()})}else{this.byId("addEmail").open()}},onEmailChangeCC:function(e){var t=this.getView().byId(e.getSource().getId());var i=e.getParameters().value;var a=function(e){var i=e.text;var a=i.split("@");var o=/^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;if(!o.test(i)){t.setValueState(sap.ui.core.ValueState.Error)}else{t.setValueState(sap.ui.core.ValueState.None);return new h({key:i,text:i})}};if(i===""){t.setValueState(sap.ui.core.ValueState.None)}t.addValidator(a)},onCCEmailClose:function(){this.byId("addEmail").close();this.byId("addEmail").destroy()},onCCEmailSave:function(e){n.show();var i=this.getView().byId("multiInputemail").getTokens(),a,o=this;if(i.length!==m.INTZERO){for(var r=m.INTZERO;r<i.length;r++){var s=i[r].getKey();if(r===m.INTZERO){a=s}else{a=a+";"+s}}var d={Key:"EMAILCC",Value:a};var l=JSON.stringify(d);this.oDataModelT.callFunction("/createCCEmail",{method:m.httpPost,urlParameters:{createData:l},success:function(e){console.log(e);n.hide();t.success(o.oBundle.getText("savedSucc"),{onClose:function(e){if(e===t.Action.OK){o.onCCEmailClose();o.getCCEmails()}}})},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}},onPressEditOnDemand:function(e){this.getView().byId("idMultiInputCustomer").setEnabled(true);this.getView().byId("idDatePickerOnDemand").setEnabled(true);this.getView().byId("idMultiInputTerminal").setEnabled(true);this.getView().byId("idButtonSave").setVisible(true);this.getView().byId("idButtonCancel").setVisible(true);this.getView().byId("idButtonEdit").setVisible(false)},onPressCancelOnDemand:function(){this.getView().byId("idButtonSave").setVisible(false);this.getView().byId("idButtonCancel").setVisible(false);this.getView().byId("idButtonEdit").setVisible(true);this.getView().byId("idMultiInputCustomer").setEnabled(false);this.getView().byId("idDatePickerOnDemand").setEnabled(false);this.getView().byId("idMultiInputTerminal").setEnabled(false);this.getView().byId("idMultiInputCustomer").setValueState("None");this.getView().byId("idDatePickerOnDemand").setValueState("None");this.getView().byId("idMultiInputTerminal").setValueState("None");this.getView().byId("idMultiInputCustomer").setValue("");this.getView().byId("idDatePickerOnDemand").setDateValue("");this.getView().byId("idMultiInputTerminal").setValue("")},onPressSaveOnDemand:function(){var e=this.getView().byId("idDatePickerOnDemand").getDateValue(),i=this.getView().byId("idMultiInputCustomer").getValue(),a=this.getView().byId("idMultiInputTerminal").getValue(),o=e.toDateString().length,r=e.toDateString()+e.toString().substring(o,o+9);if(e&&i!==""&&a!==""){this.getView().byId("idMultiInputCustomer").setEnabled(false);this.getView().byId("idDatePickerOnDemand").setEnabled(false);this.getView().byId("idMultiInputTerminal").setEnabled(false);this.getView().byId("idButtonSave").setVisible(false);this.getView().byId("idButtonCancel").setVisible(false);this.getView().byId("idButtonEdit").setVisible(true);this.getView().byId("idTextOnDemandST").setText(r)}else{t.error("Kindly fill the mandatory fields")}},onPressSuspendEdit:function(){this.getView().byId("idDatePickerSuspend").setEnabled(true);this.getView().byId("idDatePicker2Suspend").setEnabled(true);this.getView().byId("idButtonSuspendSave").setVisible(true);this.getView().byId("idButtonSuspendCancel").setVisible(true);this.getView().byId("idButtonSuspendEdit").setVisible(false)},onPressSuspendClear:function(){this.getView().byId("idButtonSuspendCancel").setVisible(false);this.getView().byId("idButtonSuspendSave").setVisible(false);this.getView().byId("idButtonSuspendEdit").setVisible(true);this.getView().byId("idDatePickerSuspend").setEnabled(false);this.getView().byId("idDatePicker2Suspend").setEnabled(false);this.getView().byId("idDatePicker2Suspend").setValueState("None");this.getView().byId("idDatePicker2Suspend").setValueState("None");this.getView().byId("idDatePickerSuspend").setDateValue("");this.getView().byId("idDatePicker2Suspend").setDateValue("")},onPressSuspendSave:function(){var e=this.getView().byId("idDatePickerSuspend").getDateValue(),i=this.getView().byId("idDatePicker2Suspend").getDateValue(),a=e.toDateString().length,o=e.toDateString()+e.toString().substring(a,a+9),r=i.toDateString().length,n=i.toDateString()+i.toString().substring(r,r+9);if(e&&i){this.getView().byId("idInfoLabel").setText("Suspended");this.getView().byId("idInfoLabel").setColorScheme(2);this.getView().byId("idDatePickerSuspend").setEnabled(false);this.getView().byId("idDatePicker2Suspend").setEnabled(false);this.getView().byId("idButtonSuspendSave").setVisible(false);this.getView().byId("idButtonSuspendEdit").setVisible(true);this.getView().byId("idButtonSuspendCancel").setVisible(false);this.getView().byId("idObjStatusS1").setText(n);this.getView().byId("idObjStatusS2").setText(o)}else{t.error("Kindly fill the mandatory fields")}},onhandleChangeDP1Suspend:function(e){var t=this.getView().byId("idDatePickerSuspend").getDateValue(),i=this.getView().byId("idDatePicker2Suspend").getDateValue();if(i<=t){this.getView().byId("idDatePicker2Suspend").setValueState("Error")}else{this.getView().byId("idDatePicker2Suspend").setValueState("None")}},onhandleChangeDP2Suspend:function(e){var t=this.getView().byId("idDatePickerSuspend").getDateValue(),i=this.getView().byId("idDatePicker2Suspend").getDateValue();if(i<=t){this.getView().byId("idDatePicker2Suspend").setValueState("Error")}else if(t===null){this.getView().byId("idDatePicker2Suspend").setValueState("Error")}else{this.getView().byId("idDatePicker2Suspend").setValueState("None")}},onChangeDP2:function(){this.getView().byId("idDatePicker2Suspend").setValueState("None")},onHandleValueHelpTerminal:function(e){var t=this.getView();if(!this.byId("idDialogTerminalF4")){a.load({id:t.getId(),name:"marathon.pp.princingui.fragments.terminalF4",controller:this}).then(function(e){t.addDependent(e);e.open()})}else{this.byId("idDialogTerminalF4").open()}},_handleValueHelpClose:function(){this.byId("idDialogTerminalF4").close();this.byId("idDialogTerminalF4").destroy()},_handleValueHelpOKTerminal:function(e){var t=e.getSource().getBinding("items");t.filter([]);var i=e.getParameter("selectedContexts");if(i&&i.length){this.getView().byId("idInputTerminalID").setValue(i.map(function(e){return e.getObject().Terminal}));this.getView().byId("idInputTerminalName").setValue(i.map(function(e){return e.getObject().Terminalname}))}},onPressTerminalSave:function(e){var i=this.getView().byId("idInputTerminalID").getValue(),a=this.getView().byId("idInputTerminalName").getValue(),o,r=this.getView().byId("idInputTerminalID").getEnabled(),s=this.getView().byId("idCheckBoxDaily").getSelected(),d=this.getView().byId("idCheckBoxOnDemand").getSelected(),l=this;if(i!==""&&a!==""){n.show();o={Terminal:i,TerminalName:a,DailyJob:s,OnDemandJob:d};var u=JSON.stringify(o);if(r===true){this.oDataModelT.callFunction("/createTerminal",{method:m.httpPost,urlParameters:{createData:u},success:function(e){n.hide();if(e.createTerminal.data[m.INTZERO]){t.success(l.oBundle.getText("terminalCreated",[e.createTerminal.data[m.INTZERO].data.Terminal]),{onClose:function(e){if(e===t.Action.OK){l.onTerminalClose();l.getTerminalDetails()}}})}else{t.error(e.createTerminal.data.message)}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}else{var l=this;this.oDataModelT.callFunction("/updateTerminal",{method:m.httpPost,urlParameters:{createData:u,terminal:i},success:function(e){n.hide();if(e.updateTerminal.data[m.INTZERO]){t.success(l.oBundle.getText("savedSucc"));l.onTerminalClose();l.getTerminalDetails()}else{t.error(e.updateTerminal.data.message)}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}else{t.error("Kindly fill the mandatory fields")}},onHandleValueHelpProduct:function(e){var t=this.getView();this._oValueHelpDialogListProd=sap.ui.xmlfragment("marathon.pp.princingui.fragments.productF4",this);t.addDependent(this._oValueHelpDialogListProd);this._oValueHelpDialogListProd.open()},_handleValueHelpCloseProduct:function(){this._oValueHelpDialogListProd.close()},_handleValueHelpOKProduct:function(e){var t=e.getSource().getBinding("items");t.filter([]);var i=e.getParameter("selectedContexts");if(i&&i.length){this.getView().byId("idInputProductID").setValue(i.map(function(e){return e.getObject().Product}));this.getView().byId("idInputProductName").setValue(i.map(function(e){return e.getObject().ProductName}))}},onPressProductSave:function(){n.show();var e=this.getView().byId("idInputProductID").getValue(),i=this.getView().byId("idInputProductName").getValue(),a,o,r=this.getView().byId("idInputProductID").getEnabled();var s=this;if(e!==""&&i!==""){o={Product:e,ProductName:i};var a=JSON.stringify(o);if(r===true){this.oDataModelT.callFunction("/createProduct",{method:m.httpPost,urlParameters:{createData:a},success:function(e){n.hide();if(e.createProduct.data[m.INTZERO]){t.success(s.oBundle.getText("productCreated",[e.createProduct.data[m.INTZERO].data.Product]),{onClose:function(e){if(e===t.Action.OK){s.onProductClose();s.getProductDetails()}}})}else{t.error(e.createProduct.data.message)}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}else{this.oDataModelT.callFunction("/updateProduct",{method:m.httpPost,urlParameters:{createData:a,product:e},success:function(e){n.hide();if(e.updateProduct.data[m.INTZERO]){t.success(s.oBundle.getText("savedSucc"));s.onProductClose();s.getProductDetails()}else{t.error(e.updateProduct.data.message)}},error:function(e){n.hide();t.error("Technical error has occurred ",{details:e})}})}}else{t.error("Kindly fill the mandatory fields")}},closeBusyDialog:function(){this._pBusyDialog.then(function(e){e.close()})},onFilterBarSearch:function(e){var t=this._oBasicSearchField.getValue(),i=e.getParameter("selectionSet");var a=i.reduce(function(e,t){if(t.getValue()){switch(t.getName()){case"Customer ID":e.push(new o({path:"Customer",operator:r.Contains,value1:t.getValue()}));break;case"Ship-To":e.push(new o({path:"Shipto",operator:r.Contains,value1:t.getValue()}));break;case"Customer Name":e.push(new o({path:"CustomerName",operator:r.Contains,value1:t.getValue()}));break}}return e},[]);a.push(new o({filters:[new o({path:"Customer",operator:r.Contains,value1:t}),new o({path:"CustomerName",operator:r.Contains,value1:t}),new o({path:"Shipto",operator:r.Contains,value1:t}),new o({path:"ShiptoName",operator:r.Contains,value1:t})],and:false}));this._filterTable(new o({filters:a,and:true}))},_filterTable:function(e){var t=this._oValueHelpDialogCust;t.getTableAsync().then(function(i){if(i.bindRows){i.getBinding("rows").filter(e)}if(i.bindItems){i.getBinding("items").filter(e)}t.update()})},_handleValueHelpSearchTerminal:function(e){var t=e.getParameter("value"),i=[],a=[];if(t&&t.length>m.INTZERO){i.push(new o({filters:[new o({path:"Terminal",operator:r.Contains,value1:t}),new o({path:"Terminalname",operator:r.Contains,value1:t})],and:false}));a.push(new o({filters:i,and:true}))}var n=e.getSource().getBinding("items");n.filter([a])},_handleValueHelpSearchProduct:function(e){var t=e.getParameter("value"),i=[],a=[];if(t&&t.length>m.INTZERO){i.push(new o({filters:[new o({path:"Product",operator:r.Contains,value1:t}),new o({path:"ProductName",operator:r.Contains,value1:t})],and:false}));a.push(new o({filters:i,and:true}))}var n=e.getSource().getBinding("items");n.filter([a])},handleChangeOnDemand:function(e){var t=this.getView().byId("idTextOnDemandST");const i=new Date(this.getView().byId("idDatePickerOnDemand").getValue());t.setText(i.toLocaleString("en-US",{timeZone:"CST",dateStyle:"medium",timeStyle:"medium"}))},handleChangeSuspensStartTime:function(e){this.getView().byId("idDatePicker2Suspend").setValueState("None");var t=this.getView().byId("idObjStatusS1");t.setText(this.getView().byId("idDatePickerSuspend").getValue());const i=new Date(this.getView().byId("idDatePickerSuspend").getValue());t.setText(i.toLocaleString("en-US",{timeZone:"CST",dateStyle:"medium",timeStyle:"medium"}))},handleChangeSuspensEndTime:function(e){this.getView().byId("idDatePicker2Suspend").setValueState("None");var t=this.getView().byId("idObjStatusS2");const i=new Date(this.getView().byId("idDatePicker2Suspend").getValue());t.setText(i.toLocaleString("en-US",{timeZone:"CST",dateStyle:"medium",timeStyle:"medium"}))},handleChange:function(e){var t=this.getView().byId("idTextDailyST");t.setText(this.getView().byId("idTimePickerInput").getValue());const i=new Date(this.getView().byId("idTimePickerInput").getValue());t.setText(i.toLocaleString("en-US",{timeZone:"CST",dateStyle:"medium",timeStyle:"medium"}))}})});
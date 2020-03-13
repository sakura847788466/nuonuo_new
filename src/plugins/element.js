import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {
  Button, Dialog, Input, InputNumber, Loading, Message, MessageBox, Table, TableColumn,
  TabPane, Tabs, Form, FormItem, Switch, Notification, Radio, Divider, Select, Option,
  Tag, DatePicker, Dropdown, DropdownItem, Pagination, CheckboxGroup, Checkbox, Popover,
  Tooltip, RadioGroup, Row, Col, Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup, Collapse, CollapseItem
} from 'element-ui'


Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Switch.name, Switch);
Vue.component(Radio.name, Radio);
Vue.component(Divider.name, Divider);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Tag.name, Tag);
Vue.component(Notification.name, Notification);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Pagination.name, Pagination);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Popover.name, Popover);
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component(Tooltip.name, Tooltip)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Main.name, Main)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)




Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;



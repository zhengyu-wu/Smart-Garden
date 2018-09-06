import { createStackNavigator } from 'react-navigation';
import Root from './Root';
import Register from './Register';
import Login from './Login';
import Help from './Help';
import ContactUs from './ContactUs';
import ModifyUser from "./ModifyUser";
import ModifyUserName from './ModifyInfo/ModifyUserName';
import ModifyUserEmail from './ModifyInfo/ModifyUserEmail';
import ModifyUserPassword from './ModifyInfo/ModifyUserPassword';
import ModifyUserPhone from './ModifyInfo/ModifyUserPhone';
import ModifySensorPosition from './ModifyInfo/ModifySensorPosition';
import AddGarden from "./ModifyInfo/AddGarden";
import AddSensor from "./ModifyInfo/AddSensor";
import AddNozzle from "./ModifyInfo/AddNozzle";
import Sensor from './Sensor';
import Nozzle from './Nozzle';
import ModifyEmailAdmin from "./ModifyInfo/ModifyEmailAdmin";
import ModifyUserNameAdmin from "./ModifyInfo/ModifyUserNameAdmin";
import ModifyUserPhoneAdmin from "./ModifyInfo/ModifyUserPhoneAdmin";
import Heatmap from './Heatmap';
import Linechart from './Linechart';
import GardenDiagram from './GardenDiagram';

const RootStack = createStackNavigator({
    Home: Root,
    Register:Register,
    Login:Login,
    Help:Help,
    ContactUs:ContactUs,
    ModifyUser:ModifyUser,
    ModifyUserName:ModifyUserName,
    ModifyUserEmail:ModifyUserEmail,
    ModifyUserPassword:ModifyUserPassword,
    ModifyUserPhone:ModifyUserPhone,
    ModifySensorPosition:ModifySensorPosition,
    AddGarden:AddGarden,
    AddSensor:AddSensor,
    AddNozzle:AddNozzle,
    Sensor:Sensor,
    Nozzle:Nozzle,
    ModifyEmailAdmin:ModifyEmailAdmin,
    ModifyUserNameAdmin:ModifyUserNameAdmin,
    ModifyUserPhoneAdmin:ModifyUserPhoneAdmin,
    Heatmap: Heatmap,
    Linechart:Linechart,
    GardenDiagram:GardenDiagram
},{headerMode: 'none'},{
    initialRouteName:'Home'
},);

export default RootStack;
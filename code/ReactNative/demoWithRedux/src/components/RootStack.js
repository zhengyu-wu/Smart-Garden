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
import Sensor from './Sensor'
import ModifyEmailAdmin from "./ModifyInfo/ModifyEmailAdmin";
import ModifyUserNameAdmin from "./ModifyInfo/ModifyUserNameAdmin";
import ModifyUserPhoneAdmin from "./ModifyInfo/ModifyUserPhoneAdmin";
import Nozzle from "./Nozzle";
import AddNozzle from "./ModifyInfo/AddNozzle";
import ModifyNozzlePosition from "./ModifyInfo/ModifyNozzlePosition";
import ModifyNozzleRadius from "./ModifyInfo/ModifyNozzleRadius";
import CameraExample from './Camera';
import GardenItem from './GardenItem';
import SensorItem from './SensorItem';
import NozzleItem from './NozzleItem';
import WaterConfig from "./WaterConfig";
import GardenDiagram from './GardenDiagram';
import Linechart from './Linechart';
import Heatmap from './Heatmap';


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
    ModifyNozzlePosition:ModifyNozzlePosition,
    ModifyNozzleRadius:ModifyNozzleRadius,
    AddGarden:AddGarden,
    AddSensor:AddSensor,
    AddNozzle:AddNozzle,
    Sensor:Sensor,
    Nozzle:Nozzle,
    CameraExample:CameraExample,
    ModifyEmailAdmin:ModifyEmailAdmin,
    ModifyUserNameAdmin:ModifyUserNameAdmin,
    ModifyUserPhoneAdmin:ModifyUserPhoneAdmin,
    GardenItem:GardenItem,
    SensorItem:SensorItem,
    NozzleItem:NozzleItem,
    WaterConfig:WaterConfig,
    Linechart:Linechart,
    GardenDiagram:GardenDiagram,
    Heatmap:Heatmap
},{headerMode: 'none'},{
    initialRouteName:'Home'
},);

export default RootStack;
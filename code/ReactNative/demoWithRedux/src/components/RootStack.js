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
<<<<<<< HEAD
import WaterConfig from "./WaterConfig";
=======
import SensorItem from './SensorItem';
import NozzleItem from './NozzleItem';
>>>>>>> 8ad3494a2466c7c5a6c1d67c6cd03e9603919a7a

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
<<<<<<< HEAD
    WaterConfig:WaterConfig
=======
    SensorItem:SensorItem,
    NozzleItem:NozzleItem
>>>>>>> 8ad3494a2466c7c5a6c1d67c6cd03e9603919a7a
},{headerMode: 'none'},{
    initialRouteName:'Home'
},);

export default RootStack;
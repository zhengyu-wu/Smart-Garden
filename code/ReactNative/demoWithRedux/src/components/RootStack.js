import { createStackNavigator } from 'react-navigation';
import Root from './Root';
import Register from './Register';
import Login from './Login';

const RootStack = createStackNavigator({
    Home: Root,
    Register:Register,
    Login:Login
},{headerMode: 'none'},{
    initialRouteName:'Home'
},);

export default RootStack;
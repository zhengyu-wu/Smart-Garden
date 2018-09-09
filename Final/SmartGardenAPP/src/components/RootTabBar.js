import React from 'react';
import {Text,View} from 'react-native';
import {TabBar,SearchBar,WhiteSpace} from 'antd-mobile-rn';
import UserCard from './User';
import Sensor from './Sensor';
//import Garden from './Garden';
//import SensorPage from './Garden';
import AdminUserControl from './Admin/AdminUserControl';
 class RootTabBars extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
        };
    }
     renderContent(pageText: any) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </View>
        );
    }
     onChangeTab(tabName: any) {
        this.setState({
            selectedTab: tabName,
        });
    }
     render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#ccc"
                tabBarPosition={'bottom'}
            >
                <TabBar.Item
                    icon={require('../assets/friend.png')}
                    selectedIcon={require('../assets/friend_sel.png')}
                    title="Users"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this.onChangeTab('greenTab')}
                >
                    <AdminUserControl navigation={this.props.navigation}/>
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../assets/busi.png')}
                    selectedIcon={require('../assets/busi_sel.png')}
                    title="My account"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => this.onChangeTab('yellowTab')}
                >
                   <UserCard navigation={this.props.navigation}/>
                </TabBar.Item>
            </TabBar>
        );
    }
}
 export default RootTabBars;
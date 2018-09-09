import React from 'react';
import {Text,View} from 'react-native';
import {TabBar,SearchBar,WhiteSpace} from 'antd-mobile-rn';
import UserCard from './User';
import Sensor from './Sensor';
import Garden from './Garden';
import SensorPage from './Garden';
import AdminUserControl from './Admin/AdminUserControl';
import Nozzle from './Nozzle';
import VideoDisplay from './VideoDisplay';
import CameraExample from './Camera';
import WaterConfig from "./WaterConfig";


class TabBars extends React.Component<any, any> {
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
                {/*
                <TabBar.Item
                    title="Life"
                    icon={require('../assets/alipay.png')}
                    selectedIcon={require('../assets/alipay_sel.png')}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this.onChangeTab('blueTab')}
                > 
                    <CameraExample/>
                </TabBar.Item> */}
                <TabBar.Item
                    icon={require('../assets/koubei.png')}
                    selectedIcon={require('../assets/koubei_sel.png')}
                    title="Garden"
                    //badge={2}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this.onChangeTab('redTab')}
                >
                    <Garden navigation={this.props.navigation}/>
                </TabBar.Item>
                
                <TabBar.Item
                    icon={require('../assets/friend.png')}
                    selectedIcon={require('../assets/friend_sel.png')}
                    title="My Account"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => this.onChangeTab('yellowTab')}
                >
                   <UserCard navigation={this.props.navigation}/>
                </TabBar.Item>
            </TabBar>
        );
    }
}

export default TabBars;

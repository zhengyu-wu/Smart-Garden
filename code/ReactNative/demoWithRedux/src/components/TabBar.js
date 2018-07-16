import React from 'react';
import {Text,View} from 'react-native';
import {TabBar,SearchBar} from 'antd-mobile-rn';
import UserCard from './User';
import Sensor from './Sensor';
import SensorPage from './Garden';


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
                <TabBar.Item
                    title="Life"
                    icon={require('../assets/alipay.png')}
                    selectedIcon={require('../assets/alipay_sel.png')}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this.onChangeTab('blueTab')}
                >
                    {this.renderContent('Life Tab')}
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../assets/koubei.png')}
                    selectedIcon={require('../assets/koubei_sel.png')}
                    title="Koubei"
                    badge={2}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => this.onChangeTab('redTab')}
                >

                </TabBar.Item>
                <TabBar.Item
                    icon={require('../assets/friend.png')}
                    selectedIcon={require('../assets/friend_sel.png')}
                    title="Friend"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => this.onChangeTab('greenTab')}
                >
                    <Sensor navigation={this.props.navigation}/>
                </TabBar.Item>
                <TabBar.Item
                    icon={require('../assets/busi.png')}
                    selectedIcon={require('../assets/busi_sel.png')}
                    title="My"
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

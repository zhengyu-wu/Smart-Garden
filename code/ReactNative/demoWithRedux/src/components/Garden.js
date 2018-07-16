import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

class Garden extends React.Component{
    drawer: any;
    data:[];

    onOpenChange = (isOpen: any) => {
        console.log('是否打开了 Drawer', isOpen.toString());
    };
    componentWillMount(){
        axios.get('http://192.168.56.1:8080/garden/getByUserId',{params:{userId:this.props.user.user.userId}})
            .then((res)=>{
                this.data=res.data;
                console.log('in sensor page res data');
                console.log(res.data);
            })
    }

    render() {
        let array=[];
        if(typeof(this.data)!=='undefined' )
        {
            for(let index=0;index<this.data.length;index++){
                if (index === 0) {
                    array.push (
                        <List.Item
                            key={index}
                            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                            multipleLine
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>Categories - {index}</Text>
                                <Button
                                    type="primary"
                                    size="small"
                                    onClick={() => this.drawer.closeDrawer()}
                                >
                                    close drawer
                                </Button>
                            </View>
                        </List.Item>
                    );
                }
                else array.push (
                    <List.Item
                        key={index}
                        thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                    >
                        <Text>Categories - {index}</Text>
                    </List.Item>
                );
            }
        }


        // Todo: https://github.com/DefinitelyTyped/DefinitelyTyped
        const sidebar = (
            <ScrollView style={[styles.container]}>
                <List>{array}</List>
            </ScrollView>
        );

        return (
            <Drawer
                sidebar={sidebar}
                position="left"
                open={false}
                drawerRef={(el: any) => (this.drawer = el)}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#ccc"
            >
                <View style={{ flex: 1, marginTop: 114, padding: 8 }}>
                    <Button onClick={() => this.drawer && this.drawer.openDrawer()}>
                        Open drawer
                    </Button>
                    <WhiteSpace />
                </View>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Garden);
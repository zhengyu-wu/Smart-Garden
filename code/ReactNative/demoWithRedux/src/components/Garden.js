import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace, Popover } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import axios from 'axios';
import GardenItem from './GardenItem';

const Item = Popover.Item;

class Garden extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      // visible: false,
      selected: '',
      userId: 1,
      gardenId: 1,//todo gardenId应该是从上层组件传递的，此处为了便于测试与编写采用了固定值
      data:{},//data应该是从后端拿到的数据
      overlay: []
    };
  }

  componentWillMount(){
        axios.get("http://192.168.1.152:8080/garden/getByUserId",{params:{userId:this.state.userId}})
            .then((res)=>{
                /*let tmpData=[];
                alert(JSON.stringify(res.data));
                for(let i=0;i<res.data.length;i++){
                    tmpData.push({
                        gardenId:res.data[i].gardenId,
                        length: res.data[i].length,
                        positionX:res.data[i].positionX,
                        positionY:res.data[i].positionY,
                        width: res.data[i].width,
                        user:res.data[i].user,
                        gardenName:res.data[i].gardenName
                    });
                }*/
                let tmp_overlay = [];
                for(let i=0;i<res.data.length;i++){

                    tmp_overlay.push(res.data[i].gardenId);   

                }
                //alert(JSON.stringify(tmp_overlay));


                this.setState({
                    data:res.data,
                    overlay: tmp_overlay
                });
            })
            .catch(err=>{
                Toast.info('Something wrong!');
                console.log('error');
                console.log(err);
            })
    }
  
  onSelect = (value: any) => {
    this.setState({
      selected: value,
    });
  }
  
  render() {
    overlay = this.state.overlay;
    alert(JSON.stringify(this.state.overlay));

    overlay.map((i, index) => (
      <Item key={index} value={i}>
        <Text>option {i}</Text>
      </Item>
    ));
    overlay = overlay.concat([
      
      <Item key="6" value="button ct" style={{ backgroundColor: '#efeff4' }}>
        <Text>关闭</Text>
      </Item>,
    ]);

    return (
      <View>
        
        <View style={styles.menuContainer}>
          <Popover
            name="m"
            style={{ backgroundColor: '#eee' }}
            overlay={overlay}
            contextStyle={styles.contextStyle}
            overlayStyle={[
              styles.overlayStyle,
              Platform.OS === 'android' && styles.androidOverlayStyle,
            ]}
            triggerStyle={styles.triggerStyle}
            onSelect={this.onSelect}
          >
            <Text>菜单</Text>
          </Popover>
        </View>
        <View>
          <Text>
            选择了：{this.state.selected}
          </Text>
          <GardenItem />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contextStyle: {
    margin: 50,
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 200,
    paddingHorizontal: 5,
    paddingVertical: 10,
  } ,
  triggerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  overlayStyle: {
    left: 90,
    marginTop: 20,
  },
  
  androidOverlayStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Garden);
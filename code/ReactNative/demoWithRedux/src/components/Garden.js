import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace, Popover, Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import axios from 'axios';
import GardenItem from './GardenItem';
import qs from "qs";

const Item = Popover.Item;

class Garden extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      // visible: false,
      selected: '',
      userId: 1,
      data:{},   
      overlay: [],
      gardenData:[]
    };
  }

  componentWillMount(){
        axios.get("http://192.168.1.152:8080/garden/getByUserId",{params:{userId:this.state.userId}})
            .then((res)=>{
                let gardenData=[];
                let tmp_overlay = [];
                //alert(JSON.stringify(res.data));
                for(let i=0;i<res.data.length;i++){

                    tmp_overlay.push(res.data[i].gardenId);

                    gardenData.push({
                        gardenId:res.data[i].gardenId,
                        length: res.data[i].length,
                        positionX:res.data[i].positionX,
                        positionY:res.data[i].positionY,
                        width: res.data[i].width,
                        gardenName:res.data[i].gardenName
                    });
                }                                
                this.setState({
                    data:res.data,
                    overlay: tmp_overlay,
                    gardenData: gardenData
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

  onDeleteGarden=(gardenId)=>{
        let tmpState=this.state.gardenData;
        let tmpData=[];
        let tmpOverlay=[];
        for(let i=0;i<tmpState.length;i++){
            if(tmpState[i].gardenId!==gardenId){
                tmpData.push(tmpState[i]);
                tmpOverlay.push(tmpState[i].gardenId);
            }
        }
        const params={
            gardenId:gardenId
        };
        axios.post('http://192.168.1.152:8080/garden/deleteByGardenId',qs.stringify(params))
            .then(()=>{
                Toast.info('successfully delete');
                this.setState({
                    gardenData:tmpData,
                    overlay:tmpOverlay

                })
            })
    }
  
  render() {

    overlay = this.state.overlay.map((i, index) => (
      <Item key={index} value={i}>
        <Text>Garden {i}</Text>
      </Item>
    ));

    let rowData = [];

    for(let i=0;i<this.state.gardenData.length;i++){

        if (this.state.gardenData[i].gardenId == this.state.selected)
        {
            rowData = this.state.gardenData[i];

        }
                    
    }

    return (
      <View>
        
        <View style={styles.menuContainer}>
          <Popover
            name="m"
            style={{ backgroundColor: '#FFFFFF' }}
            overlay={overlay}
            contextStyle={styles.contextStyle}
            onSelect={this.onSelect}
          >
            <Text >选择花园</Text>
          </Popover>
        </View>
        <View>
          <GardenItem 
            navigation={this.props.navigation} 
            data={rowData}
            onDeleteGarden={this.onDeleteGarden.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contextStyle: {  // “选择花园”的位置
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
});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Garden);
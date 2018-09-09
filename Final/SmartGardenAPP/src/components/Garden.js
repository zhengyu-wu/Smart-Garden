import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Drawer, List, WhiteSpace, Popover, Toast,Grid } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import axios from 'axios';
import GardenItem from './GardenItem';
import qs from "qs";
import {HOST_NAME} from "../constants";

const Item = Popover.Item;

class Garden extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      // visible: false,
      selected: '',
      userId: this.props.user.user.userId,
      data:{},   
      overlay: [],
      gardenData:[]
    };
  }

  componentWillMount(){
        axios.get(HOST_NAME+"/garden/getByUserId",{params:{userId:this.state.userId}})
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
        axios.post(HOST_NAME+'/garden/deleteByGardenId',qs.stringify(params))
            .then(()=>{
                Toast.info('Deleted successfully!');
                this.componentWillMount();
            })
    }
  
  render() {

    data = this.state.overlay.map((i, index) => ({
      icon: '/Users/wuzhengyu/Desktop/demoWithRedux/src/assets/garden.png',
      text: `Garden ${i}`,
    }));

    return (
      <View style={{ paddingTop: 100 }}>
        <Grid
          data={data}
          columnNum={3}
          isCarousel
          
          onClick={(_el: any, index: any)=>{
            this.props.navigation.navigate('GardenItem',
                          {
                              navigation: this.props.navigation,
                              data: this.state.gardenData[index],
                              onDeleteGarden:this.onDeleteGarden.bind(this)
                          })
          }} 
        />
          <Button style={{ top: 40 }} type={'primary'} onClick={()=>{
              this.props.navigation.navigate('AddGarden',{
                  update:this.componentWillMount.bind(this)
              })
          }
          }>
              Add a garden
          </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};


export default connect(mapStateToProps)(Garden);
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import qs from "qs";

import {
    StyleSheet,
    View,
    Text,
    Slider,
    Image,
    Platform,
} from 'react-native';
import axios from "axios/index";
import {Toast} from "antd-mobile-rn/lib/index.native";
import {HOST_NAME} from "../constants";
import {Switch} from 'antd-mobile-rn';

class WaterConfig extends React.Component{
    constructor(props:any){
        super(props);
        this.state = {
            sliderOneChanging: false,
            sliderOneValue: [5],
            multiTempValue: [0, 0],
            multiHumiValue:[0,0],
            gardenId:this.props.navigation.state.params.gardenId,
            configId:0,
            configState:0,
            getConfig:false
        };
    }

    componentWillMount(){
        axios.get(HOST_NAME+"/waterConfig/getConfigByGardenId",{params:{gardenId:this.state.gardenId}})
            .then((res)=>{
                if(res.data.length>0){
                    this.setState({
                        multiTempValue:[res.data[0].bestTempMin,res.data[0].bestTempMax],
                        multiHumiValue:[res.data[0].bestHumiMin,res.data[0].bestHumiMax],
                        configId: res.data[0].configId,
                        configState:res.data[0].configState,
                        getConfig:true
                    });
                }
            })
            .catch((err)=>{
                Toast.info("something wrong");
                console.log('error');
                console.log(err);
            })
    }

    multiTempValuesChange = (values) => {

        if(values.length<2)
            return;

        if(this.state.configId===0){
            const params={
                bestHumiMax:0,
                bestHumiMin:0,
                bestTempMax:values[1],
                bestTempMin:values[0],
                configState:1,
                gardenId:this.props.navigation.state.params.gardenId
            }
            axios.post(HOST_NAME+"/waterConfig/addConfigByGardenId",qs.stringify(params))
                .then(()=>{
                    this.componentWillMount()
                })
                .catch((err)=>{
                    console.log(err);

                })
            return;
        }
        const params={
            configId:this.state.configId,
            bestTempMin:values[0],
            bestTempMax:values[1]
        };

        axios.post(HOST_NAME+"/waterConfig/changeTempConfig",qs.stringify(params))
            .then((res)=>{
                this.setState({
                    multiTempValue: values,
                });
            })
            .catch((err)=>{
                Toast.info("something wrong");
                console.log('error');
                console.log(err);
            })
    }

    multiHumiValuesChange = (values) => {

        if(values.length<2)
            return;
        if(this.state.configId===0){
            const params={
                bestTempMax:0,
                bestTempMin:0,
                bestHumiMax:values[1],
                bestHumiMin:values[0],
                configState:1,
                gardenId:this.props.navigation.state.params.gardenId
            }
            axios.post(HOST_NAME+"/waterConfig/addConfigByGardenId",qs.stringify(params))
                .then(()=>{
                    this.componentWillMount();
                })
                .catch((err)=>{
                    console.log(err);

                })
            return;
        }
        const params={
            configId:this.state.configId,
            bestHumiMin:values[0],
            bestHumiMax:values[1]
        }

        axios.post(HOST_NAME+"/waterConfig/changeHumiConfig",qs.stringify(params))
            .then((res)=>{
                this.setState({
                    multiHumiValue: values,
                });
            })
            .catch((err)=>{
                Toast.info("something wrong");
                console.log('error');
                console.log(err);
            })
    }

    onSwitchChange=()=>{
        const params={
            configId:this.state.configId
        };
        this.setState({configState:!this.state.configState});
        axios.post(HOST_NAME+"/waterConfig/changeConfigState",qs.stringify(params))
            .then((res)=>{
            })
            .catch((err)=>{
                Toast.info("something wrong");
                console.log('error');
                console.log(err);
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sliders}>
                    <View style={styles.sliderOne}>
                        <Text style={styles.text}>Temperature range(℃)</Text>
                        <Text style={styles.text}>{this.state.multiTempValue[0]} </Text>
                        <Text style={styles.text}>{this.state.multiTempValue[1]}</Text>
                    </View>
                    <MultiSlider
                        values={[this.state.multiTempValue[0], this.state.multiTempValue[1]]}
                        sliderLength={280}
                        onValuesChange={this.multiTempValuesChange}
                        min={0}
                        max={50}
                        step={1}
                        allowOverlap
                        snapped
                    />
                    <View style={styles.sliderOne}>
                        <Text style={styles.text}>Humidity range</Text>
                        <Text style={styles.text}>{this.state.multiHumiValue[0]} </Text>
                        <Text style={styles.text}>{this.state.multiHumiValue[1]}</Text>
                    </View>
                    <MultiSlider
                        values={[this.state.multiHumiValue[0], this.state.multiHumiValue[1]]}
                        sliderLength={280}
                        onValuesChange={this.multiHumiValuesChange}
                        min={0}
                        max={1}
                        step={0.01}
                        allowOverlap
                        snapped
                    />
                    <View>
                        <Text style={styles.text}>Auto Watering</Text>
                    </View>
                    <View>
                        <Switch
                            checked={this.state.configState===1||this.state.configState===true}
                            onChange={this.onSwitchChange}
                            disabled={this.state.configId===0}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default WaterConfig;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliders: {
        margin: 20,
        width: 280,
    },
    text: {
        alignSelf: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

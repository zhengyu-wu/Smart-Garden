import React from 'react';
import { Text, View ,TextInput,Image} from 'react-native';
import { WhiteSpace, WingBlank } from 'antd-mobile-rn';
 class ContactUs extends React.Component{
    render()
    {
        return(
            <View style={{ paddingTop: 100 }}>
                <WingBlank>
                    <View>
                        <Text>Please contact us if you found any bugs in this app. </Text>
                        <Text>Email:handong-lee@sjtu.edu.cn</Text>
                    </View>
                </WingBlank>
            </View>)
    }
}

export default ContactUs;


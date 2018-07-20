import React ,{ Component } from 'react'
//router
import { BrowserRouter as Router,Route, withRouter } from 'react-router-dom'
//antd
import { Layout, Menu, Icon, Button } from 'antd';
const { Header,Content,Footer,Sider } = Layout;

class HeaderPage extends Component{
    
    handleLogOut = () =>{
        if(localStorage.getItem('userState'))
        {
            this.setState({});
            localStorage.clear();
            this.props.history.push('/login');
        }
        else{
            alert("You have to Login first");
        }
    }
    
    render(){
        return(
                <Header style={{ background: '#000', padding: 0 }}>
                    <span style={{color:'#fff', paddingLeft:'1%', fontSize:'1.4em'}}>
                        <Icon
                        className="trigger"
                        style={{cursor: 'pointer'}}
                        />
                    </span>
                    <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.8em'}}>斯玛特 嘠登</span>
                    <span style={{color:'#fff', paddingLeft:'80%',paddingBottom:'80%'}}>
                        <Button type="primary" onClick={this.handleLogOut} className="Log out" value="Log out">
                            Log out
                        </Button>
                    </span>
                </Header>
        );
    }
}

export default withRouter(HeaderPage);
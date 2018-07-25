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
            <div>
                <Header style={{ background: '#000', padding: 0 ,height:70}}>
                    <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.8em'}}>Smart Garden</span>
                    <span style={{color:'#fff', paddingLeft:'80%'}}>
                        <Button type="primary" onClick={this.handleLogOut} className="Log out" value="Log out">
                            Log out
                        </Button>
                    </span>
                </Header>
            </div>
        );
    }
}

export default withRouter(HeaderPage);
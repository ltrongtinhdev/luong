import React,{useEffect, useState} from 'react';
import {View, Text,SafeAreaView,FlatList, TouchableOpacity} from 'react-native'
import { FAB, Portal, Provider} from 'react-native-paper';
import { ListItem, Avatar,Button  } from 'react-native-elements';
import axios from 'axios'
import {url} from '../constant/config'
import Screen from '../constant/screen'
import dayjs from 'dayjs'
const Item = (props) => {
    const {item,index,navigation,in1} = props
    return(
        <TouchableOpacity key={index} onPress={() => navigation.navigate(Screen.NEWS,
        {link: item.link,isoDate:item.isoDate,in1:in1,title: item.title,us: 'home'})}>
            <ListItem  bottomDivider>
                <Avatar source={{uri: item.img}} />
                <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>Bài viết lúc: {dayjs(item.isoDate).format('YYYY-MM-DD HH:hh:mm')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        
    )
}
function Home(props) {
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [isNews, setNews] = useState(0)
    const [arrData ,setArrData] = useState([])
    const [status,setStatus] = useState(0)
    useEffect(() => {
        callApi()
    },[isNews])
    const callApi = async() => {
        try {
            
            let qr = `v1/links/tt`
            if(isNews === 0) {
                qr =`v1/links/vne`
            }
            if(isNews === 2) {
                qr = `v1/links/h24`
            }
            const data = await axios.get(`${url}/${qr}`)
            if(data.data.data) {
                return  setArrData(data.data.data)

            }else {
                return  setArrData([])
            }
            
        } catch (error) {
            setArrData([])
        }
    }
    return (
        <SafeAreaView style={{flex: 1,paddingTop:20}}>
            <View style={{
                height:49, width: '100%', 
                backgroundColor:'#2089DC',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}> 
                {
                    isNews === 0 && <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Báo Việt Nam Expres</Text> 
                    
                }
                {
                    isNews === 1 && <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Báo Tuổi Trẻ</Text>
                    
                }
                {
                    isNews === 2 && <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Báo 24h.com</Text>
                    
                }
            </View>
            
            <View>
            <FlatList
                style={{marginBottom:50}}
                data={arrData}
                renderItem={({item,index}) => <Item in1={isNews} key={index} item={item} index={index} navigation={props.navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
            
            </View>
            <Provider>
                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'calendar-today' : 'plus'}
                        actions={[
                            
                            {
                            icon: 'star',
                            label: 'Báo Việt Nam Express',
                            style: {
                                height:70,
                                width:70,
                                borderRadius:100,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center' 
                            }, 
                            onPress: () => setNews(0),
                            },
                            {
                            icon: 'email',
                            label: "Báo Tuổi Trẻ",
                            style: {
                                height:70,
                                width:70,
                                borderRadius:100,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center' 
                            }, 
                            onPress: () => setNews(1),
                            },
                            {
                                style: {
                                    height:70,
                                    width:70,
                                    borderRadius:100,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'center' 
                                }, 
                            icon: 'bell',
                            label: "Báo 24h.com",
                            onPress: () => setNews(2),
                            },
                        ]}
                        fabStyle={{
                            height:60,
                            width:60,
                            borderRadius:100,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                            // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
            </Provider>

        </SafeAreaView>
    );
}

export default Home;
import React, { useEffect,useState } from 'react';
import {View, Text,SafeAreaView,FlatList,RefreshControl,TouchableOpacity} from 'react-native'
import axios from 'axios';
import {url} from '../constant/config'
import { ListItem  } from 'react-native-elements';
import Screen from '../constant/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs'
const Item = (props) => {
    const {item,index,navigation, user} = props
    let nameNews = ''
    if(item.news_name === 0 || item.news_name === '0') {
        nameNews = 'Báo Việt Nam Express'
    }
    if(item.news_name === 1 || item.news_name === '1' ) {
        nameNews = 'Báo 24h.com'
    }
    if(item.news_name === 2 || item.news_name === '2' ) {
        nameNews = 'Báo Tuổi trẻ'
    }
    if(item.user_name !== user) {
        return null
    }
    return(
        <TouchableOpacity key={index} onPress={() => navigation.navigate(Screen.NEWS,
            {link: item.news_link,us: 'newspaper'})}>
            <ListItem  bottomDivider>
                <ListItem.Content>
                <ListItem.Title>Trang báo: {nameNews ? nameNews : ''}</ListItem.Title>
                <ListItem.Subtitle>Nội dung: {item.news_title ? item.news_title : ''}</ListItem.Subtitle>
                <ListItem.Subtitle>Đã xem lúc: {item.created_on ? dayjs(item.created_on).format('YYYY-MM-DD HH:hh:mm') : ''}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        
    )
}
function Newspaper(props) {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [idUser,setIdUser] = useState(0)
    useEffect(() => {
        AsyncStorage.getItem(Screen.STORAGE_KEY).then((result) => {
            const data = JSON.parse(result)
            setIdUser(data[0].user_id ? data[0].user_id : 0)
        })      
    },[])
    useEffect(() => {
        if(idUser !== 0) {
            fetchDataNews()
        }
    },[idUser])
    const fetchDataNews = async() => {
        try {
        const body = {}
            const data = await axios.post(`${url}/v1/links/old-vne`,body,
                {headers:{"Content-Type" : "application/json"}})
            if(data.data) {
                setData(data.data.data ? data.data.data : [])
            }
        } catch (error) {
            setData([])
        }
    }
    const onRefresh = () => {
        setRefreshing(true)
        fetchDataNews()
        setRefreshing(false)
    }
    return (
        <SafeAreaView style={{flex: 1, paddingTop:20}}>
            <View style={{
                height:49, width: '100%', 
                backgroundColor:'#2089DC',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}> 
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Các tin đã xem</Text>
            </View>
           <View>
           <FlatList
                style={{marginBottom:50}}
                data={data}
                renderItem={({item,index}) => <Item key={index} user={idUser} item={item} index={index} navigation={props.navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
           </View>
        </SafeAreaView>
    );
}

export default Newspaper;
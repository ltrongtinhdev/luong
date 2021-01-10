import React,{useEffect,useState} from 'react';
import {View, Text} from 'react-native'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Screen from '../constant/screen';
import dayjs from 'dayjs'
import axios from 'axios'
import {url} from '../constant/config'
function News(props) {
    const {link,in1,isoDate,title,us} = props.route.params
    const [userId,setUserId] = useState(0)
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        getData()
    },[])
    useEffect(() => {
        if(loading) {
            if(us === 'home') {
                sendApi()
            }
        }
    },[loading])
    const sendApi = async() => {
        try {
            const body = {
                name: in1,
                link: link,
                date: dayjs(isoDate).format('YYYY-MM-DD'),
                user: userId,
                title: title
            }
            console.log(body)
            const data = await axios.post(`${url}/v1/links/update`,JSON.stringify(body),
            {headers:{"Content-Type" : "application/json"}}) 
            console.log(data.data) 
            
        } catch (error) {
            console.log(error)
        }
    }
    console.log(userId)
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem(Screen.STORAGE_KEY)
          if(value !== null) {
            const data = JSON.parse(value)
            console.log(data[0].user_id)
            setUserId(data[0].user_id ?? data[0].user_id )
            setLoading(true)
          }
        } catch(e) {
          console.log(e)
        }
      }
    return (
        <View style={{flex: 1}}>
            <WebView source={{ uri: link }}/>
        </View>
    );
}

export default News;
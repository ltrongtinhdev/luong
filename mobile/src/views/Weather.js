import React, {useEffect, useState} from 'react';
import { ListItem  } from 'react-native-elements';
import {View, Text, SafeAreaView,FlatList,TouchableOpacity,Image} from 'react-native'

import axios from 'axios';

const baseUrl = 'https://www.metaweather.com/api/location'
const data = [
    {
      id: 1,
      title: 'Hồ Chí Minh',
      image: 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/11/19/photo-1-15741788944131317659339-crop-15741789240091530170812.jpg',
      cta: 'Xem thêm',
      woeid: '1252431'
    },
    {
      id: 2,
      title: 'Hà Nội',
      image: 'https://dulichkhampha24.com/wp-content/uploads/2019/09/kinh-nghiem-du-lich-Ha-Noi-1.jpg',
      cta: 'Xem thêm',
      woeid: '1236594'
    },
    {
      id: 3,
      title: 'London',
      image: 'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=1947&q=80',
      cta: 'Xem thêm' ,
      screen: 'News',
      woeid: '44418'
    },
    {
      id: 4,
      title: 'Hồ Chí Mình(Ngày mai)',
      image: 'https://vneconomy.mediacdn.vn/zoom/480_270/2019/11/19/photo-1-15741788944131317659339-crop-15741789240091530170812.jpg',
      cta: 'Xem thêm',
      woeid: '1252431'
    },
    {
      id: 5,
      title: 'Hà Nội(Ngày mai)',
      image: 'https://dulichkhampha24.com/wp-content/uploads/2019/09/kinh-nghiem-du-lich-Ha-Noi-1.jpg',
      cta: 'Xem thêm',
      woeid: '1236594'
    }
  ]
  const Item = (props) => {
    const {item,index,navigation} = props
    const [data, setData] = useState({})
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async() => {
        try {
            const data1 = await axios.get(`${baseUrl}/${item.woeid}`)
            console.log(data1.data.consolidated_weather[0].air_pressure)
            setData(data1.data ? data1.data : {})
        } catch (error) {
            setData({})
        }
    }
    return(
        <TouchableOpacity>
            <ListItem  bottomDivider containerStyle={{height:200}}>
                <ListItem.Content>
                <ListItem.Title>Địa điểm: {item.title || ''} </ListItem.Title>
                <ListItem.Subtitle>Nhiệt độ: {data?.consolidated_weather[0]?.max_temp || 0} </ListItem.Subtitle>
                <ListItem.Subtitle>Độ ẩm: {data?.consolidated_weather[0]?.humidity || 0}%</ListItem.Subtitle>
                <ListItem.Subtitle>Sức gió: {data?.consolidated_weather[0]?.wind_speed || 0} </ListItem.Subtitle>
                <Image style={{width:'100%', height:90}} source={{uri: item.image}}/>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        
    )
}
function Weather(props) {
    return (
        <SafeAreaView style={{paddingTop:20}}>
            <View style={{
                height:49, width: '100%', 
                backgroundColor:'#2089DC',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}> 
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Dự báo thời tiết</Text>
            </View>
           <View></View>
            <FlatList
                style={{marginBottom:50}}
                data={data}
                renderItem={({item,index}) => <Item item={item} key={index} navigation={props.navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
        </SafeAreaView>
    );
}

export default Weather;
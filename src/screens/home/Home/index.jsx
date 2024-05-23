import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../../../constants'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'


const DATA = [
    {
        id: '1',
        image: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        id: '2',
        image: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '3',
        image: 'https://images.pexels.com/photos/707344/pexels-photo-707344.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '4',
        image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '5',
        image: 'https://images.pexels.com/photos/234272/pexels-photo-234272.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '6',
        image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '7',
        image: 'https://images.pexels.com/photos/822528/pexels-photo-822528.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '8',
        image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: '9',
        image: 'https://images.pexels.com/photos/2223082/pexels-photo-2223082.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
];


const Home = () => {

    const [wallpapers, setWallpapers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        PexelWallpapers()
    }, [])

    const PexelWallpapers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.pexels.com/v1/curated?per_page=80&page=${page}`, {
                headers: {
                    Authorization: 'QXMTh7DwFambKiqqnhj2PkyROns0cCWkXruMC5Diw95DsmdSBCDlqjEB',
                },
            });
            const data = await response.json();
            setWallpapers(prevWallpapers => [...prevWallpapers, ...data.photos]);
            setPage(prevPage => prevPage + 1);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching wallpapers:', error);
            setLoading(false);
        }
    };

    const handleEndReached = () => {
        if (!loading) {
            PexelWallpapers();
        }
    };

    const MemoizedImageItem = React.memo(({ item }) => (
        <TouchableOpacity activeOpacity={0.7}>
            <Image
                source={{ uri: item.src.original }}
                style={{ width: wp(31), height: hp(22), borderRadius: wp(2) }}
            />
        </TouchableOpacity>
    ));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.tertiaryWhite} barStyle="dark-content" />
            <View style={{ margin: hp(2), marginTop: hp(2), }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="rule" size={hp(3.8)} color={COLORS.darkgray1} />
                        <Text style={{ paddingHorizontal: wp(2), fontSize: hp(2.8), color: COLORS.secondaryBlack, fontWeight: '700' }}>PixelVista</Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="cards-heart-outline" size={hp(3.5)} color={COLORS.secondaryBlack} />
                    </TouchableOpacity>
                </View>
            </View>

            {/** 
                <View style={{ marginVertical: hp(1) }}>
                    <Text style={{ padding: wp(2), fontSize: hp(2.7), color: COLORS.secondaryBlack, fontWeight: '700' }}>Popular Collections</Text>
                    <FlatList
                        data={DATA.slice(0, 5)}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.7}>
                                <View style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(1), }}>
                                    <Image source={{ uri: item.image }} style={{ width: wp(25), height: hp(18), borderRadius: wp(2), }} />
                                </View>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
             */}

            <View style={{ marginVertical: hp(1), marginBottom: hp(7) }}>
                {/**    <Text style={{ padding: wp(2), fontSize: hp(2.7), color: COLORS.secondaryBlack, fontWeight: '700' }}>Popular </Text> */}
                <FlatList
                    data={wallpapers}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(1),
                            marginBottom: hp(1),
                        }}>
                            <MemoizedImageItem item={item} />
                        </View>
                    )}
                    initialNumToRender={15}
                    maxToRenderPerBatch={5}
                    windowSize={10}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1} // Call handleEndReached when 10% of the remaining items are visible
                    showsVerticalScrollIndicator={false}
                />
            </View>



        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../../../../constants'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import FastImage from 'react-native-fast-image';
import { fetchWallpapers } from '../../../redux/actions/wallpapersActions'
import { useDispatch, useSelector } from 'react-redux'
import { addRecentActivity } from '../../../redux/actions/recentActivityAction'
import fontFamily from '../../../../constants/fontFamily'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { wallpapers, loading } = useSelector((state) => state.wallpapers);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const defaultSearchText = 'mobile wallpaper';

    // console.log(searchText.trim().length)

    const handleEndReached = () => {
        if (!loading) {
            const nextPage = Math.ceil(wallpapers.length / 80) + 1;
            dispatch(fetchWallpapers(searchText || defaultSearchText, nextPage));
        }
    };

    const handleImagePress = (item) => {
        dispatch(addRecentActivity(item));
        navigation.navigate('ImageScreen', { imageUrl: item.src.original });
    };

    const toggleInput = () => {
        setSearchVisible(!searchVisible);
    };

    const clearSearch = () => {
        setSearchText('');
        dispatch(fetchWallpapers(defaultSearchText, 1, true));
    };

    const handleSearch = () => {
        if (searchText.trim().length > 0) {
            dispatch(fetchWallpapers(searchText, 1, true));
        }
    };

    const MemoizedImageItem = useMemo(() => {
        return ({ item }) => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleImagePress(item)}>

                <FastImage
                    source={{ uri: item.src.tiny, priority: FastImage.priority.high }}
                    style={{ width: wp(31), height: hp(22), borderRadius: wp(2) }}
                    resizeMode={FastImage.resizeMode.cover}
                    fallback
                    // placeholders={generatePlaceholderGrid(4, 3)}
                    placeholderStyle={{ width: wp(31), height: hp(22), borderRadius: wp(2), backgroundColor: COLORS.gray }}
                    cacheControl={FastImage.cacheControl.immutable} // Ensures images are cached
                />
            </TouchableOpacity>
        );
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.tertiaryWhite} barStyle="dark-content" />
            {searchVisible ? (
                <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 7 }}>
                    <View style={{ width: '90%', marginVertical: hp(1), marginHorizontal: wp(5), flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e8e8e8', borderRadius: wp(4) }}>
                        <TouchableOpacity onPress={toggleInput} style={{ marginLeft: wp(10) }}>
                            <AntDesign name="arrowleft" size={hp(3)} color={COLORS.black} style={{ position: 'absolute', left: 10, top: 10 }} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="Search..."
                            placeholderTextColor={COLORS.darkgray1}
                            keyboardType="default"
                            autoFocus={true}
                            value={searchText}
                            style={{ width: '100%', marginLeft: wp(10), height: hp(6), color: COLORS.darkgray, fontFamily: fontFamily.FONTS.regular, }}
                            onChangeText={(text) => setSearchText(text)}
                            onSubmitEditing={handleSearch}
                        />
                        {searchText.length > 0 && ( // Conditionally render the cross icon
                            <TouchableOpacity onPress={clearSearch} style={{ position: 'absolute', right: 10, top: 10 }}>
                                <Entypo name="cross" size={hp(3)} color={COLORS.black} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ) : (
                <View>
                    <View style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        paddingVertical: hp(1),
                        backgroundColor: COLORS.white,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{ flexDirection: 'row', padding: hp(1) }}>
                            <MaterialIcons name="rule" size={hp(3.8)} color={COLORS.darkgray1} />
                            <Text style={{ paddingHorizontal: wp(2), fontSize: hp(2.8), color: COLORS.secondaryBlack, fontWeight: '700' }}>PixelVista</Text>
                        </View>
                        <TouchableOpacity onPress={toggleInput} style={{ marginHorizontal: wp(3) }}>
                            <MaterialIcons name="search" size={hp(4.2)} color={COLORS.darkgray} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}


            <View style={{ marginVertical: hp(1), marginBottom: hp(7) }}>
                {/**    <Text style={{ padding: wp(2), fontSize: hp(2.7), color: COLORS.secondaryBlack, fontWeight: '700' }}>Popular </Text> */}
                <FlatList
                    data={wallpapers}
                    numColumns={3}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginHorizontal: wp(1.1), marginBottom: hp(1) }}>
                            <MemoizedImageItem item={item} />
                        </View>
                    )}
                    initialNumToRender={15}
                    maxToRenderPerBatch={5}
                    windowSize={100} // Increase this value to keep more items in memory
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5} // Call handleEndReached when 50% of the remaining items are visible
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false} // Disabling this will prevent items from being removed from memory
                    getItemLayout={(data, index) => (
                        { length: hp(22), offset: hp(22) * index, index }
                    )}
                    ListFooterComponent={loading ? (
                        <View style={{ marginBottom: hp(12) }}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                    ) : null}
                />
            </View>



        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
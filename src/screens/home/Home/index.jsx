import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
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

const Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const { wallpapers, loading } = useSelector((state) => state.wallpapers);

    const handleEndReached = () => {
        if (!loading) {
            const nextPage = Math.ceil(wallpapers.length / 80) + 1;
            dispatch(fetchWallpapers(nextPage));
        }
    };

    const handleImagePress = (item) => {
        dispatch(addRecentActivity(item));
        navigation.navigate('ImageScreen', { imageUrl: item.src.original });
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
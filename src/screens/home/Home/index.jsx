import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, TextInput, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWallpapers } from '../../../redux/actions/wallpapersActions';
import { addRecentActivity } from '../../../redux/actions/recentActivityAction';
import { COLORS } from '../../../../constants';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import fontFamily from '../../../../constants/fontFamily';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { wallpapers, loading } = useSelector((state) => state.wallpapers);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchAnimation = useRef(new Animated.Value(0)).current;
    const opacityAnimation = useRef(new Animated.Value(1)).current;
    const defaultSearchText = 'mobile wallpaper';
    const [page, setPage] = useState(1);

    // Initial Fetch
    useEffect(() => {
        dispatch(fetchWallpapers(defaultSearchText, 1));
    }, []);

    // Toggle Search Bar Visibility with Animation
    const toggleInput = () => {
        Animated.timing(searchAnimation, {
            toValue: searchVisible ? 0 : 1,
            duration: 150,
            useNativeDriver: false, // Required for layout properties
        }).start(() => setSearchVisible(!searchVisible));
    };


    // Handle search action
    const handleSearch = () => {
        if (searchText.trim()) {
            dispatch(fetchWallpapers(searchText, 1, true));
            setPage(1); // Reset pagination
        }
    };

    // Clear the search
    const clearSearch = () => {
        setSearchText('');
        dispatch(fetchWallpapers(defaultSearchText, 1, true));
        setPage(1); // Reset pagination
    };

    // Handle pagination (load more wallpapers)
    const handleEndReached = () => {
        if (!loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            dispatch(fetchWallpapers(searchText || defaultSearchText, nextPage, false));
        }
    };

    // Memoized Image Component
    const MemoizedImageItem = React.memo(({ item }) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleImagePress(item)}>
            <FastImage
                source={{ uri: item.src.tiny, priority: FastImage.priority.high }}
                style={styles.imageStyle}
                resizeMode={FastImage.resizeMode.cover}
                fallback
                cacheControl={FastImage.cacheControl.immutable}
            />
        </TouchableOpacity>
    ));

    const handleImagePress = (item) => {
        dispatch(addRecentActivity(item));
        navigation.navigate('ImageScreen', { imageUrl: item.src.original });
    };

    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.imageWrapper}>
                <MemoizedImageItem item={item} />
            </View>
        ),
        []
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

            <View style={[styles.header,]}>
                <TouchableOpacity onPress={toggleInput}>
                    <Image
                        source={require("../../../../assets/images/user5.jpg")}
                        resizeMode='contain'
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>PixelVista</Text>
                <TouchableOpacity onPress={toggleInput}>
                    <MaterialIcons name="search" size={hp(4.3)} color={COLORS.darkgray} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <Animated.View
                style={[
                    {
                        height: searchAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, hp(7)], // Wrapper height matches expanded height
                        }),
                        overflow: 'hidden', // Manage overflow at the wrapper level
                    },
                ]}
            >
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchBox}>
                        {searchText.length === 0 && (
                            <Octicons name="search" size={hp(3)} color={COLORS.darkgray} style={styles.searchIcon} />
                        )}
                        <TextInput
                            placeholder="Search your favorite wallpaper..."
                            placeholderTextColor={COLORS.darkgray}
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                            onSubmitEditing={handleSearch}
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={clearSearch}>
                                <Entypo name="cross" size={hp(3)} color={COLORS.darkgray} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                        <MaterialCommunityIcons name="tune-variant" size={hp(3.5)} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <View style={styles.wallpaperListContainer}>
                <FlatList
                    data={wallpapers}
                    numColumns={2}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    getItemLayout={(data, index) => ({ length: hp(30), offset: hp(30) * index, index })}
                    removeClippedSubviews={true}
                    ListFooterComponent={loading && <ActivityIndicator size="large" color={COLORS.primary} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp(7),
        paddingHorizontal: wp(4),
    },
    title: {
        fontSize: hp(3),
        fontWeight: '700',
        color: COLORS.secondaryBlack,
    },
    profileImage: {
        height: wp(10),
        width: wp(10),
        borderRadius: wp(2.6),
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp(4),
        height: hp(7), // Full height of the search bar
        backgroundColor: '#f1f1f1',
        borderRadius: wp(4),
        marginHorizontal: wp(3.5),
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: wp(4),
    },
    filterButton: {
        marginLeft: wp(2),
        backgroundColor: '#4A46E9',
        borderRadius: hp(2),
        padding: hp(1.5),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    searchIcon: {
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        fontSize: hp(2),
        color: COLORS.darkgray,
        fontFamily: fontFamily.FONTS.regular,
    },

    wallpaperListContainer: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        marginVertical: hp(1),
        marginBottom: hp(7),
    },
    imageWrapper: {
        marginHorizontal: wp(1.5),
        marginBottom: hp(1),
    },
    imageStyle: {
        width: wp(45),
        height: hp(30),
        borderRadius: wp(4),
    },
    loadingContainer: {
        marginVertical: hp(12),
        alignItems: 'center',
    },
});

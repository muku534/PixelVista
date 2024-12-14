import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../Components/Pixel/Index';
import { addRecentActivity } from '../../../redux/actions/recentActivityAction';
import { toggleLike } from '../../../redux/actions/wallpapersActions';

const Favorites = ({ navigation }) => {
    const dispatch = useDispatch();
    const wallpapers = useSelector((state) => state.wallpapers.wallpapers);

    // Memoize liked wallpapers to avoid unnecessary recalculation on each render
    const likedWallpapers = useMemo(() => {
        return wallpapers.filter((wallpaper) => wallpaper.liked);
    }, [wallpapers]); // Only recalculates when wallpapers change

    const loading = useSelector(state => state.wallpapers.loading); // Loading state

    // Render individual image items
    const MemoizedImageItem = React.memo(({ item, onToggleLike }) => {
        const [isLiked, setIsLiked] = useState(item.liked);
        const backgroundColorAnimation = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.timing(backgroundColorAnimation, {
                toValue: isLiked ? 1 : 0, // Toggle animation
                duration: 150,
                useNativeDriver: false, // Required for color interpolation
            }).start();
        }, [isLiked]);

        const handleLikeToggle = () => {
            setIsLiked(!isLiked); // Optimistically toggle like state
            onToggleLike(item.id); // Trigger Redux action to sync with backend
        };

        // Interpolate background color based on animation value
        const animatedBackgroundColor = backgroundColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 0, 0, 0.7)'], // Transparent to red
        });

        return (
            <View style={styles.imageWrapper}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleImagePress(item)}>
                    <FastImage
                        source={{ uri: item.src.tiny, priority: FastImage.priority.high }}
                        style={styles.imageStyle}
                        resizeMode={FastImage.resizeMode.cover}
                        fallback
                        cacheControl={FastImage.cacheControl.immutable}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.heartButtonContainer}
                    activeOpacity={0.6}
                    onPress={handleLikeToggle}
                >
                    <Animated.View style={[styles.heartButton, { backgroundColor: animatedBackgroundColor }]}>
                        <AntDesign
                            name={isLiked ? 'heart' : 'hearto'}
                            size={hp(2.4)}
                            color={COLORS.tertiaryWhite} // White heart icon
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    });

    const handleImagePress = useCallback(
        (item) => {
            dispatch(addRecentActivity(item));
            navigation.navigate('ImageScreen', { imageUrl: item.src.original });
        },
        [dispatch, navigation]
    );

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <MemoizedImageItem
                    item={item}
                    onToggleLike={(id) => dispatch(toggleLike(id))}
                />
            );
        },
        [dispatch]
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#4A46E9', '#6E67F1']} style={styles.headerGradient}>
                <View style={[styles.header]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <FontAwesome5
                            name="chevron-left"
                            size={hp(2.6)}
                            color={COLORS.darkgray1}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title}>Favorites</Text>
                    <Text style={{ width: wp(5) }}></Text>
                </View>
            </LinearGradient>

            <View style={styles.wallpaperListContainer}>
                <FlatList
                    data={likedWallpapers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={loading && <ActivityIndicator size="large" color={COLORS.primary} />}
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No liked wallpapers yet!</Text>
                            </View>
                        )
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    headerGradient: {
        paddingBottom: hp(1),
        borderBottomLeftRadius: wp(6),
        borderBottomRightRadius: wp(6),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp(7),
        paddingHorizontal: wp(4),
    },
    title: {
        fontSize: hp(3),
        fontWeight: '700',
        color: COLORS.tertiaryWhite,
    },
    backButton: {
        width: wp(10),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: wp(3),
    },
    wallpaperListContainer: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        marginTop: hp(1),
        // marginBottom: hp(7),
    },
    imageWrapper: {
        marginHorizontal: wp(0.5),
        marginBottom: hp(0.6),
    },
    imageStyle: {
        width: wp(46),
        height: hp(30),
        borderRadius: wp(4),
    },
    loadingContainer: {
        marginVertical: hp(12),
        alignItems: 'center',
    },
    heartButtonContainer: {
        position: 'absolute',
        bottom: hp(1), // Adjust based on image layout
        right: wp(2), // Adjust based on image layout
    },
    heartButton: {
        width: wp(9.5),
        height: wp(9.5),
        borderRadius: wp(9.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Initial transparent background
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: hp(2.5),
        fontWeight: '500',
        color: COLORS.darkGolden,
        textAlign: 'center',
    },
});

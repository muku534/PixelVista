import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../Components/Pixel/Index';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const CollectionDetails = ({ route, navigation }) => {
    const { collectionId, collectionName } = route.params;

    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Fetch collection details
    const fetchCollectionDetails = async (page) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.pexels.com/v1/collections/${collectionId}?per_page=20&page=${page}&sort=desc`,
                { headers: { Authorization: process.env.AUTHORIZATION } }
            );
            const data = await response.json();

            // Append new data or stop fetching if no more data
            if (data.media && data.media.length > 0) {
                setCollections((prevCollections) => [...prevCollections, ...data.media]);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching collection details:', error);
            Alert.alert('Error', 'Failed to load collection details.');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchCollectionDetails(page);
    }, [page]);

    // Render individual image items
    const MemoizedImageItem = React.memo(({ item }) => {
        const [liked, setLiked] = useState(false);
        const backgroundColorAnimation = useRef(new Animated.Value(0)).current;
        if (!item || !item.src || !item.src.tiny) {
            return null; // Safeguard against undefined or invalid items
        }

        const toggleLike = () => {
            setLiked(!liked);
            Animated.timing(backgroundColorAnimation, {
                toValue: liked ? 0 : 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        };

        const animatedBackgroundColor = backgroundColorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 0, 0, 0.7)'],
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
                    onPress={toggleLike}
                >
                    <Animated.View style={[styles.heartButton, { backgroundColor: animatedBackgroundColor }]}>
                        <AntDesign
                            name={liked ? 'heart' : 'hearto'}
                            size={hp(2.4)}
                            color={COLORS.tertiaryWhite} // White heart icon
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );
    });

    const handleImagePress = (item) => {
        navigation.navigate('ImageScreen', { imageUrl: item.src.original });
    };

    const handleEndReached = () => {
        if (!loading && hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#4A46E9', '#6E67F1']} style={styles.headerGradient}>
                <View style={[styles.header,]}>
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

                    <Text style={styles.title}>{collectionName}</Text>
                    <Text style={{ width: wp(5) }}></Text>
                </View>
            </LinearGradient>

            <View style={styles.wallpaperListContainer}>
                <FlatList
                    data={collections}
                    numColumns={2}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => <MemoizedImageItem item={item} />}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No data available</Text>
                            </View>
                        )
                    }
                    ListFooterComponent={loading && <ActivityIndicator size="large" color={'#4A46E9'} />}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
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
        // padding: hp(1),
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

export default CollectionDetails;

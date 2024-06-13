import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Share, PermissionsAndroid, Alert, Platform, ToastAndroid, ActivityIndicator } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import { COLORS } from '../../../../constants';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import RBSheet from 'react-native-raw-bottom-sheet';
import RNFetchBlob from 'rn-fetch-blob';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

const ImageScreen = ({ route }) => {
    const { imageUrl } = route.params;
    const navigation = useNavigation();
    const rbSheetRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleShare = (imageUrl) => {
        Share.share({
            message: `Check out this post: ${imageUrl}`, // Customize the shared message here
        })
            .then(result => console.log(result))
            .catch(errorMsg => console.error(errorMsg));
    };

    const handleDownload = () => {
        rbSheetRef.current.open();
    }

    useEffect(() => {
        if (loading && rbSheetRef.current) {
            rbSheetRef.current.close();
        }
    }, [loading]);

    const saveImageToMediaFolder = async (imageUrl) => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to download Photos',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    ToastAndroid.show('Permission Denied! You need to give storage permission to download the image', ToastAndroid.LONG);
                    return;
                }
            }

            const { config, fs } = RNFetchBlob;
            const fileDir = fs.dirs.DownloadDir;
            const date = new Date();

            // Extract the file extension from the imageUrl
            const extension = imageUrl.split('.').pop().split(/\#|\?/)[0];
            const fileName = `download${Math.floor(date.getDate() + date.getSeconds() / 2)}.${extension}`;

            config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: `${fileDir}/${fileName}`, // Use the dynamic file name with extracted extension
                    description: 'Downloading image'
                },
            })
                .fetch('GET', imageUrl)
                .then((res) => {
                    ToastAndroid.show('Image downloaded successfully to your media folder!', ToastAndroid.LONG);
                })
                .catch((error) => {
                    console.error(error);
                    ToastAndroid.show('An error occurred while downloading the image.', ToastAndroid.LONG);
                });
        } catch (error) {
            console.error(error);
            ToastAndroid.show('An error occurred while downloading the image.', ToastAndroid.LONG);
        }
    };

    const setWallpaper = async (type) => {
        try {
            setLoading(true);

            if (Platform.OS === 'android' && type === TYPE.LOCK && Platform.Version < 24) {
                setLoading(false);
                Alert.alert('Error', 'Setting the wallpaper on the lock screen is not supported on Android versions below Nougat.');
                return;
            }

            await ManageWallpaper.setWallpaper(
                {
                    uri: imageUrl,
                },
                (status) => {
                    setLoading(false);
                    if (status) {
                        let screenType = '';
                        if (type === TYPE.HOME) {
                            screenType = 'home screen';
                        } else if (type === TYPE.LOCK) {
                            screenType = 'lock screen';
                        } else if (type === TYPE.BOTH) {
                            screenType = 'both screens';
                        }
                        Alert.alert('Success', `Wallpaper set successfully on ${screenType}`);
                    } else {
                        Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
                    }
                },
                type
            );
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
        }
    };


    return (
        <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={8}
        >
            <View style={styles.container}>
                <Image source={{ uri: imageUrl }} transition={100} style={styles.image} />
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                        <Entypo name="cross" size={hp(4)} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleDownload()} >
                        {loading ? (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            </View>
                        ) : (
                            <Octicons name="download" size={hp(3.5)} color={COLORS.white} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleShare(imageUrl)} >
                        <Entypo name="share" size={hp(3.5)} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <RBSheet
                ref={rbSheetRef}
                height={hp(32)}
                closeOnDragDown={true}
                draggable={true}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: 'white',
                    },
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >
                <View style={styles.menuItems}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => setWallpaper(TYPE.HOME)}>
                        <MaterialCommunityIcons name="wallpaper" size={hp(3.2)} color={COLORS.darkgray1} />
                        <Text style={styles.itemText}>HOME SCREEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => setWallpaper(TYPE.LOCK)}>
                        <Ionicons name="lock-closed" size={hp(3.2)} color={COLORS.darkgray1} />
                        <Text style={styles.itemText}>LOCK SCREEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => setWallpaper(TYPE.BOTH)}>
                        <FontAwesome6 name="house-lock" size={hp(2.7)} color={COLORS.darkgray1} />
                        <Text style={styles.itemText}>BOTH</Text>
                    </TouchableOpacity>
                    {/**
                        <TouchableOpacity style={styles.menuItem}>
                                <MaterialCommunityIcons name="image-edit" size={hp(3.2)} color={COLORS.darkgray1} />
                                <Text style={styles.itemText}>ADJUST</Text>
                        </TouchableOpacity>
                    */}
                    <TouchableOpacity style={styles.menuItem} onPress={() => saveImageToMediaFolder(imageUrl)}>
                        <MaterialCommunityIcons name="download" size={hp(3.5)} color={COLORS.darkgray1} />
                        <Text style={styles.itemText}>SAVE TO MEDIA FOLDER</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>

        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        borderWidth: 2,
        width: wp(85),
        height: hp(60),
        borderRadius: wp(2),
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.1)',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttons: {
        marginTop: hp(4),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(10)
    },
    button: {
        height: hp(6),
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: wp(2),
        borderCurve: 'continuous'
    },
    menuItems: {
        justifyContent: 'center',
        marginTop: hp(2),
        marginHorizontal: wp(8),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(1.5)
    },
    itemText: {
        fontSize: hp(2.2),
        color: COLORS.darkgray1,
        marginHorizontal: wp(3)
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Ensure this value is higher than the z-index of the image
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: wp(2),
        borderCurve: 'continuous'
    },

});

export default ImageScreen;

import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import { COLORS } from '../../../../constants'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import fontFamily from '../../../../constants/fontFamily'


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

];

const Profile = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ margin: hp(2), marginTop: hp(2), }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="rule" size={hp(3.8)} color={COLORS.darkgray1} />
                        <Text style={{ paddingHorizontal: wp(2), fontSize: hp(2.8), color: COLORS.secondaryBlack, fontWeight: '700' }}>PixelVista</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(3) }}>
                    <Image source={{ uri: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} style={{ width: wp(17), height: wp(17), borderRadius: wp(17) }} />
                    <View>
                        <Text style={{
                            fontFamily: fontFamily.FONTS.Medium,
                            fontSize: hp(2.5),
                            color: COLORS.black,
                            marginHorizontal: wp(22),
                        }}>Mr.Mukesh</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{ padding: wp(2), fontSize: hp(2.9), color: COLORS.secondaryBlack, fontWeight: '800' }}>Recent Activity</Text>
                <FlatList
                    data={DATA}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.7}>
                            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(1), }}>
                                <Image source={{ uri: item.image }} style={{ width: wp(29), height: hp(22), borderRadius: wp(2), }} />
                            </View>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={{ marginVertical: hp(2), marginHorizontal: wp(3) }}>
                <Text style={{ padding: wp(2), fontSize: hp(2.9), color: COLORS.secondaryBlack, fontWeight: '800' }}>Your Content</Text>

                <View style={{ marginHorizontal: wp(2) }}>
                    <TouchableOpacity>
                        <View style={{ marginTop: hp(2), flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="collections-bookmark" size={hp(3)} color={COLORS.black} />
                            <Text style={{ paddingHorizontal: wp(4), fontSize: hp(2.3), color: COLORS.secondaryBlack, fontWeight: '700' }}>Collections</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ marginTop: hp(2), flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="favorite" size={hp(3)} color={COLORS.darkgray} />
                            <Text style={{ paddingHorizontal: wp(4), fontSize: hp(2.3), color: COLORS.secondaryBlack, fontWeight: '700' }}>Favorites</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ marginTop: hp(2), flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name="download" size={hp(3)} color={COLORS.darkgray} />
                            <Text style={{ paddingHorizontal: wp(4), fontSize: hp(2.3), color: COLORS.secondaryBlack, fontWeight: '700' }}>Downloads</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: hp(6),
                }}>
                    <MaterialCommunityIcons name="logout-variant"
                        size={hp(3)}
                        color={COLORS.black} />
                    <Text style={{ marginLeft: wp(2), color: 'red', fontFamily: fontFamily.FONTS.Medium, fontSize: hp(2.3) }}>
                        Logout
                    </Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({})
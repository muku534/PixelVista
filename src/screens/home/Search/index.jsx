import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../Components/Pixel/Index'
import fontFamily from '../../../../constants/fontFamily'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'


const Search = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: hp(2), marginTop: hp(2), }}>
        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name="rule" size={hp(3.8)} color={COLORS.darkgray1} />
            <Text style={{ paddingHorizontal: wp(2), fontSize: hp(2.8), color: COLORS.secondaryBlack, fontWeight: '700' }}>PixelVista</Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: wp(2), marginVertical: hp(2) }}>
        <View style={{
          backgroundColor: '#e6e8fa',
          width: '94%',
          marginVertical: hp(1),
          marginHorizontal: wp(2),
          flexDirection: 'row',
          borderRadius: wp(4),
          alignItems: 'center'
        }}>
          <TextInput
            keyboardType='default'
            placeholder="Search Wallpaper..."
            placeholderTextColor={COLORS.darkgray}
            style={{ width: '100%', }}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 10, }}>
            <Entypo name="cross" size={hp(3)} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})
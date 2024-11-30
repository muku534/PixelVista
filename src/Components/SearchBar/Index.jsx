import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants'
import fontFamily from '../../../constants/fontFamily'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../Pixel/Index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient'


const SearchBar = ({ searchText, setSearchText, onFilterPress }) => {
    return (
        <View> {/*Search Bar */}
            <View style={styles.searchContainer}>
                {searchText.length === 0 && (
                    <Octicons
                        name="search"
                        size={hp(3)}
                        color={COLORS.darkgray}
                        style={styles.searchIcon}
                    />
                )}
                <TextInput
                    placeholder="Search your favorite product..."
                    placeholderTextColor={COLORS.darkgray}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={styles.searchInput}
                />
            </View>

            {/* Floating Filter Button */}
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7} onPress={onFilterPress}>
                <MaterialCommunityIcons name="tune-variant" size={hp(3.5)} color={COLORS.tertiaryWhite} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchContainer: {
        marginVertical: hp(1.2),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: wp(8),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        marginHorizontal: wp(3.5),
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 3,
    },
    searchIcon: {
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        height: hp(5),
        color: COLORS.darkgray,
        fontFamily: fontFamily.FONTS.regular,
    },
    filterButton: {
        position: 'absolute',
        bottom: hp(1.4),
        right: wp(5),
        // backgroundColor: COLORS.lightBlue,
        backgroundColor: '#4A46E9',
        borderRadius: hp(3),
        padding: hp(1.5),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
})
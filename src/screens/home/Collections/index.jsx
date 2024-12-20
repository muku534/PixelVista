import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Animated, ImageBackground, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCollection } from '../../../redux/actions/collectionsActions';
import { COLORS } from '../../../../constants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../Components/Pixel/Index';
import LinearGradient from 'react-native-linear-gradient';

const PEXELS_API_KEY = process.env.AUTHORIZATION; // Replace with your actual Pexels API key

const Collections = ({ navigation }) => {
  const dispatch = useDispatch();
  const { collections, loading } = useSelector((state) => state.collections);
  const [images, setImages] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCollection(page));
  }, [page, dispatch]);

  useEffect(() => {
    collections.forEach(async (collection) => {
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: { Authorization: PEXELS_API_KEY },
          params: { query: collection.title, per_page: 1 }
        });
        if (response.data.photos.length > 0) {
          setImages((prevImages) => ({
            ...prevImages,
            [collection.id]: response.data.photos[0].src.medium,
          }));
        }
      } catch (error) {
        console.error('Error fetching Pexels images', error);
      }
    });
  }, [collections]);


  const renderCollectionItem = ({ item }) => {
    const totalMedia = item.photos_count + item.videos_count;
    const coverImage = images[item.id] || 'https://via.placeholder.com/150';

    return (
      <TouchableOpacity style={styles.imageWrapper} onPress={() => navigation.navigate('CollectionDetails', { collectionId: item.id, collectionName: item.title })} activeOpacity={0.6} >
        <View style={styles.collectionCard}>
          <ImageBackground
            source={{ uri: coverImage }}
            style={styles.collectionImageBackground}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.collectionTitle}>{item.title}</Text>
              <Text style={styles.mediaCount}>
                {item.photos_count} Images
              </Text>
              <Text style={styles.totalMedia}>Total Media: {totalMedia}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity >
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4A46E9', '#6E67F1']} style={styles.headerGradient}>
        <View style={[styles.header,]}>
          <Text style={styles.title}>Collection</Text>
        </View>
      </LinearGradient>
      <View style={styles.collectionCard}>
        <FlatList
          data={collections}
          renderItem={renderCollectionItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" color={'#4A46E9'} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Collections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerGradient: {
    paddingBottom: hp(1),
    borderBottomLeftRadius: wp(6),
    borderBottomRightRadius: wp(6),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(7),
    paddingHorizontal: wp(4),
  },
  title: {
    fontSize: hp(3),
    fontWeight: '700',
    color: COLORS.tertiaryWhite,
  },
  list: {
    paddingBottom: hp(5),
  },
  collectionCard: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(1),
  },
  imageWrapper: {
    marginHorizontal: wp(1),
    marginBottom: hp(0.8),
  },
  collectionImageBackground: {
    width: wp(46),
    height: hp(30),
    justifyContent: 'flex-end',
    borderRadius: wp(4),
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: wp(4),
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: hp(1),
    borderRadius: wp(4),
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  collectionTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: COLORS.tertiaryWhite,
    marginBottom: hp(0.5),
  },
  mediaCount: {
    fontSize: hp(2),
    color: COLORS.secondaryWhite,
    marginBottom: hp(0.5),
  },
  totalMedia: {
    fontSize: hp(1.8),
    color: COLORS.secondaryWhite,
  },
});

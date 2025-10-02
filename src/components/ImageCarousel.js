import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import imagess from '../config/images';
import styless from '../GlobalStyles';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import theme from '../config/theme';
import ImageView from 'react-native-image-viewing';
const {width: screenWidth} = Dimensions.get('window');

const ImageCarousel = ({style, images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);

  const [visible, setIsVisible] = useState(false);
  const carouselRef = useRef(null); // Reference to the carousel

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        if (activeIndex === images?.length - 1) {
          // Move to the first index but let the animation behave like swiping left
          carouselRef.current.snapToItem(0); // Normal swipe animation
        } else {
          // Move to the next item
          carouselRef.current.snapToItem(activeIndex + 1);
        }
      }
    }, 2000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]);

  const RenderItem = ({item, index}) => {
    const realIndex = activeIndex % images?.length;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setIsVisible(true);
          setViewIndex(realIndex);
        }}>
        {item?.companyImage ? (
          <View style={[{flex: 1}, styless.centerAlign]}>
            <Image
              source={{uri: item?.companyImage}}
              style={[styles.carouselImg, style]}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View
            style={[
              {flex: 1},
              styles.carouselImg,
              {
                alignSelf: 'center',
                backgroundColor: theme.colors.inputBack,
              },
              styless.centerAlign,
            ]}>
            <View
              style={[
                {
                  width: '50%',
                  height: moderateScale(45),
                  alignItems: 'center',
                },
              ]}>
              <Image
                source={imagess.skeleton}
                resizeMode="center"
                style={[{width: '100%', height: '100%'}]}
              />
            </View>
          </View>
        )}

        {/* <Text style={[styless.heading4, styless.headerText]}>
            {item?.text}
          </Text> */}
      </TouchableWithoutFeedback>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width:
                  activeIndex === index ? moderateScale(24) : moderateScale(8),
                height: moderateScale(8),
                backgroundColor:
                  activeIndex === index
                    ? theme.colors.surface
                    : theme.colors.border,
                marginHorizontal: moderateScale(5),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styless.marginTS}>
      <ImageView
        images={images?.map(e => {
          {
            return {uri: e?.companyImage};
          }
        })}
        imageIndex={viewIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      {images?.length ? (
        <>
          <Carousel
            ref={carouselRef}
            data={images}
            renderItem={RenderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop={true}
            keyExtractor={(item, index) => `${item.companyImageId}-${index}`} // Unique keys
            onSnapToItem={index => setActiveIndex(index)} // Update active index on snap
          />

          {/* Custom Pagination Dots */}
          {renderPagination()}
        </>
      ) : (
        <RenderItem />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: moderateScale(20),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  carouselImg: {
    width: '90%',
    height: moderateScale(163),
    borderRadius: moderateScale(10),
  },
  dot: {
    backgroundColor: theme.colors.surface,
    borderRadius: moderateScale(50),
  },
});

export default ImageCarousel;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import BackButton from '../components/BackButton';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import {navigationRef} from '../navigation';
import {useAppDispatch} from '../store/hooks';

const SimpleFlatlist = ({
  onBackPress,

  newFetchedList = [],
  children,
  setTotal,

  loader,
  getAllItems,
  renderItem,
  NoDataComp,
  title,

  BottomBtn = null,
  rerender = false,
}: any) => {
  const dispatch = useAppDispatch();

  const [currentList, setCurrentList] = useState<Array<object>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    checkHasMore();
  }, [newFetchedList]);

  useEffect(() => {
    rerender && onRefresh();
  }, [rerender]);

  useEffect(() => {
    setCurrentList([]);
    setHasMore(true);
    fetchList(1, 10);
  }, []);

  const fetchList = (pageNumber: number, pageSize: number) => {
    let form = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    setPageNumber(pageNumber);
    dispatch(getAllItems(form));
  };

  const checkHasMore = () => {
    if (newFetchedList?.length > 0) {
      if (pageNumber === 1) {
        setCurrentList(newFetchedList);
      } else {
        setCurrentList((prev: any) => [...prev, ...newFetchedList]);
      }
    } else if (pageNumber > 1) {
      setHasMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loader) {
      fetchList(pageNumber + 1, 10);
    }
  };
  const onRefresh = () => {
    if (!loader) {
      setHasMore(true);
      setCurrentList([]);
      setTotal && dispatch(setTotal(0));
      fetchList(1, 10);
    }
  };

  const renderFooter = () => {
    if (!loader) return null;
    return (
      <ActivityIndicator style={styles.marginVL} color={theme.colors.primary} />
    );
  };
  const onGoBack = () => {
    navigationRef?.goBack();
  };

  return (
    <View style={[styles.main]}>
      <BackButton
        title={title}
        onPress={onBackPress ? onBackPress : onGoBack}
      />
      {children}
      {/* 
      <SearchComp
        placeholder={t('SEARCH')}
        leftIcon="search"
        navigate={autoFocus}
        customStyle={{marginTop: 0}}
        labelValue={searchValue}
        onChangeText={setSearchValue}
        onPressRight={onPressRight ? onPressRight : navigateToScan}
        scanHide={scanHide}
        addUserHide={selectedDate ? true : false}
      />
      {checkCondition && <Walkin />}

      {total ? (
        <Text style={[styles.regularBold, styles.marginTS]}>
          {totalTitle} {total?.toLocaleString()}
        </Text>
      ) : null} */}

      {pageNumber == 1 && loader ? (
        <ActivityIndicator
          style={styles.marginVL}
          color={theme.colors.primary}
        />
      ) : null}

      {currentList?.length > 0 ? (
        <FlatList
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={'handled'}
          data={currentList}
          renderItem={renderItem}
          keyExtractor={(elem, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.marginTM,
            {paddingBottom: moderateScale(20)},
          ]}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        !loader && (
          <View style={[styles.noData, {marginTop: moderateScale(120)}]}>
            <NoDataComp />
          </View>
        )
      )}

      {BottomBtn ? <BottomBtn /> : null}
    </View>
  );
};

export default SimpleFlatlist;

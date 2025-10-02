import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import BackButton from '../components/BackButton';
import SearchComp from '../components/Search';
import theme from '../config/theme';
import styles from '../GlobalStyles';
import useDebounce from '../helper/debounce';
import {navigationRef} from '../navigation';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {checkCameraPermission, height} from '../config/constants';
import {useTranslation} from 'react-i18next';
import CustomRBSheet from './RBSheet';
import PopUp from './PopUp';
import {useIsFocused} from '@react-navigation/native';

const SearchableFlatlist = ({
  autoFocus,
  scanHide,
  onBackPress,
  onPressRight,
  newFetchedList = [],
  total,
  setTotal,
  totalTitle,
  loader,
  getAllItems,
  renderItem,
  NoDataComp,
  title,
  extraCard = false,
  Walkin,
  children,
  fetchListByDates,
  getDatesByRange,
  selectedDate,
  BottomBtn = null,
  rerender = false,
  searchable = true,
  viewBill = true,
  InvoiceComp,
  updatedItem = null,
  idName = '',
  processData = null,
  infoText = null,
  infoHeight = 0.5,
  headerStyle,
  rightIcon,
  rightButtonPress,
  paymentStatusFilter,
  setUpdatedProduct,
  from,
  upcoming,
}: any) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const infoRBSheet = useRef<any>();

  const [searchValue, setSearchValue] = useState('');
  const [currentList, setCurrentList] = useState<Array<object>>([]);
  const [processedList, setProcessedList] = useState<Array<object>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const debounce = useDebounce(searchValue, 250);
  const isFocus = useIsFocused();

  useEffect(() => {
    checkHasMore();
  }, [newFetchedList]);

  useEffect(() => {
    rerender && onRefresh();
  }, [rerender]);

  useEffect(() => {
    if (isFocus) {
      setCurrentList([]);
      setHasMore(true);
      fetchList(debounce, 1, 10);
      setTotal && dispatch(setTotal(0));
    }
  }, [debounce, upcoming, isFocus]);

  const fetchList = (
    searchValue: string,
    pageNumber: number,
    pageSize: number,
  ) => {
    let form = {
      // search: searchValue,
      pageNumber: pageNumber,
      pageSize: pageSize,
      showInactive: upcoming ? false : true,
      showUpcoming: upcoming ? true : false,
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
      fetchList(searchValue ? searchValue : '', pageNumber + 1, 10);
    }
  };
  const onRefresh = () => {
    if (!loader) {
      setHasMore(true);
      setCurrentList([]);
      setTotal && dispatch(setTotal(0));
      fetchList(searchValue ? searchValue : '', 1, 10);
    }
  };

  const renderFooter = () => {
    if (!loader && pageNumber > 1) return null;
    return (
      <ActivityIndicator style={styles.marginVL} color={theme.colors.primary} />
    );
  };

  useEffect(() => {
    // only for date separate
    if (currentList?.length && processData !== null) {
      const temp = processData(currentList, pageNumber);
      setProcessedList(temp);
    }
  }, [currentList]);

  return (
    <View style={{backgroundColor: theme.colors.inputBack, height: '100%'}}>
      <BackButton
        onPress={() => navigationRef.goBack()}
        title={title}
        style={[styles.paddingVM, styles.paddingHL, styles.headerBorder]}
      />

      {children}
      <View style={[styles.paddingHL, {paddingBottom: moderateScale(120)}]}>
        {searchable && viewBill ? (
          <SearchComp
            placeholder={t('SEARCH')}
            leftIcon="search"
            navigate={autoFocus}
            customStyle={{marginTop: 0}}
            labelValue={searchValue}
            onChangeText={setSearchValue}
            // onPressRight={onPressRight ? onPressRight : navigateToScan}
            scanHide={scanHide}
            addUserHide={selectedDate ? true : false}
          />
        ) : null}

        {extraCard && <Walkin />}

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
            data={processedList?.length ? processedList : currentList}
            renderItem={renderItem}
            keyExtractor={(elem, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              headerStyle ? headerStyle : styles.marginTM,

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
          !loader && <NoDataComp />
        )}

        {BottomBtn ? <BottomBtn /> : null}

        <CustomRBSheet rbsheetRef={infoRBSheet} height={height * infoHeight}>
          <PopUp
            title={title}
            text={infoText}
            onPress={() => {
              infoRBSheet?.current?.close();
            }}
          />
        </CustomRBSheet>
      </View>
    </View>
  );
};

export default SearchableFlatlist;

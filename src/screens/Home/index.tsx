import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {NewsArticle, NewsTags, SearchInput} from '../../components';
import {NewsCategory} from '../../constants';
import {getNewsFeed, getTopHeadlines} from '../../redux/actions';
import styles from './styles';

export const HomeScreen: React.FC = () => {
  const {topHeadlines} = useSelector((state: any) => state.feedReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch: Function = useDispatch();

  useEffect(() => {
    // Fetch initial data when component mounts
    dispatch(getTopHeadlines(setIsLoading, page));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    // Refresh data when the user pulls down the list
    setIsLoading(true);
    setPage(1);
  };
  const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';
  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
      <Button onPress={() => handleRefresh()} title="Refresh" />
    </View>
  );
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <FlatList
        keyExtractor={() => uuid.v4()?.toString()}
        showsVerticalScrollIndicator={false}
        data={topHeadlines}
        renderItem={({item, index}: any) => (
          <NewsArticle post={item} index={index} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        style={styles.list}
        onEndReachedThreshold={0.001}
        onEndReached={fetchMoreData}
        ListEmptyComponent={renderEmpty}
        scrollEnabled={true}
      />
    </View>
  );
};

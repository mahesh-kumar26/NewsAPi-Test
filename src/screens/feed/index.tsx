import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, useColorScheme, View} from 'react-native';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {NewsArticle, NewsTags, SearchInput} from '../../components';
import {NewsCategory} from '../../constants';
import {getNewsFeed} from '../../redux/actions';
import styles from './styles';

export const Feed: React.FC = () => {
  const {newsFeed, searchResults} = useSelector(
    (state: any) => state.feedReducer,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    NewsCategory.business,
  );
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const dispatch: Function = useDispatch();

  useEffect(() => {
    dispatch(getNewsFeed(setIsLoading, selectedCategory, page));
  }, [dispatch, selectedCategory, page]);

  const handleRefresh = () => {
    // Refresh data when the user pulls down the list
    setIsLoading(true);
    setPage(1);
  };

  const fetchMoreData = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };
  const backgroundColor = useColorScheme() === 'dark' ? '#000' : '#fff';

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        setIsLoading={setIsLoading}
      />
      {!searchText?.trim() && (
        <NewsTags
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <FlatList
        keyExtractor={() => uuid.v4()?.toString()}
        showsVerticalScrollIndicator={false}
        data={searchText?.trim() ? searchResults : newsFeed}
        renderItem={({item, index}: any) => (
          <NewsArticle post={item} index={index} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        style={styles.list}
        onEndReachedThreshold={0.001}
        onEndReached={fetchMoreData}
      />
    </View>
  );
};

import React from 'react';
import { TabBarIOS, StatusBar } from 'react-native';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import SearchContainer from '../containers/SearchContainer';
import BookmarksContainer from '../containers/BookmarksContainer';
import * as globalStyles from '../styles/global';

StatusBar.setBarStyle('light-content');

export default class HomeScreen extends React.Component {

  render() {
    const { selectedTab, tab } = this.props;
    return (
      <TabBarIOS
        barTintColor={globalStyles.BAR_COLOR}
        tintColor={globalStyles.LINK_COLOR}
        translucent={false}
      >
        <TabBarIOS.Item
          systemIcon={'featured'}
          selected={selectedTab === 'newsFeed'}
          onPress={() => tab('newsFeed')}
        >
          <NewsFeedContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon={'search'}
          selected={selectedTab === 'search'}
          onPress={() => tab('search')}
        >
          <SearchContainer />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon={'bookmarks'}
          selected={selectedTab === 'bookmarks'}
          onPress={() => tab('bookmarks')}
        >
          <BookmarksContainer />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  WebView,
  RefreshControl,
  ActivityIndicator,
  NetInfo,
  Linking
} from 'react-native';
import NewsItem from './NewsItem';
import SmallText from './SmallText';
import AppText from './AppText';
import * as globalStyles from '../styles/global';

export default class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.news),
      initialLoading: true,
      refreshing: false,
      connected: true
    };
    this.renderRow = this.renderRow.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }
  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this.refresh();
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.news),
      initialLoading: false
    });
  }
  refresh() {
    if (this.props.load) {
      this.props.load();
    }
  }
  handleConnectivityChange(isConnected) {
    this.setState({
      connected: isConnected
    });
    if (isConnected) {
      this.refresh();
    }
  }
  handleOpenURL() {
    Linking.openURL(this.props.modal).catch(err => console.log('An error occurred', err));
  }
  renderModal() {
    return(
      <Modal
        animationType="slide"
        visible={this.props.modal !== undefined}
        onRequestClose={this.props.onModalClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={this.props.onModalClose}
            >
              <SmallText>Close</SmallText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.handleOpenURL}
            >
              <SmallText>Open in Browser</SmallText>
            </TouchableOpacity>
          </View>
          <WebView
            scalesPageToFit
            source={{ uri: this.props.modal }}
          />
        </View>
      </Modal>
    );
  }
  renderRow(rowData, ...rest) {
    const index = parseInt(rest[1], 10);
    return (
      <NewsItem
        onPress={() => this.props.onModalOpen(rowData.url)}
        onBookmark={() => this.props.addBookmark(rowData.url)}
        style={styles.newsItem}
        index={index}
        {...rowData}
      />
    );
  }
  render() {
    const {
      listStyles = globalStyles.COMMON_STYLES.pageContainer,
      showLoadingSpinner
    } = this.props;
    const { initialLoading, refreshing, dataSource, connected } = this.state;

    if (!connected) {
      return (
        <View style={[globalStyles.COMMON_STYLES.pageContainer,styles.loadingContainer]}>
          <AppText>
            No Connection
          </AppText>
        </View>
      );
    }

    return (
      (initialLoading && showLoadingSpinner
        ? (
          <View style={[listStyles, styles.loadingContainer]}>
            <ActivityIndicator
              animating
              size="small"
              {...this.props}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <ListView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.refresh}
                />
              }
              enableEmptySections
              dataSource={dataSource}
              renderRow={this.renderRow}
              style={listStyles}
            />
            {this.renderModal()}
          </View>
        )
      )
    );
  }
}

NewsFeed.defaultProps = {
  showLoadingSpinner: true
};

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20
  },
  container: {
    flex: 1
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: globalStyles.BG_COLOR
  },
  modalButtons: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

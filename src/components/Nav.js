import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationExperimental from 'react-native-navigation-experimental-compat';

const { CardStack } = NavigationExperimental;

export default class Nav extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }


  renderScene(sceneProps) {
    const route = sceneProps.scene.route;
    return (
      <route.component
        {...route.props}
        push={this.props.push}
        pop={this.props.pop}
      />
    );
  }

  render() {
    return (
      <CardStack
        onNavigateBack={this.props.pop}
        navigationState={this.props.navigation}
        renderScene={this.renderScene}
        style={styles.cardStack}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardStack: {
    flex: 1
  }
});

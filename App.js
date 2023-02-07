import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/Auth/LoginScreen'
import HomeScreen from './screens/Home';

global.route = 'https://a999-2604-a880-400-d0-00-1667-9001.eu.ngrok.io';

const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login'
  }
)

const App = createAppContainer(navigator);

export default () => {
  return (
    <App />
  )
}

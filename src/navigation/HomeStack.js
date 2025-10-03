import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../store/hooks';
import Home from '../screens/App/Home';
import ProductDetail from '../screens/App/Home/ProductDetail';
import Cart from '../screens/App/Cart';

export const HomeScreens = [

  {
    name: 'Home',
    component: Home,
    key: 'Home',
  },
  {
    name: 'ProductDetail',
    component: ProductDetail,
    key: 'ProductDetail',
  },
  {
    name: 'Cart',
    component: Cart,
    key: 'Cart',
  },
];

const HomeNav = createStackNavigator();

const HomeStack = () => {
  const {userData} = useAppSelector(state => state.onBoarding);

  return (
    <HomeNav.Navigator screenOptions={{headerShown: false}}>
      {HomeScreens?.map(e => {
        return (
          <HomeNav.Screen
            key={e?.key}
            name={e?.name}
            component={e?.component}
          />
        );
      })}
    </HomeNav.Navigator>
  );
};



export default HomeStack;

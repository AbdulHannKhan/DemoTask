import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../store/hooks';
import ProductList from '../screens/App/Home';

export const HomeScreens = [

  {
    name: 'HomeScreen',
    component: ProductList,
    key: 'HomeScreen',
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

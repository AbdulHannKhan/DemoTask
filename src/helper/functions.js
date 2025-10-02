import {CommonActions} from '@react-navigation/native';
export const goToHomeAndResetStack = (navigation, screen) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0, 
      routes: [{name: screen}], 
    }),
  );
};


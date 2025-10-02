import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  stylessheet,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import * as Progress from 'react-native-progress'; // Import progress bar
import Wrapper from '../../components/wrapper';
import styles from '../../GlobalStyles';
import BackButton from '../../components/BackButton';
import {navigationRef} from '../../navigation';
import theme from '../../config/theme';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import Button from '../../components/Button';
import {height, width} from '../../config/constants';
import {useAppDispatch} from '../../store/hooks';
import {setPostOnboard, submitSurvey} from '../../store/onBoarding';
import {goToHomeAndResetStack} from '../../helper/functions';

const questions = [
  {
    id: 1,
    question: 'How often do you play padel?',
    options: [
      {option: 'Daily', optionId: 1},
      {option: 'Weekly', optionId: 2},
      {option: 'Monthly', optionId: 3},
      {option: 'Occasionally', optionId: 4},
    ],
  },
  {
    id: 2,
    question: 'What times do you usually prefer to play?',
    options: [
      {option: 'Morning', optionId: 1},
      {option: 'Afternoon', optionId: 2},
      {option: 'Evening', optionId: 3},
      {option: 'Night', optionId: 4},
    ],
  },
  {
    id: 3,
    question: 'Do you prefer indoor or outdoor courts?',
    options: [
      {option: 'Indoor', optionId: 1},
      {option: 'Outdoor', optionId: 2},
      {option: 'No Preference', optionId: 3},
    ],
  },
  {
    id: 4,
    question: 'What is your skill level?',
    options: [
      {option: 'Beginner', optionId: 1},
      {option: 'Intermediate', optionId: 2},
      {option: 'Advanced', optionId: 3},
      {option: 'Professional', optionId: 4},
    ],
  },
];

const PostOnboarding = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(
    (currentQuestionIndex + 1) / questions.length,
  );

  // Function to go to the next question and Calculate the progress
  const nextQuestion = selectedOpt => {
    handleSubmitSurvey(
      questions[currentQuestionIndex]?.question,
      selectedOpt?.option,
    );
  };

  const handleSubmitSurvey = async (question, response) => {
    const form = {
      question: question,
      response: response,
    };

    dispatch(submitSurvey(form)).then(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestionIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextQuestionIndex);
        setProgress((nextQuestionIndex + 1) / questions.length);
      } else {
        skip();
      }
    });
  };

  const skip = () => {
    dispatch(setPostOnboard(true));
    goToHomeAndResetStack(navigation, 'HomeTabs');
  };

  return (
    <Wrapper
      style={[
        // styles.justifyBetween,
        styles.fullWidthHeight,
        {paddingHorizontal: 0},
      ]}>
      <BackButton
        borderHide={true}
        onPress={() => {
          BackHandler.exitApp();
        }}
        style={[
          styles.paddingHL,
          styles.centerAlign,
          styles.justifyBetween,
          {height: moderateScale(50), marginBottom: -20},
        ]}
        showBackButton={false}
        RightComp={() => {
          return (
            <TouchableOpacity onPress={skip}>
              <Text style={[styles.normalBold, {color: theme.colors.darkText}]}>
                Skip
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Progress bar */}
      <View style={{marginTop: verticalScale(40)}}>
        <View style={styles.progressBar}>
          <Progress.Bar
            progress={progress}
            width={width}
            height={moderateScale(4)}
            color={theme.colors.primary}
            borderWidth={0}
          />
        </View>
        <View style={[styles.centerAlign, {alignSelf: 'center', width: '90%'}]}>
          <Text
            style={[
              styles.normalBold,
              styles.marginVL,
              {color: theme.colors.darkText},
            ]}>
            STEP {currentQuestionIndex + 1}
          </Text>

          <Text style={[styles.heading4, styles.marginBL, styles.optionText]}>
            {questions[currentQuestionIndex]?.question}
          </Text>
        </View>
        <View>
          {questions[currentQuestionIndex]?.options?.map(e => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedOption(e);
                  nextQuestion(e);
                }}
                style={[
                  styles.paddingHM,
                  styles.paddingVXS,
                  styles.marginVXS,
                  styles.marginHL,
                  styles.option,
                  {
                    backgroundColor:
                      e?.option === selectedOption?.option
                        ? theme.colors.primaryBg
                        : theme.colors.surface,
                  },
                ]}>
                <Text style={[styles.text, {color: theme.colors.darkText}]}>
                  {e?.option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* <Button
        onPress={nextQuestion}
        title={'CONTINUE'}
        style={{
          width: '90%',
          marginTop: moderateScale(70),
          alignSelf: 'center',
        }}
      /> */}
    </Wrapper>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default PostOnboarding;

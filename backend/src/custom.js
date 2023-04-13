/*
  Question Data structure
  question = {
    id: 0
    type: 'multiple' || 'single',
    questionString: 'Do you like option A or B better?',
    selections: [
      {answer: 'Option A', answerId: 0},
      {answer: 'Option B', answerId: 1},
    ],
    correctAnswerIds: [0]
    points: 10,
    url: 'https://youtube.com',
    timeLimit: 20, (seconds)
  }
*/

/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  return {
    type: question.type,
    questionString: question.questionString,
    selections: question.selections,
    url: question.url,
    timeLimit: question.timeLimit
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.correctAnswerIds;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.selections.map(q => q.answerId);
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};

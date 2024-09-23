export class AnswerDTO {
    answerText: string;
    isCorrect: boolean;
}

export class QuestionDTO {
    questionText: string;
    answers: AnswerDTO[]
}

export class QuestionsDTO {
    topicId: number;
    questions: QuestionDTO[]
}

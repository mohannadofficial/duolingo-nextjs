import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { redirect } from "next/navigation";

import { Quiz } from "../_components/quiz";

type Props = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params: { lessonId } }: Props) => {
  const lessonData = getLesson(lessonId);
  const userProgressData = getUserProgress();
  const useSubscriptionData = getUserSubscription();

  const [lesson, userProgress, useSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    useSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={useSubscription}
    />
  );
};

export default LessonIdPage;
